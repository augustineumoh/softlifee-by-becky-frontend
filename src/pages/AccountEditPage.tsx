import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiCamera, FiSave, FiArrowLeft, FiUser, FiPhone, FiCheck } from 'react-icons/fi'
import { useAuth } from '../store/authStore'
import { authAPI, getCloudinaryUrl } from '../services/api'

export default function AccountEditPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, loadUser } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name:  user?.last_name  || '',
    phone:      user?.phone      || '',
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile,    setAvatarFile]    = useState<File | null>(null)
  const [saving,        setSaving]        = useState(false)
  const [success,       setSuccess]       = useState(false)
  const [error,         setError]         = useState('')

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { state: { from: '/account/edit' } })
  }, [isAuthenticated])

  useEffect(() => {
    if (user) setForm({ first_name: user.first_name || '', last_name: user.last_name || '', phone: user.phone || '' })
  }, [user])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB.'); return }
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
    setError('')
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      await authAPI.updateProfile(form)
      if (avatarFile) {
        // uploadAvatar now returns the full User — update store directly
        const updatedUser = await authAPI.uploadAvatar(avatarFile)
        if (updatedUser?.avatar) {
          useAuth.setState(s => ({ ...s, user: { ...s.user!, ...updatedUser } }))
        }
      }
      await loadUser()
      setSuccess(true)
      setTimeout(() => navigate('/account'), 1500)
    } catch (err: any) {
      setError(err?.detail || err?.error || err?.message || 'Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  const currentAvatar = avatarPreview || getCloudinaryUrl(user.avatar, 200) || null
  const initials = (user.first_name?.[0] || '') + (user.last_name?.[0] || '')

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem',
    border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px',
    fontFamily: '"Jost", sans-serif', fontSize: '0.85rem',
    color: '#1A1A2E', background: '#FAF7FF', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', paddingTop: '68px' }}>

      {/* page header band */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #3D1A6E 60%, #5B21B6 100%)', padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,6vw,5rem)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: '1rem', transition: 'color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#D4AF37' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
            <FiArrowLeft size={13}/> Back to Account
          </Link>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, color: '#FFF', margin: 0 }}>Edit Profile</h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.4)', margin: '6px 0 0' }}>Update your personal details and profile photo</p>
        </div>
      </div>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,4vw,1.5rem)' }}>

        {/* Avatar section */}
        <div style={{ background: '#FFF', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2rem)', border: '1px solid rgba(138,79,177,0.1)', marginBottom: '1.25rem', boxShadow: '0 2px 16px rgba(138,79,177,0.06)' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.25rem' }}>Profile Photo</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem,4vw,1.5rem)', flexWrap: 'wrap' }}>
            {/* avatar preview */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #8A4FB1', boxShadow: '0 4px 16px rgba(138,79,177,0.2)' }}>
                {currentAvatar ? (
                  <img src={currentAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#FFF' }}>{initials.toUpperCase() || '?'}</span>
                  </div>
                )}
              </div>
              <button onClick={() => fileRef.current?.click()}
                style={{ position: 'absolute', bottom: '0', right: '0', width: '28px', height: '28px', borderRadius: '50%', background: '#8A4FB1', border: '2px solid #FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                <FiCamera size={12} color="#FFF" />
              </button>
            </div>

            {/* upload info */}
            <div style={{ flex: 1, minWidth: '180px' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 4px' }}>
                {avatarPreview ? 'New photo selected' : 'Upload a profile photo'}
              </p>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(26,26,46,0.45)', margin: '0 0 0.75rem', lineHeight: 1.5 }}>JPG, PNG or GIF · Max 5MB</p>
              <button onClick={() => fileRef.current?.click()}
                style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#EDD9FF' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F3E8FF' }}>
                {avatarPreview ? 'Change Photo' : 'Choose Photo'}
              </button>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        </div>

        {/* Personal info section */}
        <div style={{ background: '#FFF', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2rem)', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 2px 16px rgba(138,79,177,0.06)' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.25rem' }}>Personal Information</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: '1rem' }}>
              {[
                { key: 'first_name', label: 'First Name', placeholder: 'Becky' },
                { key: 'last_name',  label: 'Last Name',  placeholder: 'Smith' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <FiUser size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                    <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} style={inp}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1'; e.target.style.background = '#FFF' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)'; e.target.style.background = '#FAF7FF' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Email (read only) */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>
                Email <span style={{ opacity: 0.4, fontWeight: 400, letterSpacing: 0, textTransform: 'none' }}>(cannot be changed)</span>
              </label>
              <input value={user.email} readOnly
                style={{ ...inp, paddingLeft: '1rem', background: 'rgba(138,79,177,0.04)', color: 'rgba(26,26,46,0.5)', cursor: 'not-allowed', borderStyle: 'dashed' }} />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FiPhone size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="08012345678" style={inp}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1'; e.target.style.background = '#FFF' }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)'; e.target.style.background = '#FAF7FF' }} />
              </div>
            </div>

            {/* Error / Success */}
            {error && (
              <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#BE123C', flexShrink: 0, marginTop: '1px' }}>✕</span>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#BE123C', margin: 0, lineHeight: 1.5 }}>{error}</p>
              </div>
            )}
            {success && (
              <div style={{ background: '#DCFCE7', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FiCheck size={15} color="#166534" />
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#166534', margin: 0 }}>Profile updated! Redirecting...</p>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '0.25rem' }}>
              <Link to="/account"
                style={{ flex: '0 0 auto', padding: '0.9rem 1.5rem', background: 'transparent', color: '#5B21B6', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#8A4FB1'; e.currentTarget.style.color = '#8A4FB1' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)'; e.currentTarget.style.color = '#5B21B6' }}>
                Cancel
              </Link>
              <button onClick={handleSave} disabled={saving}
                style={{ flex: 1, minWidth: '160px', padding: '0.9rem', background: saving ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.3s' }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#5B21B6' }}
                onMouseLeave={e => { if (!saving) e.currentTarget.style.background = '#8A4FB1' }}>
                <FiSave size={14} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

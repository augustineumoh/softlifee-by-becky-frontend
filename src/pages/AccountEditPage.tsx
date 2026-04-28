import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiCamera, FiSave, FiArrowLeft, FiUser, FiPhone } from 'react-icons/fi'
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
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess(false)
    try {
      // Update profile fields
      await authAPI.updateProfile(form)

      // Upload avatar if changed
      if (avatarFile) {
        await authAPI.uploadAvatar(avatarFile)
      }

      await loadUser()
      setSuccess(true)
      setTimeout(() => navigate('/account'), 1500)
    } catch (err: any) {
      setError(err?.detail || 'Failed to save changes. Please try again.')
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
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

        {/* Back */}
        <Link to="/account" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', marginBottom: '1.5rem' }}>
          <FiArrowLeft size={14}/> Back to Account
        </Link>

        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2.2rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2rem' }}>Edit Profile</h1>

        <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 4px 24px rgba(138,79,177,0.06)' }}>

          {/* Avatar upload */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              {currentAvatar ? (
                <img src={currentAvatar} alt="Profile" style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #8A4FB1' }} />
              ) : (
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #8A4FB1' }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#FFF' }}>{initials.toUpperCase() || '?'}</span>
                </div>
              )}
              {/* Camera button */}
              <button onClick={() => fileRef.current?.click()}
                style={{ position: 'absolute', bottom: '0', right: '0', width: '30px', height: '30px', borderRadius: '50%', background: '#8A4FB1', border: '2px solid #FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                <FiCamera size={13} color="#FFF" />
              </button>
            </div>
            <button onClick={() => fileRef.current?.click()}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', border: 'none', borderRadius: '100px', padding: '6px 16px', cursor: 'pointer' }}>
              {avatarPreview ? 'Change Photo' : 'Upload Photo'}
            </button>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', color: 'rgba(26,26,46,0.4)', marginTop: '4px' }}>JPG, PNG or GIF · Max 5MB</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          {/* Form fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Email (read only) */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Email <span style={{ opacity: 0.4, fontWeight: 400 }}>(cannot be changed)</span></label>
              <input value={user.email} readOnly
                style={{ ...inp, paddingLeft: '1rem', background: 'rgba(138,79,177,0.04)', color: 'rgba(26,26,46,0.5)', cursor: 'not-allowed' }} />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <FiPhone size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="08012345678" style={inp}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
              </div>
            </div>

            {/* Error / Success */}
            {error && (
              <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#BE123C', margin: 0 }}>{error}</p>
              </div>
            )}
            {success && (
              <div style={{ background: '#DCFCE7', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#166534', margin: 0 }}>✅ Profile updated! Redirecting...</p>
              </div>
            )}

            {/* Save button */}
            <button onClick={handleSave} disabled={saving}
              style={{ padding: '1rem', background: saving ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.3s', marginTop: '0.5rem' }}>
              <FiSave size={15} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
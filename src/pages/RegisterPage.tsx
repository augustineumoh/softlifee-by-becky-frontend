import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone } from 'react-icons/fi'
import { useAuth } from '../store/authStore'

export default function RegisterPage() {
  const navigate  = useNavigate()
  const { register, isAuthenticated, isLoading, error, clearError } = useAuth()

  const [form,     setForm]     = useState({ first_name: '', last_name: '', email: '', phone: '', password: '', password2: '' })
  const [showPass, setShowPass] = useState(false)
  const [localErr, setLocalErr] = useState('')

  useEffect(() => { if (isAuthenticated) navigate('/account', { replace: true }) }, [isAuthenticated])
  useEffect(() => { clearError() }, [])

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalErr('')
    if (form.password !== form.password2) { setLocalErr('Passwords do not match.'); return }
    if (form.password.length < 8) { setLocalErr('Password must be at least 8 characters.'); return }
    try {
      await register(form)
    } catch {}
  }

  const displayError = localErr || error

  const fields = [
    { key: 'first_name', label: 'First Name',  icon: <FiUser size={15}/>,  type: 'text',  placeholder: 'Becky' },
    { key: 'last_name',  label: 'Last Name',   icon: <FiUser size={15}/>,  type: 'text',  placeholder: 'Smith' },
    { key: 'email',      label: 'Email',        icon: <FiMail size={15}/>,  type: 'email', placeholder: 'hello@example.com' },
    { key: 'phone',      label: 'Phone Number', icon: <FiPhone size={15}/>, type: 'tel',   placeholder: '08012345678' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>Soft<span style={{ color: '#D4AF37' }}>Lifee</span>.</p>
          </Link>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', marginTop: '6px' }}>Join the community</p>
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 32px rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.1)' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 0.25rem' }}>Create Account</h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', marginBottom: '2rem' }}>
            Already have an account? <Link to="/login" style={{ color: '#8A4FB1', fontWeight: 600 }}>Sign in</Link>
          </p>

          {displayError && (
            <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#BE123C', margin: 0 }}>{displayError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Two column name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {fields.slice(0, 2).map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1', lineHeight: 0 }}>{f.icon}</span>
                    <input type={f.type} value={(form as any)[f.key]} onChange={update(f.key)} required placeholder={f.placeholder}
                      style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Email & Phone */}
            {fields.slice(2).map(f => (
              <div key={f.key}>
                <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1', lineHeight: 0 }}>{f.icon}</span>
                  <input type={f.type} value={(form as any)[f.key]} onChange={update(f.key)} required={f.key !== 'phone'} placeholder={f.placeholder}
                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                    onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                </div>
              </div>
            ))}

            {/* Password */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={update('password')} required minLength={8} placeholder="Min. 8 characters"
                  style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 2.75rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', lineHeight: 0 }}>
                  {showPass ? <FiEyeOff size={15}/> : <FiEye size={15}/>}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input type="password" value={form.password2} onChange={update('password2')} required placeholder="Repeat your password"
                  style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', border: `1.5px solid ${form.password2 && form.password2 !== form.password ? '#BE123C' : 'rgba(138,79,177,0.2)'}`, borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                  onBlur={e  => { e.target.style.borderColor = form.password2 && form.password2 !== form.password ? '#BE123C' : 'rgba(138,79,177,0.2)' }} />
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              style={{ padding: '1rem', background: isLoading ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '0.5rem' }}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(26,26,46,0.4)', textAlign: 'center', lineHeight: 1.6 }}>
              By creating an account you agree to our <Link to="/terms" style={{ color: '#8A4FB1' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#8A4FB1' }}>Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
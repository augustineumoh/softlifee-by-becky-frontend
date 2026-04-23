import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi'
import { useAuth } from '../store/authStore'

export default function LoginPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  const from = (location.state as any)?.from || '/account'

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated])

  useEffect(() => { clearError() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch {}
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo area
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>Soft<span style={{ color: '#D4AF37' }}>Lifee</span>.</p>
          </Link>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', marginTop: '6px' }}>Welcome back</p>
        </div> */}

        {/* Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 32px rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.1)' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 800, color: '#1A1A2E', margin: '0 0 0.25rem' }}>Sign In</h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.92rem', fontWeight: 400, color: '#5B21B6', marginBottom: '2rem' }}>
            Don't have an account? <Link to="/register" style={{ color: '#8A4FB1', fontWeight: 700 }}>Create one</Link>
          </p>

          {/* Error */}
          {error && (
            <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#BE123C', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Email */}
            <div>
              <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <FiMail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="hello@example.com"
                  style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E' }}>Password</label>
                <Link to="/forgot-password" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', color: '#8A4FB1', textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <FiLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Your password"
                  style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 2.75rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                  onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                  onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', lineHeight: 0 }}>
                  {showPass ? <FiEyeOff size={15}/> : <FiEye size={15}/>}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              style={{ padding: '1rem', background: isLoading ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: isLoading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '0.5rem' }}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(138,79,177,0.1)' }}/>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(26,26,46,0.35)', letterSpacing: '0.1em' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(138,79,177,0.1)' }}/>
          </div>

          {/* Guest checkout */}
          <button onClick={() => navigate('/shop')}
            style={{ width: '100%', padding: '0.9rem', background: 'transparent', color: '#5B21B6', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#8A4FB1'; e.currentTarget.style.background='#F3E8FF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)'; e.currentTarget.style.background='transparent' }}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
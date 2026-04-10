import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";


export default function RegisterPage() {
  const [form, setForm]         = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '' })
  const [showPass, setShowPass]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [agree, setAgree]         = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!agree) { setError('Please agree to the terms and conditions.'); return }
    setError(''); setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/account') }, 1400)
  }

  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: '"Jost", sans-serif', fontSize: '0.69rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '6px' }
  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.8rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', outline: 'none', background: '#FAF7FF', color: '#1A1A2E', boxSizing: 'border-box', transition: 'border-color 0.2s' }
  const focus = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = '#8A4FB1' }
  const blur  = (e: React.FocusEvent<HTMLInputElement>) => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FAF7FF 0%, #EDE0F7 55%, #FAF7FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(5rem,10vw,8rem) 1.5rem 3rem' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>

        {/* Logo
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '2px' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 600, color: '#1A1A2E' }}>Soft</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 600, fontStyle: 'italic', color: '#8A4FB1' }}>Lifee</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1' }}>.</span>
            </div>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.75rem', letterSpacing: '0.18em', color: '#8A4FB1', marginTop: '2px' }}>Luxury Goods · Lifestyle</p>
          </Link>
        </div> */}

        {/* Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.12)', padding: 'clamp(2rem,5vw,2.8rem)', boxShadow: '0 8px 48px rgba(138,79,177,0.08)' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 900, color: '#1A1A2E', marginBottom: '0.10rem' }}>Create Account</h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.89rem', fontWeight: 400, color: '#5B21B6', marginBottom: '2rem' }}>Join the Soft Lifee community today</p>

          {/* Google */}
          <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '1.5rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8A4FB1'; e.currentTarget.style.background = '#F3E8FF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)'; e.currentTarget.style.background = '#FAF7FF' }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign up with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(138,79,177,0.12)' }} />
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.69rem', fontWeight: 600, color: 'rgba(26,26,46,0.35)', letterSpacing: '0.1em' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(138,79,177,0.12)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input type="text" placeholder="First name" value={form.firstName}
                  onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
                  style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input type="text" placeholder="Last name" value={form.lastName}
                  onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
                  style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Email Address *</label>
              <input type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>

            <div>
              <label style={labelStyle}>Phone Number</label>
              <input type="tel" placeholder="+234 800 000 0000" value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>

            <div>
              <label style={labelStyle}>Password *</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  style={{ ...inputStyle, paddingRight: '2.8rem' }} onFocus={focus} onBlur={blur} />
                <button onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', lineHeight: 0, padding: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPass ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                  </svg>
                </button>
              </div>
              {/* Password strength */}
              {form.password && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: form.password.length >= i * 2 ? (form.password.length >= 8 ? '#8A4FB1' : '#D4AF37') : 'rgba(138,79,177,0.15)', transition: 'background 0.3s' }} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <label style={labelStyle}>Confirm Password *</label>
              <input type="password" placeholder="Repeat password" value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                style={{ ...inputStyle, borderColor: form.confirm && form.confirm !== form.password ? '#BE123C' : 'rgba(138,79,177,0.2)' }}
                onFocus={focus} onBlur={blur} />
            </div>

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <input type="checkbox" id="agree" checked={agree} onChange={e => setAgree(e.target.checked)}
                style={{ marginTop: '2px', accentColor: '#8A4FB1', width: '15px', height: '15px', flexShrink: 0, cursor: 'pointer' }} />
              <label htmlFor="agree" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.6, cursor: 'pointer' }}>
                I agree to the <Link to="/terms" style={{ color: '#8A4FB1', fontWeight: 600, textDecoration: 'none' }}>Terms & Conditions</Link> and <Link to="/privacy-policy" style={{ color: '#8A4FB1', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</Link>
              </label>
            </div>

            {error && <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: '#BE123C', background: '#FFF1F2', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid rgba(190,18,60,0.15)' }}>{error}</p>}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: loading ? '#C4A8D4' : '#8A4FB1', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#8A4FB1' }}>
              {loading
                ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Creating account...</>
                : 'Create Account'}
            </button>
          </div>

          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6', textAlign: 'center', marginTop: '1.5rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#8A4FB1', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Sign in <FaArrowRight /></Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiLock, FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import { authAPI } from '../services/api'

export default function ResetPasswordPage() {
  const navigate        = useNavigate()
  const [params]        = useSearchParams()
  const token           = params.get('token') || ''

  const [newPass,     setNewPass]     = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [showNew,     setShowNew]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [done,        setDone]        = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
        <div style={{ width: '100%', maxWidth: '440px', background: '#FFF', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 32px rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.1)', textAlign: 'center' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#BE123C', marginBottom: '1.5rem' }}>This reset link is invalid or has expired.</p>
          <Link to="/forgot-password" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>
            Request a new link →
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPass !== confirmPass) {
      setError('Passwords do not match.')
      return
    }
    if (newPass.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await authAPI.confirmPasswordReset(token, newPass, confirmPass)
      setDone(true)
      setTimeout(() => navigate('/login'), 3000)
    } catch (err: any) {
      const msg = err?.detail || err?.token?.[0] || err?.new_password?.[0] || 'The link may have expired. Please request a new one.'
      setError(String(msg))
    } finally {
      setLoading(false)
    }
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '0.85rem 3rem 0.85rem 2.75rem',
    border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px',
    fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E',
    background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 32px rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.1)' }}>

          {done ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <FiCheck size={28} color="#FFF" strokeWidth={2.5} />
              </div>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.9rem', fontWeight: 800, color: '#1A1A2E', margin: '0 0 0.75rem' }}>Password updated!</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#5B21B6', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Your password has been changed. Redirecting you to sign in…
              </p>
              <Link to="/login" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>
                Sign In Now →
              </Link>
            </div>
          ) : (
            <>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 800, color: '#1A1A2E', margin: '0 0 0.25rem' }}>New Password</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#5B21B6', marginBottom: '2rem', lineHeight: 1.6 }}>
                Choose a strong password — at least 8 characters.
              </p>

              {error && (
                <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#BE123C', margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <FiLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                    <input type={showNew ? 'text' : 'password'} value={newPass} onChange={e => setNewPass(e.target.value)} required placeholder="New password" style={inp}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    <button type="button" onClick={() => setShowNew(s => !s)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', lineHeight: 0 }}>
                      {showNew ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Confirm Password</label>
                  <div style={{ position: 'relative' }}>
                    <FiLock size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8A4FB1' }} />
                    <input type={showConfirm ? 'text' : 'password'} value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required placeholder="Confirm new password" style={inp}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    <button type="button" onClick={() => setShowConfirm(s => !s)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', lineHeight: 0 }}>
                      {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  style={{ padding: '1rem', background: loading ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '0.5rem' }}>
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

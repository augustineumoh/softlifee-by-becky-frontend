import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { authAPI } from '../services/api'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await authAPI.requestPasswordReset(email.trim().toLowerCase())
      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 32px rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.1)' }}>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <FiCheck size={28} color="#FFF" strokeWidth={2.5} />
              </div>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.9rem', fontWeight: 800, color: '#1A1A2E', margin: '0 0 0.75rem' }}>Check your inbox</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#5B21B6', lineHeight: 1.7, marginBottom: '2rem' }}>
                If an account exists for <strong style={{ fontWeight: 700 }}>{email}</strong>, you'll receive a password reset link shortly. Check your spam folder if it doesn't arrive.
              </p>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>
                <FiArrowLeft size={13} /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', marginBottom: '1.5rem' }}>
                <FiArrowLeft size={12} /> Back to Sign In
              </Link>

              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 800, color: '#1A1A2E', margin: '0 0 0.25rem' }}>Reset Password</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#5B21B6', marginBottom: '2rem', lineHeight: 1.6 }}>
                Enter the email address on your account and we'll send you a reset link.
              </p>

              {error && (
                <div style={{ background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#BE123C', margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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

                <button type="submit" disabled={loading}
                  style={{ padding: '1rem', background: loading ? 'rgba(138,79,177,0.6)' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}>
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

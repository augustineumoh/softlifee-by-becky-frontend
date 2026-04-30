import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { newsletterAPI } from '../services/api'

export default function UnsubscribePage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading')

  useEffect(() => {
    if (!token) { setStatus('error'); return }
    newsletterAPI.unsubscribe(token)
      .then(() => setStatus('done'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#FFF', borderRadius: '16px', padding: 'clamp(2rem,5vw,3rem)', maxWidth: '480px', width: '90%', textAlign: 'center', border: '1px solid rgba(138,79,177,0.12)', boxShadow: '0 4px 24px rgba(138,79,177,0.06)' }}>
        {status === 'loading' && (
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', color: '#8A4FB1' }}>Unsubscribing…</p>
        )}
        {status === 'done' && (
          <>
            <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💜</p>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 700, color: '#1A1A2E', marginBottom: '0.75rem' }}>
              You've been unsubscribed
            </h1>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.8, marginBottom: '2rem' }}>
              We're sorry to see you go. You'll no longer receive newsletter emails from Soft Lifee by Becky.
            </p>
            <Link to="/shop" style={{ display: 'inline-block', background: '#8A4FB1', color: '#FFF', textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Continue Shopping
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤔</p>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.3rem,4vw,1.8rem)', fontWeight: 700, color: '#1A1A2E', marginBottom: '0.75rem' }}>
              Invalid or expired link
            </h1>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.8, marginBottom: '2rem' }}>
              This unsubscribe link doesn't look right. If you're still receiving emails you'd like to stop,
              please <Link to="/contact" style={{ color: '#8A4FB1' }}>contact us</Link> and we'll sort it out.
            </p>
            <Link to="/" style={{ display: 'inline-block', background: '#F3E8FF', color: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Go Home
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    if (countdown <= 0) { navigate('/'); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, navigate])

  const quickLinks = [
    { label: 'Shop All',     to: '/shop',         emoji: '🛍️' },
    { label: 'New Arrivals', to: '/new-arrivals',  emoji: '✨' },
    { label: 'Gift Ideas',   to: '/gift-ideas',    emoji: '🎁' },
    { label: 'Contact Us',   to: '/contact',       emoji: '💬' },
  ]

  return (
    <div style={{ background: 'linear-gradient(160deg, #FAF7FF 0%, #EDE0F7 50%, #FAF7FF 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '68px', padding: 'clamp(5rem,10vw,8rem) clamp(1.5rem,4vw,2rem)' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>

        {/* Big 404 watermark */}
        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(8rem,22vw,16rem)', fontWeight: 700, color: 'rgba(138,79,177,0.08)', lineHeight: 1, userSelect: 'none', animation: 'nf-float 4s ease-in-out infinite' }}>
            404
          </div>
          {/* Floating icon over the 404 */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(138,79,177,0.3)', animation: 'nf-popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.2s both' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ animation: 'nf-fadeUp 0.7s ease 0.3s both' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 600, color: '#1A1A2E', margin: '0 0 0.75rem 0' }}>
            Oops! This page got lost.
          </h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.8, marginBottom: '2rem' }}>
            The page you're looking for doesn't exist or may have moved. Don't worry — let's get you back to something beautiful.
          </p>

          {/* Countdown */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(138,79,177,0.07)', border: '1px solid rgba(138,79,177,0.15)', borderRadius: '100px', padding: '6px 16px', marginBottom: '2rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8A4FB1', animation: 'nf-pulse 1s ease-in-out infinite' }} />
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 500, color: '#5B21B6' }}>
              Redirecting to home in <strong style={{ color: '#8A4FB1' }}>{countdown}s</strong>
            </span>
          </div>

          {/* Primary CTA */}
          <div style={{ marginBottom: '3rem' }}>
            <Link to="/" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '8px', display: 'inline-block', transition: 'background 0.3s', marginBottom: '1rem' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Take Me Home
            </Link>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.35)', marginBottom: '1rem' }}>
              Or explore
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {quickLinks.map(link => (
                <Link key={link.to} to={link.to}
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#8A4FB1', textDecoration: 'none', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.18)', borderRadius: '100px', padding: '0.6rem 1.2rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#8A4FB1' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#8A4FB1'; e.currentTarget.style.borderColor = 'rgba(138,79,177,0.18)' }}>
                  <span style={{ fontSize: '0.85rem' }}>{link.emoji}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes nf-float   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes nf-popIn   { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes nf-fadeUp  { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes nf-pulse   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(0.8); } }
      `}</style>
    </div>
  )
}
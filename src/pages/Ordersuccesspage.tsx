import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, from = 'bottom' }: { children: React.ReactNode; delay?: number; from?: 'bottom' | 'left' | 'right' | 'fade' }) {
  const { ref, visible } = useInView()
  const t = from === 'left' ? 'translateX(-30px)' : from === 'right' ? 'translateX(30px)' : from === 'fade' ? 'none' : 'translateY(28px)'
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t, transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  )
}

// Fake order data — replace with real data from your order state/API later
const orderDetails = {
  orderNumber: 'SL-2025-00142',
  date: new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }),
  estimatedDelivery: '3–5 Business Days',
  items: [
    { name: 'Diffuser', qty: 1, price: 15000 },
    { name: 'Green Stick Mask', qty: 2, price: 10000 },
  ],
  subtotal: 25000,
  delivery: 2500,
  total: 27500,
  address: 'Lagos, Nigeria',
}

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

export default function OrderSuccessPage() {
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 60%, #FAF7FF 100%)', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── CONFETTI PARTICLES ── */}
      {confetti && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9000, overflow: 'hidden' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '-20px',
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              background: ['#8A4FB1', '#D4AF37', '#5B21B6', '#E8D5F5', '#C4A8D4'][Math.floor(Math.random() * 5)],
              animation: `os-fall ${2 + Math.random() * 2}s ease-in ${Math.random() * 1.5}s forwards`,
            }} />
          ))}
        </div>
      )}

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,2rem)' }}>

        {/* ── SUCCESS ICON ── */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              width: '88px', height: '88px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 8px 32px rgba(138,79,177,0.3)',
              animation: 'os-popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(138,79,177,0.08)', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '100px', padding: '4px 14px', marginBottom: '1rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8A4FB1', animation: 'os-pulse 1.5s ease-in-out infinite' }} />
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A4FB1' }}>Order Confirmed</span>
            </div>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 600, color: '#1A1A2E', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
              Thank you for your order!
            </h1>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.7 }}>
              We've received your order and we're preparing it with care. You'll receive a confirmation shortly.
            </p>
          </div>
        </Reveal>

        {/* ── ORDER SUMMARY CARD ── */}
        <Reveal delay={0.15}>
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.12)', borderRadius: '16px', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 24px rgba(138,79,177,0.06)' }}>

            {/* Card header */}
            <div style={{ background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', padding: '1.2rem 1.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '2px' }}>Order Number</p>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 600, color: '#FFFFFF' }}>{orderDetails.orderNumber}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '2px' }}>Date</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 400, color: '#FFFFFF' }}>{orderDetails.date}</p>
              </div>
            </div>

            {/* Items */}
            <div style={{ padding: '1.5rem 1.8rem' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '1rem' }}>Items Ordered</p>
              {orderDetails.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: i < orderDetails.items.length - 1 ? '1px solid rgba(138,79,177,0.08)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#F0E8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#8A4FB1' }}>×{item.qty}</span>
                    </div>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#1A1A2E' }}>{item.name}</span>
                  </div>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{formatPrice(item.price)}</span>
                </div>
              ))}

              {/* Totals */}
              <div style={{ marginTop: '1.2rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(138,79,177,0.12)' }}>
                {[
                  { label: 'Subtotal', value: formatPrice(orderDetails.subtotal) },
                  { label: 'Delivery', value: formatPrice(orderDetails.delivery) },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 300, color: '#5B21B6' }}>{r.label}</span>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 400, color: '#1A1A2E' }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(138,79,177,0.12)', marginTop: '0.5rem' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E' }}>Total Paid</span>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(orderDetails.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── DELIVERY INFO ── */}
        <Reveal delay={0.25}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2.5rem' }}>
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="1.8"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>,
                label: 'Estimated Delivery',
                value: orderDetails.estimatedDelivery,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: 'Delivery To',
                value: orderDetails.address,
              },
            ].map(info => (
              <div key={info.label} style={{ background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '12px', padding: '1.2rem', display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {info.icon}
                </div>
                <div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', marginBottom: '3px' }}>{info.label}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── ACTIONS ── */}
        <Reveal delay={0.35}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link to="/account/orders" style={{ flex: 1, fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '1rem', borderRadius: '8px', textAlign: 'center', transition: 'background 0.3s', minWidth: '160px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Track My Order
            </Link>
            <Link to="/shop" style={{ flex: 1, fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', background: 'transparent', textDecoration: 'none', padding: '1rem', borderRadius: '8px', textAlign: 'center', border: '1px solid #8A4FB1', transition: 'all 0.3s', minWidth: '160px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A4FB1' }}>
              Continue Shopping
            </Link>
          </div>
        </Reveal>

        {/* ── WHATSAPP ── */}
        <Reveal delay={0.4}>
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(37,211,102,0.2)', borderRadius: '12px', padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(37,211,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '2px' }}>Questions about your order?</p>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: '#5B21B6' }}>Chat with us on WhatsApp — we respond fast!</p>
            </div>
            <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer"
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#25D366', background: 'transparent', textDecoration: 'none', padding: '0.65rem 1.2rem', border: '1px solid #25D366', borderRadius: '6px', whiteSpace: 'nowrap', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#25D366' }}>
              Chat Now
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes os-popIn  { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes os-fall   { to   { transform: translateY(110vh) rotate(540deg); opacity: 0; } }
        @keyframes os-pulse  { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.85); } }
        @media (max-width:600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
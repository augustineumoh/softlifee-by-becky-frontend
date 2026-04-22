import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cartStore'

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')
const FREE_DELIVERY_THRESHOLD = 50000
const FLAT_DELIVERY = 2500

export default function CartPage() {
  const { items, removeItem, updateQty } = useCart()
  const navigate = useNavigate()
  const [removing, setRemoving] = useState<number | null>(null)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : FLAT_DELIVERY
  const grandTotal  = subtotal + deliveryFee

  const handleRemove = (id: number) => {
    setRemoving(id)
    setTimeout(() => { removeItem(id); setRemoving(null) }, 320)
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #FAF7FF 0%, #EDE0F7 55%, #FAF7FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '68px', padding: 'clamp(5rem,10vw,8rem) 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: '420px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="1.6">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '0.75rem' }}>Your cart is empty</h2>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#5B21B6', marginBottom: '2rem', lineHeight: 1.7 }}>Looks like you haven't added anything yet. Let's fix that!</p>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '8px', display: 'inline-block', transition: 'background 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 50%, #FAF7FF 100%)', minHeight: '100vh', paddingTop: '68px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.4rem' }}>Your Bag</p>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>
            Shopping Cart <span style={{ fontFamily: '"Jost", sans-serif', fontStyle: 'normal', fontSize: '1rem', fontWeight: 400, color: '#8A4FB1' }}>({items.length} item{items.length > 1 ? 's' : ''})</span>
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'flex-start' }}>

          {/* ── CART ITEMS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', padding: '1.2rem', display: 'flex', gap: '1.2rem', alignItems: 'center', transition: 'all 0.32s ease', opacity: removing === item.id ? 0 : 1, transform: removing === item.id ? 'translateX(-20px)' : 'none' }}>

              {/* Image */}
              <Link to={`/product/${item.slug}`} style={{ flexShrink: 0, width: '100px', height: '120px', borderRadius: '8px', overflow: 'hidden', background: '#F0E8FA', display: 'block' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Link>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '4px' }}>{item.category}</p>
                <Link to={`/product/${item.slug}`} style={{ textDecoration: 'none' }}>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2, marginBottom: '6px' }}>{item.name}</p>
                </Link>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#8A4FB1', marginBottom: '1rem' }}>{formatPrice(item.price)}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {/* Qty stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
                    <button onClick={() => updateQty(item.id, item.quantity - 1)}
                      style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F3E8FF' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>−</button>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', minWidth: '36px', textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, item.quantity + 1)}
                      style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#F3E8FF' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>+</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 700, color: '#1A1A2E' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button onClick={() => handleRemove(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.3)', padding: '4px', lineHeight: 0, transition: 'color 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#BE123C' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,46,0.3)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}

            {/* Continue shopping */}
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', marginTop: '0.5rem', width: 'fit-content' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              Continue Shopping
            </Link>
          </div>

          {/* ── ORDER SUMMARY ── */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.12)', padding: '1.8rem', position: 'sticky', top: '88px', boxShadow: '0 4px 24px rgba(138,79,177,0.06)' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.3rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6' }}>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6' }}>Delivery</span>
                {deliveryFee === 0
                  ? <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '2px 10px', borderRadius: '100px' }}>FREE</span>
                  : <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E' }}>{formatPrice(deliveryFee)}</span>
                }
              </div>
            </div>

            {/* Free delivery progress */}
            {subtotal < FREE_DELIVERY_THRESHOLD && (
              <div style={{ background: '#FAF7FF', borderRadius: '8px', padding: '0.85rem', marginBottom: '1.2rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 500, color: '#5B21B6', marginBottom: '6px' }}>
                  Add <strong style={{ color: '#8A4FB1' }}>{formatPrice(FREE_DELIVERY_THRESHOLD - subtotal)}</strong> more for free delivery!
                </p>
                <div style={{ height: '5px', background: 'rgba(138,79,177,0.12)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%`, background: 'linear-gradient(to right, #8A4FB1, #D4AF37)', borderRadius: '100px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            )}

            <div style={{ borderTop: '1px solid rgba(138,79,177,0.1)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A2E' }}>Total</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(grandTotal)}</span>
            </div>

            <button onClick={() => navigate('/checkout')}
              style={{ width: '100%', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s', marginBottom: '0.85rem' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Proceed to Checkout →
            </button>

            {/* Payment badges */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {['Paystack', 'Visa', 'Mastercard', 'Verve'].map(badge => (
                <div key={badge} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', background: '#FAF7FF', border: '1px solid rgba(138,79,177,0.1)', padding: '3px 8px', borderRadius: '4px' }}>
                  {badge}
                </div>
              ))}
            </div>

            {/* Secure badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 500, color: '#8A4FB1' }}>Secured by Paystack</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 340px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiPackage, FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi'
import { ordersAPI, getCloudinaryUrl, type Order } from '../services/api'
import { useAuth } from '../store/authStore'

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#FEF9C3', color: '#854D0E' },
  confirmed:  { bg: '#F3E8FF', color: '#5B21B6' },
  processing: { bg: '#EDE9FE', color: '#4C1D95' },
  shipped:    { bg: '#DBEAFE', color: '#1E40AF' },
  delivered:  { bg: '#DCFCE7', color: '#166534' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
}

const STATUS_STEPS = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

export default function OrderDetailPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>()
  const location = useLocation()
  const navigate  = useNavigate()
  const { isAuthenticated } = useAuth()

  const [order,   setOrder]   = useState<Order | null>((location.state as any)?.order ?? null)
  const [loading, setLoading] = useState(!order)
  const [error,   setError]   = useState('')

  useEffect(() => {
    if (!isAuthenticated) { navigate('/login', { state: { from: `/account/orders/${orderNumber}` } }); return }
    if (order) return
    ordersAPI.getMyOrders()
      .then(orders => {
        const found = orders.find(o => o.order_number === orderNumber)
        if (found) setOrder(found)
        else setError('Order not found.')
      })
      .catch(() => setError('Could not load order. Please try again.'))
      .finally(() => setLoading(false))
  }, [orderNumber, isAuthenticated])

  if (loading) return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: '"Jost", sans-serif', color: 'rgba(26,26,46,0.4)', fontSize: '0.85rem' }}>Loading order…</p>
    </div>
  )

  if (error || !order) return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#8A4FB1' }}>{error || 'Order not found'}</p>
      <Link to="/account" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Back to Account</Link>
    </div>
  )

  const sc           = STATUS_COLORS[order.status] || { bg: '#F3E8FF', color: '#5B21B6' }
  const stepIdx      = STATUS_STEPS.indexOf(order.status)
  const isCancelled  = order.status === 'cancelled'

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #3D1A6E 60%, #5B21B6 100%)', padding: 'clamp(1.5rem,4vw,2.5rem) clamp(1.25rem,6vw,5rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button onClick={() => navigate('/account')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: 0, marginBottom: '1.25rem' }}>
            <FiArrowLeft size={14}/> Back to Account
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.8)', margin: '0 0 4px' }}>Order Details</p>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem,4vw,2rem)', fontWeight: 700, color: '#FFF', margin: '0 0 4px' }}>{order.order_number}</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
                {new Date(order.created_at).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <span style={{ background: sc.bg, color: sc.color, fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '100px', alignSelf: 'flex-start' }}>
              {order.status_display}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem clamp(1.25rem,6vw,5rem) 4rem' }}>

        {/* Progress tracker */}
        {!isCancelled && (
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)', marginBottom: '1.5rem' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.25rem' }}>Order Progress</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {STATUS_STEPS.map((step, i) => {
                const done    = i <= stepIdx
                const current = i === stepIdx
                return (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: done ? '#8A4FB1' : '#F3E8FF', border: `2px solid ${done ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', boxShadow: current ? '0 0 0 4px rgba(138,79,177,0.15)' : 'none' }}>
                        {done && i < stepIdx
                          ? <FiCheck size={14} color="#FFF"/>
                          : <FiPackage size={13} color={done ? '#FFF' : 'rgba(138,79,177,0.4)'}/>
                        }
                      </div>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: done ? '#8A4FB1' : 'rgba(26,26,46,0.3)', whiteSpace: 'nowrap' }}>
                        {step}
                      </span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div style={{ flex: 1, height: '2px', background: i < stepIdx ? '#8A4FB1' : 'rgba(138,79,177,0.15)', margin: '0 4px', marginBottom: '22px', transition: 'background 0.3s' }}/>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '1.25rem' }}>

          {/* Order items */}
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)', gridColumn: 'span 2' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.25rem' }}>
              Items Ordered ({order.items.length})
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {order.items.map(item => {
                const imgSrc = item.product_image ? getCloudinaryUrl(item.product_image, 120) : ''
                return (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(138,79,177,0.07)' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '10px', background: '#F0E8FA', overflow: 'hidden', flexShrink: 0 }}>
                      {imgSrc
                        ? <img src={imgSrc} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                        : <div style={{ width: '100%', height: '100%', background: '#F0E8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiPackage size={22} color="#8A4FB1"/></div>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2px', lineHeight: 1.2 }}>{item.product_name}</p>
                      {item.color_variant && (
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(26,26,46,0.45)', margin: '0 0 4px' }}>Colour: {item.color_variant}</p>
                      )}
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: '#5B21B6', margin: 0 }}>
                        {formatPrice(item.product_price)} × {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 700, color: '#8A4FB1', margin: 0, flexShrink: 0 }}>
                      {formatPrice(item.subtotal)}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Totals */}
            <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Subtotal',          value: formatPrice(order.subtotal) },
                { label: 'Delivery Fee',       value: formatPrice(order.delivery_fee) },
                ...(Number(order.discount_amount) > 0
                  ? [{ label: 'Discount', value: `−${formatPrice(order.discount_amount)}` }]
                  : []),
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.55)' }}>{row.label}</span>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1.5px solid rgba(138,79,177,0.12)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E' }}>Total</span>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiMapPin size={15} color="#8A4FB1"/>
              </div>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: 0 }}>Delivery Address</p>
            </div>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 4px' }}>{order.customer_name}</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#5B21B6', margin: '0 0 2px', lineHeight: 1.6 }}>{order.delivery_address}</p>
            {order.delivery_city && (
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#5B21B6', margin: '0 0 2px' }}>{order.delivery_city}, {order.delivery_state}</p>
            )}
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.4)', margin: '0.5rem 0 0' }}>{order.customer_phone}</p>
          </div>

          {/* Payment info */}
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiCreditCard size={15} color="#8A4FB1"/>
              </div>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: 0 }}>Payment</p>
            </div>
            {[
              { label: 'Method',  value: order.payment_method?.replace(/_/g, ' ') || '—' },
              { label: 'Status',  value: order.payment_status_display || '—' },
              ...(order.paid_at ? [{ label: 'Paid At', value: new Date(order.paid_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) }] : []),
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', color: 'rgba(26,26,46,0.45)', textTransform: 'capitalize' }}>{row.label}</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A2E', textTransform: 'capitalize' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link to="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.85rem 2rem', borderRadius: '8px', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
            Continue Shopping
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </div>
  )
}

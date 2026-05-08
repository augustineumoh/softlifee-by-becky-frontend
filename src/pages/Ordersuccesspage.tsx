import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { FiCheck, FiPackage, FiMail } from 'react-icons/fi'
import { useVerifyPayment } from '../hooks/useOrders'
import type { Order } from '../services/api'

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

export default function OrderSuccessPage() {
  const [params]  = useSearchParams()
  const location  = useLocation()
  const reference = params.get('reference')
  const orderNum  = params.get('order')
  const method    = params.get('method')

  const isPOD = method === 'pod'

  // POD orders pass order data as route state (no Paystack reference to verify)
  const stateOrder = (location.state as any)?.order as Order | undefined
  const { order: verifiedOrder, loading } = useVerifyPayment(reference)
  const order = verifiedOrder ?? stateOrder ?? null

  const displayOrderNum = order?.order_number || orderNum || '—'

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 2rem' }}>
      <div style={{ width: '100%', maxWidth: '560px', textAlign: 'center' }}>

        {/* Success icon */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 8px 32px rgba(138,79,177,0.25)' }}>
          <FiCheck size={36} color="#FFF" strokeWidth={3} />
        </div>

        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#1A1A2E', margin: '0 0 0.5rem' }}>
          {isPOD ? 'Order Placed!' : 'Payment Successful!'}
        </h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, color: '#5B21B6', marginBottom: '2rem', lineHeight: 1.7 }}>
          {isPOD
            ? 'Your order has been placed. Our delivery agent will contact you before arrival.'
            : 'Thank you for your purchase! Your order has been confirmed and is being prepared.'
          }
        </p>

        {/* Order details card */}
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 4px 24px rgba(138,79,177,0.06)', marginBottom: '2rem', textAlign: 'left' }}>

          {loading ? (
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: 'rgba(26,26,46,0.4)', textAlign: 'center' }}>Verifying payment...</p>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 4px' }}>Order Number</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>{displayOrderNum}</p>
                </div>
                <span style={{ background: '#DCFCE7', color: '#166534', fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px' }}>
                  {isPOD ? 'Confirmed' : 'Paid'}
                </span>
              </div>

              {order && (
                <>
                  <div style={{ height: '1px', background: 'rgba(138,79,177,0.08)', margin: '0 0 1.25rem' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
                    {[
                      { label: 'Customer',  value: order.customer_name },
                      { label: 'Email',     value: order.customer_email },
                      { label: 'Phone',     value: order.customer_phone },
                      { label: 'Delivering to', value: `${order.delivery_address}, ${order.delivery_city}, ${order.delivery_state}` },
                      { label: 'Total Paid', value: formatPrice(order.total) },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(26,26,46,0.45)', flexShrink: 0 }}>{row.label}</span>
                        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#1A1A2E', textAlign: 'right' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Email notice */}
              <div style={{ display: 'flex', gap: '10px', background: '#F3E8FF', borderRadius: '10px', padding: '1rem' }}>
                <FiMail size={16} color="#8A4FB1" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: '#5B21B6', margin: 0, lineHeight: 1.6 }}>
                  A confirmation email has been sent to <strong style={{ fontWeight: 600 }}>{order?.customer_email || 'your email'}</strong>.
                  Keep it safe for your records.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Delivery info */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(138,79,177,0.08)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiPackage size={18} color="#8A4FB1" />
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#1A1A2E', margin: '0 0 2px' }}>Estimated Delivery</p>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#5B21B6', margin: 0 }}>Lagos: 1–2 business days · Other states: 3–5 business days</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/account" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '8px', transition: 'background 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
            Track My Order
          </Link>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5B21B6', background: 'transparent', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '8px', border: '1.5px solid rgba(138,79,177,0.2)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8A4FB1'; e.currentTarget.style.color = '#8A4FB1' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)'; e.currentTarget.style.color = '#5B21B6' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
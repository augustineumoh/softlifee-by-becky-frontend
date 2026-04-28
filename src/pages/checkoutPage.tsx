import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCheck, FiTruck, FiCreditCard, FiShoppingBag, FiTag, FiAlertCircle } from 'react-icons/fi'
import { useCart } from '../store/cartStore'
import { useAuth } from '../store/authStore'
import { useCreateOrder } from '../hooks/useOrders'
import { useDiscount } from '../hooks/useOrders'

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

const NIGERIAN_STATES = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
  'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
  'Yobe','Zamfara',
]

const DELIVERY_RATES: Record<string, number> = {
  'Lagos': 1500, 'Ogun': 2000, 'Oyo': 2500,
  'Osun': 2500, 'Ekiti': 2500,
}
const FREE_THRESHOLD = 50000
const DEFAULT_DELIVERY = 3500

function getDeliveryFee(state: string, subtotal: number): number {
  if (subtotal >= FREE_THRESHOLD) return 0
  return DELIVERY_RATES[state] ?? DEFAULT_DELIVERY
}

const STEPS = ['Delivery', 'Payment', 'Review']

export default function CheckoutPage() {
  const navigate  = useNavigate()
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const { createOrder, loading: orderLoading, error: orderError } = useCreateOrder()
  const { validate: validateDiscount, clear: clearDiscount, discount, loading: discountLoading, error: discountError, appliedCode } = useDiscount()

  const [step, setStep] = useState(0)
  const [discountInput, setDiscountInput] = useState('')

  const [delivery, setDelivery] = useState({
    full_name: user?.full_name || '',
    email:     user?.email     || '',
    phone:     user?.phone     || '',
    address:   '',
    city:      '',
    state:     '',
    notes:     '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'pod'>('card')

  useEffect(() => {
    if (items.length === 0) navigate('/cart')
  }, [items])

  useEffect(() => {
    if (user) setDelivery(d => ({ ...d, full_name: user.full_name || '', email: user.email || '', phone: user.phone || '' }))
  }, [user])

  const subtotal     = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const discountAmt  = discount ? Number(discount.discount_amount) : 0
  const deliveryFee  = getDeliveryFee(delivery.state, subtotal - discountAmt)
  const total        = subtotal - discountAmt + deliveryFee

  const updateDelivery = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDelivery(d => ({ ...d, [k]: e.target.value }))

  const handleDiscountApply = () => {
    validateDiscount(discountInput.trim().toUpperCase(), subtotal)
  }

  const handlePlaceOrder = async () => {
    const orderData = {
      customer_name:    delivery.full_name,
      customer_email:   delivery.email,
      customer_phone:   delivery.phone,
      delivery_address: delivery.address,
      delivery_city:    delivery.city,
      delivery_state:   delivery.state,
      delivery_notes:   delivery.notes,
      payment_method:   paymentMethod,
      discount_code:    appliedCode || undefined,
      items: items.map(i => ({
        product_slug:  i.slug,
        quantity:      i.quantity,
        color_variant: (i as any).colorVariant || '',
      })),
    }

    const res = await createOrder(orderData)
    if (!res) return

    if (paymentMethod === 'pod') {
      clearCart()
      navigate(`/order-success?order=${res.order.order_number}&method=pod`)
      return
    }

    // Card/transfer/ussd — redirect to Paystack
    if (res.payment_url) {
      clearCart()
      window.location.href = res.payment_url
    }
  }

  const isDeliveryValid = delivery.full_name && delivery.email && delivery.phone && delivery.address && delivery.city && delivery.state

  // ── Input style helper ────────────────────────────────────────────────────
  const inp: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px',
    fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E',
    background: '#FAF7FF', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem clamp(1rem,4vw,3rem)' }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link to="/cart" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '1rem' }}>
            ← Back to Cart
          </Link>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Checkout</h1>
        </div>

        {/* ── STEP INDICATOR ── */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i < step ? '#16A34A' : i === step ? '#8A4FB1' : 'rgba(138,79,177,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}>
                  {i < step
                    ? <FiCheck size={13} color="#FFF" />
                    : <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: i === step ? '#FFF' : 'rgba(138,79,177,0.5)' }}>{i + 1}</span>
                  }
                </div>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: i === step ? '#8A4FB1' : i < step ? '#16A34A' : 'rgba(26,26,46,0.35)' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: '1px', background: i < step ? '#16A34A' : 'rgba(138,79,177,0.15)', margin: '0 1rem', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'flex-start' }}>

          {/* ── LEFT — Steps ── */}
          <div>

            {/* ── STEP 0: DELIVERY ── */}
            {step === 0 && (
              <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <FiTruck size={18} color="#8A4FB1" />
                  <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', margin: 0 }}>Delivery Information</h2>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                      <input value={delivery.full_name} onChange={updateDelivery('full_name')} placeholder="Becky Smith" style={inp}
                        onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Phone Number *</label>
                      <input value={delivery.phone} onChange={updateDelivery('phone')} placeholder="08012345678" style={inp}
                        onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                    <input type="email" value={delivery.email} onChange={updateDelivery('email')} placeholder="hello@example.com" style={inp}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>

                  <div>
                    <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Delivery Address *</label>
                    <input value={delivery.address} onChange={updateDelivery('address')} placeholder="12 Banana Island Road, Flat 3" style={inp}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>City *</label>
                      <input value={delivery.city} onChange={updateDelivery('city')} placeholder="Lagos" style={inp}
                        onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    </div>
                    <div>
                      <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>State *</label>
                      <select value={delivery.state} onChange={updateDelivery('state')} style={{ ...inp, cursor: 'pointer' }}
                        onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }}>
                        <option value="">Select state</option>
                        {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Delivery Notes <span style={{ fontWeight: 400, opacity: 0.5 }}>(optional)</span></label>
                    <textarea value={delivery.notes} onChange={updateDelivery('notes')} placeholder="e.g. Call before arrival, leave at gate..."
                      rows={2}
                      style={{ ...inp, resize: 'none', lineHeight: 1.6 }}
                      onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>
                </div>

                <button onClick={() => setStep(1)} disabled={!isDeliveryValid}
                  style={{ marginTop: '1.5rem', width: '100%', padding: '1rem', background: isDeliveryValid ? '#8A4FB1' : 'rgba(138,79,177,0.3)', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: isDeliveryValid ? 'pointer' : 'not-allowed', transition: 'background 0.3s' }}>
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* ── STEP 1: PAYMENT ── */}
            {step === 1 && (
              <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <FiCreditCard size={18} color="#8A4FB1" />
                  <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', margin: 0 }}>Payment Method</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {[
                    { id: 'card',     label: 'Debit / Credit Card',    desc: 'Pay securely with Paystack',           icon: '💳' },
                    { id: 'transfer', label: 'Bank Transfer',           desc: 'Transfer to our bank account',         icon: '🏦' },
                    { id: 'ussd',     label: 'USSD',                    desc: 'Pay with *737# or *901#',              icon: '📱' },
                    { id: 'pod',      label: 'Pay on Delivery',         desc: 'Cash payment when order arrives',      icon: '🚚' },
                  ].map(method => (
                    <button key={method.id} onClick={() => setPaymentMethod(method.id as any)}
                      style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: `2px solid ${paymentMethod === method.id ? '#8A4FB1' : 'rgba(138,79,177,0.15)'}`, borderRadius: '12px', background: paymentMethod === method.id ? '#F3E8FF' : '#FFF', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{method.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>{method.label}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 300, color: '#5B21B6', margin: '2px 0 0' }}>{method.desc}</p>
                      </div>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${paymentMethod === method.id ? '#8A4FB1' : 'rgba(138,79,177,0.3)'}`, background: paymentMethod === method.id ? '#8A4FB1' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                        {paymentMethod === method.id && <FiCheck size={11} color="#FFF" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Discount code */}
                <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#FAF7FF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                    <FiTag size={14} color="#8A4FB1" />
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E' }}>Discount Code</span>
                  </div>
                  {discount ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#DCFCE7', borderRadius: '8px', padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiCheck size={14} color="#16A34A" />
                        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#16A34A' }}>{discount.code} — {discount.message}</span>
                      </div>
                      <button onClick={clearDiscount} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16A34A', fontSize: '1rem', fontWeight: 700 }}>×</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input value={discountInput} onChange={e => setDiscountInput(e.target.value.toUpperCase())} placeholder="Enter code (e.g. SAVE10)"
                        onKeyDown={e => { if (e.key === 'Enter') handleDiscountApply() }}
                        style={{ flex: 1, padding: '0.75rem 1rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: '#1A1A2E', background: '#FFF', outline: 'none' }}
                        onFocus={e => { e.target.style.borderColor = '#8A4FB1' }} onBlur={e => { e.target.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                      <button onClick={handleDiscountApply} disabled={!discountInput.trim() || discountLoading}
                        style={{ padding: '0.75rem 1.25rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                        {discountLoading ? '...' : 'Apply'}
                      </button>
                    </div>
                  )}
                  {discountError && <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: '#BE123C', margin: '6px 0 0' }}>{discountError}</p>}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setStep(0)}
                    style={{ flex: 1, padding: '1rem', background: 'transparent', color: '#5B21B6', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button onClick={() => setStep(2)}
                    style={{ flex: 2, padding: '1rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: REVIEW ── */}
            {step === 2 && (
              <div style={{ background: '#FFF', borderRadius: '16px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <FiShoppingBag size={18} color="#8A4FB1" />
                  <h2 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', margin: 0 }}>Review Your Order</h2>
                </div>

                {/* Delivery summary */}
                <div style={{ background: '#FAF7FF', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid rgba(138,79,177,0.08)' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.5rem' }}>Delivering to</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2px' }}>{delivery.full_name} · {delivery.phone}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 300, color: '#5B21B6', margin: 0 }}>{delivery.address}, {delivery.city}, {delivery.state}</p>
                </div>

                {/* Payment summary */}
                <div style={{ background: '#FAF7FF', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid rgba(138,79,177,0.08)' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.5rem' }}>Payment</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>
                    {{ card: '💳 Card Payment', transfer: '🏦 Bank Transfer', ussd: '📱 USSD', pod: '🚚 Pay on Delivery' }[paymentMethod]}
                  </p>
                </div>

                {/* Items */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '12px', padding: '0.75rem 0', borderBottom: '1px solid rgba(138,79,177,0.06)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px', background: '#F0E8FA', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: '#5B21B6', margin: 0 }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#8A4FB1', flexShrink: 0, margin: 0 }}>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                {/* Error */}
                {orderError && (
                  <div style={{ display: 'flex', gap: '8px', background: '#FFF1F2', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem' }}>
                    <FiAlertCircle size={15} color="#BE123C" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#BE123C', margin: 0 }}>{orderError}</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setStep(1)}
                    style={{ flex: 1, padding: '1rem', background: 'transparent', color: '#5B21B6', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button onClick={handlePlaceOrder} disabled={orderLoading}
                    style={{ flex: 2, padding: '1rem', background: orderLoading ? 'rgba(212,175,55,0.6)' : '#D4AF37', color: '#1A1A2E', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: orderLoading ? 'not-allowed' : 'pointer', transition: 'background 0.3s' }}>
                    {orderLoading ? 'Placing Order...' : paymentMethod === 'pod' ? '✓ Place Order' : '⚡ Pay Now'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div style={{ position: 'sticky', top: '88px' }}>
            <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(138,79,177,0.1)' }}>
              <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', margin: '0 0 1.25rem' }}>Order Summary</h3>

              {/* Items */}
              <div style={{ maxHeight: '220px', overflowY: 'auto', marginBottom: '1.25rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '10px', padding: '0.6rem 0', borderBottom: '1px solid rgba(138,79,177,0.06)' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '6px', background: '#F0E8FA' }} />
                      <span style={{ position: 'absolute', top: '-6px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: '#8A4FB1', color: '#FFF', fontSize: '0.55rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Jost", sans-serif' }}>{item.quantity}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', color: '#5B21B6', margin: 0 }}>{formatPrice(item.price)}</p>
                    </div>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#8A4FB1', flexShrink: 0, margin: 0 }}>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.5)' }}>Subtotal</span>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#1A1A2E' }}>{formatPrice(subtotal)}</span>
                </div>
                {discountAmt > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: '#16A34A' }}>Discount ({appliedCode})</span>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#16A34A' }}>−{formatPrice(discountAmt)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.5)' }}>Delivery</span>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: deliveryFee === 0 ? '#16A34A' : '#1A1A2E' }}>
                    {delivery.state ? (deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)) : '—'}
                  </span>
                </div>
                <div style={{ height: '1px', background: 'rgba(138,79,177,0.1)', margin: '0.25rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#1A1A2E' }}>Total</span>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Free delivery notice */}
              {subtotal < FREE_THRESHOLD && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#FAF7FF', borderRadius: '8px', border: '1px solid rgba(138,79,177,0.1)' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: '#5B21B6', margin: 0, lineHeight: 1.5 }}>
                    Add <strong style={{ color: '#8A4FB1' }}>{formatPrice(FREE_THRESHOLD - subtotal)}</strong> more for free delivery!
                  </p>
                </div>
              )}

              {/* Security badges */}
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', color: 'rgba(26,26,46,0.35)', letterSpacing: '0.08em' }}>🔒 Secured by Paystack</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 360px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../store/cartStore'

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')
const FREE_DELIVERY_THRESHOLD = 50000

const nigeriaStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT - Abuja','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto',
  'Taraba','Yobe','Zamfara',
]

const DELIVERY_RATES: Record<string, number> = {
  'Lagos': 1500, 'Ogun': 2000, 'Oyo': 2500, 'Osun': 2500, 'Ekiti': 2500,
  'default': 3500,
}

type Step = 'delivery' | 'payment' | 'review'
type PayMethod = 'card' | 'transfer' | 'ussd' | 'pod'

const payMethods: { id: PayMethod; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'card', label: 'Card Payment', desc: 'Visa, Mastercard, Verve',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  },
  {
    id: 'transfer', label: 'Bank Transfer', desc: 'Pay via direct bank transfer',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  },
  {
    id: 'ussd', label: 'USSD', desc: 'Pay with your bank USSD code',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  },
  {
    id: 'pod', label: 'Pay on Delivery', desc: 'Cash on delivery',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  },
]

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]         = useState<Step>('delivery')
  const [payMethod, setPayMethod] = useState<PayMethod>('card')
  const [loading, setLoading]   = useState(false)
  const [form, setForm]         = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', notes: '',
  })

  const subtotal     = total()
  const deliveryFee  = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : (DELIVERY_RATES[form.state] ?? DELIVERY_RATES['default'])
  const grandTotal   = subtotal + (payMethod === 'pod' ? 0 : deliveryFee)

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    fontFamily: '"Jost", sans-serif', fontSize: '0.85rem',
    border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px',
    outline: 'none', background: '#FAF7FF', color: '#1A1A2E',
    boxSizing: 'border-box', transition: 'border-color 0.2s',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontFamily: '"Jost", sans-serif',
    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em',
    textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '6px',
  }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = '#8A4FB1' }
  const blur  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }

  const isDeliveryValid = form.firstName && form.lastName && form.email && form.phone && form.address && form.city && form.state

  const handlePay = () => {
    setLoading(true)
    if (payMethod === 'pod') {
      setTimeout(() => { clearCart(); navigate('/order-success') }, 1200)
      return
    }
    // Paystack popup
    const handler = (window as any).PaystackPop?.setup({
      key: 'pk_test_YOUR_PAYSTACK_PUBLIC_KEY',
      email: form.email,
      amount: grandTotal * 100,
      currency: 'NGN',
      ref: `SL-${Date.now()}`,
      metadata: {
        custom_fields: [
          { display_name: 'Customer Name', variable_name: 'name', value: `${form.firstName} ${form.lastName}` },
          { display_name: 'Delivery Address', variable_name: 'address', value: `${form.address}, ${form.city}, ${form.state}` },
        ],
      },
      callback: () => { clearCart(); navigate('/order-success') },
      onClose: () => setLoading(false),
    })
    handler?.openIframe()
    setTimeout(() => setLoading(false), 1000)
  }

  const steps: { id: Step; label: string }[] = [
    { id: 'delivery', label: 'Delivery' },
    { id: 'payment',  label: 'Payment'  },
    { id: 'review',   label: 'Review'   },
  ]
  const stepIdx = steps.findIndex(s => s.id === step)

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 50%, #FAF7FF 100%)', minHeight: '100vh', paddingTop: '68px' }}>
      {/* Paystack script */}
      <script src="https://js.paystack.co/v1/inline.js" />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', marginBottom: '1rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Cart
          </Link>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Checkout</h1>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem', gap: '0' }}>
          {steps.map((s, i) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: i < stepIdx ? 'pointer' : 'default' }}
                onClick={() => { if (i < stepIdx) setStep(s.id) }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, background: i <= stepIdx ? '#8A4FB1' : 'rgba(138,79,177,0.12)', color: i <= stepIdx ? '#FFF' : '#8A4FB1', transition: 'all 0.3s', flexShrink: 0 }}>
                  {i < stepIdx ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> : i + 1}
                </div>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: i === stepIdx ? 700 : 400, color: i <= stepIdx ? '#8A4FB1' : 'rgba(26,26,46,0.4)', whiteSpace: 'nowrap' }}>{s.label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '1px', background: i < stepIdx ? '#8A4FB1' : 'rgba(138,79,177,0.15)', margin: '0 0.75rem', transition: 'background 0.3s' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'flex-start' }}>

          {/* ── LEFT PANEL ── */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)', padding: 'clamp(1.5rem,4vw,2.5rem)', boxShadow: '0 4px 24px rgba(138,79,177,0.04)' }}>

            {/* STEP 1 — DELIVERY */}
            {step === 'delivery' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Delivery Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[{ f: 'firstName', l: 'First Name', p: 'First name' }, { f: 'lastName', l: 'Last Name', p: 'Last name' }].map(x => (
                      <div key={x.f}>
                        <label style={labelStyle}>{x.l} *</label>
                        <input type="text" placeholder={x.p} value={form[x.f as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [x.f]: e.target.value }))}
                          style={inputStyle} onFocus={focus} onBlur={blur} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" placeholder="your@email.com" value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        style={inputStyle} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone *</label>
                      <input type="tel" placeholder="+234 800 000 0000" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        style={inputStyle} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Delivery Address *</label>
                    <input type="text" placeholder="Street address, apartment, etc." value={form.address}
                      onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                      style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input type="text" placeholder="City" value={form.city}
                        onChange={e => setForm(p => ({ ...p, city: e.target.value }))}
                        style={inputStyle} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label style={labelStyle}>State *</label>
                      <select value={form.state} onChange={e => setForm(p => ({ ...p, state: e.target.value }))}
                        style={{ ...inputStyle, color: form.state ? '#1A1A2E' : 'rgba(26,26,46,0.4)', cursor: 'pointer' }}
                        onFocus={focus} onBlur={blur}>
                        <option value="">Select state</option>
                        {nigeriaStates.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  {form.state && (
                    <div style={{ background: subtotal >= FREE_DELIVERY_THRESHOLD ? '#F0FDF4' : '#FAF7FF', border: `1px solid ${subtotal >= FREE_DELIVERY_THRESHOLD ? 'rgba(22,163,74,0.2)' : 'rgba(138,79,177,0.15)'}`, borderRadius: '8px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={subtotal >= FREE_DELIVERY_THRESHOLD ? '#16A34A' : '#8A4FB1'} strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 500, color: subtotal >= FREE_DELIVERY_THRESHOLD ? '#16A34A' : '#5B21B6' }}>
                        {subtotal >= FREE_DELIVERY_THRESHOLD ? 'Free delivery to ' : `Delivery to `}
                        <strong>{form.state}</strong>
                        {subtotal < FREE_DELIVERY_THRESHOLD ? ` — ${formatPrice(DELIVERY_RATES[form.state] ?? DELIVERY_RATES['default'])}` : ''}
                      </span>
                    </div>
                  )}
                  <div>
                    <label style={labelStyle}>Order Notes (optional)</label>
                    <textarea placeholder="Special delivery instructions…" value={form.notes}
                      onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                      rows={3} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties}
                      onFocus={focus as any} onBlur={blur as any} />
                  </div>

                  <button onClick={() => { if (isDeliveryValid) setStep('payment') }}
                    disabled={!isDeliveryValid}
                    style={{ padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: isDeliveryValid ? '#8A4FB1' : '#C4A8D4', border: 'none', borderRadius: '8px', cursor: isDeliveryValid ? 'pointer' : 'not-allowed', transition: 'background 0.3s', marginTop: '0.5rem' }}
                    onMouseEnter={e => { if (isDeliveryValid) e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { if (isDeliveryValid) e.currentTarget.style.background = '#8A4FB1' }}>
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — PAYMENT */}
            {step === 'payment' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Payment Method</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                  {payMethods.map(m => (
                    <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', border: `1.5px solid ${payMethod === m.id ? '#8A4FB1' : 'rgba(138,79,177,0.15)'}`, borderRadius: '10px', cursor: 'pointer', background: payMethod === m.id ? '#FAF7FF' : '#FFFFFF', transition: 'all 0.2s' }}>
                      <input type="radio" name="payMethod" value={m.id} checked={payMethod === m.id}
                        onChange={() => setPayMethod(m.id)} style={{ accentColor: '#8A4FB1', width: '16px', height: '16px' }} />
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: payMethod === m.id ? '#F3E8FF' : '#FAF7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A4FB1', flexShrink: 0 }}>
                        {m.icon}
                      </div>
                      <div>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '2px' }}>{m.label}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>{m.desc}</p>
                      </div>
                      {payMethod === m.id && (
                        <div style={{ marginLeft: 'auto', width: '20px', height: '20px', borderRadius: '50%', background: '#8A4FB1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>

                {payMethod === 'pod' && (
                  <div style={{ background: '#FFF7ED', border: '1px solid rgba(217,119,6,0.2)', borderRadius: '8px', padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 400, color: '#92400E', lineHeight: 1.6 }}>
                      Pay on delivery is available. Please have the exact amount ready — <strong>₦{(grandTotal).toLocaleString('en-NG')}</strong> — when your order arrives.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setStep('delivery')}
                    style={{ flex: 1, padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', background: 'none', border: '1px solid #8A4FB1', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8A4FB1' }}>
                    ← Back
                  </button>
                  <button onClick={() => setStep('review')}
                    style={{ flex: 2, padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — REVIEW */}
            {step === 'review' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Review Order</h2>

                {/* Delivery summary */}
                <div style={{ background: '#FAF7FF', borderRadius: '10px', padding: '1.2rem', marginBottom: '1rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1' }}>Delivering To</p>
                    <button onClick={() => setStep('delivery')} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, color: '#8A4FB1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Edit</button>
                  </div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '2px' }}>{form.firstName} {form.lastName}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.6 }}>{form.address}, {form.city}, {form.state}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6' }}>{form.phone} · {form.email}</p>
                </div>

                {/* Payment summary */}
                <div style={{ background: '#FAF7FF', borderRadius: '10px', padding: '1.2rem', marginBottom: '1.5rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1' }}>Payment</p>
                    <button onClick={() => setStep('payment')} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, color: '#8A4FB1', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Edit</button>
                  </div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E' }}>
                    {payMethods.find(m => m.id === payMethod)?.label}
                  </p>
                </div>

                {/* Items */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.85rem' }}>Items ({items.length})</p>
                  {items.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', paddingBottom: '0.75rem', marginBottom: '0.75rem', borderBottom: '1px solid rgba(138,79,177,0.07)' }}>
                      <div style={{ width: '52px', height: '60px', borderRadius: '6px', overflow: 'hidden', background: '#F0E8FA', flexShrink: 0 }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2 }}>{item.name}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>Qty: {item.quantity}</p>
                      </div>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => setStep('payment')}
                    style={{ flex: 1, padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', background: 'none', border: '1px solid #8A4FB1', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8A4FB1' }}>
                    ← Back
                  </button>
                  <button onClick={handlePay} disabled={loading}
                    style={{ flex: 2, padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: loading ? '#C4A8D4' : '#8A4FB1', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#8A4FB1' }}>
                    {loading
                      ? <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Processing...</>
                      : payMethod === 'pod' ? 'Place Order →' : `Pay ${formatPrice(grandTotal)} →`
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT — Order Summary ── */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.12)', padding: '1.8rem', position: 'sticky', top: '88px', boxShadow: '0 4px 24px rgba(138,79,177,0.06)' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.2rem' }}>
              Your Order <span style={{ fontFamily: '"Jost", sans-serif', fontStyle: 'normal', fontSize: '0.78rem', fontWeight: 400, color: '#8A4FB1' }}>({items.length})</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.2rem', maxHeight: '260px', overflowY: 'auto', paddingRight: '4px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '56px', borderRadius: '6px', overflow: 'hidden', background: '#F0E8FA', flexShrink: 0, position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', borderRadius: '50%', background: '#8A4FB1', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.quantity}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(138,79,177,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6' }}>Subtotal</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{formatPrice(total())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6' }}>Delivery</span>
                {payMethod === 'pod'
                  ? <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#D97706' }}>Pay on Delivery</span>
                  : deliveryFee === 0
                    ? <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '2px 8px', borderRadius: '100px' }}>FREE</span>
                    : <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E' }}>{form.state ? formatPrice(deliveryFee) : 'Calculated above'}</span>
                }
              </div>
              <div style={{ borderTop: '1px solid rgba(138,79,177,0.1)', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E' }}>Total</span>
                <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid rgba(138,79,177,0.08)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 500, color: '#8A4FB1' }}>Secured by Paystack</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 320px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
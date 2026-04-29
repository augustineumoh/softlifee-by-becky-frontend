import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, delay = 0, from = 'bottom' }: { children: React.ReactNode; delay?: number; from?: 'bottom'|'left'|'right'|'fade' }) {
  const { ref, visible } = useInView()
  const t = from === 'left' ? 'translateX(-40px)' : from === 'right' ? 'translateX(40px)' : from === 'fade' ? 'none' : 'translateY(32px)'
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t, transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  )
}

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+234 7019908205',
    href: 'tel:+2347019908205',
    color: '#8A4FB1',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'rebeccaaugustine26@gmail.com',
    href: 'mailto:rebeccaaugustine26@gmail.com',
    color: '#5B21B6',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Location',
    value: 'Uyo, Akwa Ibom State, Nigeria',
    href: 'https://maps.google.com/?q=Uyo,Akwa+Ibom,Nigeria',
    color: '#D4AF37',
  },
]

const socials = [
  {
    label: 'Instagram',
    handle: '@soft.lifeebybeckie',
    href: 'https://www.instagram.com/soft.lifeebybeckie/',
    color: '#E1306C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    handle: '@beckysosftlifee',
    href: 'https://www.tiktok.com/@beckyofsoftlifee',
    color: '#1A1A2E',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    handle: 'Chat with us',
    href: 'https://wa.me/2347019908205?text=Hi%20Soft%20Lifee!%20I%20have%20a%20question',
    color: '#25D366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setLoading(true)

    const subjectLabel: Record<string, string> = {
      order: 'Order Enquiry', product: 'Product Question',
      return: 'Returns & Refunds', wholesale: 'Wholesale / Bulk Order', other: 'Other',
    }
    const subject = form.subject ? subjectLabel[form.subject] || form.subject : 'General Enquiry'

    const waMessage = [
      `*New message from Soft Lifee website*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Subject:* ${subject}`,
      ``,
      `*Message:*`,
      form.message,
    ].join('\n')

    window.open(`https://wa.me/2347019908205?text=${encodeURIComponent(waMessage)}`, '_blank')
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 600)
  }

  return (
    <div style={{ background: '#FAF7FF' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #3B1058 50%, #5B21B6 100%)', padding: 'clamp(6rem,12vw,10rem) clamp(1.5rem,6vw,5rem) clamp(3rem,6vw,5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37' }}>We'd Love to Hear From You</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(3rem,6vw,5rem)', color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 1rem 0' }}>
              Get in Touch
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
              Questions about an order, a product, or just want to say hello? We're always here for you.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── WHATSAPP CTA BANNER ──────────────────────────────── */}
      <div style={{ background: '#25D366', padding: '1.25rem clamp(1.5rem,6vw,5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          <div>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1px' }}>Prefer to chat?</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>Message us directly on WhatsApp — we respond fast!</p>
          </div>
        </div>
        <a href="https://wa.me/2347019908205?text=Hi%20Soft%20Lifee!%20I%20have%20a%20question"
          target="_blank" rel="noreferrer"
          style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#25D366', background: '#FFFFFF', textDecoration: 'none', padding: '0.75rem 1.8rem', borderRadius: '2px', whiteSpace: 'nowrap', transition: 'all 0.3s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1A1A2E'; e.currentTarget.style.color = '#FFF' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FFF'; e.currentTarget.style.color = '#25D366' }}>
          Chat on WhatsApp
        </a>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '5rem clamp(1.5rem,6vw,5rem)', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'flex-start' }}>

        {/* ── LEFT — Contact info + socials ── */}
        <div>
          <Reveal from="left">
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.75rem' }}>Contact Details</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: '0 0 2.5rem 0' }}>
              We're always here for you
            </h2>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
            {contactInfo.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1} from="left">
                <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'flex-start', gap: '1.2rem', padding: '1.2rem', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '10px', transition: 'all 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = item.color; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 20px rgba(138,79,177,0.1)` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(138,79,177,0.1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', marginBottom: '3px' }}>{item.label}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 500, color: '#1A1A2E', lineHeight: 1.4 }}>{item.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Socials */}
          <Reveal from="left" delay={0.3}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '1rem' }}>Find Us Online</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.2rem', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '8px', transition: 'all 0.25s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color; (e.currentTarget as HTMLAnchorElement).style.background = `${s.color}08` }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(138,79,177,0.1)'; (e.currentTarget as HTMLAnchorElement).style.background = '#FFFFFF' }}>
                  <div style={{ color: s.color, lineHeight: 0 }}>{s.icon}</div>
                  <div>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '1px' }}>{s.label}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 300, color: '#8A4FB1' }}>{s.handle}</p>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: 'rgba(26,26,46,0.25)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT — Contact form ── */}
        <Reveal from="right">
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '16px', padding: 'clamp(2rem,4vw,3rem)', boxShadow: '0 8px 48px rgba(138,79,177,0.06)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 600, color: '#1A1A2E', marginBottom: '0.75rem' }}>Message Sent!</h3>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Thank you for reaching out! We'll get back to you within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', padding: '0.9rem 2rem', borderRadius: '2px', cursor: 'pointer' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 600, color: '#1A1A2E', marginBottom: '0.5rem' }}>Send Us a Message</h3>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#8A4FB1', marginBottom: '2rem' }}>We typically respond within 24 hours.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {/* Name + Email row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { field: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'Your name' },
                      { field: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    ].map(f => (
                      <div key={f.field}>
                        <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.field as keyof typeof form]}
                          onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))}
                          style={{ width: '100%', padding: '0.8rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '6px', outline: 'none', background: '#FAF7FF', color: '#1A1A2E', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                          onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Subject</label>
                    <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                      style={{ width: '100%', padding: '0.8rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '6px', outline: 'none', background: '#FAF7FF', color: form.subject ? '#1A1A2E' : 'rgba(26,26,46,0.4)', cursor: 'pointer', transition: 'border-color 0.2s' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }}>
                      <option value="">Select a subject</option>
                      <option value="order">Order Enquiry</option>
                      <option value="product">Product Question</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="wholesale">Wholesale / Bulk Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', display: 'block', marginBottom: '6px' }}>Message</label>
                    <textarea placeholder="Tell us how we can help you..." value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      rows={5}
                      style={{ width: '100%', padding: '0.8rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '6px', outline: 'none', background: '#FAF7FF', color: '#1A1A2E', resize: 'vertical', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                      onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                      onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                  </div>

                  <button onClick={handleSubmit} disabled={loading || !form.name || !form.email || !form.message}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: loading ? '#C4A8D4' : '#8A4FB1', border: 'none', padding: '1rem', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#8A4FB1' }}>
                    {loading ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ animation: 'ct-spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Sending...
                      </>
                    ) : 'Send Message →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>

      {/* ── MAP ──────────────────────────────────────────────── */}
      <section style={{ padding: '0 clamp(1.5rem,6vw,5rem) 5rem' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '28px', height: '2px', background: '#8A4FB1' }} />
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8A4FB1' }}>Our Location</p>
            </div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: '0 0 1.5rem 0' }}>
              Find Us in Uyo, Akwa Ibom
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.15)', boxShadow: '0 8px 48px rgba(138,79,177,0.08)', height: '420px' }}>
              <iframe
                title="Soft Lifee Location — Uyo, Akwa Ibom"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126832.28305195433!2d7.849434!3d5.052855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1067f20e14a6bb4f%3A0x8d3f25c9e4b90d6a!2sUyo%2C%20Akwa%20Ibom%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay card */}
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: '#FFFFFF', borderRadius: '10px', padding: '1rem 1.2rem', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', maxWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8A4FB1', animation: 'ct-pulse 1.5s ease-in-out infinite' }} />
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1' }}>We're Here</p>
                </div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '2px' }}>Soft Lifee by Becky</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>Uyo, Akwa Ibom State</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>Nigeria</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ STRIP ────────────────────────────────────────── */}
      <section style={{ background: '#1A1A2E', padding: '4rem clamp(1.5rem,6vw,5rem)' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
          <Reveal from="left">
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>Quick Answers</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', margin: 0 }}>Before you reach out</h2>
          </Reveal>
          <Reveal from="right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { q: 'How long does delivery take?', a: 'Nationwide delivery takes 2–5 business days.' },
                { q: 'Do you offer returns?', a: 'Yes — hassle-free returns within 7 days of delivery.' },
                { q: 'Are all products authentic?', a: 'Absolutely. Every product is vetted before listing.' },
                { q: 'Do you do bulk orders?', a: 'Yes! Contact us for wholesale pricing.' },
              ].map(faq => (
                <div key={faq.q} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.2rem' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '6px', lineHeight: 1.4 }}>{faq.q}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes ct-spin  { to { transform: rotate(360deg); } }
        @keyframes ct-pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.4fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 2fr"]   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
import { useState } from 'react'
import { Link } from 'react-router-dom'

const quickLinks = [
  { label: 'New Arrivals',   to: '/new-arrivals' },
  { label: 'Shop All',       to: '/shop' },
  { label: 'Home Essentials',to: '/shop/home-essentials' },
  { label: 'Skincare',       to: '/shop/skincare' },
  { label: 'Accessories',    to: '/shop/accessories' },
  { label: "Women's Essentials", to: '/shop/womens-essentials' },
  { label: "Gift Ideas", to: '/giftideas' },
]

const helpLinks = [
  { label: 'About Us',        to: '/about' },
  { label: 'Contact Us',      to: '/contact' },
  { label: 'FAQs',            to: '/faqs' },
  { label: 'Track Your Order',to: '/account/orders' },
  { label: 'Returns Policy',  to: '/returns-policy' },
  { label: 'Privacy Policy',  to: '/privacy-policy' },
]

const socials = [
  {
    label: 'Instagram',
    to: 'https://www.instagram.com/soft.lifeebybeckie/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    to: 'https://www.tiktok.com/@beckyofsoftlifee',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    to: 'https://wa.me/2347019908205?text=Hi%20Soft%20Lifee!%20I%20have%20a%20question',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    to: 'https://www.facebook.com/share/1AxJ2b6QiV/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
]

// Payment icons as SVG shapes
function PaymentBadge({ label }: { label: string }) {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid rgba(138,79,177,0.15)',
      borderRadius: '6px',
      padding: '5px 10px',
      fontFamily: '"Jost", sans-serif',
      fontSize: '0.62rem',
      fontWeight: 700,
      color: '#5B21B6',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    }}>{label}</div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <footer style={{
      background: 'linear-gradient(180deg, #F3E8FF 0%, #FAF7FF 40%, #FFFFFF 100%)',
      borderTop: '1px solid rgba(138,79,177,0.12)',
    }}>

      {/* ── TOP NEWSLETTER BAND ──────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #8A4FB1 0%, #5B21B6 100%)',
        padding: '3.5rem clamp(1.5rem,6vw,5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
            Join the Community
          </p>
          <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 500, fontStyle: 'italic', color: '#FFFFFF', margin: 0, lineHeight: 1.2 }}>
            Get exclusive deals & new arrivals
          </h3>
        </div>
        {submitted ? (
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', color: '#E8D5F5', fontWeight: 500 }}>
            ✓ You're in! Welcome to the Soft Lifee family 🌸
          </p>
        ) : (
          <div style={{ display: 'flex', gap: 0, flex: '0 1 420px', minWidth: '260px' }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && email && setSubmitted(true)}
              style={{ flex: 1, padding: '0.9rem 1.2rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: 'none', outline: 'none', background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', borderRadius: '2px 0 0 2px' }}
            />
            <button
              onClick={() => email && setSubmitted(true)}
              style={{ padding: '0.9rem 1.6rem', fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#FFFFFF', color: '#5B21B6', border: 'none', cursor: 'pointer', borderRadius: '0 2px 2px 0', whiteSpace: 'nowrap', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#E8D5F5' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}
            >
              Subscribe
            </button>
          </div>
        )}
      </div>

      {/* ── MAIN FOOTER GRID ─────────────────────────────────── */}
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        padding: '5rem clamp(1.5rem,6vw,5rem) 3rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
      }}>

        {/* ── BRAND COLUMN ── */}
        <div style={{ gridColumn: 'span 1' }}>
          {/* Logo text */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#1A1A2E', letterSpacing: '0.02em' }}>Soft</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, fontStyle: 'italic', color: '#8A4FB1', letterSpacing: '0.02em' }}>Lifee</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 700, color: '#8A4FB1' }}>.</span>
            </div>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.75rem', letterSpacing: '0.18em', color: '#8A4FB1', marginTop: '2px' }}>
              Luxury Goods · Lifestyle
            </p>
          </div>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.83rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.8, marginBottom: '1.8rem', maxWidth: '260px' }}>
            Curated essentials for your home, skin, and everyday ritual. Live softly. Live well.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map(s => (
              <a key={s.label} href={s.to} target="_blank" rel="noreferrer" title={s.label}
                style={{
                  width: '38px', height: '38px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid rgba(138,79,177,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#8A4FB1',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#8A4FB1'
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.borderColor = '#8A4FB1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FFFFFF'
                  e.currentTarget.style.color = '#8A4FB1'
                  e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── QUICK LINKS ── */}
        <div>
          <h4 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '1.4rem' }}>
            Shop
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {quickLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#5B21B6' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── HELP LINKS ── */}
        <div>
          <h4 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '1.4rem' }}>
            Help
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {helpLinks.map(link => (
              <li key={link.to}>
                <Link to={link.to} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#5B21B6' }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── CONTACT INFO ── */}
        <div>
          <h4 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '1.4rem' }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                text: 'rebeccaaugustine26@gmail.com',
                href: 'mailto:rebeccaaugustine26@gmail.com',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                text: '+234 7019908205',
                href: 'tel:+2347019908205',
              },
              {
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                text: 'Uyo, Akwa-Ibom. Nigeria',
                href: null,
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: '#8A4FB1', lineHeight: 1, marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                {item.href ? (
                  <a href={item.href} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.83rem', fontWeight: 300, color: '#5B21B6', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5B21B6' }}>
                    {item.text}
                  </a>
                ) : (
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.83rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.5 }}>{item.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div style={{
        borderTop: '1px solid rgba(138,79,177,0.1)',
        padding: '1.5rem clamp(1.5rem,6vw,5rem)',
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.2rem',
      }}>
        {/* Copyright */}
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#8A4FB1', margin: 0 }}>
          © {new Date().getFullYear()} Soft Lifee by Becky. All rights reserved.
        </p>

        {/* Payment icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 500, color: '#8A4FB1', marginRight: '0.25rem', letterSpacing: '0.05em' }}>Secured by</span>
          {['Paystack', 'Visa', 'Mastercard', 'Verve'].map(p => (
            <PaymentBadge key={p} label={p} />
          ))}
        </div>
      </div>

      {/* Closing strip */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #8A4FB1 0%, #5B21B6 50%, #8A4FB1 100%)' }} />
    </footer>
  )
}
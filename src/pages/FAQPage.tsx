import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    category: 'Orders & Delivery',
    items: [
      {
        q: 'How is the delivery fee calculated?',
        a: 'We charge a simple flat-rate delivery fee based on your location — no surprises at checkout. Within Uyo (Akwa Ibom): ₦2,000. Outside Uyo but still within Akwa Ibom State: ₦3,000. All other states in Nigeria: ₦5,000. The exact fee is calculated and displayed automatically once you enter your delivery address at checkout.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Within Uyo & Akwa Ibom: 1–2 business days. Lagos & other southern states: 2–3 business days. Other states across Nigeria: 3–5 business days. Delivery timelines may vary due to logistics factors outside our control.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'We do not currently offer free delivery. Our flat-rate fees are kept as low as possible — ₦2,000 within Uyo, ₦3,000 within Akwa Ibom, and ₦5,000 for the rest of Nigeria. Follow our social media pages for any promotional free-delivery offers.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes! Once your order is dispatched, you will receive a tracking update. You can also view your order status anytime by visiting your Account page under "My Orders".',
      },
      {
        q: 'Do you deliver outside Nigeria?',
        a: 'Yes! We deliver nationwide across all 36 states in Nigeria, and we also ship internationally. Contact us via WhatsApp or email for international shipping rates and timelines before placing your order.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your returns policy?',
        a: 'All sales are final. We do not accept returns or exchanges for any reason, including change of mind. Please review your order carefully — including photos, descriptions, and dimensions — before completing your purchase.',
      },
      {
        q: 'What if I receive a damaged or wrong item?',
        a: 'In the rare event that you receive a damaged item or an item different from what you ordered, please contact us within 48 hours of delivery with clear photos and your order number. We will review each case individually and may offer a replacement or store credit at our discretion.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'You may request a cancellation only before your order has been dispatched. Contact us immediately via WhatsApp (+234 701 990 8205) or email. Once an order has been shipped, it cannot be cancelled.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept card payments (Visa, Mastercard, Verve), bank transfers, USSD, and Pay on Delivery (POD) for eligible orders. Online payments are processed securely through Paystack. Your payment information is never stored on our servers.',
      },
      {
        q: 'Is it safe to pay on this website?',
        a: 'Yes. All online payments are processed through Paystack, a leading PCI-DSS compliant payment gateway. Your card details are encrypted and never shared with us.',
      },
      {
        q: 'Can I pay on delivery?',
        a: 'Yes! We offer Pay on Delivery (POD). Simply select "Pay on Delivery" at checkout and our delivery agent will collect payment when your order arrives. POD is available across Nigeria.',
      },
      {
        q: 'Do you accept discount codes?',
        a: 'Yes! If you have a valid discount code, you can enter it at the checkout page before placing your order. Codes are subject to their individual terms (minimum order, expiry date, etc.).',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are your products authentic?',
        a: 'Absolutely. Every product listed on Soft Lifee by Becky is carefully sourced and vetted for quality before it goes live on our store. We stand behind the authenticity of everything we sell.',
      },
      {
        q: 'How do I know if a product is in stock?',
        a: 'Products that are out of stock are clearly labelled on the product page and in search results. If a product is not marked "Out of Stock", it is available for purchase.',
      },
      {
        q: 'The product I want is out of stock — will it come back?',
        a: 'We regularly restock popular items. Follow us on Instagram (@soft.lifeebybeckie) or TikTok for restock announcements, or subscribe to our newsletter for exclusive updates.',
      },
    ],
  },
  {
    category: 'Account & Wishlist',
    items: [
      {
        q: 'Do I need an account to shop?',
        a: 'You can browse without an account, but you will need to create one to complete a purchase, track orders, and save items to your wishlist.',
      },
      {
        q: 'How do I save items to my wishlist?',
        a: 'Click the heart icon on any product card or product page. Your wishlist is saved to your account and accessible from the Account page.',
      },
      {
        q: 'I forgot my password — how do I reset it?',
        a: 'Click "Forgot Password" on the login page and enter your email address. You will receive a password reset link shortly. Check your spam folder if it doesn\'t arrive within a few minutes.',
      },
      {
        q: 'How do I save a delivery address?',
        a: 'Go to your Account page and click the "Addresses" tab. You can add, edit, and set a default delivery address there for faster checkout.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(138,79,177,0.1)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'none', border: 'none', padding: '1.1rem 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.5, flex: 1 }}>{q}</span>
        <span style={{ color: '#8A4FB1', fontSize: '1.1rem', flexShrink: 0, marginTop: '2px', transition: 'transform 0.25s', display: 'block', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
      </button>
      {open && (
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, padding: '0 1.5rem 1.25rem 0', margin: 0 }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const displayed = activeCategory
    ? faqs.filter(f => f.category === activeCategory)
    : faqs

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #4C1D95 55%, #8A4FB1 100%)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,6vw,5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.6rem' }}>Got questions?</p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700, color: '#FFF', margin: '0 0 0.75rem' }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: 0 }}>Everything you need to know about shopping with Soft Lifee by Becky.</p>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,6vw,3rem)' }}>

        {/* Category filter pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button onClick={() => setActiveCategory(null)}
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: activeCategory === null ? 700 : 500, padding: '0.45rem 1rem', borderRadius: '100px', border: `1.5px solid ${activeCategory === null ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: activeCategory === null ? '#8A4FB1' : 'transparent', color: activeCategory === null ? '#FFF' : '#5B21B6', cursor: 'pointer', transition: 'all 0.15s' }}>
            All Topics
          </button>
          {faqs.map(f => (
            <button key={f.category} onClick={() => setActiveCategory(f.category)}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: activeCategory === f.category ? 700 : 500, padding: '0.45rem 1rem', borderRadius: '100px', border: `1.5px solid ${activeCategory === f.category ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: activeCategory === f.category ? '#8A4FB1' : 'transparent', color: activeCategory === f.category ? '#FFF' : '#5B21B6', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
              {f.category}
            </button>
          ))}
        </div>

        {/* FAQ sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {displayed.map(section => (
            <div key={section.category} style={{ background: '#FFF', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2rem)', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 2px 12px rgba(138,79,177,0.04)' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.15rem,2.5vw,1.4rem)', fontWeight: 700, color: '#8A4FB1', margin: '0 0 1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(138,79,177,0.1)' }}>{section.category}</h2>
              {section.items.map(item => <FAQItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          ))}
        </div>

        {/* Still need help */}
        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #F9F0FF, #FDF6FF)', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2.5rem)', border: '1px solid rgba(138,79,177,0.15)', textAlign: 'center' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.2rem,3vw,1.5rem)', fontWeight: 600, color: '#1A1A2E', margin: '0 0 0.5rem' }}>Still have a question?</p>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', margin: '0 0 1.5rem', lineHeight: 1.7 }}>We're happy to help. Reach out via WhatsApp or email and we'll get back to you as soon as possible.</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/2347019908205?text=Hi%20Soft%20Lifee!%20I%20have%20a%20question" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFF', background: '#25D366', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
              WhatsApp Us
            </a>
            <Link to="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

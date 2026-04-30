import { Link } from 'react-router-dom'

export default function ReturnPolicyPage() {
  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #4C1D95 55%, #8A4FB1 100%)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,6vw,5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.6rem' }}>Soft Lifee by Becky</p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700, color: '#FFF', margin: '0 0 0.75rem' }}>Returns Policy</h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: 0 }}>Last updated: April 2026</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,6vw,3rem)' }}>

        {/* All Sales Final banner */}
        <div style={{ background: 'linear-gradient(135deg, #FFF1F2, #FEE2E2)', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '14px', padding: '1.75rem 2rem', marginBottom: '2.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#BE123C', marginBottom: '0.5rem' }}>Important Notice</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.6rem,3vw,2rem)', fontWeight: 700, color: '#9F1239', margin: '0 0 0.5rem' }}>All Sales Are Final</h2>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#BE123C', margin: 0, lineHeight: 1.7 }}>
            We do not accept returns, refunds, or exchanges on any of our products. Please read this policy carefully before placing your order.
          </p>
        </div>

        {/* Sections */}
        {[
          {
            title: 'No Returns or Exchanges',
            body: 'All purchases made on Soft Lifee by Becky are final. Once an order is placed and confirmed, we are unable to accept returns, process refunds, or facilitate exchanges for any reason, including but not limited to change of mind, sizing issues, or colour variations from screen display.',
          },
          {
            title: 'Why We Have This Policy',
            body: 'We take great care to accurately describe and photograph every product. Each item is carefully vetted for quality before listing. Our no-return policy allows us to maintain competitive pricing and ensure the highest hygiene standards — especially for personal care, skincare, and lifestyle products.',
          },
          {
            title: 'Before You Buy — Please Check',
            body: 'We encourage you to review the product photos, description, dimensions, and material details carefully before completing your purchase. If you have any questions about a product, please contact us via WhatsApp or email before ordering.',
          },
          {
            title: 'Damaged or Wrong Item',
            body: 'In the rare event that you receive a damaged item or an item different from what you ordered, please contact us within 48 hours of delivery with photos of the item and your order details. We will review each case individually and, where applicable, offer a replacement or store credit at our sole discretion.',
          },
          {
            title: 'Order Cancellations',
            body: 'Orders may be cancelled only if they have not yet been dispatched. To request a cancellation, contact us immediately via WhatsApp at +234 701 990 8205. Once an order has been shipped, it cannot be cancelled.',
          },
          {
            title: 'Contact Us',
            body: 'If you have any concerns or questions about your order, please reach out to us before purchasing:\n\nEmail: rebeccaaugustine26@gmail.com\nWhatsApp: +234 701 990 8205',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(138,79,177,0.08)' }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.15rem,2.5vw,1.35rem)', fontWeight: 700, color: '#1A1A2E', marginBottom: '0.65rem' }}>{section.title}</h3>
            {section.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, margin: i > 0 ? '0.5rem 0 0' : 0 }}>{para}</p>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Link to="/shop"
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.85rem 1.5rem', borderRadius: '8px' }}>
            Continue Shopping
          </Link>
          <Link to="/contact"
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', textDecoration: 'none', padding: '0.85rem 1.5rem', borderRadius: '8px' }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

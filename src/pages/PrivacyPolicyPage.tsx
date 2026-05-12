import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #4C1D95 55%, #8A4FB1 100%)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,6vw,5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.6rem' }}>Soft Lifee by Becky</p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2.2rem,5vw,3.5rem)', fontWeight: 700, color: '#FFF', margin: '0 0 0.75rem' }}>Privacy Policy</h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: 0 }}>Last updated: May 2026</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,6vw,3rem)' }}>

        {/* Intro */}
        <div style={{ background: 'linear-gradient(135deg, #F3E8FF, #EDE9FE)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '14px', padding: '1.75rem 2rem', marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 400, color: '#5B21B6', margin: 0, lineHeight: 1.8 }}>
            At Soft Lifee by Becky, your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have. By using our website or placing an order, you agree to the practices described here.
          </p>
        </div>

        {[
          {
            title: '1. Information We Collect',
            body: 'When you place an order or create an account, we collect personal information such as your name, email address, phone number, and delivery address. We also collect payment information, which is processed securely through Paystack — we do not store your card details on our servers.\n\nWe may also collect non-personal information such as browser type, pages visited, and time spent on the site to help us improve your experience.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'We use your information to:\n\n• Process and fulfil your orders\n• Send order confirmations and delivery updates via email\n• Respond to your enquiries and customer service requests\n• Improve our website and product offerings\n• Send you promotional emails (only if you have opted in — you can unsubscribe at any time)',
          },
          {
            title: '3. How We Share Your Information',
            body: 'We do not sell, trade, or rent your personal information to third parties. We only share your data with trusted service providers who help us operate our business, including:\n\n• Paystack — for secure payment processing\n• Delivery and logistics partners — to fulfil your orders\n• Email service providers — to send order and marketing communications\n\nAll third parties are required to keep your information confidential and use it only for the services they provide to us.',
          },
          {
            title: '4. Cookies',
            body: 'Our website uses cookies to enhance your browsing experience, remember your cart items, and analyse site traffic. You can choose to disable cookies through your browser settings, but some features of the site may not function properly as a result.',
          },
          {
            title: '5. Data Security',
            body: 'We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse. Our website uses HTTPS encryption to keep your data safe in transit. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
          },
          {
            title: '6. Data Retention',
            body: 'We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, including for legal, accounting, or reporting requirements. If you would like your account and data deleted, please contact us and we will process your request within 14 business days.',
          },
          {
            title: '7. Your Rights',
            body: 'You have the right to:\n\n• Access the personal information we hold about you\n• Request corrections to inaccurate data\n• Request deletion of your personal data\n• Opt out of marketing emails at any time via the unsubscribe link in any email we send\n\nTo exercise any of these rights, please contact us at rebeccaaugustine26@gmail.com.',
          },
          {
            title: '8. Third-Party Links',
            body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies before providing any personal information.',
          },
          {
            title: '9. Children\'s Privacy',
            body: 'Our website is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.',
          },
          {
            title: '10. Changes to This Policy',
            body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. We encourage you to review this page periodically to stay informed about how we protect your information.',
          },
          {
            title: '11. Contact Us',
            body: 'If you have any questions or concerns about this Privacy Policy, please reach out to us:\n\nEmail: rebeccaaugustine26@gmail.com\nWhatsApp: +234 701 990 8205',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(138,79,177,0.08)' }}>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.15rem,2.5vw,1.35rem)', fontWeight: 700, color: '#1A1A2E', marginBottom: '0.65rem' }}>{section.title}</h3>
            {section.body.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, margin: i > 0 ? '0.5rem 0 0' : 0, whiteSpace: 'pre-line' }}>{para}</p>
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

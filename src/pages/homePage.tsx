import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/home/heroSection'
import totebag from '../assets/tote bag.jpg'
import diffuser from '../assets/diffuser.jpg'
import mask from '../assets/stick mask.jpg'
import sanddrop from '../assets/sand drop.jpg'
import smartwatch from '../assets/smart watch.jpg'
import bathroomOrganizer from '../assets/bathroom organizer.jpg'
import travelkit from '../assets/travel kit.jpg'
import stanleycup from '../assets/Stanley cup accessories.jpg'
import booptape from '../assets/boobtape.jpg'
import relaxationchair from '../assets/relaxation chair.jpg'
import tumbler from '../assets/Matte-stanley-style-tumber.jpeg'
import flowervase from '../assets/flowervase.jpeg'
import ceramiccupset from '../assets/ceramic cup set.jpeg'
import travelbox from '../assets/travel box.jpeg'
import becky from '../assets/home page.jpeg'
import storagebasket from '../assets/storage basket.jpeg'
import pimplepatches from '../assets/pimple patches.jpg'
import laptopstand from '../assets/laptop stand.jpg'
import { getNewArrivals } from './newArrivalsPage'
import { FaArrowRight } from "react-icons/fa";


function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, from = 'bottom', className = '' }: {
  children: React.ReactNode; delay?: number
  from?: 'bottom' | 'left' | 'right' | 'fade'; className?: string
}) {
  const { ref, visible } = useInView()
  const translate = from === 'bottom' ? 'translateY(40px)'
    : from === 'left' ? 'translateX(-40px)'
    : from === 'right' ? 'translateX(40px)' : 'none'
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : translate,
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>{children}</div>
  )
}

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

const bestSellers = [
  { id: 1,  name: 'Diffuser',            category: 'Home Essentials', price: 15000, badge: 'Best Seller', image: diffuser,         slug: 'diffuser' },
  { id: 2,  name: 'Green Stick Mask',    category: 'Skincare',        price: 5000,  badge: 'Top Rated',  image: mask,             slug: 'green-stick-mask' },
  { id: 3,  name: 'Tote Bag',            category: 'Accessories',     price: 8500,  badge: 'New',        image: totebag,          slug: 'tote-bag' },
  { id: 4,  name: '3D Sand Drop',        category: 'Home Essentials', price: 10000, badge: 'Trending',   image: sanddrop,         slug: '3D-sand-drop' },
  { id: 5,  name: 'Bathroom Organizer',  category: 'Home Essentials', price: 15000, badge: 'Best Seller', image: bathroomOrganizer,slug: 'bathroom-organizer' },
  { id: 6,  name: 'Smart-Watch Set',     category: 'Accessories',     price: 40000, badge: 'Premium',    image: smartwatch,       slug: 'smart-watch-set' },
  { id: 11, name: 'Star Pimple Patches', category: 'Skincare',        price: 1300,  badge: 'Trending',   image: pimplepatches,    slug: 'star-pimple-patches' },
  { id: 12, name: 'Laptop Stand',        category: 'Accessories',     price: 8000,  badge: 'Trending',   image: laptopstand,      slug: 'laptop-stand' },
]

const newArrivals = getNewArrivals(4)

const categories = [
  { label: 'Home Essentials',    sub: 'Kitchen · Bathroom · Lighting', to: '/shop/home-essentials', image: relaxationchair },
  { label: 'Skincare',           sub: 'Face · Body · Travel Kits',     to: '/shop/skincare',        image: travelkit },
  { label: 'Accessories',        sub: 'Bags · Jewelry · Drinkware',    to: '/shop/accessories',     image: stanleycup },
  { label: "Women's Essentials", sub: 'Personal Care & More',          to: '/shop/womens',          image: booptape },
]

const giftIdeas = [
  { label: 'For Her',       emoji: '🌸', desc: 'Skincare, bags & self-care must-haves',    to: '/giftideas#her',       image: tumbler },
  { label: 'For the Home',  emoji: '🏡', desc: 'Cosy gadgets & aesthetic essentials',      to: '/giftideas#forhome',   image: flowervase },
  { label: 'Under ₦10,000', emoji: '🎁', desc: "Beautiful gifts that won't break the bank",to: '/giftideas#forbudget', image: ceramiccupset },
  { label: 'Travel Ready',  emoji: '✈️', desc: 'Kits & accessories for every trip',        to: '/giftideas#fortravel', image: travelbox },
  { label: 'For Kitchen',   emoji: '🍳', desc: 'Modern kitchen essentials',                to: '/giftideas#forkitchen', image: storagebasket },
]

const testimonials = [
  { name: 'Adaeze O.',   location: 'Lagos',         rating: 5, text: 'Honestly the diffuser changed my entire living room vibe. The quality is unreal for the price. Soft Lifee never disappoints!' },
  { name: 'Chioma B.',   location: 'Abuja',         rating: 5, text: "I ordered the tote bag and the stick mask together — packaging was so beautiful I almost didn't want to open it. Will definitely be back!" },
  { name: 'Fatima K.',   location: 'Port Harcourt', rating: 5, text: 'The bathroom organizer is exactly what I needed. Looks expensive and does the job perfectly. Fast delivery too!' },
  { name: 'Ngozi A.',    location: 'Enugu',         rating: 5, text: "My Smart Watch set arrived in 2 days and it's stunning. Customer service was so warm and responsive. 10/10 experience." },
  { name: 'Blessing I.', location: 'Lagos',         rating: 5, text: "Been buying from Soft Lifee for 3 months now. Every single product has been worth it. The sand drop is my current obsession!" },
]

const perks = [
  { icon: '🚚', title: 'Free Delivery',   desc: 'On all orders above ₦50,000 nationwide' },
  { icon: '✅', title: '100% Authentic',  desc: 'Every product is carefully vetted for quality' },
  { icon: '🔒', title: 'Secure Checkout', desc: 'Your payment info is always protected' },
  { icon: '↩️', title: 'Easy Returns',    desc: 'Hassle-free returns within 7 days' },
]

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, delay = 0 }: { product: typeof bestSellers[0]; delay?: number }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const badgeColors: Record<string, string> = {
    'Best Seller': '#8A4FB1', 'Top Rated': '#5B21B6',
    'New': '#D4AF37', 'Trending': '#1A1A2E', 'Premium': '#C4A8D4',
  }
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: 'pointer' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#F0E8FA', aspectRatio: '3/4', marginBottom: '1rem' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: badgeColors[product.badge] || '#1A1A2E', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px' }}>{product.badge}</div>
          <button onClick={e => { e.preventDefault(); setWishlisted(w => !w) }}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#8A4FB1' : 'none'} stroke={wishlisted ? '#8A4FB1' : '#1A1A2E'} strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26,26,46,0.92)', backdropFilter: 'blur(4px)', padding: '0.9rem', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF' }}>Add to Cart</span>
          </div>
        </div>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '4px' }}>{product.category}</p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '6px', lineHeight: 1.2 }}>{product.name}</p>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#1A1A2E' }}>{formatPrice(product.price)}</p>
        </Link>
      </div>
    </Reveal>
  )
}

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginBottom: '1rem' }}>
      {Array(count).fill(null).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#D4AF37" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

function SectionLabel({ eyebrow, title, light = false, center = false }: { eyebrow: string; title: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <Reveal>
      <div style={{ textAlign: center ? 'center' : 'left' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: light ? 'rgba(255,255,255,0.6)' : '#8A4FB1', marginBottom: '0.6rem' }}>{eyebrow}</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem,4vw,3.2rem)', fontWeight: 600, fontStyle: 'italic', color: light ? '#FFFFFF' : '#1A1A2E', lineHeight: 1.1, letterSpacing: '0.01em', margin: 0 }}>{title}</h2>
      </div>
    </Reveal>
  )
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [testimonialsIdx, setTestimonialsIdx] = useState(0)
  const [catIdx, setCatIdx] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const filters = ['All', 'Home Essentials', 'Skincare', 'Accessories']
  const filtered = activeFilter === 'All' ? bestSellers : bestSellers.filter(p => p.category === activeFilter)
  const VISIBLE_CATS = 3
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const slideTestimonial = (dir: 'next' | 'prev') => {
    if (isSliding) return
    setIsSliding(true)
    setTestimonialsIdx(i =>
      dir === 'next' ? (i + 1) % testimonials.length : (i - 1 + testimonials.length) % testimonials.length
    )
    setTimeout(() => setIsSliding(false), 500)
  }

  useEffect(() => {
    autoRef.current = setInterval(() => slideTestimonial('next'), 5000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [isSliding])

  return (
    <div style={{ overflowX: 'hidden' }}>

      <HeroSection />

      {/* ── MARQUEE ─────────────────────────────────────────── */}
      <div style={{ background: '#1A1A2E', padding: '0.85rem 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'sl-marquee 30s linear infinite' }}>
          {Array(5).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              &nbsp;&nbsp;Free Delivery Above ₦50,000&nbsp;
              <span style={{ color: '#8A4FB1' }}>✦</span>&nbsp;
              New Arrivals Weekly&nbsp;
              <span style={{ color: '#8A4FB1' }}>✦</span>&nbsp;
              100% Authentic&nbsp;
              <span style={{ color: '#8A4FB1' }}>✦</span>&nbsp;
              Secured Checkout&nbsp;
              <span style={{ color: '#8A4FB1' }}>✦</span>&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── PERKS BAR ───────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #FAF7FF 0%, #F3E8FF 50%, #FAF7FF 100%)', borderBottom: '1px solid rgba(138,79,177,0.12)', padding: '2rem clamp(1.5rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem' }}>
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} from="bottom">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{p.icon}</span>
                <div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '2px' }}>{p.title}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── CATEGORY SLIDER ─────────────────────────────────── */}
      <section style={{ padding: '6rem 0 6rem clamp(1.5rem,6vw,5rem)', background: 'linear-gradient(160deg, #FAF7FF 0%, #EDE0F7 60%, #FAF7FF 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', paddingRight: 'clamp(1.5rem,6vw,5rem)' }}>
          <SectionLabel eyebrow="Explore" title={<>Shop by<br />Category</>} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[{ dir: -1, pts: '15 18 9 12 15 6' }, { dir: 1, pts: '9 18 15 12 9 6' }].map(({ dir, pts }) => {
              const disabled = dir === -1 ? catIdx === 0 : catIdx >= categories.length - VISIBLE_CATS
              return (
                <button key={dir} onClick={() => setCatIdx(i => Math.max(0, Math.min(categories.length - VISIBLE_CATS, i + dir)))}
                  disabled={disabled}
                  style={{ width: '42px', height: '42px', border: '1px solid rgba(138,79,177,0.3)', borderRadius: '50%', background: 'white', cursor: disabled ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.3 : 1, transition: 'all 0.2s' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"><polyline points={pts}/></svg>
                </button>
              )
            })}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '1rem', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: `translateX(calc(-${catIdx} * (33.333% + 0.333rem)))` }}>
            {categories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.08} from="bottom">
                <CategorySlideCard cat={cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ────────────────────────────────────── */}
      <section style={{ padding: '5rem clamp(1.5rem,6vw,5rem)', background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SectionLabel eyebrow="Most Loved" title={<>Best<br/>Sellers</>} />
          <Reveal from="right">
            <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', borderBottom: '1px solid #8A4FB1', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Shop All <FaArrowRight /></Link>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '0.55rem 1.4rem', border: '1px solid', borderColor: activeFilter === f ? '#8A4FB1' : 'rgba(138,79,177,0.25)', background: activeFilter === f ? '#8A4FB1' : 'transparent', color: activeFilter === f ? '#FFF' : '#8A4FB1', cursor: 'pointer', transition: 'all 0.25s ease', borderRadius: '2px' }}>{f}</button>
            ))}
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '2rem 1.5rem' }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.07} />)}
        </div>
      </section>

      {/* ── GIFT IDEAS ──────────────────────────────────────── */}
      <section style={{ padding: '6rem clamp(1.5rem,6vw,5rem)', background: '#1A1A2E' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SectionLabel eyebrow="Celebrate Someone" title={<>Gift<br/>Ideas</>} light />
          <Reveal from="right">
            <Link to="/giftideas" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Gift Ideas<FaArrowRight /></Link>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {giftIdeas.map((g, i) => (
            <Reveal key={g.label} delay={i * 0.1} from="bottom">
              <GiftCard gift={g} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── BRAND STORY ─────────────────────────────────────── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'stretch' }}>
        {/* Left — image fills full height naturally */}
        <div style={{ overflow: 'hidden', background: '#EDE0F7', minHeight: '520px' }}>
          <img src={becky} alt="Soft Lifee lifestyle" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
        {/* Right — flex column stretches to match image height */}
        <div style={{ background: 'linear-gradient(135deg, #FAF7FF, #EDE0F7)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(3rem,7vw,6rem)' }}>
          <Reveal from="right">
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '1.2rem' }}>Our Story</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,3.5vw,3.2rem)', fontWeight: 500, fontStyle: 'italic', color: '#1A1A2E', lineHeight: 1.2, margin: '0 0 1.5rem 0' }}>
              "Soft living isn't a luxury — it's a choice."
            </h2>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Soft Lifee by Becky was born from a simple belief: every woman deserves to live beautifully — in her home, on her skin, and in how she moves through the world. Every product is handpicked with intention, quality, and real life in mind.
            </p>
            <Link to="/about" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '1rem 2rem',  alignSelf: 'flex-start', transition: 'background 0.3s', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Meet Becky <FaArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS — Sliding cards like the reference ─── */}
      <section style={{ padding: '6rem clamp(1.5rem,6vw,5rem)', background: 'linear-gradient(160deg, #F3E8FF 0%, #EDE0F7 40%, #F9F4FF 100%)', overflow: 'hidden' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.8rem' }}>Real Reviews</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem,4vw,3.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: '0 0 0.5rem 0' }}>
              What Our Customers Say
            </h2>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, fontStyle: 'italic', color: '#8A4FB1', marginBottom: '3rem' }}>
              Real voices. Real elegance.
            </p>
          </div>
        </Reveal>

        {/* ── SLIDING CARD ── */}
        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: 'clamp(2rem,5vw,3.5rem)', boxShadow: '0 8px 48px rgba(138,79,177,0.12)', minHeight: '200px', transition: 'opacity 0.4s ease', opacity: isSliding ? 0 : 1, textAlign: 'center' }}>
            <StarRating count={testimonials[testimonialsIdx].rating} />
            <blockquote style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.2rem,2.5vw,1.7rem)', fontWeight: 400, fontStyle: 'italic', color: '#1A1A2E', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
              "{testimonials[testimonialsIdx].text}"
            </blockquote>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1' }}>
              — {testimonials[testimonialsIdx].name}, {testimonials[testimonialsIdx].location}
            </p>
          </div>

          {/* Prev / Next arrows */}
          <button onClick={() => { if (autoRef.current) clearInterval(autoRef.current); slideTestimonial('prev') }}
            style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.2)', boxShadow: '0 4px 16px rgba(138,79,177,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2" style={{ transition: 'stroke 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as SVGElement).setAttribute('stroke', 'white') }}
              onMouseLeave={e => { (e.currentTarget as SVGElement).setAttribute('stroke', '#8A4FB1') }}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button onClick={() => { if (autoRef.current) clearInterval(autoRef.current); slideTestimonial('next') }}
            style={{ position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.2)', boxShadow: '0 4px 16px rgba(138,79,177,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"
              onMouseEnter={e => { (e.currentTarget as SVGElement).setAttribute('stroke', 'white') }}
              onMouseLeave={e => { (e.currentTarget as SVGElement).setAttribute('stroke', '#8A4FB1') }}>
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setTestimonialsIdx(i)}
              style={{ width: i === testimonialsIdx ? '28px' : '8px', height: '8px', borderRadius: '4px', background: i === testimonialsIdx ? '#8A4FB1' : 'rgba(138,79,177,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0 }} />
          ))}
        </div>
      </section>

      {/* ── NEW ARRIVALS ────────────────────────────────────── */}
      <section style={{ padding: '6rem clamp(1.5rem,6vw,5rem)', background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <SectionLabel eyebrow="Just Dropped" title={<>New<br/>Arrivals</>} />
          <Reveal from="right">
            <Link to="/new-arrivals" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', borderBottom: '1px solid #8A4FB1', paddingBottom: '2px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>See All <FaArrowRight /></Link>
          </Reveal>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '2rem 1.5rem' }}>
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.08} />)}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────
      <section style={{ background: 'linear-gradient(135deg, #8A4FB1 0%, #5B21B6 100%)', padding: '5rem clamp(1.5rem,8vw,8rem)', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '1rem' }}>Stay in the loop</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#FFFFFF', margin: '0 0 0.75rem 0' }}>
            Get new arrivals & exclusive deals
          </h2>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem' }}>
            Join the Soft Lifee community. No spam — just good things.
          </p>
          <NewsletterForm />
        </Reveal>
      </section> */}

      <style>{`
        @keyframes sl-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ── Category Slide Card ───────────────────────────────────────────────────────
function CategorySlideCard({ cat }: { cat: typeof categories[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={cat.to} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', position: 'relative', overflow: 'hidden', textDecoration: 'none', background: '#EDE0F7', width: 'calc(33.333vw - 2rem)', minWidth: '280px', maxWidth: '420px', height: '460px', flexShrink: 0, borderRadius: '4px' }}>
      <img src={cat.image} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.8) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', bottom: '1.8rem', left: '1.5rem' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '5px' }}>{cat.sub}</p>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontStyle: 'italic', fontWeight: 600, color: '#FFFFFF', margin: '0 0 10px 0' }}>{cat.label}</p>
        <div style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '1px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Shop Now <FaArrowRight />
        </div>
      </div>
    </Link>
  )
}

// ── Gift Card ─────────────────────────────────────────────────────────────────
function GiftCard({ gift }: { gift: typeof giftIdeas[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={gift.to} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'block', position: 'relative', overflow: 'hidden', textDecoration: 'none', height: '280px', background: '#2D1B4E', borderRadius: '4px' }}>
      <img src={gift.image} alt={gift.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'transform 0.6s ease, opacity 0.4s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(138,79,177,0.5)' : 'rgba(26,26,46,0.3)', transition: 'background 0.4s' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '2rem', marginBottom: '0.75rem', display: 'block' }}>{gift.emoji}</span>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', fontWeight: 600, color: '#FFF', marginBottom: '0.4rem' }}>{gift.label}</p>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.8)', lineHeight: 1.5, marginBottom: '1rem' }}>{gift.desc}</p>
        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', borderBottom: '1px solid rgba(255,255,255,0.6)', paddingBottom: '1px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.35s ease', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          Shop <FaArrowRight />
        </span>
      </div>
    </Link>
  )
}

// // ── Newsletter Form ───────────────────────────────────────────────────────────
// function NewsletterForm() {
//   const [email, setEmail] = useState('')
//   const [submitted, setSubmitted] = useState(false)
//   return submitted ? (
//     <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '1rem', color: '#FFF', fontWeight: 600 }}>
//       ✓ You're in! Welcome to the Soft Lifee family. 🌸
//     </p>
//   ) : (
//     <div style={{ display: 'flex', maxWidth: '480px', margin: '0 auto', borderRadius: '2px', overflow: 'hidden' }}>
//       <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}
//         style={{ flex: 1, padding: '1rem 1.2rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: 'none', outline: 'none', background: '#FFF', color: '#1A1A2E' }} />
//       <button onClick={() => email && setSubmitted(true)}
//         style={{ padding: '1rem 1.8rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#1A1A2E', color: '#FFF', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.3s' }}
//         onMouseEnter={e => { e.currentTarget.style.background = '#3B1058' }}
//         onMouseLeave={e => { e.currentTarget.style.background = '#1A1A2E' }}>
//         Join Us
//       </button>
//     </div>
//   )
// }
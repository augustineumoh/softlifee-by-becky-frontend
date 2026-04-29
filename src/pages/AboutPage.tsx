import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import relaxationchair from '../assets/about us.jpeg'
import diffuser from '../assets/diffuser.jpg'
import flowervase from '../assets/flowervase.jpeg'
import rotatinglight from '../assets/Rechargeable Rotation Moonlight light.jpg'
import travelkit from '../assets/travel kit.jpg'
import { FaArrowRight } from "react-icons/fa"
import { FaArrowDown } from "react-icons/fa"

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
  const t = from === 'left' ? 'translateX(-30px)' : from === 'right' ? 'translateX(30px)' : from === 'fade' ? 'none' : 'translateY(24px)'
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : t, transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      {children}
    </div>
  )
}

const values = [
  { icon: '✦', title: 'Intentional Curation', desc: 'Every product is handpicked — not just for aesthetics, but for the real value it adds to your everyday life.' },
  { icon: '✦', title: 'Accessible Luxury', desc: "We believe luxury shouldn't be a privilege. Our products bring beauty and quality within reach for everyone." },
  { icon: '✦', title: 'Authenticity First', desc: 'No compromises. Every item in our collection is 100% authentic, vetted for quality before it ever reaches you.' },
  { icon: '✦', title: 'Community Over Commerce', desc: "We're building more than a store — we're creating a community of people who choose to live beautifully." },
]

const milestones = [
  { year: '2022', title: 'The Beginning', desc: 'Soft Lifee was born from a simple idea — everyone deserves to live beautifully, no matter their budget.' },
  { year: '2023', title: 'Growing the Collection', desc: 'Expanded from skincare into home essentials and accessories, serving thousands of customers across Nigeria.' },
  { year: '2024', title: 'Going Digital', desc: 'Launched our online store — now delivering nationwide to all 36 states across Nigeria.' },
  { year: '2025', title: 'Luxury Goods & Lifestyle', desc: 'Rebranded to reflect our growth — curating luxury goods and lifestyle products for the modern Nigerian lifestyle.' },
]

const stats = [
  { value: '2,000+', label: 'Happy Customers' },
  { value: '50+',    label: 'Curated Products' },
  { value: '36',     label: 'States Delivered To' },
  { value: '100%',   label: 'Authentic Products' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#FAF7FF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, #F3E8FF 0%, #EDE0F7 50%, #FAF7FF 100%)', overflow: 'hidden', paddingTop: '68px' }}>

        {/* Watermark */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(60px,14vw,160px)', fontWeight: 700, color: 'rgba(138,79,177,0.06)', whiteSpace: 'nowrap', lineHeight: 1, position: 'absolute', top: '60px', animation: 'ab-marquee1 18s linear infinite' }}>
            SOFT LIFEE &nbsp;·&nbsp; SOFT LIFEE &nbsp;·&nbsp; SOFT LIFEE &nbsp;·&nbsp; SOFT LIFEE &nbsp;·&nbsp;
          </div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(60px,14vw,160px)', fontWeight: 700, color: 'rgba(91,33,182,0.05)', whiteSpace: 'nowrap', lineHeight: 1, position: 'absolute', top: '230px', animation: 'ab-marquee2 22s linear infinite reverse' }}>
            LUXURY GOODS &nbsp;·&nbsp; LIFESTYLE &nbsp;·&nbsp;
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8A4FB1, #D4AF37, #5B21B6)' }} />

        {/* Split grid */}
        <div className="ab-hero-grid" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1360px', margin: '0 auto', padding: 'clamp(2.5rem,6vw,5rem) clamp(1.25rem,6vw,5rem)', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>

          {/* LEFT */}
          <div>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <div style={{ width: '24px', height: '1px', background: '#8A4FB1' }} />
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8A4FB1' }}>Est. 2022 · Uyo, Akwa Ibom</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(2.4rem,5.5vw,5rem)', color: '#1A1A2E', lineHeight: 1, margin: '0 0 0.1em 0' }}>The Brand</h1>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(2.4rem,5.5vw,5rem)', color: '#8A4FB1', lineHeight: 1, margin: '0 0 0.1em 0' }}>Behind</h1>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(2.4rem,5.5vw,5rem)', color: '#1A1A2E', lineHeight: 1, margin: '0 0 1.25rem 0' }}>the Softness.</h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.82rem,2vw,0.9rem)', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, marginBottom: '1.75rem', maxWidth: '440px' }}>
                Soft Lifee by Becky is a curated lifestyle brand bringing beauty, quality and intentionality into everyday lives across Nigeria.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <a href="#story" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.85rem 1.75rem', borderRadius: '2px', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '6px', minHeight: '44px' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                  Our Story <FaArrowDown />
                </a>
                <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', padding: '0.85rem 1.75rem', border: '1px solid #8A4FB1', borderRadius: '2px', transition: 'all 0.3s', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A4FB1' }}>
                  Shop Now
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div style={{ display: 'flex', gap: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(138,79,177,0.15)', flexWrap: 'wrap' }}>
                {[{ val: '2K+', label: 'Customers' }, { val: '50+', label: 'Products' }, { val: '2022', label: 'Founded' }].map(s => (
                  <div key={s.label}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem,3vw,1.8rem)', fontWeight: 600, color: '#8A4FB1', lineHeight: 1, marginBottom: '2px' }}>{s.val}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* RIGHT — 4 tiles (hidden on mobile) */}
          <Reveal from="right" delay={0.2}>
            <div className="ab-hero-tiles" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', height: 'clamp(300px,40vw,420px)' }}>
              {[
                { label: 'Home',  sub: 'Essentials',  img: diffuser,      bg: 'rgba(138,79,177,0.12)', border: 'rgba(138,79,177,0.2)'  },
                { label: 'Skin',  sub: 'Care',        img: travelkit,     bg: 'rgba(91,33,182,0.1)',   border: 'rgba(91,33,182,0.2)'   },
                { label: 'Style', sub: 'Accessories', img: flowervase,    bg: 'rgba(212,175,55,0.1)',  border: 'rgba(212,175,55,0.25)' },
                { label: 'Life',  sub: 'Essentials',  img: rotatinglight, bg: 'rgba(138,79,177,0.08)', border: 'rgba(138,79,177,0.15)' },
              ].map(tile => (
                <Link key={tile.label} to="/shop"
                  style={{ textDecoration: 'none', position: 'relative', overflow: 'hidden', borderRadius: '12px', background: tile.bg, border: `1px solid ${tile.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(138,79,177,0.15)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                  <img src={tile.img} alt={tile.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, borderRadius: '12px' }} />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1, marginBottom: '2px' }}>{tile.label}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1' }}>{tile.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <style>{`
          @keyframes ab-marquee1 { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes ab-marquee2 { from { transform: translateX(-50%); } to { transform: translateX(0); } }

          @media (max-width: 768px) {
            .ab-hero-grid { grid-template-columns: 1fr !important; }
            .ab-hero-tiles { display: none !important; }
          }
        `}</style>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: 'linear-gradient(135deg, #8A4FB1 0%, #5B21B6 100%)', padding: 'clamp(2rem,4vw,2.5rem) clamp(1.25rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1.5rem', maxWidth: '1360px', margin: '0 auto' }}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: '6px' }}>{s.value}</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── BRAND STORY ── */}
      <section id="story" className="ab-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <Reveal from="left">
          <div style={{ minHeight: 'clamp(280px, 50vw, 560px)', overflow: 'hidden', background: '#EDE0F7', position: 'relative', height: '100%' }}>
            <img src={relaxationchair} alt="Soft Lifee story" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.4) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontStyle: 'italic', fontWeight: 500, color: '#FFFFFF', lineHeight: 1.5 }}>
                "Luxury Goods · Lifestyle"
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal from="right">
          <div style={{ background: '#FAF7FF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem,6vw,5rem)' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.85rem' }}>Who We Are</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem,3vw,2.8rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', lineHeight: 1.2, margin: '0 0 1.25rem 0' }}>
              "Soft living isn't a luxury — it's a choice every Person deserves."
            </h2>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.82rem,2vw,0.88rem)', fontWeight: 300, color: '#5B21B6', lineHeight: 1.9, marginBottom: '1rem' }}>
              Soft Lifee by Becky started with one simple question: why should beautiful living be reserved for the few? We set out to change that — curating products that elevate the everyday, from your skincare shelf to your kitchen counter.
            </p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.82rem,2vw,0.88rem)', fontWeight: 300, color: '#5B21B6', lineHeight: 1.9, marginBottom: '1.75rem' }}>
              Based in Uyo, Akwa Ibom, we deliver Nationwide — bringing intentionally chosen home essentials, skincare, accessories and lifestyle products to people who refuse to settle for less.
            </p>
            <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.85rem 1.75rem', alignSelf: 'flex-start', borderRadius: '2px', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem', minHeight: '44px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Explore Our Collection <FaArrowRight />
            </Link>
          </div>
        </Reveal>

        <style>{`
          @media (max-width: 768px) {
            .ab-story-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── OUR VALUES ── */}
      <section style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1.25rem,6vw,5rem)', background: '#FFFFFF' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,4rem)' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.75rem' }}>What Drives Us</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: 0 }}>Our Core Values</h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 'clamp(1rem,2vw,2rem)' }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div style={{ background: '#FAF7FF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '12px', padding: 'clamp(1.25rem,3vw,2rem)', position: 'relative', overflow: 'hidden', transition: 'all 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#8A4FB1'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(138,79,177,0.1)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(138,79,177,0.1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}>
                  <div style={{ position: 'absolute', top: '-20px', right: '-10px', fontFamily: '"Cormorant Garamond", serif', fontSize: '5rem', fontWeight: 700, color: 'rgba(138,79,177,0.05)', lineHeight: 1, userSelect: 'none' }}>{String(i+1).padStart(2,'0')}</div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: '#8A4FB1', marginBottom: '0.75rem' }}>{v.icon}</p>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.1rem,2vw,1.3rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', marginBottom: '0.6rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.78rem,2vw,0.83rem)', fontWeight: 300, color: '#5B21B6', lineHeight: 1.8 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: 'clamp(3rem,6vw,6rem) clamp(1.25rem,6vw,5rem)', background: '#1A1A2E' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,4rem)' }}>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '0.75rem' }}>Our Journey</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,4vw,3.2rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', margin: 0 }}>How We Got Here</h2>
            </div>
          </Reveal>

          {/* Desktop: center timeline */}
          <div className="ab-timeline-desktop" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(212,175,55,0.2)', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.1} from={i % 2 === 0 ? 'left' : 'right'}>
                <div style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start', marginBottom: '2.5rem', paddingRight: i % 2 === 0 ? 'calc(50% + 2rem)' : 0, paddingLeft: i % 2 === 0 ? 0 : 'calc(50% + 2rem)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '50%', top: '1.2rem', transform: 'translateX(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#D4AF37', border: '2px solid #1A1A2E', zIndex: 1 }} />
                  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', padding: '1.5rem', maxWidth: '340px', width: '100%' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 700, color: '#D4AF37', lineHeight: 1, marginBottom: '6px' }}>{m.year}</p>
                    <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', marginBottom: '8px' }}>{m.title}</h3>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile: left-aligned vertical list */}
          <div className="ab-timeline-mobile" style={{ display: 'none', flexDirection: 'column', gap: '0', paddingLeft: '1.5rem', borderLeft: '2px solid rgba(212,175,55,0.25)', position: 'relative' }}>
            {milestones.map((m, i) => (
              <Reveal key={m.year + '-m'} delay={i * 0.08}>
                <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                  <div style={{ position: 'absolute', left: '-1.9rem', top: '0.3rem', width: '12px', height: '12px', borderRadius: '50%', background: '#D4AF37', border: '2px solid #1A1A2E' }} />
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontWeight: 700, color: '#D4AF37', lineHeight: 1, marginBottom: '4px' }}>{m.year}</p>
                  <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', marginBottom: '6px' }}>{m.title}</h3>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .ab-timeline-desktop { display: none !important; }
            .ab-timeline-mobile  { display: flex !important; }
          }
        `}</style>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,8vw,8rem)', background: 'linear-gradient(135deg, #FAF7FF, #EDE0F7)', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.85rem' }}>Join the Movement</p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,4vw,3.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: '0 0 0.75rem 0' }}>
            Start living softly today
          </h2>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.82rem,2vw,0.9rem)', fontWeight: 300, color: '#5B21B6', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
            Explore our full collection and find something that makes your everyday a little more beautiful.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '2px', transition: 'background 0.3s', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
              Shop Now
            </Link>
            <Link to="/contact" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', background: 'transparent', textDecoration: 'none', padding: '0.9rem 2rem', border: '1px solid #8A4FB1', borderRadius: '2px', transition: 'all 0.3s', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A4FB1' }}>
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

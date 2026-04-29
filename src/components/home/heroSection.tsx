import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import img1 from '../../assets/hero1.jpeg'
import skincare from '../../assets/skincare.jpg'
import jewelry from '../../assets/jewelry.jpg'
import kitchenrack from '../../assets/kitchen rack.jpg'

const slides = [
  {
    id: 1,
    image: img1,
    eyebrow: 'Home Essentials',
    headline: 'Your space,',
    headlineAccent: 'reimagined.',
    sub: 'Smart gadgets & curated home essentials for the modern living space.',
    cta: '/shop/home-essentials',
    align: 'left',
  },
  {
    id: 2,
    image: skincare,
    eyebrow: 'Skincare',
    headline: 'Glow from',
    headlineAccent: 'within.',
    sub: 'Thoughtfully curated skincare rituals for your softest skin yet.',
    cta: '/shop/skincare',
    align: 'center',
  },
  {
    id: 3,
    image: jewelry,
    eyebrow: 'Accessories & Style',
    headline: 'Carry your',
    headlineAccent: 'story.',
    sub: 'Bags, jewelry & travel kits for the woman on the move.',
    cta: '/shop/accessories',
    align: 'right',
  },
  {
    id: 4,
    image: kitchenrack,
    eyebrow: 'New Arrivals',
    headline: 'Fresh drops,',
    headlineAccent: 'every week.',
    sub: "Be the first to discover what's new in the Soft Lifee collection.",
    cta: '/new-arrivals',
    align: 'left',
  },
]

const NAVBAR_H     = 76
const BOTTOM_BAR_H = 72
const DURATION     = 5000

export default function HeroSection() {
  const [current,      setCurrent]      = useState(0)
  const [prev,         setPrev]         = useState<number | null>(null)
  const [progress,     setProgress]     = useState(0)

  const currentRef      = useRef(0)
  const transitioningRef= useRef(false)
  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const progressRef     = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = (index: number) => {
    if (transitioningRef.current || index === currentRef.current) return
    transitioningRef.current = true
    setPrev(currentRef.current)
    currentRef.current = index
    setCurrent(index)
    setProgress(0)
    setTimeout(() => {
      setPrev(null)
      transitioningRef.current = false
    }, 1000)
  }

  useEffect(() => {
    const step = 100 / (DURATION / 50)
    progressRef.current = setInterval(() => setProgress(p => Math.min(p + step, 100)), 50)
    intervalRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % slides.length
      goTo(next)
    }, DURATION)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }, [])


  const slide    = slides[current]
  const prevSlide= prev !== null ? slides[prev] : null
  const isLeft   = slide.align === 'left'
  const isRight  = slide.align === 'right'
  const isCenter = slide.align === 'center'

  return (
    <section style={{ position: 'relative', width: '100%', height: 'min(100vh, 100svh)', minHeight: '520px', overflow: 'hidden', background: '#1a0a2e' }}>

      {/* PREV SLIDE */}
      {prevSlide && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'sl-fadeOut 1s ease forwards' }}>
          <img src={prevSlide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(0,0,0,0.15) 0%,rgba(26,10,46,0.6) 100%)' }} />
        </div>
      )}

      {/* CURRENT SLIDE */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'sl-zoomIn 6s ease forwards' }}>
        <img key={slide.id} src={slide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, animation: 'sl-imgFadeIn 1s ease forwards' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(26,10,46,0.2) 0%,rgba(26,10,46,0.35) 50%,rgba(26,10,46,0.75) 100%)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: isLeft
            ? 'linear-gradient(to right, rgba(59,16,88,0.55) 0%, transparent 65%)'
            : isRight
            ? 'linear-gradient(to left, rgba(59,16,88,0.55) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at center, rgba(59,16,88,0.2) 0%, rgba(59,16,88,0.5) 100%)',
        }} />
      </div>

      {/* PURPLE GRAIN */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', opacity: 0.02,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'absolute', top: NAVBAR_H, bottom: BOTTOM_BAR_H, left: 0, right: 0,
        zIndex: 10,
        display: 'flex', alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : isRight ? 'flex-end' : 'center',
        padding: '0 clamp(1.25rem,7vw,6rem)',
      }}>
        <div key={slide.id} style={{
          maxWidth: '540px',
          textAlign: isCenter ? 'center' : 'left',
          animation: 'sl-contentUp 0.85s cubic-bezier(0.22,1,0.36,1) forwards',
          width: '100%',
        }}>
          {/* Eyebrow */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '0.9rem' }}>
            <div style={{ width: '20px', height: '1px', background: '#C084FC' }} />
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C084FC' }}>
              {slide.eyebrow}
            </span>
            <div style={{ width: '20px', height: '1px', background: '#C084FC' }} />
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5.5vw,5rem)', fontWeight: 500, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 0.05em 0', textShadow: '0 2px 30px rgba(26,10,46,0.3)', letterSpacing: '0.01em' }}>
            {slide.headline}
          </h1>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,5.5vw,5rem)', fontWeight: 600, fontStyle: 'italic', color: '#E8D5F5', lineHeight: 1.05, margin: '0 0 clamp(0.75rem,2vw,1.4rem) 0', textShadow: '0 2px 30px rgba(26,10,46,0.3)', letterSpacing: '0.01em' }}>
            {slide.headlineAccent}
          </h1>

          {/* Sub — hidden on very small screens */}
          <p className="sl-hero-sub" style={{ fontFamily: "'Jost', sans-serif", fontSize: 'clamp(0.78rem,2vw,0.88rem)', fontWeight: 300, color: 'rgba(255,255,255,0.75)', lineHeight: 1.78, marginBottom: 'clamp(1.25rem,3vw,2rem)', maxWidth: '360px', marginLeft: isCenter ? 'auto' : 0, marginRight: isCenter ? 'auto' : 0 }}>
            {slide.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: isCenter ? 'center' : 'flex-start' }}>
            <Link to={slide.cta}
              style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF', background: '#8A4FB1', textDecoration: 'none', padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.25rem,3vw,2rem)', transition: 'all 0.3s ease', display: 'inline-block', minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#6D28D9' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}
            >Discover More</Link>
            <Link to="/shop"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: 'transparent', textDecoration: 'none', padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1.25rem,3vw,2rem)', border: '1px solid rgba(255,255,255,0.42)', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', minHeight: '44px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C084FC'; e.currentTarget.style.background = 'rgba(192,132,252,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.42)'; e.currentTarget.style.background = 'transparent' }}
            >View All</Link>
          </div>
        </div>
      </div>

      {/* SLIDE COUNTER — desktop only */}
      <div className="sl-counter" style={{ position: 'absolute', top: `${NAVBAR_H + 16}px`, right: '2.5rem', zIndex: 20, display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1, fontStyle: 'italic' }}>{String(current + 1).padStart(2, '0')}</span>
        <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}>/ {String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* BOTTOM BAR — desktop: full tab bar / mobile: dots */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, height: `${BOTTOM_BAR_H}px`, background: 'rgba(26,10,46,0.55)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(192,132,252,0.15)' }}>
        {/* Desktop tabs */}
        <div className="sl-bottom-tabs" style={{ display: 'flex', height: '100%', alignItems: 'stretch' }}>
          {slides.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} style={{ flex: 1, background: 'none', border: 'none', borderRight: i < slides.length - 1 ? '1px solid rgba(192,132,252,0.12)' : 'none', cursor: 'pointer', padding: '0 1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '3px', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,132,252,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: i === current ? '#C084FC' : 'rgba(192,132,252,0.2)', width: i === current ? `${progress}%` : '100%', transition: i === current ? 'width 0.05s linear' : 'none' }} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: i === current ? '#C084FC' : 'rgba(255,255,255,0.35)', transition: 'color 0.3s' }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.75rem', fontWeight: i === current ? 600 : 400, color: i === current ? '#FFFFFF' : 'rgba(255,255,255,0.4)', transition: 'color 0.3s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.eyebrow}</span>
            </button>
          ))}
        </div>
        {/* Mobile dots */}
        <div className="sl-bottom-dots" style={{ display: 'none', height: '100%', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '100px', background: i === current ? '#C084FC' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0, minHeight: 'auto' }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sl-zoomIn    { from { transform: scale(1.07); } to { transform: scale(1); } }
        @keyframes sl-imgFadeIn { from { opacity: 0; }            to { opacity: 0.75; } }
        @keyframes sl-fadeOut   { from { opacity: 1; }            to { opacity: 0; } }
        @keyframes sl-contentUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .sl-bottom-tabs { display: none !important; }
          .sl-bottom-dots { display: flex !important; }
          .sl-counter     { display: none !important; }
          .sl-hero-sub    { display: none; }
        }
      `}</style>
    </section>
  )
}
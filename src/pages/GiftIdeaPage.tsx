import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import totebag from '../assets/tote bag.jpg'
import diffuser from '../assets/diffuser.jpg'
import mask from '../assets/stick mask.jpg'
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
import rotatinglight from '../assets/Rechargeable Rotation Moonlight light.jpg'
import storagebasket from '../assets/storage basket.jpeg'
import pimplepatches from '../assets/pimple patches.jpg'
import laptopstand from '../assets/laptop stand.jpg'
import jewelrybox from '../assets/jewellery box.jpg'
import nanotape from '../assets/nano tape.jpg'
import handcream from '../assets/hand cream.jpg'
import facemask from '../assets/face mask.jpeg'
import stanley from '../assets/stanley cup.jpeg'
import fan from '../assets/Fan.jpg'
import juicer from '../assets/blender.jpeg'
import flipper from '../assets/cooking fliper.jpg'
import trashcan from '../assets/kitchen trash can.jpg'
import ledlamp from '../assets/diamond led lamp.jpg'
import series8 from '../assets/smart watch series 8.jpg'
import booblifter from '../assets/boops lifter.jpeg'
import vineleaf from '../assets/vine leaf.jpg'
import sensorlight from '../assets/solar light.jpg'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa'
import { useCart } from '../store/cartStore'

const slugToId = (slug: string) =>
  Math.abs(slug.split('').reduce((h, c) => (Math.imul(31, h) + c.charCodeAt(0)) | 0, 0))

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

// ALL ids must match between giftCategories, giftProducts keys, and <section id>
const giftCategories = [
  { id: 'her',        label: 'For Her',            emoji: '🌸', color: '#8A4FB1' },
  { id: 'him',        label: 'For Him',            emoji: '🎯', color: '#1A1A2E' },
  { id: 'forhome',    label: 'For the Home',       emoji: '🏡', color: '#5B21B6' },
  { id: 'forkitchen', label: 'For Kitchen',        emoji: '🍳', color: '#D4AF37' },
  { id: 'fortravel',  label: 'Travel Ready',       emoji: '✈️', color: '#1A1A2E' },
  { id: 'forbudget',  label: 'Under ₦10,000',      emoji: '🎁', color: '#8A4FB1' },
  { id: 'forluxury',  label: 'Luxury Gifts',       emoji: '👑', color: '#D4AF37' },
  { id: 'sets',       label: 'Gift Sets & Bundles', emoji: '🎀', color: '#5B21B6' },
  { id: 'valentine',  label: 'Valentine Package',  emoji: '❤️', color: '#BE123C' },
]

const giftProducts: Record<string, Array<{ name: string; price: number; image: string; slug: string; badge?: string }>> = {
  her: [
    { name: 'Green Stick Mask',    price: 5000,  image: mask,              slug: 'green-stick-mask',                          badge: 'Top Rated'  },
    { name: 'Tote Bag',            price: 8500,  image: totebag,           slug: 'tote-bag',                                  badge: 'New'        },
    { name: 'Boob Tape',           price: 3500,  image: booptape,          slug: 'boob-tape',                                 badge: 'Best Seller'},
    { name: 'Flower Vase',         price: 12000, image: flowervase,        slug: 'flower-vase',                               badge: 'New'        },
    { name: 'Hand Cream',          price: 700,   image: handcream,         slug: 'floral-fruit-fragrance-hand-cream',         badge: 'New'        },
    { name: 'Facial Mask',         price: 800,   image: facemask,          slug: 'sadoer-ampoules-facial-mask',               badge: 'New'        },
    { name: 'Jewelry Box',         price: 32000, image: jewelrybox,        slug: '3-layers-jewelry-box-with-key',             badge: 'New'        },
    { name: 'Boob Lifter',         price: 4500,  image: booblifter,        slug: 'transparent-boobs-lifter',                  badge: 'New'        },
  ],
  him: [
    { name: 'Smart Watch Series 8', price: 25000, image: series8,          slug: 'smart-watch-series-8',                      badge: 'New'        },
    { name: 'Smart-Watch Set',      price: 40000, image: smartwatch,       slug: 'smart-watch-set',                           badge: 'Premium'    },
    { name: 'Laptop Stand',         price: 8000,  image: laptopstand,      slug: 'laptop-stand',                              badge: 'Trending'   },
    { name: 'AC Cooling Fan',       price: 25000, image: fan,              slug: 'ac-cooling-humidifier-fan',                 badge: 'Best Seller'},
    { name: 'Stanley Cup',          price: 17000, image: stanley,          slug: 'stanley-cup',                               badge: 'Best Seller'},
    { name: 'Matte Tumbler',        price: 18000, image: tumbler,          slug: 'matte-stanley-tumbler',                     badge: 'New'        },
  ],
  forhome: [
    { name: 'Diffuser',             price: 15000, image: diffuser,         slug: 'diffuser',                                  badge: 'Best Seller'},
    { name: 'Moonlight Lamp',       price: 14500, image: rotatinglight,    slug: 'moonlight-lamp',                            badge: 'New'        },
    { name: 'Crystal LED Lamp',     price: 13000, image: ledlamp,          slug: 'crystal-diamond-led-lamp',                  badge: 'New'        },
    { name: 'Flower Vase',          price: 12000, image: flowervase,       slug: 'flower-vase',                               badge: 'New'        },
    { name: 'Vine Leaf Decor',      price: 1800,  image: vineleaf,         slug: 'vine-leaf-room-decor',                      badge: 'New'        },
    { name: 'Bathroom Organizer',   price: 15000, image: bathroomOrganizer,slug: 'bathroom-organizer',                        badge: 'Best Seller'},
    { name: 'Relaxation Chair',     price: 85000, image: relaxationchair,  slug: 'relaxation-chair',                          badge: 'Premium'    },
    { name: 'Sensor Light',         price: 13000, image: sensorlight,      slug: '360-motion-sensor-light',                   badge: 'Best Seller'},
  ],
  forkitchen: [
    { name: 'Juicer Cup',           price: 14000, image: juicer,           slug: 'ultra-portable-multi-functional-juicer-cup',badge: 'Best Seller'},
    { name: 'Cooking Flipper',      price: 5000,  image: flipper,          slug: 'cooking-flipper',                           badge: 'Best Seller'},
    { name: 'Ceramic Cup Set',      price: 22000, image: ceramiccupset,    slug: 'ceramic-cup-set',                           badge: 'New'        },
    { name: 'Storage Basket',       price: 7500,  image: storagebasket,    slug: 'storage-basket',                            badge: 'New'        },
    { name: 'Wall Trash Can',       price: 4500,  image: trashcan,         slug: 'multifunctional-wall-mounted-trash-can',    badge: 'New'        },
    { name: 'Stanley Cup',          price: 17000, image: stanley,          slug: 'stanley-cup',                               badge: 'Best Seller'},
  ],
  fortravel: [
    { name: 'Travel Box',           price: 9500,  image: travelbox,        slug: 'travel-box',                                badge: 'New'        },
    { name: 'Travel Kit',           price: 14500, image: travelkit,        slug: 'travel-kit',                                badge: 'Best Seller'},
    { name: 'Matte Tumbler',        price: 18000, image: tumbler,          slug: 'matte-stanley-tumbler',                     badge: 'New'        },
    { name: 'Tote Bag',             price: 8500,  image: totebag,          slug: 'tote-bag',                                  badge: 'New'        },
    { name: 'Laptop Stand',         price: 8000,  image: laptopstand,      slug: 'laptop-stand',                              badge: 'Trending'   },
    { name: 'Stanley Cup Acc.',     price: 25000, image: stanleycup,       slug: 'stanley-cup-accessories',                   badge: 'Trending'   },
  ],
  forbudget: [
    { name: 'Hand Cream',           price: 700,   image: handcream,        slug: 'floral-fruit-fragrance-hand-cream',         badge: 'New'        },
    { name: 'Green Stick Mask',     price: 5000,  image: mask,             slug: 'green-stick-mask',                          badge: 'Top Rated'  },
    { name: 'Nano Tape',            price: 6000,  image: nanotape,         slug: 'double-sided-nano-tape',                    badge: 'New'        },
    { name: 'Vine Leaf Decor',      price: 1800,  image: vineleaf,         slug: 'vine-leaf-room-decor',                      badge: 'New'        },
    { name: 'Boob Tape',            price: 3500,  image: booptape,         slug: 'boob-tape',                                 badge: 'Best Seller'},
    { name: 'Star Pimple Patches',  price: 1300,  image: pimplepatches,    slug: 'star-pimple-patches',                       badge: 'Trending'   },
    { name: 'Cooking Flipper',      price: 5000,  image: flipper,          slug: 'cooking-flipper',                           badge: 'Best Seller'},
    { name: 'Facial Mask',          price: 800,   image: facemask,         slug: 'sadoer-ampoules-facial-mask',               badge: 'New'        },
  ],
  forluxury: [
    { name: 'Relaxation Chair',     price: 85000, image: relaxationchair,  slug: 'relaxation-chair',                          badge: 'Premium'    },
    { name: 'Smart-Watch Set',      price: 40000, image: smartwatch,       slug: 'smart-watch-set',                           badge: 'Premium'    },
    { name: 'Jewelry Box',          price: 32000, image: jewelrybox,       slug: '3-layers-jewelry-box-with-key',             badge: 'New'        },
    { name: 'AC Cooling Fan',       price: 25000, image: fan,              slug: 'ac-cooling-humidifier-fan',                 badge: 'Best Seller'},
    { name: 'Smart Watch Series 8', price: 25000, image: series8,          slug: 'smart-watch-series-8',                      badge: 'New'        },
    { name: 'Ceramic Cup Set',      price: 22000, image: ceramiccupset,    slug: 'ceramic-cup-set',                           badge: 'New'        },
  ],
  sets: [
    { name: 'Travel Kit + Tote Bag', price: 23000, image: travelkit,       slug: 'travel-kit',                                badge: 'Bundle'     },
    { name: 'Skincare Starter Set',  price: 7800,  image: mask,            slug: 'green-stick-mask',                          badge: 'Bundle'     },
    { name: 'Home Essentials Pack',  price: 42000, image: diffuser,        slug: 'diffuser',                                  badge: 'Bundle'     },
    { name: 'Kitchen Starter Set',   price: 26000, image: juicer,          slug: 'ultra-portable-multi-functional-juicer-cup',badge: 'Bundle'     },
    { name: 'Luxury Gift Set',       price: 65000, image: jewelrybox,      slug: '3-layers-jewelry-box-with-key',             badge: 'Bundle'     },
    { name: 'Tumbler + Accessories', price: 43000, image: stanley,         slug: 'stanley-cup',                               badge: 'Bundle'     },
  ],
  valentine: [
    { name: 'Jewelry Box',          price: 32000, image: jewelrybox,       slug: '3-layers-jewelry-box-with-key',             badge: 'Valentine'  },
    { name: 'Diffuser',             price: 15000, image: diffuser,         slug: 'diffuser',                                  badge: 'Valentine'  },
    { name: 'Green Stick Mask',     price: 5000,  image: mask,             slug: 'green-stick-mask',                          badge: 'Valentine'  },
    { name: 'Flower Vase',          price: 12000, image: flowervase,       slug: 'flower-vase',                               badge: 'Valentine'  },
    { name: 'Smart Watch Series 8', price: 25000, image: series8,          slug: 'smart-watch-series-8',                      badge: 'Valentine'  },
    { name: 'Matte Tumbler',        price: 18000, image: tumbler,          slug: 'matte-stanley-tumbler',                     badge: 'Valentine'  },
    { name: 'Hand Cream',           price: 700,   image: handcream,        slug: 'floral-fruit-fragrance-hand-cream',         badge: 'Valentine'  },
    { name: 'Tote Bag',             price: 8500,  image: totebag,          slug: 'tote-bag',                                  badge: 'Valentine'  },
  ],
}

const badgeColors: Record<string, { bg: string; text: string }> = {
  'Best Seller': { bg: '#8A4FB1', text: '#FFF'     },
  'Top Rated':   { bg: '#5B21B6', text: '#FFF'     },
  'New':         { bg: '#D4AF37', text: '#1A1A2E'  },
  'Trending':    { bg: '#1A1A2E', text: '#FFF'     },
  'Premium':     { bg: '#D4AF37', text: '#1A1A2E'  },
  'Bundle':      { bg: '#BE123C', text: '#FFF'     },
  'Valentine':   { bg: '#BE123C', text: '#FFF'     },
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function MiniCard({ product }: { product: typeof giftProducts['her'][0] }) {
  const [hovered, setHovered] = useState(false)
  const [adding, setAdding]   = useState(false)
  const { addItem }           = useCart()
  const bc = badgeColors[product.badge || ''] || { bg: '#8A4FB1', text: '#FFF' }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: slugToId(product.slug), name: product.name, price: product.price, image: product.image, slug: product.slug, category: '' })
    setAdding(true)
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${hovered ? '#8A4FB1' : 'rgba(138,79,177,0.1)'}`, transition: 'all 0.25s', boxShadow: hovered ? '0 8px 32px rgba(138,79,177,0.14)' : 'none' }}>
        {/* Image area — not wrapped in Link so add-to-cart click doesn't navigate */}
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#F0E8FA' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.55s ease', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />
          {product.badge && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: bc.bg, color: bc.text, fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '100px' }}>
              {product.badge}
            </div>
          )}
          <div onClick={handleAdd} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: adding ? 'rgba(22,163,74,0.92)' : 'rgba(26,26,46,0.88)', backdropFilter: 'blur(4px)', padding: '0.65rem', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF' }}>{adding ? '✓ Added!' : 'Add to Cart'}</span>
          </div>
        </div>
        {/* Text — Link only here so clicking the name/price navigates */}
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '0.75rem 0.9rem 0.5rem' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2, marginBottom: '3px' }}>{product.name}</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.price)}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

function GiftSection({ cat, index }: { cat: typeof giftCategories[0]; index: number }) {
  const products = giftProducts[cat.id] || []
  const { ref, visible } = useInView(0.05)
  return (
    <section id={cat.id} style={{ padding: '5rem clamp(1.5rem,6vw,5rem)', background: index % 2 === 0 ? '#FAF7FF' : '#FFFFFF', borderBottom: '1px solid rgba(138,79,177,0.06)' }}>
      <div ref={ref} style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(4rem,8vw,7rem)', fontWeight: 700, color: 'rgba(138,79,177,0.08)', lineHeight: 1, userSelect: 'none' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.emoji}</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: cat.color }}>Gift Guide</span>
              </div>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, fontStyle: 'italic', color: '#1A1A2E', margin: 0, lineHeight: 1 }}>
                {cat.label}
              </h2>
            </div>
          </div>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: cat.color, textDecoration: 'none', borderBottom: `1px solid ${cat.color}`, paddingBottom: '2px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Shop All <FaArrowRight />
          </Link>
        </div>
        {/* Accent line */}
        <div style={{ height: '2px', background: `linear-gradient(to right, ${cat.color}, transparent)`, marginBottom: '2.5rem', borderRadius: '1px' }} />
        {/* Products */}
        <div className="gi-product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
          {products.map((p, i) => (
            <div key={`${p.slug}-${i}`} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s` }}>
              <MiniCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Smooth scroll utility ─────────────────────────────────────────────────────
function scrollToId(id: string, smooth = true) {
  const NAV_HEIGHT = 68 + 52 // navbar + sticky category nav
  let attempts = 0
  const attempt = () => {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
      window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
    } else if (attempts < 15) {
      attempts++
      setTimeout(attempt, 120)
    }
  }
  requestAnimationFrame(attempt)
}

export default function GiftIdeasPage() {
  const [activeNav, setActiveNav] = useState('her')

  // On mount — check if URL has a hash and scroll to it
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setTimeout(() => {
        setActiveNav(hash)
        scrollToId(hash, false)
      }, 300)
    }
  }, [])

  // Highlight active nav on scroll
  useEffect(() => {
    const onScroll = () => {
      for (const cat of giftCategories) {
        const el = document.getElementById(cat.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 130 && rect.bottom >= 130) {
            setActiveNav(cat.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    setActiveNav(id)
    scrollToId(id, true)
  }

  return (
    <div style={{ background: '#FAF7FF' }}>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', minHeight: '560px', background: '#1A1A2E', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(138,79,177,0.35) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', opacity: 0.35 }}>
          {[flowervase, jewelrybox, tumbler, diffuser].map((img, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%', background: 'linear-gradient(to right, #1A1A2E 0%, transparent 40%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(2rem,6vw,5rem)', paddingTop: 'clamp(6rem,10vw,9rem)', maxWidth: '680px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '100px', padding: '5px 14px', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.9rem' }}>🎁</span>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37' }}>Gift Guide 2026</span>
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(3rem,6vw,5.5rem)', color: '#FFFFFF', lineHeight: 1, margin: '0 0 0.3rem 0' }}>The Art of</h1>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(3rem,6vw,5.5rem)', color: '#D4AF37', lineHeight: 1, margin: '0 0 1.5rem 0' }}>Gifting.</h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '440px' }}>
            Curated with intention. Every gift in this guide is handpicked to make someone feel truly seen — whether it's a treat for her, him, the home, or a luxury splurge.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={e => handleNavClick(e, 'her')}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', border: 'none', padding: '0.9rem 2rem', borderRadius: '2px', cursor: 'pointer', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#1A1A2E' }}>
              Explore Gifts <FaArrowDown />
            </button>
            <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: 'transparent', textDecoration: 'none', padding: '0.9rem 2rem', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '2px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#FFF' }}>
              Shop All
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[{ val: `${giftCategories.length}`, label: 'Gift Categories' }, { val: '50+', label: 'Curated Products' }, { val: '₦700', label: 'Starting From' }].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: '2px' }}>{s.val}</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STICKY CATEGORY NAV ── */}
      <div style={{ position: 'sticky', top: '68px', zIndex: 100, background: 'rgba(250,247,255,0.97)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(138,79,177,0.12)', overflowX: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 clamp(1.5rem,6vw,5rem)', whiteSpace: 'nowrap' }}>
          {giftCategories.map(cat => (
            <button
              key={cat.id}
              onClick={e => handleNavClick(e, cat.id)}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeNav === cat.id ? cat.color : 'rgba(26,26,46,0.45)', background: 'none', border: 'none', borderBottom: `2px solid ${activeNav === cat.id ? cat.color : 'transparent'}`, padding: '1rem 1.2rem', cursor: 'pointer', transition: 'all 0.25s', display: 'inline-flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap' }}>
              <span style={{ fontSize: '0.85rem' }}>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── GIFT SECTIONS ── */}
      {giftCategories.map((cat, i) => (
        <GiftSection key={cat.id} cat={cat} index={i} />
      ))}

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #5B21B6 50%, #8A4FB1 100%)', padding: '5rem clamp(1.5rem,8vw,8rem)', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>Can't decide?</p>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', margin: '0 0 0.75rem 0' }}>Shop our full collection</h2>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>Every product is gift-worthy. Browse the full Soft Lifee catalogue.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '2px', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFF' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37' }}>
            Shop All Products
          </Link>
          <Link to="/new-arrivals" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: 'transparent', textDecoration: 'none', padding: '1rem 2.5rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFF' }}>
            New Arrivals
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .gi-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  )
}
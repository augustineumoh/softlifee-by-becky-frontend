import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  FiHeart, FiShare2, FiShoppingBag, FiZap, FiChevronDown, FiChevronUp,
  FiTruck, FiRefreshCw, FiShield, FiStar, FiInstagram,
  FiMinus, FiPlus, FiCheck, FiPackage, FiPlay
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../store/cartStore'

import totebag       from '../assets/tote bag.jpg'
import diffuser      from '../assets/diffuser.jpg'
import mask          from '../assets/stick mask.jpg'
import sanddrop      from '../assets/sand drop.jpg'
import smartwatch    from '../assets/smart watch.jpg'
import bathroomOrg   from '../assets/bathroom organizer.jpg'
import travelkit     from '../assets/travel kit.jpg'
import stanleycup    from '../assets/Stanley cup accessories.jpg'
import tumbler       from '../assets/Matte-stanley-style-tumber.jpeg'
import flowervase    from '../assets/flowervase.jpeg'
import ceramiccup    from '../assets/ceramic cup set.jpeg'
import travelbox     from '../assets/travel box.jpeg'
import rotatinglight from '../assets/Rechargeable Rotation Moonlight light.jpg'
import storagebasket from '../assets/storage basket.jpeg'
import toiletrack    from '../assets/over-the-toilet organizer rack.jpg'
import ledlamp       from '../assets/diamond led lamp.jpg'
import vineleaf      from '../assets/vine leaf.jpg'
import series8       from '../assets/smart watch series 8.jpg'
import facetowel     from '../assets/face towel.jpg'
import facemask      from '../assets/face mask.jpeg'
import stanley       from '../assets/stanley cup.jpeg'
import flipper       from '../assets/cooking fliper.jpg'
import bathroom      from '../assets/bathroom set.jpeg'
import juicer        from '../assets/blender.jpeg'
import stanleyblush from '../assets/blush stanley.jpg'
import stanleysage from '../assets/sage green stanley.jpg'
import stanleycream from '../assets/cream color stanley.jpg'
import stanleycharcoal from '../assets/charcoal stanley.jpg'
import stanleyalpineblue from '../assets/alpineblue stanley.jpg'
import stanleyterracotta from '../assets/terracotta stanley.jpg'
import totebagblack from'../assets/tote black.jpg'
import tote from '../assets/tote.jpg'
import totebagblush from '../assets/blush tote.jpg'
import smartwatchgold from '../assets/smartwatchgold.jpg'


const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

// ── Media item type: image or video ──────────────────────────────────────────
type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

// ── Color variant type ────────────────────────────────────────────────────────
interface ColorVariant {
  label: string
  hex: string
  image: string
  extraImages?: string[]
}

interface Product {
  id: number
  slug: string
  name: string
  category: string
  subcategory: string
  price: number
  badge: string
  image: string
  media: MediaItem[]
  colors?: ColorVariant[]
  description: string
  details: string[]
  rating: number
  reviews: number
}

const allProducts: Product[] = [
  {
    id: 1, slug: 'diffuser', name: 'Diffuser', category: 'Home Essentials', subcategory: 'smart-gadgets', price: 15000, badge: 'Best Seller', image: diffuser,
    media: [{ type: 'image', src: diffuser }, { type: 'image', src: rotatinglight }, { type: 'image', src: ledlamp }],
    description: 'Transform your space with our premium ultrasonic diffuser. Combines aromatherapy and cool mist humidification to create the perfect ambiance for relaxation, focus, or sleep.',
    details: ['Ultrasonic cold mist technology', 'Runs up to 8 hours continuously', 'Auto shut-off when water runs out', 'Soft LED mood lighting (7 colours)', 'BPA-free premium materials', 'Ideal room size: up to 30m²'], rating: 4.8, reviews: 124,
  },
  {
    id: 2, slug: 'green-stick-mask', name: 'Green Stick Mask', category: 'Skincare', subcategory: 'face', price: 5000, badge: 'Top Rated', image: mask,
    media: [{ type: 'image', src: mask }, { type: 'image', src: facemask }, { type: 'image', src: facetowel }],
    description: 'A deep-cleansing green tea infused stick mask that draws out impurities, unclogs pores and leaves skin feeling refreshed, smooth and perfectly balanced.',
    details: ['Green tea & charcoal formula', 'Suitable for all skin types', 'Dermatologist tested', 'No parabens or sulphates', 'Stick applicator — zero mess', 'Use 2–3 times per week'], rating: 4.7, reviews: 89,
  },
  {
    id: 3, slug: 'tote-bag', name: 'Tote Bag', category: 'Accessories', subcategory: 'bags', price: 8500, badge: 'New', image: tote,
    media: [{ type: 'image', src: totebag }],
    colors: [
      { label: 'Alpine Blue', hex: '#4A7FA5', image: totebag },
      { label: 'Black',   hex: '#1A1A2E', image: totebagblack },
      { label: 'Blush',   hex: '#F4B8C1', image: totebagblush },
    ],
    description: 'A versatile and stylish tote bag designed for the modern woman. Spacious enough for everything you need, minimal enough to go everywhere.',
    details: ['Premium canvas material', 'Reinforced handles', 'Internal zip pocket', 'Dimensions: 40cm × 35cm × 12cm', 'Available in multiple colours', 'Machine washable'], rating: 4.5, reviews: 56,
  },
  {
    id: 4, slug: '3D-sand-drop', name: '3D Sand Drop', category: 'Home Essentials', subcategory: 'smart-gadgets', price: 10000, badge: 'Trending', image: sanddrop,
    media: [{ type: 'image', src: sanddrop }],
    description: 'A mesmerising kinetic sand sculpture that creates ever-changing landscapes as the coloured sand slowly flows and settles. The ultimate desk art piece.',
    details: ['Borosilicate glass frame', 'Non-toxic coloured sand', 'Creates unique patterns every time', 'Dimensions: 20cm × 15cm', 'Sealed — no maintenance required', 'Great gift for any occasion'], rating: 4.6, reviews: 43,
  },
  {
    id: 5, slug: 'bathroom-organizer', name: 'Bathroom Organizer', category: 'Home Essentials', subcategory: 'bathroom', price: 15000, badge: 'Best Seller', image: bathroomOrg,
    media: [{ type: 'image', src: bathroomOrg }, { type: 'image', src: bathroom }, { type: 'image', src: toiletrack }],
    description: 'Keep your bathroom clutter-free with this multi-tier organizer. Perfect for toiletries, skincare products and accessories — everything within reach and beautifully organised.',
    details: ['Rust-resistant stainless steel', '3-tier storage system', 'Easy install — no drilling required', 'Holds up to 10kg per shelf', 'Dimensions: 25cm × 60cm', 'Wipe clean surface'], rating: 4.9, reviews: 201,
  },
  {
    id: 6, slug: 'smart-watch-set', name: 'Smart-Watch Set', category: 'Accessories', subcategory: 'jewelry', price: 40000, badge: 'Premium', image: smartwatch,
    media: [{ type: 'image', src: smartwatch }, { type: 'image', src: series8 }],
    colors: [
      { label: 'Black',  hex: '#1A1A2E', image: smartwatch },
      { label: 'Silver', hex: '#C0C0C0', image: series8    },
      { label: 'Gold',   hex: '#D4AF37', image: smartwatchgold },
    ],
    description: 'A premium smart watch bundle that tracks your fitness goals, monitors your health metrics and keeps you connected — all with a sleek, luxury aesthetic.',
    details: ['Heart rate & SpO2 monitoring', '7-day battery life', 'IP68 water resistant', '100+ sport modes', 'Custom watch faces', 'Compatible: iOS & Android'], rating: 4.7, reviews: 167,
  },
  {
    id: 7, slug: 'matte-stanley-tumbler', name: 'Matte Stanley Tumbler', category: 'Accessories', subcategory: 'drinkware', price: 18000, badge: 'New', image: tumbler,
    media: [
      { type: 'image', src: tumbler },
      { type: 'image', src: stanley },
      { type: 'image', src: stanleycup },
      { type: 'video', src: 'https://pin.it/1UwKreuKA', poster: tumbler },
    ],
    colors: [
      { label: 'Blush',    hex: '#F4B8C1', image: tumbler   },
      { label: 'Sage',     hex: '#8FAF8F', image: stanley   },
      { label: 'Charcoal', hex: '#3D3D3D', image: stanleycup},
      { label: 'Cream',    hex: '#FFF8E7', image: tumbler   },
      { label: 'Lilac',    hex: '#C4A8D4', image: stanley   },
      { label: 'Navy',     hex: '#1A1A4E', image: stanleycup},
    ],
    description: 'The iconic Stanley tumbler in a luxurious matte finish. Double-wall vacuum insulation keeps your drinks hot for 7 hours and cold for 24 hours. Elevate your daily hydration.',
    details: ['Double-wall vacuum insulation', 'Hot: 7hrs · Iced: 24hrs · Cold: 3 days', 'BPA-free 18/8 stainless steel', 'Capacity: 40oz (1.18L)', 'Fits most car cup holders', 'Leak-proof lid with carry handle'], rating: 4.9, reviews: 312,
  },
  {
    id: 8, slug: 'flower-vase', name: 'Flower Vase', category: 'Home Essentials', subcategory: 'kitchen', price: 12000, badge: 'New', image: flowervase,
    media: [{ type: 'image', src: flowervase }, { type: 'image', src: vineleaf }],
    colors: [
      { label: 'White',  hex: '#FAFAFA', image: flowervase },
      { label: 'Beige',  hex: '#E8D5B0', image: vineleaf   },
      { label: 'Terracotta', hex: '#C4553A', image: flowervase },
    ],
    description: 'A beautifully crafted ceramic flower vase that adds natural elegance to any room. The minimalist design complements both fresh and dried flower arrangements.',
    details: ['Premium glazed ceramic', 'Height: 28cm, Diameter: 12cm', 'Suitable for fresh & dried flowers', 'Waterproof interior lining', 'Scratch-resistant base', 'Dishwasher safe'], rating: 4.6, reviews: 78,
  },
  {
    id: 9, slug: 'ceramic-cup-set', name: 'Ceramic Cup Set', category: 'Home Essentials', subcategory: 'kitchen', price: 22000, badge: 'New', image: ceramiccup,
    media: [{ type: 'image', src: ceramiccup }],
    colors: [
      { label: 'Stone',  hex: '#9E9E9E', image: ceramiccup },
      { label: 'White',  hex: '#FAFAFA', image: ceramiccup },
      { label: 'Sage',   hex: '#8FAF8F', image: ceramiccup },
    ],
    description: 'A curated set of artisan ceramic cups that transform your morning ritual into a luxury experience. Each piece is handcrafted with subtle variations that make every cup unique.',
    details: ['Set of 4 handcrafted cups', 'Capacity: 350ml each', 'Lead-free glazed ceramic', 'Microwave & dishwasher safe', 'Gift box packaging included', 'Available in 3 colour palettes'], rating: 4.8, reviews: 95,
  },
  {
    id: 10, slug: 'travel-box', name: 'Travel Box', category: 'Skincare', subcategory: 'travel-kits', price: 9500, badge: 'New', image: travelbox,
    media: [{ type: 'image', src: travelbox }, { type: 'image', src: travelkit }],
    description: 'A compact, TSA-approved travel skincare organiser with leak-proof compartments. Keep your entire skincare routine perfectly organised on the go.',
    details: ['TSA-approved dimensions', '6 leak-proof silicone bottles', 'Clear design for airport security', 'Hanging hook for easy access', 'Waterproof outer shell', 'Fits carry-on luggage perfectly'], rating: 4.5, reviews: 62,
  },
  {
    id: 15, slug: 'storage-basket', name: 'Storage Basket', category: 'Home Essentials', subcategory: 'kitchen', price: 7500, badge: 'New', image: storagebasket,
    media: [{ type: 'image', src: storagebasket }],
    description: 'A versatile woven storage basket that combines practicality with aesthetic appeal.',
    details: ['Durable woven construction', 'Dimensions: 30cm × 20cm × 15cm', 'Handles for easy carrying', 'Collapses flat for storage', 'Holds up to 5kg', 'Easy to clean surface'], rating: 4.4, reviews: 47,
  },
  {
    id: 16, slug: 'moonlight-lamp', name: 'Moonlight Lamp', category: 'Home Essentials', subcategory: 'lighting', price: 14500, badge: 'New', image: rotatinglight,
    media: [{ type: 'image', src: rotatinglight }, { type: 'image', src: ledlamp }],
    description: 'A stunning rechargeable rotating moon lamp that casts a magical celestial glow. 16 colour options controlled via remote or touch — the perfect mood light for any room.',
    details: ['16 colour options', 'Remote + touch control', 'USB rechargeable (4hr charge = 8hr use)', '3 brightness levels', 'Diameter: 15cm', 'Auto-off timer: 1hr / 2hr / 4hr'], rating: 4.8, reviews: 189,
  },
  {
    id: 23, slug: 'crystal-diamond-led-lamp', name: 'Crystal Diamond LED Lamp', category: 'Home Essentials', subcategory: 'lighting', price: 13000, badge: 'New', image: ledlamp,
    media: [{ type: 'image', src: ledlamp }, { type: 'image', src: rotatinglight }],
    description: 'A gorgeous crystal diamond LED table lamp that creates dazzling light patterns on your walls and ceiling.',
    details: ['Faceted crystal design', 'Warm white LED bulb included', 'Touch dimmer (3 levels)', 'USB + plug power options', 'Height: 32cm', 'Energy efficient — 5W'], rating: 4.7, reviews: 83,
  },
  {
    id: 41, slug: 'smart-watch-series-8', name: 'Smart Watch (Series 8)', category: 'Accessories', subcategory: 'jewelry', price: 25000, badge: 'New', image: series8,
    media: [{ type: 'image', src: series8 }, { type: 'image', src: smartwatch }],
    colors: [
      { label: 'Midnight', hex: '#1A1A2E', image: series8    },
      { label: 'Silver',   hex: '#C0C0C0', image: smartwatch },
      { label: 'Rose Gold',hex: '#B76E79', image: series8    },
    ],
    description: 'The Series 8 smart watch brings premium health tracking and connectivity in a sleek, modern design.',
    details: ['Always-on Retina display', 'ECG & blood oxygen monitoring', 'Crash detection feature', 'IP6X dust resistant', '18-hour battery life', 'Compatible with iOS & Android'], rating: 4.8, reviews: 142,
  },
  {
    id: 45, slug: 'stanley-cup', name: 'Stanley Cup', category: 'Accessories', subcategory: 'drinkware', price: 17000, badge: 'Best Seller', image: stanley,
    media: [
      { type: 'image', src: stanleyblush    },
      { type: 'image', src: stanleysage    },
      { type: 'image', src: stanleycream },
      { type: 'image', src: stanleycharcoal },
      { type: 'image', src: stanleyalpineblue },
      { type: 'image', src: stanleyterracotta },
      { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: stanley },
    ],
    colors: [
      { label: 'Desert Sage',  hex: '#8FAF8F', image: stanleysage    },
      { label: 'Cream',        hex: '#FFF8E7', image: stanleycream    },
      { label: 'Charcoal',     hex: '#3D3D3D', image: stanleycharcoal },
      { label: 'Blush',        hex: '#F4B8C1', image: stanleyblush    },
      { label: 'Alpine Blue',  hex: '#4A7FA5', image: stanleyalpineblue    },
      { label: 'Terracotta',   hex: '#C4553A', image: stanleyterracotta },
    ],
    description: 'The legendary Stanley cup — a cultural icon and the ultimate hydration companion. Built to last a lifetime with vacuum insulation that actually works.',
    details: ['40oz vacuum insulated', 'Keeps cold 2+ days with ice', 'Comfort grip handle', 'Reusable straw included', 'Fits cup holders', 'Lifetime guarantee'], rating: 5.0, reviews: 445,
  },
  {
    id: 51, slug: 'ultra-portable-multi-functional-juicer-cup', name: 'Ultra-Portable Juicer Cup', category: 'Home Essentials', subcategory: 'kitchen', price: 14000, badge: 'Best Seller', image: juicer,
    media: [{ type: 'image', src: juicer }, { type: 'image', src: flipper }],
    description: 'A powerful 6-blade USB rechargeable juicer that squeezes fresh juice in under 30 seconds.',
    details: ['6 surgical steel blades', 'USB rechargeable (2hr = 15 uses)', 'Capacity: 380ml', 'Blends in < 30 seconds', 'BPA-free tritan material', 'Dishwasher safe (except motor)'], rating: 4.6, reviews: 98,
  },
]

const mockReviews = [
  { id: 1, name: 'Chidinma O.', rating: 5, date: 'March 2025',    text: 'Absolutely love this product! The quality exceeded my expectations. Will definitely be ordering again.' },
  { id: 2, name: 'Fatima A.',   rating: 4, date: 'February 2025', text: 'Really good quality for the price. Delivery was fast and the packaging was beautiful.' },
  { id: 3, name: 'Blessing E.', rating: 5, date: 'February 2025', text: 'I bought this as a gift and she was so happy! Soft Lifee never disappoints.' },
  { id: 4, name: 'Amaka N.',    rating: 4, date: 'January 2025',  text: 'Great product, looks exactly like the photos. Very happy with my purchase.' },
]

const DELIVERY_INFO = [
  { icon: <FiTruck size={16}/>,     title: 'Nationwide Delivery', desc: 'Lagos: 1–2 days · Other states: 3–5 days' },
  { icon: <FiRefreshCw size={16}/>, title: '7-Day Returns',       desc: 'Easy hassle-free returns within 7 days'   },
  { icon: <FiShield size={16}/>,    title: '100% Authentic',      desc: 'Every product is vetted before listing'   },
  { icon: <FiPackage size={16}/>,   title: 'Secure Packaging',    desc: 'Orders packed carefully to arrive intact' },
]

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <FiStar key={i} size={size} style={{ fill: i <= Math.round(rating) ? '#D4AF37' : 'none', color: '#D4AF37', opacity: i <= Math.round(rating) ? 1 : 0.3 }} />
      ))}
    </div>
  )
}

function AccordionItem({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid rgba(138,79,177,0.1)' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A1A2E', transition: 'color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#1A1A2E' }}>
        {title}
        {open ? <FiChevronUp size={16} color="#8A4FB1"/> : <FiChevronDown size={16} color="#8A4FB1"/>}
      </button>
      {open && <div style={{ paddingBottom: '1.2rem' }}>{children}</div>}
    </div>
  )
}

// ── Video player thumbnail ────────────────────────────────────────────────────
function VideoThumb({ src, poster, isActive, onClick }: { src: string; poster?: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${isActive ? '#8A4FB1' : 'transparent'}`, padding: 0, cursor: 'pointer', background: '#1A1A2E', flexShrink: 0, position: 'relative', transition: 'border-color 0.2s' }}>
      {poster && <img src={poster} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiPlay size={10} color="#1A1A2E" style={{ marginLeft: '2px' }} />
        </div>
      </div>
    </button>
  )
}

export default function ProductDetailPage() {
  const { slug }    = useParams<{ slug: string }>()
  const navigate    = useNavigate()
  const { addItem } = useCart()
  const videoRef    = useRef<HTMLVideoElement>(null)

  const product = allProducts.find(p => p.slug === slug)

  const [activeIdx,   setActiveIdx]   = useState(0)
  const [qty,         setQty]         = useState(1)
  const [wishlisted,  setWishlisted]  = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [imgZoom,     setImgZoom]     = useState(false)
  const [activeColor, setActiveColor] = useState(0)

  useEffect(() => { setActiveIdx(0); setQty(1); setAddedToCart(false); setActiveColor(0) }, [slug])

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', color: '#8A4FB1' }}>Product not found</p>
        <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '8px' }}>Back to Shop</Link>
      </div>
    )
  }

  // When a color is selected, update the main image too
  const effectiveMedia: MediaItem[] = product.colors
    ? [
        { type: 'image', src: product.colors[activeColor].image },
        ...(product.colors[activeColor].extraImages?.map(src => ({ type: 'image' as const, src })) ?? []),
        ...product.media.filter(m => m.type === 'video'),
      ]
    : product.media

  const activeItem = effectiveMedia[activeIdx] ?? effectiveMedia[0]
  const isVideo    = activeItem?.type === 'video'

  const related = allProducts.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4)
  const avgRating = mockReviews.reduce((s, r) => s + r.rating, 0) / mockReviews.length

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, category: product.category })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleBuyNow = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, category: product.category })
    navigate('/checkout')
  }

  const shareWhatsApp  = () => { const url = encodeURIComponent(window.location.href); window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} on Soft Lifee! ${formatPrice(product.price)} `)}${url}`, '_blank') }
  const shareInstagram = () => window.open('https://instagram.com/softlifeebybecky', '_blank')

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ padding: '1rem clamp(1.5rem,6vw,5rem)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Shop', '/shop'], [product.category, `/shop/${product.category.toLowerCase().replace(/[^a-z]/g, '-')}`], [product.name, '#']].map(([label, path], i, arr) => (
            <div key={String(i)} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i < arr.length - 1
                ? <Link to={path} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(26,26,46,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(26,26,46,0.45)' }}>{label}</Link>
                : <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#8A4FB1' }}>{label}</span>
              }
              {i < arr.length - 1 && <span style={{ color: 'rgba(26,26,46,0.25)', fontSize: '0.7rem' }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* ── SPLIT LAYOUT ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem,6vw,5rem) 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>

        {/* ── LEFT — Gallery (sticky) ── */}
        <div style={{ position: 'sticky', top: '88px' }}>

          {/* Main media — image or video */}
          <div style={{ position: 'relative', background: '#F0E8FA', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', marginBottom: '1rem', cursor: isVideo ? 'default' : 'zoom-in' }}
            onClick={() => { if (!isVideo) setImgZoom(true) }}>

            {isVideo ? (
              <video
                ref={videoRef}
                src={(activeItem as { type: 'video'; src: string }).src}
                poster={(activeItem as { type: 'video'; src: string; poster?: string }).poster}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <>
                <img
                  src={(activeItem as { type: 'image'; src: string }).src}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(26,26,46,0.5)', backdropFilter: 'blur(4px)', borderRadius: '6px', padding: '5px 8px' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 600, color: '#FFF', letterSpacing: '0.1em' }}>CLICK TO ZOOM</span>
                </div>
              </>
            )}

            {/* Badge */}
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: product.badge === 'New' ? '#D4AF37' : product.badge === 'Best Seller' ? '#8A4FB1' : product.badge === 'Premium' ? '#D4AF37' : '#1A1A2E', color: (product.badge === 'New' || product.badge === 'Premium') ? '#1A1A2E' : '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px' }}>
              {product.badge}
            </div>
          </div>

          {/* Thumbnails strip */}
          {effectiveMedia.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {effectiveMedia.map((item, i) =>
                item.type === 'video' ? (
                  <VideoThumb key={i} src={item.src} poster={item.poster} isActive={activeIdx === i} onClick={() => setActiveIdx(i)} />
                ) : (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${activeIdx === i ? '#8A4FB1' : 'transparent'}`, padding: 0, cursor: 'pointer', background: '#F0E8FA', transition: 'border-color 0.2s', flexShrink: 0 }}>
                    <img src={item.src} alt={`View ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                )
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT — Details ── */}
        <div>
          {/* Category + Rating */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <Link to={`/shop/${product.category.toLowerCase().replace(/[^a-z]/g, '-')}`}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>
              {product.category}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarRating rating={product.rating} />
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#1A1A2E' }}>{product.rating}</span>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>({product.reviews} reviews)</span>
            </div>
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.15, margin: '0 0 1rem 0' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.price)}</span>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#16A34A', background: '#F0FDF4', padding: '3px 10px', borderRadius: '100px' }}>In Stock</span>
          </div>

          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, marginBottom: '2rem', borderLeft: '3px solid #E8D5F5', paddingLeft: '1rem' }}>
            {product.description}
          </p>

          {/* ── COLOR SWATCHES ── */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E' }}>Colour</label>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#8A4FB1' }}>
                  — {product.colors[activeColor].label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.colors.map((color, i) => (
                  <button key={i} onClick={() => { setActiveColor(i); setActiveIdx(0) }}
                    title={color.label}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: color.hex,
                      border: `3px solid ${activeColor === i ? '#8A4FB1' : 'transparent'}`,
                      outline: `2px solid ${activeColor === i ? '#8A4FB1' : 'rgba(138,79,177,0.15)'}`,
                      outlineOffset: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      transform: activeColor === i ? 'scale(1.15)' : 'scale(1)',
                      boxShadow: activeColor === i ? '0 0 0 2px #FAF7FF' : 'none',
                    }}
                  />
                ))}
              </div>
              {/* Color label chips */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
                {product.colors.map((color, i) => (
                  <button key={i} onClick={() => { setActiveColor(i); setActiveIdx(0) }}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', border: `1px solid ${activeColor === i ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: activeColor === i ? '#F3E8FF' : 'transparent', color: activeColor === i ? '#8A4FB1' : 'rgba(26,26,46,0.5)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── QUANTITY ── */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '0.75rem' }}>Quantity</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ width: '44px', height: '44px', background: '#F3E8FF', border: 'none', borderRadius: '8px 0 0 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A4FB1', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8D5F5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F3E8FF' }}>
                <FiMinus size={16}/>
              </button>
              <div style={{ width: '60px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAF7FF', border: '1px solid rgba(138,79,177,0.2)', borderLeft: 'none', borderRight: 'none', fontFamily: '"Jost", sans-serif', fontSize: '1rem', fontWeight: 700, color: '#1A1A2E' }}>
                {qty}
              </div>
              <button onClick={() => setQty(q => q + 1)}
                style={{ width: '44px', height: '44px', background: '#F3E8FF', border: 'none', borderRadius: '0 8px 8px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A4FB1', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8D5F5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F3E8FF' }}>
                <FiPlus size={16}/>
              </button>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6', marginLeft: '1rem' }}>
                Total: <strong style={{ color: '#8A4FB1' }}>{formatPrice(product.price * qty)}</strong>
              </span>
            </div>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart}
              style={{ flex: 1, minWidth: '160px', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: addedToCart ? '#16A34A' : '#8A4FB1', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseEnter={e => { if (!addedToCart) e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { if (!addedToCart) e.currentTarget.style.background = '#8A4FB1' }}>
              {addedToCart ? <><FiCheck size={16}/> Added!</> : <><FiShoppingBag size={16}/> Add to Cart</>}
            </button>
            <button onClick={handleBuyNow}
              style={{ flex: 1, minWidth: '160px', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c49d2e' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37' }}>
              <FiZap size={16}/> Buy Now
            </button>
          </div>

          {/* ── WISHLIST + SHARE ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => setWishlisted(w => !w)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: wishlisted ? '#BE123C' : '#5B21B6', background: wishlisted ? '#FFF1F2' : '#F3E8FF', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.25s' }}>
              <FiHeart size={14} style={{ fill: wishlisted ? '#BE123C' : 'none' }}/>
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Share</span>
              <button onClick={shareWhatsApp}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25D366', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                <FaWhatsapp size={16}/>
              </button>
              <button onClick={shareInstagram}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', transition: 'opacity 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
                <FiInstagram size={15}/>
              </button>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)}
                style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F3E8FF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A4FB1', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#E8D5F5' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F3E8FF' }}>
                <FiShare2 size={14}/>
              </button>
            </div>
          </div>

          {/* ── DELIVERY INFO ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
            {DELIVERY_INFO.map(info => (
              <div key={info.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '0.9rem', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '10px' }}>
                <div style={{ color: '#8A4FB1', flexShrink: 0, marginTop: '1px' }}>{info.icon}</div>
                <div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#1A1A2E', marginBottom: '2px' }}>{info.title}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.5 }}>{info.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── ACCORDIONS ── */}
          <div style={{ borderTop: '1px solid rgba(138,79,177,0.1)' }}>
            <AccordionItem title="Product Description" defaultOpen>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85 }}>{product.description}</p>
            </AccordionItem>
            <AccordionItem title="Product Details">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {product.details.map((d, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <FiCheck size={14} color="#8A4FB1" style={{ flexShrink: 0, marginTop: '2px' }}/>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.6 }}>{d}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Delivery & Returns">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { title: 'Lagos Delivery',      desc: '1–2 business days · ₦1,500'                                            },
                  { title: 'Nationwide Delivery',  desc: '3–5 business days · ₦2,500–₦3,500'                                    },
                  { title: 'Free Delivery',        desc: 'On all orders above ₦50,000'                                           },
                  { title: 'Returns Policy',       desc: 'Items can be returned within 7 days if unused and in original packaging.' },
                ].map(item => (
                  <div key={item.title}>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '2px' }}>{item.title}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: '#5B21B6' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </AccordionItem>
          </div>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section style={{ padding: '4rem clamp(1.5rem,6vw,5rem)', background: '#FFFFFF', borderTop: '1px solid rgba(138,79,177,0.08)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.4rem' }}>What customers say</p>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Reviews</h2>
            </div>
            <div style={{ background: '#FAF7FF', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', textAlign: 'center' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>{avgRating.toFixed(1)}</p>
              <StarRating rating={avgRating} size={16}/>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', color: '#5B21B6', marginTop: '4px' }}>{mockReviews.length} reviews</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.2rem' }}>
            {mockReviews.map(review => (
              <div key={review.id} style={{ background: '#FAF7FF', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#8A4FB1,#5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', fontWeight: 600, color: '#FFF' }}>{review.name[0]}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A2E' }}>{review.name}</p>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 300, color: '#5B21B6' }}>{review.date}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#D4AF3720', padding: '3px 8px', borderRadius: '100px' }}>
                    <FiStar size={11} style={{ fill: '#D4AF37', color: '#D4AF37' }}/>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#1A1A2E' }}>{review.rating}.0</span>
                  </div>
                </div>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.75 }}>"{review.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.85rem' }}>
                  <FiCheck size={11} color="#16A34A"/>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#16A34A' }}>Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href={`https://wa.me/2348000000000?text=Hi! I'd like to leave a review for ${product.name}`} target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#25D366', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '8px', transition: 'opacity 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
              <FaWhatsapp size={16}/> Leave a Review on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section style={{ padding: '4rem clamp(1.5rem,6vw,5rem)', background: '#FAF7FF' }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.4rem' }}>You may also like</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, color: '#1A1A2E', margin: '0 0 2rem' }}>Related Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1.5rem' }}>
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#8A4FB1'; el.style.boxShadow = '0 8px 32px rgba(138,79,177,0.12)'; el.style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(138,79,177,0.1)'; el.style.boxShadow = 'none'; el.style.transform = 'none' }}>
                    <div style={{ height: '220px', overflow: 'hidden', background: '#F0E8FA' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}/>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '4px' }}>{p.category}</p>
                      <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', lineHeight: 1.2 }}>{p.name}</p>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(p.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ── */}
      {imgZoom && !isVideo && (
        <div onClick={() => setImgZoom(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,46,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '2rem' }}>
          <img src={(activeItem as { type: 'image'; src: string }).src} alt={product.name}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px' }}/>
          <button onClick={() => setImgZoom(false)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontSize: '1rem' }}>
            ✕
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="position: sticky"] { position: relative !important; top: auto !important; }
        }
      `}</style>
    </div>
  )
}
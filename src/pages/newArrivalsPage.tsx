import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
import rotatinglight from '../assets/Rechargeable Rotation Moonlight light.jpg'
import storagebasket from '../assets/storage basket.jpeg'
import pimplepatches from '../assets/pimple patches.jpg'
import laptopstand from '../assets/laptop stand.jpg'
import toiletrack from '../assets/over-the-toilet organizer rack.jpg'
import phonesuction from '../assets/phone suction.jpg'
import rgbled from '../assets/phone led light.jpg'
import tripod from '../assets/tripod stand.jpg'
import ledlamp from '../assets/diamond led lamp.jpg'
import handcream from '../assets/hand cream.jpg'
import towelrack from '../assets/towel organizer.jpg'
import jewelrybox from '../assets/jewellery box.jpg'
import mosquitobat from '../assets/mosquito bat.jpg'
import underwear from '../assets/underwear organizer.jpg'
import shoewipe from '../assets/shoe wipe.jpg'
import waterbottle from '../assets/happy supply chain.jpg'
import wallstickers from '../assets/wall sticker.jpg'
import bubblegun from '../assets/bubble gun.jpg'
import usblighter from '../assets/usb cigarettes.jpg'
import nanotape from '../assets/nano tape.jpg'
import goldtape from '../assets/gold decor tape.jpg'
import vineleaf from '../assets/vine leaf.jpg'
import wallhook from '../assets/wall hooks.jpg'
import barbiepen from '../assets/barbie pen.jpeg'
import trashcan from '../assets/kitchen trash can.jpg'
import booblifter from '../assets/boops lifter.jpeg'
import series8 from '../assets/smart watch series 8.jpg'
import facetowel from '../assets/face towel.jpg'
import facemask from '../assets/face mask.jpeg'
import tonguescrubber from '../assets/tonuge scraper.jpg'
import stanley from '../assets/stanley cup.jpeg'
import counterfilm from '../assets/counter film.jpeg'
import fan from '../assets/Fan.jpg'
import flipper from '../assets/cooking fliper.jpg'
import filllight from '../assets/led light.jpeg'
import bathroom from '../assets/bathroom set.jpeg'
import juicer from '../assets/blender.jpeg'
import sensorlight from '../assets/solar light.jpg'
import { FaArrowDown } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import { useCart } from '../store/cartStore'

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

// ── IMPORTANT: addedDate is the real date this product was added ───────────────
// Format: 'YYYY-MM-DD' — products auto-expire after 3 weeks (21 days)
// When you add a new product, set its addedDate to today's date
// When enough new products are added, oldest ones drop off automatically
const allProducts = [
  { id: 1,  name: 'Diffuser',              category: 'Home Essentials', subcategory: 'smart-gadgets', price: 15000, badge: 'Best Seller', image: diffuser,          slug: 'diffuser',               addedDate: '2025-04-27' },
  { id: 2,  name: 'Green Stick Mask',      category: 'Skincare',        subcategory: 'face',          price: 5000,  badge: 'Top Rated',   image: mask,              slug: 'green-stick-mask',       addedDate: '2025-04-04' },
  { id: 3,  name: 'Tote Bag',              category: 'Accessories',     subcategory: 'bags',          price: 8500,  badge: 'New',         image: totebag,           slug: 'tote-bag',               addedDate: '2026-04-07' },
  { id: 4,  name: '3D Sand Drop',          category: 'Home Essentials', subcategory: 'smart-gadgets', price: 10000, badge: 'Trending',    image: sanddrop,          slug: '3D-sand-drop',           addedDate: '2025-04-10' },
  { id: 5,  name: 'Bathroom Organizer',    category: 'Home Essentials', subcategory: 'bathroom',      price: 15000, badge: 'Best Seller',  image: bathroomOrganizer, slug: 'bathroom-organizer',     addedDate: '2025-04-05' },
  { id: 6,  name: 'Smart-Watch Set',       category: 'Accessories',     subcategory: 'jewelry',       price: 40000, badge: 'Premium',     image: smartwatch,        slug: 'smart-watch-set',        addedDate: '2025-04-01' },
  { id: 7,  name: 'Matte Stanley Tumbler', category: 'Accessories',     subcategory: 'drinkware',     price: 18000, badge: 'New',         image: tumbler,           slug: 'matte-stanley-tumbler',  addedDate: '2026-04-08' },
  { id: 8,  name: 'Flower Vase',           category: 'Home Essentials', subcategory: 'kitchen',       price: 12000, badge: 'New',         image: flowervase,        slug: 'flower-vase',            addedDate: '2026-04-09' },
  { id: 9,  name: 'Ceramic Cup Set',       category: 'Home Essentials', subcategory: 'kitchen',       price: 22000, badge: 'New',         image: ceramiccupset,     slug: 'ceramic-cup-set',        addedDate: '2026-04-10' },
  { id: 10, name: 'Travel Box',            category: 'Skincare',        subcategory: 'travel-kits',   price: 9500,  badge: 'New',         image: travelbox,         slug: 'travel-box',             addedDate: '2026-04-10' },
  { id: 11, name: 'Star Pimple Patches',   category: 'Skincare',        subcategory: 'face',          price: 1300,  badge: 'Trending',    image: pimplepatches,     slug: 'star-pimple-patches',    addedDate: '2025-04-20' },
  { id: 12, name: 'Laptop Stand',          category: 'Accessories',     subcategory: 'smart-gadgets', price: 8000,  badge: 'Trending',    image: laptopstand,       slug: 'laptop-stand',           addedDate: '2025-04-15' },
  { id: 13, name: 'Travel Kit',            category: 'Skincare',        subcategory: 'travel-kits',   price: 14500, badge: 'Best Seller',  image: travelkit,        slug: 'travel-kit',             addedDate: '2025-04-08' },
  { id: 14, name: 'Stanley Cup Accessories', category: 'Accessories',   subcategory: 'drinkware',     price: 25000, badge: 'Trending',    image: stanleycup,        slug: 'stanley-cup-accessories', addedDate: '2025-04-24' },
  { id: 15, name: 'Storage Basket',        category: 'Home Essentials', subcategory: 'kitchen',       price: 7500,  badge: 'New',         image: storagebasket,     slug: 'storage-basket',         addedDate: '2026-04-12' },
  { id: 16, name: 'Moonlight Lamp',        category: 'Home Essentials', subcategory: 'lighting',      price: 14500, badge: 'New',         image: rotatinglight,     slug: 'moonlight-lamp',         addedDate: '2026-04-25' },
  { id: 17, name: 'Relaxation Chair',      category: 'Home Essentials', subcategory: 'personal-care', price: 85000, badge: 'Premium',     image: relaxationchair,   slug: 'relaxation-chair',       addedDate: '2025-04-01' },
  { id: 18, name: 'Boob Tape',             category: "Personal Essentials", subcategory: 'personal-care', price: 3500, badge: 'Best Seller', image: booptape,       slug: 'boob-tape',              addedDate: '2025-04-20' },
  { id: 19, name: 'Over-The-Toilet Organizer Rack', category: 'Home Essentials', subcategory: 'bathroom', price: 15000, badge: 'New',   image: toiletrack,        slug: 'over-the-toilet-organizer-rack', addedDate: '2026-04-14' },
  { id: 20, name: 'Phone Suction Cup',     category: 'Accessories',     subcategory: 'smart-gadgets', price: 1000,  badge: 'New',         image: phonesuction,      slug: 'phone-suction-cup',      addedDate: '2026-04-14' },
  { id: 21, name: 'RGB Phone LED Light',   category: 'Accessories',     subcategory: 'smart-gadgets', price: 8000,  badge: 'New',         image: rgbled,            slug: 'rgb-phone-led-light',    addedDate: '2026-04-15' },
  { id: 22, name: 'Wireless Fill Light BT Remote Tripod', category: 'Accessories', subcategory: 'smart-gadgets', price: 12000, badge: 'New', image: tripod, slug: 'wireless-fill-light-bt-remote-tripod', addedDate: '2026-04-15' },
  { id: 23, name: 'Crystal Diamond LED Lamp', category: 'Home Essentials', subcategory: 'lighting',  price: 13000, badge: 'New',         image: ledlamp,           slug: 'crystal-diamond-led-lamp', addedDate: '2026-04-16' },
  { id: 24, name: 'Floral & Fruit Fragrance Hand Cream', category: 'Skincare', subcategory: 'body',  price: 700,   badge: 'New',         image: handcream,         slug: 'floral-fruit-fragrance-hand-cream', addedDate: '2026-04-16' },
  { id: 25, name: 'Multifunctional Towel Organizer', category: 'Home Essentials', subcategory: 'bathroom', price: 12000, badge: 'New',   image: towelrack,         slug: 'multifunctional-towel-organizer', addedDate: '2026-04-17' },
  { id: 26, name: '3 Layers Jewelry Box With Key', category: 'Home Essentials', subcategory: 'organizers', price: 32000, badge: 'New',  image: jewelrybox,        slug: '3-layers-jewelry-box-with-key', addedDate: '2026-04-17' },
  { id: 27, name: 'Foldable Swivel Mosquito Bat', category: 'Home Essentials', subcategory: 'smart-gadgets', price: 15000, badge: 'New', image: mosquitobat, slug: 'foldable-swivel-mosquito-bat', addedDate: '2026-04-18' },
  { id: 28, name: 'Underwear Organizer',   category: 'Home Essentials', subcategory: 'organizers',    price: 4000,  badge: 'New',         image: underwear,         slug: 'underwear-organizer',    addedDate: '2026-04-18' },
  { id: 29, name: 'Quick Shoe Wipe',       category: 'Home Essentials', subcategory: 'personal-care', price: 5000,  badge: 'New',         image: shoewipe,          slug: 'quick-shoe-wipe',        addedDate: '2026-04-19' },
  { id: 30, name: 'Happy Supply Chain Water Bottle', category: 'Accessories', subcategory: 'drinkware', price: 7000, badge: 'New',       image: waterbottle,       slug: 'happy-supply-chain-water-bottle', addedDate: '2026-04-19' },
  { id: 31, name: 'Inspirational Wall Stickers', category: 'Home Essentials', subcategory: 'decor',  price: 9000,  badge: 'New',         image: wallstickers,      slug: 'inspirational-wall-stickers', addedDate: '2026-04-20' },
  { id: 32, name: 'Bubble Gun',            category: 'Accessories',     subcategory: 'smart-gadgets', price: 10000, badge: 'New',         image: bubblegun,         slug: 'bubble-gun',             addedDate: '2026-04-20' },
  { id: 33, name: 'USB Cigarette Lighter Mobile Phone Holder', category: 'Accessories', subcategory: 'smart-gadgets', price: 10000, badge: 'New', image: usblighter, slug: 'usb-cigarettes-lighter-mobile-phone-holder', addedDate: '2026-04-21' },
  { id: 34, name: 'Double Sided Nano Tape', category: 'Home Essentials', subcategory: 'organizers',  price: 6000,  badge: 'New',         image: nanotape,          slug: 'double-sided-nano-tape', addedDate: '2026-04-21' },
  { id: 35, name: 'Gold Decor Tape',       category: 'Home Essentials', subcategory: 'decor',        price: 5000,  badge: 'New',         image: goldtape,          slug: 'gold-decor-tape',        addedDate: '2026-04-22' },
  { id: 36, name: 'Vine Leaf Room Decor',  category: 'Home Essentials', subcategory: 'decor',        price: 1800,  badge: 'New',         image: vineleaf,          slug: 'vine-leaf-room-decor',   addedDate: '2026-04-22' },
  { id: 37, name: 'Decorative Wall Hooks', category: 'Home Essentials', subcategory: 'decor',        price: 1500,  badge: 'New',         image: wallhook,          slug: 'decorative-wall-hooks',  addedDate: '2026-04-23' },
  { id: 38, name: 'Fancy Barbie Pen',      category: 'Accessories',     subcategory: 'accessories',  price: 2000,  badge: 'New',         image: barbiepen,         slug: 'fancy-barbie-pen',       addedDate: '2026-04-25' },
  { id: 39, name: 'Multifunctional Wall Mounted Trash Can', category: 'Home Essentials', subcategory: 'kitchen', price: 4500, badge: 'New', image: trashcan, slug: 'multifunctional-wall-mounted-trash-can', addedDate: '2026-04-24' },
  { id: 40, name: 'Transparent Boobs Lifter', category: "Personal Essentials", subcategory: 'personal-care', price: 4500, badge: 'New',  image: booblifter,        slug: 'transparent-boobs-lifter', addedDate: '2026-04-24' },
  { id: 41, name: 'Smart Watch (Series 8)', category: 'Accessories',    subcategory: 'jewelry',      price: 25000, badge: 'New',         image: series8,           slug: 'smart-watch-series-8',   addedDate: '2026-04-24' },
  { id: 42, name: 'Compressed Facial Towel', category: 'Skincare',      subcategory: 'face',         price: 200,   badge: 'New',         image: facetowel,         slug: 'compressed-facial-towel', addedDate: '2026-04-20' },
  { id: 43, name: 'SADOER Ampoules Facial Mask', category: 'Skincare',  subcategory: 'face',         price: 800,   badge: 'New',         image: facemask,          slug: 'sadoer-ampoules-facial-mask', addedDate: '2026-04-25' },
  { id: 44, name: 'Tongue Scrubber',       category: 'Skincare',        subcategory: 'face',         price: 1000,  badge: 'New',         image: tonguescrubber,    slug: 'tongue-scrubber',        addedDate: '2026-04-02' },
  { id: 45, name: 'Stanley Cup',           category: 'Accessories',     subcategory: 'drinkware',    price: 17000, badge: 'Best Seller',  image: stanley,          slug: 'stanley-cup',            addedDate: '2026-04-05' },
  { id: 46, name: 'Self-adhesive Countertop Film', category: 'Home Essentials', subcategory: 'decor', price: 8000, badge: 'Best Seller', image: counterfilm, slug: 'self-adhesive-countertop-film', addedDate: '2026-04-05' },
  { id: 47, name: 'AC Cooling Humidifier Fan', category: 'Home Essentials', subcategory: 'smart-gadgets', price: 25000, badge: 'Best Seller', image: fan, slug: 'ac-cooling-humidifier-fan', addedDate: '2026-04-05' },
  { id: 48, name: 'Cooking Flipper',       category: 'Home Essentials', subcategory: 'kitchen',      price: 5000,  badge: 'Best Seller',  image: flipper,          slug: 'cooking-flipper',        addedDate: '2026-04-06' },
  { id: 49, name: 'E-30 Camera Fill Light', category: 'Home Essentials', subcategory: 'smart-gadgets', price: 32000, badge: 'Best Seller', image: filllight, slug: 'e-30-camera-fill-light', addedDate: '2026-04-06' },
  { id: 50, name: '5 IN 1 Multipurpose Organizer', category: 'Home Essentials', subcategory: 'bathroom', price: 20000, badge: 'Best Seller', image: bathroom, slug: '5in1-multipurpose-organizer', addedDate: '2026-04-06' },
  { id: 51, name: 'Ultra-Portable Multi-Functional Juicer Cup', category: 'Home Essentials', subcategory: 'kitchen', price: 14000, badge: 'Best Seller', image: juicer, slug: 'ultra-portable-multi-functional-juicer-cup', addedDate: '2026-04-06' },
  { id: 52, name: '360 Motion Sensor Light', category: 'Home Essentials', subcategory: 'lighting',   price: 13000, badge: 'Best Seller',  image: sensorlight,      slug: '360-motion-sensor-light', addedDate: '2026-04-06' },
]

// ── AUTO-EXPIRY LOGIC ─────────────────────────────────────────────────────────
// Only shows badge:'New' products added within the last 21 days
// When you connect to Django API, replace this with: badge='New' + added_date filter
const THREE_WEEKS_MS = 21 * 24 * 60 * 60 * 1000

function isStillNew(addedDate: string): boolean {
  const added = new Date(addedDate).getTime()
  const now   = Date.now()
  return (now - added) <= THREE_WEEKS_MS
}

// ── Exported helpers for HomePage auto-update ────────────────────────────────
export const getNewArrivals = (count = 4) =>
  allProducts
    .filter(p => p.badge === 'New' && isStillNew(p.addedDate))
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())
    .slice(0, count)

export { allProducts }

// ── Internal: all valid new arrivals ────────────────────────────────────────
const newArrivals = allProducts
  .filter(p => p.badge === 'New' && isStillNew(p.addedDate))
  .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime())

// ── Days remaining on a product ──────────────────────────────────────────────
function daysLeft(addedDate: string): number {
  const expires = new Date(addedDate).getTime() + THREE_WEEKS_MS
  return Math.max(0, Math.ceil((expires - Date.now()) / 86400000))
}

const badgeColors: Record<string, string> = {
  'Home Essentials': '#5B21B6', 'Skincare': '#8A4FB1',
  'Accessories': '#1A1A2E', "Personal Essentials": '#C4A8D4', "Personal Essentials": '#C4A8D4',
}

// ── Countdown timer ───────────────────────────────────────────────────────────
function useCountdown() {
  const getNext = () => {
    const now  = new Date()
    const next = new Date(now)
    next.setDate(now.getDate() + (7 - now.getDay()))
    next.setHours(0, 0, 0, 0)
    return next.getTime() - now.getTime()
  }
  const [ms, setMs] = useState(getNext())
  useEffect(() => { const t = setInterval(() => setMs(getNext()), 1000); return () => clearInterval(t) }, [])
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return { d, h, m, s }
}

// ── Reveal on scroll ─────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product, delay = 0, rank }: { product: typeof allProducts[0]; delay?: number; rank?: number }) {
  const [hovered, setHovered]       = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [adding, setAdding]         = useState(false)
  const { ref, visible }            = useInView()
  const left                        = daysLeft(product.addedDate)
  const { addItem }                 = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug, category: product.category })
    setAdding(true)
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(36px)', transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}s` }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: 'pointer' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#F0E8FA', aspectRatio: '3/4', marginBottom: '0.9rem', borderRadius: '6px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.07)' : 'scale(1)' }} />

          {/* Rank badge top-left */}
          {rank && rank <= 3 && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: rank === 1 ? '#D4AF37' : rank === 2 ? '#C0C0C0' : '#CD7F32', color: rank === 1 ? '#1A1A2E' : '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.12em', padding: '4px 9px', borderRadius: '100px' }}>
              #{rank} NEW
            </div>
          )}

          {/* Days left chip top-right */}
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: left <= 3 ? '#EF4444' : left <= 7 ? '#F97316' : 'rgba(26,26,46,0.75)', backdropFilter: 'blur(4px)', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.1em', padding: '4px 9px', borderRadius: '100px' }}>
            {left}d left
          </div>

          {/* Wishlist */}
          <button onClick={e => { e.preventDefault(); setWishlisted(w => !w) }}
            style={{ position: 'absolute', bottom: '60px', right: '10px', background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? '#8A4FB1' : 'none'} stroke={wishlisted ? '#8A4FB1' : '#1A1A2E'} strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          {/* Add to cart */}
          <div onClick={handleAdd} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: adding ? 'rgba(22,163,74,0.92)' : 'rgba(26,26,46,0.93)', backdropFilter: 'blur(4px)', padding: '0.8rem', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FFF' }}>{adding ? '✓ Added!' : 'Add to Cart'}</span>
          </div>
        </div>

        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: badgeColors[product.category] || '#8A4FB1' }}>{product.category}</p>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.1em', background: 'rgba(212,175,55,0.1)', padding: '2px 7px', borderRadius: '100px' }}>NEW IN</span>
          </div>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', lineHeight: 1.2 }}>{product.name}</p>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.price)}</p>
        </Link>
      </div>
    </div>
  )
}

// ── Countdown box ─────────────────────────────────────────────────────────────
function CountBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '64px' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.8rem 1rem', marginBottom: '5px' }}>
        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1, display: 'block' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
    </div>
  )
}

// ── Marquee strip ─────────────────────────────────────────────────────────────
function MarqueeStrip() {
  const items = ['New This Week', 'Just Dropped', 'Fresh In', 'Limited Time', 'Shop Now', 'Newly Added']
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', background: '#D4AF37', padding: '0.7rem 0' }}>
      <div style={{ display: 'inline-block', animation: 'na-marquee 20s linear infinite' }}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#1A1A2E', margin: '0 2rem' }}>
            {item} <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Featured hero card ────────────────────────────────────────────────────────
function FeaturedCard({ product }: { product: typeof allProducts[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={`/product/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '8px', height: '100%', minHeight: '500px', background: '#1A1A2E' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0.75 : 0.65, transition: 'transform 0.7s ease, opacity 0.4s', transform: hovered ? 'scale(1.05)' : 'scale(1)', position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.2) 60%)' }} />
      <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#D4AF37', color: '#1A1A2E', fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.15em', padding: '5px 12px', borderRadius: '100px' }}>
        #1 NEWEST DROP
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AF37', marginBottom: '6px' }}>{product.category}</p>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2 }}>{product.name}</p>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#D4AF37', marginBottom: '1.2rem' }}>{formatPrice(product.price)}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '100px', padding: '6px 16px', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.35s' }}>
          <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF' }}>View Product</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      </div>
    </Link>
  )
}


// ── Spotlight Card — big image card for secondary drops ───────────────────────
function SpotlightCard({ product, rank, left }: { product: typeof allProducts[0]; rank: number; left: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link to={`/product/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', borderRadius: '12px', background: '#F0E8FA' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.75) 0%, transparent 55%)' }} />
        {/* Rank badge */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', background: rank === 2 ? '#D4AF37' : rank === 3 ? '#C0C0C0' : '#CD7F32', color: '#1A1A2E', fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.15em', padding: '5px 12px', borderRadius: '100px' }}>
          #{rank} NEW
        </div>
        {/* Days left */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', background: left <= 3 ? '#EF4444' : left <= 7 ? '#F97316' : 'rgba(26,26,46,0.7)', backdropFilter: 'blur(6px)', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.1em', padding: '5px 11px', borderRadius: '100px' }}>
          {left}d left
        </div>
        {/* Bottom overlay text */}
        <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.2rem', right: '1.2rem' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}>{product.category}</p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.2, marginBottom: '4px' }}>{product.name}</p>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#D4AF37' }}>{formatPrice(product.price)}</p>
        </div>
      </div>
      {/* Bottom CTA */}
      <div style={{ padding: '1rem 1.2rem', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1' }}>View Product</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: hovered ? '#8A4FB1' : '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hovered ? 'white' : '#8A4FB1'} strokeWidth="2.5">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>
    </Link>
  )
}

// ── NEW ARRIVALS PAGE ─────────────────────────────────────────────────────────
export default function NewArrivalsPage() {
  const { d, h, m, s } = useCountdown()
  const [activeFilter, setActiveFilter] = useState('All')
  const filters = ['All', 'Home Essentials', 'Skincare', 'Accessories', "Personal Essentials"]

  const filtered = activeFilter === 'All'
    ? newArrivals
    : newArrivals.filter(p => p.category === activeFilter)

  const featured  = newArrivals[0]
  const secondary = newArrivals.slice(1, 4)

  if (newArrivals.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #FAF7FF, #F3E8FF)', padding: '4rem 2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '3rem', fontStyle: 'italic', color: '#8A4FB1', marginBottom: '1rem' }}>Coming Soon</p>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', color: '#5B21B6', marginBottom: '2rem' }}>New arrivals are on their way. Check back soon!</p>
        <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '2px' }}>
          Shop All Products
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 50%, #FAF7FF 100%)', minHeight: '100vh' }}>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <div style={{ position: 'relative', background: '#1A1A2E', padding: 'clamp(1.5rem,5vw,4rem) clamp(1.5rem,6vw,5rem)', paddingTop: 'clamp(5rem,10vw,8rem)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', minHeight: '600px', alignItems: 'center' }}>
        {/* BG decoration */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(138,79,177,0.25) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        {/* Left text */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.35)', borderRadius: '100px', padding: '5px 14px', marginBottom: '1.5rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', animation: 'na-pulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D4AF37' }}>Fresh Drop</span>
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3rem,5.5vw,5rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', lineHeight: 1.05, margin: '0 0 0.5rem 0' }}>
            New
          </h1>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(3rem,5.5vw,5rem)', fontWeight: 600, fontStyle: 'italic', color: '#D4AF37', lineHeight: 1.05, margin: '0 0 1.5rem 0' }}>
            Arrivals.
          </h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '380px' }}>
            Fresh pieces dropped weekly. Only products with the <strong style={{ color: '#D4AF37', fontWeight: 600 }}>New</strong> badge appear here — and they disappear after 3 weeks.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '2px', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#1A1A2E' }}>
              Shop All
            </Link>
            <a href="#arrivals" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: 'transparent', textDecoration: 'none', padding: '0.9rem 2rem', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '2px', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4AF37'; e.currentTarget.style.color = '#D4AF37' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#FFF' }}>
              Browse Drops <FaArrowDown />
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { value: `${newArrivals.length}`, label: 'New Products' },
              { value: 'Weekly', label: 'Drop Schedule' },
              { value: '21 Days', label: 'Stay Listed' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1, marginBottom: '2px' }}>{stat.value}</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: featured card */}
        {featured && (
          <div style={{ position: 'relative', zIndex: 2, height: '100%', minHeight: '480px' }}>
            <FeaturedCard product={featured} />
          </div>
        )}
      </div>

      {/* ── GOLD MARQUEE ─────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── COUNTDOWN STRIP ──────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #3B1058 0%, #5B21B6 50%, #8A4FB1 100%)', padding: '2.5rem clamp(1.5rem,6vw,5rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '6px' }}>Next Drop In</p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontStyle: 'italic', color: '#FFFFFF', margin: 0 }}>New products arrive every week</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <CountBox value={d} label="Days" />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountBox value={h} label="Hours" />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountBox value={m} label="Mins" />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '2rem', fontFamily: '"Cormorant Garamond", serif' }}>:</span>
          <CountBox value={s} label="Secs" />
        </div>
        <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '2px', whiteSpace: 'nowrap', transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FFF' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#D4AF37' }}>
          Don't Miss Out <FaArrowRight />
        </Link>
      </div>

      {/* ── SECONDARY SPOTLIGHT — big cards ─────────────────────── */}
      {secondary.length > 0 && (
        <section style={{ padding: '4rem clamp(1.5rem,6vw,5rem) 2rem', background: '#FAF7FF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '28px', height: '2px', background: '#D4AF37' }} />
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D4AF37' }}>Also Just Dropped</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {secondary.map((p, i) => (
              <SpotlightCard key={p.id} product={p} rank={i + 2} left={daysLeft(p.addedDate)} />
            ))}
          </div>
        </section>
      )}

      {/* ── ALL NEW ARRIVALS ─────────────────────────────────── */}
      <section id="arrivals" style={{ padding: '2rem clamp(1.5rem,6vw,5rem) 6rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.4rem' }}>All Drops</p>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 600, fontStyle: 'italic', color: '#1A1A2E', margin: 0 }}>
              Latest Additions — {filtered.length} products
            </h2>
          </div>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', borderBottom: '1px solid #8A4FB1', paddingBottom: '1px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>View All Products <FaArrowRight /></Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '2.5rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(138,79,177,0.12)', paddingBottom: '0' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.6rem 1.2rem', border: 'none', borderBottom: activeFilter === f ? '2px solid #8A4FB1' : '2px solid transparent', background: 'transparent', color: activeFilter === f ? '#8A4FB1' : 'rgba(26,26,46,0.45)', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '-1px' }}>
              {f}
              <span style={{ marginLeft: '5px', fontSize: '0.55rem', opacity: 0.7 }}>
                ({f === 'All' ? newArrivals.length : newArrivals.filter(p => p.category === f).length})
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: '#FFFFFF', borderRadius: '8px', border: '1px solid rgba(138,79,177,0.1)' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontStyle: 'italic', color: '#8A4FB1', marginBottom: '0.5rem' }}>No new arrivals in this category yet</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: '#5B21B6' }}>Check back soon — we drop new products every week!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem 1.5rem' }}>
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={Math.min(i * 0.04, 0.5)} rank={i + 1} />)}
          </div>
        )}
      </section>

      <style>{`
        @keyframes na-pulse   { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.85); } }
        @keyframes na-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
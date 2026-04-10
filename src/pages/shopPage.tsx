import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import microphone from '../assets/Wireless Bluetooth Microphone.jpg'
import handfan from '../assets/RGB rechargeable hand fan.jpg'
import nipplecover from '../assets/NIPPLE COVER.jpg'


const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

// ── Products — each has category + subcategory ────────────────────────────────
const allProducts = [
  { id: 1,  name: 'Diffuser',              category: 'Home Essentials', subcategory: 'smart-gadgets',       price: 15000, badge: 'Best Seller', image: diffuser,          slug: 'diffuser',               createdAt: 5  },
  { id: 2,  name: 'Green Stick Mask',      category: 'Skincare',        subcategory: 'face',          price: 5000,  badge: 'Top Rated',  image: mask,              slug: 'green-stick-mask',       createdAt: 8  },
  { id: 3,  name: 'Tote Bag',              category: 'Accessories',     subcategory: 'bags',          price: 8500,  badge: 'New',        image: totebag,           slug: 'tote-bag',               createdAt: 12 },
  { id: 4,  name: '3D Sand Drop',          category: 'Home Essentials', subcategory: 'smart-gadgets', price: 10000, badge: 'Trending',   image: sanddrop,          slug: '3D-sand-drop',           createdAt: 3  },
  { id: 5,  name: 'Bathroom Organizer',    category: 'Home Essentials', subcategory: 'bathroom',      price: 15000, badge: 'Best Seller', image: bathroomOrganizer, slug: 'bathroom-organizer',     createdAt: 6  },
  { id: 6,  name: 'Smart-Watch Set',       category: 'Accessories',     subcategory: 'jewelry',       price: 40000, badge: 'Premium',    image: smartwatch,        slug: 'smart-watch-set',        createdAt: 2  },
  { id: 7,  name: 'Matte Stanley Tumbler', category: 'Accessories',     subcategory: 'drinkware',     price: 18000, badge: 'New',        image: tumbler,           slug: 'matte-stanley-tumbler',  createdAt: 14 },
  { id: 8,  name: 'Flower Vase',           category: 'Home Essentials', subcategory: 'kitchen',       price: 12000, badge: 'New',        image: flowervase,        slug: 'flower-vase',            createdAt: 13 },
  { id: 9,  name: 'Ceramic Cup Set',       category: 'Home Essentials', subcategory: 'kitchen',       price: 22000, badge: 'New',        image: ceramiccupset,     slug: 'ceramic-cup-set',        createdAt: 11 },
  { id: 10, name: 'Travel Box',            category: 'Skincare',        subcategory: 'travel-kits',   price: 9500,  badge: 'New',        image: travelbox,         slug: 'travel-box',             createdAt: 10 },
  { id: 11, name: 'Star Pimple Patches',   category: 'Skincare',        subcategory: 'face',          price: 1300,  badge: 'Trending',   image: pimplepatches,     slug: 'star-pimple-patches',    createdAt: 9  },
  { id: 12, name: 'Laptop Stand',          category: 'Accessories',     subcategory: 'smart-gadgets', price: 8000,  badge: 'Trending',   image: laptopstand,       slug: 'laptop-stand',           createdAt: 7  },
  { id: 13, name: 'Travel Kit',            category: 'Skincare',        subcategory: 'travel-kits',   price: 14500, badge: 'Best Seller', image: travelkit,        slug: 'travel-kit',             createdAt: 4  },
  { id: 14, name: 'Stanley Cup Accessories',       category: 'Accessories',     subcategory: 'drinkware',     price: 25000, badge: 'Trending',   image: stanleycup,        slug: 'stanley-cup-accessories',        createdAt: 1  },
  { id: 15, name: 'Storage Basket',        category: 'Home Essentials', subcategory: 'kitchen',    price: 7500,  badge: 'New',        image: storagebasket,     slug: 'storage-basket',         createdAt: 15 },
  { id: 16, name: 'Moonlight Lamp',        category: 'Home Essentials', subcategory: 'lighting',      price: 14500, badge: 'New',        image: rotatinglight,     slug: 'moonlight-lamp',         createdAt: 16 },
  { id: 17, name: 'Relaxation Chair',      category: "Home Essentials", subcategory: 'personal-care', price: 85000, badge: 'Premium', image: relaxationchair,   slug: 'relaxation-chair',       createdAt: 1  },
  { id: 18, name: 'Boob Tape',             category: "Women's Essentials", subcategory: 'personal-care', price: 3500,  badge: 'Best Seller', image: booptape,      slug: 'boob-tape',              createdAt: 9  },
  { id: 19, name: 'Over-The-Toilet Organizer Rack', category: "Home Essentials", subcategory: 'bathroom', price: 15000,  badge: 'New', image: toiletrack,      slug: 'over-the-toilet-organizer-rack', createdAt: 6  },
  { id: 20, name: 'Phone Suction Cup',     category: "Accessories", subcategory: 'smart-gadgets', price: 1000,  badge: 'New', image: phonesuction,      slug: 'phone-suction-cup',              createdAt: 6  },
  { id: 21, name: 'RGB Phone LED Light',     category: "Accessories", subcategory: 'smart-gadgets', price: 8000,  badge: 'New', image: rgbled,      slug: 'rgb-phone-led-light',              createdAt: 6  },
  { id: 22, name: 'Wireless Fill Light BT Remote Tripod',     category: "Accessories", subcategory: 'smart-gadgets', price: 12000,  badge: 'New', image: tripod,      slug: 'wireless-fill-light-bt-remote-tripod',              createdAt: 6  },
  { id: 23, name: 'Crystal Diamond LED Lamp',     category: "Home Essentials", subcategory: 'lighting', price: 13000,  badge: 'New', image: ledlamp,      slug: 'crystal-diamond-led-lamp',              createdAt: 6  },
  { id: 24, name: 'Floral & Fruit Fragrance Hand Cream',     category: "Skincare", subcategory: 'body', price: 700,  badge: 'New', image: handcream,      slug: 'floral-fruit-fragrance-hand-cream',              createdAt: 6  },
  { id: 25, name: 'Multifunctional Towel Organizer',     category: "Home Essentials", subcategory: 'bathroom', price: 12000,  badge: 'New', image: towelrack,      slug: 'multifunctional-towel-organizer',              createdAt: 6  },
  { id: 26, name: '3 Layers Jewelry Box With Key',     category: "Home Essentials", subcategory: 'organizers', price: 32000,  badge: 'New', image: jewelrybox,      slug: '3-layers-jewelry-box-with-key',              createdAt: 6  },
  { id: 27, name: 'Foldable Swivel Mosquito Bat',     category: "Home Essentials", subcategory: 'smart-gadgets', price: 15000,  badge: 'New', image: mosquitobat,      slug: 'foldable-swivel-mosquito-bat',              createdAt: 7  },
  { id: 28, name: 'Underwear Organizer',     category: "Home Essentials", subcategory: 'organizers', price: 4000,  badge: 'New', image: underwear,      slug: 'underwear-organizer',              createdAt: 7  },
  { id: 29, name: 'Quick Shoe Wipe',     category: "Home Essentials", subcategory: 'personal-care', price: 5000,  badge: 'New', image: shoewipe,      slug: 'quick-shoe-wipe',              createdAt: 7  },
  { id: 30, name: 'Happy Supply Chain Water Bottle',     category: "Accessories", subcategory: 'drinkware', price: 7000,  badge: 'New', image: waterbottle,      slug: 'happy-supply-chain-water-bottle',              createdAt: 7  },
  { id: 31, name: 'Inspirational Wall Stickers',     category: "Home Essentials", subcategory: 'decor', price: 9000,  badge: 'New', image: wallstickers,      slug: 'inspirational-wall-stickers',              createdAt: 7  },
  { id: 32, name: 'Bubble Gun',     category: "Accessories", subcategory: 'smart-gadgets', price: 10000,  badge: 'New', image: bubblegun,      slug: 'bubble-gun',              createdAt: 8 },
  { id: 33, name: 'USB Cigarette Lighter Mobile Phone Holder',     category: "Accessories", subcategory: 'smart-gadgets', price: 10000,  badge: 'New', image: usblighter,      slug: 'usb-cigarettes-lighter-mobile-phone-holder',              createdAt: 8 },
  { id: 34, name: 'Double Sided Nano Tape',     category: "Home Essentials", subcategory: 'organizers', price: 6000,  badge: 'New', image: nanotape,      slug: 'double-sided-nano-tape',              createdAt: 8 },
  { id: 35, name: 'Gold Decor Tape',     category: "Home Essentials", subcategory: 'Decor', price: 5000,  badge: 'New', image: goldtape,      slug: 'gold-decor-tape',              createdAt: 10},
  { id: 36, name: 'Vine Leaf Room Decor',     category: "Home Essentials", subcategory: 'Decor', price: 1800,  badge: 'New', image: vineleaf,      slug: 'vine-leaf-room-decor',              createdAt: 10},
  { id: 37, name: 'Decorative Wall Hooks',     category: "Home Essentials", subcategory: 'Decor', price: 1500,  badge: 'New', image: wallhook,      slug: 'decorative-wall-hooks',              createdAt: 10},
  { id: 38, name: 'Fancy Barbie Pen',     category: "Accessories", subcategory: 'accessories', price: 2000,  badge: 'New', image: barbiepen,      slug: 'fancy-barbie-pen',              createdAt: 10},
  { id: 39, name: 'Multifunctional Wall Mounted Trash Can ',     category: "Home Essentials", subcategory: 'Kitchen', price: 4500,  badge: 'New', image: trashcan,      slug: 'multifunctional-wall-mounted-trash-can',              createdAt: 10},
  { id: 40, name: 'Transparent Boobs Lifter',     category: "Women's Essentials", subcategory: 'personal-care', price: 4500,  badge: 'New', image: booblifter,      slug: 'transparent-boobs-lifter',              createdAt: 10},
  { id: 41, name: 'Smart Watch (Series 8)',     category: "Accessories", subcategory: 'jewelry', price: 25000,  badge: 'New', image: series8,      slug: 'smart-watch-series-8',              createdAt: 11},
  { id: 42, name: 'Compressed Facial Towel',     category: "Skincare", subcategory: 'face', price: 200,  badge: 'New', image: facetowel,      slug: 'compressed-facial-towel',              createdAt: 11},
  { id: 43, name: 'SADOER Ampoules Facial Mask',     category: "Skincare", subcategory: 'face', price: 800,  badge: 'New', image: facemask,      slug: 'sadoer-ampoules-facial-mask',              createdAt: 11},
  { id: 44, name: 'Tongue Scrubber',     category: "Skincare", subcategory: 'face', price: 1000,  badge: 'New', image: tonguescrubber,      slug: 'tongue-scrubber',              createdAt: 11},
  { id: 45, name: 'Stanley Cup',     category: "Accessories", subcategory: 'drinkware', price: 17000,  badge: 'Best Seller', image: stanley,      slug: 'stanley-cup',              createdAt: 5},
  { id: 46, name: 'Self-adhesive Countertop Film',     category:"Home Essentials", subcategory: 'decor', price: 8000,  badge: 'Best Seller', image: counterfilm,      slug: 'self-adhesive-countertop-film',              createdAt: 5},
  { id: 47, name: 'AC Cooling Humidifier Fan',     category:"Home Essentials", subcategory: 'smart-gadgets', price: 25000,  badge: 'Best Seller', image: fan,      slug: 'ac-cooling-humidifier-fan',              createdAt: 5},
  { id: 48, name: 'Cooking Flipper',     category:"Home Essentials", subcategory: 'kitchen', price: 5000,  badge: 'Best Seller', image: flipper,      slug: 'cooking-flipper',              createdAt: 6},
  { id: 49, name: 'E-30 Camera fill light',     category:"Home Essentials", subcategory: 'smart-gadgets', price: 32000,  badge: 'Best Seller', image: filllight,      slug: 'e-30-camera-fill-light',              createdAt: 6},
  { id: 50, name: '5 IN 1 Multipurpose Organizer',     category:"Home Essentials", subcategory: 'bathroom', price: 20000,  badge: 'Best Seller', image: bathroom,      slug: '5in1-multipurpose-organizer',              createdAt: 6},
  { id: 51, name: 'Ultra-Portable Multi-Functional Juicer Cup',     category:"Home Essentials", subcategory: 'kitchen', price: 14000,  badge: 'Best Seller', image: juicer,      slug: 'ultra-portable-multi-functional-juicer-cup',              createdAt: 6},
  { id: 52, name: '360 Motion Sensor Light',     category:"Home Essentials", subcategory: 'lighting', price: 13000,  badge: 'Best Seller', image: sensorlight,      slug: '360-motion-sensor-light',              createdAt: 6},
  { id: 53, name: 'Wireless Bluetooth Microphone',     category:"Home Essentials", subcategory: 'smart-gadgets', price: 12000,  badge: 'Best Seller', image: microphone,      slug: 'wireless-bluetooth-microphone',              createdAt: 22},
  { id: 54, name: 'RGB Rechargeable Hand Fan',     category:"Home Essentials", subcategory: 'smart-gadgets', price: 8500,  badge: 'Trending', image: handfan,      slug: 'rgb-rechargeable-hand-fan',              createdAt: 21},
  { id: 55, name: 'Nipple Cover',     category:"Women's Essentials", subcategory: 'personal-care', price: 1000,  badge: 'Trending', image: nipplecover,      slug: 'nipple-cover',              createdAt: 23},
]

// ── Subcategory label map — slug → display name ───────────────────────────────
const subcategoryLabels: Record<string, string> = {
  'kitchen':       'Kitchen Products',
  'smart-gadgets': 'Smart Home Gadgets',
  'bathroom':      'Bathroom Essentials',
  'lighting':      'Lighting & Lamps',
  'organizers':    'Organizers',
  'face':          'Face Care',
  'body':          'Body Care',
  'travel-kits':   'Travel Kits',
  'jewelry':       'Jewelry & Organizers',
  'drinkware':     'Cups & Drinkware',
  'bags':          'Bags & Pouches',
  'personal-care': 'Personal Care',
}

const mainCategories = ['All', 'Home Essentials', 'Skincare', 'Accessories', "Women's Essentials"]

// Map URL slug → display name for main categories
const categoryFromSlug: Record<string, string> = {
  'home-essentials': 'Home Essentials',
  'skincare':        'Skincare',
  'accessories':     'Accessories',
  'womens':          "Women's Essentials",
}

const sortOptions = [
  { label: 'Newest First',      value: 'newest'     },
  { label: 'Price: Low → High', value: 'price-asc'  },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Most Popular',      value: 'popular'    },
]

const categoryBanners: Record<string, { image: string; headline: string; sub: string }> = {
  'All':                  { image: relaxationchair, headline: 'Shop Everything',     sub: 'Explore our full collection'             },
  'Home Essentials':      { image: rotatinglight,   headline: 'Home Essentials',     sub: 'Elevate every corner of your space'      },
  'Skincare':             { image: travelkit,       headline: 'Skincare',            sub: 'Glow from within, every day'             },
  'Accessories':          { image: stanleycup,      headline: 'Accessories & Style', sub: 'Carry your story with elegance'          },
  "Women's Essentials":   { image: booptape,        headline: "Women's Essentials",  sub: 'Everything a woman needs, curated'       },
}

const badgeColors: Record<string, string> = {
  'Best Seller': '#8A4FB1', 'Top Rated': '#5B21B6',
  'New': '#D4AF37', 'Trending': '#1A1A2E', 'Premium': '#C4A8D4',
}

// ── Grid Card ─────────────────────────────────────────────────────────────────
function GridCard({ product }: { product: typeof allProducts[0] }) {
  const [hovered,    setHovered]    = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#F0E8FA', aspectRatio: '3/4', marginBottom: '1rem' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: badgeColors[product.badge] || '#1A1A2E', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 10px' }}>
          {product.badge}
        </div>
        <button onClick={e => { e.preventDefault(); setWishlisted(w => !w) }}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? '#8A4FB1' : 'none'} stroke={wishlisted ? '#8A4FB1' : '#1A1A2E'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(26,26,46,0.92)', backdropFilter: 'blur(4px)', padding: '0.85rem', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF' }}>Add to Cart</span>
        </div>
      </div>
      <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '3px' }}>
          {subcategoryLabels[product.subcategory] || product.category}
        </p>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '5px', lineHeight: 1.2 }}>{product.name}</p>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#1A1A2E' }}>{formatPrice(product.price)}</p>
      </Link>
    </div>
  )
}

// ── List Row ──────────────────────────────────────────────────────────────────
function ListRow({ product }: { product: typeof allProducts[0] }) {
  const [hovered,    setHovered]    = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', gap: '1.5rem', background: hovered ? '#F9F4FF' : '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '4px', padding: '1rem', transition: 'all 0.25s', cursor: 'pointer' }}>
      <div style={{ width: '120px', height: '150px', flexShrink: 0, overflow: 'hidden', background: '#F0E8FA', borderRadius: '2px', position: 'relative' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '8px', left: '8px', background: badgeColors[product.badge] || '#1A1A2E', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 7px' }}>
          {product.badge}
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.4rem' }}>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A4FB1' }}>
          {subcategoryLabels[product.subcategory] || product.category}
        </p>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2 }}>{product.name}</p>
        </Link>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '1rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.price)}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <button onClick={e => { e.preventDefault(); setWishlisted(w => !w) }}
          style={{ background: 'none', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? '#8A4FB1' : 'none'} stroke={wishlisted ? '#8A4FB1' : '#1A1A2E'} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', background: '#8A4FB1', color: '#FFF', border: 'none', padding: '0.65rem 1.2rem', cursor: 'pointer', transition: 'background 0.25s', borderRadius: '2px', whiteSpace: 'nowrap' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// ── SHOP PAGE ─────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const { category: categoryParam, subcategory: subcategoryParam } = useParams<{ category?: string; subcategory?: string }>()

  // Resolve main category from URL slug
  const resolvedCategory = categoryParam ? (categoryFromSlug[categoryParam] || 'All') : 'All'

  const [search,      setSearch]      = useState('')
  const [activeCategory, setActiveCategory] = useState(resolvedCategory)
  const [priceRange,  setPriceRange]  = useState<[number, number]>([0, 100000])
  const [sortBy,      setSortBy]      = useState('newest')
  const [viewMode,    setViewMode]    = useState<'grid' | 'list'>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const banner = categoryBanners[activeCategory] || categoryBanners['All']

  // Subcategory label for display
  const subcategoryLabel = subcategoryParam ? subcategoryLabels[subcategoryParam] : null

  const filtered = useMemo(() => {
    let list = [...allProducts]

    // Filter by main category
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    // ── KEY FIX: filter by subcategory from URL ──
    if (subcategoryParam) {
      list = list.filter(p => p.subcategory === subcategoryParam)
    }

    // Filter by search
    if (search.trim()) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    }

    // Filter by price
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'newest')     list.sort((a, b) => b.createdAt - a.createdAt)
    if (sortBy === 'popular')    list.sort((a, b) => (b.badge === 'Best Seller' ? 1 : 0) - (a.badge === 'Best Seller' ? 1 : 0))

    return list
  }, [activeCategory, subcategoryParam, search, priceRange, sortBy])

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 100%)', minHeight: '100vh' }}>

      {/* ── BANNER ────────────────────────────────────────── */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img src={banner.image} alt={banner.headline}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,26,46,0.3) 0%, rgba(26,26,46,0.65) 100%)' }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: '5rem', left: 'clamp(1.5rem,6vw,5rem)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Link to="/" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', letterSpacing: '0.1em' }}>Home</Link>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
          <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', letterSpacing: '0.1em' }}>Shop</Link>
          {activeCategory !== 'All' && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
              <Link to={`/shop/${categoryParam}`} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 500, color: '#E8D5F5', textDecoration: 'none', letterSpacing: '0.1em' }}>
                {activeCategory}
              </Link>
            </>
          )}
          {subcategoryLabel && (
            <>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.1em' }}>
                {subcategoryLabel}
              </span>
            </>
          )}
        </div>

        {/* Headline */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: 'clamp(1.5rem,6vw,5rem)' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 600, fontStyle: 'italic', color: '#FFFFFF', margin: '0 0 0.4rem 0', lineHeight: 1 }}>
            {subcategoryLabel || banner.headline}
          </h1>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            {banner.sub} &nbsp;·&nbsp; <span style={{ color: '#E8D5F5' }}>{filtered.length} products</span>
          </p>
        </div>
      </div>

      {/* ── SEARCH + TOOLBAR ──────────────────────────────── */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(138,79,177,0.1)', padding: '1rem clamp(1.5rem,6vw,5rem)', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FAF7FF', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '2px', padding: '0.6rem 1rem', flex: '1 1 240px', maxWidth: '380px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: '"Jost", sans-serif', fontSize: '0.83rem', color: '#1A1A2E', flex: 1 }} />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', lineHeight: 0, padding: 0 }}>✕</button>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
          {/* Sort */}
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 500, color: '#1A1A2E', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '2px', padding: '0.55rem 1rem', background: '#FAF7FF', cursor: 'pointer', outline: 'none' }}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>

          {/* Filter toggle */}
          <button onClick={() => setSidebarOpen(s => !s)}
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '2px', padding: '0.55rem 1rem', background: sidebarOpen ? '#8A4FB1' : '#FAF7FF', color: sidebarOpen ? '#FFF' : '#8A4FB1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
            Filters
          </button>

          {/* View toggle */}
          <div style={{ display: 'flex', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
            {(['grid', 'list'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)}
                style={{ padding: '0.55rem 0.8rem', border: 'none', background: viewMode === mode ? '#8A4FB1' : '#FAF7FF', color: viewMode === mode ? '#FFF' : '#8A4FB1', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>
                {mode === 'grid'
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                }
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ───────────────────────────────────── */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem clamp(1.5rem,6vw,5rem)', display: 'flex', gap: '2.5rem', alignItems: 'flex-start' }}>

        {/* ── SIDEBAR ── */}
        {sidebarOpen && (
          <aside style={{ width: '240px', flexShrink: 0, position: 'sticky', top: '88px', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Category filter */}
            <div>
              <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '1rem' }}>Category</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {mainCategories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    style={{ textAlign: 'left', background: activeCategory === cat ? '#F3E8FF' : 'none', border: 'none', borderLeft: `2px solid ${activeCategory === cat ? '#8A4FB1' : 'transparent'}`, padding: '0.5rem 0.75rem', fontFamily: '"Jost", sans-serif', fontSize: '0.83rem', fontWeight: activeCategory === cat ? 600 : 400, color: activeCategory === cat ? '#8A4FB1' : '#1A1A2E', cursor: 'pointer', transition: 'all 0.2s', borderRadius: '0 4px 4px 0', display: 'flex', justifyContent: 'space-between' }}>
                    {cat}
                    <span style={{ fontSize: '0.7rem', color: '#8A4FB1', fontWeight: 400 }}>
                      {cat === 'All' ? allProducts.length : allProducts.filter(p => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '0.75rem' }}>Price Range</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: '#8A4FB1', fontWeight: 600 }}>{formatPrice(priceRange[0])}</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: '#8A4FB1', fontWeight: 600 }}>{formatPrice(priceRange[1])}</span>
              </div>
              <input type="range" min={0} max={100000} step={500} value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                style={{ width: '100%', accentColor: '#8A4FB1' }} />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  [0, 10000,  'Under ₦10k'],
                  [10000, 30000, '₦10k–₦30k'],
                  [30000, 100000, '₦30k+'],
                ].map(([min, max, label]) => (
                  <button key={label as string} onClick={() => setPriceRange([min as number, max as number])}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, padding: '4px 8px', border: '1px solid rgba(138,79,177,0.25)', borderRadius: '2px', background: priceRange[0] === min && priceRange[1] === max ? '#8A4FB1' : 'transparent', color: priceRange[0] === min && priceRange[1] === max ? '#FFF' : '#8A4FB1', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {label as string}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setActiveCategory('All'); setPriceRange([0, 100000]); setSearch(''); setSortBy('newest') }}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '1px solid rgba(138,79,177,0.3)', borderRadius: '2px', padding: '0.65rem', color: '#8A4FB1', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8A4FB1' }}>
              Reset Filters
            </button>
          </aside>
        )}

        {/* ── PRODUCTS ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontStyle: 'italic', color: '#8A4FB1', marginBottom: '0.75rem' }}>No products found</p>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#5B21B6' }}>Try adjusting your filters or search term</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem 1.5rem' }}>
              {filtered.map(p => <GridCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filtered.map(p => <ListRow key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
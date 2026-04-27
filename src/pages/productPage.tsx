import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  FiHeart, FiShare2, FiShoppingBag, FiZap, FiChevronDown, FiChevronUp,
  FiTruck, FiRefreshCw, FiShield, FiStar, FiInstagram,
  FiMinus, FiPlus, FiCheck, FiPackage, FiPlay
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { useCart } from '../store/cartStore'
import { useProduct } from '../hooks/useProducts'
import { useWishlist } from '../hooks/useWishlist'
import {
  productsAPI, reviewsAPI, getCloudinaryUrl,
  type Product, type Review,
} from '../services/api'

const formatPrice = (n: number | string) =>
  '₦' + Number(n).toLocaleString('en-NG')

type MediaItem =
  | { type: 'image'; src: string }
  | { type: 'video'; src: string; poster?: string }

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
        <FiStar key={i} size={size} style={{
          fill: i <= Math.round(rating) ? '#D4AF37' : 'none',
          color: '#D4AF37',
          opacity: i <= Math.round(rating) ? 1 : 0.3,
        }}/>
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

function VideoThumb({ src: _src, poster, isActive, onClick }: { src: string; poster?: string; isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${isActive ? '#8A4FB1' : 'transparent'}`, padding: 0, cursor: 'pointer', background: '#1A1A2E', flexShrink: 0, position: 'relative', transition: 'border-color 0.2s' }}>
      {poster && <img src={poster} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}/>}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FiPlay size={10} color="#1A1A2E" style={{ marginLeft: '2px' }}/>
        </div>
      </div>
    </button>
  )
}

function ProductSkeleton() {
  const pulse = { animation: 'pulse 1.5s ease-in-out infinite', background: 'linear-gradient(90deg,#F0E8FA 25%,#E8D5F5 50%,#F0E8FA 75%)', backgroundSize: '200% 100%', borderRadius: '8px' }
  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>
      <style>{`@keyframes pulse { 0%,100%{background-position:0%} 50%{background-position:100%} }`}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem clamp(1.5rem,6vw,5rem)' }}>
        <div style={{ height: '14px', width: '220px', ...pulse, marginBottom: '2rem' }}/>
      </div>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem,6vw,5rem) 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        <div>
          <div style={{ aspectRatio: '1/1', ...pulse, marginBottom: '1rem', borderRadius: '16px' }}/>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[0,1,2].map(i => <div key={i} style={{ width: '72px', height: '72px', ...pulse }}/>)}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ height: '14px', width: '120px', ...pulse }}/>
          <div style={{ height: '40px', width: '80%', ...pulse }}/>
          <div style={{ height: '36px', width: '160px', ...pulse }}/>
          <div style={{ height: '80px', ...pulse }}/>
          <div style={{ height: '44px', ...pulse }}/>
          <div style={{ height: '44px', ...pulse }}/>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug = '' }  = useParams<{ slug: string }>()
  const navigate        = useNavigate()
  const { addItem }     = useCart()
  const videoRef        = useRef<HTMLVideoElement>(null)

  const { product, loading, error } = useProduct(slug)
  const { toggle: toggleWishlist, isWishlisted } = useWishlist()

  const [activeIdx,   setActiveIdx]   = useState(0)
  const [qty,         setQty]         = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [imgZoom,     setImgZoom]     = useState(false)
  const [activeColor, setActiveColor] = useState(0)
  const [activeSize,  setActiveSize]  = useState<number | null>(null)

  const [reviews, setReviews]   = useState<Review[]>([])
  const [related, setRelated]   = useState<Product[]>([])

  useEffect(() => {
    setActiveIdx(0); setQty(1); setAddedToCart(false); setActiveColor(0); setActiveSize(null)
  }, [slug])

  useEffect(() => {
    if (!slug) return
    reviewsAPI.getForProduct(slug).then(setReviews).catch(() => {})
    productsAPI.getRelated(slug)
      .then(data => setRelated((Array.isArray(data) ? data : []).slice(0, 4)))
      .catch(() => {})
  }, [slug])

  if (loading) return <ProductSkeleton/>

  if (error || !product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '2rem', color: '#8A4FB1' }}>Product not found</p>
        <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.9rem 2rem', borderRadius: '8px' }}>Back to Shop</Link>
      </div>
    )
  }

  // ── Build gallery ────────────────────────────────────────────────────────────
  const effectiveMedia: MediaItem[] = product.color_variants.length > 0
    ? [
        { type: 'image', src: getCloudinaryUrl(product.color_variants[activeColor].image, 800) },
        ...product.images
          .filter(img => img.image !== product.color_variants[activeColor].image)
          .map(img => ({ type: 'image' as const, src: getCloudinaryUrl(img.image, 800) })),
        ...product.videos.map(v => ({ type: 'video' as const, src: v.video_url, poster: v.poster ?? undefined })),
      ]
    : [
        ...product.images.map(img => ({ type: 'image' as const, src: getCloudinaryUrl(img.image, 800) })),
        ...product.videos.map(v => ({ type: 'video' as const, src: v.video_url, poster: v.poster ?? undefined })),
      ]

  // Fallback to primary_image if no images uploaded yet
  if (effectiveMedia.length === 0 && product.primary_image?.image) {
    effectiveMedia.push({ type: 'image', src: getCloudinaryUrl(product.primary_image.image, 800) })
  }

  const activeItem = effectiveMedia[activeIdx < effectiveMedia.length ? activeIdx : 0]
  const isVideo    = activeItem?.type === 'video'

  // ── Derived values ───────────────────────────────────────────────────────────
  const wishlisted    = isWishlisted(product.slug)
  const avgRating     = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : parseFloat(product.rating) || 0
  const categorySlug  = product.category.slug
  const categoryName  = product.category.name
  const cartImage     = getCloudinaryUrl(
    product.images[0]?.image ?? product.color_variants[0]?.image ?? null, 400
  )
  const badgeBg       = product.badge === 'new' || product.badge === 'premium'
    ? '#D4AF37' : product.badge === 'best_seller' ? '#8A4FB1' : '#1A1A2E'
  const badgeTextColor = product.badge === 'new' || product.badge === 'premium' ? '#1A1A2E' : '#FFF'
  const saleEndLabel  = product.sale_end
    ? `Sale ends ${new Date(product.sale_end).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' })}`
    : null

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(product.active_price),
      image: cartImage,
      slug: product.slug,
      category: categoryName,
      colorVariant: product.color_variants.length > 0 ? product.color_variants[activeColor].label : undefined,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const handleBuyNow = () => {
    addItem({ id: product.id, name: product.name, price: parseFloat(product.active_price), image: cartImage, slug: product.slug, category: categoryName })
    navigate('/checkout')
  }

  const shareWhatsApp  = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://wa.me/?text=${encodeURIComponent(`Check out ${product.name} on Soft Lifee! ${formatPrice(product.active_price)} `)}${url}`, '_blank')
  }
  const shareInstagram = () => window.open('https://instagram.com/softlifeebybecky', '_blank')

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ padding: '1rem clamp(1.5rem,6vw,5rem)', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Shop', '/shop'], [categoryName, `/shop/${categorySlug}`], [product.name, '#']].map(([label, path], i, arr) => (
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

          {/* Main media */}
          <div
            style={{ position: 'relative', background: '#F0E8FA', borderRadius: '16px', overflow: 'hidden', aspectRatio: '1/1', marginBottom: '1rem', cursor: isVideo ? 'default' : 'zoom-in' }}
            onClick={() => { if (!isVideo) setImgZoom(true) }}>

            {activeItem ? (
              isVideo ? (
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
              )
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: '"Jost", sans-serif', color: 'rgba(138,79,177,0.3)', fontSize: '0.75rem' }}>No image</span>
              </div>
            )}

            {/* Badge */}
            {product.badge_display && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: badgeBg, color: badgeTextColor, fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '100px' }}>
                {product.badge_display}
              </div>
            )}

            {/* Sale badge */}
            {product.is_on_sale && (
              <div style={{ position: 'absolute', top: product.badge_display ? '48px' : '16px', left: '16px', background: '#BE123C', color: '#FFF', fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.1em', padding: '5px 12px', borderRadius: '100px' }}>
                -{product.discount_percent}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails strip */}
          {effectiveMedia.length > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {effectiveMedia.map((item, i) =>
                item.type === 'video' ? (
                  <VideoThumb key={i} src={item.src} poster={item.poster} isActive={activeIdx === i} onClick={() => setActiveIdx(i)}/>
                ) : (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${activeIdx === i ? '#8A4FB1' : 'transparent'}`, padding: 0, cursor: 'pointer', background: '#F0E8FA', transition: 'border-color 0.2s', flexShrink: 0 }}>
                    <img src={item.src} alt={`View ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
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
            <Link to={`/shop/${categorySlug}`}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>
              {categoryName}
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarRating rating={parseFloat(product.rating) || 0}/>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#1A1A2E' }}>{Number(product.rating).toFixed(1)}</span>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>({product.review_count} reviews)</span>
            </div>
          </div>

          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.15, margin: '0 0 1rem 0' }}>{product.name}</h1>

          {/* Price */}
          {product.is_on_sale ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.active_price)}</span>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 300, color: 'rgba(26,26,46,0.35)', textDecoration: 'line-through' }}>{formatPrice(product.price)}</span>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#BE123C', background: '#FFF1F2', padding: '3px 10px', borderRadius: '100px' }}>-{product.discount_percent}% OFF</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.active_price)}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: product.in_stock ? '#16A34A' : '#DC2626', background: product.in_stock ? '#F0FDF4' : '#FEF2F2', padding: '3px 10px', borderRadius: '100px' }}>
              {product.in_stock ? 'In Stock' : 'Out of Stock'}
            </span>
            {saleEndLabel && (
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#D97706', background: '#FFFBEB', padding: '3px 10px', borderRadius: '100px' }}>
                ⏳ {saleEndLabel}
              </span>
            )}
          </div>

          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.85, marginBottom: '2rem', borderLeft: '3px solid #E8D5F5', paddingLeft: '1rem' }}>
            {product.description}
          </p>

          {/* ── COLOR SWATCHES ── */}
          {product.color_variants.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E' }}>Colour</label>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#8A4FB1' }}>
                  — {product.color_variants[activeColor].label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {product.color_variants.map((color, i) => (
                  <button key={color.id} onClick={() => { setActiveColor(i); setActiveIdx(0) }}
                    title={color.label}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: color.hex_code, border: `3px solid ${activeColor === i ? '#8A4FB1' : 'transparent'}`, outline: `2px solid ${activeColor === i ? '#8A4FB1' : 'rgba(138,79,177,0.15)'}`, outlineOffset: '2px', cursor: 'pointer', transition: 'all 0.2s', transform: activeColor === i ? 'scale(1.15)' : 'scale(1)', boxShadow: activeColor === i ? '0 0 0 2px #FAF7FF' : 'none' }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
                {product.color_variants.map((color, i) => (
                  <button key={color.id} onClick={() => { setActiveColor(i); setActiveIdx(0) }}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px', border: `1px solid ${activeColor === i ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: activeColor === i ? '#F3E8FF' : 'transparent', color: activeColor === i ? '#8A4FB1' : 'rgba(26,26,46,0.5)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── SIZE SELECTOR ── */}
          {product.size_variants.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
                <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E' }}>Size</label>
                {activeSize !== null && (
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 600, color: '#8A4FB1' }}>
                    — {product.size_variants[activeSize].label}
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.size_variants.map((size, i) => (
                  <button key={size.id}
                    onClick={() => size.in_stock && setActiveSize(activeSize === i ? null : i)}
                    disabled={!size.in_stock}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 600, minWidth: '44px', padding: '0.5rem 0.9rem', borderRadius: '8px', border: `1.5px solid ${activeSize === i ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: activeSize === i ? '#F3E8FF' : '#FFFFFF', color: !size.in_stock ? 'rgba(26,26,46,0.3)' : activeSize === i ? '#8A4FB1' : 'rgba(26,26,46,0.6)', textDecoration: !size.in_stock ? 'line-through' : 'none', cursor: size.in_stock ? 'pointer' : 'not-allowed', transition: 'all 0.2s', position: 'relative' }}>
                    {size.label}
                    {!size.in_stock && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '1px', background: 'rgba(26,26,46,0.2)', transform: 'rotate(-45deg)' }}/>
                      </div>
                    )}
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
                Total: <strong style={{ color: '#8A4FB1' }}>{formatPrice(parseFloat(product.active_price) * qty)}</strong>
              </span>
            </div>
          </div>

          {/* ── CTA BUTTONS ── */}
          <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            <button onClick={handleAddToCart} disabled={!product.in_stock}
              style={{ flex: 1, minWidth: '160px', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: !product.in_stock ? 'rgba(138,79,177,0.4)' : addedToCart ? '#16A34A' : '#8A4FB1', border: 'none', borderRadius: '10px', cursor: product.in_stock ? 'pointer' : 'not-allowed', transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseEnter={e => { if (product.in_stock && !addedToCart) e.currentTarget.style.background = '#5B21B6' }}
              onMouseLeave={e => { if (product.in_stock && !addedToCart) e.currentTarget.style.background = '#8A4FB1' }}>
              {addedToCart ? <><FiCheck size={16}/> Added!</> : <><FiShoppingBag size={16}/> Add to Cart</>}
            </button>
            <button onClick={handleBuyNow} disabled={!product.in_stock}
              style={{ flex: 1, minWidth: '160px', padding: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A1A2E', background: product.in_stock ? '#D4AF37' : 'rgba(212,175,55,0.4)', border: 'none', borderRadius: '10px', cursor: product.in_stock ? 'pointer' : 'not-allowed', transition: 'background 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onMouseEnter={e => { if (product.in_stock) e.currentTarget.style.background = '#c49d2e' }}
              onMouseLeave={e => { if (product.in_stock) e.currentTarget.style.background = '#D4AF37' }}>
              <FiZap size={16}/> Buy Now
            </button>
          </div>

          {/* ── WISHLIST + SHARE ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => toggleWishlist(product.slug)}
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
            {(product.details?.length ?? 0) > 0 && (
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
            )}
            <AccordionItem title="Delivery & Returns">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { title: 'Lagos Delivery',      desc: '1–2 business days · ₦1,500'                                              },
                  { title: 'Nationwide Delivery',  desc: '3–5 business days · ₦2,500–₦3,500'                                      },
                  { title: 'Free Delivery',        desc: 'On all orders above ₦50,000'                                             },
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
            {reviews.length > 0 && (
              <div style={{ background: '#FAF7FF', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', textAlign: 'center' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>{avgRating.toFixed(1)}</p>
                <StarRating rating={avgRating} size={16}/>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', color: '#5B21B6', marginTop: '4px' }}>{reviews.length} reviews</p>
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.2rem' }}>
              {reviews.map(review => (
                <div key={review.id} style={{ background: '#FAF7FF', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#8A4FB1,#5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.9rem', fontWeight: 600, color: '#FFF' }}>{review.reviewer_name[0]?.toUpperCase()}</span>
                      </div>
                      <div>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#1A1A2E' }}>{review.reviewer_name}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 300, color: '#5B21B6' }}>
                          {new Date(review.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#D4AF3720', padding: '3px 8px', borderRadius: '100px', flexShrink: 0 }}>
                      <FiStar size={11} style={{ fill: '#D4AF37', color: '#D4AF37' }}/>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#1A1A2E' }}>{review.rating}.0</span>
                    </div>
                  </div>
                  {review.title && (
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '0.4rem' }}>{review.title}</p>
                  )}
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.75 }}>"{review.body}"</p>
                  {review.is_verified_purchase && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.85rem' }}>
                      <FiCheck size={11} color="#16A34A"/>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#16A34A' }}>Verified Purchase</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(26,26,46,0.4)', textAlign: 'center', padding: '2rem 0' }}>No reviews yet. Be the first to review this product.</p>
          )}

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
              {related.map(p => {
                const relatedImg = getCloudinaryUrl(p.primary_image?.image ?? null, 400)
                const relatedCat = typeof p.category === 'string' ? p.category : p.category.name
                return (
                  <Link key={p.id} to={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.1)', transition: 'all 0.3s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#8A4FB1'; el.style.boxShadow = '0 8px 32px rgba(138,79,177,0.12)'; el.style.transform = 'translateY(-4px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(138,79,177,0.1)'; el.style.boxShadow = 'none'; el.style.transform = 'none' }}>
                      <div style={{ height: '220px', overflow: 'hidden', background: '#F0E8FA' }}>
                        {relatedImg ? (
                          <img src={relatedImg} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.06)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}/>
                        ) : (
                          <div style={{ width: '100%', height: '100%', background: '#F0E8FA' }}/>
                        )}
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '4px' }}>{relatedCat}</p>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.05rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', lineHeight: 1.2 }}>{p.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.9rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(p.active_price)}</p>
                          {p.is_on_sale && (
                            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(26,26,46,0.4)', textDecoration: 'line-through' }}>{formatPrice(p.price)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── LIGHTBOX ── */}
      {imgZoom && !isVideo && activeItem && (
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

import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiSearch, FiX, FiSliders, FiChevronDown } from 'react-icons/fi'
import { useProducts, useCategories, useSearch } from '../hooks/useProducts'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../store/cartStore'
import { getCloudinaryUrl } from '../services/api'
import type { Product, ProductFilters } from '../services/api'
import kitchenImg    from '../assets/kitchen rack.jpg'
import skincareImg   from '../assets/skincare.jpg'
import jewelleryImg  from '../assets/jewelry.jpg'
import booptapeImg   from '../assets/boobtape.jpg'
import hero1Img      from '../assets/hero1.jpeg'

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

const SORT_OPTIONS = [
  { label: 'Newest First',    value: '-created_at'   },
  { label: 'Price: Low–High', value: 'price'         },
  { label: 'Price: High–Low', value: '-price'        },
  { label: 'Best Rated',      value: '-rating'       },
  { label: 'Most Reviewed',   value: '-review_count' },
]

const BADGE_OPTIONS = [
  { label: 'All',         value: ''            },
  { label: 'New',         value: 'new'         },
  { label: 'Best Seller', value: 'best_seller' },
  { label: 'Top Rated',   value: 'top_rated'   },
  { label: 'Trending',    value: 'trending'    },
  { label: 'Premium',     value: 'premium'     },
]

const PRICE_OPTIONS = [
  { label: 'Any Price',       value: '' },
  { label: 'Under ₦5,000',   value: '5000'   },
  { label: 'Under ₦10,000',  value: '10000'  },
  { label: 'Under ₦20,000',  value: '20000'  },
  { label: 'Under ₦50,000',  value: '50000'  },
  { label: 'Under ₦100,000', value: '100000' },
]

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  new:         { bg: '#D4AF37', color: '#1A1A2E' },
  best_seller: { bg: '#8A4FB1', color: '#FFF'    },
  top_rated:   { bg: '#5B21B6', color: '#FFF'    },
  trending:    { bg: '#1A1A2E', color: '#FFF'    },
  premium:     { bg: '#D4AF37', color: '#1A1A2E' },
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const { addItem }              = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [adding, setAdding]      = useState(false)
  const [hovered, setHovered]    = useState(false)
  const wishlisted = isWishlisted(product.slug)
  const imgSrc     = getCloudinaryUrl(product.primary_image?.image, 500)
  const badge      = BADGE_COLORS[product.badge] || { bg: '#8A4FB1', color: '#FFF' }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    if (adding) return
    setAdding(true)
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: imgSrc, slug: product.slug, category: typeof product.category === 'string' ? product.category : (product.category as any)?.name || '' })
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ background: '#FFFFFF', borderRadius: '14px', overflow: 'hidden', border: `1px solid ${hovered ? '#8A4FB1' : 'rgba(138,79,177,0.1)'}`, transition: 'all 0.3s', boxShadow: hovered ? '0 12px 40px rgba(138,79,177,0.14)' : '0 2px 8px rgba(138,79,177,0.04)', transform: hovered ? 'translateY(-4px)' : 'none', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Image wrapper with aspect ratio */}
        <div style={{ position: 'relative', paddingTop: '120%', overflow: 'hidden', background: '#F0E8FA', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            {imgSrc
              ? <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FiShoppingBag size={36} color="rgba(138,79,177,0.2)" />
                </div>
            }
          </div>

          {/* Badge */}
          {product.badge && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: badge.bg, color: badge.color, fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px', zIndex: 1 }}>
              {product.badge_display}
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.in_stock && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#BE123C', background: '#FFF', padding: '6px 14px', borderRadius: '100px' }}>Out of Stock</span>
            </div>
          )}

          {/* Wishlist button */}
          <button onClick={e => { e.preventDefault(); toggle(product.slug) }}
            style={{ position: 'absolute', top: '10px', right: '10px', width: '36px', height: '36px', borderRadius: '50%', background: wishlisted ? '#FFF1F2' : 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: wishlisted ? '#BE123C' : '#8A4FB1', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2 }}>
            <FiHeart size={14} style={{ fill: wishlisted ? '#BE123C' : 'none' }} />
          </button>

          {/* Quick add — slides up on hover (desktop), always partially visible on mobile */}
          <div onClick={handleAdd}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.8rem', background: adding ? 'rgba(22,163,74,0.94)' : 'rgba(26,26,46,0.9)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', cursor: product.in_stock ? 'pointer' : 'default', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease', zIndex: 2 }}>
            <FiShoppingBag size={13} color="#FFF" />
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF' }}>
              {adding ? '✓ Added!' : 'Quick Add'}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: 'clamp(0.85rem,2vw,1.1rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '4px' }}>
            {typeof product.category === 'string' ? product.category : (product.category as any)?.name}
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(0.95rem,2vw,1.1rem)', fontWeight: 600, color: '#1A1A2E', marginBottom: '8px', lineHeight: 1.25, flex: 1 }}>{product.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.88rem,2vw,0.95rem)', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>
                {formatPrice(product.is_on_sale && product.sale_price ? product.sale_price : product.price)}
              </p>
              {product.is_on_sale && product.sale_price && (
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(26,26,46,0.35)', textDecoration: 'line-through', margin: 0 }}>{formatPrice(product.price)}</p>
              )}
            </div>
            {Number(product.review_count) > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ color: '#D4AF37', fontSize: '0.68rem' }}>★</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, color: '#1A1A2E' }}>{Number(product.rating).toFixed(1)}</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', color: 'rgba(26,26,46,0.38)' }}>({product.review_count})</span>
              </div>
            )}
          </div>

          {/* Mobile add to cart button */}
          <button onClick={handleAdd} disabled={!product.in_stock}
            className="sl-mobile-add-btn"
            style={{ marginTop: '0.75rem', width: '100%', padding: '0.65rem', background: adding ? '#16A34A' : '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: product.in_stock ? 'pointer' : 'not-allowed', opacity: product.in_stock ? 1 : 0.5, transition: 'background 0.2s', display: 'none', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <FiShoppingBag size={12} />
            {adding ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: '#FFF', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.08)' }}>
      <div style={{ paddingTop: '120%', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #F0E8FA 25%, #E8D5F5 50%, #F0E8FA 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      </div>
      <div style={{ padding: '1rem' }}>
        <div style={{ height: '8px', width: '50px', background: '#F0E8FA', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '14px', width: '80%', background: '#F0E8FA', borderRadius: '4px', marginBottom: '6px' }} />
        <div style={{ height: '14px', width: '60%', background: '#F0E8FA', borderRadius: '4px', marginBottom: '10px' }} />
        <div style={{ height: '18px', width: '40%', background: '#F0E8FA', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

// ── Filter Drawer (mobile) ────────────────────────────────────────────────────
function FilterDrawer({
  open, onClose, filters, setFilters, categories, navigate, clearFilters, activeFilterCount,
}: {
  open: boolean; onClose: () => void;
  filters: ProductFilters; setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>;
  categories: any[]; navigate: any; clearFilters: () => void; activeFilterCount: number;
}) {
  const updateFilter = (key: keyof ProductFilters, value: any) =>
    setFilters(prev => ({ ...prev, [key]: value || undefined }))

  if (!open) return null
  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1000, backdropFilter: 'blur(2px)' }} />
      {/* Sheet */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1001, background: '#FAF7FF', borderRadius: '20px 20px 0 0', padding: '0 1.5rem 2rem', maxHeight: '85vh', overflowY: 'auto', animation: 'sl-sheetUp 0.3s cubic-bezier(0.22,1,0.36,1)' }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 0 0.5rem' }}>
          <div style={{ width: '40px', height: '4px', borderRadius: '100px', background: 'rgba(138,79,177,0.2)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E' }}>Filters & Sort</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', minHeight: 'auto' }}>
            <FiX size={20} />
          </button>
        </div>

        {/* Category */}
        <FilterSection label="Category">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <PillBtn active={!filters.category} onClick={() => navigate('/shop')}>All</PillBtn>
            {categories.map(cat => (
              <PillBtn key={cat.id} active={filters.category === cat.slug} onClick={() => navigate(`/shop/${cat.slug}`)}>
                {cat.name}
              </PillBtn>
            ))}
          </div>
        </FilterSection>

        {/* Collection / Badge */}
        <FilterSection label="Collection">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {BADGE_OPTIONS.map(b => (
              <PillBtn key={b.value} active={filters.badge === b.value || (!filters.badge && b.value === '')} onClick={() => updateFilter('badge', b.value)}>
                {b.label}
              </PillBtn>
            ))}
          </div>
        </FilterSection>

        {/* Price */}
        <FilterSection label="Max Price">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {PRICE_OPTIONS.map(p => (
              <PillBtn key={p.value} active={String(filters.max_price || '') === p.value} onClick={() => updateFilter('max_price', p.value ? Number(p.value) : undefined)}>
                {p.label}
              </PillBtn>
            ))}
          </div>
        </FilterSection>

        {/* Sort */}
        <FilterSection label="Sort By">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {SORT_OPTIONS.map(s => (
              <PillBtn key={s.value} active={filters.ordering === s.value} onClick={() => updateFilter('ordering', s.value)}>
                {s.label}
              </PillBtn>
            ))}
          </div>
        </FilterSection>

        {/* In stock */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '0.5rem 0', marginBottom: '1.5rem' }}>
          <input type="checkbox" checked={!!filters.in_stock} onChange={e => updateFilter('in_stock', e.target.checked || undefined)}
            style={{ accentColor: '#8A4FB1', width: '18px', height: '18px' }} />
          <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#1A1A2E' }}>In Stock Only</span>
        </label>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {activeFilterCount > 0 && (
            <button onClick={() => { clearFilters(); onClose() }}
              style={{ flex: 1, padding: '0.9rem', background: '#FFF1F2', color: '#BE123C', border: '1px solid rgba(190,18,60,0.2)', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Clear All ({activeFilterCount})
            </button>
          )}
          <button onClick={onClose}
            style={{ flex: 2, padding: '0.9rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Show Results
          </button>
        </div>
      </div>
    </>
  )
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', marginBottom: '0.75rem' }}>{label}</p>
      {children}
    </div>
  )
}

function PillBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: active ? 700 : 400, padding: '0.45rem 1rem', borderRadius: '100px', border: `1.5px solid ${active ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: active ? '#8A4FB1' : '#FFF', color: active ? '#FFF' : '#1A1A2E', cursor: 'pointer', transition: 'all 0.15s', minHeight: '36px' }}>
      {children}
    </button>
  )
}

// ── Shop Page ─────────────────────────────────────────────────────────────────
export default function ShopPage() {
  const { category: categoryParam, subcategory: subcategoryParam } = useParams<{ category?: string; subcategory?: string }>()
  const navigate = useNavigate()

  const [filters, setFilters] = useState<ProductFilters>(() => ({
    ordering: '-created_at',
    ...(categoryParam    ? { category:    categoryParam    } : {}),
    ...(subcategoryParam ? { subcategory: subcategoryParam } : {}),
  }))
  const [searchInput,  setSearchInput]  = useState('')
  const [filterOpen,   setFilterOpen]   = useState(false)

  const { products, loading, error, totalCount } = useProducts(filters)
  const { categories } = useCategories()

  useEffect(() => {
    setFilters(prev => ({
      ordering: prev.ordering,
      ...(categoryParam    ? { category:    categoryParam    } : {}),
      ...(subcategoryParam ? { subcategory: subcategoryParam } : {}),
    }))
  }, [categoryParam, subcategoryParam])

  const safeProducts   = Array.isArray(products)   ? products   : []
  const safeCategories = Array.isArray(categories) ? categories : []

  const updateFilter = (key: keyof ProductFilters, value: any) =>
    setFilters(prev => ({ ...prev, [key]: value || undefined }))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilter('search', searchInput.trim() || undefined)
  }

  const clearFilters = () => {
    setFilters({ ordering: '-created_at' })
    setSearchInput('')
    navigate('/shop')
  }

  const activeFilterCount = Object.keys(filters).filter(k => k !== 'ordering' && (filters as any)[k]).length

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #4C1D95 55%, #8A4FB1 100%)', padding: 'clamp(2.5rem,5vw,4.5rem) clamp(1.25rem,6vw,5rem) clamp(2rem,4vw,3.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40%', right: '-5%', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(212,175,55,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50%', left: '-5%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(138,79,177,0.18)', pointerEvents: 'none' }} />

        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '0.6rem' }}>Soft Lifee Collection</p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2.2rem,6vw,4.5rem)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.5rem', lineHeight: 1 }}>
          {categoryParam ? categoryParam.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Shop All'}
        </h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.75rem,2vw,0.85rem)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 'clamp(1.25rem,3vw,2rem)' }}>
          {loading ? 'Loading...' : `${totalCount} curated product${totalCount !== 1 ? 's' : ''}`}
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', background: '#FFF', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
            placeholder="Search products..."
            style={{ flex: 1, padding: 'clamp(0.75rem,2vw,0.9rem) 1.1rem', border: 'none', outline: 'none', fontFamily: '"Jost", sans-serif', fontSize: 'clamp(0.8rem,2vw,0.85rem)', color: '#1A1A2E', minWidth: 0 }} />
          <button type="submit"
            style={{ padding: 'clamp(0.75rem,2vw,0.9rem) clamp(1rem,3vw,1.5rem)', background: '#8A4FB1', color: '#FFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0, transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
            <FiSearch size={14} /> <span className="sl-search-label">Search</span>
          </button>
        </form>
      </div>

      {/* ── CATEGORY PILLS (horizontal scroll) ── */}
      <div style={{ background: '#FFF', borderBottom: '1px solid rgba(138,79,177,0.1)', padding: '0.75rem clamp(1.25rem,6vw,5rem)' }}>
        <div className="sl-scroll-x" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/shop')}
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: !filters.category ? 700 : 500, padding: '0.45rem 1rem', borderRadius: '100px', border: `1.5px solid ${!filters.category ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: !filters.category ? '#8A4FB1' : 'transparent', color: !filters.category ? '#FFF' : '#5B21B6', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap', flexShrink: 0, minHeight: '36px' }}>
            All
          </button>
          {safeCategories.map(cat => (
            <button key={cat.id} onClick={() => navigate(`/shop/${cat.slug}`)}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: filters.category === cat.slug ? 700 : 400, padding: '0.45rem 1rem', borderRadius: '100px', border: `1.5px solid ${filters.category === cat.slug ? '#8A4FB1' : 'rgba(138,79,177,0.2)'}`, background: filters.category === cat.slug ? '#8A4FB1' : 'transparent', color: filters.category === cat.slug ? '#FFF' : '#5B21B6', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap', flexShrink: 0, minHeight: '36px' }}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="sl-shop-body" style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(1.25rem,3vw,2rem) clamp(1.25rem,6vw,5rem)' }}>

        {/* ── DESKTOP FILTER BAR ── */}
        <div className="sl-desktop-filters" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: '#FFF', padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 2px 12px rgba(138,79,177,0.04)', flexWrap: 'wrap' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.38)' }}>Collection</label>
            <select onChange={e => updateFilter('badge', e.target.value)} value={filters.badge || ''}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.45rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              {BADGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.38)' }}>Max Price</label>
            <select onChange={e => updateFilter('max_price', e.target.value ? Number(e.target.value) : undefined)} value={filters.max_price || ''}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.45rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              {PRICE_OPTIONS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" id="in-stock" checked={!!filters.in_stock}
              onChange={e => updateFilter('in_stock', e.target.checked || undefined)}
              style={{ accentColor: '#8A4FB1', width: '14px', height: '14px', cursor: 'pointer' }} />
            <label htmlFor="in-stock" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 500, color: '#1A1A2E', cursor: 'pointer', userSelect: 'none' }}>In Stock Only</label>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginLeft: 'auto' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.38)' }}>Sort By</label>
            <select onChange={e => updateFilter('ordering', e.target.value)} value={filters.ordering || '-created_at'}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.45rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {activeFilterCount > 0 && (
            <button onClick={clearFilters}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#BE123C', background: '#FFF1F2', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', whiteSpace: 'nowrap', minHeight: '36px' }}>
              ✕ Clear ({activeFilterCount})
            </button>
          )}
        </div>

        {/* ── MOBILE TOOLBAR ── */}
        <div className="sl-mobile-toolbar" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(26,26,46,0.5)', margin: 0 }}>
            {loading ? '' : `${totalCount} item${totalCount !== 1 ? 's' : ''}`}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* Sort select */}
            <div style={{ position: 'relative' }}>
              <select onChange={e => updateFilter('ordering', e.target.value)} value={filters.ordering || '-created_at'}
                style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 500, padding: '0.55rem 2rem 0.55rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FFF', color: '#1A1A2E', cursor: 'pointer', outline: 'none', appearance: 'none' }}>
                {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
              <FiChevronDown size={12} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#8A4FB1' }} />
            </div>
            {/* Filter button */}
            <button onClick={() => setFilterOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: activeFilterCount > 0 ? '#FFF' : '#8A4FB1', background: activeFilterCount > 0 ? '#8A4FB1' : '#F3E8FF', border: 'none', borderRadius: '8px', padding: '0.55rem 1rem', cursor: 'pointer', whiteSpace: 'nowrap', minHeight: '44px' }}>
              <FiSliders size={14} />
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
          </div>
        </div>

        {/* Results count (desktop) */}
        {!loading && (
          <p className="sl-desktop-count" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(26,26,46,0.4)', marginBottom: '1.25rem' }}>
            {filters.search ? `Results for "${filters.search}" — ` : ''}{totalCount} product{totalCount !== 1 ? 's' : ''}
          </p>
        )}

        {/* ── PRODUCT GRID ── */}
        {loading ? (
          <div className="sl-product-grid">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: 'clamp(3rem,8vw,5rem) 2rem', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#BE123C', marginBottom: '1rem' }}>{error}</p>
            <button onClick={() => setFilters({ ordering: '-created_at' })}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.85rem 1.5rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', minHeight: '44px' }}>
              Try Again
            </button>
          </div>
        ) : safeProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'clamp(3rem,8vw,5rem) 2rem', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <FiSearch size={30} color="#8A4FB1" />
            </div>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.4rem,3vw,1.8rem)', color: '#8A4FB1', marginBottom: '0.5rem' }}>No products found</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: 'rgba(26,26,46,0.4)', marginBottom: '1.5rem' }}>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.85rem 1.5rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', minHeight: '44px' }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="sl-product-grid">
            {safeProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={filterOpen} onClose={() => setFilterOpen(false)}
        filters={filters} setFilters={setFilters}
        categories={safeCategories} navigate={navigate}
        clearFilters={clearFilters} activeFilterCount={activeFilterCount}
      />

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes sl-sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        select:focus { border-color: #8A4FB1 !important; box-shadow: 0 0 0 3px rgba(138,79,177,0.1); }

        /* Product grid - responsive */
        .sl-product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
          gap: clamp(0.75rem, 2vw, 1.75rem);
          align-items: start;
        }

        @media (max-width: 640px) {
          .sl-product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.6rem;
          }
          .sl-mobile-add-btn { display: flex !important; }
        }

        @media (max-width: 400px) {
          .sl-product-grid { gap: 0.5rem; }
        }

        @media (max-width: 768px) {
          .sl-desktop-filters { display: none !important; }
          .sl-desktop-count   { display: none; }
          .sl-mobile-toolbar  { display: flex !important; }
          .sl-search-label    { display: none; }
          /* Tighter outer padding on mobile */
          .sl-shop-body { padding-left: 1rem !important; padding-right: 1rem !important; }
        }

        @media (min-width: 769px) {
          .sl-mobile-toolbar { display: none !important; }
        }
      `}</style>
    </div>
  )
}

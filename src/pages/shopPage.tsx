import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag, FiSearch, FiSliders } from 'react-icons/fi'
import { useProducts, useCategories } from '../hooks/useProducts'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../store/cartStore'
import type { Product, ProductFilters } from '../services/api'

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

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  new:         { bg: '#D4AF37',  color: '#1A1A2E' },
  best_seller: { bg: '#8A4FB1',  color: '#FFF'    },
  top_rated:   { bg: '#5B21B6',  color: '#FFF'    },
  trending:    { bg: '#1A1A2E',  color: '#FFF'    },
  premium:     { bg: '#D4AF37',  color: '#1A1A2E' },
}

function ProductCard({ product }: { product: Product }) {
  const { addItem }              = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [adding, setAdding]      = useState(false)
  const [hovered, setHovered]    = useState(false)
  const wishlisted = isWishlisted(product.slug)
  const imgSrc     = product.primary_image?.image || ''
  const badge      = BADGE_COLORS[product.badge] || { bg: '#8A4FB1', color: '#FFF' }

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    setAdding(true)
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: imgSrc, slug: product.slug, category: typeof product.category === 'string' ? product.category : (product.category as any)?.name || '' })
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${hovered ? '#8A4FB1' : 'rgba(138,79,177,0.1)'}`, transition: 'all 0.3s', boxShadow: hovered ? '0 8px 32px rgba(138,79,177,0.12)' : 'none', transform: hovered ? 'translateY(-4px)' : 'none', position: 'relative' }}>

        {/* Image */}
        <div style={{ height: '260px', overflow: 'hidden', background: '#F0E8FA', position: 'relative' }}>
          {imgSrc
            ? <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiShoppingBag size={40} color="rgba(138,79,177,0.2)" />
              </div>
          }

          {/* Badge */}
          {product.badge && (
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: badge.bg, color: badge.color, fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '100px' }}>
              {product.badge_display}
            </div>
          )}

          {/* Wishlist */}
          <button onClick={e => { e.preventDefault(); toggle(product.slug) }}
            style={{ position: 'absolute', top: '12px', right: '12px', width: '34px', height: '34px', borderRadius: '50%', background: wishlisted ? '#FFF1F2' : 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: wishlisted ? '#BE123C' : '#8A4FB1', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <FiHeart size={14} style={{ fill: wishlisted ? '#BE123C' : 'none' }} />
          </button>

          {/* Quick add overlay */}
          <div onClick={handleAdd}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.85rem', background: adding ? 'rgba(22,163,74,0.92)' : 'rgba(26,26,46,0.88)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease' }}>
            <FiShoppingBag size={14} color="#FFF" />
            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF' }}>
              {adding ? '✓ Added!' : 'Quick Add'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '1.1rem' }}>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '5px' }}>
            {typeof product.category === 'string' ? product.category : (product.category as any)?.name}
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '8px', lineHeight: 1.2 }}>{product.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(product.price)}</p>
            {Number(product.review_count) > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ color: '#D4AF37', fontSize: '0.7rem' }}>★</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#1A1A2E' }}>{Number(product.rating).toFixed(1)}</span>
                <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', color: 'rgba(26,26,46,0.4)' }}>({product.review_count})</span>
              </div>
            )}
          </div>
          {!product.in_stock && (
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 600, color: '#BE123C', marginTop: '4px' }}>Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  )
}

// Skeleton loader card
function SkeletonCard() {
  return (
    <div style={{ background: '#FFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.1)' }}>
      <div style={{ height: '260px', background: 'linear-gradient(90deg, #F0E8FA 25%, #E8D5F5 50%, #F0E8FA 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '1.1rem' }}>
        <div style={{ height: '10px', width: '60px', background: '#F0E8FA', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '16px', width: '80%', background: '#F0E8FA', borderRadius: '4px', marginBottom: '8px' }} />
        <div style={{ height: '14px', width: '40%', background: '#F0E8FA', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

export default function ShopPage() {
  const [filters,       setFilters]      = useState<ProductFilters>({ ordering: '-created_at' })
  const [searchInput,   setSearchInput]  = useState('')
  const [filtersOpen,   setFiltersOpen]  = useState(false)
  const { products, loading, error, totalCount } = useProducts(filters)
  const { categories } = useCategories()

  const safeProducts   = Array.isArray(products) ? products : []
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
  }

  const activeFilterCount = Object.keys(filters).filter(k => k !== 'ordering' && (filters as any)[k]).length

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── HERO ── */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #5B21B6 60%, #8A4FB1 100%)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,6vw,5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-30%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(212,175,55,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-40%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(138,79,177,0.15)', pointerEvents: 'none' }} />

        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>Soft Lifee Collection</p>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.75rem', lineHeight: 1 }}>Shop All</h1>
        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
          {loading ? 'Loading...' : `${totalCount} curated product${totalCount !== 1 ? 's' : ''}`}
        </p>

        {/* Search bar in hero */}
        <form onSubmit={handleSearch} style={{ maxWidth: '520px', margin: '0 auto', display: 'flex', gap: '0', background: '#FFF', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
          <input value={searchInput} onChange={e => setSearchInput(e.target.value)}
            placeholder="Search products..."
            style={{ flex: 1, padding: '0.9rem 1.25rem', border: 'none', outline: 'none', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E' }} />
          <button type="submit"
            style={{ padding: '0.9rem 1.5rem', background: '#8A4FB1', color: '#FFF', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
            <FiSearch size={14} /> Search
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem clamp(1.5rem,6vw,5rem)' }}>

        {/* ── FILTER BAR ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', background: '#FFF', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', boxShadow: '0 2px 12px rgba(138,79,177,0.05)' }}>

          {/* Category */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Category</label>
            <select onChange={e => updateFilter('category', e.target.value)} value={filters.category || ''}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.5rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              <option value="">All Categories</option>
              {safeCategories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
            </select>
          </div>

          {/* Badge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Collection</label>
            <select onChange={e => updateFilter('badge', e.target.value)} value={filters.badge || ''}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.5rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              {BADGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          {/* Price range */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Max Price</label>
            <select onChange={e => updateFilter('max_price', e.target.value ? Number(e.target.value) : undefined)} value={filters.max_price || ''}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.5rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              <option value="">Any Price</option>
              <option value="5000">Under ₦5,000</option>
              <option value="10000">Under ₦10,000</option>
              <option value="20000">Under ₦20,000</option>
              <option value="50000">Under ₦50,000</option>
              <option value="100000">Under ₦100,000</option>
            </select>
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginLeft: 'auto' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Sort By</label>
            <select onChange={e => updateFilter('ordering', e.target.value)} value={filters.ordering || '-created_at'}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, padding: '0.5rem 0.85rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', background: '#FAF7FF', color: '#1A1A2E', cursor: 'pointer', outline: 'none' }}>
              {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {/* In Stock toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>Availability</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: '0.5rem 0' }}>
              <input type="checkbox" checked={!!filters.in_stock}
                onChange={e => updateFilter('in_stock', e.target.checked || undefined)}
                style={{ accentColor: '#8A4FB1', width: '14px', height: '14px' }} />
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: '#1A1A2E' }}>In Stock Only</span>
            </label>
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button onClick={clearFilters}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#BE123C', background: '#FFF1F2', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Clear ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Results count */}
        {!loading && (
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(26,26,46,0.45)', marginBottom: '1.5rem' }}>
            {filters.search ? `Search results for "${filters.search}" — ` : ''}{totalCount} product{totalCount !== 1 ? 's' : ''}
          </p>
        )}

        {/* ── PRODUCT GRID ── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.75rem' }}>
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#BE123C', marginBottom: '1rem' }}>{error}</p>
            <button onClick={() => setFilters({ ordering: '-created_at' })}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Try Again
            </button>
          </div>
        ) : safeProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
            <FiSearch size={48} color="#E8D5F5" style={{ marginBottom: '1rem' }} />
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.8rem', color: '#8A4FB1', marginBottom: '0.5rem' }}>No products found</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: 'rgba(26,26,46,0.4)', marginBottom: '1.5rem' }}>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}
              style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.75rem 1.5rem', background: '#8A4FB1', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Clear All Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: '1.75rem' }}>
            {safeProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        select:focus { border-color: #8A4FB1 !important; box-shadow: 0 0 0 3px rgba(138,79,177,0.1); }
      `}</style>
    </div>
  )
}
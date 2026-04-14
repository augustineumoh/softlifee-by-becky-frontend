import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { useProducts, useCategories } from '../hooks/useProducts'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../store/cartStore'
import type { Product, ProductFilters } from '../services/api'

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

const SORT_OPTIONS = [
  { label: 'Newest First',    value: '-created_at'  },
  { label: 'Price: Low–High', value: 'price'        },
  { label: 'Price: High–Low', value: '-price'       },
  { label: 'Best Rated',      value: '-rating'      },
]

const BADGE_OPTIONS = [
  { label: 'All',         value: ''            },
  { label: 'New',         value: 'new'         },
  { label: 'Best Seller', value: 'best_seller' },
  { label: 'Top Rated',   value: 'top_rated'   },
  { label: 'Trending',    value: 'trending'    },
  { label: 'Premium',     value: 'premium'     },
]

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [adding, setAdding] = useState(false)
  const wishlisted = isWishlisted(product.slug)
  const imgSrc = product.primary_image?.image || ''

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setAdding(true)
    addItem({ id: product.id, name: product.name, price: Number(product.price), image: imgSrc, slug: product.slug, category: product.category })
    setTimeout(() => setAdding(false), 1500)
  }

  return (
    <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: '#FFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.1)', transition: 'all 0.3s', position: 'relative' }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#8A4FB1'; el.style.boxShadow='0 8px 32px rgba(138,79,177,0.12)'; el.style.transform='translateY(-4px)' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(138,79,177,0.1)'; el.style.boxShadow='none'; el.style.transform='none' }}>
        <div style={{ height: '240px', overflow: 'hidden', background: '#F0E8FA', position: 'relative' }}>
          {imgSrc
            ? <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.06)' }} onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1)' }} />
            : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color:'#8A4FB1', opacity: 0.4, fontFamily: '"Jost", sans-serif', fontSize: '0.75rem' }}>No Image Yet</div>
          }
          {product.badge && (
            <div style={{ position:'absolute', top:'12px', left:'12px', background: product.badge==='new'?'#D4AF37':'#8A4FB1', color: product.badge==='new'?'#1A1A2E':'#FFF', fontFamily:'"Jost",sans-serif', fontSize:'0.5rem', fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', padding:'4px 10px', borderRadius:'100px' }}>
              {product.badge_display}
            </div>
          )}
          <button onClick={e => { e.preventDefault(); toggle(product.slug) }}
            style={{ position:'absolute', top:'12px', right:'12px', width:'32px', height:'32px', borderRadius:'50%', background:'rgba(255,255,255,0.9)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: wishlisted?'#BE123C':'#8A4FB1' }}>
            <FiHeart size={14} style={{ fill: wishlisted?'#BE123C':'none' }} />
          </button>
          <button onClick={handleAddToCart}
            style={{ position:'absolute', bottom:0, left:0, right:0, padding:'0.75rem', background: adding?'rgba(22,163,74,0.95)':'rgba(26,26,46,0.88)', backdropFilter:'blur(4px)', border:'none', cursor:'pointer', color:'#FFF', fontFamily:'"Jost",sans-serif', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', transition:'all 0.3s' }}>
            <FiShoppingBag size={12} />{adding ? 'Added!' : 'Quick Add'}
          </button>
        </div>
        <div style={{ padding: '1rem' }}>
          <p style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.58rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'#8A4FB1', marginBottom:'4px' }}>{product.category}</p>
          <p style={{ fontFamily:'"Cormorant Garamond",serif', fontSize:'1.05rem', fontWeight:600, color:'#1A1A2E', marginBottom:'6px', lineHeight:1.2 }}>{product.name}</p>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <p style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.95rem', fontWeight:700, color:'#8A4FB1' }}>{formatPrice(product.price)}</p>
            {product.review_count > 0 && <span style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.65rem', color:'rgba(26,26,46,0.4)' }}>⭐ {Number(product.rating).toFixed(1)} ({product.review_count})</span>}
          </div>
          {!product.in_stock && <p style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.6rem', fontWeight:600, color:'#BE123C', marginTop:'4px' }}>Out of Stock</p>}
        </div>
      </div>
    </Link>
  )
}

export default function ShopPage() {
  const [filters, setFilters] = useState<ProductFilters>({ ordering: '-created_at' })
  const { products, loading, error, totalCount } = useProducts(filters)
  const { categories } = useCategories()

  const updateFilter = (key: keyof ProductFilters, value: any) =>
    setFilters(prev => ({ ...prev, [key]: value || undefined }))

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #5B21B6)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,6vw,5rem)', textAlign: 'center' }}>
        <p style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:'0.75rem' }}>Soft Lifee Collection</p>
        <h1 style={{ fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'clamp(2.5rem,5vw,4rem)', fontWeight:700, color:'#FFFFFF', margin:'0 0 0.5rem' }}>Shop All</h1>
        <p style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.85rem', fontWeight:300, color:'rgba(255,255,255,0.6)' }}>{loading ? 'Loading...' : `${totalCount} curated products`}</p>
      </div>

      <div style={{ maxWidth:'1400px', margin:'0 auto', padding:'2rem clamp(1.5rem,6vw,5rem)' }}>
        {/* Filter bar */}
        <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'2rem', flexWrap:'wrap' }}>
          <select onChange={e => updateFilter('category', e.target.value)}
            style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.72rem', padding:'0.6rem 1rem', border:'1px solid rgba(138,79,177,0.2)', borderRadius:'8px', background:'#FFF', color:'#1A1A2E', cursor:'pointer' }}>
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
          </select>
          <select onChange={e => updateFilter('badge', e.target.value)}
            style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.72rem', padding:'0.6rem 1rem', border:'1px solid rgba(138,79,177,0.2)', borderRadius:'8px', background:'#FFF', color:'#1A1A2E', cursor:'pointer' }}>
            {BADGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <select onChange={e => updateFilter('ordering', e.target.value)}
            style={{ fontFamily:'"Jost",sans-serif', fontSize:'0.72rem', padding:'0.6rem 1rem', border:'1px solid rgba(138,79,177,0.2)', borderRadius:'8px', background:'#FFF', color:'#1A1A2E', cursor:'pointer', marginLeft:'auto' }}>
            {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <label style={{ display:'flex', alignItems:'center', gap:'6px', fontFamily:'"Jost",sans-serif', fontSize:'0.72rem', color:'#1A1A2E', cursor:'pointer' }}>
            <input type="checkbox" onChange={e => updateFilter('in_stock', e.target.checked || undefined)} />
            In Stock Only
          </label>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:'1.5rem' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height:'360px', borderRadius:'12px', background:'#F0E8FA', opacity: 0.6 }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'#BE123C' }}>
            <p style={{ fontFamily:'"Jost",sans-serif' }}>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign:'center', padding:'4rem' }}>
            <p style={{ fontFamily:'"Cormorant Garamond",serif', fontStyle:'italic', fontSize:'1.5rem', color:'#8A4FB1' }}>No products found</p>
            <button onClick={() => setFilters({ ordering: '-created_at' })}
              style={{ marginTop:'1rem', fontFamily:'"Jost",sans-serif', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', padding:'0.75rem 1.5rem', background:'#8A4FB1', color:'#FFF', border:'none', borderRadius:'8px', cursor:'pointer' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px,1fr))', gap:'1.5rem' }}>
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </div>
  )
}
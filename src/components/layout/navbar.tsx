import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import img1 from '../../assets/softlifee-logo-white (2).png'
import img2 from '../../assets/softlifee-logo-light (2).png'
import { useCart } from '../../store/cartStore'
import { useAuth } from '../../store/authStore'
import { useSearch } from '../../hooks/useProducts'
import { getCloudinaryUrl } from '../../services/api'

const shopCategories = [
  {
    heading: 'Home Essentials',
    links: [
      { label: 'All Home Essentials', to: '/shop/home-essentials' },
      { label: 'Kitchen Products',    to: '/shop/home-essentials/kitchen' },
      { label: 'Smart Home Gadgets',  to: '/shop/home-essentials/smart-gadgets' },
      { label: 'Bathroom Essentials', to: '/shop/home-essentials/bathroom' },
      { label: 'Lighting & Lamps',    to: '/shop/home-essentials/lighting' },
      { label: 'Organizers',          to: '/shop/home-essentials/organizers' },
    ],
  },
  {
    heading: 'Skincare',
    links: [
      { label: 'All Skincare', to: '/shop/skincare' },
      { label: 'Face Care',    to: '/shop/skincare/face' },
      { label: 'Body Care',    to: '/shop/skincare/body' },
      { label: 'Travel Kits',  to: '/shop/skincare/travel-kits' },
    ],
  },
  {
    heading: 'Accessories & Style',
    links: [
      { label: 'All Accessories',      to: '/shop/accessories' },
      { label: 'Jewelry & Organizers', to: '/shop/accessories/jewelry' },
      { label: 'Cups & Drinkware',     to: '/shop/accessories/drinkware' },
      { label: 'Bags & Pouches',       to: '/shop/accessories/bags' },
    ],
  },
  {
    heading: "Women's Essentials",
    links: [
      { label: "All Women's",  to: '/shop/womens' },
      { label: 'Personal Care',to: '/shop/womens/personal-care' },
    ],
  },
]

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [shopOpen,       setShopOpen]       = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [searchOpen,     setSearchOpen]     = useState(false)
  const closeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchRef   = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLInputElement>(null)
  const navigate    = useNavigate()
  const { pathname } = useLocation()

  // Cart & Auth
  const { items }          = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const cartCount = items.reduce((s, i) => s + i.quantity, 0)

  // Search
  const { query, setQuery, results, loading: searchLoading } = useSearch()

  const lightHeroPages = ['/about', '/gift-ideas', '/order-success', '/login', '/register', '/product', '/shop','/cart','/checkout','/*', '/account']
  const hasLightHero   = lightHeroPages.some(p => pathname.startsWith(p))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 50)
  }, [searchOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [pathname])

  const handleMouseEnterShop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setShopOpen(true)
  }
  const handleMouseLeaveShop = () => {
    closeTimer.current = setTimeout(() => setShopOpen(false), 120)
  }

  const handleSearchSelect = (slug: string, type: string) => {
    if (type === 'product') navigate(`/product/${slug}`)
    else navigate(`/shop?category=${slug}`)
    setSearchOpen(false)
    setQuery('')
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  const isLight   = !scrolled && !shopOpen
  const textColor = isLight ? (hasLightHero ? '#1A1A2E' : '#FFFFFF') : '#1A1A2E'

  return (
    <>
      <style>{`
        @keyframes sl-dropDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sl-mobileIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes sl-searchIn {
          from { opacity: 0; transform: translateY(-4px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        .sl-desktop-only { display: flex !important; }
        .sl-mobile-only  { display: none  !important; }
        @media (max-width: 900px) {
          .sl-desktop-only { display: none  !important; }
          .sl-mobile-only  { display: flex  !important; }
        }
        .sl-nav-link {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none; transition: opacity 0.25s; white-space: nowrap;
        }
        .sl-nav-link:hover { opacity: 0.6; }
        .sl-drop-link {
          display: block; font-family: 'Jost', sans-serif;
          font-size: 0.85rem; font-weight: 400; color: #1A1A2E;
          text-decoration: none; padding: 0.3rem 0;
          transition: color 0.15s, padding-left 0.2s;
        }
        .sl-drop-link:hover { color: #8A4FB1; padding-left: 6px; }
        .sl-mob-link {
          display: block; font-family: 'Jost', sans-serif;
          font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #1A1A2E; text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(138,79,177,0.12);
          transition: color 0.2s;
        }
        .sl-mob-link:hover { color: #8A4FB1; }
        .sl-search-result:hover { background: #F3E8FF !important; }
        .sl-icon-btn:hover { opacity: 0.7; }
        .sl-icon-btn { transition: opacity 0.2s; }

        /* Mobile navbar overrides */
        @media (max-width: 900px) {
          .sl-nav-inner { padding: 0 1.25rem !important; }
          .sl-nav-icons { gap: 1rem !important; }
          .sl-nav-logo-link { flex-shrink: 1 !important; min-width: 0; overflow: hidden; }
          /* Constrain logo by width so it can't overflow the flex row */
          .sl-nav-logo  {
            height: auto !important;
            width: clamp(140px, 40vw, 210px) !important;
            max-width: 40vw !important;
            object-fit: contain !important;
          }
        }
        @media (max-width: 480px) {
          .sl-nav-inner { padding: 0 1rem !important; }
          .sl-nav-icons { gap: 0.65rem !important; }
          .sl-nav-logo  {
            width: clamp(120px, 36vw, 175px) !important;
            max-width: 36vw !important;
          }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        transition: 'all 0.4s ease',
        backgroundColor: scrolled || shopOpen ? 'rgba(250,247,255,0.97)' : 'transparent',
        backdropFilter:  scrolled || shopOpen ? 'blur(18px)' : 'none',
        borderBottom:    scrolled || shopOpen ? '1px solid rgba(138,79,177,0.15)' : '1px solid transparent',
        boxShadow:       scrolled ? '0 2px 24px rgba(59,16,88,0.08)' : 'none',
      }}>
        <div className="sl-nav-inner" style={{
          maxWidth: '1320px', margin: '0 auto',
          padding: '0 2rem', height: '68px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* ── LEFT LINKS (desktop) ── */}
          <div className="sl-desktop-only" style={{ alignItems: 'center', gap: '2.5rem', flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <button
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
                onClick={() => { navigate('/shop'); setShopOpen(false) }}
                className="sl-nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: '8px 0', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.4s' }}>
                Shop
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.3s', transform: shopOpen ? 'rotate(180deg)' : 'none' }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
            {[['New Arrivals', '/new-arrivals'], ['About Us', '/about'], ['Contact Us', '/contact']].map(([label, path]) => (
              <Link key={label} to={path} className="sl-nav-link" style={{ color: textColor, transition: 'color 0.4s' }}>{label}</Link>
            ))}
          </div>

          {/* ── CENTER LOGO ── */}
          <Link to="/" className="sl-nav-logo-link" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <img
              src={isLight && !hasLightHero ? img1 : img2}
              alt="Soft Lifee by Becky"
              className="sl-nav-logo"
              style={{ height: '190px', width: 'auto', display: 'block', objectFit: 'contain', transition: 'opacity 0.4s' }}
            />
          </Link>

          {/* ── RIGHT ICONS ── */}
          <div className="sl-nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flex: 1, justifyContent: 'flex-end' }}>

            {/* Search button */}
            <button className="sl-icon-btn" title="Search"
              onClick={() => setSearchOpen(o => !o)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: '4px', lineHeight: 0, transition: 'color 0.4s' }}>
              {searchOpen
                ? <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              }
            </button>

            {/* Account — shows name if logged in */}
            {isAuthenticated && user ? (
              <div style={{ position: 'relative' }} className="sl-desktop-only">
                <Link to="/account" className="sl-icon-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', color: textColor, textDecoration: 'none', transition: 'color 0.4s' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1.5px solid rgba(138,79,177,0.3)' }}>
                    {user.avatar
                      ? <img src={getCloudinaryUrl(user.avatar, 100)} alt={user.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#FFF' }}>{user.first_name?.[0]?.toUpperCase() || '?'}</span>
                    }
                  </div>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: textColor, transition: 'color 0.4s' }}>
                    {user.first_name}
                  </span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="sl-icon-btn" title="Account"
                style={{ color: textColor, lineHeight: 0, transition: 'color 0.4s' }}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>
            )}

            {/* Cart with live count */}
            <Link to="/cart" className="sl-icon-btn" title="Cart"
              style={{ position: 'relative', color: textColor, lineHeight: 0, transition: 'color 0.4s' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '-7px', right: '-7px', background: '#8A4FB1', color: '#FFF', borderRadius: '50%', width: '15px', height: '15px', fontSize: '0.55rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost', sans-serif" }}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger (mobile) */}
            <button onClick={() => setMobileOpen(o => !o)} className="sl-mobile-only" aria-label="Toggle menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: textColor, padding: '6px', lineHeight: 0, transition: 'color 0.4s' }}>
              {mobileOpen
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        {searchOpen && (
          <div ref={searchRef} style={{ borderTop: '1px solid rgba(138,79,177,0.1)', background: 'rgba(250,247,255,0.98)', backdropFilter: 'blur(18px)', padding: '1rem 2rem', animation: 'sl-searchIn 0.2s ease' }}>
            <form onSubmit={handleSearchSubmit} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1.5px solid rgba(138,79,177,0.25)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(138,79,177,0.08)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2" style={{ marginLeft: '14px', flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  style={{ flex: 1, padding: '0.75rem 1rem', border: 'none', outline: 'none', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: '#1A1A2E', background: 'transparent' }}
                />
                {query && (
                  <button type="button" onClick={() => setQuery('')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', padding: '0 12px', lineHeight: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                )}
                <button type="submit"
                  style={{ background: '#8A4FB1', color: '#FFF', border: 'none', cursor: 'pointer', padding: '0.75rem 1.25rem', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  Search
                </button>
              </div>

              {/* Autocomplete results */}
              {query.length >= 2 && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#FFF', borderRadius: '10px', border: '1px solid rgba(138,79,177,0.15)', boxShadow: '0 8px 32px rgba(138,79,177,0.12)', zIndex: 10000, overflow: 'hidden', animation: 'sl-searchIn 0.15s ease' }}>
                  {searchLoading ? (
                    <div style={{ padding: '1rem', textAlign: 'center', fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.4)' }}>Searching...</div>
                  ) : results.length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.4)' }}>No results for "{query}"</div>
                  ) : (
                    <>
                      {results.map((item, i) => (
                        <button key={i} className="sl-search-result"
                          onClick={() => handleSearchSelect(item.slug, item.type)}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1rem', background: 'none', border: 'none', borderBottom: i < results.length - 1 ? '1px solid rgba(138,79,177,0.06)' : 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}>
                          {item.image ? (
                            <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                          ) : (
                            <div style={{ width: '40px', height: '40px', borderRadius: '6px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', color: 'rgba(26,26,46,0.45)', margin: '2px 0 0', textTransform: 'capitalize' }}>
                              {item.type === 'category' ? '📁 Category' : item.category}
                            </p>
                          </div>
                          {item.price && (
                            <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#8A4FB1', flexShrink: 0 }}>{formatPrice(item.price)}</span>
                          )}
                        </button>
                      ))}
                      <button onClick={handleSearchSubmit as any}
                        style={{ width: '100%', padding: '0.75rem 1rem', background: '#FAF7FF', border: 'none', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 600, color: '#8A4FB1', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        See all results for "{query}"
                      </button>
                    </>
                  )}
                </div>
              )}
            </form>
          </div>
        )}

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div style={{ backgroundColor: '#FAF7FF', borderTop: '1px solid rgba(138,79,177,0.15)', padding: '1rem 2rem 2rem', maxHeight: '80vh', overflowY: 'auto', animation: 'sl-mobileIn 0.25s ease' }}>

            {/* Mobile search */}
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A4FB1" strokeWidth="2" style={{ marginLeft: '12px', flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..."
                  style={{ flex: 1, padding: '0.65rem 0.75rem', border: 'none', outline: 'none', fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: '#1A1A2E', background: 'transparent' }} />
                <button type="submit" style={{ background: '#8A4FB1', color: '#FFF', border: 'none', cursor: 'pointer', padding: '0.65rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Go</button>
              </div>
              {/* Mobile autocomplete */}
              {query.length >= 2 && results.length > 0 && (
                <div style={{ background: '#FFF', border: '1px solid rgba(138,79,177,0.15)', borderRadius: '8px', marginTop: '4px', overflow: 'hidden' }}>
                  {results.slice(0, 4).map((item, i) => (
                    <button key={i} onClick={() => handleSearchSelect(item.slug, item.type)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.65rem 0.75rem', background: 'none', border: 'none', borderBottom: i < 3 ? '1px solid rgba(138,79,177,0.06)' : 'none', cursor: 'pointer', textAlign: 'left' }}>
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', color: '#1A1A2E', flex: 1 }}>{item.name}</span>
                      {item.price && <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.price)}</span>}
                    </button>
                  ))}
                </div>
              )}
            </form>

            <Link to="/" className="sl-mob-link">Home</Link>

            {/* Mobile Shop accordion */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(138,79,177,0.12)' }}>
                <Link to="/shop" className="sl-mob-link" style={{ border: 'none', flex: 1 }}>Shop</Link>
                <button onClick={() => setMobileShopOpen(o => !o)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A4FB1', padding: '4px 0 4px 8px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transform: mobileShopOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
              {mobileShopOpen && (
                <div style={{ paddingLeft: '1rem', paddingBottom: '0.75rem', animation: 'sl-mobileIn 0.2s ease' }}>
                  {shopCategories.map(col => (
                    <div key={col.heading} style={{ marginBottom: '0.75rem' }}>
                      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', margin: '0.8rem 0 0.4rem' }}>{col.heading}</p>
                      {col.links.map(link => (
                        <Link key={link.to} to={link.to} onClick={() => { setMobileOpen(false); setMobileShopOpen(false) }}
                          style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '0.83rem', fontWeight: 400, color: '#5B21B6', textDecoration: 'none', padding: '0.25rem 0', transition: 'color 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#8A4FB1' }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#5B21B6' }}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {[['New Arrivals', '/new-arrivals'], ['About Us', '/about'], ['Contact', '/contact']].map(([label, path]) => (
              <Link key={label} to={path} className="sl-mob-link">{label}</Link>
            ))}

            {/* Mobile auth */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(138,79,177,0.12)' }}>
              {isAuthenticated && user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link to="/account" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#8A4FB1', textDecoration: 'none' }}>
                    👤 My Account ({user.first_name})
                  </Link>
                  <button onClick={() => logout()}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#BE123C', textAlign: 'left', padding: 0 }}>
                    Log Out
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/login" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none' }}>Login</Link>
                  <Link to="/register" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5B21B6', textDecoration: 'none' }}>Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── DESKTOP DROPDOWN ── */}
      {shopOpen && (
        <div
          onMouseEnter={handleMouseEnterShop}
          onMouseLeave={handleMouseLeaveShop}
          style={{ position: 'fixed', top: '68px', left: 0, right: 0, backgroundColor: '#FDFBFF', borderTop: '2px solid #8A4FB1', borderBottom: '1px solid rgba(138,79,177,0.15)', boxShadow: '0 16px 48px rgba(59,16,88,0.10)', zIndex: 9998, padding: '2.5rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem', animation: 'sl-dropDown 0.2s ease' }}>
          {shopCategories.map(col => (
            <div key={col.heading}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '0.9rem', marginTop: 0 }}>{col.heading}</p>
              {col.links.map(link => (
                <Link key={link.to} to={link.to} className="sl-drop-link"
                  onClick={() => { setShopOpen(false); if (closeTimer.current) clearTimeout(closeTimer.current) }}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
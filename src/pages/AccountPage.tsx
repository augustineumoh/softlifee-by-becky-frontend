import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Mock data — replace with real API data ────────────────────────────────────
const mockUser = {
  firstName: 'Adaeze',
  lastName:  'Okonkwo',
  email:     'adaeze@email.com',
  phone:     '+234 800 000 0000',
  avatar:    'AO',
  joinDate:  'March 2025',
}

const mockOrders = [
  { id: 'SL-2025-00142', date: '24 Mar 2025', status: 'Delivered',   total: 27500, items: 3, statusColor: '#16A34A' },
  { id: 'SL-2025-00098', date: '10 Mar 2025', status: 'In Transit',  total: 15000, items: 1, statusColor: '#D97706' },
  { id: 'SL-2025-00071', date: '28 Feb 2025', status: 'Delivered',   total: 48500, items: 4, statusColor: '#16A34A' },
  { id: 'SL-2025-00043', date: '12 Feb 2025', status: 'Delivered',   total: 8500,  items: 1, statusColor: '#16A34A' },
]

const mockAddresses = [
  { id: 1, label: 'Home',   name: 'Adaeze Okonkwo', line: '14 Adeola Street, Lekki Phase 1', city: 'Lagos', state: 'Lagos State', default: true },
  { id: 2, label: 'Office', name: 'Adaeze Okonkwo', line: '5 Victoria Island Blvd', city: 'Lagos', state: 'Lagos State', default: false },
]

const mockWishlist = [
  { id: 1, name: 'Jewelry Box',       price: 32000, image: null, slug: '3-layers-jewelry-box-with-key', category: 'Home Essentials' },
  { id: 2, name: 'Matte Tumbler',     price: 18000, image: null, slug: 'matte-stanley-tumbler',         category: 'Accessories'     },
  { id: 3, name: 'Crystal LED Lamp',  price: 13000, image: null, slug: 'crystal-diamond-led-lamp',      category: 'Home Essentials' },
]

const mockRecent = [
  { id: 1, name: 'Diffuser',          price: 15000, slug: 'diffuser',              category: 'Home Essentials' },
  { id: 2, name: 'Green Stick Mask',  price: 5000,  slug: 'green-stick-mask',      category: 'Skincare'        },
  { id: 3, name: 'Smart Watch S8',    price: 25000, slug: 'smart-watch-series-8',  category: 'Accessories'     },
  { id: 4, name: 'Stanley Cup',       price: 17000, slug: 'stanley-cup',           category: 'Accessories'     },
]

const formatPrice = (n: number) => '₦' + n.toLocaleString('en-NG')

type Tab = 'orders' | 'wishlist' | 'addresses' | 'profile' | 'recent'

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'orders',    label: 'My Orders',       icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { id: 'wishlist',  label: 'Wishlist',         icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { id: 'addresses', label: 'Addresses',        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { id: 'recent',    label: 'Recently Viewed',  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { id: 'profile',   label: 'Profile Settings', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('orders')
  const [profileForm, setProfileForm] = useState({ firstName: mockUser.firstName, lastName: mockUser.lastName, email: mockUser.email, phone: mockUser.phone })
  const [profileSaved, setProfileSaved] = useState(false)
  const [avatarUrl, setAvatarUrl]       = useState<string | null>(null)
  const [avatarHovered, setAvatarHovered] = useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const saveProfile = () => { setProfileSaved(true); setTimeout(() => setProfileSaved(false), 2500) }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setAvatarUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ background: 'linear-gradient(180deg, #FAF7FF 0%, #F3E8FF 40%, #FAF7FF 100%)', minHeight: '100vh', paddingTop: '68px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(2rem,5vw,4rem) clamp(1.5rem,4vw,3rem)' }}>

        {/* ── PROFILE HEADER ── */}
        <div style={{ background: 'linear-gradient(135deg, #8A4FB1, #5B21B6)', borderRadius: '16px', padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '40px', bottom: '-60px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(212,175,55,0.08)', pointerEvents: 'none' }} />
          {/* Clickable avatar with camera overlay */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
            style={{ width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0, position: 'relative', cursor: 'pointer', border: '2px solid rgba(255,255,255,0.4)', overflow: 'hidden', transition: 'border-color 0.2s', borderColor: avatarHovered ? '#D4AF37' : 'rgba(255,255,255,0.4)' }}>
            {avatarUrl
              ? <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#FFFFFF' }}>{mockUser.avatar}</span>
                </div>
            }
            {/* Camera overlay on hover */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,46,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: avatarHovered ? 1 : 0, transition: 'opacity 0.25s', gap: '3px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.45rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFF' }}>Change</span>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.6rem', fontWeight: 600, color: '#FFFFFF', margin: '0 0 4px 0', lineHeight: 1 }}>
              {mockUser.firstName} {mockUser.lastName}
            </p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: 'rgba(255,255,255,0.65)', margin: 0 }}>{mockUser.email}</p>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>Member since {mockUser.joinDate}</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[{ val: mockOrders.length, label: 'Orders' }, { val: mockWishlist.length, label: 'Wishlist' }, { val: mockAddresses.length, label: 'Addresses' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1, marginBottom: '2px' }}>{s.val}</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYOUT ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', overflow: 'hidden', position: 'sticky', top: '88px' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.9rem 1.2rem', background: activeTab === tab.id ? '#F3E8FF' : 'none', border: 'none', borderLeft: `3px solid ${activeTab === tab.id ? '#8A4FB1' : 'transparent'}`, cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? '#8A4FB1' : '#1A1A2E', textAlign: 'left', transition: 'all 0.2s' }}>
                <span style={{ color: activeTab === tab.id ? '#8A4FB1' : 'rgba(26,26,46,0.4)', lineHeight: 0 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
            <div style={{ height: '1px', background: 'rgba(138,79,177,0.1)', margin: '0.5rem 0' }} />
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '0.9rem 1.2rem', background: 'none', border: 'none', borderLeft: '3px solid transparent', cursor: 'pointer', fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 400, color: '#BE123C', textAlign: 'left', transition: 'all 0.2s' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>

          {/* Main content */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)', padding: '2rem', minHeight: '500px' }}>

            {/* ── ORDERS ── */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>My Orders</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {mockOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid rgba(138,79,177,0.1)', borderRadius: '10px', padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', transition: 'border-color 0.2s' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#8A4FB1' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,79,177,0.1)' }}>
                      <div>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '3px' }}>{order.id}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6' }}>{order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#8A4FB1' }}>{formatPrice(order.total)}</p>
                        <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: order.statusColor, background: `${order.statusColor}15`, padding: '4px 10px', borderRadius: '100px' }}>{order.status}</span>
                        <Link to={`/account/orders/${order.id}`} style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', textDecoration: 'none', border: '1px solid rgba(138,79,177,0.25)', padding: '5px 12px', borderRadius: '6px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8A4FB1' }}>
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── WISHLIST ── */}
            {activeTab === 'wishlist' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>My Wishlist</h2>
                {mockWishlist.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem', color: '#5B21B6' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem' }}>Your wishlist is empty</p>
                    <Link to="/shop" style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#8A4FB1', textDecoration: 'none', display: 'inline-block', marginTop: '1rem', border: '1px solid #8A4FB1', padding: '0.65rem 1.5rem', borderRadius: '6px' }}>Start Shopping</Link>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                    {mockWishlist.map(item => (
                      <div key={item.id} style={{ border: '1px solid rgba(138,79,177,0.1)', borderRadius: '10px', overflow: 'hidden', transition: 'all 0.25s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#8A4FB1'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(138,79,177,0.1)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,79,177,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                        <div style={{ height: '140px', background: '#F0E8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C4A8D4" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 4-4 4 4 4-4 4 4"/><path d="M3 15h18"/></svg>
                        </div>
                        <div style={{ padding: '0.85rem' }}>
                          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '3px', lineHeight: 1.2 }}>{item.name}</p>
                          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#8A4FB1', marginBottom: '8px' }}>{formatPrice(item.price)}</p>
                          <Link to={`/product/${item.slug}`} style={{ display: 'block', textAlign: 'center', fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '6px', borderRadius: '6px', transition: 'background 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                            Add to Cart
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── ADDRESSES ── */}
            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Saved Addresses</h2>
                  <button style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', padding: '0.65rem 1.2rem', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                    + Add Address
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                  {mockAddresses.map(addr => (
                    <div key={addr.id} style={{ border: `1px solid ${addr.default ? '#8A4FB1' : 'rgba(138,79,177,0.1)'}`, borderRadius: '10px', padding: '1.2rem', position: 'relative', background: addr.default ? '#FAF7FF' : '#FFFFFF' }}>
                      {addr.default && <span style={{ position: 'absolute', top: '10px', right: '10px', fontFamily: '"Jost", sans-serif', fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A4FB1', background: '#EDE0F7', padding: '3px 8px', borderRadius: '100px' }}>Default</span>}
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '6px' }}>{addr.label}</p>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '3px' }}>{addr.name}</p>
                      <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 300, color: '#5B21B6', lineHeight: 1.6 }}>{addr.line}<br />{addr.city}, {addr.state}</p>
                      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        <button style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A4FB1', background: 'none', border: '1px solid rgba(138,79,177,0.25)', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#8A4FB1'; e.currentTarget.style.color = '#FFF' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#8A4FB1' }}>
                          Edit
                        </button>
                        {!addr.default && <button style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#BE123C', background: 'none', border: '1px solid rgba(190,18,60,0.2)', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}>Remove</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── RECENTLY VIEWED ── */}
            {activeTab === 'recent' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Recently Viewed</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                  {mockRecent.map(item => (
                    <Link key={item.id} to={`/product/${item.slug}`} style={{ textDecoration: 'none', border: '1px solid rgba(138,79,177,0.1)', borderRadius: '10px', overflow: 'hidden', transition: 'all 0.25s', display: 'block' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#8A4FB1'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(138,79,177,0.1)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(138,79,177,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                      <div style={{ height: '130px', background: '#F0E8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C4A8D4" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 9 4-4 4 4 4-4 4 4"/><path d="M3 15h18"/></svg>
                      </div>
                      <div style={{ padding: '0.85rem' }}>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A4FB1', marginBottom: '3px' }}>{item.category}</p>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2, marginBottom: '3px' }}>{item.name}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── PROFILE SETTINGS ── */}
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Profile Settings</h2>

                {profileSaved && (
                  <div style={{ background: '#F0FDF4', border: '1px solid rgba(22,163,74,0.2)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, color: '#16A34A' }}>Profile updated successfully!</span>
                  </div>
                )}

                {/* ── PHOTO UPLOAD ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: '#FAF7FF', border: '1px solid rgba(138,79,177,0.12)', borderRadius: '12px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  {/* Avatar preview */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{ width: '88px', height: '88px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #8A4FB1', background: '#F0E8FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {avatarUrl
                        ? <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', fontWeight: 600, color: '#8A4FB1' }}>{mockUser.avatar}</span>
                      }
                    </div>
                    {/* Small camera badge */}
                    <button onClick={() => fileInputRef.current?.click()}
                      style={{ position: 'absolute', bottom: 0, right: 0, width: '26px', height: '26px', borderRadius: '50%', background: '#8A4FB1', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                    </button>
                  </div>

                  {/* Upload info + buttons */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px' }}>Profile Photo</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', fontWeight: 300, color: '#5B21B6', marginBottom: '1rem', lineHeight: 1.6 }}>
                      Upload a photo to personalise your account. JPG, PNG or GIF — max 5MB.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button onClick={() => fileInputRef.current?.click()}
                        style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        Upload Photo
                      </button>
                      {avatarUrl && (
                        <button onClick={() => setAvatarUrl(null)}
                          style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#BE123C', background: 'none', border: '1px solid rgba(190,18,60,0.25)', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#FFF1F2' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none' }}>
                          Remove
                        </button>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '520px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      { field: 'firstName', label: 'First Name' },
                      { field: 'lastName',  label: 'Last Name'  },
                    ].map(f => (
                      <div key={f.field}>
                        <label style={profileLabelStyle}>{f.label}</label>
                        <input type="text" value={profileForm[f.field as keyof typeof profileForm]}
                          onChange={e => setProfileForm(p => ({ ...p, [f.field]: e.target.value }))}
                          style={profileInputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                      </div>
                    ))}
                  </div>
                  {[
                    { field: 'email', label: 'Email Address', type: 'email' },
                    { field: 'phone', label: 'Phone Number',  type: 'tel'   },
                  ].map(f => (
                    <div key={f.field}>
                      <label style={profileLabelStyle}>{f.label}</label>
                      <input type={f.type} value={profileForm[f.field as keyof typeof profileForm]}
                        onChange={e => setProfileForm(p => ({ ...p, [f.field]: e.target.value }))}
                        style={profileInputStyle}
                        onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                    </div>
                  ))}

                  <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(138,79,177,0.1)' }}>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '1rem' }}>Change Password</p>
                    {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
                      <div key={label} style={{ marginBottom: '0.85rem' }}>
                        <label style={profileLabelStyle}>{label}</label>
                        <input type="password" placeholder="••••••••" style={profileInputStyle}
                          onFocus={e => { e.currentTarget.style.borderColor = '#8A4FB1' }}
                          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(138,79,177,0.2)' }} />
                      </div>
                    ))}
                  </div>

                  <button onClick={saveProfile}
                    style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', padding: '1rem 2rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s', alignSelf: 'flex-start' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 220px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

const profileLabelStyle: React.CSSProperties = { display: 'block', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#1A1A2E', marginBottom: '6px' }
const profileInputStyle: React.CSSProperties = { width: '100%', padding: '0.8rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', border: '1px solid rgba(138,79,177,0.2)', borderRadius: '8px', outline: 'none', background: '#FAF7FF', color: '#1A1A2E', boxSizing: 'border-box', transition: 'border-color 0.2s' }
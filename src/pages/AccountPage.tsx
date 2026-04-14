import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut, FiEdit2, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '../store/authStore'
import { useOrders } from '../hooks/useOrders'
import { useWishlist } from '../hooks/useWishlist'

const formatPrice = (n: string | number) => '₦' + Number(n).toLocaleString('en-NG')

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending:    { bg: '#FEF9C3', color: '#854D0E' },
  confirmed:  { bg: '#F3E8FF', color: '#5B21B6' },
  processing: { bg: '#EDE9FE', color: '#4C1D95' },
  shipped:    { bg: '#DBEAFE', color: '#1E40AF' },
  delivered:  { bg: '#DCFCE7', color: '#166534' },
  cancelled:  { bg: '#FEE2E2', color: '#991B1B' },
}

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { orders, loading: ordersLoading } = useOrders()
  const { items: wishlistItems } = useWishlist()
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { state: { from: '/account' } })
  }, [isAuthenticated])

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders',   label: 'My Orders',  icon: <FiPackage size={16}/>,  count: orders.length },
    { id: 'wishlist', label: 'Wishlist',    icon: <FiHeart size={16}/>,    count: wishlistItems.length },
    { id: 'profile',  label: 'Profile',    icon: <FiUser size={16}/> },
    { id: 'addresses',label: 'Addresses',  icon: <FiMapPin size={16}/> },
  ]

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #5B21B6)', padding: '3rem clamp(1.5rem,6vw,5rem) 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', fontWeight: 700, color: '#FFF' }}>{user.first_name?.[0]?.toUpperCase()}</span>
            </div>
            <div>
              <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>Hi, {user.first_name}!</h1>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', margin: '4px 0 0' }}>{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.6rem 1rem', cursor: 'pointer', transition: 'all 0.2s' }}>
            <FiLogOut size={14}/> Log Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: '1200px', margin: '2rem auto 0', display: 'flex', gap: '0', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.75rem 1.25rem', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? '#D4AF37' : 'transparent'}`, color: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
              {tab.icon} {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span style={{ background: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.2)', color: activeTab === tab.id ? '#1A1A2E' : '#FFF', borderRadius: '100px', padding: '1px 7px', fontSize: '0.6rem', fontWeight: 700 }}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem clamp(1.5rem,6vw,5rem)' }}>

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>My Orders</h2>
            {ordersLoading ? (
              <p style={{ fontFamily: '"Jost", sans-serif', color: 'rgba(26,26,46,0.4)' }}>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: '#FFF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)' }}>
                <FiPackage size={48} color="#E8D5F5" style={{ marginBottom: '1rem' }} />
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.3rem', color: '#8A4FB1' }}>No orders yet</p>
                <Link to="/shop" style={{ display: 'inline-block', marginTop: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Start Shopping</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => {
                  const sc = STATUS_COLORS[order.status] || { bg: '#F3E8FF', color: '#5B21B6' }
                  return (
                    <div key={order.id} style={{ background: '#FFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(138,79,177,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>{order.order_number}</p>
                          <span style={{ background: sc.bg, color: sc.color, fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px' }}>{order.status_display}</span>
                        </div>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(26,26,46,0.45)', margin: 0 }}>
                          {new Date(order.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>{formatPrice(order.total)}</p>
                        <FiChevronRight size={16} color="#8A4FB1" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── WISHLIST TAB ── */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>My Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: '#FFF', borderRadius: '12px', border: '1px solid rgba(138,79,177,0.1)' }}>
                <FiHeart size={48} color="#E8D5F5" style={{ marginBottom: '1rem' }} />
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.3rem', color: '#8A4FB1' }}>Your wishlist is empty</p>
                <Link to="/shop" style={{ display: 'inline-block', marginTop: '1rem', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Explore Products</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1.25rem' }}>
                {wishlistItems.map(item => (
                  <Link key={item.id} to={`/product/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#FFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.1)', transition: 'all 0.25s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#8A4FB1'; el.style.boxShadow='0 6px 24px rgba(138,79,177,0.1)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(138,79,177,0.1)'; el.style.boxShadow='none' }}>
                      <div style={{ height: '180px', background: '#F0E8FA', overflow: 'hidden' }}>
                        {item.product.primary_image?.image && <img src={item.product.primary_image.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                      </div>
                      <div style={{ padding: '0.9rem' }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', lineHeight: 1.2 }}>{item.product.name}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.product.price)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '540px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Profile Details</h2>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)' }}>
              {[
                { label: 'First Name',  value: user.first_name },
                { label: 'Last Name',   value: user.last_name || '—' },
                { label: 'Email',       value: user.email },
                { label: 'Phone',       value: user.phone || '—' },
                { label: 'Member Since',value: new Date(user.date_joined).toLocaleDateString('en-NG', { month: 'long', year: 'numeric' }) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid rgba(138,79,177,0.06)' }}>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)' }}>{row.label}</span>
                  <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', color: '#1A1A2E', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
              <Link to="/account/edit"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '1.5rem', fontFamily: '"Jost", sans-serif', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>
                <FiEdit2 size={12}/> Edit Profile
              </Link>
            </div>
          </div>
        )}

        {/* ── ADDRESSES TAB ── */}
        {activeTab === 'addresses' && (
          <div style={{ maxWidth: '640px' }}>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>Saved Addresses</h2>
            <div style={{ background: '#FFF', borderRadius: '12px', padding: '2rem', border: '1px solid rgba(138,79,177,0.1)', textAlign: 'center' }}>
              <FiMapPin size={40} color="#E8D5F5" style={{ marginBottom: '1rem' }}/>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', color: 'rgba(26,26,46,0.45)' }}>Address management coming soon</p>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.35)', marginTop: '4px' }}>You can save delivery addresses here for faster checkout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
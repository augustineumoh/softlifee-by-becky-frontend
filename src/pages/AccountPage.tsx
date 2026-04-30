import { useState, useEffect } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut, FiEdit2, FiChevronRight, FiCalendar, FiPhone, FiMail, FiShield, FiShoppingBag, FiCheck, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { useAuth } from '../store/authStore'
import { getCloudinaryUrl, authAPI } from '../services/api'
import type { Address } from '../services/api'
import { useCart } from '../store/cartStore'
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

const NG_STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara']

const EMPTY_FORM = { label: '', full_name: '', phone: '', address: '', city: '', state: '', is_default: false }

function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState<Address | null>(null)
  const [form, setForm]           = useState(EMPTY_FORM)
  const [saving, setSaving]       = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError]         = useState('')

  const load = async () => {
    setLoading(true)
    try { setAddresses(await authAPI.getAddresses() as Address[]) } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const openAdd = () => {
    setEditing(null); setForm(EMPTY_FORM); setError(''); setShowForm(true)
  }
  const openEdit = (a: Address) => {
    setEditing(a)
    setForm({ label: a.label, full_name: a.full_name, phone: a.phone, address: a.address, city: a.city, state: a.state, is_default: a.is_default })
    setError(''); setShowForm(true)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      if (editing) {
        const updated = await authAPI.updateAddress(editing.id, form) as Address
        setAddresses(prev => prev.map(a => a.id === editing.id ? updated : a))
      } else {
        const created = await authAPI.addAddress(form) as Address
        setAddresses(prev => [...prev, created])
      }
      setShowForm(false)
    } catch { setError('Something went wrong. Please try again.') }
    setSaving(false)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this address?')) return
    setDeletingId(id)
    try { await authAPI.deleteAddress(id); setAddresses(prev => prev.filter(a => a.id !== id)) } catch {}
    setDeletingId(null)
  }

  const handleSetDefault = async (a: Address) => {
    try { await authAPI.updateAddress(a.id, { is_default: true }); await load() } catch {}
  }

  const inputStyle: CSSProperties = { width: '100%', padding: '0.65rem 0.9rem', fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', border: '1.5px solid rgba(138,79,177,0.2)', borderRadius: '8px', outline: 'none', color: '#1A1A2E', background: '#FAF7FF', boxSizing: 'border-box' }
  const labelStyle: CSSProperties = { fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.45)', display: 'block', marginBottom: '4px' }

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,1.8rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Saved Addresses</h2>
        {!showForm && (
          <button onClick={openAdd}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', borderRadius: '8px', padding: '0.65rem 1.1rem', cursor: 'pointer' }}>
            <FiPlus size={13}/> Add Address
          </button>
        )}
      </div>

      {/* ── ADD / EDIT FORM ── */}
      {showForm && (
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(138,79,177,0.18)', marginBottom: '1.5rem', boxShadow: '0 4px 24px rgba(138,79,177,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A4FB1', margin: 0 }}>{editing ? 'Edit Address' : 'New Address'}</p>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(26,26,46,0.4)', padding: '4px', display: 'flex' }}><FiX size={18}/></button>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              <div>
                <label style={labelStyle}>Label</label>
                <input style={inputStyle} placeholder="e.g. Home, Work" value={form.label} required onChange={e => setForm(f => ({ ...f, label: e.target.value }))} onFocus={e => { e.currentTarget.style.borderColor='#8A4FB1' }} onBlur={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)' }} />
              </div>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input style={inputStyle} placeholder="Recipient name" value={form.full_name} required onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} onFocus={e => { e.currentTarget.style.borderColor='#8A4FB1' }} onBlur={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)' }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} placeholder="+234..." value={form.phone} required onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={e => { e.currentTarget.style.borderColor='#8A4FB1' }} onBlur={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)' }} />
            </div>
            <div>
              <label style={labelStyle}>Street Address</label>
              <input style={inputStyle} placeholder="House number, street, area" value={form.address} required onChange={e => setForm(f => ({ ...f, address: e.target.value }))} onFocus={e => { e.currentTarget.style.borderColor='#8A4FB1' }} onBlur={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input style={inputStyle} placeholder="City" value={form.city} required onChange={e => setForm(f => ({ ...f, city: e.target.value }))} onFocus={e => { e.currentTarget.style.borderColor='#8A4FB1' }} onBlur={e => { e.currentTarget.style.borderColor='rgba(138,79,177,0.2)' }} />
              </div>
              <div>
                <label style={labelStyle}>State</label>
                <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.state} required onChange={e => setForm(f => ({ ...f, state: e.target.value }))}>
                  <option value="">Select state</option>
                  {NG_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
              <input type="checkbox" checked={form.is_default} onChange={e => setForm(f => ({ ...f, is_default: e.target.checked }))} style={{ accentColor: '#8A4FB1', width: '16px', height: '16px' }} />
              <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 500, color: '#1A1A2E' }}>Set as default address</span>
            </label>
            {error && <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: '#BE123C', margin: 0 }}>{error}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', border: 'none', borderRadius: '8px', padding: '0.65rem 1.1rem', cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={saving}
                style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFF', background: saving ? 'rgba(138,79,177,0.6)' : '#8A4FB1', border: 'none', borderRadius: '8px', padding: '0.65rem 1.25rem', cursor: saving ? 'default' : 'pointer' }}>
                {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── ADDRESS LIST ── */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1,2].map(i => <div key={i} style={{ background: '#FFF', borderRadius: '12px', height: '100px', border: '1px solid rgba(138,79,177,0.08)', animation: 'pulse 1.5s infinite' }} />)}
        </div>
      ) : addresses.length === 0 && !showForm ? (
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '3rem 2rem', border: '1px solid rgba(138,79,177,0.1)', textAlign: 'center' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <FiMapPin size={32} color="#8A4FB1" />
          </div>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.2rem', color: '#8A4FB1', margin: '0 0 0.4rem' }}>No saved addresses yet</p>
          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.5rem' }}>Add an address for faster checkout.</p>
          <button onClick={openAdd}
            style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer' }}>
            Add Your First Address
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {addresses.map(addr => (
            <div key={addr.id} style={{ background: '#FFF', borderRadius: '14px', padding: '1.25rem 1.4rem', border: `1px solid ${addr.is_default ? 'rgba(138,79,177,0.4)' : 'rgba(138,79,177,0.1)'}`, position: 'relative', transition: 'box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(138,79,177,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', fontWeight: 700, color: '#1A1A2E' }}>{addr.label}</span>
                    {addr.is_default && (
                      <span style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.5rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#8A4FB1', color: '#FFF', padding: '2px 8px', borderRadius: '100px' }}>Default</span>
                    )}
                  </div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 500, color: '#1A1A2E', margin: '0 0 2px' }}>{addr.full_name}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.55)', margin: '0 0 2px', lineHeight: 1.5 }}>{addr.address}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.55)', margin: '0 0 2px' }}>{addr.city}, {addr.state}</p>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.75rem', color: 'rgba(26,26,46,0.4)', margin: 0 }}>{addr.phone}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end', flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openEdit(addr)}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', border: 'none', borderRadius: '6px', padding: '0.45rem 0.75rem', cursor: 'pointer' }}>
                      <FiEdit2 size={11}/> Edit
                    </button>
                    <button onClick={() => handleDelete(addr.id)} disabled={deletingId === addr.id}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#BE123C', background: '#FFF1F2', border: 'none', borderRadius: '6px', padding: '0.45rem 0.75rem', cursor: 'pointer' }}>
                      <FiTrash2 size={11}/> {deletingId === addr.id ? '…' : 'Delete'}
                    </button>
                  </div>
                  {!addr.is_default && (
                    <button onClick={() => handleSetDefault(addr)}
                      style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', background: 'none', border: '1px solid rgba(138,79,177,0.15)', borderRadius: '6px', padding: '0.4rem 0.75rem', cursor: 'pointer' }}>
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, loadUser } = useAuth()
  const { orders: ordersRaw, loading: ordersLoading, refetch: refetchOrders } = useOrders()
  const orders = Array.isArray(ordersRaw) ? ordersRaw : []
  const { items: wishlistItemsRaw } = useWishlist()
  const wishlistItems = Array.isArray(wishlistItemsRaw) ? wishlistItemsRaw : []
  const { addItem } = useCart()
  const [activeTab, setActiveTab] = useState('orders')
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { state: { from: '/account' } })
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) loadUser()
  }, [])

  if (!user) return null

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders',    label: 'My Orders',  icon: <FiPackage size={15}/>,  count: orders.length },
    { id: 'wishlist',  label: 'Wishlist',   icon: <FiHeart size={15}/>,    count: wishlistItems.length },
    { id: 'profile',   label: 'Profile',   icon: <FiUser size={15}/> },
    { id: 'addresses', label: 'Addresses', icon: <FiMapPin size={15}/> },
  ]

  const totalSpend = orders.reduce((s, o) => s + Number(o.total), 0)

  return (
    <div style={{ background: '#FAF7FF', minHeight: '100vh', paddingTop: '68px' }}>

      {/* ── HERO HEADER ─────────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #3D1A6E 60%, #5B21B6 100%)', padding: 'clamp(2rem,5vw,3.5rem) clamp(1.25rem,6vw,5rem) 0', position: 'relative', overflow: 'hidden' }}>

        {/* decorative orbs */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(138,79,177,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

          {/* top row: avatar + name + logout */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {/* avatar */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{ width: 'clamp(64px,10vw,80px)', height: 'clamp(64px,10vw,80px)', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid rgba(212,175,55,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                  {user.avatar
                    ? <img src={getCloudinaryUrl(user.avatar, 200)} alt={user.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}/>
                    : <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.5rem,4vw,2rem)', fontWeight: 700, color: '#FFF' }}>{user.first_name?.[0]?.toUpperCase()}</span>
                  }
                </div>
                {/* gold ring accent */}
                <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.3)', pointerEvents: 'none' }} />
              </div>

              <div>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(212,175,55,0.8)', margin: '0 0 4px' }}>Welcome back</p>
                <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px', lineHeight: 1.1 }}>{user.first_name} {user.last_name}</h1>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{user.email}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/account/edit"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A1A2E', background: '#D4AF37', border: 'none', borderRadius: '8px', padding: '0.6rem 1rem', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                <FiEdit2 size={12}/> Edit Profile
              </Link>
              <button onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.6rem 1rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                <FiLogOut size={12}/> Log Out
              </button>
            </div>
          </div>

          {/* stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Orders',  value: orders.length,           icon: <FiPackage size={15}/> },
              { label: 'Wishlist Items',value: wishlistItems.length,    icon: <FiHeart size={15}/> },
              { label: 'Total Spent',   value: formatPrice(totalSpend), icon: <FiShield size={15}/> },
              { label: 'Member Since',  value: new Date(user.date_joined).toLocaleDateString('en-NG', { month: 'short', year: 'numeric' }), icon: <FiCalendar size={15}/> },
            ].map(stat => (
              <div key={stat.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem 1.1rem', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', color: 'rgba(212,175,55,0.8)' }}>{stat.icon}</div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 700, color: '#FFF', margin: '0 0 2px', lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* tabs */}
          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.85rem 1.25rem', background: 'none', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? '#D4AF37' : 'transparent'}`, color: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {tab.icon} {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span style={{ background: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.15)', color: activeTab === tab.id ? '#1A1A2E' : '#FFF', borderRadius: '100px', padding: '1px 7px', fontSize: '0.58rem', fontWeight: 700 }}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem clamp(1.25rem,6vw,5rem)' }}>

        {/* ── ORDERS ── */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,1.8rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>My Orders</h2>
              <button onClick={refetchOrders}
                style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A4FB1', background: '#F3E8FF', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer' }}>
                ↻ Refresh
              </button>
            </div>

            {ordersLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ background: '#FFF', borderRadius: '12px', height: '80px', border: '1px solid rgba(138,79,177,0.08)', animation: 'pulse 1.5s infinite' }} />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'clamp(2rem,6vw,4rem)', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <FiPackage size={32} color="#8A4FB1" />
                </div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.3rem', color: '#8A4FB1', margin: '0 0 0.5rem' }}>No orders yet</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.5rem' }}>Your order history will appear here once you make a purchase.</p>
                <Link to="/shop" style={{ display: 'inline-block', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Start Shopping</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {orders.map(order => {
                  const sc = STATUS_COLORS[order.status] || { bg: '#F3E8FF', color: '#5B21B6' }
                  return (
                    <div key={order.id}
                      onClick={() => navigate(`/account/orders/${order.order_number}`, { state: { order } })}
                      style={{ background: '#FFF', borderRadius: '14px', padding: 'clamp(1rem,3vw,1.5rem)', border: '1px solid rgba(138,79,177,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', transition: 'box-shadow 0.2s, border-color 0.2s', cursor: 'pointer' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 4px 20px rgba(138,79,177,0.1)'; el.style.borderColor = 'rgba(138,79,177,0.3)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.borderColor = 'rgba(138,79,177,0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: sc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiPackage size={18} color={sc.color} />
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#1A1A2E', margin: 0 }}>{order.order_number}</p>
                            <span style={{ background: sc.bg, color: sc.color, fontFamily: '"Jost", sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px' }}>{order.status_display}</span>
                          </div>
                          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(26,26,46,0.45)', margin: 0 }}>
                            {new Date(order.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })} · {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontWeight: 700, color: '#8A4FB1', margin: 0 }}>{formatPrice(order.total)}</p>
                        <FiChevronRight size={16} color="#8A4FB1" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── WISHLIST ── */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,1.8rem)', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.5rem' }}>My Wishlist</h2>
            {wishlistItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'clamp(2rem,6vw,4rem)', background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <FiHeart size={32} color="#8A4FB1" />
                </div>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '1.3rem', color: '#8A4FB1', margin: '0 0 0.5rem' }}>Your wishlist is empty</p>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.78rem', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.5rem' }}>Save items you love and find them here.</p>
                <Link to="/shop" style={{ display: 'inline-block', fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Explore Products</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,200px), 1fr))', gap: '1.25rem' }}>
                {wishlistItems.map(item => {
                  const imgSrc = item.product.primary_image?.image
                    ? getCloudinaryUrl(item.product.primary_image.image, 400)
                    : item.product.color_variants?.[0]?.image
                      ? getCloudinaryUrl(item.product.color_variants[0].image, 400)
                      : ''
                  const isAdded = addedToCart === item.id
                  return (
                    <div key={item.id} style={{ background: '#FFF', borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(138,79,177,0.1)', transition: 'all 0.25s', display: 'flex', flexDirection: 'column' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='#8A4FB1'; el.style.boxShadow='0 6px 24px rgba(138,79,177,0.1)'; el.style.transform='translateY(-2px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor='rgba(138,79,177,0.1)'; el.style.boxShadow='none'; el.style.transform='none' }}>
                      <Link to={`/product/${item.product.slug}`} style={{ textDecoration: 'none' }}>
                        <div style={{ height: '180px', background: '#F0E8FA', overflow: 'hidden' }}>
                          {imgSrc
                            ? <img src={imgSrc} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}/>
                            : <div style={{ width: '100%', height: '100%', background: '#F0E8FA' }}/>
                          }
                        </div>
                        <div style={{ padding: '0.9rem 0.9rem 0.5rem' }}>
                          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '4px', lineHeight: 1.2 }}>{item.product.name}</p>
                          <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#8A4FB1' }}>{formatPrice(item.product.active_price || item.product.price)}</p>
                        </div>
                      </Link>
                      <div style={{ padding: '0 0.9rem 0.9rem' }}>
                        <button
                          onClick={() => {
                            addItem({
                              id: item.product.id,
                              name: item.product.name,
                              price: parseFloat(String(item.product.active_price || item.product.price)),
                              image: imgSrc,
                              slug: item.product.slug,
                              category: typeof item.product.category === 'string' ? item.product.category : item.product.category?.name || '',
                            })
                            setAddedToCart(item.id)
                            setTimeout(() => setAddedToCart(null), 2000)
                          }}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFF', background: isAdded ? '#16A34A' : '#8A4FB1', border: 'none', borderRadius: '8px', padding: '0.55rem 0', cursor: 'pointer', transition: 'background 0.25s' }}>
                          {isAdded ? <><FiCheck size={12}/> Added!</> : <><FiShoppingBag size={12}/> Add to Cart</>}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {activeTab === 'profile' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: 'clamp(1.5rem,3vw,1.8rem)', fontWeight: 600, color: '#1A1A2E', margin: 0 }}>Profile Details</h2>
              <Link to="/account/edit"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: '"Jost", sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', textDecoration: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', transition: 'background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5B21B6' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#8A4FB1' }}>
                <FiEdit2 size={12}/> Edit Profile
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.25rem' }}>

              {/* Avatar card */}
              <div style={{ background: '#FFF', borderRadius: '16px', border: '1px solid rgba(138,79,177,0.1)', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(135deg, #3D1A6E, #5B21B6)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, #8A4FB1, #D4AF37)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid rgba(212,175,55,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                    {user.avatar
                      ? <img src={getCloudinaryUrl(user.avatar, 200)} alt={user.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}/>
                      : <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.2rem', fontWeight: 700, color: '#FFF' }}>{(user.first_name?.[0] || '') + (user.last_name?.[0] || '')}</span>
                    }
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 700, color: '#FFF', margin: '0 0 4px' }}>{user.full_name}</p>
                    <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Soft Lifee Member</p>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    {[
                      { label: 'Orders',   value: orders.length },
                      { label: 'Wishlist', value: wishlistItems.length },
                      { label: 'Spent',    value: orders.length > 0 ? formatPrice(totalSpend) : '₦0' },
                    ].map(stat => (
                      <div key={stat.label}>
                        <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 700, color: '#8A4FB1', margin: '0 0 2px' }}>{stat.value}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: 0 }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Info card */}
              <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(138,79,177,0.1)' }}>
                <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 1.25rem' }}>Personal Information</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { icon: <FiUser size={14}/>,     label: 'Full Name',    value: user.full_name },
                    { icon: <FiMail size={14}/>,     label: 'Email',        value: user.email },
                    { icon: <FiPhone size={14}/>,    label: 'Phone',        value: user.phone || 'Not provided' },
                    { icon: <FiCalendar size={14}/>, label: 'Member Since', value: new Date(user.date_joined).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' }) },
                    { icon: <FiShield size={14}/>,   label: 'Referral Code',value: user.referral_code },
                  ].map((row, i, arr) => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem', padding: '0.9rem 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(138,79,177,0.07)' : 'none' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8A4FB1', flexShrink: 0, marginTop: '1px' }}>
                        {row.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(26,26,46,0.4)', margin: '0 0 3px' }}>{row.label}</p>
                        <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.85rem', fontWeight: 500, color: '#1A1A2E', margin: 0, wordBreak: 'break-all' }}>{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Referral card */}
              {user.referral_code && (
                <div style={{ background: 'linear-gradient(135deg, #F9F0FF, #FDF6FF)', borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(138,79,177,0.15)', gridColumn: 'span 1' }}>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8A4FB1', margin: '0 0 0.75rem' }}>Your Referral Code</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(26,26,46,0.5)', margin: '0 0 1rem', lineHeight: 1.6 }}>Share this code with friends and earn rewards when they shop.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, background: '#FFF', border: '1px dashed rgba(138,79,177,0.3)', borderRadius: '10px', padding: '0.75rem 1rem', fontFamily: '"Jost", sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#8A4FB1', letterSpacing: '0.12em', minWidth: '120px', textAlign: 'center' }}>
                      {user.referral_code}
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(user.referral_code); }}
                      style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFF', background: '#8A4FB1', border: 'none', borderRadius: '10px', padding: '0.75rem 1.25rem', cursor: 'pointer', flexShrink: 0 }}>
                      Copy
                    </button>
                  </div>
                  <p style={{ fontFamily: '"Jost", sans-serif', fontSize: '0.7rem', color: 'rgba(26,26,46,0.4)', margin: '0.75rem 0 0' }}>You've referred <strong style={{ color: '#8A4FB1' }}>{user.referral_count}</strong> {user.referral_count === 1 ? 'person' : 'people'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ADDRESSES ── */}
        {activeTab === 'addresses' && <AddressesTab />}
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns: repeat(auto-fit, minmax(120px"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}

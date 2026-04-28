// ── Base API configuration ────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'


// ── Cloudinary URL helper ─────────────────────────────────────────────────────
export function getCloudinaryUrl(url: string | null | undefined, width = 400): string {
  if (!url) return ''
  // Already a full URL
  if (url.startsWith('http')) return url
  // Strip leading "image/upload/" — the stored path from cloudinary_storage includes it
  // but we re-insert it (with transformations) below
  const publicId = url.replace(/^image\/upload\//, '')
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},c_fill,q_auto,f_auto/${publicId}`
  }
  return url
}

// ── Token management ──────────────────────────────────────────────────────────
export const tokens = {
  get access()  { return localStorage.getItem('access_token') },
  get refresh() { return localStorage.getItem('refresh_token') },
  set(access: string, refresh: string) {
    localStorage.setItem('access_token',  access)
    localStorage.setItem('refresh_token', refresh)
  },
  clear() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }

  if (requiresAuth && tokens.access) {
    headers['Authorization'] = `Bearer ${tokens.access}`
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  // If 401, try refreshing token then retry
  if (res.status === 401 && tokens.refresh) {
    const refreshed = await refreshAccessToken()
    if (refreshed) {
      headers['Authorization'] = `Bearer ${tokens.access}`
      const retryRes = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      })
      if (!retryRes.ok) throw await retryRes.json()
      return retryRes.json()
    } else {
      tokens.clear()
      window.location.href = '/login'
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Something went wrong' }))
    throw error
  }

  // Handle empty responses (204 No Content)
  const text = await res.text()
  return text ? JSON.parse(text) : ({} as T)
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ refresh: tokens.refresh }),
    })
    if (!res.ok) return false
    const data = await res.json()
    localStorage.setItem('access_token', data.access)
    return true
  } catch {
    return false
  }
}

// ── Auth API ──────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (data: {
    first_name:    string
    last_name:     string
    email:         string
    phone:         string
    password:      string
    password2:     string
    referral_code?: string
  }) => request<AuthResponse>('/auth/register/', {
    method: 'POST',
    body:   JSON.stringify(data),
  }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login/', {
      method: 'POST',
      body:   JSON.stringify({ email, password }),
    }),

  logout: () =>
    request('/auth/logout/', {
      method: 'POST',
      body:   JSON.stringify({ refresh: tokens.refresh }),
    }, true),

  googleLogin: (access_token: string) =>
    request<AuthResponse>('/auth/google/', {
      method: 'POST',
      body:   JSON.stringify({ access_token }),
    }),

  getProfile: () =>
    request<User>('/auth/profile/', {}, true),

  updateProfile: (data: Partial<User>) =>
    request<User>('/auth/profile/', {
      method: 'PATCH',
      body:   JSON.stringify(data),
    }, true),

  uploadAvatar: async (file: File): Promise<User> => {
    // FormData uploads can't use the JSON request() helper (it sets Content-Type: json),
    // so we implement the same 401→refresh→retry logic here for multipart requests.
    const buildForm = () => { const f = new FormData(); f.append('avatar', file); return f }
    const send = (token: string) =>
      fetch(`${API_BASE}/auth/profile/avatar/`, {
        method:  'POST',
        headers: { Authorization: `Bearer ${token}` },
        body:    buildForm(),
      })

    let res = await send(tokens.access!)
    if (res.status === 401 && tokens.refresh) {
      const refreshed = await refreshAccessToken()
      if (!refreshed) { tokens.clear(); window.location.href = '/login'; throw new Error('Session expired') }
      res = await send(tokens.access!)
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw err
    }
    return res.json()
  },

  changePassword: (data: {
    old_password:  string
    new_password:  string
    new_password2: string
  }) => request('/auth/profile/password/', {
    method: 'POST',
    body:   JSON.stringify(data),
  }, true),

  requestPasswordReset: (email: string) =>
    request('/auth/password-reset/', {
      method: 'POST',
      body:   JSON.stringify({ email }),
    }),

  confirmPasswordReset: (token: string, new_password: string, confirm_password: string) =>
    request('/auth/password-reset/confirm/', {
      method: 'POST',
      body:   JSON.stringify({ token, new_password, confirm_password }),
    }),

  getAddresses: () =>
    request<Address[]>('/auth/addresses/', {}, true),

  addAddress: (data: Omit<Address, 'id' | 'created_at'>) =>
    request<Address>('/auth/addresses/', {
      method: 'POST',
      body:   JSON.stringify(data),
    }, true),

  updateAddress: (id: number, data: Partial<Address>) =>
    request<Address>(`/auth/addresses/${id}/`, {
      method: 'PATCH',
      body:   JSON.stringify(data),
    }, true),

  deleteAddress: (id: number) =>
    request(`/auth/addresses/${id}/`, { method: 'DELETE' }, true),
}

// ── Products API ──────────────────────────────────────────────────────────────
export const productsAPI = {
  getAll: (params?: ProductFilters) => {
    const query = new URLSearchParams()
    if (params?.category)     query.set('category',     params.category)
    if (params?.subcategory)  query.set('subcategory',  params.subcategory)
    if (params?.badge)        query.set('badge',        params.badge)
    if (params?.new_arrivals) query.set('new_arrivals', 'true')
    if (params?.min_price)    query.set('min_price',    String(params.min_price))
    if (params?.max_price)    query.set('max_price',    String(params.max_price))
    if (params?.search)       query.set('search',       params.search)
    if (params?.ordering)     query.set('ordering',     params.ordering)
    if (params?.in_stock)     query.set('in_stock',     'true')
    if (params?.on_sale)      query.set('on_sale',      'true')
    if (params?.page)         query.set('page',         String(params.page))
    const qs = query.toString()
    return request<PaginatedResponse<Product>>(`/products/${qs ? `?${qs}` : ''}`)
  },

  getOne: (slug: string) =>
    request<ProductDetail>(`/products/${slug}/`),

  getRelated: (slug: string) =>
    request<Product[]>(`/products/${slug}/related/`),

  getCategories: () =>
    request<Category[]>('/products/categories/'),

  search: (q: string) =>
    request<SearchResults>(`/products/search/?q=${encodeURIComponent(q)}`),

  getWishlist: () =>
    request<WishlistItem[]>('/products/wishlist/', {}, true),

  toggleWishlist: (slug: string) =>
    request<{ wishlisted: boolean; message: string }>('/products/wishlist/', {
      method: 'POST',
      body:   JSON.stringify({ slug }),
    }, true),

  getRecentlyViewed: () =>
    request<RecentlyViewedItem[]>('/products/recently-viewed/', {}, true),
}

// ── Orders API ────────────────────────────────────────────────────────────────
export const ordersAPI = {
  create: (data: CreateOrderData) =>
    request<CreateOrderResponse>('/orders/', {
      method: 'POST',
      body:   JSON.stringify(data),
    }),

  getMyOrders: () =>
    request<Order[]>('/orders/my-orders/', {}, true),

  getOrder: (id: number) =>
    request<Order>(`/orders/my-orders/${id}/`, {}, true),

  verifyPayment: (reference: string) =>
    request<Order>(`/orders/verify/${reference}/`),

  validateDiscount: (code: string, subtotal: number) =>
    request<DiscountValidation>('/orders/discount/validate/', {
      method: 'POST',
      body:   JSON.stringify({ code, subtotal }),
    }),
}

// ── Reviews API ───────────────────────────────────────────────────────────────
export const reviewsAPI = {
  getForProduct: (slug: string) =>
    request<Review[]>(`/reviews/${slug}/`),

  submit: (slug: string, data: {
    rating:         number
    title?:         string
    body:           string
    reviewer_name?: string
  }) => request(`/reviews/${slug}/submit/`, {
    method: 'POST',
    body:   JSON.stringify(data),
  }),

  getMyReviews: () =>
    request<Review[]>('/reviews/my-reviews/', {}, true),
}

// ── Analytics API (admin) ─────────────────────────────────────────────────────
export const analyticsAPI = {
  getSummary:    () => request('/orders/analytics/summary/',      {}, true),
  getRevenue:    (days = 30) => request(`/orders/analytics/revenue/?days=${days}`, {}, true),
  getTopProducts:() => request('/orders/analytics/top-products/', {}, true),
  getLowStock:   () => request('/orders/analytics/low-stock/',    {}, true),
  getRecentOrders:()=> request('/orders/analytics/recent-orders/',{}, true),
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface User {
  id:             number
  email:          string
  first_name:     string
  last_name:      string
  full_name:      string
  phone:          string
  avatar:         string | null
  avatar_url:     string | null
  referral_code:  string
  referral_count: number
  date_joined:    string
}

export interface AuthResponse {
  message: string
  user:    User
  tokens:  { access: string; refresh: string }
}

export interface Address {
  id:         number
  label:      string
  full_name:  string
  phone:      string
  address:    string
  city:       string
  state:      string
  is_default: boolean
  created_at: string
}

export interface Product {
  id:              number
  name:            string
  slug:            string
  category:        string | { id: number; name: string; slug: string }
  subcategory:     string | { id: number; name: string; slug: string } | null
  price:           string
  sale_price:      string | null
  active_price:    string
  is_on_sale:      boolean
  discount_percent:number
  sale_end:        string | null
  badge:           string
  badge_display:   string
  primary_image:   { image: string; alt_text: string } | null
  rating:          string
  review_count:    number
  in_stock:        boolean
  is_new:          boolean
}

export interface ColorVariant {
  id:       number
  label:    string
  hex_code: string
  image:    string
  order:    number
}

export interface SizeVariant {
  id:          number
  label:       string
  size_type:   'clothing' | 'shoes' | 'numeric'
  in_stock:    boolean
  stock_count: number
  order:       number
}

export interface ProductDetail extends Product {
  description:    string
  details:        string[]
  images:         { id: number; image: string; alt_text: string; is_primary: boolean }[]
  color_variants: ColorVariant[]
  size_variants:  SizeVariant[]
  videos:         { id: number; video_url: string; poster: string | null }[]
  sale_start:     string | null
  is_wishlisted:  boolean
  stock_count:    number
  added_date:     string
  category:       { id: number; name: string; slug: string }
  subcategory:    { id: number; name: string; slug: string } | null
}

export interface Category {
  id:            number
  name:          string
  slug:          string
  description:   string
  image:         string | null
  subcategories: { id: number; name: string; slug: string }[]
}

export interface ProductFilters {
  category?:     string
  subcategory?:  string
  badge?:        string
  new_arrivals?: boolean
  on_sale?:      boolean
  min_price?:    number
  max_price?:    number
  search?:       string
  ordering?:     string
  in_stock?:     boolean
  page?:         number
}

export interface PaginatedResponse<T> {
  count:    number
  next:     string | null
  previous: string | null
  results:  T[]
}

export interface SearchResults {
  query:   string
  results: Array<{
    id?:      number
    name:     string
    slug:     string
    price?:   string
    category?:string
    image?:   string | null
    type:     'product' | 'category'
  }>
}

export interface WishlistItem {
  id:         number
  product:    Product
  created_at: string
}

export interface RecentlyViewedItem {
  id:        number
  product:   Product
  viewed_at: string
}

export interface OrderItem {
  id:            number
  product:       number | null
  product_name:  string
  product_price: string
  product_image: string
  color_variant: string
  quantity:      number
  subtotal:      string
}

export interface Order {
  id:                     number
  order_number:           string
  customer_name:          string
  customer_email:         string
  customer_phone:         string
  delivery_address:       string
  delivery_city:          string
  delivery_state:         string
  subtotal:               string
  delivery_fee:           string
  discount_amount:        string
  total:                  string
  status:                 string
  status_display:         string
  payment_method:         string
  payment_status:         string
  payment_status_display: string
  paystack_ref:           string
  paid_at:                string | null
  items:                  OrderItem[]
  created_at:             string
}

export interface CreateOrderData {
  customer_name:    string
  customer_email:   string
  customer_phone:   string
  delivery_address: string
  delivery_city:    string
  delivery_state:   string
  delivery_notes?:  string
  payment_method:   'card' | 'transfer' | 'ussd' | 'pod'
  discount_code?:   string
  items: Array<{
    product_id:     number
    quantity:       number
    color_variant?: string
    size_variant?:  string
  }>
}

export interface CreateOrderResponse {
  order:          Order
  payment_url?:   string
  paystack_ref?:  string
  payment_method?:string
  message?:       string
}

export interface DiscountValidation {
  valid:           boolean
  code:            string
  discount_type:   string
  value:           string
  discount_amount: string
  new_subtotal:    string
  message:         string
}

export interface Review {
  id:                   number
  reviewer_name:        string
  rating:               number
  title:                string
  body:                 string
  is_verified_purchase: boolean
  created_at:           string
}

// ── Cart types ────────────────────────────────────────────────────────────────
export interface ServerCartItem {
  id:            number
  product:       Product
  quantity:      number
  color_variant: string
  size_variant:  string
  subtotal:      string
  added_at:      string
}

export interface ServerCart {
  id:         number
  items:      ServerCartItem[]
  total:      string
  item_count: number
  updated_at: string
}

// ── Return types ──────────────────────────────────────────────────────────────
export interface ReturnItem {
  id:            number
  order_item:    number
  product_name:  string
  product_image: string
  quantity:      number
}

export interface ReturnRequest {
  id:             number
  return_number:  string
  order:          number
  order_number:   string
  reason:         string
  reason_display: string
  description:    string
  status:         string
  status_display: string
  admin_notes:    string
  refund_amount:  string | null
  items:          ReturnItem[]
  created_at:     string
  updated_at:     string
}

export interface ReferralInfo {
  referral_code:   string
  referral_link:   string
  total_referrals: number
  referred_users:  Array<{
    email:      string
    first_name: string
    joined_at:  string
  }>
}

// ── Cart API ──────────────────────────────────────────────────────────────────
export const cartAPI = {
  get: () =>
    request<ServerCart>('/cart/', {}, true),

  add: (data: { product_id: number; quantity?: number; color_variant?: string; size_variant?: string }) =>
    request<ServerCartItem>('/cart/add/', {
      method: 'POST',
      body:   JSON.stringify(data),
    }, true),

  updateItem: (itemId: number, quantity: number) =>
    request<ServerCartItem>(`/cart/items/${itemId}/`, {
      method: 'PATCH',
      body:   JSON.stringify({ quantity }),
    }, true),

  removeItem: (itemId: number) =>
    request(`/cart/items/${itemId}/`, { method: 'DELETE' }, true),

  clear: () =>
    request('/cart/', { method: 'DELETE' }, true),
}

// ── Returns API ───────────────────────────────────────────────────────────────
export const returnsAPI = {
  create: (data: {
    order_id:    number
    reason:      string
    description: string
    items:       Array<{ order_item_id: number; quantity: number }>
  }) => request<ReturnRequest>('/orders/returns/', {
    method: 'POST',
    body:   JSON.stringify(data),
  }, true),

  getMyReturns: () =>
    request<ReturnRequest[]>('/orders/returns/my-returns/', {}, true),

  getReturn: (id: number) =>
    request<ReturnRequest>(`/orders/returns/${id}/`, {}, true),
}

// ── Referral API ──────────────────────────────────────────────────────────────
export const referralAPI = {
  getInfo: () =>
    request<ReferralInfo>('/auth/referrals/', {}, true),
}
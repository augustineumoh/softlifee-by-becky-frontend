import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, tokens, type User } from '../services/api'
import { useCart } from './cartStore'

interface AuthState {
  user:          User | null
  isAuthenticated: boolean
  isLoading:     boolean
  error:         string | null

  login:         (email: string, password: string) => Promise<void>
  register:      (data: any) => Promise<void>
  logout:        () => Promise<void>
  loadUser:      () => Promise<void>
  clearError:    () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user:            null,
      isAuthenticated: false,
      isLoading:       false,
      error:           null,

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          const res = await authAPI.login(email, password)
          tokens.set(res.tokens.access, res.tokens.refresh)
          set({ user: res.user, isAuthenticated: true, isLoading: false })

          // Restore cart saved on last logout for this user, preserving quantities
          const saved = localStorage.getItem(`softlifee-cart-user-${res.user.id}`)
          if (saved) {
            try {
              const savedItems: import('./cartStore').CartItem[] = JSON.parse(saved)
              if (Array.isArray(savedItems) && savedItems.length > 0) {
                const current = useCart.getState().items
                if (current.length === 0) {
                  // No guest cart — restore saved items directly with their quantities
                  useCart.setState({ items: savedItems })
                } else {
                  // Guest cart exists — merge, accumulating quantities for the same product
                  const merged = [...current]
                  for (const s of savedItems) {
                    const idx = merged.findIndex(i => i.id === s.id)
                    if (idx >= 0) {
                      merged[idx] = { ...merged[idx], quantity: merged[idx].quantity + s.quantity }
                    } else {
                      merged.push(s)
                    }
                  }
                  useCart.setState({ items: merged })
                }
              }
              localStorage.removeItem(`softlifee-cart-user-${res.user.id}`)
            } catch {}
          }
        } catch (err: any) {
          const msg = err?.non_field_errors?.[0] || err?.error || 'Login failed'
          set({ error: msg, isLoading: false })
          throw err
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null })
        try {
          const res = await authAPI.register(data)
          tokens.set(res.tokens.access, res.tokens.refresh)
          set({ user: res.user, isAuthenticated: true, isLoading: false })
        } catch (err: any) {
          const msg = Object.values(err)?.[0]?.[0] || err?.error || 'Registration failed'
          set({ error: String(msg), isLoading: false })
          throw err
        }
      },

      logout: async () => {
        // Save cart items keyed to the user so they restore on next login
        const userId = get().user?.id
        const cartItems = useCart.getState().items
        if (userId && cartItems.length > 0) {
          localStorage.setItem(`softlifee-cart-user-${userId}`, JSON.stringify(cartItems))
        }
        try { await authAPI.logout() } catch {}
        tokens.clear()
        set({ user: null, isAuthenticated: false })
        useCart.getState().clearCart()
      },

      loadUser: async () => {
        if (!tokens.access) return
        try {
          const user = await authAPI.getProfile()
          // Force full replacement so avatar and all fields update everywhere
          set({ user: { ...user }, isAuthenticated: true })
        } catch {
          tokens.clear()
          set({ user: null, isAuthenticated: false })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name:    'softlifee-auth',
      // Persist full user object including avatar
      partialize: (state) => ({
        user:            state.user ? {
          id:             state.user.id,
          email:          state.user.email,
          first_name:     state.user.first_name,
          last_name:      state.user.last_name,
          full_name:      state.user.full_name,
          phone:          state.user.phone,
          avatar:         state.user.avatar,
          avatar_url:     state.user.avatar_url,
          referral_code:  state.user.referral_code,
          referral_count: state.user.referral_count,
          date_joined:    state.user.date_joined,
        } : null,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
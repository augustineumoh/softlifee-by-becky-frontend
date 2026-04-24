import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI, tokens, type User } from '../services/api'

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
        try { await authAPI.logout() } catch {}
        tokens.clear()
        set({ user: null, isAuthenticated: false })
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
          id:          state.user.id,
          email:       state.user.email,
          first_name:  state.user.first_name,
          last_name:   state.user.last_name,
          full_name:   state.user.full_name,
          phone:       state.user.phone,
          avatar:      state.user.avatar,
          date_joined: state.user.date_joined,
        } : null,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
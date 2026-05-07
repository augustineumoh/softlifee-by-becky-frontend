import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id:           number
  name:         string
  price:        number
  image:        string
  slug:         string
  category:     string
  quantity:     number
  maxStock:     number   // 0 = no limit tracked
  colorVariant?: string
}

interface CartState {
  items:       CartItem[]
  isOpen:      boolean
  addItem:     (item: Omit<CartItem, 'quantity'>) => void
  removeItem:  (id: number) => void
  updateQty:   (id: number, qty: number) => void
  clearCart:   () => void
  openCart:    () => void
  closeCart:   () => void
  toggleCart:  () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items:  [],
      isOpen: false,

      addItem: (item) => {
        const items = Array.isArray(get().items) ? get().items : []
        const existing = items.find(i => i.id === item.id)
        const maxStock = item.maxStock ?? 0
        if (existing) {
          const newQty = existing.quantity + 1
          if (maxStock > 0 && newQty > maxStock) return  // at stock limit
          set({ items: items.map(i =>
            i.id === item.id
              ? { ...i, quantity: newQty, maxStock: maxStock || i.maxStock }
              : i
          ) })
        } else {
          set({ items: [...items, { ...item, quantity: 1, maxStock }] })
        }
      },

      removeItem: (id) => {
        const items = Array.isArray(get().items) ? get().items : []
        set({ items: items.filter(i => i.id !== id) })
      },

      updateQty: (id, qty) => {
        const items = Array.isArray(get().items) ? get().items : []
        if (qty <= 0) {
          set({ items: items.filter(i => i.id !== id) })
        } else {
          set({ items: items.map(i => {
            if (i.id !== id) return i
            const capped = (i.maxStock > 0 && qty > i.maxStock) ? i.maxStock : qty
            return { ...i, quantity: capped }
          }) })
        }
      },

      clearCart:  () => set({ items: [] }),
      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),
    }),
    {
      name: 'softlifee-cart',
      // Safety net — if stored data is corrupted, reset to empty array
      merge: (persisted: any, current) => ({
        ...current,
        ...persisted,
        items: Array.isArray(persisted?.items) ? persisted.items : [],
      }),
    }
  )
)
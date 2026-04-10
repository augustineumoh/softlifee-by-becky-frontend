import { create } from 'zustand'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  slug: string
  category: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const existing = get().items.find(i => i.id === item.id)
    if (existing) {
      set(s => ({ items: s.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) }))
    } else {
      set(s => ({ items: [...s.items, { ...item, quantity: 1 }] }))
    }
  },
  removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  updateQty:  (id, qty) => {
    if (qty < 1) { get().removeItem(id); return }
    set(s => ({ items: s.items.map(i => i.id === id ? { ...i, quantity: qty } : i) }))
  },
  clearCart:  () => set({ items: [] }),
  total:  () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  count:  () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
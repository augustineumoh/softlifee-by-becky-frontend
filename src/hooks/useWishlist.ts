import { useState, useEffect } from 'react'
import { productsAPI, type WishlistItem } from '../services/api'
import { useAuth } from '../store/authStore'

export function useWishlist() {
  const { isAuthenticated } = useAuth()
  const [items,   setItems]   = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) { setItems([]); return }
    setLoading(true)
    productsAPI.getWishlist()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [isAuthenticated])

  const toggle = async (slug: string) => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    try {
      const res = await productsAPI.toggleWishlist(slug)
      if (res.wishlisted) {
        // Refresh wishlist
        const updated = await productsAPI.getWishlist()
        setItems(updated)
      } else {
        setItems(prev => prev.filter(i => i.product.slug !== slug))
      }
      return res.wishlisted
    } catch (err) {
      console.error('Wishlist toggle failed', err)
    }
  }

  const isWishlisted = (slug: string) =>
    items.some(i => i.product.slug === slug)

  return { items, loading, toggle, isWishlisted }
}
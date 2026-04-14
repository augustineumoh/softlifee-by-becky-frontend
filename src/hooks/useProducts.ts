import { useState, useEffect, useCallback } from 'react'
import { productsAPI, type Product, type ProductDetail, type Category, type ProductFilters } from '../services/api'

// ── Hook: all products with filters ──────────────────────────────────────────
export function useProducts(filters?: ProductFilters) {
  const [products,    setProducts]    = useState<Product[]>([])
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState<string | null>(null)
  const [totalCount,  setTotalCount]  = useState(0)
  const [hasNext,     setHasNext]     = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productsAPI.getAll(filters)
      setProducts(data.results)
      setTotalCount(data.count)
      setHasNext(!!data.next)
    } catch {
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  return { products, loading, error, totalCount, hasNext, refetch: fetchProducts }
}

// ── Hook: single product detail ───────────────────────────────────────────────
export function useProduct(slug: string) {
  const [product,  setProduct]  = useState<ProductDetail | null>(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    productsAPI.getOne(slug)
      .then(setProduct)
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [slug])

  return { product, loading, error }
}

// ── Hook: categories ──────────────────────────────────────────────────────────
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    productsAPI.getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}

// ── Hook: search autocomplete ─────────────────────────────────────────────────
export function useSearch() {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await productsAPI.search(query)
        setResults(data.results)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 300) // debounce 300ms
    return () => clearTimeout(timer)
  }, [query])

  return { query, setQuery, results, loading }
}

// ── Hook: new arrivals ────────────────────────────────────────────────────────
export function useNewArrivals(count = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    productsAPI.getAll({ new_arrivals: true })
      .then(data => setProducts(data.results.slice(0, count)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [count])

  return { products, loading }
}
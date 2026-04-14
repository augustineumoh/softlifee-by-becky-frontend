import { useState, useEffect } from 'react'
import { ordersAPI, type Order, type CreateOrderData, type CreateOrderResponse } from '../services/api'
import { tokens } from '../services/api'

// ── Hook: create order ────────────────────────────────────────────────────────
export function useCreateOrder() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  const createOrder = async (data: CreateOrderData): Promise<CreateOrderResponse | null> => {
    setLoading(true)
    setError(null)
    try {
      const res = await ordersAPI.create(data)
      return res
    } catch (err: any) {
      const msg = err?.error || err?.detail || 'Failed to place order. Please try again.'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { createOrder, loading, error }
}

// ── Hook: order history ───────────────────────────────────────────────────────
export function useOrders() {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    // Don't even try if not logged in
    if (!tokens.access) {
      setLoading(false)
      setOrders([])
      return
    }

    ordersAPI.getMyOrders()
      .then(data => {
        // Safety check — ensure we always set an array
        setOrders(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        // 401 = not authenticated — just set empty array silently
        if (err?.status === 401 || err?.detail?.includes('401')) {
          setOrders([])
        } else {
          setError('Failed to load orders.')
        }
        setOrders([])
      })
      .finally(() => setLoading(false))
  }, [])

  return { orders, loading, error }
}

// ── Hook: verify Paystack payment ─────────────────────────────────────────────
export function useVerifyPayment(reference: string | null) {
  const [order,   setOrder]   = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    if (!reference) return
    setLoading(true)
    ordersAPI.verifyPayment(reference)
      .then(setOrder)
      .catch(() => setError('Could not verify payment.'))
      .finally(() => setLoading(false))
  }, [reference])

  return { order, loading, error }
}

// ── Hook: discount code validation ───────────────────────────────────────────
export function useDiscount() {
  const [loading,     setLoading]     = useState(false)
  const [discount,    setDiscount]    = useState<any | null>(null)
  const [error,       setError]       = useState<string | null>(null)
  const [appliedCode, setAppliedCode] = useState('')

  const validate = async (code: string, subtotal: number) => {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    setDiscount(null)
    try {
      const res = await ordersAPI.validateDiscount(code, subtotal)
      setDiscount(res)
      setAppliedCode(code)
    } catch (err: any) {
      setError(err?.error || 'Invalid discount code.')
    } finally {
      setLoading(false)
    }
  }

  const clear = () => {
    setDiscount(null)
    setError(null)
    setAppliedCode('')
  }

  return { validate, clear, discount, loading, error, appliedCode }
}
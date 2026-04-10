export interface Category {
  id: number
  name: string
  slug: string
  image_url: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: string             // Django returns decimals as strings
  discount_price: string | null
  category: Category
  stock: number
  image_url: string
  images: string[]
  is_new_arrival: boolean
  is_featured: boolean
  tags: string[]
  created_at: string
}

export interface ProductListResponse {
  count: number
  next: string | null
  previous: string | null
  results: Product[]
}

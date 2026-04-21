/**
 * Optimizes Cloudinary image URLs for fast loading.
 * Adds auto format, auto quality, and resize transformations.
 */
export function optimizeCloudinaryUrl(
  url: string | null | undefined,
  options: {
    width?:   number
    height?:  number
    quality?: string
    crop?:    string
  } = {}
): string {
  if (!url) return ''

  // Only transform Cloudinary URLs
  if (!url.includes('cloudinary.com')) return url

  const {
    width   = 800,
    quality = 'auto',
    crop    = 'fill',
  } = options

  // Insert transformation parameters into Cloudinary URL
  // Cloudinary URL format: https://res.cloudinary.com/cloud/image/upload/v123/filename
  const uploadIndex = url.indexOf('/upload/')
  if (uploadIndex === -1) return url

  const base        = url.substring(0, uploadIndex + 8) // includes /upload/
  const rest        = url.substring(uploadIndex + 8)

  const transforms = [
    `w_${width}`,
    `q_${quality}`,
    `f_auto`,
    `c_${crop}`,
  ].join(',')

  return `${base}${transforms}/${rest}`
}

/**
 * Get thumbnail URL (small, fast loading)
 */
export function thumbnailUrl(url: string | null | undefined): string {
  return optimizeCloudinaryUrl(url, { width: 400, quality: 'auto', crop: 'fill' })
}

/**
 * Get product image URL (medium)
 */
export function productImageUrl(url: string | null | undefined): string {
  return optimizeCloudinaryUrl(url, { width: 800, quality: 'auto', crop: 'fill' })
}

/**
 * Get full size image URL (for lightbox/zoom)
 */
export function fullImageUrl(url: string | null | undefined): string {
  return optimizeCloudinaryUrl(url, { width: 1200, quality: 'auto', crop: 'limit' })
}

/**
 * Get avatar URL (small square)
 */
export function avatarUrl(url: string | null | undefined): string {
  return optimizeCloudinaryUrl(url, { width: 200, quality: 'auto', crop: 'fill' })
}
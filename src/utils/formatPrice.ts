// src/utils/formatPrice.ts
// Formats a number as Nigerian Naira: formatPrice(12500) → "₦ 12,500"
export function formatPrice(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount
  return `₦ ${num.toLocaleString("en-NG")}`
}

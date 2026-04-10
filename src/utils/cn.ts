// src/utils/cn.ts
// Merges Tailwind class names cleanly
// Usage: cn('text-clay', isActive && 'font-bold', className)
import { clsx, type ClassValue } from 'clsx'
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

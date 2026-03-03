/**
 * Utility functions for the application
 */

// ============== Formatting Utilities ==============

/**
 * Format currency amount
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Format number with commas
 */
export const formatNumber = (
  num: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Format percentage
 */
export const formatPercentage = (
  value: number,
  decimals: number = 1
): string => {
  return `${value.toFixed(decimals)}%`
}

/**
 * Format file size
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Format phone number to (XXX) XXX-XXXX
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis: string = '...'
): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * Capitalize first letter
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Capitalize each word
 */
export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Slugify a string (for URLs)
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Generate random string
 */
export const generateRandomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// ============== Date Utilities ==============

/**
 * Format date
 */
export const formatDate = (
  date: Date | string,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric'
  }
  
  if (format === 'full') {
    options.weekday = 'long'
  }
  
  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Format time
 */
export const formatTime = (
  date: Date | string,
  locale: string = 'en-US'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

/**
 * Format datetime
 */
export const formatDateTime = (
  date: Date | string,
  locale: string = 'en-US'
): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }
  
  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds)
    
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`
    }
  }
  
  return 'just now'
}

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date
  const today = new Date()
  
  return d.toDateString() === today.toDateString()
}

/**
 * Check if date is this week
 */
export const isThisWeek = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
  const weekEnd = new Date(now.setDate(now.getDate() + 6))
  
  return d >= weekStart && d <= weekEnd
}

/**
 * Get start of day
 */
export const startOfDay = (date: Date = new Date()): Date => {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/**
 * Get end of day
 */
export const endOfDay = (date: Date = new Date()): Date => {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d
}

// ============== Validation Utilities ==============

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

/**
 * Validate URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate password strength
 */
export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate credit card (Luhn algorithm)
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '')
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false
  }
  
  let sum = 0
  let isEven = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i))
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

// ============== Array Utilities ==============

/**
 * Group array by key
 */
export const groupBy = <T>(
  array: T[],
  key: keyof T
): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Sort array by key
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * Unique array by key
 */
export const uniqueBy = <T>(
  array: T[],
  key: keyof T
): T[] => {
  const seen = new Set()
  return array.filter(item => {
    const val = item[key]
    if (seen.has(val)) return false
    seen.add(val)
    return true
  })
}

/**
 * Chunk array into smaller arrays
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  
  return chunks
}

/**
 * Shuffle array (Fisher-Yates)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

// ============== Object Utilities ==============

/**
 * Pick specific keys from object
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
    return result
  }, {} as Pick<T, K>)
}

/**
 * Omit specific keys from object
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj }
  
  for (const key of keys) {
    delete result[key]
  }
  
  return result
}

/**
 * Deep merge objects
 */
export const deepMerge = <T extends object>(
  target: T,
  source: Partial<T>
): T => {
  const output = { ...target }
  
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge(
        target[key] as object,
        source[key] as object
      ) as T[typeof key]
    } else {
      output[key] = source[key] as T[typeof key]
    }
  }
  
  return output
}

/**
 * Check if object is empty
 */
export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0
}

// ============== Number Utilities ==============

/**
 * Clamp number between min and max
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max)
}

/**
 * Random number between min and max
 */
export const random = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

/**
 * Random integer between min and max
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Calculate percentage
 */
export const percentage = (value: number, total: number): number => {
  if (total === 0) return 0
  return (value / total) * 100
}

/**
 * Round to decimal places
 */
export const roundTo = (num: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}

// ============== Color Utilities ==============

/**
 * Generate random hex color
 */
export const randomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

/**
 * Lighten or darken a color
 */
export const adjustColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)
  
  R = Math.floor(R * (100 + percent) / 100)
  G = Math.floor(G * (100 + percent) / 100)
  B = Math.floor(B * (100 + percent) / 100)
  
  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255
  
  const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)
  
  return '#' + RR + GG + BB
}

/**
 * Convert hex to rgb
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

// ============== Storage Utilities ==============

/**
 * Save to localStorage with expiry
 */
export const setWithExpiry = (
  key: string,
  value: any,
  ttl: number // time to live in milliseconds
): void => {
  const now = new Date()
  
  const item = {
    value,
    expiry: now.getTime() + ttl
  }
  
  localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get from localStorage with expiry check
 */
export const getWithExpiry = (key: string): any => {
  const itemStr = localStorage.getItem(key)
  
  if (!itemStr) return null
  
  const item = JSON.parse(itemStr)
  const now = new Date()
  
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  
  return item.value
}

// ============== URL Utilities ==============

/**
 * Get query params from URL
 */
export const getQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {}
  const searchParams = new URL(url).searchParams
  
  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }
  
  return params
}

/**
 * Build URL with query params
 */
export const buildUrl = (
  base: string,
  params: Record<string, string | number | boolean>
): string => {
  const url = new URL(base)
  
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, String(value))
  }
  
  return url.toString()
}

// ============== Debounce & Throttle ==============

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

// ============== Device Detection ==============

/**
 * Check if mobile device
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Check if touch device
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

// ============== Error Handling ==============

/**
 * Try catch wrapper for async functions
 */
export const tryCatch = async <T>(
  promise: Promise<T>,
  errorHandler?: (error: any) => void
): Promise<[T | null, any]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    if (errorHandler) {
      errorHandler(error)
    }
    return [null, error]
  }
}

/**
 * Safe JSON parse
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

// ============== Export all utilities ==============

export default {
  // Formatting
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatPhoneNumber,
  truncateText,
  capitalizeFirst,
  capitalizeWords,
  slugify,
  generateRandomString,
  
  // Dates
  formatDate,
  formatTime,
  formatDateTime,
  getRelativeTime,
  isToday,
  isThisWeek,
  startOfDay,
  endOfDay,
  
  // Validation
  isValidEmail,
  isValidPhone,
  isValidUrl,
  validatePassword,
  isValidCreditCard,
  
  // Arrays
  groupBy,
  sortBy,
  uniqueBy,
  chunk,
  shuffle,
  
  // Objects
  pick,
  omit,
  deepMerge,
  isEmptyObject,
  
  // Numbers
  clamp,
  random,
  randomInt,
  percentage,
  roundTo,
  
  // Colors
  randomColor,
  adjustColor,
  hexToRgb,
  
  // Storage
  setWithExpiry,
  getWithExpiry,
  
  // URL
  getQueryParams,
  buildUrl,
  
  // Performance
  debounce,
  throttle,
  
  // Device
  isMobile,
  isTouchDevice,
  
  // Error handling
  tryCatch,
  safeJsonParse
}
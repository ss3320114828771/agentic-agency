// ============== User Types ==============

export type UserRole = 'user' | 'admin' | 'super_admin' | 'moderator'

export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt?: string
  lastLogin?: string
  emailVerified: boolean
  twoFactorEnabled?: boolean
  preferences?: UserPreferences
  address?: Address[]
  paymentMethods?: PaymentMethod[]
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: NotificationPreferences
  currency: string
  timezone: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
  orderUpdates: boolean
  promotions: boolean
}

export interface Address {
  id: string
  type: 'shipping' | 'billing' | 'both'
  name: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
  createdAt: string
}

// ============== Product Types ==============

export type ProductStatus = 'active' | 'draft' | 'out_of_stock' | 'discontinued'

export type ProductCategory = 
  | 'AI Software'
  | 'Machine Learning'
  | 'Security'
  | 'Analytics'
  | 'AI Tools'
  | 'DevOps'
  | 'Legacy'

export interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: number
  originalPrice?: number
  category: ProductCategory
  subcategory?: string
  image: string
  images?: string[]
  rating: number
  reviews?: number
  stock: number
  sku?: string
  tags?: string[]
  features?: string[]
  specifications?: Record<string, string>
  status: ProductStatus
  createdAt: string
  updatedAt?: string
  metadata?: ProductMetadata
  variants?: ProductVariant[]
  relatedProducts?: string[]
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string>
}

export interface ProductMetadata {
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
    unit: 'cm' | 'in'
  }
  manufacturer?: string
  warranty?: string
  requiresSubscription?: boolean
  subscriptionPrice?: number
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  images?: string[]
  verified: boolean
  helpful: number
  notHelpful: number
  createdAt: string
  updatedAt?: string
  response?: ReviewResponse
}

export interface ReviewResponse {
  id: string
  userId: string
  userName: string
  comment: string
  createdAt: string
}

// ============== Cart Types ==============

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  variantId?: string
  variantAttributes?: Record<string, string>
  maxStock?: number
  addedAt: string
}

export interface Cart {
  id: string
  userId?: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  itemCount: number
  couponCode?: string
  couponDiscount?: number
  shippingAddress?: Address
  billingAddress?: Address
  paymentMethod?: PaymentMethod
  notes?: string
  expiresAt?: string
  createdAt: string
  updatedAt: string
}

export interface CartSummary {
  itemCount: number
  subtotal: number
  total: number
  shipping: number
  tax: number
  discount: number
  freeShippingEligible: boolean
  shippingThreshold: number
}

// ============== Order Types ==============

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'failed'

export type PaymentStatus = 
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

export type ShippingStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'returned'

export interface Order {
  id: string
  orderNumber: string
  userId: string
  userEmail: string
  userName: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  shippingStatus: ShippingStatus
  paymentMethod: PaymentMethod
  shippingAddress: Address
  billingAddress: Address
  couponCode?: string
  couponDiscount?: number
  notes?: string
  trackingNumber?: string
  trackingUrl?: string
  estimatedDelivery?: string
  deliveredAt?: string
  cancelledAt?: string
  refundedAt?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  price: number
  quantity: number
  total: number
  variantId?: string
  variantAttributes?: Record<string, string>
  refunded?: boolean
  refundAmount?: number
}

export interface OrderSummary {
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  completedOrders: number
  cancelledOrders: number
  totalRevenue: number
  averageOrderValue: number
  revenueByPeriod: RevenueByPeriod[]
}

export interface RevenueByPeriod {
  period: string
  revenue: number
  orders: number
}

// ============== API Types ==============

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  stack?: string
}

// ============== Auth Types ==============

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
  confirmPassword: string
  acceptTerms?: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  expiresIn: number
}

export interface TokenPayload {
  userId: string
  email: string
  role: UserRole
  exp: number
  iat: number
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  confirmPassword: string
}

// ============== Filter & Sort Types ==============

export interface ProductFilters {
  category?: string
  subcategory?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  tags?: string[]
  status?: 'active' | 'draft' | 'out_of_stock' | 'all'
  sortBy?: ProductSortField
  sortDirection?: 'asc' | 'desc'
}

export type ProductSortField = 
  | 'price'
  | 'rating'
  | 'name'
  | 'createdAt'
  | 'reviews'
  | 'popularity'

export interface OrderFilters {
  status?: OrderStatus[]
  paymentStatus?: PaymentStatus[]
  shippingStatus?: ShippingStatus[]
  dateFrom?: string
  dateTo?: string
  minTotal?: number
  maxTotal?: number
  search?: string
}

export interface UserFilters {
  role?: UserRole[]
  status?: UserStatus[]
  dateFrom?: string
  dateTo?: string
  search?: string
  verified?: boolean
}

// ============== UI Types ==============

export type Theme = 'light' | 'dark' | 'system'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  dismissible?: boolean
}

export interface ModalConfig {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnClickOutside?: boolean
  showCloseButton?: boolean
  onClose?: () => void
}

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabItem {
  id: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

// ============== Payment Types ==============

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'failed'
  clientSecret: string
  paymentMethod?: string
}

export interface Subscription {
  id: string
  userId: string
  planId: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  paymentMethod: PaymentMethod
}

// ============== Notification Types ==============

export interface Notification {
  id: string
  userId: string
  type: 'order' | 'promotion' | 'system' | 'security'
  title: string
  message: string
  read: boolean
  data?: Record<string, any>
  createdAt: string
  readAt?: string
}

// ============== Analytics Types ==============

export interface AnalyticsEvent {
  eventName: string
  userId?: string
  properties: Record<string, any>
  timestamp: string
}

export interface PageView {
  path: string
  title: string
  referrer?: string
  userId?: string
  timestamp: string
}

// ============== Search Types ==============

export interface SearchResult<T = any> {
  items: T[]
  total: number
  query: string
  filters: Record<string, any>
  suggestions?: string[]
}

export interface SearchSuggestion {
  text: string
  type: 'product' | 'category' | 'recent'
  score: number
}

// ============== SEO Types ==============

export interface SeoMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterCard?: 'summary' | 'summary_large_image'
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: Record<string, any>
}

// ============== Export all types ==============


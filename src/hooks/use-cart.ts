'use client'

import { useState, useEffect, useCallback } from 'react'

// Types
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  category?: string
  maxStock?: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  couponCode?: string
  couponDiscount?: number
}

export interface UseCartReturn {
  // Cart state
  cart: Cart
  items: CartItem[]
  total: number
  itemCount: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  
  // Cart actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  incrementItem: (productId: string) => void
  decrementItem: (productId: string) => void
  
  // Coupon actions
  applyCoupon: (code: string) => Promise<boolean>
  removeCoupon: () => void
  
  // Cart status
  isLoading: boolean
  hasItems: boolean
  isEmpty: boolean
  shippingThreshold: number
  freeShippingEligible: boolean
  
  // Cart calculations
  subtotalAfterDiscount: number
  taxRate: number
  estimatedTotal: number
  
  // Utilities
  getItem: (productId: string) => CartItem | undefined
  containsItem: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

// Constants
const STORAGE_KEY = 'shopping_cart'
const TAX_RATE = 0.1 // 10%
const FREE_SHIPPING_THRESHOLD = 100
const SHIPPING_COST = 10

// Valid coupon codes (in real app, fetch from API)
const VALID_COUPONS: Record<string, number> = {
  'SAVE10': 10,
  'SAVE20': 20,
  'WELCOME15': 15,
  'AI2024': 25,
  'WEBDEV': 30,
  'FREESHIP': 0, // Free shipping
}

// Load cart from localStorage
const loadCartFromStorage = (): Cart => {
  if (typeof window === 'undefined') {
    return { items: [], total: 0, itemCount: 0, subtotal: 0, tax: 0, shipping: 0, discount: 0 }
  }

  try {
    const savedCart = localStorage.getItem(STORAGE_KEY)
    if (savedCart) {
      return JSON.parse(savedCart)
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
  }

  return { items: [], total: 0, itemCount: 0, subtotal: 0, tax: 0, shipping: 0, discount: 0 }
}

// Save cart to localStorage
const saveCartToStorage = (cart: Cart) => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error)
  }
}

// Calculate cart totals
const calculateCartTotals = (items: CartItem[], couponCode?: string, couponDiscount?: number): Cart => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Calculate discount
  let discount = 0
  if (couponDiscount) {
    if (couponDiscount > 0) {
      discount = (subtotal * couponDiscount) / 100
    }
    // Free shipping coupon handled separately
  }

  const subtotalAfterDiscount = subtotal - discount
  
  // Calculate shipping
  let shipping = 0
  if (couponCode === 'FREESHIP') {
    shipping = 0
  } else {
    shipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  }
  
  // Calculate tax
  const tax = subtotalAfterDiscount * TAX_RATE
  
  // Calculate final total
  const total = subtotalAfterDiscount + tax + shipping
  
  // Calculate item count
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    items,
    subtotal,
    tax,
    shipping,
    discount,
    total,
    itemCount,
    couponCode,
    couponDiscount
  }
}

// Main hook
export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<Cart>({ 
    items: [], 
    total: 0, 
    itemCount: 0, 
    subtotal: 0, 
    tax: 0, 
    shipping: 0, 
    discount: 0 
  })
  const [isLoading, setIsLoading] = useState(true)

  // Load cart on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage()
    setCart(savedCart)
    setIsLoading(false)
  }, [])

  // Save cart when it changes
  useEffect(() => {
    if (!isLoading) {
      saveCartToStorage(cart)
    }
  }, [cart, isLoading])

  // Listen for storage events (for multi-tab support)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newCart = JSON.parse(e.newValue)
          setCart(newCart)
        } catch (error) {
          console.error('Failed to parse cart from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Add item to cart
  const addItem = useCallback((item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(i => i.productId === item.productId)
      const quantity = item.quantity || 1
      
      let newItems: CartItem[]
      
      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = [...prevCart.items]
        const currentQuantity = newItems[existingItemIndex].quantity
        const maxStock = newItems[existingItemIndex].maxStock || Infinity
        
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: Math.min(currentQuantity + quantity, maxStock)
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now().toString(),
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: quantity,
          image: item.image,
          category: item.category,
          maxStock: item.maxStock
        }
        newItems = [...prevCart.items, newItem]
      }
      
      return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
    })
  }, [])

  // Remove item from cart
  const removeItem = useCallback((productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.productId !== productId)
      return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
    })
  }, [])

  // Update item quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.productId === productId
          ? { 
              ...item, 
              quantity: Math.min(quantity, item.maxStock || Infinity)
            }
          : item
      )
      return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
    })
  }, [removeItem])

  // Increment item quantity
  const incrementItem = useCallback((productId: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => i.productId === productId)
      if (item) {
        const maxStock = item.maxStock || Infinity
        if (item.quantity < maxStock) {
          const newItems = prevCart.items.map(i =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
          return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
        }
      }
      return prevCart
    })
  }, [])

  // Decrement item quantity
  const decrementItem = useCallback((productId: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => i.productId === productId)
      if (item) {
        if (item.quantity <= 1) {
          const newItems = prevCart.items.filter(i => i.productId !== productId)
          return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
        } else {
          const newItems = prevCart.items.map(i =>
            i.productId === productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          return calculateCartTotals(newItems, prevCart.couponCode, prevCart.couponDiscount)
        }
      }
      return prevCart
    })
  }, [])

  // Clear cart
  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, itemCount: 0, subtotal: 0, tax: 0, shipping: 0, discount: 0 })
  }, [])

  // Apply coupon code
  const applyCoupon = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const upperCode = code.toUpperCase()
    const discount = VALID_COUPONS[upperCode]
    
    if (discount !== undefined) {
      setCart(prevCart => 
        calculateCartTotals(prevCart.items, upperCode, discount)
      )
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }, [])

  // Remove coupon
  const removeCoupon = useCallback(() => {
    setCart(prevCart => 
      calculateCartTotals(prevCart.items)
    )
  }, [])

  // Get item by productId
  const getItem = useCallback((productId: string) => {
    return cart.items.find(item => item.productId === productId)
  }, [cart.items])

  // Check if cart contains item
  const containsItem = useCallback((productId: string) => {
    return cart.items.some(item => item.productId === productId)
  }, [cart.items])

  // Get item quantity
  const getItemQuantity = useCallback((productId: string) => {
    const item = cart.items.find(item => item.productId === productId)
    return item?.quantity || 0
  }, [cart.items])

  // Computed values
  const subtotalAfterDiscount = cart.subtotal - cart.discount
  const freeShippingEligible = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD || cart.couponCode === 'FREESHIP'
  const estimatedTotal = cart.total
  const hasItems = cart.items.length > 0
  const isEmpty = !hasItems

  return {
    // Cart state
    cart,
    items: cart.items,
    total: cart.total,
    itemCount: cart.itemCount,
    subtotal: cart.subtotal,
    tax: cart.tax,
    shipping: cart.shipping,
    discount: cart.discount,
    
    // Cart actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    incrementItem,
    decrementItem,
    
    // Coupon actions
    applyCoupon,
    removeCoupon,
    
    // Cart status
    isLoading,
    hasItems,
    isEmpty,
    shippingThreshold: FREE_SHIPPING_THRESHOLD,
    freeShippingEligible,
    
    // Cart calculations
    subtotalAfterDiscount,
    taxRate: TAX_RATE,
    estimatedTotal,
    
    // Utilities
    getItem,
    containsItem,
    getItemQuantity
  }
}

// Helper hook to get cart summary (lightweight version)
export function useCartSummary() {
  const [itemCount, setItemCount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const updateSummary = () => {
      const cart = loadCartFromStorage()
      setItemCount(cart.itemCount)
      setTotal(cart.total)
    }

    updateSummary()

    // Listen for cart updates
    const handleCartUpdate = (e: CustomEvent<Cart>) => {
      setItemCount(e.detail.itemCount)
      setTotal(e.detail.total)
    }

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener)
    }
  }, [])

  return { itemCount, total }
}

// Helper hook to check if item is in cart
export function useCartItem(productId: string) {
  const [item, setItem] = useState<CartItem | undefined>()
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    const updateItem = () => {
      const cart = loadCartFromStorage()
      const foundItem = cart.items.find(i => i.productId === productId)
      setItem(foundItem)
      setQuantity(foundItem?.quantity || 0)
    }

    updateItem()

    const handleCartUpdate = () => {
      updateItem()
    }

    window.addEventListener('cartUpdated', handleCartUpdate)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate)
    }
  }, [productId])

  return { item, quantity, isInCart: !!item }
}

// Helper hook for cart totals only
export function useCartTotals() {
  const [subtotal, setSubtotal] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const updateTotals = () => {
      const cart = loadCartFromStorage()
      setSubtotal(cart.subtotal)
      setTotal(cart.total)
    }

    updateTotals()

    const handleCartUpdate = (e: CustomEvent<Cart>) => {
      setSubtotal(e.detail.subtotal)
      setTotal(e.detail.total)
    }

    window.addEventListener('cartUpdated', handleCartUpdate as EventListener)
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener)
    }
  }, [])

  return { subtotal, total }
}
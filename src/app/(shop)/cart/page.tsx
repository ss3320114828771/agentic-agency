'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Cart item type
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
  stock: number
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')

  // Load cart items from localStorage on mount
  useEffect(() => {
    loadCartItems()
  }, [])

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  // Save cart to localStorage
  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
    setCartItems(items)
    
    // Dispatch custom event for other components to update
    window.dispatchEvent(new Event('cartUpdated'))
  }

  // Update quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setUpdating(id)
    
    setTimeout(() => {
      const updatedItems = cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
      saveCart(updatedItems)
      setUpdating(null)
    }, 300)
  }

  // Remove item from cart
  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id)
    saveCart(updatedItems)
  }

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      saveCart([])
      setPromoApplied(false)
      setPromoDiscount(0)
      setPromoCode('')
    }
  }

  // Apply promo code
  const applyPromoCode = () => {
    setPromoError('')
    
    // Demo promo codes
    const validPromos: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME15': 15,
      'AI2024': 25,
      'WEBDEV': 30
    }

    const code = promoCode.toUpperCase().trim()
    
    if (validPromos[code]) {
      setPromoApplied(true)
      setPromoDiscount(validPromos[code])
      setPromoError('')
    } else {
      setPromoError('Invalid promo code')
      setPromoApplied(false)
      setPromoDiscount(0)
    }
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Calculate tax (10%)
  const tax = subtotal * 0.1
  
  // Calculate discount
  const discount = promoApplied ? (subtotal * (promoDiscount / 100)) : 0
  
  // Calculate shipping (free over $100)
  const shipping = subtotal > 100 ? 0 : 10
  
  // Calculate total
  const total = subtotal + tax + shipping - discount

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          <p className="mt-4 text-white">Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Bismillah at top */}
      <div className="text-center mb-8">
        <div className="text-3xl font-bold text-white mb-4 animate-pulse bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-300">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/20">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-300 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="space-y-4">
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Continue Shopping
              </Link>
              <div className="flex justify-center gap-4 text-sm text-gray-400">
                <Link href="/products/featured" className="hover:text-pink-400 transition-colors">
                  Featured Products
                </Link>
                <span>•</span>
                <Link href="/products/deals" className="hover:text-pink-400 transition-colors">
                  Special Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Cart with items
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
                {/* Cart Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-white/10 text-sm font-medium text-gray-400">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-white/10">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-6">
                      <div className="md:grid md:grid-cols-12 md:gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          {/* Product Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-2xl">
                                🖥️
                              </div>
                            )}
                          </div>
                          
                          {/* Product Details */}
                          <div>
                            <Link 
                              href={`/products/${item.id}`}
                              className="text-lg font-semibold text-white hover:text-pink-400 transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">{item.category}</p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 md:hidden"
                            >
                              <span>🗑️</span> Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center mt-4 md:mt-0">
                          <span className="text-white font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center mt-4 md:mt-0">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={updating === item.id || item.quantity <= 1}
                              className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              −
                            </button>
                            
                            <span className="w-12 text-center text-white">
                              {updating === item.id ? (
                                <span className="inline-block animate-spin">⟳</span>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={updating === item.id || item.quantity >= item.stock}
                              className="w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove */}
                        <div className="col-span-2 flex items-center justify-end gap-4 mt-4 md:mt-0">
                          <span className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-400 transition-colors hidden md:block"
                            title="Remove item"
                          >
                            <span className="text-xl">🗑️</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4">
                  <button
                    onClick={clearCart}
                    className="px-6 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
                  >
                    <span>🗑️</span>
                    Clear Cart
                  </button>
                  
                  <Link
                    href="/products"
                    className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <span>←</span>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={!promoCode || promoApplied}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="mt-1 text-sm text-red-400">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="mt-1 text-sm text-green-400 flex items-center gap-1">
                      <span>✅</span> Promo applied: {promoDiscount}% off
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-green-400">Free</span>
                    ) : (
                      <span>{formatCurrency(shipping)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount ({promoDiscount}%)</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-white/10 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-white">Total</span>
                      <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </button>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3">We accept:</p>
                  <div className="flex gap-3 text-2xl">
                    <span className="opacity-50 hover:opacity-100 transition-opacity" title="Visa">💳</span>
                    <span className="opacity-50 hover:opacity-100 transition-opacity" title="Mastercard">💳</span>
                    <span className="opacity-50 hover:opacity-100 transition-opacity" title="PayPal">🅿️</span>
                    <span className="opacity-50 hover:opacity-100 transition-opacity" title="Apple Pay">🍎</span>
                    <span className="opacity-50 hover:opacity-100 transition-opacity" title="Google Pay">🇬</span>
                  </div>
                </div>

                {/* Admin Info */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-400">Administrator</p>
                  <p className="text-sm font-medium text-white">Hafiz Sajid Syed</p>
                  <p className="text-xs text-gray-400">sajid.syed@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Products */}
      {cartItems.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href={`/products/recommended-${i}`}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg mb-3 flex items-center justify-center text-3xl">
                  🖥️
                </div>
                <h3 className="text-sm font-medium text-white truncate">Recommended Product {i}</h3>
                <p className="text-sm text-yellow-400">${(99.99 * i).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
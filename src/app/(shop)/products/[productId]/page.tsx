'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// Simple product type
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  stock: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.productId as string

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState('details')
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  // Load product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Simple mock product
        const mockProduct: Product = {
          id: productId,
          name: 'AI Development Suite Pro',
          description: 'Complete AI-powered development platform with advanced features for modern web development',
          price: 299.99,
          category: 'AI Software',
          image: '/product-main.jpg',
          rating: 4.8,
          stock: 45
        }

        // Simple related products
        const mockRelated: Product[] = [
          { id: '2', name: 'AI Testing Tool', description: 'Automated testing', price: 149.99, category: 'AI', image: '/product2.jpg', rating: 4.6, stock: 30 },
          { id: '3', name: 'AI Deploy Pro', description: 'Easy deployment', price: 199.99, category: 'AI', image: '/product3.jpg', rating: 4.7, stock: 25 },
          { id: '4', name: 'AI Code Review', description: 'Smart code review', price: 129.99, category: 'AI', image: '/product4.jpg', rating: 4.5, stock: 50 }
        ]

        setProduct(mockProduct)
        setRelatedProducts(mockRelated)
      } catch (error) {
        console.log('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  // Simple add to cart
  const addToCart = () => {
    if (!product) return
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
    window.dispatchEvent(new Event('cartUpdated'))
  }

  // Buy now
  const buyNow = () => {
    addToCart()
    setTimeout(() => router.push('/cart'), 500)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // Not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <Link href="/products" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      {/* Bismillah */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      </div>

      {/* Simple breadcrumb */}
      <div className="max-w-6xl mx-auto mb-4 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link> › <Link href="/products" className="hover:text-white">Products</Link> › <span className="text-white">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Simple image placeholder */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl aspect-square flex items-center justify-center border border-white/20">
            <span className="text-8xl opacity-30">🖼️</span>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                ✅ In Stock ({product.stock})
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400 text-xl">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-300">{product.rating} (156 reviews)</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
              ${product.price.toFixed(2)}
            </div>

            {/* Description */}
            <p className="text-gray-300">{product.description}</p>

            {/* Simple quantity selector */}
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Qty:</span>
              <div className="flex border border-white/20 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity-1))}
                  className="px-4 py-2 bg-white/10 text-white hover:bg-white/20"
                >−</button>
                <span className="px-6 py-2 bg-white/5 text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity+1))}
                  className="px-4 py-2 bg-white/10 text-white hover:bg-white/20"
                >+</button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={addToCart}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all"
              >
                🛒 Add to Cart
              </button>
              <button 
                onClick={buyNow}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:scale-105 transition-all"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Success message */}
            {addedToCart && (
              <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center">
                ✅ Added to cart!
              </div>
            )}

            {/* Simple product meta */}
            <div className="pt-4 border-t border-white/10 text-sm text-gray-400">
              <p>Category: {product.category}</p>
              <p>SKU: AI-{product.id}-2024</p>
            </div>
          </div>
        </div>

        {/* Simple tabs */}
        <div className="mt-12">
          <div className="flex gap-4 border-b border-white/10">
            <button 
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 ${activeTab === 'details' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400'}`}
            >
              Details
            </button>
            <button 
              onClick={() => setActiveTab('features')}
              className={`px-4 py-2 ${activeTab === 'features' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400'}`}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 ${activeTab === 'reviews' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-gray-400'}`}
            >
              Reviews
            </button>
          </div>

          <div className="mt-6 p-6 bg-white/5 backdrop-blur-lg rounded-xl">
            {activeTab === 'details' && (
              <div className="text-gray-300">
                <h3 className="text-xl font-bold text-white mb-4">Product Details</h3>
                <p>This powerful AI development suite includes everything you need to build modern applications with artificial intelligence. Perfect for developers and teams looking to integrate AI capabilities into their workflow.</p>
                <ul className="list-disc pl-5 mt-4 space-y-1">
                  <li>Complete AI development toolkit</li>
                  <li>Supports multiple programming languages</li>
                  <li>Cloud integration ready</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <div className="grid gap-3">
                  {['AI Code Completion', 'Bug Detection', 'Performance Tools', 'Team Collaboration'].map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">👤</span>
                        <span className="text-white font-medium">Customer {i}</span>
                        <span className="text-yellow-400 ml-auto">{'★'.repeat(5)}</span>
                      </div>
                      <p className="text-gray-300 text-sm">Great product! Really helped our development team work faster.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedProducts.map(item => (
              <Link 
                key={item.id} 
                href={`/products/${item.id}`}
                className="bg-white/5 backdrop-blur-lg p-4 rounded-xl hover:scale-105 transition-all"
              >
                <div className="aspect-square bg-purple-900/30 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl opacity-30">🖥️</span>
                </div>
                <h3 className="text-white font-bold truncate">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-2 truncate">{item.description}</p>
                <div className="flex justify-between">
                  <span className="text-yellow-400">${item.price}</span>
                  <span className="text-gray-400 text-sm">★ {item.rating}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Admin info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-purple-600/20 backdrop-blur-lg px-6 py-3 rounded-xl">
            <p className="text-sm text-gray-400">Admin: Hafiz Sajid Syed</p>
            <p className="text-pink-400 text-sm">sajid.syed@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
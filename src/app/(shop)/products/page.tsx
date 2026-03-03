'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  badge?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Load products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Simple mock products
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'AI Development Suite Pro',
            description: 'Complete AI-powered development platform',
            price: 299.99,
            category: 'AI Software',
            image: '/product1.jpg',
            rating: 4.8,
            stock: 45,
            badge: 'Bestseller'
          },
          {
            id: '2',
            name: 'AI Testing Assistant',
            description: 'Automated testing and QA tool',
            price: 149.99,
            category: 'AI Software',
            image: '/product2.jpg',
            rating: 4.6,
            stock: 30,
            badge: 'New'
          },
          {
            id: '3',
            name: 'AI Deployment Manager',
            description: 'Streamlined deployment solution',
            price: 199.99,
            category: 'DevOps',
            image: '/product3.jpg',
            rating: 4.7,
            stock: 25
          },
          {
            id: '4',
            name: 'AI Code Review Pro',
            description: 'Intelligent code review automation',
            price: 129.99,
            category: 'AI Software',
            image: '/product4.jpg',
            rating: 4.5,
            stock: 50
          },
          {
            id: '5',
            name: 'ML Model Trainer',
            description: 'Train and deploy ML models easily',
            price: 399.99,
            category: 'Machine Learning',
            image: '/product5.jpg',
            rating: 4.9,
            stock: 15,
            badge: 'Premium'
          },
          {
            id: '6',
            name: 'AI Chatbot Builder',
            description: 'Create intelligent chatbots fast',
            price: 89.99,
            category: 'AI Tools',
            image: '/product6.jpg',
            rating: 4.4,
            stock: 100
          },
          {
            id: '7',
            name: 'Data Analytics AI',
            description: 'Advanced data analysis with AI',
            price: 249.99,
            category: 'Analytics',
            image: '/product7.jpg',
            rating: 4.7,
            stock: 35
          },
          {
            id: '8',
            name: 'AI Security Suite',
            description: 'AI-powered security monitoring',
            price: 329.99,
            category: 'Security',
            image: '/product8.jpg',
            rating: 4.8,
            stock: 20,
            badge: 'Featured'
          }
        ]
        
        setProducts(mockProducts)
      } catch (error) {
        console.log('Error loading products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      {/* Bismillah */}
      <div className="text-center mb-8">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mt-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
          Our Products
        </h1>
        <p className="text-gray-300 mt-2">Discover our collection of AI-powered solutions</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="featured" className="bg-gray-900">Featured</option>
                <option value="price-low" className="bg-gray-900">Price: Low to High</option>
                <option value="price-high" className="bg-gray-900">Price: High to Low</option>
                <option value="rating" className="bg-gray-900">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto mb-4 text-gray-400">
        {sortedProducts.length} products found
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/5 backdrop-blur-lg rounded-xl">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl text-white mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/20 hover:border-pink-500/50"
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">🖥️</span>
                  </div>
                  
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full">
                      {product.badge}
                    </span>
                  )}
                  
                  {/* Stock indicator */}
                  {product.stock < 10 && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-red-500/80 text-white text-xs rounded-full">
                      Only {product.stock} left
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {product.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['AI Software', 'DevOps', 'Analytics', 'Security'].map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className="p-4 bg-white/5 backdrop-blur-lg rounded-xl text-center hover:scale-105 transition-all border border-white/20 hover:border-pink-500/50"
            >
              <div className="text-3xl mb-2">
                {['🤖', '🚀', '📊', '🔒'][i]}
              </div>
              <h3 className="text-white font-medium">{cat}</h3>
              <p className="text-sm text-gray-400">
                {products.filter(p => p.category === cat).length} items
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
          <p className="text-gray-300 mb-4">Get notified about new products and special offers</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="inline-block bg-purple-600/20 backdrop-blur-lg px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Store Administrator</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Simple types
interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  badge?: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  comment: string
  rating: number
  avatar: string
}

export default function ShopHomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [bestSellers, setBestSellers] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock featured products
        setFeaturedProducts([
          { id: '1', name: 'AI Development Suite Pro', description: 'Complete AI platform', price: 299.99, category: 'AI Software', image: '/product1.jpg', rating: 4.8, badge: 'Featured' },
          { id: '2', name: 'ML Model Trainer', description: 'Train ML models', price: 399.99, category: 'Machine Learning', image: '/product2.jpg', rating: 4.9, badge: 'Premium' },
          { id: '3', name: 'AI Security Suite', description: 'Security monitoring', price: 329.99, category: 'Security', image: '/product3.jpg', rating: 4.8, badge: 'Featured' },
          { id: '4', name: 'Data Analytics AI', description: 'Advanced analytics', price: 249.99, category: 'Analytics', image: '/product4.jpg', rating: 4.7, badge: 'Popular' }
        ])

        // Mock best sellers
        setBestSellers([
          { id: '5', name: 'AI Testing Assistant', description: 'Automated testing', price: 149.99, category: 'AI Software', image: '/product5.jpg', rating: 4.6, badge: 'Bestseller' },
          { id: '6', name: 'AI Code Review Pro', description: 'Code review', price: 129.99, category: 'AI Software', image: '/product6.jpg', rating: 4.5, badge: 'Bestseller' },
          { id: '7', name: 'AI Chatbot Builder', description: 'Create chatbots', price: 89.99, category: 'AI Tools', image: '/product7.jpg', rating: 4.4, badge: 'Bestseller' },
          { id: '8', name: 'AI Deployment Manager', description: 'Deployment tool', price: 199.99, category: 'DevOps', image: '/product8.jpg', rating: 4.7, badge: 'Bestseller' }
        ])

        // Mock new arrivals
        setNewArrivals([
          { id: '9', name: 'AI Vision Pro', description: 'Computer vision', price: 449.99, category: 'AI Software', image: '/product9.jpg', rating: 5.0, badge: 'New' },
          { id: '10', name: 'AI Voice Studio', description: 'Voice processing', price: 279.99, category: 'AI Tools', image: '/product10.jpg', rating: 5.0, badge: 'New' },
          { id: '11', name: 'AI Analytics 360', description: 'Full analytics suite', price: 399.99, category: 'Analytics', image: '/product11.jpg', rating: 4.9, badge: 'New' },
          { id: '12', name: 'AI AutoML Pro', description: 'Automated ML', price: 499.99, category: 'Machine Learning', image: '/product12.jpg', rating: 5.0, badge: 'New' }
        ])
      } catch (error) {
        console.log('Error loading data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Hero slides
  const heroSlides = [
    {
      title: 'AI-Powered Development',
      subtitle: 'Supercharge Your Coding with AI',
      description: 'Enterprise-grade AI tools for modern developers',
      cta: 'Shop Now',
      link: '/products',
      color: 'from-purple-600 to-pink-600',
      image: '🤖'
    },
    {
      title: 'Summer Sale',
      subtitle: 'Up to 40% Off',
      description: 'Limited time offers on all AI tools',
      cta: 'View Deals',
      link: '/deals',
      color: 'from-green-600 to-teal-600',
      image: '🔥'
    },
    {
      title: 'New Arrivals',
      subtitle: 'Latest AI Technology',
      description: 'Be the first to access cutting-edge tools',
      cta: 'Explore',
      link: '/new',
      color: 'from-blue-600 to-cyan-600',
      image: '✨'
    }
  ]

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Categories
  const categories = [
    { name: 'AI Software', icon: '🤖', count: 24, color: 'from-purple-500 to-pink-500' },
    { name: 'DevOps Tools', icon: '🚀', count: 18, color: 'from-blue-500 to-cyan-500' },
    { name: 'Analytics', icon: '📊', count: 15, color: 'from-green-500 to-teal-500' },
    { name: 'Security', icon: '🔒', count: 12, color: 'from-red-500 to-orange-500' },
    { name: 'Machine Learning', icon: '🧠', count: 20, color: 'from-purple-500 to-indigo-500' },
    { name: 'AI Tools', icon: '🛠️', count: 30, color: 'from-yellow-500 to-orange-500' }
  ]

  // Benefits
  const benefits = [
    { icon: '🚚', title: 'Free Shipping', description: 'On orders over $100' },
    { icon: '🔒', title: 'Secure Payment', description: '256-bit encryption' },
    { icon: '💬', title: '24/7 Support', description: 'AI-powered assistance' },
    { icon: '↩️', title: '30-Day Returns', description: 'Money-back guarantee' }
  ]

  // Testimonials
  const testimonials: Testimonial[] = [
    { id: '1', name: 'John Doe', role: 'Lead Developer', comment: 'These AI tools have transformed our development workflow. Highly recommended!', rating: 5, avatar: '👨‍💻' },
    { id: '2', name: 'Jane Smith', role: 'CTO', comment: 'Best investment we made this year. The AI capabilities are outstanding.', rating: 5, avatar: '👩‍💻' },
    { id: '3', name: 'Mike Johnson', role: 'Freelancer', comment: 'Perfect for solo developers. Great value for money.', rating: 4, avatar: '👨‍🔧' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading amazing shop...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Bismillah */}
      <div className="text-center py-4">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      </div>

      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeHeroSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-90`}></div>
            
            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <p className="text-xl mb-2 animate-bounce">{slide.subtitle}</p>
                <h1 className="text-5xl md:text-7xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl mb-8">{slide.description}</p>
                <Link
                  href={slide.link}
                  className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:scale-105 transition-transform shadow-lg"
                >
                  {slide.cta} →
                </Link>
              </div>
              
              {/* Hero Image */}
              <div className="absolute right-10 bottom-10 text-[200px] opacity-20 hidden lg:block">
                {slide.image}
              </div>
            </div>
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveHeroSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeHeroSlide ? 'w-8 bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-white/5 backdrop-blur-lg border-y border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <span className="text-3xl">{benefit.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-sm">{benefit.title}</h3>
                  <p className="text-gray-400 text-xs">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Products</h2>
          <p className="text-gray-400">Hand-picked AI tools for your success</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative flex items-center justify-center">
                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">🖥️</span>
                {product.badge && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    ${product.price}
                  </span>
                  <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="bg-gradient-to-b from-purple-900/20 to-pink-900/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Shop by Category</h2>
            <p className="text-gray-400">Find exactly what you need</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/products?category=${cat.name}`}
                className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 text-center hover:scale-105 transition-all border border-white/20"
              >
                <span className={`text-4xl mb-3 inline-block bg-gradient-to-r ${cat.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </span>
                <h3 className="text-white font-bold mb-1">{cat.name}</h3>
                <p className="text-gray-400 text-sm">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Best Sellers</h2>
          <p className="text-gray-400">Most popular AI tools this month</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative flex items-center justify-center">
                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">🖥️</span>
                <span className="absolute top-2 right-2 text-2xl">🔥</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    ${product.price}
                  </span>
                  <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-9xl opacity-10">✨</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Special AI Developer Bundle</h2>
          <p className="text-xl mb-6 opacity-90">Get 5 premium AI tools at 40% discount</p>
          <Link
            href="/bundle"
            className="inline-block px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Learn More →
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">New Arrivals</h2>
          <p className="text-gray-400">Latest AI innovations just landed</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 relative flex items-center justify-center">
                <span className="text-6xl opacity-30 group-hover:scale-110 transition-transform">🖥️</span>
                <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                  NEW
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
                    ${product.price}
                  </span>
                  <span className="text-yellow-400 text-sm">★ {product.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/5 backdrop-blur-lg py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">What Our Customers Say</h2>
            <p className="text-gray-400">Trusted by developers worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{t.avatar}</span>
                  <div>
                    <h3 className="text-white font-bold">{t.name}</h3>
                    <p className="text-gray-400 text-sm">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">"{t.comment}"</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(t.rating)}
                  {'☆'.repeat(5 - t.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Get the latest AI tools and exclusive offers</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:scale-105 transition-transform">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">We respect your privacy. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Admin Info */}
      <div className="text-center pb-8">
        <div className="inline-block bg-purple-600/20 backdrop-blur-lg px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Shop Administrator</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
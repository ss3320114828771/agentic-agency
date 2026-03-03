import Link from 'next/link'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Shop Header */}
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 border-b border-white/10 sticky top-0 z-50 backdrop-blur-lg bg-opacity-90">
        <div className="container mx-auto px-4">
          {/* Top Bar - Quick Links */}
          <div className="hidden md:flex justify-end items-center py-2 text-sm border-b border-white/10">
            <div className="flex items-center gap-4">
              <Link href="/support" className="text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/track-order" className="text-gray-300 hover:text-white transition-colors">
                Track Order
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
              <span className="text-gray-500">|</span>
              <Link href="/auth/login" className="text-pink-400 hover:text-pink-300 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/register" className="text-pink-400 hover:text-pink-300 transition-colors">
                Register
              </Link>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🤖</span>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  Agentic AI
                </span>
                <span className="text-xs text-gray-400 block">Tech Shop</span>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products, AI tools, solutions..."
                  className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700">
                  Search
                </button>
              </div>
            </div>

            {/* Header Icons */}
            <div className="flex items-center gap-4">
              {/* Cart Icon */}
              <Link href="/cart" className="relative group">
                <span className="text-2xl group-hover:scale-110 transition-transform inline-block">🛒</span>
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs flex items-center justify-center text-white">
                  0
                </span>
              </Link>

              {/* Wishlist Icon */}
              <Link href="/wishlist" className="hidden md:block">
                <span className="text-2xl hover:scale-110 transition-transform inline-block">❤️</span>
              </Link>

              {/* Account Icon - Mobile */}
              <Link href="/account" className="md:hidden">
                <span className="text-2xl">👤</span>
              </Link>

              {/* Mobile Menu Button */}
              <button className="lg:hidden text-2xl">
                ☰
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:flex items-center justify-center gap-1 py-3">
            {[
              { name: 'Home', href: '/', icon: '🏠' },
              { name: 'AI Software', href: '/products?category=AI Software', icon: '🤖' },
              { name: 'DevOps Tools', href: '/products?category=DevOps', icon: '🚀' },
              { name: 'Analytics', href: '/products?category=Analytics', icon: '📊' },
              { name: 'Security', href: '/products?category=Security', icon: '🔒' },
              { name: 'Deals', href: '/deals', icon: '🔥' },
              { name: 'New Arrivals', href: '/new', icon: '✨' },
              { name: 'Support', href: '/support', icon: '💬' },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Search Bar */}
          <div className="lg:hidden py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 text-center text-sm">
        <p className="container mx-auto px-4">
          🚀 Free shipping on orders over $100 | 30-day money-back guarantee | AI-powered support 24/7
        </p>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Shop Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🤖</span>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  Agentic AI Shop
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your premier destination for AI-powered development tools and solutions. Empowering developers with cutting-edge technology.
              </p>
              <div className="flex gap-3">
                {['📘', '🐦', '💼', '📺', '💻'].map((social, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl hover:bg-white/20 hover:scale-110 transition-all">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['About Us', 'Contact', 'Blog', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-bold mb-4">Products</h3>
              <ul className="space-y-2">
                {['AI Software', 'DevOps Tools', 'Analytics', 'Security', 'Support'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                {['Help Center', 'FAQs', 'Contact Us', 'Shipping', 'Returns'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-gray-400 text-sm">
                © 2024 Agentic AI Shop. All rights reserved. | Admin: Hafiz Sajid Syed
              </div>
              <div className="flex gap-4 md:justify-end text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
                <Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link>
                <Link href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-lg shadow-green-500/50">
          💬
        </button>
        <button className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition-transform shadow-lg shadow-purple-600/50">
          ↑
        </button>
      </div>
    </div>
  )
}
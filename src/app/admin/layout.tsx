'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '🖥️' },
    { name: 'Orders', href: '/admin/orders', icon: '📦' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  // Quick actions
  const quickActions = [
    { name: 'Add Product', icon: '➕', href: '/admin/products/new' },
    { name: 'View Orders', icon: '📋', href: '/admin/orders' },
    { name: 'Manage Users', icon: '👤', href: '/admin/users' },
    { name: 'Settings', icon: '🔧', href: '/admin/settings' },
  ]

  // Helper function to format page name for breadcrumb
  const formatPageName = (path: string) => {
    const pageName = path.split('/').pop() || ''
    return pageName.charAt(0).toUpperCase() + pageName.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-2xl text-white hover:bg-white/10 p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                ☰
              </button>

              {/* Logo */}
              <Link href="/admin" className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                  Admin Panel
                </span>
              </Link>

              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400 ml-4">
                <span>Admin</span>
                {pathname !== '/admin' && (
                  <>
                    <span>›</span>
                    <span className="text-white">{formatPageName(pathname)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button 
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>

              {/* Messages */}
              <button 
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block"
                aria-label="Messages"
              >
                <span className="text-xl">💬</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 ml-2 pl-2 border-l border-white/20">
                <div className="text-right hidden md:block">
                  <p className="text-white text-sm font-medium">Hafiz Sajid Syed</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  HS
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64
            bg-gradient-to-b from-purple-900/90 to-pink-900/90 backdrop-blur-lg
            border-r border-white/10 transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
          aria-label="Admin sidebar"
        >
          <div className="h-full flex flex-col">
            {/* Admin Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-white font-bold">Hafiz Sajid</p>
                  <p className="text-gray-400 text-sm">Super Admin</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <p className="text-xs text-gray-400 uppercase mb-3">Main Menu</p>
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                          ${isActive 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                          }
                        `}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                        {isActive && (
                          <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Quick Actions */}
              <p className="text-xs text-gray-400 uppercase mt-6 mb-3">Quick Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex flex-col items-center gap-1 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs text-gray-300">{action.name}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-white/10">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors w-full"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-xl">🏠</span>
                <span className="font-medium">Back to Shop</span>
              </Link>
              <button 
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-colors w-full mt-1"
                onClick={() => {
                  // Add logout logic here
                  console.log('Logout clicked')
                }}
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Status Bar */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10 px-4 py-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-gray-300">System Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-gray-300">Database Connected</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Last backup: Today 3:00 AM</span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-400">Version 2.4.0</span>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Admin Footer */}
      <footer className="bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-lg border-t border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 Agentic AI Shop. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Admin: Hafiz Sajid Syed</span>
              <span className="text-gray-500">|</span>
              <span className="text-sm text-gray-400">sajid.syed@example.com</span>
              <span className="text-gray-500">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
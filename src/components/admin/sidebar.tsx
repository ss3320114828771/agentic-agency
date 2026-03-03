'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: number
  badgeColor?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['main', 'management'])

  // Navigation sections
  const navSections: NavSection[] = [
    {
      title: 'main',
      items: [
        { name: 'Dashboard', href: '/admin', icon: '📊', badge: 3, badgeColor: 'pink' },
        { name: 'Analytics', href: '/admin/analytics', icon: '📈' },
        { name: 'Reports', href: '/admin/reports', icon: '📑' }
      ]
    },
    {
      title: 'management',
      items: [
        { name: 'Products', href: '/admin/products', icon: '🖥️', badge: 12, badgeColor: 'blue' },
        { name: 'Orders', href: '/admin/orders', icon: '📦', badge: 23, badgeColor: 'yellow' },
        { name: 'Users', href: '/admin/users', icon: '👥', badge: 5, badgeColor: 'green' },
        { name: 'Categories', href: '/admin/categories', icon: '📂' }
      ]
    },
    {
      title: 'content',
      items: [
        { name: 'Blog', href: '/admin/blog', icon: '✍️' },
        { name: 'Pages', href: '/admin/pages', icon: '📄' },
        { name: 'Media', href: '/admin/media', icon: '🖼️' }
      ]
    },
    {
      title: 'settings',
      items: [
        { name: 'General', href: '/admin/settings', icon: '⚙️' },
        { name: 'Payment', href: '/admin/payment', icon: '💰' },
        { name: 'Shipping', href: '/admin/shipping', icon: '🚚' },
        { name: 'Team', href: '/admin/team', icon: '👥' }
      ]
    }
  ]

  // Quick actions
  const quickActions = [
    { name: 'Add Product', icon: '➕', href: '/admin/products/new', color: 'purple' },
    { name: 'New Order', icon: '📝', href: '/admin/orders/new', color: 'blue' },
    { name: 'Add User', icon: '👤', href: '/admin/users/new', color: 'green' },
    { name: 'Settings', icon: '⚙️', href: '/admin/settings', color: 'gray' }
  ]

  // Recent items
  const recentItems = [
    { name: 'AI Suite Pro', type: 'product', time: '2 min ago', icon: '🖥️' },
    { name: 'Order #12345', type: 'order', time: '15 min ago', icon: '📦' },
    { name: 'New user joined', type: 'user', time: '1 hour ago', icon: '👤' }
  ]

  // Toggle section expansion
  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  // Check if nav item is active
  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  // Get badge color class
  const getBadgeColor = (color: string = 'pink') => {
    const colors = {
      pink: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      green: 'bg-green-500/20 text-green-300 border-green-500/30',
      yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      red: 'bg-red-500/20 text-red-300 border-red-500/30'
    }
    return colors[color as keyof typeof colors] || colors.pink
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72
          bg-gradient-to-b from-gray-900 to-purple-900
          border-r border-white/10 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-full
        `}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3" onClick={onClose}>
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <h2 className="font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-gray-400">v2.4.0</p>
              </div>
            </Link>
            
            {/* Close button - mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden text-gray-400 hover:text-white p-2"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>

          {/* Quick Search */}
          <div className="mt-4 relative">
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full px-4 py-2 pl-9 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              🔍
            </span>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">
              ⌘K
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b border-white/10">
          <p className="text-xs text-gray-400 uppercase mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                onClick={onClose}
                className={`
                  flex flex-col items-center gap-1 p-3 rounded-lg transition-all
                  bg-gradient-to-br from-${action.color}-600/20 to-${action.color}-600/5
                  hover:from-${action.color}-600/30 hover:to-${action.color}-600/10
                  border border-white/10 hover:border-${action.color}-500/30
                  group
                `}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <span className="text-xs text-gray-300">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {navSections.map((section) => (
            <div key={section.title} className="mb-6">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between text-xs text-gray-400 uppercase mb-2 hover:text-white transition-colors"
              >
                <span>{section.title}</span>
                <span className="text-lg">
                  {expandedSections.includes(section.title) ? '−' : '+'}
                </span>
              </button>

              {/* Section Items */}
              {expandedSections.includes(section.title) && (
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`
                            flex items-center justify-between px-4 py-2.5 rounded-lg transition-all
                            ${active
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          {item.badge && (
                            <span className={`
                              px-2 py-0.5 text-xs rounded-full border
                              ${getBadgeColor(item.badgeColor)}
                            `}>
                              {item.badge}
                            </span>
                          )}
                          {active && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full ml-2"></span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Recent Activity */}
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-400 uppercase mb-3">Recent Activity</p>
          <div className="space-y-3">
            {recentItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-sm">
                <span className="text-lg bg-white/5 p-1.5 rounded-lg">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold">
              HS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">Hafiz Sajid Syed</p>
              <p className="text-xs text-gray-400 truncate">Super Administrator</p>
            </div>
            <button className="text-gray-400 hover:text-white p-1" title="Settings">
              ⚙️
            </button>
          </div>

          {/* Status indicators */}
          <div className="mt-3 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-400">Online</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span className="text-gray-400">Admin</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="mt-3 flex gap-2">
            <Link
              href="/"
              className="flex-1 text-center px-2 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors"
              onClick={onClose}
            >
              🏠 Shop
            </Link>
            <button
              onClick={() => console.log('Logout')}
              className="flex-1 text-center px-2 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 hover:bg-white/10 transition-colors"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
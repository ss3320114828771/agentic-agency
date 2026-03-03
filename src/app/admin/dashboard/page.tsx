'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Simple types
interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  lowStock: number
}

interface RecentOrder {
  id: string
  customer: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  items: number
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  stock: number
}

interface Activity {
  id: string
  user: string
  action: string
  time: string
  type: 'order' | 'product' | 'user' | 'system'
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('week')
  const [notifications, setNotifications] = useState(3)

  // Load dashboard data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock stats
        setStats({
          totalUsers: 15432,
          totalProducts: 234,
          totalOrders: 5678,
          totalRevenue: 456789,
          pendingOrders: 23,
          lowStock: 12
        })

        // Mock recent orders
        setRecentOrders([
          { id: 'ORD-2024-001', customer: 'John Smith', amount: 1299.99, status: 'pending', date: '2024-01-15', items: 3 },
          { id: 'ORD-2024-002', customer: 'Sarah Johnson', amount: 599.99, status: 'processing', date: '2024-01-15', items: 2 },
          { id: 'ORD-2024-003', customer: 'Mike Wilson', amount: 899.99, status: 'shipped', date: '2024-01-14', items: 4 },
          { id: 'ORD-2024-004', customer: 'Emily Brown', amount: 249.99, status: 'delivered', date: '2024-01-14', items: 1 },
          { id: 'ORD-2024-005', customer: 'David Lee', amount: 1799.99, status: 'pending', date: '2024-01-13', items: 5 }
        ])

        // Mock top products
        setTopProducts([
          { id: '1', name: 'AI Development Suite Pro', sales: 234, revenue: 69999, stock: 45 },
          { id: '2', name: 'ML Model Trainer', sales: 189, revenue: 75411, stock: 23 },
          { id: '3', name: 'AI Security Suite', sales: 156, revenue: 51444, stock: 34 },
          { id: '4', name: 'Data Analytics AI', sales: 143, revenue: 35657, stock: 56 },
          { id: '5', name: 'AI Testing Assistant', sales: 98, revenue: 14699, stock: 12 }
        ])

        // Mock activities
        setActivities([
          { id: '1', user: 'Admin', action: 'New order received #ORD-2024-001', time: '2 min ago', type: 'order' },
          { id: '2', user: 'System', action: 'Low stock alert: AI Testing Assistant', time: '15 min ago', type: 'product' },
          { id: '3', user: 'John', action: 'New user registered: techcorp@email.com', time: '1 hour ago', type: 'user' },
          { id: '4', user: 'Admin', action: 'Product updated: AI Vision Pro', time: '2 hours ago', type: 'product' },
          { id: '5', user: 'System', action: 'Daily backup completed', time: '3 hours ago', type: 'system' },
          { id: '6', user: 'Sarah', action: 'Order #ORD-2024-002 marked as processing', time: '4 hours ago', type: 'order' }
        ])
      } catch (error) {
        console.log('Error loading dashboard data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [timeRange])

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'processing': return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'shipped': return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-300 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  // Get activity icon
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'order': return '📦'
      case 'product': return '🖥️'
      case 'user': return '👤'
      case 'system': return '⚙️'
      default: return '📌'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Bismillah */}
      <div className="text-center mb-6">
        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome back, Hafiz Sajid Syed</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Time range selector */}
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>

            {/* Notifications */}
            <button className="relative p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs flex items-center justify-center text-white">
                  {notifications}
                </span>
              )}
            </button>

            {/* Admin profile */}
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
              <span className="text-2xl">👤</span>
              <span className="text-white hidden md:inline">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">👥</span>
              <span className="text-xs text-gray-400">+12%</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Total Users</p>
          </div>

          {/* Total Products */}
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">🖥️</span>
              <span className="text-xs text-gray-400">+5%</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.totalProducts}</p>
            <p className="text-sm text-gray-400">Total Products</p>
          </div>

          {/* Total Orders */}
          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">📦</span>
              <span className="text-xs text-gray-400">+8%</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.totalOrders.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Total Orders</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">💰</span>
              <span className="text-xs text-gray-400">+15%</span>
            </div>
            <p className="text-2xl font-bold text-white">${stats?.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>

          {/* Pending Orders */}
          <div className="bg-gradient-to-br from-red-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.pendingOrders}</p>
            <p className="text-sm text-gray-400">Pending Orders</p>
          </div>

          {/* Low Stock */}
          <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex justify-between items-start mb-2">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats?.lowStock}</p>
            <p className="text-sm text-gray-400">Low Stock Alert</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Recent Orders</h2>
              <Link href="/admin/orders" className="text-pink-400 hover:text-pink-300 text-sm">
                View All →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-white/10">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Items</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-white/5">
                      <td className="py-3 text-white font-medium">{order.id}</td>
                      <td className="py-3 text-gray-300">{order.customer}</td>
                      <td className="py-3 text-gray-300">{order.items}</td>
                      <td className="py-3 text-white">${order.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-white/5 last:border-0">
                  <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Top Selling Products</h2>
            <Link href="/admin/products" className="text-pink-400 hover:text-pink-300 text-sm">
              Manage Products →
            </Link>
          </div>

          <div className="grid gap-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                <span className="text-2xl text-gray-400 w-8">#{index + 1}</span>
                <div className="flex-1">
                  <h3 className="text-white font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-400">Stock: {product.stock} units</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{product.sales} sold</p>
                  <p className="text-sm text-green-400">${product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-center hover:scale-105 transition-transform"
          >
            <span className="text-3xl block mb-2">➕</span>
            <span className="text-white font-bold">Add Product</span>
          </Link>
          
          <Link
            href="/admin/orders"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 rounded-xl text-center hover:scale-105 transition-transform"
          >
            <span className="text-3xl block mb-2">📦</span>
            <span className="text-white font-bold">View Orders</span>
          </Link>
          
          <Link
            href="/admin/users"
            className="bg-gradient-to-r from-green-600 to-teal-600 p-4 rounded-xl text-center hover:scale-105 transition-transform"
          >
            <span className="text-3xl block mb-2">👥</span>
            <span className="text-white font-bold">Manage Users</span>
          </Link>
          
          <Link
            href="/admin/settings"
            className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-xl text-center hover:scale-105 transition-transform"
          >
            <span className="text-3xl block mb-2">⚙️</span>
            <span className="text-white font-bold">Settings</span>
          </Link>
        </div>

        {/* System Status */}
        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">System Status</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Server Status</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-white">Operational</span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Database</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-white">Connected</span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Cache</p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-white">Healthy</span>
              </div>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm mb-1">Last Backup</p>
              <span className="text-white">Today 3:00 AM</span>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-purple-600/20 backdrop-blur-lg px-6 py-3 rounded-xl">
            <p className="text-sm text-gray-400">Administrator</p>
            <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
            <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
            <p className="text-xs text-gray-500 mt-2">Last login: Today 9:30 AM</p>
          </div>
        </div>
      </div>
    </div>
  )
}
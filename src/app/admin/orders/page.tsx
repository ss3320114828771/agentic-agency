'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Order types
interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: {
    id: string
    name: string
    quantity: number
    price: number
    total: number
  }[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  discount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'paid' | 'unpaid' | 'refunded' | 'failed'
  paymentMethod: 'stripe' | 'paypal' | 'cod'
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState<{
    id: string
    status: Order['status']
  } | null>(null)

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock orders data
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-2024-001',
            customer: {
              id: '1',
              name: 'Hafiz Sajid Syed',
              email: 'sajid.syed@example.com'
            },
            items: [
              {
                id: '1',
                name: 'Islamic Prayer Mat',
                quantity: 2,
                price: 25.99,
                total: 51.98
              },
              {
                id: '2',
                name: 'Quran (English Translation)',
                quantity: 1,
                price: 39.99,
                total: 39.99
              }
            ],
            subtotal: 91.97,
            tax: 7.36,
            shipping: 5.99,
            discount: 0,
            total: 105.32,
            status: 'delivered',
            paymentStatus: 'paid',
            paymentMethod: 'stripe',
            shippingAddress: {
              street: '123 Islamic Center',
              city: 'New York',
              state: 'NY',
              zip: '10001',
              country: 'USA'
            },
            createdAt: '2024-03-01T10:30:00Z',
            updatedAt: '2024-03-03T14:20:00Z'
          },
          {
            id: '2',
            orderNumber: 'ORD-2024-002',
            customer: {
              id: '2',
              name: 'John Smith',
              email: 'john.smith@example.com'
            },
            items: [
              {
                id: '3',
                name: 'Islamic Books Set',
                quantity: 1,
                price: 89.99,
                total: 89.99
              }
            ],
            subtotal: 89.99,
            tax: 7.20,
            shipping: 0,
            discount: 10,
            total: 87.19,
            status: 'processing',
            paymentStatus: 'paid',
            paymentMethod: 'paypal',
            shippingAddress: {
              street: '456 Oak Avenue',
              city: 'Los Angeles',
              state: 'CA',
              zip: '90001',
              country: 'USA'
            },
            createdAt: '2024-03-02T15:45:00Z',
            updatedAt: '2024-03-02T16:30:00Z'
          },
          {
            id: '3',
            orderNumber: 'ORD-2024-003',
            customer: {
              id: '3',
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com'
            },
            items: [
              {
                id: '4',
                name: 'Hijab Collection',
                quantity: 3,
                price: 15.99,
                total: 47.97
              },
              {
                id: '5',
                name: 'Miswak (Natural Toothbrush)',
                quantity: 2,
                price: 4.99,
                total: 9.98
              }
            ],
            subtotal: 57.95,
            tax: 4.64,
            shipping: 5.99,
            discount: 0,
            total: 68.58,
            status: 'shipped',
            paymentStatus: 'paid',
            paymentMethod: 'stripe',
            shippingAddress: {
              street: '789 Pine Street',
              city: 'Chicago',
              state: 'IL',
              zip: '60601',
              country: 'USA'
            },
            createdAt: '2024-03-02T09:15:00Z',
            updatedAt: '2024-03-03T11:20:00Z'
          },
          {
            id: '4',
            orderNumber: 'ORD-2024-004',
            customer: {
              id: '4',
              name: 'Mike Wilson',
              email: 'mike.w@example.com'
            },
            items: [
              {
                id: '6',
                name: 'Islamic Wall Art',
                quantity: 1,
                price: 45.99,
                total: 45.99
              }
            ],
            subtotal: 45.99,
            tax: 3.68,
            shipping: 5.99,
            discount: 0,
            total: 55.66,
            status: 'pending',
            paymentStatus: 'unpaid',
            paymentMethod: 'cod',
            shippingAddress: {
              street: '321 Maple Drive',
              city: 'Houston',
              state: 'TX',
              zip: '77001',
              country: 'USA'
            },
            createdAt: '2024-03-03T08:30:00Z',
            updatedAt: '2024-03-03T08:30:00Z'
          },
          {
            id: '5',
            orderNumber: 'ORD-2024-005',
            customer: {
              id: '5',
              name: 'Emily Brown',
              email: 'emily.b@example.com'
            },
            items: [
              {
                id: '7',
                name: 'Tasbih (Prayer Beads)',
                quantity: 2,
                price: 12.99,
                total: 25.98
              },
              {
                id: '8',
                name: 'Islamic Calendar',
                quantity: 1,
                price: 14.99,
                total: 14.99
              }
            ],
            subtotal: 40.97,
            tax: 3.28,
            shipping: 5.99,
            discount: 5,
            total: 45.24,
            status: 'cancelled',
            paymentStatus: 'refunded',
            paymentMethod: 'paypal',
            shippingAddress: {
              street: '654 Cedar Road',
              city: 'Miami',
              state: 'FL',
              zip: '33101',
              country: 'USA'
            },
            createdAt: '2024-02-28T14:20:00Z',
            updatedAt: '2024-03-01T09:45:00Z'
          }
        ])
      } catch (error) {
        console.log('Error loading orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === 'all' || order.paymentStatus === selectedPaymentStatus
    
    // Date filtering
    let matchesDate = true
    const orderDate = new Date(order.createdAt)
    const now = new Date()
    if (dateRange === 'today') {
      matchesDate = orderDate.toDateString() === now.toDateString()
    } else if (dateRange === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7))
      matchesDate = orderDate >= weekAgo
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
      matchesDate = orderDate >= monthAgo
    }
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDate
  })

  // Stats
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const processingOrders = orders.filter(o => o.status === 'processing').length
  const shippedOrders = orders.filter(o => o.status === 'shipped').length
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length

  // Handle delete
  const handleDelete = (id: string) => {
    setOrderToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (orderToDelete) {
      setOrders(orders.filter(o => o.id !== orderToDelete))
      setShowDeleteModal(false)
      setOrderToDelete(null)
    }
  }

  // Handle status update
  const handleStatusUpdate = (id: string, status: Order['status']) => {
    setStatusUpdate({ id, status })
    setShowStatusModal(true)
  }

  const confirmStatusUpdate = () => {
    if (statusUpdate) {
      setOrders(orders.map(o => 
        o.id === statusUpdate.id 
          ? { ...o, status: statusUpdate.status, updatedAt: new Date().toISOString() }
          : o
      ))
      setShowStatusModal(false)
      setStatusUpdate(null)
    }
  }

  // View order details
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'shipped':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'processing':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'pending':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  // Get payment status badge
  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'unpaid':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'refunded':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  // Get payment method icon
  const getPaymentMethodIcon = (method: string) => {
    switch(method) {
      case 'stripe':
        return '💳'
      case 'paypal':
        return '🅿️'
      case 'cod':
        return '💵'
      default:
        return '💰'
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Bismillah */}
      <div className="text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Orders Management</h1>
          <p className="text-gray-400">Manage and track customer orders</p>
        </div>
        <Link
          href="/admin/orders/new"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          Create Order
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Orders</p>
          <p className="text-2xl font-bold text-white">{totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-white">{pendingOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Processing</p>
          <p className="text-2xl font-bold text-white">{processingOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Shipped</p>
          <p className="text-2xl font-bold text-white">{shippedOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Delivered</p>
          <p className="text-2xl font-bold text-white">{deliveredOrders}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by order #, customer name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Payment Status Filter */}
          <div>
            <select
              value={selectedPaymentStatus}
              onChange={(e) => setSelectedPaymentStatus(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredOrders.length} of {totalOrders} orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Order #</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Customer</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Date</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Total</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Status</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Payment</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Items</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white">{order.customer.name}</div>
                      <div className="text-sm text-gray-400">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{formatDate(order.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">${order.total.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getPaymentMethodIcon(order.paymentMethod)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getPaymentStatusBadge(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{order.items.length} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => viewOrderDetails(order)}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        title="View Details"
                      >
                        👁️
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                        className="p-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors text-sm border-none focus:ring-2 focus:ring-purple-500"
                        title="Update Status"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                      <Link
                        href={`/admin/orders/${order.id}/edit`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="Edit Order"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    No orders found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Order Details</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400">Order Number</p>
                  <p className="text-white font-medium">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="text-white">{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Payment Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getPaymentStatusBadge(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white">{selectedOrder.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{selectedOrder.customer.email}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">Shipping Address</h4>
                <p className="text-white">
                  {selectedOrder.shippingAddress.street}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              {/* Order Items */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">Order Items</h4>
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-sm">
                      <th className="text-left py-2">Product</th>
                      <th className="text-center py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id} className="border-t border-white/10">
                        <td className="py-2 text-white">{item.name}</td>
                        <td className="py-2 text-center text-white">{item.quantity}</td>
                        <td className="py-2 text-right text-white">${item.price.toFixed(2)}</td>
                        <td className="py-2 text-right text-white">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Summary */}
              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-lg font-semibold text-white mb-3">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax:</span>
                    <span className="text-white">${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping:</span>
                    <span className="text-white">${selectedOrder.shipping.toFixed(2)}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Discount:</span>
                      <span className="text-green-400">-${selectedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white font-medium">Total:</span>
                    <span className="text-white font-bold">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Link
                  href={`/admin/orders/${selectedOrder.id}/edit`}
                  className="flex-1 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 text-center"
                >
                  Edit Order
                </Link>
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    // Open print invoice
                    window.print()
                  }}
                  className="flex-1 px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30"
                >
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Confirmation Modal */}
      {showStatusModal && statusUpdate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Status Update</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to update the order status to{' '}
              <span className="text-pink-400 font-medium">{statusUpdate.status}</span>?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmStatusUpdate}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setShowStatusModal(false)
                  setStatusUpdate(null)
                }}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Orders Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
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
  stock: number
  sales: number
  rating: number
  status: 'active' | 'draft' | 'out_of_stock'
  createdAt: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock products data
        setProducts([
          {
            id: '1',
            name: 'AI Development Suite Pro',
            description: 'Complete AI-powered development platform',
            price: 299.99,
            category: 'AI Software',
            stock: 45,
            sales: 234,
            rating: 4.8,
            status: 'active',
            createdAt: '2024-01-01'
          },
          {
            id: '2',
            name: 'ML Model Trainer',
            description: 'Train and deploy ML models',
            price: 399.99,
            category: 'Machine Learning',
            stock: 23,
            sales: 189,
            rating: 4.9,
            status: 'active',
            createdAt: '2024-01-02'
          },
          {
            id: '3',
            name: 'AI Security Suite',
            description: 'AI-powered security monitoring',
            price: 329.99,
            category: 'Security',
            stock: 34,
            sales: 156,
            rating: 4.8,
            status: 'active',
            createdAt: '2024-01-03'
          },
          {
            id: '4',
            name: 'Data Analytics AI',
            description: 'Advanced analytics platform',
            price: 249.99,
            category: 'Analytics',
            stock: 56,
            sales: 143,
            rating: 4.7,
            status: 'active',
            createdAt: '2024-01-04'
          },
          {
            id: '5',
            name: 'AI Testing Assistant',
            description: 'Automated testing tool',
            price: 149.99,
            category: 'AI Software',
            stock: 12,
            sales: 98,
            rating: 4.6,
            status: 'active',
            createdAt: '2024-01-05'
          },
          {
            id: '6',
            name: 'AI Chatbot Builder',
            description: 'Create intelligent chatbots',
            price: 89.99,
            category: 'AI Tools',
            stock: 100,
            sales: 245,
            rating: 4.4,
            status: 'active',
            createdAt: '2024-01-06'
          },
          {
            id: '7',
            name: 'AI Vision Pro',
            description: 'Computer vision platform',
            price: 449.99,
            category: 'AI Software',
            stock: 8,
            sales: 67,
            rating: 5.0,
            status: 'active',
            createdAt: '2024-01-07'
          },
          {
            id: '8',
            name: 'Legacy Product',
            description: 'Older version - needs update',
            price: 99.99,
            category: 'Legacy',
            stock: 3,
            sales: 12,
            rating: 3.5,
            status: 'draft',
            createdAt: '2023-12-01'
          },
          {
            id: '9',
            name: 'Out of Stock Item',
            description: 'Temporarily unavailable',
            price: 199.99,
            category: 'AI Tools',
            stock: 0,
            sales: 45,
            rating: 4.2,
            status: 'out_of_stock',
            createdAt: '2023-12-15'
          }
        ])
      } catch (error) {
        console.log('Error loading products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Delete product
  const handleDelete = (id: string) => {
    setProductToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete))
      setShowDeleteModal(false)
      setProductToDelete(null)
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'draft':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'out_of_stock':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading products...</p>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Products Management</h1>
            <p className="text-gray-400">Manage your product catalog</p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            <span>➕</span>
            Add New Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/20">
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

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="text-gray-400">Total Products: <span className="text-white font-bold">{products.length}</span></span>
            <span className="text-gray-400">Active: <span className="text-green-400 font-bold">{products.filter(p => p.status === 'active').length}</span></span>
            <span className="text-gray-400">Draft: <span className="text-yellow-400 font-bold">{products.filter(p => p.status === 'draft').length}</span></span>
            <span className="text-gray-400">Out of Stock: <span className="text-red-400 font-bold">{products.filter(p => p.status === 'out_of_stock').length}</span></span>
            <span className="text-gray-400">Showing: <span className="text-white font-bold">{filteredProducts.length}</span></span>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Product</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Category</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Price</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Stock</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Sales</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Rating</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{product.category}</td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={product.stock < 10 ? 'text-orange-400 font-bold' : 'text-white'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{product.sales}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(product.status)}`}>
                        {product.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/edit/${product.id}`}
                          className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          🗑️
                        </button>
                        <Link
                          href={`/products/${product.id}`}
                          className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                          title="View"
                        >
                          👁️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                      No products found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="max-w-7xl mx-auto mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-white">
              ${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-bold text-white">
              {products.reduce((sum, p) => sum + p.sales, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Sales</div>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-white">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
            <div className="text-sm text-gray-400">Total Stock</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-white">
              {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
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

      {/* Add/Edit Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Add New Product</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Product Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Stock</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option>AI Software</option>
                    <option>Machine Learning</option>
                    <option>Security</option>
                    <option>Analytics</option>
                    <option>AI Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Status</label>
                  <select className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option>active</option>
                    <option>draft</option>
                    <option>out_of_stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Image URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <div className="inline-block bg-purple-600/20 backdrop-blur-lg px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Products Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
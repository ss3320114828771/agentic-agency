'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// User types
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'super_admin'
  status: 'active' | 'inactive' | 'suspended'
  orders: number
  spent: number
  joined: string
  lastLogin: string
  avatar?: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Mock users data
        setUsers([
          {
            id: '1',
            name: 'Hafiz Sajid Syed',
            email: 'sajid.syed@example.com',
            role: 'super_admin',
            status: 'active',
            orders: 45,
            spent: 12500,
            joined: '2023-01-15',
            lastLogin: '2024-03-02'
          },
          {
            id: '2',
            name: 'John Smith',
            email: 'john.smith@example.com',
            role: 'admin',
            status: 'active',
            orders: 23,
            spent: 5600,
            joined: '2023-03-20',
            lastLogin: '2024-03-01'
          },
          {
            id: '3',
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            role: 'user',
            status: 'active',
            orders: 12,
            spent: 2300,
            joined: '2023-06-10',
            lastLogin: '2024-02-28'
          },
          {
            id: '4',
            name: 'Mike Wilson',
            email: 'mike.w@example.com',
            role: 'user',
            status: 'inactive',
            orders: 3,
            spent: 450,
            joined: '2023-09-05',
            lastLogin: '2024-01-15'
          },
          {
            id: '5',
            name: 'Emily Brown',
            email: 'emily.b@example.com',
            role: 'user',
            status: 'active',
            orders: 8,
            spent: 1200,
            joined: '2023-11-12',
            lastLogin: '2024-02-29'
          },
          {
            id: '6',
            name: 'David Lee',
            email: 'david.lee@example.com',
            role: 'admin',
            status: 'active',
            orders: 34,
            spent: 8900,
            joined: '2023-02-08',
            lastLogin: '2024-03-02'
          },
          {
            id: '7',
            name: 'Lisa Chen',
            email: 'lisa.chen@example.com',
            role: 'user',
            status: 'suspended',
            orders: 1,
            spent: 99,
            joined: '2024-01-20',
            lastLogin: '2024-02-10'
          },
          {
            id: '8',
            name: 'Tom Harris',
            email: 'tom.h@example.com',
            role: 'user',
            status: 'active',
            orders: 5,
            spent: 780,
            joined: '2023-12-01',
            lastLogin: '2024-02-25'
          }
        ])
      } catch (error) {
        console.log('Error loading users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  // Stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const adminCount = users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
  const totalSpent = users.reduce((sum, u) => sum + u.spent, 0)

  // Handle delete
  const handleDelete = (id: string) => {
    setUserToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete))
      setShowDeleteModal(false)
      setUserToDelete(null)
    }
  }

  // Handle edit
  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const saveEdit = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
      setShowEditModal(false)
      setEditingUser(null)
    }
  }

  // Get role badge color
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'super_admin':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'admin':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'suspended':
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
          <p className="mt-4 text-white">Loading users...</p>
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
          <h1 className="text-3xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400">Manage your customers and administrators</p>
        </div>
        <button
          onClick={() => {
            setEditingUser({
              id: Date.now().toString(),
              name: '',
              email: '',
              role: 'user',
              status: 'active',
              orders: 0,
              spent: 0,
              joined: new Date().toISOString().split('T')[0],
              lastLogin: new Date().toISOString().split('T')[0]
            })
            setShowEditModal(true)
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <span>➕</span>
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-white">{totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Active Users</p>
          <p className="text-2xl font-bold text-white">{activeUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Administrators</p>
          <p className="text-2xl font-bold text-white">{adminCount}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-4 border border-white/20">
          <p className="text-sm text-gray-400">Total Spent</p>
          <p className="text-2xl font-bold text-white">${totalSpent.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
              <option value="super_admin">Super Admins</option>
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
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredUsers.length} of {totalUsers} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-6 py-4 text-left text-gray-400 font-medium">User</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Role</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Status</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Orders</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Spent</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Joined</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Last Login</th>
                <th className="px-6 py-4 text-left text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full flex items-center justify-center text-white font-bold">
                        {user.avatar ? user.avatar : user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs border ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{user.orders}</td>
                  <td className="px-6 py-4 text-white">${user.spent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{user.joined}</td>
                  <td className="px-6 py-4 text-gray-300">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="p-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors"
                        title="View Details"
                      >
                        👁️
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    No users found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
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

      {/* Edit/Add User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              {editingUser.id ? 'Edit User' : 'Add New User'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  placeholder="Enter email"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Role</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value as any})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({...editingUser, status: e.target.value as any})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveEdit}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditingUser(null)
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Info */}
      <div className="text-center pt-4">
        <div className="inline-block bg-purple-600/20 px-6 py-3 rounded-xl">
          <p className="text-sm text-gray-400">Users Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
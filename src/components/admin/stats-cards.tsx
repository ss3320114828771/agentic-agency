'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string | number
  icon: string
  trend?: number
  trendLabel?: string
  color: 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | 'red' | 'orange' | 'teal'
  link?: string
  subtitle?: string
  loading?: boolean
}

interface StatsCardsProps {
  stats?: {
    revenue?: number
    orders?: number
    users?: number
    products?: number
    conversion?: number
    avgOrderValue?: number
  }
  timeframe?: 'today' | 'week' | 'month' | 'year'
  loading?: boolean
  onTimeframeChange?: (timeframe: string) => void
}

// Individual Stat Card Component
function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel, 
  color, 
  link, 
  subtitle,
  loading 
}: StatCardProps) {
  
  // Color mappings
  const getColorClasses = () => {
    const colors = {
      purple: {
        bg: 'from-purple-600/20 to-purple-600/5',
        border: 'border-purple-500/30',
        badge: 'bg-purple-500/20 text-purple-300',
        hover: 'hover:border-purple-500/50'
      },
      pink: {
        bg: 'from-pink-600/20 to-pink-600/5',
        border: 'border-pink-500/30',
        badge: 'bg-pink-500/20 text-pink-300',
        hover: 'hover:border-pink-500/50'
      },
      blue: {
        bg: 'from-blue-600/20 to-blue-600/5',
        border: 'border-blue-500/30',
        badge: 'bg-blue-500/20 text-blue-300',
        hover: 'hover:border-blue-500/50'
      },
      green: {
        bg: 'from-green-600/20 to-green-600/5',
        border: 'border-green-500/30',
        badge: 'bg-green-500/20 text-green-300',
        hover: 'hover:border-green-500/50'
      },
      yellow: {
        bg: 'from-yellow-600/20 to-yellow-600/5',
        border: 'border-yellow-500/30',
        badge: 'bg-yellow-500/20 text-yellow-300',
        hover: 'hover:border-yellow-500/50'
      },
      red: {
        bg: 'from-red-600/20 to-red-600/5',
        border: 'border-red-500/30',
        badge: 'bg-red-500/20 text-red-300',
        hover: 'hover:border-red-500/50'
      },
      orange: {
        bg: 'from-orange-600/20 to-orange-600/5',
        border: 'border-orange-500/30',
        badge: 'bg-orange-500/20 text-orange-300',
        hover: 'hover:border-orange-500/50'
      },
      teal: {
        bg: 'from-teal-600/20 to-teal-600/5',
        border: 'border-teal-500/30',
        badge: 'bg-teal-500/20 text-teal-300',
        hover: 'hover:border-teal-500/50'
      }
    }
    return colors[color]
  }

  const colors = getColorClasses()

  // Format value based on title
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (title.includes('Revenue') || title.includes('revenue') || title.includes('sale')) {
        return `$${val.toLocaleString()}`
      }
      if (title.includes('Rate') || title.includes('rate') || title.includes('Conversion')) {
        return `${val}%`
      }
      return val.toLocaleString()
    }
    return val
  }

  // Card content
  const renderContent = () => {
    if (loading) {
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-20 mb-4"></div>
          <div className="h-8 bg-white/10 rounded w-32 mb-2"></div>
          <div className="h-3 bg-white/5 rounded w-24"></div>
        </div>
      )
    }

    return (
      <div className="relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <span className="text-3xl">{icon}</span>
          {trend !== undefined && (
            <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${colors.badge}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">
            {formatValue(value)}
          </h3>
          <p className="text-sm text-gray-400">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>

        {trendLabel && (
          <p className={`text-xs mt-2 ${trend && trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trendLabel}
          </p>
        )}

        <div className="absolute -bottom-4 -right-4 text-6xl opacity-5">
          {icon}
        </div>
      </div>
    )
  }

  // Card wrapper
  const renderCard = () => {
    const baseClasses = `block bg-gradient-to-br ${colors.bg} backdrop-blur-lg rounded-xl p-5 border ${colors.border} transition-all`
    const hoverClasses = link ? `${colors.hover} hover:scale-105 cursor-pointer` : ''

    if (link) {
      return (
        <Link href={link} className={`${baseClasses} ${hoverClasses}`}>
          {renderContent()}
        </Link>
      )
    }

    return (
      <div className={`${baseClasses} ${hoverClasses}`}>
        {renderContent()}
      </div>
    )
  }

  return renderCard()
}

// Main Stats Cards Component
export default function StatsCards({ 
  stats, 
  timeframe = 'week', 
  loading = false,
  onTimeframeChange 
}: StatsCardsProps) {
  
  const [selectedTimeframe, setSelectedTimeframe] = useState(timeframe)

  // Mock data if no stats provided
  const defaultStats = {
    revenue: 456789,
    orders: 5678,
    users: 15432,
    products: 234,
    conversion: 3.2,
    avgOrderValue: 89.99
  }

  const displayStats = stats || defaultStats

  // Timeframe options
  const timeframes = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ]

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    
    if (onTimeframeChange) {
      onTimeframeChange(value)
    }
  }

  return (
    <div className="space-y-4">
      {/* Timeframe selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Overview</h2>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => handleTimeframeChange(tf.value)}
              className={`px-3 py-1 text-xs rounded-lg transition-all ${
                selectedTimeframe === tf.value
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Revenue"
          value={displayStats.revenue || 0}
          icon="💰"
          trend={12.5}
          trendLabel="vs last period"
          color="green"
          link="/admin/revenue"
          subtitle="Last 30 days"
          loading={loading}
        />

        <StatCard
          title="Total Orders"
          value={displayStats.orders || 0}
          icon="📦"
          trend={8.3}
          trendLabel="vs last period"
          color="blue"
          link="/admin/orders"
          subtitle={`${Math.round((displayStats.orders || 0) * 0.03)} pending`}
          loading={loading}
        />

        <StatCard
          title="Total Users"
          value={displayStats.users || 0}
          icon="👥"
          trend={15.7}
          trendLabel="vs last period"
          color="purple"
          link="/admin/users"
          subtitle={`${Math.round((displayStats.users || 0) * 0.05)} new`}
          loading={loading}
        />

        <StatCard
          title="Products"
          value={displayStats.products || 0}
          icon="🖥️"
          trend={5.2}
          trendLabel="vs last period"
          color="pink"
          link="/admin/products"
          subtitle="12 low stock"
          loading={loading}
        />

        <StatCard
          title="Conversion Rate"
          value={displayStats.conversion || 0}
          icon="📊"
          trend={-2.1}
          trendLabel="vs last period"
          color="yellow"
          link="/admin/analytics"
          subtitle="Avg. 3.2%"
          loading={loading}
        />

        <StatCard
          title="Avg. Order Value"
          value={displayStats.avgOrderValue || 0}
          icon="💳"
          trend={4.3}
          trendLabel="vs last period"
          color="teal"
          link="/admin/analytics"
          subtitle="Per transaction"
          loading={loading}
        />
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400">Today's Revenue</p>
          <p className="text-lg font-bold text-white">$12,345</p>
          <p className="text-xs text-green-400">↑ +8%</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400">Today's Orders</p>
          <p className="text-lg font-bold text-white">123</p>
          <p className="text-xs text-green-400">↑ +12%</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400">New Users</p>
          <p className="text-lg font-bold text-white">45</p>
          <p className="text-xs text-green-400">↑ +5%</p>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
          <p className="text-xs text-gray-400">Pending Orders</p>
          <p className="text-lg font-bold text-yellow-400">23</p>
        </div>
      </div>
    </div>
  )
}

// Compact version
export function CompactStats({ loading = false }: { loading?: boolean }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-400">Revenue</p>
        {loading ? (
          <div className="h-4 bg-white/10 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-sm font-bold text-white">$45.6k</p>
        )}
      </div>
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-400">Orders</p>
        {loading ? (
          <div className="h-4 bg-white/10 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-sm font-bold text-white">5.6k</p>
        )}
      </div>
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-400">Users</p>
        {loading ? (
          <div className="h-4 bg-white/10 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-sm font-bold text-white">15.4k</p>
        )}
      </div>
      <div className="bg-white/5 rounded-lg p-2 text-center">
        <p className="text-xs text-gray-400">Conversion</p>
        {loading ? (
          <div className="h-4 bg-white/10 rounded animate-pulse mt-1"></div>
        ) : (
          <p className="text-sm font-bold text-green-400">3.2%</p>
        )}
      </div>
    </div>
  )
}

// Loading skeleton
export function StatsCardsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-white/5 rounded w-32 animate-pulse"></div>
      <div className="grid grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-5 animate-pulse">
            <div className="h-8 bg-white/10 rounded w-8 mb-4"></div>
            <div className="h-6 bg-white/10 rounded w-20 mb-2"></div>
            <div className="h-3 bg-white/5 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
}  
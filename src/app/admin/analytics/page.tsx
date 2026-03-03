'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Analytics types
interface AnalyticsData {
  revenue: {
    total: number
    growth: number
    chart: number[]
  }
  orders: {
    total: number
    growth: number
    chart: number[]
  }
  customers: {
    total: number
    growth: number
    chart: number[]
  }
  conversion: {
    rate: number
    growth: number
    chart: number[]
  }
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
}

interface TopCategory {
  id: string
  name: string
  sales: number
  revenue: number
  percentage: number
}

interface UserActivity {
  date: string
  active: number
  new: number
  returning: number
}

interface TrafficSource {
  source: string
  visitors: number
  percentage: number
  conversion: number
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')

  // Analytics data states
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    revenue: { total: 84590, growth: 12.5, chart: [6500, 7200, 8100, 7800, 8500, 9200, 8800, 9500, 10200, 9800, 10500, 11200] },
    orders: { total: 1243, growth: 8.3, chart: [85, 92, 101, 98, 105, 112, 108, 115, 121, 118, 124, 130] },
    customers: { total: 5678, growth: 15.2, chart: [320, 345, 368, 392, 415, 438, 462, 485, 508, 532, 555, 578] },
    conversion: { rate: 3.2, growth: 0.8, chart: [2.8, 2.9, 3.0, 3.1, 3.1, 3.2, 3.2, 3.3, 3.3, 3.4, 3.4, 3.5] }
  })

  const [topProducts, setTopProducts] = useState<TopProduct[]>([
    { id: '1', name: 'Islamic Prayer Mat', sales: 234, revenue: 5890, growth: 15 },
    { id: '2', name: 'Quran (English Translation)', sales: 189, revenue: 7560, growth: 8 },
    { id: '3', name: 'Hijab Collection', sales: 156, revenue: 2490, growth: 22 },
    { id: '4', name: 'Tasbih (Prayer Beads)', sales: 142, revenue: 1840, growth: -3 },
    { id: '5', name: 'Islamic Books Set', sales: 98, revenue: 8820, growth: 12 }
  ])

  const [topCategories, setTopCategories] = useState<TopCategory[]>([
    { id: '1', name: 'Prayer Essentials', sales: 420, revenue: 12500, percentage: 35 },
    { id: '2', name: 'Books & Media', sales: 380, revenue: 18900, percentage: 28 },
    { id: '3', name: 'Clothing', sales: 290, revenue: 8700, percentage: 18 },
    { id: '4', name: 'Home & Decor', sales: 180, revenue: 5400, percentage: 12 },
    { id: '5', name: 'Gifts', sales: 120, revenue: 3600, percentage: 7 }
  ])

  const [userActivity, setUserActivity] = useState<UserActivity[]>([
    { date: '2024-03-01', active: 450, new: 35, returning: 415 },
    { date: '2024-03-02', active: 520, new: 42, returning: 478 },
    { date: '2024-03-03', active: 480, new: 38, returning: 442 },
    { date: '2024-03-04', active: 590, new: 51, returning: 539 },
    { date: '2024-03-05', active: 610, new: 55, returning: 555 },
    { date: '2024-03-06', active: 580, new: 48, returning: 532 },
    { date: '2024-03-07', active: 630, new: 62, returning: 568 }
  ])

  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([
    { source: 'Direct', visitors: 2450, percentage: 35, conversion: 3.8 },
    { source: 'Google Search', visitors: 1820, percentage: 26, conversion: 4.2 },
    { source: 'Social Media', visitors: 1400, percentage: 20, conversion: 2.5 },
    { source: 'Email', visitors: 630, percentage: 9, conversion: 5.1 },
    { source: 'Referrals', visitors: 420, percentage: 6, conversion: 3.4 },
    { source: 'Other', visitors: 280, percentage: 4, conversion: 1.9 }
  ])

  // Load analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        // Analytics would be loaded from API here
      } catch (error) {
        console.log('Error loading analytics')
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [timeframe])

  // Export data
  const exportData = () => {
    const data = {
      analytics,
      topProducts,
      topCategories,
      userActivity,
      trafficSources,
      timeframe,
      exportedAt: new Date().toISOString()
    }

    if (exportFormat === 'csv') {
      exportToCSV(data)
    } else if (exportFormat === 'json') {
      exportToJSON(data)
    } else {
      // PDF export would be implemented here
      console.log('Exporting to PDF...')
    }
    
    setShowExportModal(false)
  }

  const exportToCSV = (data: any) => {
    // Simple CSV export for demonstration
    const csv = Object.keys(data.analytics).map(key => {
      return `${key},${data.analytics[key].total},${data.analytics[key].growth}`
    }).join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const exportToJSON = (data: any) => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `analytics-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Get metric color
  const getMetricColor = (metric: string) => {
    switch(metric) {
      case 'revenue': return 'from-green-600 to-emerald-600'
      case 'orders': return 'from-blue-600 to-cyan-600'
      case 'customers': return 'from-purple-600 to-pink-600'
      case 'conversion': return 'from-yellow-600 to-orange-600'
      default: return 'from-gray-600 to-gray-500'
    }
  }

  // Get growth color
  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-400'
    if (growth < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  // Format number
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  // Format percentage
  const formatPercentage = (value: number) => {
    return value.toFixed(1) + '%'
  }

  // Render chart bars (simplified visualization)
  const renderChart = (data: number[], color: string, height: number = 40) => {
    const max = Math.max(...data)
    
    return (
      <div className="flex items-end h-32 gap-1 mt-4">
        {data.map((value, index) => {
          const barHeight = (value / max) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center group">
              <div className="relative w-full">
                <div 
                  className={`bg-gradient-to-t ${color} rounded-t-lg transition-all duration-300 group-hover:opacity-80`}
                  style={{ height: `${barHeight}%`, minHeight: '4px' }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {formatCurrency(value)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {index % 2 === 0 ? `W${index + 1}` : ''}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading analytics...</p>
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
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your store's performance and growth</p>
        </div>
        <div className="flex gap-2">
          {/* Time Range Selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="12months">Last 12 Months</option>
            <option value="ytd">Year to Date</option>
          </select>
          
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>📊</span>
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-3xl font-bold text-white">{formatCurrency(analytics.revenue.total)}</p>
            </div>
            <div className={`${getGrowthColor(analytics.revenue.growth)} text-sm font-medium`}>
              {analytics.revenue.growth > 0 ? '↑' : '↓'} {Math.abs(analytics.revenue.growth)}%
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Previous period</span>
              <span>{formatCurrency(analytics.revenue.total * 0.85)}</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-3xl font-bold text-white">{formatNumber(analytics.orders.total)}</p>
            </div>
            <div className={`${getGrowthColor(analytics.orders.growth)} text-sm font-medium`}>
              {analytics.orders.growth > 0 ? '↑' : '↓'} {Math.abs(analytics.orders.growth)}%
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Average order value</span>
              <span>{formatCurrency(analytics.revenue.total / analytics.orders.total)}</span>
            </div>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Total Customers</p>
              <p className="text-3xl font-bold text-white">{formatNumber(analytics.customers.total)}</p>
            </div>
            <div className={`${getGrowthColor(analytics.customers.growth)} text-sm font-medium`}>
              {analytics.customers.growth > 0 ? '↑' : '↓'} {Math.abs(analytics.customers.growth)}%
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>New this period</span>
              <span>+{formatNumber(analytics.customers.total * 0.15)}</span>
            </div>
          </div>
        </div>

        {/* Conversion Card */}
        <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-white/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">{analytics.conversion.rate}%</p>
            </div>
            <div className={`${getGrowthColor(analytics.conversion.growth)} text-sm font-medium`}>
              {analytics.conversion.growth > 0 ? '↑' : '↓'} {Math.abs(analytics.conversion.growth)}%
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Industry average</span>
              <span>2.8%</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[82%] bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Performance Overview</h3>
          <div className="flex gap-2">
            {['revenue', 'orders', 'customers', 'conversion'].map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${
                  selectedMetric === metric
                    ? 'bg-pink-600/30 text-pink-300 border border-pink-500/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-64">
          {renderChart(analytics[selectedMetric as keyof AnalyticsData].chart, getMetricColor(selectedMetric))}
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="text-center">
            <p className="text-sm text-gray-400">Average</p>
            <p className="text-lg font-semibold text-white">
              {selectedMetric === 'revenue' && formatCurrency(analytics.revenue.total / 12)}
              {selectedMetric === 'orders' && Math.round(analytics.orders.total / 12)}
              {selectedMetric === 'customers' && Math.round(analytics.customers.total / 12)}
              {selectedMetric === 'conversion' && (analytics.conversion.rate / 12).toFixed(1) + '%'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Peak</p>
            <p className="text-lg font-semibold text-white">
              {selectedMetric === 'revenue' && formatCurrency(Math.max(...analytics.revenue.chart))}
              {selectedMetric === 'orders' && Math.max(...analytics.orders.chart)}
              {selectedMetric === 'customers' && Math.max(...analytics.customers.chart)}
              {selectedMetric === 'conversion' && Math.max(...analytics.conversion.chart) + '%'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Growth</p>
            <p className="text-lg font-semibold text-green-400">
              +{selectedMetric === 'revenue' && '12.5%'}
              {selectedMetric === 'orders' && '8.3%'}
              {selectedMetric === 'customers' && '15.2%'}
              {selectedMetric === 'conversion' && '0.8%'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400">Forecast</p>
            <p className="text-lg font-semibold text-blue-400">
              {selectedMetric === 'revenue' && formatCurrency(analytics.revenue.total * 1.15)}
              {selectedMetric === 'orders' && Math.round(analytics.orders.total * 1.1)}
              {selectedMetric === 'customers' && Math.round(analytics.customers.total * 1.18)}
              {selectedMetric === 'conversion' && (analytics.conversion.rate * 1.05).toFixed(1) + '%'}
            </p>
          </div>
        </div>
      </div>

      {/* Top Products & Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Top Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-lg flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium">{product.name}</span>
                    <span className="text-white">{formatCurrency(product.revenue)}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${(product.sales / topProducts[0].sales) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400">{product.sales} sold</span>
                    <span className={`text-sm ${getGrowthColor(product.growth)}`}>
                      {product.growth > 0 ? '↑' : '↓'} {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link 
            href="/admin/products"
            className="block text-center mt-4 text-sm text-pink-400 hover:text-pink-300"
          >
            View all products →
          </Link>
        </div>

        {/* Top Categories */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Categories Performance</h3>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{category.name}</span>
                  <span className="text-white">{formatCurrency(category.revenue)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{category.percentage}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{category.sales} items sold</span>
                  <span>Avg: {formatCurrency(category.revenue / category.sales)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity & Traffic Sources */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Activity */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">User Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Active</th>
                  <th className="text-right py-2">New</th>
                  <th className="text-right py-2">Returning</th>
                </tr>
              </thead>
              <tbody>
                {userActivity.map((day) => (
                  <tr key={day.date} className="border-t border-white/5">
                    <td className="py-2 text-white">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-2 text-right text-white">{formatNumber(day.active)}</td>
                    <td className="py-2 text-right text-green-400">+{formatNumber(day.new)}</td>
                    <td className="py-2 text-right text-blue-400">{formatNumber(day.returning)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Retention rate</span>
              <span className="text-white font-medium">78%</span>
            </div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{source.source}</span>
                  <span className="text-white">{formatNumber(source.visitors)}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">{source.percentage}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Conversion: {source.conversion}%</span>
                  <span>Revenue: {formatCurrency(source.visitors * source.conversion * 25)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Export Report</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Export Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="csv">CSV Spreadsheet</option>
                  <option value="json">JSON Data</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Include Data</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Key Metrics</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Charts & Graphs</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">Top Products</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded bg-white/10 border-white/20" />
                    <span className="text-white">User Activity</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={exportData}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Export
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
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
          <p className="text-sm text-gray-400">Analytics Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
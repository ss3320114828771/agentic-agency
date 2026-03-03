'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Settings types
interface SiteSettings {
  siteName: string
  siteDescription: string
  siteEmail: string
  sitePhone: string
  siteAddress: string
  currency: string
  timezone: string
  dateFormat: string
}

interface SecuritySettings {
  twoFactorAuth: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordExpiry: number
  ipWhitelist: string[]
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  orderUpdates: boolean
  userRegistrations: boolean
  systemAlerts: boolean
  marketingEmails: boolean
}

interface PaymentSettings {
  stripeEnabled: boolean
  paypalEnabled: boolean
  codEnabled: boolean
  stripePublicKey: string
  stripeSecretKey: string
  paypalClientId: string
  paypalSecret: string
  taxRate: number
  shippingFee: number
  freeShippingThreshold: number
}

interface SEOSettings {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  googleAnalyticsId: string
  facebookPixelId: string
  robotsTxt: string
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {})

  // Settings states
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Madani Store',
    siteDescription: 'Islamic Online Store',
    siteEmail: 'info@madanistore.com',
    sitePhone: '+1 (234) 567-890',
    siteAddress: '123 Islamic Center, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'YYYY-MM-DD'
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordExpiry: 90,
    ipWhitelist: ['127.0.0.1', '192.168.1.1']
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    userRegistrations: true,
    systemAlerts: true,
    marketingEmails: false
  })

  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    stripeEnabled: true,
    paypalEnabled: false,
    codEnabled: true,
    stripePublicKey: 'pk_test_...',
    stripeSecretKey: 'sk_test_...',
    paypalClientId: 'client_id_...',
    paypalSecret: 'secret_...',
    taxRate: 10,
    shippingFee: 5.99,
    freeShippingThreshold: 50
  })

  const [seoSettings, setSEOSettings] = useState<SEOSettings>({
    metaTitle: 'Madani Store - Islamic Products',
    metaDescription: 'Shop for Islamic books, clothing, and more',
    metaKeywords: 'islamic, muslim, quran, hijab, books',
    googleAnalyticsId: 'UA-12345678-1',
    facebookPixelId: '123456789',
    robotsTxt: 'User-agent: *\nAllow: /'
  })

  const [newIpAddress, setNewIpAddress] = useState('')

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true)
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        // Settings would be loaded from API here
      } catch (error) {
        console.log('Error loading settings')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Save settings
  const saveSettings = async () => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.log('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  // Reset settings
  const resetSettings = () => {
    setShowConfirmModal(true)
    setConfirmAction(() => () => {
      // Reset to defaults
      setSiteSettings({
        siteName: 'Madani Store',
        siteDescription: 'Islamic Online Store',
        siteEmail: 'info@madanistore.com',
        sitePhone: '+1 (234) 567-890',
        siteAddress: '123 Islamic Center, New York, NY 10001',
        currency: 'USD',
        timezone: 'America/New_York',
        dateFormat: 'YYYY-MM-DD'
      })
      setShowConfirmModal(false)
    })
  }

  // Export settings
  const exportSettings = () => {
    const settings = {
      site: siteSettings,
      security: securitySettings,
      notifications: notificationSettings,
      payment: paymentSettings,
      seo: seoSettings
    }
    
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `settings-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Import settings
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string)
          if (settings.site) setSiteSettings(settings.site)
          if (settings.security) setSecuritySettings(settings.security)
          if (settings.notifications) setNotificationSettings(settings.notifications)
          if (settings.payment) setPaymentSettings(settings.payment)
          if (settings.seo) setSEOSettings(settings.seo)
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 3000)
        } catch (error) {
          console.log('Invalid settings file')
        }
      }
      reader.readAsText(file)
    }
  }

  // Add IP to whitelist
  const addIpToWhitelist = () => {
    if (newIpAddress && !securitySettings.ipWhitelist.includes(newIpAddress)) {
      setSecuritySettings({
        ...securitySettings,
        ipWhitelist: [...securitySettings.ipWhitelist, newIpAddress]
      })
      setNewIpAddress('')
    }
  }

  // Remove IP from whitelist
  const removeIpFromWhitelist = (ip: string) => {
    setSecuritySettings({
      ...securitySettings,
      ipWhitelist: securitySettings.ipWhitelist.filter(i => i !== ip)
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading settings...</p>
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
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure your store settings</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetSettings}
            className="px-4 py-2 bg-yellow-600/20 text-yellow-300 rounded-lg hover:bg-yellow-600/30 transition-colors flex items-center gap-2"
          >
            <span>🔄</span>
            Reset
          </button>
          <button
            onClick={exportSettings}
            className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors flex items-center gap-2"
          >
            <span>📥</span>
            Export
          </button>
          <label className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30 transition-colors flex items-center gap-2 cursor-pointer">
            <span>📤</span>
            Import
            <input
              type="file"
              accept=".json"
              onChange={importSettings}
              className="hidden"
            />
          </label>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <span>💾</span>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      {/* Settings Tabs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="flex flex-wrap border-b border-white/10">
          {[
            { id: 'general', label: 'General', icon: '⚙️' },
            { id: 'security', label: 'Security', icon: '🔒' },
            { id: 'notifications', label: 'Notifications', icon: '🔔' },
            { id: 'payment', label: 'Payment', icon: '💳' },
            { id: 'seo', label: 'SEO', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-pink-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{tab.icon}</span>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">General Settings</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={siteSettings.siteName}
                    onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Site Email</label>
                  <input
                    type="email"
                    value={siteSettings.siteEmail}
                    onChange={(e) => setSiteSettings({...siteSettings, siteEmail: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Site Phone</label>
                  <input
                    type="tel"
                    value={siteSettings.sitePhone}
                    onChange={(e) => setSiteSettings({...siteSettings, sitePhone: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Currency</label>
                  <select
                    value={siteSettings.currency}
                    onChange={(e) => setSiteSettings({...siteSettings, currency: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Timezone</label>
                  <select
                    value={siteSettings.timezone}
                    onChange={(e) => setSiteSettings({...siteSettings, timezone: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Date Format</label>
                  <select
                    value={siteSettings.dateFormat}
                    onChange={(e) => setSiteSettings({...siteSettings, dateFormat: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="YYYY-MM-DD">2024-03-03</option>
                    <option value="MM/DD/YYYY">03/03/2024</option>
                    <option value="DD/MM/YYYY">03/03/2024</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Site Description</label>
                  <textarea
                    value={siteSettings.siteDescription}
                    onChange={(e) => setSiteSettings({...siteSettings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Site Address</label>
                  <textarea
                    value={siteSettings.siteAddress}
                    onChange={(e) => setSiteSettings({...siteSettings, siteAddress: e.target.value})}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">Require 2FA for admin accounts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      min="1"
                      max="1440"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      min="1"
                      max="10"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Password Expiry (days)</label>
                    <input
                      type="number"
                      value={securitySettings.passwordExpiry}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      min="0"
                      max="365"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">IP Whitelist</label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={newIpAddress}
                      onChange={(e) => setNewIpAddress(e.target.value)}
                      placeholder="Enter IP address"
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                    <button
                      onClick={addIpToWhitelist}
                      className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg hover:bg-green-600/30"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {securitySettings.ipWhitelist.map((ip, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <span className="text-white">{ip}</span>
                        <button
                          onClick={() => removeIpFromWhitelist(ip)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email notifications' },
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive SMS notifications' },
                  { key: 'orderUpdates', label: 'Order Updates', desc: 'Get notified about order status changes' },
                  { key: 'userRegistrations', label: 'User Registrations', desc: 'Get notified when new users register' },
                  { key: 'systemAlerts', label: 'System Alerts', desc: 'Receive system alerts and warnings' },
                  { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive marketing and promotional emails' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings[item.key as keyof NotificationSettings] as boolean}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          [item.key]: e.target.checked
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Payment Settings</h3>
              
              <div className="space-y-6">
                {/* Payment Methods */}
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-white">Payment Methods</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { key: 'stripeEnabled', label: 'Stripe', icon: '💳' },
                      { key: 'paypalEnabled', label: 'PayPal', icon: '🅿️' },
                      { key: 'codEnabled', label: 'Cash on Delivery', icon: '💵' }
                    ].map((method) => (
                      <div key={method.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="text-white">{method.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={paymentSettings[method.key as keyof PaymentSettings] as boolean}
                            onChange={(e) => setPaymentSettings({
                              ...paymentSettings,
                              [method.key]: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stripe Settings */}
                {paymentSettings.stripeEnabled && (
                  <div className="space-y-4 p-4 bg-white/5 rounded-lg">
                    <h4 className="text-lg font-medium text-white">Stripe Configuration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Public Key</label>
                        <input
                          type="text"
                          value={paymentSettings.stripePublicKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripePublicKey: e.target.value})}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Secret Key</label>
                        <input
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({...paymentSettings, stripeSecretKey: e.target.value})}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal Settings */}
                {paymentSettings.paypalEnabled && (
                  <div className="space-y-4 p-4 bg-white/5 rounded-lg">
                    <h4 className="text-lg font-medium text-white">PayPal Configuration</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Client ID</label>
                        <input
                          type="text"
                          value={paymentSettings.paypalClientId}
                          onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">Secret</label>
                        <input
                          type="password"
                          value={paymentSettings.paypalSecret}
                          onChange={(e) => setPaymentSettings({...paymentSettings, paypalSecret: e.target.value})}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Shipping & Tax */}
                <div className="space-y-4 p-4 bg-white/5 rounded-lg">
                  <h4 className="text-lg font-medium text-white">Shipping & Tax</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        value={paymentSettings.taxRate}
                        onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        step="0.1"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Shipping Fee ($)</label>
                      <input
                        type="number"
                        value={paymentSettings.shippingFee}
                        onChange={(e) => setPaymentSettings({...paymentSettings, shippingFee: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Free Shipping Threshold ($)</label>
                      <input
                        type="number"
                        value={paymentSettings.freeShippingThreshold}
                        onChange={(e) => setPaymentSettings({...paymentSettings, freeShippingThreshold: parseFloat(e.target.value)})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Settings */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">SEO Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={seoSettings.metaTitle}
                    onChange={(e) => setSEOSettings({...seoSettings, metaTitle: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Meta Description</label>
                  <textarea
                    value={seoSettings.metaDescription}
                    onChange={(e) => setSEOSettings({...seoSettings, metaDescription: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                  <p className="text-sm text-gray-400 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Meta Keywords</label>
                  <input
                    type="text"
                    value={seoSettings.metaKeywords}
                    onChange={(e) => setSEOSettings({...seoSettings, metaKeywords: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    placeholder="Separate with commas"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Google Analytics ID</label>
                    <input
                      type="text"
                      value={seoSettings.googleAnalyticsId}
                      onChange={(e) => setSEOSettings({...seoSettings, googleAnalyticsId: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="UA-XXXXXXXXX-X"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Facebook Pixel ID</label>
                    <input
                      type="text"
                      value={seoSettings.facebookPixelId}
                      onChange={(e) => setSEOSettings({...seoSettings, facebookPixelId: e.target.value})}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">robots.txt</label>
                  <textarea
                    value={seoSettings.robotsTxt}
                    onChange={(e) => setSEOSettings({...seoSettings, robotsTxt: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Reset</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to reset all settings to default values?</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  confirmAction()
                  setShowConfirmModal(false)
                }}
                className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
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
          <p className="text-sm text-gray-400">Settings Managed By</p>
          <p className="text-pink-400 font-medium">Hafiz Sajid Syed</p>
          <p className="text-gray-400 text-sm">sajid.syed@example.com</p>
        </div>
      </div>
    </div>
  )
}
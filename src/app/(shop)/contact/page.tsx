'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  preferredContact: 'email' | 'phone' | 'any'
  urgency: 'low' | 'medium' | 'high'
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'any',
    urgency: 'medium'
  })
  
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (formData.phone && !/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'any',
        urgency: 'medium'
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['123 AI Innovation Street', 'Tech Valley, CA 94043', 'United States'],
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri 9am-6pm PST'],
      gradient: 'from-green-400 to-teal-500'
    },
    {
      icon: '✉️',
      title: 'Email Us',
      details: ['info@agenticai.com', 'support@agenticai.com', 'sales@agenticai.com'],
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: ['Available 24/7', 'Average response: 2min', 'AI-powered assistance'],
      gradient: 'from-blue-400 to-indigo-500'
    }
  ]

  const faqs = [
    {
      question: 'What are your business hours?',
      answer: 'Our main office hours are Monday through Friday, 9:00 AM to 6:00 PM PST. However, our AI-powered chat support is available 24/7 to assist you with any questions.'
    },
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'We typically respond to all inquiries within 2-4 business hours during weekdays. For urgent matters, we recommend using our live chat feature for immediate assistance.'
    },
    {
      question: 'Do you offer international support?',
      answer: 'Yes! We serve clients worldwide. Our team provides support in multiple languages including English, Spanish, Arabic, and Mandarin.'
    },
    {
      question: 'Can I schedule a consultation call?',
      answer: 'Absolutely! You can request a consultation through this form or book directly through our calendar system. We offer both free 15-minute initial calls and in-depth paid consultations.'
    },
    {
      question: 'What is your typical response time for technical issues?',
      answer: 'For technical support, our average response time is under 1 hour for priority issues. All technical inquiries are handled by our expert engineering team.'
    }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Bismillah at top */}
      <div className="text-center mb-12">
        <div className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Have questions about our AI solutions? We're here to help you transform your business with cutting-edge technology.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
              <div className="relative">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {info.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${info.gradient} bg-clip-text text-transparent`}>
                  {info.title}
                </h3>
                <div className="space-y-1 text-gray-300">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Contact Form & Map */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">Send us a message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-200 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  Thank you for contacting us! We'll get back to you within 24 hours.
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-200 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  Something went wrong. Please try again or call us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      formErrors.name ? 'border-red-400' : 'border-white/20'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="John Doe"
                  />
                </div>
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      formErrors.email ? 'border-red-400' : 'border-white/20'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="john@example.com"
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-gray-500">(optional)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      formErrors.phone ? 'border-red-400' : 'border-white/20'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.phone}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📌</span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      formErrors.subject ? 'border-red-400' : 'border-white/20'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all`}
                    placeholder="How can we help?"
                  />
                </div>
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.subject}</p>
                )}
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['email', 'phone', 'any'].map((method) => (
                    <label
                      key={method}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        formData.preferredContact === method
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low', label: 'Low', color: 'green' },
                    { value: 'medium', label: 'Medium', color: 'yellow' },
                    { value: 'high', label: 'High', color: 'red' }
                  ].map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer transition-all ${
                        formData.urgency === level.value
                          ? `bg-${level.color}-500/30 border border-${level.color}-500`
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className="capitalize">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">💬</span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full pl-10 pr-4 py-3 bg-white/10 border ${
                      formErrors.message ? 'border-red-400' : 'border-white/20'
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none`}
                    placeholder="Tell us more about your project or inquiry..."
                  />
                </div>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-400 text-right">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-purple-700 hover:to-pink-700 transform hover:scale-105'
                } transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
              <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl overflow-hidden relative">
                {/* Map placeholder - Replace with actual map embed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-white">Interactive Map Coming Soon</p>
                    <p className="text-sm text-gray-400 mt-2">123 AI Innovation Street, Tech Valley, CA 94043</p>
                  </div>
                </div>
                {/* Decorative grid lines */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-white/10 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                    >
                      <span className="text-white font-medium">{faq.question}</span>
                      <span className={`transform transition-transform ${activeFaq === index ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {activeFaq === index && (
                      <div className="px-4 py-3 bg-white/5 text-gray-300 text-sm border-t border-white/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
              <p className="text-sm text-gray-400 mb-2">Direct Contact with Administrator</p>
              <p className="text-xl font-bold text-white mb-1">Hafiz Sajid Syed</p>
              <p className="text-pink-400 mb-3">sajid.syed@example.com</p>
              <p className="text-sm text-gray-300">
                Available for partnership inquiries and high-priority matters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <h3 className="text-2xl font-bold text-white mb-6">Connect With Us</h3>
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { icon: '📘', name: 'Facebook', url: '#' },
            { icon: '🐦', name: 'Twitter', url: '#' },
            { icon: '💼', name: 'LinkedIn', url: '#' },
            { icon: '📺', name: 'YouTube', url: '#' },
            { icon: '💻', name: 'GitHub', url: '#' },
            { icon: '▲', name: 'Vercel', url: '#' },
            { icon: '📱', name: 'WhatsApp', url: '#' },
            { icon: '📷', name: 'Instagram', url: '#' }
          ].map((social) => (
            <Link
              key={social.name}
              href={social.url}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl hover:scale-110 transition-transform hover:shadow-lg hover:shadow-purple-500/50"
              title={social.name}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
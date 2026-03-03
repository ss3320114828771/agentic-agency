'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TransportMode {
  id: string
  name: string
  icon: string
  description: string
  duration: string
  cost: string
  steps: string[]
}

interface Landmark {
  name: string
  distance: string
  direction: string
  icon: string
}

export default function DirectionsPage() {
  const [selectedMode, setSelectedMode] = useState<string>('car')
  const [showParking, setShowParking] = useState(false)
  const [showTransit, setShowTransit] = useState(false)
  const [activeTab, setActiveTab] = useState<'directions' | 'parking' | 'transit'>('directions')

  const transportModes: TransportMode[] = [
    {
      id: 'car',
      name: 'By Car',
      icon: '🚗',
      description: 'Driving directions from major highways',
      duration: '20-30 mins',
      cost: '$5-10 (toll)',
      steps: [
        'Take Highway 101 to exit 42 (Tech Boulevard)',
        'Merge onto Tech Boulevard and continue for 2.5 miles',
        'Turn left onto Innovation Avenue',
        'After 0.8 miles, turn right onto AI Street',
        'Our building is on the right, #123 AI Street',
        'Free parking available in the rear of building'
      ]
    },
    {
      id: 'public',
      name: 'Public Transit',
      icon: '🚇',
      description: 'Metro and bus routes to our location',
      duration: '35-45 mins',
      cost: '$2.50',
      steps: [
        'Take Metro Line to Tech Central Station',
        'Exit station and walk to bus stop #42',
        'Take Bus 7 towards Innovation District',
        'Get off at AI Street & Innovation Avenue stop',
        'Walk 2 blocks east on AI Street',
        'Building is on the left, #123 AI Street'
      ]
    },
    {
      id: 'bike',
      name: 'Bicycle',
      icon: '🚲',
      description: 'Bike-friendly routes with dedicated lanes',
      duration: '15-20 mins',
      cost: 'Free',
      steps: [
        'Use the Innovation Avenue bike lane',
        'Follow the Tech Valley Bike Trail',
        'Turn onto AI Street at the bike-sharing station',
        'Secure bike parking available in front of building',
        'Showers and changing rooms available for cyclists'
      ]
    },
    {
      id: 'walk',
      name: 'Walking',
      icon: '🚶',
      description: 'Walking routes from nearby areas',
      duration: '10-60 mins',
      cost: 'Free',
      steps: [
        'From Tech Central Station, head east on Innovation Avenue',
        'Walk 0.5 miles until you reach AI Street',
        'Turn right and continue for 2 blocks',
        'Building #123 is on the right with clear signage',
        'Main entrance faces AI Street'
      ]
    }
  ]

  const nearbyLandmarks: Landmark[] = [
    { name: 'Tech Central Station', distance: '0.3 miles', direction: 'West', icon: '🚉' },
    { name: 'Innovation Square', distance: '0.1 miles', direction: 'North', icon: '🏢' },
    { name: 'Tech Valley Mall', distance: '0.8 miles', direction: 'South', icon: '🛍️' },
    { name: 'Central Park', distance: '1.2 miles', direction: 'East', icon: '🌳' },
    { name: 'Airport', distance: '8.5 miles', direction: 'Northwest', icon: '✈️' },
    { name: 'Convention Center', distance: '0.5 miles', direction: 'Southeast', icon: '🏛️' }
  ]

  const parkingOptions = [
    {
      name: 'Building Parking (Free)',
      location: 'Rear of building',
      spaces: '50 spaces',
      evCharging: true,
      accessible: true,
      hours: '24/7',
      icon: '🅿️'
    },
    {
      name: 'Innovation Garage',
      location: '200 AI Street',
      spaces: '500 spaces',
      evCharging: true,
      accessible: true,
      hours: '24/7',
      rate: '$2/hour, $15 max',
      icon: '🏢'
    },
    {
      name: 'Street Parking',
      location: 'AI Street',
      spaces: 'Metered parking',
      evCharging: false,
      accessible: true,
      hours: '8am - 8pm',
      rate: '$1.50/hour',
      icon: '🚗'
    }
  ]

  const transitOptions = [
    {
      route: 'Metro Line 1',
      station: 'Tech Central',
      frequency: 'Every 5-10 mins',
      firstTrain: '5:00 AM',
      lastTrain: '12:00 AM',
      icon: '🚇'
    },
    {
      route: 'Bus 7 - Innovation',
      stop: 'AI Street & Innovation',
      frequency: 'Every 15 mins',
      firstBus: '6:00 AM',
      lastBus: '11:00 PM',
      icon: '🚌'
    },
    {
      route: 'Shuttle Service',
      stop: 'Corporate Shuttle Stop',
      frequency: 'Every 30 mins (peak hours)',
      firstShuttle: '7:00 AM',
      lastShuttle: '7:00 PM',
      icon: '🚐'
    }
  ]

  const selectedTransport = transportModes.find(mode => mode.id === selectedMode) || transportModes[0]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Bismillah at top */}
      <div className="text-center mb-12">
        <div className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent mb-4">
          Directions to Our Office
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Find your way to our innovation hub in the heart of Tech Valley
        </p>
      </div>

      {/* Main Location Card */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Agentic AI Headquarters</h2>
              <p className="text-gray-300 flex items-center gap-2 mb-4">
                <span>📍</span>
                123 AI Innovation Street, Tech Valley, CA 94043
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-green-400">✅</span> Free Parking
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-blue-400">✅</span> Wheelchair Accessible
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-yellow-400">✅</span> EV Charging
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-purple-400">✅</span> Bike Racks
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <span>🗺️</span> Open in Google Maps
              </a>
              <a 
                href="https://maps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
              >
                <span>🍎</span> Apple Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl overflow-hidden relative">
            {/* Animated map overlay */}
            <div className="absolute inset-0">
              {/* Grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* Building markers */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full animate-ping absolute"></div>
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full relative flex items-center justify-center">
                    <span className="text-xs text-white font-bold">📍</span>
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black/50 px-2 py-1 rounded text-white text-xs">
                    Your Destination
                  </div>
                </div>
              </div>

              {/* Route lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                <path d="M100,200 Q300,150 500,200" stroke="url(#gradient)" strokeWidth="2" fill="none" strokeDasharray="5,5">
                  <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
                </path>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Map controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                +
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                −
              </button>
            </div>

            {/* Location info */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur rounded-lg px-4 py-2 text-white text-sm">
              <span className="text-yellow-400">●</span> Live location tracking available
            </div>
          </div>
        </div>
      </div>

      {/* Transport Mode Selector */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Choose Your Transport Mode</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {transportModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                selectedMode === mode.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-105'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="text-4xl mb-2">{mode.icon}</div>
              <h3 className="font-bold text-white">{mode.name}</h3>
              <p className="text-sm text-gray-300 mt-1">{mode.duration}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Directions */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Directions Steps */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{selectedTransport.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedTransport.name} Directions</h3>
                  <p className="text-gray-400">{selectedTransport.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedTransport.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      {index < selectedTransport.steps.length - 1 && (
                        <div className="absolute top-8 left-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-600 to-pink-600 transform -translate-x-1/2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <p className="text-white">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg flex flex-wrap gap-6">
                <div>
                  <span className="text-sm text-gray-400">Estimated Duration</span>
                  <p className="text-xl font-bold text-white">{selectedTransport.duration}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-400">Estimated Cost</span>
                  <p className="text-xl font-bold text-white">{selectedTransport.cost}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Nearby Landmarks */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Nearby Landmarks</h3>
              <div className="space-y-3">
                {nearbyLandmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{landmark.icon}</span>
                      <div>
                        <p className="text-white font-medium">{landmark.name}</p>
                        <p className="text-sm text-gray-400">{landmark.distance} • {landmark.direction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather & Traffic */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Current Conditions</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Weather</span>
                  <span className="text-white flex items-center gap-2">
                    <span className="text-2xl">☀️</span> 72°F Sunny
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Traffic</span>
                  <span className="text-green-400">Light</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Air Quality</span>
                  <span className="text-green-400">Good</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-yellow-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parking & Transit Tabs */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
            {[
              { id: 'directions', label: 'Directions', icon: '🗺️' },
              { id: 'parking', label: 'Parking', icon: '🅿️' },
              { id: 'transit', label: 'Transit Schedule', icon: '🚌' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'parking' && (
              <div className="grid md:grid-cols-3 gap-4">
                {parkingOptions.map((option, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-5 hover:scale-105 transition-transform">
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{option.name}</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400 flex items-center gap-2">
                        <span>📍</span> {option.location}
                      </p>
                      <p className="text-gray-400 flex items-center gap-2">
                        <span>🅿️</span> {option.spaces}
                      </p>
                      {option.rate && (
                        <p className="text-gray-400 flex items-center gap-2">
                          <span>💰</span> {option.rate}
                        </p>
                      )}
                      <p className="text-gray-400 flex items-center gap-2">
                        <span>⏰</span> {option.hours}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {option.evCharging && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">EV</span>
                        )}
                        {option.accessible && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">♿</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transit' && (
              <div className="space-y-4">
                {transitOptions.map((option, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-5">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{option.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white">{option.route}</h4>
                        <p className="text-sm text-gray-400">{option.stop || option.station}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">Frequency</p>
                        <p className="text-white font-medium">{option.frequency}</p>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">First:</span>
                        <span className="text-white ml-2">{option.firstTrain || option.firstBus || option.firstShuttle}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Last:</span>
                        <span className="text-white ml-2">{option.lastTrain || option.lastBus || option.lastShuttle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips & Additional Info */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Tips Card */}
          <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>💡</span> Travel Tips
            </h3>
            <ul className="space-y-3">
              {[
                'Best arrival time: 9:00 AM - 11:00 AM',
                'Avoid rush hour (8:00-9:30 AM & 5:00-6:30 PM)',
                'Weekend parking is free and plentiful',
                'Bring ID for building access',
                'Coffee shop on ground floor opens at 7:30 AM'
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-yellow-400">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Accessibility Info */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>♿</span> Accessibility Information
            </h3>
            <ul className="space-y-3">
              {[
                'Wheelchair accessible entrance on AI Street',
                'Accessible parking spaces available in all lots',
                'Elevator access to all floors',
                'Service animals welcome',
                'Assistive listening devices available upon request'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-blue-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <p className="text-sm text-gray-400 mb-2">For Assistance Contact</p>
          <p className="text-xl font-bold text-white mb-1">Hafiz Sajid Syed</p>
          <p className="text-pink-400 mb-2">sajid.syed@example.com</p>
          <p className="text-sm text-gray-300">Available for emergency directions and support</p>
        </div>
      </div>
    </div>
  )
}
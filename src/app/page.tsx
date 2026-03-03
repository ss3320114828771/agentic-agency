import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const images = ['n1.jpeg', 'n2.jpeg', 'n3.jpeg', 'n4.jpeg', 'n5.jpeg', 'n6.jpeg']
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
          Welcome to Agentic AI
        </h1>
        <p className="text-xl text-white/90 max-w-3xl mx-auto">
          Your Premier Destination for AI and Web Development Solutions
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/products" className="inline-block px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-blue-500/50">
            Shop Now
          </Link>
          <Link href="/about" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-pink-500/50">
            Learn More
          </Link>
        </div>
      </section>

      {/* Images Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="relative h-64 rounded-xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-50 transition-opacity z-10"></div>
            <img
              src={`/${img}`}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </section>

      {/* Health Importance Note */}
      <section className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          The Importance of Health
        </h2>
        <div className="prose prose-lg prose-invert max-w-4xl mx-auto text-white/90">
          <p>
            In our journey through the digital world, we must never forget that health is the ultimate wealth. 
            Just as we maintain our digital systems, we must nurture our physical and mental well-being. 
            Good health enables us to:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Maintain peak cognitive performance for complex problem-solving</li>
            <li>Sustain long hours of creative work without burnout</li>
            <li>Build resilience against stress in fast-paced tech environments</li>
            <li>Foster better team collaboration through positive energy</li>
            <li>Lead longer, more fulfilling careers in technology</li>
          </ul>
          <p className="mt-4">
            Remember: Your most valuable asset in any business is your health. Take care of it daily.
          </p>
        </div>
      </section>
    </div>
  )
}
import Link from 'next/link'
import SocialLinks from './social-links'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              About Us
            </h3>
            <p className="text-gray-300">
              Agentic AI E-Shop - Your trusted partner for AI and web development solutions.
            </p>
            <p className="mt-4 text-sm">
              Administrator: Hafiz Sajid Syed
              <br />
              Email: sajid.syed@example.com
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="hover:text-yellow-300 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-yellow-300 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link></li>
              <li><Link href="/directions" className="hover:text-yellow-300 transition-colors">Directions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Contact Info
            </h3>
            <p className="text-gray-300">
              Email: info@agenticai.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 AI Street, Tech City, TC 12345
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Follow Us
            </h3>
            <SocialLinks />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Agentic AI E-Shop. All rights reserved. | Developed by Hafiz Sajid Syed</p>
        </div>
      </div>
    </footer>
  )
}
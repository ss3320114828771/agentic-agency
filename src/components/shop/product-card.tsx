'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'

interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    // Create a cart item with the correct structure
    const cartItem = {
      id: Date.now().toString(), // Generate a unique ID for cart item
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl || '/placeholder.jpg'
    }
    
    addItem(cartItem)
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:scale-105 transition-all duration-300">
      {/* Image Section */}
      <div className="h-48 bg-purple-900/30 flex items-center justify-center">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl opacity-30">🖼️</span>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-400">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              View
            </Link>
            
            <button
              onClick={handleAddToCart}
              className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
import { NextResponse } from 'next/server'

// Simple types
interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Cart {
  userId: string
  items: CartItem[]
  total: number
}

// Mock cart storage (in real app, this would be a database)
const carts: Map<string, Cart> = new Map()

// Helper to calculate cart total
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// GET /api/cart?userId=xxx - Get user's cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Get cart for user
    const cart = carts.get(userId) || { userId, items: [], total: 0 }
    
    return NextResponse.json({ 
      success: true,
      cart 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, productId, name, price, image, quantity = 1 } = body

    // Validate input
    if (!userId || !productId || !name || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get or create cart
    let cart = carts.get(userId)
    if (!cart) {
      cart = { userId, items: [], total: 0 }
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(item => item.productId === productId)
    
    if (existingItemIndex >= 0) {
      // Update existing item
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId,
        name,
        price,
        quantity,
        image: image || '/placeholder.jpg'
      }
      cart.items.push(newItem)
    }

    // Recalculate total
    cart.total = calculateTotal(cart.items)
    
    // Save cart
    carts.set(userId, cart)

    return NextResponse.json({ 
      success: true,
      cart,
      message: 'Item added to cart'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

// PUT /api/cart - Update cart item quantity
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { userId, itemId, quantity } = body

    // Validate input
    if (!userId || !itemId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      )
    }

    // Get cart
    const cart = carts.get(userId)
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    // Find and update item
    const itemIndex = cart.items.findIndex(item => item.id === itemId)
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Item not found in cart' },
        { status: 404 }
      )
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity
    
    // Recalculate total
    cart.total = calculateTotal(cart.items)
    
    // Save cart
    carts.set(userId, cart)

    return NextResponse.json({ 
      success: true,
      cart,
      message: 'Cart updated'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

// DELETE /api/cart - Remove item from cart or clear cart
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const itemId = searchParams.get('itemId')
    const action = searchParams.get('action')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // Get cart
    const cart = carts.get(userId)
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      )
    }

    // Handle different delete actions
    if (action === 'clear') {
      // Clear entire cart
      cart.items = []
      cart.total = 0
      carts.set(userId, cart)
      
      return NextResponse.json({ 
        success: true,
        cart,
        message: 'Cart cleared'
      })
    }

    // Remove specific item
    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID required' },
        { status: 400 }
      )
    }

    const initialLength = cart.items.length
    cart.items = cart.items.filter(item => item.id !== itemId)
    
    if (cart.items.length === initialLength) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    // Recalculate total
    cart.total = calculateTotal(cart.items)
    
    // Save cart
    carts.set(userId, cart)

    return NextResponse.json({ 
      success: true,
      cart,
      message: 'Item removed from cart'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
}

// PATCH /api/cart - Apply promo code
export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { userId, promoCode } = body

    if (!userId || !promoCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get cart
    const cart = carts.get(userId)
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Mock promo codes
    const validPromos: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME15': 15,
      'AI2024': 25,
      'WEBDEV': 30
    }

    const discount = validPromos[promoCode.toUpperCase()]
    
    if (!discount) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 400 }
      )
    }

    // Calculate discount
    const discountAmount = (cart.total * discount) / 100
    const finalTotal = cart.total - discountAmount

    return NextResponse.json({ 
      success: true,
      originalTotal: cart.total,
      discount: discountAmount,
      finalTotal,
      promoCode: promoCode.toUpperCase(),
      discountPercentage: discount,
      message: `Promo code applied: ${discount}% off`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to apply promo code' },
      { status: 500 }
    )
  }
}

// Helper endpoint to get cart summary
export async function HEAD(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return new NextResponse(null, { status: 400 })
    }

    const cart = carts.get(userId)
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

    return new NextResponse(null, { 
      status: 200,
      headers: {
        'X-Cart-Item-Count': String(itemCount),
        'X-Cart-Total': String(cart?.total || 0)
      }
    })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}

// OPTIONS /api/cart - Get available actions
export async function OPTIONS() {
  return NextResponse.json({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    description: 'Cart management API',
    endpoints: {
      GET: 'Get cart - ?userId=xxx',
      POST: 'Add item to cart - {userId, productId, name, price, image, quantity}',
      PUT: 'Update quantity - {userId, itemId, quantity}',
      DELETE: 'Remove item - ?userId=xxx&itemId=xxx or ?userId=xxx&action=clear',
      PATCH: 'Apply promo code - {userId, promoCode}',
      HEAD: 'Get cart summary - ?userId=xxx'
    }
  })
}
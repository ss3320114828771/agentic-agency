import { NextResponse } from 'next/server'

// Simple types
interface Product {
  id: string
  name: string
  description: string
  longDescription?: string
  price: number
  originalPrice?: number
  category: string
  subcategory?: string
  image: string
  images?: string[]
  rating: number
  reviews?: number
  stock: number
  sku?: string
  tags?: string[]
  features?: string[]
  specifications?: { [key: string]: string }
  status: 'active' | 'draft' | 'out_of_stock'
  createdAt: string
  updatedAt?: string
}

// Mock products database (in real app, this would be a real database)
let products: Product[] = [
  {
    id: '1',
    name: 'AI Development Suite Pro',
    description: 'Complete AI-powered development platform with advanced machine learning capabilities',
    longDescription: 'Experience the future of software development with our comprehensive AI-powered suite. This cutting-edge platform combines advanced machine learning algorithms with intuitive development tools to supercharge your productivity.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'AI Software',
    subcategory: 'Development Tools',
    image: '/products/ai-suite.jpg',
    images: ['/products/ai-suite-1.jpg', '/products/ai-suite-2.jpg'],
    rating: 4.8,
    reviews: 156,
    stock: 45,
    sku: 'AI-DEV-PRO-2024',
    tags: ['AI', 'Machine Learning', 'Development', 'Enterprise'],
    features: [
      'AI-powered code completion',
      'Automated bug detection',
      'Natural language to code',
      'Custom model training'
    ],
    specifications: {
      'Version': '2024.1',
      'Platform': 'Windows, macOS, Linux',
      'Languages': 'Python, JavaScript, TypeScript',
      'RAM Required': '8GB minimum'
    },
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'ML Model Trainer',
    description: 'Train and deploy machine learning models with ease',
    price: 399.99,
    category: 'Machine Learning',
    image: '/products/ml-trainer.jpg',
    rating: 4.9,
    stock: 23,
    status: 'active',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'AI Security Suite',
    description: 'AI-powered security monitoring and threat detection',
    price: 329.99,
    originalPrice: 379.99,
    category: 'Security',
    image: '/products/security.jpg',
    rating: 4.8,
    stock: 34,
    status: 'active',
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Data Analytics AI',
    description: 'Advanced analytics platform with AI insights',
    price: 249.99,
    category: 'Analytics',
    image: '/products/analytics.jpg',
    rating: 4.7,
    stock: 56,
    status: 'active',
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'AI Testing Assistant',
    description: 'Automated testing and QA tool',
    price: 149.99,
    category: 'AI Software',
    image: '/products/testing.jpg',
    rating: 4.6,
    stock: 12,
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'AI Chatbot Builder',
    description: 'Create intelligent chatbots without coding',
    price: 89.99,
    category: 'AI Tools',
    image: '/products/chatbot.jpg',
    rating: 4.4,
    stock: 100,
    status: 'active',
    createdAt: '2024-01-06'
  },
  {
    id: '7',
    name: 'Legacy Product',
    description: 'Older version - needs update',
    price: 99.99,
    category: 'Legacy',
    image: '/products/legacy.jpg',
    rating: 3.5,
    stock: 3,
    status: 'draft',
    createdAt: '2023-12-01'
  },
  {
    id: '8',
    name: 'Out of Stock Item',
    description: 'Temporarily unavailable',
    price: 199.99,
    category: 'AI Tools',
    image: '/products/outofstock.jpg',
    rating: 4.2,
    stock: 0,
    status: 'out_of_stock',
    createdAt: '2023-12-15'
  }
]

// GET /api/products - Get all products or filter by category
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    const limit = searchParams.get('limit')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    // If ID is provided, return single product
    if (id) {
      const product = products.find(p => p.id === id)
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({ success: true, product })
    }

    // Start with all products
    let filteredProducts = [...products]

    // Apply filters
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (status && status !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.status === status)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      )
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice))
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice))
    }

    // Apply sorting
    if (sort) {
      switch(sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating-desc':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          filteredProducts.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          break
        case 'name-asc':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
          break
        default:
          break
      }
    }

    // Get unique categories for filter
    const categories = [...new Set(products.map(p => p.category))]

    // Calculate pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredProducts.length / pageSize)

    // Apply limit if specified
    const finalProducts = limit 
      ? filteredProducts.slice(0, Number(limit))
      : paginatedProducts

    return NextResponse.json({ 
      success: true,
      products: finalProducts,
      total: filteredProducts.length,
      page,
      pageSize,
      totalPages,
      categories,
      filters: {
        category,
        status,
        search,
        minPrice,
        maxPrice,
        sort
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'description', 'price', 'category', 'stock']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create new product
    const newProduct: Product = {
      id: String(products.length + 1),
      name: body.name,
      description: body.description,
      longDescription: body.longDescription,
      price: body.price,
      originalPrice: body.originalPrice,
      category: body.category,
      subcategory: body.subcategory,
      image: body.image || '/placeholder.jpg',
      images: body.images || [],
      rating: 0,
      reviews: 0,
      stock: body.stock,
      sku: body.sku || `SKU-${Date.now()}`,
      tags: body.tags || [],
      features: body.features || [],
      specifications: body.specifications || {},
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Add to mock database
    products.push(newProduct)

    return NextResponse.json({ 
      success: true,
      product: newProduct,
      message: 'Product created successfully'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

// PUT /api/products?id=xxx - Update product
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Find product index
    const productIndex = products.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    products[productIndex] = updatedProduct

    return NextResponse.json({ 
      success: true,
      product: updatedProduct,
      message: 'Product updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products?id=xxx - Delete product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const action = searchParams.get('action')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    // Handle bulk actions
    if (action === 'bulk') {
      const ids = id.split(',')
      products = products.filter(p => !ids.includes(p.id))
      
      return NextResponse.json({ 
        success: true,
        message: `${ids.length} products deleted successfully`
      })
    }

    // Find product
    const productIndex = products.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Remove product
    products.splice(productIndex, 1)

    return NextResponse.json({ 
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

// PATCH /api/products?id=xxx - Partially update product
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      )
    }

    const body = await request.json()
    
    // Find product
    const productIndex = products.findIndex(p => p.id === id)
    
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Update only provided fields
    products[productIndex] = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({ 
      success: true,
      product: products[productIndex],
      message: 'Product updated successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// HEAD /api/products - Get products count
export async function HEAD(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')

    let filteredProducts = [...products]

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }

    if (status && status !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.status === status)
    }

    const totalValue = filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)

    return new NextResponse(null, { 
      status: 200,
      headers: {
        'X-Total-Count': String(filteredProducts.length),
        'X-Active-Count': String(products.filter(p => p.status === 'active').length),
        'X-Draft-Count': String(products.filter(p => p.status === 'draft').length),
        'X-Out-Of-Stock-Count': String(products.filter(p => p.status === 'out_of_stock').length),
        'X-Total-Value': String(totalValue)
      }
    })
  } catch {
    return new NextResponse(null, { status: 500 })
  }
}

// OPTIONS /api/products - Get available actions
export async function OPTIONS() {
  return NextResponse.json({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
    description: 'Products management API',
    endpoints: {
      GET: 'Get products - Supports filtering, sorting, pagination',
      POST: 'Create new product',
      PUT: 'Update product - ?id=xxx',
      DELETE: 'Delete product - ?id=xxx or ?id=id1,id2,id3&action=bulk',
      PATCH: 'Partially update product - ?id=xxx',
      HEAD: 'Get products statistics'
    },
    queryParameters: {
      id: 'Get single product',
      category: 'Filter by category',
      status: 'Filter by status (active/draft/out_of_stock)',
      search: 'Search in name and description',
      minPrice: 'Minimum price filter',
      maxPrice: 'Maximum price filter',
      sort: 'Sort by (price-asc, price-desc, rating-desc, newest, name-asc)',
      page: 'Page number for pagination',
      pageSize: 'Items per page',
      limit: 'Limit number of results'
    }
  })
}
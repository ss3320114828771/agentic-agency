'use client'

import { useState, useEffect, useCallback } from 'react'

// Types
export interface Product {
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
  specifications?: Record<string, string>
  status: 'active' | 'draft' | 'out_of_stock'
  createdAt: string
  updatedAt?: string
}

export interface ProductFilters {
  category?: string
  subcategory?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  inStock?: boolean
  tags?: string[]
  status?: 'active' | 'draft' | 'out_of_stock' | 'all'
}

export interface ProductSort {
  field: 'price' | 'rating' | 'name' | 'createdAt' | 'reviews'
  direction: 'asc' | 'desc'
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  categories: string[]
  filters: ProductFilters
}

export interface UseProductsReturn {
  // Products state
  products: Product[]
  featuredProducts: Product[]
  newArrivals: Product[]
  bestSellers: Product[]
  relatedProducts: Product[]
  
  // Single product
  currentProduct: Product | null
  isLoadingProduct: boolean
  productError: string | null
  
  // Loading states
  isLoading: boolean
  isFetchingMore: boolean
  error: string | null
  
  // Pagination
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasMore: boolean
  
  // Filters
  filters: ProductFilters
  availableCategories: string[]
  availableSubcategories: Record<string, string[]>
  priceRange: { min: number; max: number }
  
  // Actions
  setFilters: (filters: ProductFilters) => void
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void
  resetFilters: () => void
  clearFilters: () => void
  
  // Sorting
  sort: ProductSort
  setSort: (sort: ProductSort) => void
  
  // Pagination actions
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  
  // Data fetching
  refetch: () => Promise<void>
  fetchMore: () => Promise<void>
  fetchProductById: (id: string) => Promise<Product | null>
  
  // Search
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Utilities
  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  getProductsByTag: (tag: string) => Product[]
  getDiscountedProducts: () => Product[]
  getTopRatedProducts: (limit?: number) => Product[]
  
  // Comparison
  compareProducts: (productIds: string[]) => Product[]
}

// Mock products data
const MOCK_PRODUCTS: Product[] = [
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
    longDescription: 'Powerful ML training platform that simplifies the entire machine learning workflow. From data preprocessing to model deployment, do it all with just a few clicks.',
    price: 399.99,
    category: 'Machine Learning',
    subcategory: 'Training Tools',
    image: '/products/ml-trainer.jpg',
    rating: 4.9,
    reviews: 89,
    stock: 23,
    sku: 'ML-TRAIN-2024',
    tags: ['Machine Learning', 'AI', 'Training'],
    features: [
      'Automated model selection',
      'Hyperparameter tuning',
      'Model versioning',
      'One-click deployment'
    ],
    specifications: {
      'Version': '2.1.0',
      'Platform': 'Cloud, On-premise',
      'Supported Frameworks': 'TensorFlow, PyTorch, Scikit-learn',
      'Max Model Size': '10GB'
    },
    status: 'active',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'AI Security Suite',
    description: 'AI-powered security monitoring and threat detection',
    longDescription: 'Protect your applications with advanced AI-driven security. Real-time threat detection, automated incident response, and comprehensive security analytics.',
    price: 329.99,
    originalPrice: 379.99,
    category: 'Security',
    subcategory: 'AI Security',
    image: '/products/security.jpg',
    rating: 4.8,
    reviews: 67,
    stock: 34,
    sku: 'AI-SEC-2024',
    tags: ['Security', 'AI', 'Monitoring', 'Protection'],
    features: [
      'Real-time threat detection',
      'Automated incident response',
      'Vulnerability scanning',
      'Compliance reporting'
    ],
    specifications: {
      'Version': '3.0.0',
      'Deployment': 'Cloud, On-premise',
      'Integrations': 'Slack, PagerDuty, Jira',
      'Alert Response': '< 1 second'
    },
    status: 'active',
    createdAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Data Analytics AI',
    description: 'Advanced analytics platform with AI insights',
    longDescription: 'Transform your data into actionable insights with AI-powered analytics. Automated reporting, predictive analytics, and beautiful visualizations.',
    price: 249.99,
    category: 'Analytics',
    subcategory: 'Business Intelligence',
    image: '/products/analytics.jpg',
    rating: 4.7,
    reviews: 112,
    stock: 56,
    sku: 'AI-ANALYTICS-2024',
    tags: ['Analytics', 'BI', 'Data Science', 'Reporting'],
    features: [
      'Automated insights',
      'Predictive analytics',
      'Custom dashboards',
      'Data visualization'
    ],
    specifications: {
      'Version': '4.2.0',
      'Data Sources': 'SQL, NoSQL, APIs, Files',
      'Max Data Size': '100GB',
      'Export Formats': 'PDF, Excel, CSV, JSON'
    },
    status: 'active',
    createdAt: '2024-01-04'
  },
  {
    id: '5',
    name: 'AI Testing Assistant',
    description: 'Automated testing and QA tool',
    longDescription: 'Revolutionize your testing process with AI-powered test generation, execution, and analysis. Catch bugs before they reach production.',
    price: 149.99,
    category: 'AI Software',
    subcategory: 'Testing',
    image: '/products/testing.jpg',
    rating: 4.6,
    reviews: 45,
    stock: 12,
    sku: 'AI-TEST-2024',
    tags: ['Testing', 'QA', 'Automation', 'AI'],
    features: [
      'Automated test generation',
      'Visual testing',
      'Performance testing',
      'Bug prediction'
    ],
    specifications: {
      'Version': '1.5.0',
      'Test Types': 'Unit, Integration, E2E, Visual',
      'CI/CD Integration': 'Jenkins, GitHub Actions',
      'Parallel Execution': 'Up to 100 tests'
    },
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: '6',
    name: 'AI Chatbot Builder',
    description: 'Create intelligent chatbots without coding',
    longDescription: 'Build sophisticated chatbots for customer service, sales, and support. No coding required - just drag, drop, and train.',
    price: 89.99,
    category: 'AI Tools',
    subcategory: 'Chatbots',
    image: '/products/chatbot.jpg',
    rating: 4.4,
    reviews: 234,
    stock: 100,
    sku: 'AI-CHAT-2024',
    tags: ['Chatbot', 'NLP', 'Customer Service', 'Automation'],
    features: [
      'Visual conversation builder',
      'Multi-channel deployment',
      'Analytics dashboard',
      'Human handoff'
    ],
    specifications: {
      'Version': '2.3.0',
      'Channels': 'Web, Mobile, WhatsApp, Messenger',
      'Languages': '50+ languages',
      'Concurrent Users': 'Unlimited'
    },
    status: 'active',
    createdAt: '2024-01-06'
  },
  {
    id: '7',
    name: 'AI Vision Pro',
    description: 'Computer vision platform for image and video analysis',
    longDescription: 'Powerful computer vision platform for object detection, facial recognition, and image classification. Perfect for security, retail, and manufacturing.',
    price: 449.99,
    originalPrice: 499.99,
    category: 'AI Software',
    subcategory: 'Computer Vision',
    image: '/products/vision.jpg',
    rating: 5.0,
    reviews: 34,
    stock: 8,
    sku: 'AI-VISION-2024',
    tags: ['Computer Vision', 'AI', 'Image Recognition', 'Video Analytics'],
    features: [
      'Object detection',
      'Facial recognition',
      'OCR',
      'Video analytics'
    ],
    specifications: {
      'Version': '1.0.0',
      'Accuracy': '99.2%',
      'Processing Speed': '30 FPS',
      'API Calls': '1000/min'
    },
    status: 'active',
    createdAt: '2024-01-07'
  },
  {
    id: '8',
    name: 'Legacy Product',
    description: 'Older version - needs update',
    price: 99.99,
    category: 'Legacy',
    image: '/products/legacy.jpg',
    rating: 3.5,
    reviews: 12,
    stock: 3,
    sku: 'LEGACY-001',
    tags: ['Legacy'],
    features: [],
    specifications: {},
    status: 'draft',
    createdAt: '2023-12-01'
  },
  {
    id: '9',
    name: 'Out of Stock Item',
    description: 'Temporarily unavailable',
    price: 199.99,
    category: 'AI Tools',
    image: '/products/outofstock.jpg',
    rating: 4.2,
    reviews: 23,
    stock: 0,
    sku: 'OOS-001',
    tags: ['AI'],
    features: [],
    specifications: {},
    status: 'out_of_stock',
    createdAt: '2023-12-15'
  }
]

// Default filters
const DEFAULT_FILTERS: ProductFilters = {
  category: undefined,
  subcategory: undefined,
  search: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minRating: undefined,
  inStock: undefined,
  tags: undefined,
  status: 'active'
}

// Default sort
const DEFAULT_SORT: ProductSort = {
  field: 'createdAt',
  direction: 'desc'
}

// Filter products based on filters
const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  return products.filter(product => {
    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false
    }

    // Filter by subcategory
    if (filters.subcategory && product.subcategory !== filters.subcategory) {
      return false
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesName = product.name.toLowerCase().includes(searchLower)
      const matchesDescription = product.description.toLowerCase().includes(searchLower)
      const matchesCategory = product.category.toLowerCase().includes(searchLower)
      const matchesTags = product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      
      if (!matchesName && !matchesDescription && !matchesCategory && !matchesTags) {
        return false
      }
    }

    // Filter by price range
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false
    }

    // Filter by rating
    if (filters.minRating !== undefined && product.rating < filters.minRating) {
      return false
    }

    // Filter by stock
    if (filters.inStock && product.stock === 0) {
      return false
    }

    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      if (!product.tags || !filters.tags.some(tag => product.tags?.includes(tag))) {
        return false
      }
    }

    // Filter by status
    if (filters.status && filters.status !== 'all' && product.status !== filters.status) {
      return false
    }

    return true
  })
}

// Sort products
const sortProducts = (products: Product[], sort: ProductSort): Product[] => {
  return [...products].sort((a, b) => {
    let comparison = 0
    
    switch (sort.field) {
      case 'price':
        comparison = a.price - b.price
        break
      case 'rating':
        comparison = a.rating - b.rating
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case 'reviews':
        comparison = (a.reviews || 0) - (b.reviews || 0)
        break
      default:
        comparison = 0
    }
    
    return sort.direction === 'asc' ? comparison : -comparison
  })
}

// Main hook
export function useProducts(initialFilters?: ProductFilters, initialSort?: ProductSort): UseProductsReturn {
  const [allProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Single product state
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [isLoadingProduct, setIsLoadingProduct] = useState(false)
  const [productError, setProductError] = useState<string | null>(null)
  
  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(0)
  
  // Filters and sort
  const [filters, setFilters] = useState<ProductFilters>(initialFilters || DEFAULT_FILTERS)
  const [sort, setSort] = useState<ProductSort>(initialSort || DEFAULT_SORT)
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('')

  // Available categories
  const availableCategories = [...new Set(allProducts.map(p => p.category))]
  
  // Available subcategories by category
  const availableSubcategories = availableCategories.reduce((acc, category) => {
    acc[category] = [...new Set(
      allProducts
        .filter(p => p.category === category && p.subcategory)
        .map(p => p.subcategory as string)
    )]
    return acc
  }, {} as Record<string, string[]>)

  // Price range
  const priceRange = {
    min: Math.min(...allProducts.map(p => p.price)),
    max: Math.max(...allProducts.map(p => p.price))
  }

  // Filter and sort products
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    try {
      // Apply search to filters
      const activeFilters = { ...filters }
      if (searchQuery) {
        activeFilters.search = searchQuery
      }

      // Filter products
      let filtered = filterProducts(allProducts, activeFilters)
      
      // Sort products
      filtered = sortProducts(filtered, sort)
      
      // Update total
      setTotal(filtered.length)
      
      // Apply pagination
      const start = (page - 1) * pageSize
      const paginated = filtered.slice(start, start + pageSize)
      
      setProducts(paginated)
    } catch (err) {
      setError('Failed to filter products')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [allProducts, filters, sort, page, pageSize, searchQuery])

  // Computed values
  const totalPages = Math.ceil(total / pageSize)
  const hasMore = page < totalPages

  // Featured products (top rated, in stock)
  const featuredProducts = allProducts
    .filter(p => p.status === 'active' && p.stock > 0 && p.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  // New arrivals (latest products)
  const newArrivals = [...allProducts]
    .filter(p => p.status === 'active')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6)

  // Best sellers (most reviews)
  const bestSellers = [...allProducts]
    .filter(p => p.status === 'active')
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 6)

  // Related products (based on current product)
  const relatedProducts = currentProduct
    ? allProducts
        .filter(p => 
          p.id !== currentProduct.id && 
          p.status === 'active' &&
          (p.category === currentProduct.category || 
           p.tags?.some(tag => currentProduct.tags?.includes(tag)))
        )
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
    : []

  // Update single filter
  const updateFilter = useCallback(<K extends keyof ProductFilters>(
    key: K, 
    value: ProductFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1) // Reset to first page on filter change
  }, [])

  // Reset filters to default
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearchQuery('')
    setPage(1)
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({})
    setSearchQuery('')
    setPage(1)
  }, [])

  // Pagination actions
  const nextPage = useCallback(() => {
    if (hasMore) {
      setPage(p => p + 1)
    }
  }, [hasMore])

  const prevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1))
  }, [])

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.min(Math.max(1, newPage), totalPages))
  }, [totalPages])

  // Refetch products
  const refetch = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsLoading(false)
  }, [])

  // Fetch more products (infinite scroll)
  const fetchMore = useCallback(async () => {
    if (!hasMore || isFetchingMore) return
    
    setIsFetchingMore(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setPage(p => p + 1)
    setIsFetchingMore(false)
  }, [hasMore, isFetchingMore])

  // Fetch product by ID
  const fetchProductById = useCallback(async (id: string): Promise<Product | null> => {
    setIsLoadingProduct(true)
    setProductError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const product = allProducts.find(p => p.id === id) || null
      setCurrentProduct(product)
      
      if (!product) {
        setProductError('Product not found')
      }
      
      return product
    } catch (err) {
      setProductError('Failed to fetch product')
      return null
    } finally {
      setIsLoadingProduct(false)
    }
  }, [allProducts])

  // Get product by ID (from loaded products)
  const getProductById = useCallback((id: string) => {
    return allProducts.find(p => p.id === id)
  }, [allProducts])

  // Get products by category
  const getProductsByCategory = useCallback((category: string) => {
    return allProducts.filter(p => p.category === category && p.status === 'active')
  }, [allProducts])

  // Get products by tag
  const getProductsByTag = useCallback((tag: string) => {
    return allProducts.filter(p => p.tags?.includes(tag) && p.status === 'active')
  }, [allProducts])

  // Get discounted products
  const getDiscountedProducts = useCallback(() => {
    return allProducts.filter(p => p.originalPrice && p.status === 'active')
  }, [allProducts])

  // Get top rated products
  const getTopRatedProducts = useCallback((limit: number = 10) => {
    return [...allProducts]
      .filter(p => p.status === 'active')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }, [allProducts])

  // Compare products
  const compareProducts = useCallback((productIds: string[]) => {
    return allProducts.filter(p => productIds.includes(p.id))
  }, [allProducts])

  return {
    // Products state
    products,
    featuredProducts,
    newArrivals,
    bestSellers,
    relatedProducts,
    
    // Single product
    currentProduct,
    isLoadingProduct,
    productError,
    
    // Loading states
    isLoading,
    isFetchingMore,
    error,
    
    // Pagination
    page,
    pageSize,
    total,
    totalPages,
    hasMore,
    
    // Filters
    filters,
    availableCategories,
    availableSubcategories,
    priceRange,
    
    // Actions
    setFilters,
    updateFilter,
    resetFilters,
    clearFilters,
    
    // Sorting
    sort,
    setSort,
    
    // Pagination actions
    setPage,
    nextPage,
    prevPage,
    goToPage,
    
    // Data fetching
    refetch,
    fetchMore,
    fetchProductById,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Utilities
    getProductById,
    getProductsByCategory,
    getProductsByTag,
    getDiscountedProducts,
    getTopRatedProducts,
    compareProducts
  }
}

// Hook for single product
export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const found = MOCK_PRODUCTS.find(p => p.id === id)
        if (found) {
          setProduct(found)
        } else {
          setError('Product not found')
        }
      } catch (err) {
        setError('Failed to fetch product')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, isLoading, error }
}

// Hook for related products
export function useRelatedProducts(product: Product | null, limit: number = 4) {
  const [related, setRelated] = useState<Product[]>([])

  useEffect(() => {
    if (!product) {
      setRelated([])
      return
    }

    const relatedProducts = MOCK_PRODUCTS
      .filter(p => 
        p.id !== product.id && 
        p.status === 'active' &&
        (p.category === product.category || 
         p.tags?.some(tag => product.tags?.includes(tag)))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)

    setRelated(relatedProducts)
  }, [product, limit])

  return related
}

// Hook for product categories
export function useCategories() {
  const [categories, setCategories] = useState<string[]>([])
  const [subcategories, setSubcategories] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const cats = [...new Set(MOCK_PRODUCTS.map(p => p.category))]
    setCategories(cats)

    const subs = cats.reduce((acc, category) => {
      acc[category] = [...new Set(
        MOCK_PRODUCTS
          .filter(p => p.category === category && p.subcategory)
          .map(p => p.subcategory as string)
      )]
      return acc
    }, {} as Record<string, string[]>)

    setSubcategories(subs)
  }, [])

  return { categories, subcategories }
}

// Hook for product search (simple version)
export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const searchProducts = async () => {
      if (!query.trim()) {
        setResults([])
        return
      }

      setIsSearching(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const searchLower = query.toLowerCase()
      const filtered = MOCK_PRODUCTS
        .filter(p => p.status === 'active')
        .filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower) ||
          p.tags?.some(tag => tag.toLowerCase().includes(searchLower))
        )
        .slice(0, 10)

      setResults(filtered)
      setIsSearching(false)
    }

    const debounce = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return { query, setQuery, results, isSearching }
}

// Hook for product filtering (simple version)
export function useProductFilter() {
  const [filtered, setFiltered] = useState<Product[]>(MOCK_PRODUCTS)
  const [filters, setFilters] = useState<ProductFilters>({})

  useEffect(() => {
    let filtered = filterProducts(MOCK_PRODUCTS, filters)
    filtered = sortProducts(filtered, { field: 'rating', direction: 'desc' })
    setFiltered(filtered)
  }, [filters])

  return { filtered, filters, setFilters }
}
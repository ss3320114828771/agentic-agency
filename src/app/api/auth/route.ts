import { NextResponse } from 'next/server'

// Simple user type
interface User {
  id: string
  email: string
  name: string
  password: string
  role: 'user' | 'admin'
}

// Mock users database (in real app, this would be a real database)
const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Test User',
    password: 'user123',
    role: 'user'
  },
  {
    id: '3',
    email: 'sajid.syed@example.com',
    name: 'Hafiz Sajid Syed',
    password: 'admin123',
    role: 'admin'
  }
]

// POST /api/auth - Login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    // Handle different auth actions
    switch(action) {
      case 'login':
        return handleLogin(email, password)
      
      case 'register':
        return handleRegister(body)
      
      case 'logout':
        return handleLogout()
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/auth - Check session / get current user
export async function GET(request: Request) {
  try {
    // Get token from header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Simple token validation (in real app, verify JWT)
    const user = validateToken(token)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ 
      user: userWithoutPassword,
      authenticated: true 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/auth - Update profile
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { userId, name, email } = body

    // Find user
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user (in real app, update database)
    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email

    // Return updated user without password
    const { password: _, ...userWithoutPassword } = users[userIndex]
    return NextResponse.json({ 
      success: true,
      user: userWithoutPassword 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/auth - Delete account
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    // In real app, delete from database
    return NextResponse.json({ 
      success: true,
      message: 'Account deleted successfully' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper: Handle login
function handleLogin(email: string, password: string) {
  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password required' },
      { status: 400 }
    )
  }

  // Find user
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    )
  }

  // Generate simple token (in real app, use JWT)
  const token = generateToken(user)

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return NextResponse.json({ 
    success: true,
    user: userWithoutPassword,
    token: token,
    message: 'Login successful'
  })
}

// Helper: Handle register
function handleRegister(data: any) {
  const { email, password, name } = data

  // Validate input
  if (!email || !password || !name) {
    return NextResponse.json(
      { error: 'All fields required' },
      { status: 400 }
    )
  }

  // Check if user exists
  if (users.find(u => u.email === email)) {
    return NextResponse.json(
      { error: 'User already exists' },
      { status: 409 }
    )
  }

  // Create new user (in real app, save to database)
  const newUser: User = {
    id: String(users.length + 1),
    email,
    name,
    password, // In real app, hash password
    role: 'user'
  }

  // Add to mock database
  users.push(newUser)

  // Generate token
  const token = generateToken(newUser)

  // Return new user without password
  const { password: _, ...userWithoutPassword } = newUser
  return NextResponse.json({ 
    success: true,
    user: userWithoutPassword,
    token: token,
    message: 'Registration successful'
  }, { status: 201 })
}

// Helper: Handle logout
function handleLogout() {
  return NextResponse.json({ 
    success: true,
    message: 'Logout successful' 
  })
}

// Helper: Generate simple token (for demo only)
function generateToken(user: User) {
  // In real app, use proper JWT
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  }
  
  // Simple base64 encoding (for demo only - DO NOT USE IN PRODUCTION)
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

// Helper: Validate token (for demo only)
function validateToken(token: string): User | null {
  try {
    // Simple base64 decoding (for demo only)
    const payload = JSON.parse(Buffer.from(token, 'base64').toString())
    
    // Check expiry
    if (payload.exp < Date.now()) {
      return null
    }

    // Find user
    const user = users.find(u => u.id === payload.id)
    return user || null
  } catch {
    return null
  }
}
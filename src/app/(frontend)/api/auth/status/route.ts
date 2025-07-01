import { NextResponse } from 'next/server'
import { serverAuth } from '@/lib/auth-server'

export async function GET() {
  try {
    const authState = await serverAuth.getAuthState()
    const isValid = await serverAuth.validateSession()

    return NextResponse.json({
      success: true,
      user: authState.user,
      isAuthenticated: authState.isAuthenticated && isValid,
      sessionValid: isValid,
    })
  } catch (error) {
    console.error('Error checking auth status:', error)
    return NextResponse.json(
      {
        success: false,
        user: null,
        isAuthenticated: false,
        sessionValid: false,
        error: 'Failed to check authentication status',
      },
      { status: 500 },
    )
  }
}

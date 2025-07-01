import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Clear the HTTP-only authentication token cookie
    cookieStore.delete('auth-token')

    // Clear the user data cookie
    cookieStore.delete('auth-user')

    // Also set expired cookies as a fallback to ensure they're cleared
    cookieStore.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    })

    cookieStore.set('auth-user', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    })

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully!',
    })
  } catch (error) {
    console.error('Error during logout:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Logout failed. Please try again.',
      },
      { status: 500 },
    )
  }
}

// GET route that logs out and redirects to home
export async function GET() {
  try {
    const cookieStore = await cookies()

    // Clear authentication cookies
    cookieStore.delete('auth-token')
    cookieStore.delete('auth-user')

    // Set expired cookies as fallback
    cookieStore.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    })

    cookieStore.set('auth-user', '', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    })

    // Redirect to home page after logout
    return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  } catch (error) {
    console.error('Error during logout redirect:', error)
    // Even if there's an error, redirect to home
    return NextResponse.redirect(new URL('/', process.env.NEXTAUTH_URL || 'http://localhost:3000'))
  }
}

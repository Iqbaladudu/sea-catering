'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function logoutAction() {
  try {
    const cookieStore = await cookies()

    // Clear the HTTP-only authentication token cookie
    cookieStore.delete('auth-token')

    // Clear the user data cookie
    cookieStore.delete('auth-user')

    // Also set expired cookies as a fallback
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

    return {
      success: true,
      message: 'Logged out successfully!',
    }
  } catch (error) {
    console.error('Error during logout:', error)
    return {
      success: false,
      error: 'Logout failed. Please try again.',
    }
  }
}

// Server action that logs out and redirects
export async function logoutAndRedirect() {
  await logoutAction()
  redirect('/')
}

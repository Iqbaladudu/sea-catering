'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { loginSchema, type LoginFormData, getValidationError } from '@/lib/validations'
import { cookies } from 'next/headers'

const payload = await getPayload({ config })

export default async function loginAction(data: LoginFormData) {
  try {
    // Validate the input data
    const parsed = loginSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        error: getValidationError(parsed.error),
      }
    }

    // Attempt to login the customer
    const result = await payload.login({
      collection: 'customers',
      data: {
        email: data.email,
        password: data.password,
      },
    })

    if (result.user && result.token) {
      const cookieStore = await cookies()

      // Set HTTP-only cookie with the authentication token
      cookieStore.set('auth-token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      // Set user data in a separate cookie for client-side access
      const userData = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      }

      cookieStore.set('auth-user', JSON.stringify(userData), {
        httpOnly: false, // Allow client-side access for user data
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return {
        success: true,
        customer: userData,
        message: 'Login successful!',
      }
    } else {
      return {
        success: false,
        error: 'Invalid email or password',
      }
    }
  } catch (error) {
    console.error('Error during login:', error)

    // Check if it's an authentication error
    if (error instanceof Error && error.message.includes('Invalid')) {
      return {
        success: false,
        error: 'Invalid email or password',
      }
    }

    return {
      success: false,
      error: 'Login failed. Please try again.',
    }
  }
}

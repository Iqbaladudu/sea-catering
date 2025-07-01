'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { loginSchema, type LoginFormData, getValidationError } from '@/lib/validations'

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

    if (result.user) {
      // Serialize the customer to ensure it's a plain object
      const serializedCustomer = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        createdAt: result.user.createdAt,
        updatedAt: result.user.updatedAt,
      }

      return {
        success: true,
        customer: serializedCustomer,
        token: result.token,
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

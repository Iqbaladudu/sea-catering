'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { registerSchema, type RegisterFormData, getValidationError } from '@/lib/validations'

const payload = await getPayload({ config })

export default async function registerAction(data: RegisterFormData) {
  try {
    console.log('Starting registration process...')

    // Validate the input data
    const parsed = registerSchema.safeParse(data)
    if (!parsed.success) {
      console.log('Validation failed:', parsed.error)
      return {
        success: false,
        error: getValidationError(parsed.error),
      }
    }

    console.log('Validation passed, checking for existing email...')

    // Check if email already exists
    const existingCustomer = await payload.find({
      collection: 'customers',
      where: {
        email: {
          equals: data.email,
        },
      },
      limit: 1,
    })

    if (existingCustomer.docs.length > 0) {
      console.log('Email already exists:', data.email)
      return {
        success: false,
        error: 'An account with this email already exists',
      }
    }

    console.log('Email is unique, creating customer...')

    // Create the customer using Payload's auth collection
    const customer = await payload.create({
      collection: 'customers',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })

    console.log('Customer created successfully with ID:', customer.id)

    // Serialize the customer to ensure it's a plain object
    const serializedCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    }

    return {
      success: true,
      customer: serializedCustomer,
      message: 'Account created successfully!',
    }
  } catch (error) {
    console.error('Error creating customer account:', error)

    // Handle specific database constraint errors
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()

      if (
        errorMessage.includes('duplicate key') ||
        errorMessage.includes('unique constraint') ||
        errorMessage.includes('email')
      ) {
        console.log('Duplicate email error detected')
        return {
          success: false,
          error: 'An account with this email already exists',
        }
      }

      if (errorMessage.includes('password') && errorMessage.includes('null')) {
        console.log('Password null constraint error detected')
        return {
          success: false,
          error: 'Password is required and cannot be empty',
        }
      }

      if (errorMessage.includes('not-null constraint')) {
        console.log('Not-null constraint error detected:', error.message)
        return {
          success: false,
          error: 'All required fields must be provided',
        }
      }
    }

    return {
      success: false,
      error: 'Failed to create account. Please try again.',
    }
  }
}

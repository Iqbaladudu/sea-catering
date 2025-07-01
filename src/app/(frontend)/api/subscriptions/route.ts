import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { serverAuth } from '@/lib/auth-server'

// Skip database connection during build time
const isBuilding = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URI

export async function GET(_request: NextRequest) {
  // Return mock data during build time
  if (isBuilding) {
    return NextResponse.json({
      success: true,
      data: [],
    })
  }

  try {
    // Check authentication
    const authState = await serverAuth.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      )
    }

    const payload = await getPayload({ config })

    // Fetch user's subscriptions
    const subscriptions = await payload.find({
      collection: 'subscriptions',
      where: {
        customer: {
          equals: authState.user.id,
        },
      },
      sort: '-createdAt',
    })

    return NextResponse.json({
      success: true,
      data: subscriptions.docs,
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscriptions' },
      { status: 500 },
    )
  }
}

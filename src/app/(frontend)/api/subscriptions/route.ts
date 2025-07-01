import { getPayload } from 'payload'
import config from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { serverAuth } from '@/lib/auth-server'

const payload = await getPayload({ config })

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authState = await serverAuth.getAuthState()
    if (!authState.isAuthenticated || !authState.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 },
      )
    }

    // Get subscriptions for the authenticated user
    const subscriptions = await payload.find({
      collection: 'subscriptions',
      where: {
        customer: {
          equals: authState.user.id,
        },
      },
      depth: 2, // To populate the plan relationship
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

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

// Skip database connection during build time
const isBuilding = process.env.NODE_ENV === 'production' && !process.env.DATABASE_URI

export async function GET() {
  // Return mock data during build time
  if (isBuilding) {
    return NextResponse.json(
      {
        data: [],
      },
      { status: 200 },
    )
  }

  try {
    const payload = await getPayload({ config })
    const menu = await payload.find({
      collection: 'meal-plans',
    })

    return NextResponse.json(
      {
        data: menu.docs,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    return NextResponse.json(
      {
        data: [],
        error: 'Failed to fetch meal plans',
      },
      { status: 500 },
    )
  }
}

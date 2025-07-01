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
    const mealPlans = await payload.find({
      collection: 'meal-plans',
      limit: 3,
    })

    return NextResponse.json(
      {
        data: mealPlans.docs,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching meal plans:', error)
    return NextResponse.json({ error: 'Failed to fetch meal plans' }, { status: 500 })
  }
}

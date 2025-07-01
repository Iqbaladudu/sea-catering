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
    const testimonials = await payload.find({
      collection: 'testimonials',
    })

    return NextResponse.json(
      {
        data: testimonials.docs,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      {
        data: [],
        error: 'Failed to fetch testimonials',
      },
      { status: 500 },
    )
  }
}

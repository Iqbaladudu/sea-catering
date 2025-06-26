import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const payload = await getPayload({ config })

export async function GET() {
  try {
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

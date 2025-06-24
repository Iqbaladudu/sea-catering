import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const payload = await getPayload({ config })

export async function GET() {
  const menu = await payload.find({
    collection: 'meal-plans',
  })

  return NextResponse.json(
    {
      data: menu.docs,
    },
    { status: 200 },
  )
}

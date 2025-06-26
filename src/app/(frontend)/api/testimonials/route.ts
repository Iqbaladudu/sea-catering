import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const payload = await getPayload({ config })

export async function GET() {
  const testimonials = await payload.find({
    collection: 'testimonials',
  })

  return NextResponse.json(
    {
      data: testimonials.docs,
    },
    { status: 200 },
  )
}

'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { testimonialFormSchema } from '@/lib/schemas'
import { z } from 'zod'

const payload = await getPayload({ config })

export default async function submitTestimonialAction(data: z.infer<typeof testimonialFormSchema>) {
  try {
    const testimonial = await payload.create({
      collection: 'testimonials',
      data: {
        name: data.name,
        message: data.message,
        rating: data.rating,
      },
    })

    return NextResponse.json({ success: true, testimonial }, { status: 200 })
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit testimonial' },
      { status: 500 },
    )
  }
}

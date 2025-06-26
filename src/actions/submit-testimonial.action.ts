'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { testimonialFormSchema } from '@/lib/schemas'
import { z } from 'zod'

const payload = await getPayload({ config })

export default async function submitTestimonialAction(data: z.infer<typeof testimonialFormSchema>) {
  try {
    const parsed = testimonialFormSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      }
    }

    const testimonial = await payload.create({
      collection: 'testimonials',
      data: {
        name: data.name,
        message: data.message,
        rating: data.rating,
      },
    })

    // Serialize the testimonial to ensure it's a plain object
    const serializedTestimonial = {
      id: testimonial.id,
      name: testimonial.name,
      message: testimonial.message,
      rating: testimonial.rating,
      createdAt: testimonial.createdAt,
      updatedAt: testimonial.updatedAt,
    }

    return { success: true, testimonial: serializedTestimonial }
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return {
      success: false,
      error: 'Failed to submit testimonial',
    }
  }
}

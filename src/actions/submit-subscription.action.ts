'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

import { z } from 'zod'
import { subscriptionFormSchema } from '@/lib/schemas'

const payload = await getPayload({ config })

export default async function submitSubscriptionAction(
  data: z.infer<typeof subscriptionFormSchema>,
) {
  try {
    const parsed = subscriptionFormSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      }
    }

    console.log('Parsed subscription data:', parsed.data, data)

    const subscription = await payload.create({
      collection: 'subscriptions',
      data: {
        name: data.name,
        phone: data.phone,
        plan: parseInt(data.plan, 10),
        mealTypes: data.mealTypes,
        deliverDays: data.deliverDays,
        allergies: data.allergies,
      },
    })

    // Serialize the subscription to ensure it's a plain object
    const serializedSubscription = {
      id: subscription.id,
      name: subscription.name,
      phone: subscription.phone,
      plan: subscription.plan,
      mealTypes: subscription.mealTypes,
      deliverDays: subscription.deliverDays,
      allergies: subscription.allergies,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    }

    return { success: true, subscription: serializedSubscription }
  } catch (error) {
    console.error('Error submitting subscription:', error)
    return {
      success: false,
      error: 'Failed to submit subscription',
    }
  }
}

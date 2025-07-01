'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { updateSubscriptionStatusSchema } from '@/lib/schemas'
import { z } from 'zod'

const payload = await getPayload({ config })

export default async function updateSubscriptionStatusAction(
  data: z.infer<typeof updateSubscriptionStatusSchema>,
) {
  try {
    const parsed = updateSubscriptionStatusSchema.safeParse(data)
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.errors.map((e) => e.message).join(', '),
      }
    }

    console.log('Updating subscription status:', parsed.data)

    const subscription = await payload.update({
      collection: 'subscriptions',
      id: data.id,
      data: {
        status: data.status,
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
      status: subscription.status,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    }

    return { success: true, subscription: serializedSubscription }
  } catch (error) {
    console.error('Error updating subscription status:', error)
    return {
      success: false,
      error: 'Failed to update subscription status',
    }
  }
}

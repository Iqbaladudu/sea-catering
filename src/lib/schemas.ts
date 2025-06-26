import { z } from 'zod'

export const testimonialFormSchema = z.object({
  name: z.string().min(1).max(100),
  message: z.string(),
  rating: z.number().min(1),
})

export const subscriptionFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  plan: z.string().min(1, 'Plan is required'),
  mealTypes: z
    .array(z.enum(['breakfast', 'lunch', 'dinner']))
    .min(1, 'Select at least one meal type'),
  deliverDays: z
    .array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']))
    .min(1, 'Select at least one delivery day'),
  allergies: z.string().optional().nullable(),
})

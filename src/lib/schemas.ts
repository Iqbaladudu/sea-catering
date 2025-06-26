import { z } from 'zod'

export const testimonialFormSchema = z.object({
  name: z.string().min(1).max(100),
  message: z.string(),
  rating: z.number().min(1),
})

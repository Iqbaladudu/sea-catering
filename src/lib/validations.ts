import { z } from 'zod'

// Common validation patterns
export const emailSchema = z.string().email('Invalid email address')
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must include uppercase, lowercase, number, and special character'
  )
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100)

// Authentication schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const registerFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// User profile schemas
export const updateProfileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Subscription schemas
export const subscriptionSchema = z.object({
  name: nameSchema,
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

// Testimonial schemas
export const testimonialSchema = z.object({
  name: nameSchema,
  message: z.string().min(1, 'Message is required'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
})

// Contact form schema
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
})

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

// Reset password schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Reset token is required'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type RegisterFormWithConfirmData = z.infer<typeof registerFormSchema>
export type UpdateProfileData = z.infer<typeof updateProfileSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
export type SubscriptionFormData = z.infer<typeof subscriptionSchema>
export type TestimonialFormData = z.infer<typeof testimonialSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>

// Validation utilities
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success
}

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success
}

export const validateName = (name: string): boolean => {
  return nameSchema.safeParse(name).success
}

// Error message extractors
export const getValidationError = (error: z.ZodError): string => {
  return error.errors.map((e) => e.message).join(', ')
}

export const getFieldError = (error: z.ZodError, field: string): string | undefined => {
  const fieldError = error.errors.find((e) => e.path.includes(field))
  return fieldError?.message
}

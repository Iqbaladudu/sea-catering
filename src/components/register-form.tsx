'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Mail, Lock, User, UserPlus } from 'lucide-react'
import { useState } from 'react'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)
    ) {
      newErrors.password =
        'Password must include uppercase, lowercase, number, and special character'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful registration here
      console.log('Registration successful:', formData)

      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        <Card className="bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

          <CardHeader className="relative pb-3 pt-6 text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="mb-3 mx-auto w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <UserPlus className="w-7 h-7 text-emerald-600" />
            </motion.div>
            <CardTitle className="text-lg font-bold text-gray-900 transition-colors duration-300">
              Create your account
            </CardTitle>
            <CardDescription className="text-gray-600 text-center leading-relaxed">
              Join SEA Catering and start your healthy eating journey
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-3 px-6 pb-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="name"
                      className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-emerald-600" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={cn(
                        'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg text-sm min-h-[40px]',
                        errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                      )}
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={cn(
                        'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm min-h-[40px]',
                        errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                      )}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  </div>
                </div>

                {/* Password and Confirm Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-purple-600" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={cn(
                        'bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg text-sm min-h-[40px]',
                        errors.password &&
                          'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                      )}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-orange-600" />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      className={cn(
                        'bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg text-sm min-h-[40px]',
                        errors.confirmPassword &&
                          'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                      )}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Password Requirements */}
                <p className="text-xs text-gray-500 -mt-2">
                  Password must include uppercase, lowercase, number, and special character
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-sm min-h-[40px] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Terms and Login Link */}
                <div className="text-center space-y-2">
                  <div className="text-xs text-gray-500">
                    By creating an account, you agree to our{' '}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium transition-colors duration-200"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 font-medium transition-colors duration-200"
                    >
                      Privacy Policy
                    </a>
                  </div>

                  <div className="text-sm">
                    <span className="text-gray-600">Already have an account?</span>{' '}
                    <a
                      href="/masuk"
                      className="text-emerald-600 hover:text-emerald-700 underline underline-offset-4 font-medium transition-colors duration-200"
                    >
                      Sign in
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

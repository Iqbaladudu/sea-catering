'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Mail, Lock, User, UserPlus, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import registerAction from '@/actions/register.action'
import {
  registerFormSchema,
  type RegisterFormData,
  type RegisterFormWithConfirmData,
} from '@/lib/validations'

type FormData = RegisterFormWithConfirmData

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerAction,
    onSuccess: (result) => {
      if (result.success) {
        setIsSuccess(true)
        form.reset()
        toast.success(result.message || 'Account created successfully!')
        console.log('Registration successful:', result.customer)

        // Clear any previous errors
        form.clearErrors()
      } else {
        toast.error(result.error || 'Failed to create account')
        console.error('Registration error:', result.error)

        // If it's an email already exists error, focus on email field
        if (result.error?.includes('email already exists')) {
          form.setFocus('email')
          form.setError('email', {
            type: 'manual',
            message: 'An account with this email already exists',
          })
        }
      }
    },
    onError: (error) => {
      toast.error('An unexpected error occurred. Please try again.')
      console.error('Registration failed:', error)
    },
  })

  const onSubmit = (data: FormData) => {
    // Extract only the fields needed for the register action
    const { confirmPassword: _, ...registerData }: { confirmPassword: string } & RegisterFormData =
      data

    console.log('Form data received:', {
      name: data.name,
      email: data.email,
      password: data.password ? '[REDACTED]' : 'undefined',
      confirmPassword: data.confirmPassword ? '[REDACTED]' : 'undefined',
    })
    console.log('Submitting registration data:', {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password ? '[REDACTED]' : 'undefined',
    })

    // Validate that password is not empty before sending
    if (!registerData.password || registerData.password.trim() === '') {
      console.error('Password is empty or undefined')
      toast.error('Password is required')
      return
    }

    registerMutation.mutate(registerData)
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
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome to SEA Catering!
                </h3>
                <p className="text-gray-600 mb-4">
                  Your account has been created successfully. You can now sign in to start your
                  healthy eating journey with our delicious and healthy meal plans.
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  >
                    <Link href="/masuk">Sign In Now</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                  >
                    <Link href="/">Explore Meal Plans</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        type="text"
                        placeholder="Enter your full name"
                        {...form.register('name')}
                        disabled={registerMutation.isPending}
                        className={cn(
                          'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-lg text-sm min-h-[40px]',
                          form.formState.errors.name &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        )}
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                      )}
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
                        type="email"
                        placeholder="m@example.com"
                        {...form.register('email')}
                        disabled={registerMutation.isPending}
                        className={cn(
                          'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-sm min-h-[40px]',
                          form.formState.errors.email &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        )}
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.email.message}
                        </p>
                      )}
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
                        type="password"
                        placeholder="Create a strong password"
                        {...form.register('password')}
                        disabled={registerMutation.isPending}
                        className={cn(
                          'bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg text-sm min-h-[40px]',
                          form.formState.errors.password &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        )}
                      />
                      {form.formState.errors.password && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.password.message}
                        </p>
                      )}
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
                        type="password"
                        placeholder="Confirm your password"
                        {...form.register('confirmPassword')}
                        disabled={registerMutation.isPending}
                        className={cn(
                          'bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg text-sm min-h-[40px]',
                          form.formState.errors.confirmPassword &&
                            'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                        )}
                      />
                      {form.formState.errors.confirmPassword && (
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="text-xs text-gray-500 -mt-2">
                    <p>Password requirements:</p>
                    <ul className="list-disc list-inside ml-2 mt-1 space-y-0.5">
                      <li>At least 8 characters long</li>
                      <li>One uppercase letter (A-Z)</li>
                      <li>One lowercase letter (a-z)</li>
                      <li>One number (0-9)</li>
                      <li>One special character (@$!%*?&)</li>
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending || !form.formState.isValid}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-sm min-h-[40px] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {registerMutation.isPending ? (
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
                        Sign in here
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

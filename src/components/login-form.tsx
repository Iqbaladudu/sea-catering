'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { Mail, Lock, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import loginAction from '@/actions/login.action'
import { loginUser, redirectToHome } from '@/lib/auth'
import { loginSchema, type LoginFormData } from '@/lib/validations'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || 'Login successful!')
        form.reset()
        console.log('Login successful:', result.customer)

        // Store authentication data using auth utilities
        if (result.customer && result.token) {
          loginUser(result.customer, result.token)
        }

        // Clear any previous errors
        form.clearErrors()

        // Redirect to home page
        setTimeout(() => {
          // redirectToHome()
        }, 1000) // Small delay to show success message
      } else {
        toast.error(result.error || 'Login failed')
        console.error('Login error:', result.error)

        // If it's an invalid credentials error, focus on email field
        if (result.error?.includes('Invalid email or password')) {
          form.setFocus('email')
          form.setError('email', {
            type: 'manual',
            message: 'Invalid email or password',
          })
        }
      }
    },
    onError: (error) => {
      console.error('Login failed:', error)
      toast.error('An unexpected error occurred. Please try again.')
    },
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
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

          <CardHeader className="relative pb-4 pt-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <User className="w-8 h-8 text-emerald-600" />
            </motion.div>
            <CardTitle className="text-xl font-bold text-gray-900 transition-colors duration-300">
              Login to your account
            </CardTitle>
            <CardDescription className="text-gray-600 text-center leading-relaxed">
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-4 px-6 pb-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label
                    htmlFor="email"
                    className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-emerald-600" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...form.register('email')}
                    disabled={loginMutation.isPending}
                    className={cn(
                      'bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl text-base min-h-[44px]',
                      form.formState.errors.email &&
                        'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    )}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label
                      htmlFor="password"
                      className="text-gray-900 font-semibold text-sm flex items-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-blue-600" />
                      Password
                    </Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm text-emerald-600 hover:text-emerald-700 underline-offset-4 hover:underline transition-colors duration-200"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...form.register('password')}
                    disabled={loginMutation.isPending}
                    className={cn(
                      'bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-base min-h-[44px]',
                      form.formState.errors.password &&
                        'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                    )}
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending || !form.formState.isValid}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-base min-h-[44px] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loginMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing In...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Don&apos;t have an account?</span>{' '}
                <a
                  href="/daftar"
                  className="text-emerald-600 hover:text-emerald-700 underline underline-offset-4 font-medium transition-colors duration-200"
                >
                  Sign up
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

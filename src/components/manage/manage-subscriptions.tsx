'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Clock,
  Utensils,
  Phone,
  Play,
  Pause,
  X,
  Edit,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import updateSubscriptionStatusAction from '@/actions/update-subscription-status.action'
import { MealPlan } from '@/payload-types'

interface AuthenticatedUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface Subscription {
  id: number
  customer: number | AuthenticatedUser
  name: string
  phone: string
  plan: number | MealPlan
  mealTypes: ('breakfast' | 'lunch' | 'dinner')[]
  deliverDays: (
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  )[]
  allergies?: string | null
  status: 'active' | 'paused' | 'canceled'
  createdAt: string
  updatedAt: string
}

interface ManageSubscriptionsProps {
  user: AuthenticatedUser
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'paused':
      return <Pause className="w-4 h-4 text-yellow-500" />
    case 'canceled':
      return <X className="w-4 h-4 text-red-500" />
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'paused':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'canceled':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const formatDays = (days: string[]) => {
  const dayMap: { [key: string]: string } = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  }
  return days.map((day) => dayMap[day] || day).join(', ')
}

const formatMealTypes = (types: string[]) => {
  return types.map((type) => type.charAt(0).toUpperCase() + type.slice(1)).join(', ')
}

export const ManageSubscriptions: React.FC<ManageSubscriptionsProps> = ({ user }) => {
  const queryClient = useQueryClient()

  const subscriptionsQuery = useQuery({
    queryKey: ['subscriptions', user.id],
    queryFn: async () => {
      const res = await fetch('/api/subscriptions')
      if (!res.ok) throw new Error('Failed to fetch subscriptions')
      const data = await res.json()
      return data.data as Subscription[]
    },
    refetchOnWindowFocus: false,
  })

  const updateStatusMutation = useMutation({
    mutationFn: updateSubscriptionStatusAction,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['subscriptions', user.id] })
        toast.success('Subscription status updated successfully!')
      } else {
        toast.error(result.error || 'Failed to update subscription status')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update subscription status')
    },
  })

  const handleStatusChange = (
    subscriptionId: number,
    newStatus: 'active' | 'paused' | 'canceled',
  ) => {
    const statusMessages = {
      active: 'activate',
      paused: 'pause',
      canceled: 'cancel',
    }

    const action = statusMessages[newStatus]

    if (window.confirm(`Are you sure you want to ${action} this subscription?`)) {
      updateStatusMutation.mutate({ id: subscriptionId, status: newStatus })
    }
  }

  if (subscriptionsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
          <span className="text-gray-600">Loading your subscriptions...</span>
        </div>
      </div>
    )
  }

  if (subscriptionsQuery.isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load subscriptions</h3>
        <p className="text-gray-600 text-center mb-4">
          There was an error loading your subscriptions. Please try again.
        </p>
        <Button
          onClick={() => subscriptionsQuery.refetch()}
          variant="outline"
          className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
        >
          Try Again
        </Button>
      </div>
    )
  }

  const subscriptions = subscriptionsQuery.data || []

  if (subscriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <Utensils className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscriptions found</h3>
        <p className="text-gray-600 text-center mb-4">
          You haven&apos;t created any meal subscriptions yet. Start your healthy eating journey
          today!
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
        >
          <a href="/subscription">Create Subscription</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {subscriptions.map((subscription, index) => {
          const plan = typeof subscription.plan === 'object' ? subscription.plan : null

          return (
            <motion.div
              key={subscription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl border-0 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {getStatusIcon(subscription.status)}
                      {plan?.name || 'Unknown Plan'}
                    </CardTitle>
                    <Badge className={`${getStatusColor(subscription.status)} border font-medium`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Plan Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Phone:</span>
                        <span>{subscription.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Utensils className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Meals:</span>
                        <span>{formatMealTypes(subscription.mealTypes)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">Days:</span>
                        <span>{formatDays(subscription.deliverDays)}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {plan && (
                        <div className="flex items-center gap-2 text-gray-700">
                          <span className="font-medium">Price:</span>
                          <span className="text-emerald-600 font-bold">
                            Rp{plan.price.toLocaleString('id-ID')} / meal
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">Created:</span>
                        <span>{new Date(subscription.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>

                      {subscription.allergies && (
                        <div className="flex items-start gap-2 text-gray-700">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">Allergies:</span>
                            <p className="text-sm text-gray-600">{subscription.allergies}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                    {subscription.status === 'active' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(subscription.id, 'paused')}
                        disabled={updateStatusMutation.isPending}
                        className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-400"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    )}

                    {subscription.status === 'paused' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(subscription.id, 'active')}
                        disabled={updateStatusMutation.isPending}
                        className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    )}

                    {subscription.status !== 'canceled' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(subscription.id, 'canceled')}
                        disabled={updateStatusMutation.isPending}
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    )}

                    {subscription.status === 'canceled' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(subscription.id, 'active')}
                        disabled={updateStatusMutation.isPending}
                        className="border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Reactivate
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="border-gray-300 text-gray-500"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit (Coming Soon)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Create New Subscription Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: subscriptions.length * 0.1 + 0.2 }}
        className="text-center pt-6"
      >
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <a href="/subscription">
            <Utensils className="w-5 h-5 mr-2" />
            Create New Subscription
          </a>
        </Button>
      </motion.div>
    </div>
  )
}

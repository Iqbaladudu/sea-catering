import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'
import submitSubscriptionAction from '@/actions/submit-subscription.action'
import { subscriptionFormSchema } from '@/lib/schemas'

export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>

interface UseSubscriptionFormProps {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export const useSubscriptionForm = (user?: UseSubscriptionFormProps | null) => {
  const [submitted, setSubmitted] = useState(false)

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      name: user?.name || '',
      phone: '',
      plan: '0',
      mealTypes: [],
      deliverDays: [],
      allergies: '',
      customer: user?.id,
    },
  })

  const mutation = useMutation({
    mutationFn: submitSubscriptionAction,
    onSuccess: (data) => {
      if (data.success) {
        setSubmitted(true)
        form.reset()
        toast.success('Subscription submitted successfully!')
      } else {
        toast.error(data.error || 'Failed to submit subscription')
      }
    },
    onError: (err: Error) => {
      toast.error(err?.message || 'Failed to submit subscription')
    },
  })

  const onSubmit = (values: SubscriptionFormValues) => {
    console.log('Submitting subscription form:', values)
    // Ensure customer ID is included
    const submissionData = {
      ...values,
      customer: user?.id,
    }
    mutation.mutate(submissionData)
  }

  return {
    form,
    submitted,
    mutation,
    onSubmit,
    isSubmitting: mutation.isPending,
  }
}

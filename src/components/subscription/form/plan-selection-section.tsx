import React from 'react'
import { CreditCard, AlertCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { MealPlan } from '@/payload-types'
import { cn } from '@/lib/utils'
import { SubscriptionFormValues } from '@/hooks'

interface PlanSelectionSectionProps {
  form: UseFormReturn<SubscriptionFormValues>
  mealPlans: MealPlan[] | undefined
  mealPlansLoading: boolean
  mealPlansError: Error | null
  isSubmitting: boolean
}

export const PlanSelectionSection: React.FC<PlanSelectionSectionProps> = ({
  form,
  mealPlans,
  mealPlansLoading,
  mealPlansError,
  isSubmitting,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <CreditCard className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Plan Selection</h3>
        <span className="text-red-500">*</span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mealPlansLoading && <div className="text-gray-500 text-center py-4">Loading plans...</div>}
        {mealPlansError && (
          <div className="text-red-500 text-center py-4 flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Failed to load meal plans.
          </div>
        )}
        {mealPlans?.map((plan) => (
          <label
            key={plan.id}
            className={cn(
              'group relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
              form.watch('plan') === String(plan.id)
                ? 'border-primary bg-primary/5 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50',
            )}
          >
            <input
              type="radio"
              {...form.register('plan')}
              value={plan.id}
              checked={form.watch('plan') === String(plan.id)}
              disabled={isSubmitting}
              className="mt-1 w-5 h-5 text-primary border-2 border-gray-300 focus:ring-primary focus:ring-offset-0"
              required
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg text-gray-900">{plan.name}</span>
                {plan.popular && (
                  <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ Popular
                  </span>
                )}
                <span className="font-bold text-primary text-lg ml-auto">
                  Rp{plan.price.toLocaleString('id-ID')}{' '}
                  <span className="text-sm font-normal text-gray-500">/ meal</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{plan.description}</p>
            </div>
          </label>
        ))}
      </div>
      {form.formState.errors.plan && (
        <div className="text-red-500 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {form.formState.errors.plan.message}
        </div>
      )}
    </div>
  )
}

export default PlanSelectionSection

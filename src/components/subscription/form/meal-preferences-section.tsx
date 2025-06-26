import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Utensils, AlertCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { SubscriptionFormValues } from '@/hooks'

interface MealPreferencesSectionProps {
  form: UseFormReturn<SubscriptionFormValues>
  isSubmitting: boolean
}

const MEAL_TYPES = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
] as const

export const MealPreferencesSection: React.FC<MealPreferencesSectionProps> = ({
  form,
  isSubmitting,
}) => {
  const handleMealTypeChange = (mealValue: string) => {
    const current = form.getValues('mealTypes')
    if (current.includes(mealValue as any)) {
      form.setValue(
        'mealTypes',
        current.filter((v: string) => v !== mealValue),
      )
    } else {
      form.setValue('mealTypes', [...current, mealValue as any])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Utensils className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Meal Preferences</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="font-medium text-gray-700 flex items-center gap-2">
            Meal Types <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {MEAL_TYPES.map((meal) => (
              <label
                key={meal.value}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 min-h-[48px]',
                  form.watch('mealTypes').includes(meal.value)
                    ? 'border-primary bg-primary/5 text-primary font-medium'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                )}
              >
                <Checkbox
                  checked={form.watch('mealTypes').includes(meal.value)}
                  onCheckedChange={() => handleMealTypeChange(meal.value)}
                  disabled={isSubmitting}
                  aria-label={meal.label}
                  className="w-5 h-5"
                />
                <span className="font-medium">{meal.label}</span>
              </label>
            ))}
          </div>
          {form.formState.errors.mealTypes && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {form.formState.errors.mealTypes.message as string}
            </div>
          )}
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Select at least one meal type. You can choose multiple options.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealPreferencesSection

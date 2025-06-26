import React from 'react'
import { Input } from '@/components/ui/input'
import { AlertCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { SubscriptionFormValues } from '@/hooks'

interface AdditionalInfoSectionProps {
  form: UseFormReturn<SubscriptionFormValues>
  isSubmitting: boolean
}

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  form,
  isSubmitting,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <AlertCircle className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
      </div>

      <div className="space-y-2">
        <label className="font-medium text-gray-700">Allergies / Dietary Restrictions</label>
        <Input
          {...form.register('allergies')}
          type="text"
          placeholder="e.g. peanuts, gluten, seafood (optional)"
          disabled={isSubmitting}
          className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary/20 rounded-lg"
        />
        <p className="text-sm text-gray-500">
          Help us customize your meals by listing any allergies or dietary restrictions.
        </p>
      </div>
    </div>
  )
}

export default AdditionalInfoSection

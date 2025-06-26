'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  useSubscriptionForm,
  useMealPlans,
  usePriceCalculation,
  type SubscriptionFormValues,
} from '../../../hooks'
import FormHeader from './form-header'
import SuccessState from './success-state'
import PersonalInfoSection from './personal-info-section'
import PlanSelectionSection from './plan-selection-section'
import MealPreferencesSection from './meal-preferences-section'
import DeliveryScheduleSection from './delivery-schedule-section'
import AdditionalInfoSection from './additional-info-section'
import PriceSummary from './price-summary'
import SubmitButton from './submit-button'

export type { SubscriptionFormValues }

export const SubscriptionForm: React.FC = () => {
  const { form, submitted, onSubmit, isSubmitting } = useSubscriptionForm()
  const { mealPlans, mealPlansLoading, mealPlansError } = useMealPlans()
  const priceCalculation = usePriceCalculation({ form, mealPlans })

  return (
    <div className="w-full space-y-8">
      {/* Header Card */}
      <FormHeader />

      {/* Main Form Card */}
      <Card className="w-full border border-gray-200 bg-white shadow-xl rounded-2xl">
        <CardContent className="p-6 md:p-8">
          {submitted ? (
            <SuccessState />
          ) : (
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              {/* Personal Information Section */}
              <PersonalInfoSection form={form} isSubmitting={isSubmitting} />

              {/* Plan Selection Section */}
              <PlanSelectionSection
                form={form}
                mealPlans={mealPlans}
                mealPlansLoading={mealPlansLoading}
                mealPlansError={mealPlansError}
                isSubmitting={isSubmitting}
              />

              {/* Meal Preferences Section */}
              <MealPreferencesSection form={form} isSubmitting={isSubmitting} />

              {/* Delivery Schedule Section */}
              <DeliveryScheduleSection form={form} isSubmitting={isSubmitting} />

              {/* Additional Information Section */}
              <AdditionalInfoSection form={form} isSubmitting={isSubmitting} />

              {/* Price Summary */}
              <PriceSummary {...priceCalculation} />

              {/* Submit Button */}
              <SubmitButton isSubmitting={isSubmitting} />
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SubscriptionForm

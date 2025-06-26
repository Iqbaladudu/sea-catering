import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { MealPlan } from '@/payload-types'
import { SubscriptionFormValues } from './use-subscription-form'

interface UsePriceCalculationProps {
  form: UseFormReturn<SubscriptionFormValues>
  mealPlans: MealPlan[] | undefined
}

export const usePriceCalculation = ({ form, mealPlans }: UsePriceCalculationProps) => {
  const selectedPlanId = form.watch('plan')
  const mealTypes = form.watch('mealTypes')
  const deliveryDays = form.watch('deliverDays')

  const calculations = useMemo(() => {
    const selectedPlan = mealPlans?.find((p) => p.id === parseInt(selectedPlanId, 10))
    const planPrice = selectedPlan ? selectedPlan.price : 0
    const mealTypeCount = mealTypes.length
    const deliveryDayCount = deliveryDays.length

    const totalPrice =
      planPrice && mealTypeCount && deliveryDayCount
        ? planPrice * mealTypeCount * deliveryDayCount * 4.3
        : 0

    const showSummary = Boolean(selectedPlanId && mealTypeCount > 0 && deliveryDayCount > 0)

    return {
      selectedPlan,
      planPrice,
      mealTypeCount,
      deliveryDayCount,
      totalPrice,
      showSummary,
    }
  }, [selectedPlanId, mealTypes, deliveryDays, mealPlans])

  return calculations
}

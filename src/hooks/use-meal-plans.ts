import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { MealPlan } from '@/payload-types'

export const useMealPlans = () => {
  const {
    data: mealPlans,
    isLoading: mealPlansLoading,
    error: mealPlansError,
    mutate: refetchMealPlans,
  } = useSWR<MealPlan[]>('/api/mealplans', fetcher)

  return {
    mealPlans,
    mealPlansLoading,
    mealPlansError,
    refetchMealPlans,
  }
}

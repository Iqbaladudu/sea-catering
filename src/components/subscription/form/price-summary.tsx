import React from 'react'
import { MealPlan } from '@/payload-types'

interface PriceSummaryProps {
  selectedPlan: MealPlan | undefined
  planPrice: number
  mealTypeCount: number
  deliveryDayCount: number
  totalPrice: number
  showSummary: boolean
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  selectedPlan,
  planPrice,
  mealTypeCount,
  deliveryDayCount,
  totalPrice,
  showSummary,
}) => {
  if (!showSummary) return null

  return (
    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
      <h4 className="font-semibold text-gray-900 mb-4 text-lg">Price Summary</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Plan: {selectedPlan?.name}</span>
          <span>Rp{planPrice.toLocaleString('id-ID')} / meal</span>
        </div>
        <div className="flex justify-between">
          <span>Meal Types: {mealTypeCount}</span>
          <span>× {mealTypeCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Days: {deliveryDayCount}</span>
          <span>× {deliveryDayCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Monthly multiplier:</span>
          <span>× 4.3 weeks</span>
        </div>
        <div className="border-t border-primary/20 pt-2 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Monthly:</span>
            <span className="font-bold text-xl text-primary">
              Rp{totalPrice.toLocaleString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceSummary

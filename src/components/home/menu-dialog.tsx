'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader as ModalHeader,
  DialogTitle as ModalTitle,
  DialogDescription as ModalDescription,
} from '@/components/ui/dialog'
import { MealPlan } from '@/lib/interfaces'
import { CheckCircle2 } from 'lucide-react'

interface MenuDialogProps {
  selectedIdx: number | null
  selectedPlan: MealPlan | null
  handleCloseModalAction: () => void
}

export default function MenuDialog({
  selectedIdx,
  selectedPlan,
  handleCloseModalAction,
}: MenuDialogProps) {
  return (
    <Dialog open={selectedIdx !== null} onOpenChange={(open) => !open && handleCloseModalAction()}>
      <DialogContent className="w-11/12 max-w-xl sm:max-w-2xl p-0 sm:p-0 rounded-2xl overflow-y-auto max-h-[90vh] flex flex-col">
        {selectedPlan && (
          <div className="w-full p-4 sm:p-8">
            <ModalHeader>
              <ModalTitle className="text-2xl md:text-3xl">{selectedPlan.name}</ModalTitle>
              <ModalDescription>
                <span className="block text-primary font-bold text-lg mb-1">
                  {selectedPlan.price}
                </span>
                <span className="block text-gray-700 mb-2">{selectedPlan.description}</span>
              </ModalDescription>
            </ModalHeader>
            <div className="mb-4">
              <ul className="flex flex-col gap-2">
                {selectedPlan.features?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-700 text-base">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {/* Responsive info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {selectedPlan.mealsPerWeek && (
                <div>
                  <span className="font-semibold text-gray-800">Meals per week:</span>{' '}
                  {selectedPlan.mealsPerWeek}
                </div>
              )}
              {selectedPlan.deliveryArea && (
                <div>
                  <span className="font-semibold text-gray-800">Delivery area:</span>{' '}
                  {selectedPlan.deliveryArea}
                </div>
              )}
              {selectedPlan.support && (
                <div>
                  <span className="font-semibold text-gray-800">Support:</span>{' '}
                  {selectedPlan.support}
                </div>
              )}
              {selectedPlan.caloriesPerMeal && (
                <div>
                  <span className="font-semibold text-gray-800">Calories per meal:</span>{' '}
                  {selectedPlan.caloriesPerMeal}
                </div>
              )}
              {selectedPlan.deliveryFrequency && (
                <div>
                  <span className="font-semibold text-gray-800">Delivery frequency:</span>{' '}
                  {selectedPlan.deliveryFrequency}
                </div>
              )}
            </div>
            {selectedPlan.detailedDescription && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Details:</span>
                <p className="text-gray-700">{selectedPlan.detailedDescription}</p>
              </div>
            )}
            {selectedPlan.menuSample && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Sample menu:</span>
                <ul className="list-disc list-inside text-gray-700">
                  {selectedPlan.menuSample.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {selectedPlan.dietaryOptions && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">Dietary options:</span>{' '}
                {selectedPlan.dietaryOptions.join(', ')}
              </div>
            )}
            {selectedPlan.faq && (
              <div className="mb-2">
                <span className="font-semibold text-gray-800">FAQ:</span>
                <ul className="mt-1 space-y-1">
                  {selectedPlan.faq.map((item, i) => (
                    <li key={i}>
                      <span className="font-semibold">{item.question}</span>
                      <br />
                      <span className="text-gray-700">{item.answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

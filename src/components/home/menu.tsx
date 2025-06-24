'use client'

import * as React from 'react'

import { MEAL_PLANS } from '@/lib/constants'
import MenuDialog from './menu-dialog'
import MenuWrapper from './menu-wrapper'

export const Menu: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null)

  const handleOpenModal = (idx: number) => setSelectedIdx(idx)
  const handleCloseModal = () => setSelectedIdx(null)

  const selectedPlan = selectedIdx !== null ? MEAL_PLANS[selectedIdx] : null

  return (
    <section id="menu" className="container max-w-7xl py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Meal Plans
      </h2>
      <p className="text-center text-gray-600 mb-10 text-base md:text-lg max-w-2xl mx-auto">
        Choose the meal plan that fits your lifestyle. All plans include fresh, healthy meals
        delivered to your door, with flexible options and nutritionist support.
      </p>
      <MenuWrapper handleOpenModalAction={handleOpenModal} />
      <MenuDialog
        selectedIdx={selectedIdx}
        selectedPlan={selectedPlan}
        handleCloseModalAction={handleCloseModal}
      />
    </section>
  )
}

export default Menu

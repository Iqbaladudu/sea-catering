'use client'

import * as React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { MealPlan } from '@/payload-types'
import MenuDialog from './menu-dialog'
import MenuWrapper from './menu-wrapper'

export const Menu: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = React.useState<number | null>(null)
  const { data: menu } = useSWR<MealPlan[]>('/api/menu', fetcher)

  const handleOpenModal = (idx: number) => setSelectedIdx(idx)
  const handleCloseModal = () => setSelectedIdx(null)

  const selectedPlan = selectedIdx !== null && menu ? menu[selectedIdx] : null

  return (
    <section id="menu" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span>🍽️</span>
            Our Plans
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 sm:mb-6 leading-tight">
            Choose Your
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {' '}
              Perfect Plan
            </span>
          </h2>
          <p className="text-center text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Choose the meal plan that fits your lifestyle. All plans include fresh, healthy meals
            delivered to your door, with flexible options and nutritionist support.
          </p>
        </div>
        <MenuWrapper handleOpenModalAction={handleOpenModal} />
        <MenuDialog
          selectedIdx={selectedIdx}
          selectedPlan={selectedPlan}
          handleCloseModalAction={handleCloseModal}
        />
      </div>
    </section>
  )
}

export default Menu

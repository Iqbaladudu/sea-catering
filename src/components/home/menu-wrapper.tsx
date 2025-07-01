'use client'

import useSWR from 'swr'
import { fetcher } from '@/lib/utils'
import { MenuCard } from './menu-card'
import { MealPlan } from '@/payload-types'

interface MenuWrapperProps {
  handleOpenModalAction: (idx: number) => void
}

export default function MenuWrapper({ handleOpenModalAction }: MenuWrapperProps) {
  const { data: menu } = useSWR<MealPlan[]>('/api/menu', fetcher)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menu?.map((plan: MealPlan, idx: number) => (
        <MenuCard key={idx} plan={plan} handleOpenModalAction={handleOpenModalAction} idx={idx} />
      ))}
    </div>
  )
}

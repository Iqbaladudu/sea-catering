'use client'

import useSWR from 'swr'
import { MenuCard } from './menu-card'
import { fetcher } from '@/lib/utils'
import { MealPlan } from '@/payload-types'
interface MenuWrapperProps {
  handleOpenModalAction: (idx: number) => void
}

export default function MenuWrapper({ handleOpenModalAction }: MenuWrapperProps) {
  const { data: menu } = useSWR<MealPlan[]>('/api/menu', fetcher)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cos-3">
      {menu?.map((plan, idx) => (
        <MenuCard key={idx} plan={plan} handleOpenModalAction={handleOpenModalAction} idx={idx} />
      ))}
    </div>
  )
}

'use client'

import useSWR from 'swr'
import { MenuCard } from './menu-card'
import { fetcher } from '@/lib/utils'
interface MenuWrapperProps {
  handleOpenModalAction: (idx: number) => void
}

export default function MenuWrapper({ handleOpenModalAction }: MenuWrapperProps) {
  const { data: menu } = useSWR('/api/menu', fetcher)
  console.log('Menu data:', menu)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menu?.map((plan, idx) => (
        <MenuCard key={idx} plan={plan} handleOpenModalAction={handleOpenModalAction} idx={idx} />
      ))}
    </div>
  )
}

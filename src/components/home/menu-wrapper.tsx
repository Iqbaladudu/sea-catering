'use client'

import useSWR from 'swr'
import { MenuCard } from './menu-card'
import { fetcher } from '@/lib/utils'
interface MenuWrapperProps {
  handleOpenModalAction: (idx: number) => void
}

export default function MenuWrapper({ handleOpenModalAction }: MenuWrapperProps) {
  const { data: menu } = useSWR('/api/menu', fetcher)
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {menu?.map((plan: any, idx: any) => (
        <MenuCard key={idx} plan={plan} handleOpenModalAction={handleOpenModalAction} idx={idx} />
      ))}
    </div>
  )
}

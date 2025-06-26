'use client'

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { MealPlan } from '@/payload-types'

interface MenuCardProps {
  plan: MealPlan
  handleOpenModalAction: (idx: number) => void
  idx: number
}

export function MenuCard({ plan, handleOpenModalAction, idx }: MenuCardProps) {
  return (
    <>
      <motion.div
        key={plan.name}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
      >
        <div className="relative group">
          <Card className="relative flex flex-col h-full rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 z-10 overflow-hidden">
            {plan.popular && (
              <span className="absolute top-5 right-5 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm tracking-wide z-20 border border-white">
                ⭐ Popular
              </span>
            )}
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-lg text-primary font-bold mb-2">
                {plan.price}{' '}
                <span className="text-gray-500 font-medium text-base">/ meal</span>
              </CardDescription>
              <p className="text-gray-600 text-base">{plan.description}</p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 pt-2">
              <ul className="flex flex-col gap-2 mb-4">
                {plan.features.map(({ feature, id }) => (
                  <li key={id} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="w-full mt-auto bg-primary hover:bg-primary/90 transition duration-200 font-semibold text-base md:text-lg min-h-[44px] shadow-sm"
              >
                Choose Plan
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full mt-2 font-semibold text-base md:text-lg min-h-[44px] border-primary/40 hover:border-primary"
                onClick={() => handleOpenModalAction(idx)}
              >
                See more details
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  )
}

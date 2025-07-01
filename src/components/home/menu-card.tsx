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
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {plan.name}
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-primary font-bold mb-2">
                Rp {plan.price.toLocaleString('id-ID')}{' '}
                <span className="text-gray-500 font-medium text-sm sm:text-base">/ meal</span>
              </CardDescription>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-3 sm:gap-4 pt-2 px-4 sm:px-6">
              <ul className="flex flex-col gap-2 mb-3 sm:mb-4">
                {plan.features.map(({ feature, id }) => (
                  <li
                    key={id}
                    className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm md:text-base"
                  >
                    <CheckCircle2 className="text-green-500 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                    <span className="font-medium leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 sm:space-y-3 mt-auto">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white transition duration-200 font-semibold text-sm sm:text-base md:text-lg min-h-[44px] shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Choose Plan
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full font-semibold text-sm sm:text-base md:text-lg min-h-[44px] border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200"
                  onClick={() => handleOpenModalAction(idx)}
                >
                  See more details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </>
  )
}

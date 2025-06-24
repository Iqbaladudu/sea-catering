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
        <Card
          className={`relative flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl ${
            plan.popular ? 'border-2 border-primary' : ''
          }`}
        >
          {plan.popular && (
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow">
              Most Popular
            </span>
          )}
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold">{plan.name}</CardTitle>
            <CardDescription className="text-lg text-primary font-bold">
              {plan.price} / meal
            </CardDescription>
            <p className="text-gray-600 text-base">{plan.description}</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <ul className="flex flex-col gap-2 mb-4">
              {plan.features.map(({ feature, id }) => (
                <li key={id} className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="w-full mt-auto bg-primary hover:bg-primary/90 transition duration-300 font-semibold text-base md:text-lg min-h-[44px]"
            >
              Choose Plan
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mt-2 font-semibold text-base md:text-lg min-h-[44px]"
              onClick={() => handleOpenModalAction(idx)}
            >
              See more details
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}

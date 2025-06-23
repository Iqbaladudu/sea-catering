'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { MEAL_PLANS } from '@/lib/constants'

export const SubscriptionPlans: React.FC = () => (
  <section className="w-full max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-2">
    {MEAL_PLANS.map((plan, idx) => (
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
              Rekomendasi
            </span>
          )}
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold">{plan.name}</CardTitle>
            <CardDescription className="text-lg text-primary font-bold">
              {plan.price}
            </CardDescription>
            <p className="text-gray-600 text-base">{plan.description}</p>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <ul className="flex flex-col gap-2 mb-4">
              {plan.features.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-center gap-2 text-gray-700 text-sm md:text-base"
                >
                  <CheckCircle2 className="text-green-500 w-5 h-5" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className="w-full mt-auto bg-primary hover:bg-primary/90 transition duration-300 font-semibold text-base md:text-lg min-h-[44px]"
              disabled
            >
              Pilih Paket di Form
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </section>
)

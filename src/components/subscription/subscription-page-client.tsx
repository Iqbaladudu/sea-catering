'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { SubscriptionForm } from '@/components/subscription/form'
import { User } from 'lucide-react'

interface AuthenticatedUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface SubscriptionPageClientProps {
  user: AuthenticatedUser
}

export const SubscriptionPageClient: React.FC<SubscriptionPageClientProps> = ({ user }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center pt-24 pb-12 px-2">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          SEA Catering Subscription
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Choose the subscription plan that fits your needs. Enjoy healthy meals, flexible delivery,
          and expert nutritionist support at any time!
        </p>
      </motion.section>

      <section className="w-full max-w-xl mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-4 mb-8 border border-emerald-200/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Welcome back, {user.name}!</p>
              <p className="text-sm text-gray-600">Let&apos;s set up your perfect meal plan</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SubscriptionForm user={user} />
        </motion.div>
      </section>
    </main>
  )
}

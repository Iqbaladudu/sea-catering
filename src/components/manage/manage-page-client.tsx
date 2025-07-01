'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ManageSubscriptions } from './manage-subscriptions'
import { User } from 'lucide-react'

interface AuthenticatedUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface ManagePageClientProps {
  user: AuthenticatedUser
}

export const ManagePageClient: React.FC<ManagePageClientProps> = ({ user }) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center pt-24 pb-12 px-2">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Manage Your Subscriptions
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          View, modify, pause, or cancel your meal subscriptions. Take full control of your healthy eating journey.
        </p>
      </motion.section>

      <section className="w-full max-w-5xl mt-8">
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
              <p className="text-sm text-gray-600">Manage your active subscriptions below</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ManageSubscriptions user={user} />
        </motion.div>
      </section>
    </main>
  )
}

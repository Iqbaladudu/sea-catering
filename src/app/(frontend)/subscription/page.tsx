import * as React from 'react'
import { SubscriptionPlans } from '@/components/subscription/plans'
import { SubscriptionForm } from '@/components/subscription/form'

const SubscriptionPage: React.FC = () => (
  <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center pt-24 pb-12 px-2">
    <section className="w-full max-w-3xl text-center mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Langganan SEA Catering</h1>
      <p className="text-gray-600 text-base md:text-lg">
        Pilih paket langganan yang sesuai dengan kebutuhan Anda. Nikmati makanan sehat, pengiriman
        fleksibel, dan dukungan ahli gizi setiap saat!
      </p>
    </section>
    <SubscriptionPlans />
    <section className="w-full max-w-xl mt-16">
      <SubscriptionForm />
    </section>
  </main>
)

export default SubscriptionPage

'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { MEAL_PLANS } from '@/lib/constants'

interface FormState {
  name: string
  email: string
  phone: string
  plan: string
}

export const SubscriptionForm: React.FC = () => {
  const [form, setForm] = React.useState<FormState>({
    name: '',
    email: '',
    phone: '',
    plan: MEAL_PLANS[0].name,
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.phone || !form.plan) {
      setError('Mohon lengkapi semua data.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', plan: MEAL_PLANS[0].name })
    }, 1200)
  }

  return (
    <Card className="w-full border-none p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Formulir Langganan</CardTitle>
        <CardDescription className="text-gray-600 text-base md:text-lg">
          Isi data Anda dan pilih paket langganan. Kami akan menghubungi Anda untuk proses
          selanjutnya.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-green-600 font-semibold py-4 text-center">
            Terima kasih! Permintaan langganan Anda telah kami terima.
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              name="name"
              type="text"
              placeholder="Nama Lengkap"
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
              required
              className="text-base md:text-lg"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
              required
              className="text-base md:text-lg"
            />
            <Input
              name="phone"
              type="tel"
              placeholder="No. Telepon / WhatsApp"
              value={form.phone}
              onChange={handleChange}
              disabled={submitting}
              required
              className="text-base md:text-lg"
            />
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              disabled={submitting}
              required
              className="rounded-md border border-input px-3 py-2 text-base md:text-lg bg-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              style={{ minHeight: 44 }}
            >
              {MEAL_PLANS.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name} - {plan.price}
                </option>
              ))}
            </select>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 transition duration-300 font-semibold text-base md:text-lg min-h-[44px]"
              disabled={submitting}
            >
              {submitting ? 'Mengirim...' : 'Langganan Sekarang'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default SubscriptionForm

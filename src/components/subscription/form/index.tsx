'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

import { MEAL_PLANS } from '@/lib/constants'

const MEAL_TYPES = [
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
]

const DELIVERY_DAYS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
]

type PlanKey = string

interface SubscriptionFormState {
  name: string
  phone: string
  plan: PlanKey | ''
  mealTypes: string[]
  deliveryDays: string[]
  allergies: string
}

export const SubscriptionForm: React.FC = () => {
  const [form, setForm] = React.useState<SubscriptionFormState>({
    name: '',
    phone: '',
    plan: '',
    mealTypes: [],
    deliveryDays: [],
    allergies: '',
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [error, setError] = React.useState<string>('')

  const selectedPlan = MEAL_PLANS.find((p) => p.name === form.plan)
  const planPrice = selectedPlan ? Number(selectedPlan.price.replace(/[^\d]/g, '')) : 0
  const mealTypeCount = form.mealTypes.length
  const deliveryDayCount = form.deliveryDays.length
  const totalPrice =
    planPrice && mealTypeCount && deliveryDayCount
      ? planPrice * mealTypeCount * deliveryDayCount * 4.3
      : 0

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlanChange = (value: PlanKey) => {
    setForm((prev) => ({ ...prev, plan: value }))
  }

  const handleCheckboxChange = (group: 'mealTypes' | 'deliveryDays', value: string) => {
    setForm((prev) => {
      const arr = prev[group]
      return {
        ...prev,
        [group]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Name is required.'
    if (!form.phone.trim()) return 'Active phone number is required.'
    if (!form.plan) return 'Please select a plan.'
    if (form.mealTypes.length === 0) return 'Please select at least one meal type.'
    if (form.deliveryDays.length === 0) return 'Please select at least one delivery day.'
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm({
        name: '',
        phone: '',
        plan: '',
        mealTypes: [],
        deliveryDays: [],
        allergies: '',
      })
    }, 1200)
  }

  return (
    <Card className="w-full border-none p-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Subscribe to a Meal Plan</CardTitle>
        <p className="text-gray-600 text-base md:text-lg mt-1">
          Fields marked with <span className="text-red-500">*</span> are required.
        </p>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="text-green-600 font-semibold py-4 text-center">
            Thank you! Your subscription request has been received.
          </div>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
            <div>
              <label className="block font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handleInputChange}
                disabled={submitting}
                required
                className="text-base md:text-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Active Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                name="phone"
                type="tel"
                placeholder="e.g. 08123456789"
                value={form.phone}
                onChange={handleInputChange}
                disabled={submitting}
                required
                className="text-base md:text-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Plan Selection <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-2">
                {MEAL_PLANS.map((plan) => (
                  <label
                    key={plan.name}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition',
                      form.plan === plan.name
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:bg-gray-50',
                    )}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.name}
                      checked={form.plan === plan.name}
                      onChange={() => handlePlanChange(plan.name)}
                      disabled={submitting}
                      className="accent-primary w-5 h-5"
                      required
                    />
                    <span className="font-semibold">{plan.name}</span>
                    <span className="text-gray-500 text-sm">{plan.price}</span>
                    <span className="text-gray-400 text-xs">{plan.description}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Meal Type <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {MEAL_TYPES.map((meal) => (
                  <label
                    key={meal.value}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition',
                      form.mealTypes.includes(meal.value)
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:bg-gray-50',
                    )}
                  >
                    <Checkbox
                      checked={form.mealTypes.includes(meal.value)}
                      onCheckedChange={() => handleCheckboxChange('mealTypes', meal.value)}
                      disabled={submitting}
                      aria-label={meal.label}
                    />
                    <span>{meal.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select at least one. You can choose multiple meal types.
              </p>
            </div>
            <div>
              <label className="block font-medium mb-1">
                Delivery Days <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DELIVERY_DAYS.map((day) => (
                  <label
                    key={day.value}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition',
                      form.deliveryDays.includes(day.value)
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 hover:bg-gray-50',
                    )}
                  >
                    <Checkbox
                      checked={form.deliveryDays.includes(day.value)}
                      onCheckedChange={() => handleCheckboxChange('deliveryDays', day.value)}
                      disabled={submitting}
                      aria-label={day.label}
                    />
                    <span>{day.label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Select any combination of days.</p>
            </div>
            <div>
              <label className="block font-medium mb-1">Allergies / Dietary Restrictions</label>
              <Input
                name="allergies"
                type="text"
                placeholder="e.g. peanuts, gluten, seafood"
                value={form.allergies}
                onChange={handleInputChange}
                disabled={submitting}
                className="text-base md:text-lg"
              />
            </div>
            {/* Price Calculation */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
              <span className="font-semibold text-gray-800">Total Price:</span>
              <span className="text-primary font-bold text-lg">
                {totalPrice > 0
                  ? `Rp${totalPrice.toLocaleString('id-ID', {
                      minimumFractionDigits: 0,
                    })}`
                  : '-'}
              </span>
              <span className="text-xs text-gray-500">
                (Plan Price per meal × Meal Types × Delivery Days × 4.3)
              </span>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              size="lg"
              className="bg-primary hover:bg-primary/90 transition duration-300 font-semibold text-base md:text-lg min-h-[44px]"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

export default SubscriptionForm

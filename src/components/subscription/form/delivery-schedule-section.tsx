import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, AlertCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { SubscriptionFormValues } from '@/hooks'

interface DeliveryScheduleSectionProps {
  form: UseFormReturn<SubscriptionFormValues>
  isSubmitting: boolean
}

const DELIVERY_DAYS = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
] as const

export const DeliveryScheduleSection: React.FC<DeliveryScheduleSectionProps> = ({
  form,
  isSubmitting,
}) => {
  const handleDeliveryDayChange = (dayValue: string) => {
    const current = form.getValues('deliverDays')
    if (current.includes(dayValue as any)) {
      form.setValue(
        'deliverDays',
        current.filter((v: string) => v !== dayValue),
      )
    } else {
      form.setValue('deliverDays', [...current, dayValue as any])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Delivery Schedule</h3>
      </div>

      <div className="space-y-3">
        <label className="font-medium text-gray-700 flex items-center gap-2">
          Delivery Days <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DELIVERY_DAYS.map((day) => (
            <label
              key={day.value}
              className={cn(
                'flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center min-h-[48px]',
                form.watch('deliverDays').includes(day.value)
                  ? 'border-primary bg-primary/5 text-primary font-medium'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
              )}
            >
              <Checkbox
                checked={form.watch('deliverDays').includes(day.value)}
                onCheckedChange={() => handleDeliveryDayChange(day.value)}
                disabled={isSubmitting}
                aria-label={day.label}
                className="w-4 h-4"
              />
              <span className="font-medium text-sm">{day.label}</span>
            </label>
          ))}
        </div>
        {form.formState.errors.deliverDays && (
          <div className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {form.formState.errors.deliverDays.message as string}
          </div>
        )}
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Select any combination of days that work for your schedule.
        </p>
      </div>
    </div>
  )
}

export default DeliveryScheduleSection

import React from 'react'
import { Input } from '@/components/ui/input'
import { User, Phone, AlertCircle } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { SubscriptionFormValues } from '@/hooks'

interface PersonalInfoSectionProps {
  form: UseFormReturn<SubscriptionFormValues>
  isSubmitting: boolean
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form, isSubmitting }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
        <User className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <User className="w-4 h-4" />
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            {...form.register('name')}
            type="text"
            placeholder="Enter your full name"
            disabled={isSubmitting}
            className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary/20 rounded-lg"
          />
          {form.formState.errors.name && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {form.formState.errors.name.message}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <Phone className="w-4 h-4" />
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            {...form.register('phone')}
            type="tel"
            placeholder="e.g. 08123456789"
            disabled={isSubmitting}
            className="h-12 text-base border-gray-300 focus:border-primary focus:ring-primary/20 rounded-lg"
          />
          {form.formState.errors.phone && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {form.formState.errors.phone.message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoSection

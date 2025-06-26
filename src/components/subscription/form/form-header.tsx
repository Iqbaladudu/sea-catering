import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export const FormHeader: React.FC = () => {
  return (
    <Card className="w-full border border-gray-200 bg-white/60 backdrop-blur-sm shadow-lg rounded-2xl">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <CreditCard className="w-6 h-6 md:w-7 md:h-7 text-primary" />
          Subscribe to a Meal Plan
        </CardTitle>
        <p className="text-gray-600 text-base md:text-lg mt-2 leading-relaxed">
          Complete the form below to start your healthy meal journey.
          <br />
          <span className="text-sm text-gray-500">
            Fields marked with <span className="text-red-500 font-semibold">*</span> are required.
          </span>
        </p>
      </CardHeader>
    </Card>
  )
}

export default FormHeader

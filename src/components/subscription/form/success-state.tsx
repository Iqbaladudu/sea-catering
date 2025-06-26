import React from 'react'
import { CheckCircle } from 'lucide-react'

export const SuccessState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
      <p className="text-gray-600">
        Your subscription request has been received successfully.
      </p>
    </div>
  )
}

export default SuccessState

import React from 'react'
import { Button } from '@/components/ui/button'
import { CreditCard } from 'lucide-react'

interface SubmitButtonProps {
  isSubmitting: boolean
  disabled?: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  disabled = false,
}) => {
  return (
    <Button
      type="submit"
      size="lg"
      className="w-full h-14 bg-primary hover:bg-primary/90 transition-all duration-300 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl"
      disabled={isSubmitting || disabled}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Complete Subscription
        </div>
      )}
    </Button>
  )
}

export default SubmitButton

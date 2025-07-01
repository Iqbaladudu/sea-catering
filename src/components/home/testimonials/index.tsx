'use client'

import * as React from 'react'
import TestimonialForm from './testimonial-form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import TestimonialCard from './testimonial-card'

export const Testimonials: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <section id="testimonials" className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <span>💬</span>
              Testimonials
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              What Our
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {' '}
                Customers Say
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
              Real feedback from real customers who&apos;ve transformed their eating habits with SEA
              Catering.
            </p>
          </div>

          <TestimonialCard />
          <div className="flex justify-center mt-8 sm:mt-12">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-full px-6 sm:px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-h-[44px] text-sm sm:text-base md:text-lg font-semibold"
                  aria-label="Add Testimonial"
                >
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent
                className="max-w-xs sm:max-w-md w-[90vw] sm:w-full rounded-2xl shadow-2xl border-0 p-0 overflow-hidden animate-in fade-in-0 zoom-in-95"
                showCloseButton={false}
              >
                <div className="relative bg-white dark:bg-zinc-900">
                  <DialogClose asChild>
                    <button
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-1.5 sm:p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors duration-200"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    </button>
                  </DialogClose>
                  <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-2 text-center border-b border-gray-100 dark:border-zinc-800">
                    <DialogTitle className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 px-2">
                      Submit Your Testimonial
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-300 text-sm sm:text-base px-2 leading-relaxed">
                      We value your feedback! Share your experience and help others choose healthy
                      meals.
                    </DialogDescription>
                  </div>
                  <div className="p-4 sm:p-8">
                    <TestimonialForm />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonials

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
      <section id="testimonials" className="container mx-auto max-w-4xl py-12 px-4">
        <TestimonialCard />
        <div className="flex justify-center mt-8">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="bg-primary text-white rounded-full px-8 py-3 shadow-lg hover:bg-primary/90 transition duration-300 min-h-[44px] text-base md:text-lg"
                aria-label="Add Testimonial"
              >
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent
              className="max-w-md w-full rounded-2xl shadow-2xl border-0 p-0 overflow-hidden animate-in fade-in-0 zoom-in-95"
              showCloseButton={false}
            >
              <div className="relative bg-white dark:bg-zinc-900">
                <DialogClose asChild>
                  <button
                    className="absolute top-4 right-4 rounded-full p-2 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </DialogClose>
                <div className="px-8 pt-8 pb-2 text-center border-b border-gray-100 dark:border-zinc-800">
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Submit Your Testimonial
                  </DialogTitle>
                  <DialogDescription className="text-gray-500 dark:text-gray-300 text-base">
                    We value your feedback! Share your experience and help others choose healthy
                    meals.
                  </DialogDescription>
                </div>
                <div className="p-8">
                  <TestimonialForm />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </>
  )
}

export default Testimonials

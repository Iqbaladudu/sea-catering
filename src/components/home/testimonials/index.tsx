'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '@/lib/interfaces'
import { SAMPLE_TESTIMONIALS } from '@/lib/constants'
import TestimonialForm from './testimonial-form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'

export const Testimonials: React.FC = () => {
  const [testimonials] = React.useState<Testimonial[]>(SAMPLE_TESTIMONIALS)
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // Auto-advance slider
  React.useEffect(() => {
    if (paused || dragging) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.length, paused, dragging])

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length)

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    setDragging(false)
    if (info.offset.x > 80) prevSlide()
    else if (info.offset.x < -80) nextSlide()
  }

  return (
    <>
      <section id="testimonials" className="container max-w-4xl py-12 px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          What Our Customers Say
        </h2>
        <div
          className="relative flex flex-col items-center mb-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setDragging(true)}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing"
                tabIndex={0}
                aria-live="polite"
              >
                <Card className="w-full shadow-lg rounded-2xl bg-white min-h-[170px] flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <span className="font-semibold">{testimonials[current].name}</span>
                      <span className="flex gap-0.5 ml-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={
                              i < testimonials[current].rating
                                ? 'text-yellow-400 fill-yellow-300'
                                : 'text-gray-300'
                            }
                            aria-label={i < testimonials[current].rating ? 'star filled' : 'star'}
                          />
                        ))}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-base md:text-lg italic min-h-[60px]">
                      {testimonials[current].message}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft size={24} />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    idx === current ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setCurrent(idx)}
                  style={{ minWidth: 12, minHeight: 12 }}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight size={24} />
            </Button>
          </div>
          <div className="text-xs text-gray-400 mt-2">Swipe or use arrows to navigate</div>
        </div>
        {/* Modal Trigger Button */}
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

'use client'

import * as React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'

interface Testimonial {
  name: string
  message: string
  rating: number
}

const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Andrew',
    message: 'The meals are delicious, healthy, and always delivered on time. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Sarah',
    message: 'Great variety of menu options and perfect for families. Even my kids love it!',
    rating: 4,
  },
  {
    name: 'David',
    message: 'Customer service is very responsive. The executive plan truly feels premium!',
    rating: 5,
  },
]

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>(SAMPLE_TESTIMONIALS)
  const [form, setForm] = React.useState<{ name: string; message: string; rating: number }>({
    name: '',
    message: '',
    rating: 5,
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState('')
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const controls = useAnimation()

  // Carousel auto-advance every 7s unless paused
  React.useEffect(() => {
    if (paused || dragging) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.length, paused, dragging])

  // Keyboard arrow navigation
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRating = (rating: number) => {
    setForm((f) => ({ ...f, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.message.trim() || form.rating < 1) {
      setError('Mohon isi semua kolom dan beri rating.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setTestimonials([{ ...form, rating: Number(form.rating) }, ...testimonials])
      setForm({ name: '', message: '', rating: 5 })
      setSubmitting(false)
      setCurrent(0)
    }, 800)
  }

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const nextSlide = () => setCurrent((prev) => (prev + 1) % testimonials.length)

  // For swipe/drag
  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    setDragging(false)
    if (info.offset.x > 80) prevSlide()
    else if (info.offset.x < -80) nextSlide()
  }

  // Animated star rating input
  const [hoverRating, setHoverRating] = React.useState<number | null>(null)

  return (
    <section id="testimonials" className="container max-w-4xl py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        What Our Customers Say
      </h2>
      {/* Carousel */}
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
                    "{testimonials[current].message}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Carousel Controls */}
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
    </section>
  )
}

export default Testimonials

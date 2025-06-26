import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '@/lib/interfaces'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

export default function TestimonialCard() {
  const testimonials_query = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const res = await fetch('/api/testimonials')
      if (!res.ok) throw new Error('Failed to fetch testimonials')
      return await res.json()
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  const testimonials = testimonials_query.data?.data ?? []
  const [current, setCurrent] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)


  React.useEffect(() => {
    if (current >= testimonials.length) setCurrent(0)
  }, [testimonials.length, current])

  React.useEffect(() => {
    if (paused || dragging || testimonials.length === 0) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.length, paused, dragging])

  const prevSlide = React.useCallback(
    () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    [testimonials.length],
  )

  const nextSlide = React.useCallback(
    () => setCurrent((prev) => (prev + 1) % testimonials.length),
    [testimonials.length],
  )
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [testimonials.length, current, prevSlide, nextSlide])

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    setDragging(false)
    if (info.offset.x > 80) prevSlide()
    else if (info.offset.x < -80) nextSlide()
  }

  if (testimonials_query.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[180px]">
        <span className="text-gray-500">Loading testimonials...</span>
      </div>
    )
  }

  if (testimonials_query.isError) {
    return (
      <div className="flex justify-center items-center min-h-[180px]">
        <span className="text-red-500">Failed to load testimonials.</span>
      </div>
    )
  }

  if (testimonials.length === 0 || !testimonials[current]) {
    return (
      <div className="flex justify-center items-center min-h-[180px]">
        <span className="text-gray-500">No testimonials yet.</span>
      </div>
    )
  }

  return (
    <>
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
              {testimonials_query.isSuccess && testimonials && (
                <div className="relative w-full">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/30 via-white to-secondary/20 blur-[2px] opacity-80 z-0" />
                  <Card className="relative w-full rounded-3xl border-0 shadow-xl bg-white/95 backdrop-blur-lg min-h-[210px] flex flex-col justify-between px-6 py-7 z-10">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full border-4 border-primary/40 bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center shadow-md">
                          {/* Avatar: use image if available, else initials */}
                          {testimonials[current].avatar ? (
                            <img
                              src={testimonials[current].avatar}
                              alt={testimonials[current].name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-bold text-primary">
                              {testimonials[current].name
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .slice(0, 2)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
                          {testimonials[current].name}
                        </CardTitle>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={
                                i < testimonials[current].rating
                                  ? 'text-yellow-400 fill-yellow-300 drop-shadow'
                                  : 'text-gray-300'
                              }
                              aria-label={i < testimonials[current].rating ? 'star filled' : 'star'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-gray-700 text-base md:text-lg italic min-h-[60px] leading-relaxed">
                        “{testimonials[current].message}”
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous"
            onClick={prevSlide}
            className="rounded-full border border-gray-200 shadow hover:bg-primary/10 transition"
            disabled={testimonials.length <= 1}
          >
            <ChevronLeft size={24} />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-200 border-2 ${
                  idx === current
                    ? 'bg-primary border-primary shadow'
                    : 'bg-gray-200 border-gray-300'
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
            className="rounded-full border border-gray-200 shadow hover:bg-primary/10 transition"
            disabled={testimonials.length <= 1}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        <div className="text-xs text-gray-400 mt-3">Swipe or use arrows to navigate</div>
      </div>
    </>
  )
}

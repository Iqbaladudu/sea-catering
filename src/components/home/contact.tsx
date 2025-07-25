'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PhoneCall, Smile, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ContactFormState {
  name: string
  email: string
  message: string
}

export const Contact: React.FC = () => {
  const phoneNumber: string = '08123456789'
  const managerName: string = 'Brian'

  const [form, setForm] = useState<ContactFormState>({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <span>✨</span>
            Contact Us
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            Get
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              {' '}
              In Touch
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-2">
            Have questions or need assistance? Our team is here to help you with any inquiries about
            menu options, orders, or catering services.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid gap-6 sm:gap-8 lg:gap-8 grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Information Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl border-0 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative pb-3 sm:pb-4 pt-6 sm:pt-8">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300"
                >
                  <Smile className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                </motion.div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 text-center group-hover:text-gray-700 transition-colors duration-300 px-2">
                  Reach Out to Us
                </CardTitle>
              </CardHeader>

              <CardContent className="relative space-y-3 sm:space-y-4 px-4 sm:px-6 pb-6 sm:pb-8">
                <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                  Have questions or need assistance? Our team is here to help you with any inquiries
                  about menu options, orders, or catering services.
                </p>

                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Smile className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm sm:text-base">
                          {managerName}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">Manager</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-semibold text-sm sm:text-base">
                          Phone Number
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">{phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-2xl border-0 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <CardHeader className="relative pb-3 sm:pb-4 pt-6 sm:pt-8">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 text-center group-hover:text-gray-700 transition-colors duration-300 px-2">
                  Contact Form
                </CardTitle>
              </CardHeader>

              <CardContent className="relative space-y-3 sm:space-y-4 px-4 sm:px-6 pb-6 sm:pb-8">
                <CardDescription className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                  Send us a message and we&apos;ll get back to you soon.
                </CardDescription>

                {submitted ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                    </div>
                    <p className="text-emerald-600 font-semibold text-sm sm:text-base">
                      Thank you! Your message has been sent.
                    </p>
                  </div>
                ) : (
                  <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
                    <Input
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={submitting}
                      required
                      className="text-sm sm:text-base md:text-lg bg-gray-50 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl min-h-[44px]"
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={submitting}
                      required
                      className="text-sm sm:text-base md:text-lg bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl min-h-[44px]"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={form.message}
                      onChange={handleChange}
                      disabled={submitting}
                      required
                      className="text-sm sm:text-base md:text-lg bg-gray-50 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl min-h-[80px] sm:min-h-[100px] resize-none"
                    />
                    {error && (
                      <div className="text-red-500 text-xs sm:text-sm bg-red-50 p-2 sm:p-3 rounded-xl border border-red-200">
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base md:text-lg min-h-[44px] rounded-xl"
                      disabled={submitting}
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4 sm:px-6 py-3 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl border border-emerald-200/50 max-w-md sm:max-w-none mx-auto">
            <span className="text-xl sm:text-2xl">📞</span>
            <p className="text-gray-700 font-medium text-center sm:text-left text-sm sm:text-base">
              Need immediate assistance?
              <span className="block sm:inline text-emerald-600 font-semibold sm:ml-1">
                Contact us directly!
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact

'use client'
import React, { useState } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PhoneCall, Smile } from 'lucide-react'

interface FooterProps {}

interface ContactFormState {
  name: string
  email: string
  message: string
}

export const Contact: React.FC<FooterProps> = () => {
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
    <section id="contact" className="container max-w-11/12 mb-10">
      <h1 className="text-2xl lg:text-3xl text-gray-900 font-bold mt-10 text-center mb-4">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="w-full border-none p-4">
          <CardHeader>
            <CardTitle className="text-xl">Reach Out to Us</CardTitle>
            <CardDescription className="text-gray-600 text-base md:text-lg">
              Have questions or need assistance? Our team is here to help you with any inquiries
              about menu options, orders, or catering services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-5 items-center">
              <div className="bg-gray-200 rounded-full inline-flex items-center justify-center p-2">
                <Smile size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{managerName}</p>
                <p className="text-gray-600">Manager</p>
              </div>
            </div>
            <div className="flex gap-5 items-center mt-4">
              <div className="bg-gray-200 rounded-full inline-flex items-center justify-center p-2">
                <PhoneCall size={24} className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">Phone Number</p>
                <p className="text-gray-600">{phoneNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full border-none p-4 flex flex-col justify-center">
          <CardHeader>
            <CardTitle className="text-xl">Contact Form</CardTitle>
            <CardDescription className="text-gray-600 text-base md:text-lg">
              Send us a message and we’ll get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-green-600 font-semibold py-4">
                Thank you! Your message has been sent.
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  className="text-base md:text-lg"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  className="text-base md:text-lg"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                  className="text-base md:text-lg min-h-[100px]"
                />
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <Button
                  type="submit"
                  size="lg"
                  className="bg-primary hover:bg-primary/90 transition duration-300 font-semibold text-base md:text-lg min-h-[44px]"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Contact

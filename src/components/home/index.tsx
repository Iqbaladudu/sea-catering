import * as React from 'react'
import Hero from './hero'
import Features from './features'
import Contact from './contact'
import Menu from './menu'
import Testimonials from './testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center">
      <Hero />
      <Features />
      <Menu />
      <Testimonials />
      <Contact />
    </main>
  )
}

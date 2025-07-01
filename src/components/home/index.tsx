'use client'

import * as React from 'react'
import Hero from './hero'
import Features from './features'
import Contact from './contact'
import Menu from './menu'
import Testimonials from './testimonials'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Menu />
      <Testimonials />
      <Contact />
    </main>
  )
}

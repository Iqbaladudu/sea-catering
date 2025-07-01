import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import ReactQueryProvider from '@/components/react-query-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  description:
    'SEA Catering - Healthy Meals, Anytime, Anywhere. Premium meal delivery service across Indonesia.',
  title: 'SEA Catering - Healthy Meal Delivery Service',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="min-h-screen bg-white">
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <Navbar />
              <main className="relative">{children}</main>
              <Footer />
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </>
  )
}

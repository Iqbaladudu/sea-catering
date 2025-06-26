import React from 'react'
import './styles.css'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import ReactQueryProvider from '@/components/react-query-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </>
  )
}

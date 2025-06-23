'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'

export const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-30">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="text-xl font-bold text-primary tracking-tight">
          SEA Catering
        </Link>
        <div className="hidden md:flex gap-2 lg:gap-4 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-md transition-colors duration-200 font-medium text-base lg:text-lg ${
                isActive(link.href)
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 shadow"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-3 py-3 rounded-lg text-base font-semibold transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'bg-primary text-primary-foreground shadow'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setMobileOpen(false)}
                  style={{ minHeight: 44 }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

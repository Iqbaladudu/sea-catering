'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { clientAuth, type AuthUser } from '@/lib/auth'
import { toast } from 'sonner'

export const Navbar: React.FC = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false)
  const [scrolled, setScrolled] = React.useState<boolean>(false)
  const [authState, setAuthState] = React.useState<{
    user: AuthUser | null
    isAuthenticated: boolean
  }>({ user: null, isAuthenticated: false })

  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  React.useEffect(() => {
    const checkAuth = () => {
      if (clientAuth.hasAuthCookies()) {
        const auth = clientAuth.getAuthState()
        setAuthState(auth)
      } else {
        setAuthState({ user: null, isAuthenticated: false })
      }
    }

    checkAuth()

    // Check auth state periodically
    const interval = setInterval(checkAuth, 2000)
    return () => clearInterval(interval)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const handleLogout = async () => {
    try {
      // Use client auth logout which handles API call and redirect
      clientAuth.logout()
      setAuthState({ user: null, isAuthenticated: false })
      toast.success('Logging out...')
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback to direct logout
      clientAuth.logout()
      setAuthState({ user: null, isAuthenticated: false })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 tracking-tight group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              SEA Catering
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {NAV_LINKS.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 font-medium text-base lg:text-lg group ${
                  isActive(link.href)
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-emerald-100 rounded-lg"
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {authState.isAuthenticated && authState.user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
                <User className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">{authState.user.name}</span>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300"
                asChild
              >
                <Link href="/masuk">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/daftar">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-100 transition-colors duration-200"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <motion.div animate={{ rotate: mobileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50"
          >
            <div className="flex flex-col px-4 py-6 space-y-3">
              {/* Mobile Navigation Links */}
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                    onClick={() => setMobileOpen(false)}
                    style={{ minHeight: 48 }}
                  >
                    <span>{link.name}</span>
                    {isActive(link.href) && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {authState.isAuthenticated && authState.user ? (
                  <>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <User className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">{authState.user.name}</span>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleLogout()
                        setMobileOpen(false)
                      }}
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 min-h-[48px]"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-600 hover:bg-emerald-50 min-h-[48px]"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/masuk">Sign In</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg min-h-[48px]"
                      asChild
                      onClick={() => setMobileOpen(false)}
                    >
                      <Link href="/daftar">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

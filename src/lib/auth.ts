'use client'

export interface AuthUser {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

// Client-side auth utilities (limited functionality due to HTTP-only cookies)
export const clientAuth = {
  // Get user data from non-HTTP-only cookie (client-side accessible)
  getAuthUser(): AuthUser | null {
    if (typeof window === 'undefined') return null

    const cookies = document.cookie.split(';')
    const authUserCookie = cookies.find((cookie) => cookie.trim().startsWith('auth-user='))

    if (!authUserCookie) return null

    try {
      const userData = authUserCookie.split('=')[1]
      return JSON.parse(decodeURIComponent(userData)) as AuthUser
    } catch (error) {
      console.error('Error parsing user data from cookie:', error)
      return null
    }
  },

  // Check if auth cookies exist (basic auth check)
  hasAuthCookies(): boolean {
    if (typeof window === 'undefined') return false

    const cookies = document.cookie.split(';')
    const hasUserCookie = cookies.some((cookie) => cookie.trim().startsWith('auth-user='))

    return hasUserCookie
  },

  // Get basic auth state (client-side)
  getAuthState(): AuthState {
    const user = this.getAuthUser()
    const hasAuth = this.hasAuthCookies()

    return {
      user,
      isAuthenticated: hasAuth && user !== null,
    }
  },

  // Client-side logout (clears non-HTTP-only cookies and redirects)
  logout(): void {
    if (typeof window === 'undefined') return

    // Clear the user data cookie (HTTP-only token will be cleared server-side)
    document.cookie = 'auth-user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax'

    // Redirect to logout API to clear HTTP-only cookies
    window.location.href = '/api/auth/logout'
  },

  // Redirect to login
  redirectToLogin(returnUrl?: string): void {
    if (typeof window === 'undefined') return

    const loginUrl = returnUrl ? `/masuk?redirect=${encodeURIComponent(returnUrl)}` : '/masuk'

    window.location.href = loginUrl
  },

  // Redirect to home
  redirectToHome(): void {
    if (typeof window === 'undefined') return
    window.location.href = '/'
  },

  // Check auth status via API (for more reliable checking)
  async checkAuthStatus(): Promise<AuthState> {
    if (typeof window === 'undefined') {
      return { user: null, isAuthenticated: false }
    }

    try {
      const response = await fetch('/api/auth/status')
      const data = await response.json()

      if (data.success) {
        return {
          user: data.user,
          isAuthenticated: data.isAuthenticated && data.sessionValid,
        }
      } else {
        return { user: null, isAuthenticated: false }
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
      return { user: null, isAuthenticated: false }
    }
  },
}

// Hook for listening to auth state changes (polling approach for HTTP-only cookies)
export const useAuthStateChange = (callback: (authState: AuthState) => void) => {
  if (typeof window === 'undefined') return

  // Poll for cookie changes every 2 seconds
  const interval = setInterval(() => {
    const currentState = clientAuth.getAuthState()
    callback(currentState)
  }, 2000)

  return () => clearInterval(interval)
}

// Validate session (client-side)
export const validateSession = (): boolean => {
  const user = clientAuth.getAuthUser()
  const authenticated = clientAuth.hasAuthCookies()

  if (!user || !authenticated) {
    clientAuth.logout()
    return false
  }

  return true
}

// Legacy compatibility exports
export const getAuthUser = clientAuth.getAuthUser.bind(clientAuth)
export const isAuthenticated = clientAuth.hasAuthCookies.bind(clientAuth)
export const getAuthState = clientAuth.getAuthState.bind(clientAuth)
export const logoutUser = clientAuth.logout.bind(clientAuth)
export const hasAuthCookie = clientAuth.hasAuthCookies.bind(clientAuth)
export const redirectToLogin = clientAuth.redirectToLogin.bind(clientAuth)
export const redirectToHome = clientAuth.redirectToHome.bind(clientAuth)

// Constants
export const AUTH_COOKIE_NAMES = {
  TOKEN: 'auth-token',
  USER: 'auth-user',
} as const

export const AUTH_ROUTES = {
  LOGIN: '/masuk',
  REGISTER: '/daftar',
  LOGOUT: '/api/auth/logout',
  PROTECTED: ['/subscription'],
  PUBLIC: ['/', '/masuk', '/daftar'],
} as const

// Client-side auth error types
export class ClientAuthError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message)
    this.name = 'ClientAuthError'
  }
}

export class SessionExpiredError extends ClientAuthError {
  constructor() {
    super('Session has expired', 'SESSION_EXPIRED')
  }
}

export class UnauthorizedError extends ClientAuthError {
  constructor() {
    super('Access denied', 'UNAUTHORIZED')
  }
}

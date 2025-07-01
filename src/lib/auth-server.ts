import { cookies } from 'next/headers'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

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

// Server-side auth utilities for use in server components, API routes, and actions
export class ServerAuth {
  private cookieStore: ReadonlyRequestCookies

  constructor(cookieStore: ReadonlyRequestCookies) {
    this.cookieStore = cookieStore
  }

  // Get auth token from HTTP-only cookie
  getAuthToken(): string | null {
    try {
      const tokenCookie = this.cookieStore.get('auth-token')
      return tokenCookie?.value || null
    } catch {
      return null
    }
  }

  // Get user data from cookie
  getAuthUser(): AuthUser | null {
    try {
      const userCookie = this.cookieStore.get('auth-user')
      if (!userCookie?.value) return null

      return JSON.parse(userCookie.value) as AuthUser
    } catch {
      return null
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAuthToken()
    const user = this.getAuthUser()
    return !!(token && user)
  }

  // Get complete auth state
  getAuthState(): AuthState {
    const user = this.getAuthUser()
    const isAuth = this.isAuthenticated()

    return {
      user,
      isAuthenticated: isAuth,
    }
  }

  // Validate session (check token and user data consistency)
  validateSession(): boolean {
    const token = this.getAuthToken()
    const user = this.getAuthUser()

    if (!token || !user) {
      return false
    }

    // Additional validation can be added here
    // For example, token expiration checks, user status validation, etc.
    return true
  }
}

// Helper function to create ServerAuth instance
export async function getServerAuth(): Promise<ServerAuth> {
  const cookieStore = await cookies()
  return new ServerAuth(cookieStore)
}

// Server-side auth utilities (static methods for convenience)
export const serverAuth = {
  // Get auth token from cookies
  async getAuthToken(): Promise<string | null> {
    const auth = await getServerAuth()
    return auth.getAuthToken()
  },

  // Get user data from cookies
  async getAuthUser(): Promise<AuthUser | null> {
    const auth = await getServerAuth()
    return auth.getAuthUser()
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const auth = await getServerAuth()
    return auth.isAuthenticated()
  },

  // Get auth state
  async getAuthState(): Promise<AuthState> {
    const auth = await getServerAuth()
    return auth.getAuthState()
  },

  // Validate session
  async validateSession(): Promise<boolean> {
    const auth = await getServerAuth()
    return auth.validateSession()
  },

  // Clear auth cookies (for logout)
  async clearAuthCookies(): Promise<void> {
    const cookieStore = await cookies()
    cookieStore.delete('auth-token')
    cookieStore.delete('auth-user')
  },
}

// Utility functions for common auth operations
export const authUtils = {
  // Validate session and redirect if invalid
  async requireAuth(_redirectUrl = '/masuk'): Promise<AuthUser> {
    const auth = await getServerAuth()

    if (!auth.isAuthenticated()) {
      throw new Error('Authentication required')
    }

    const user = auth.getAuthUser()
    if (!user) {
      throw new Error('User data not found')
    }

    return user
  },

  // Get user or null without throwing
  async getOptionalUser(): Promise<AuthUser | null> {
    const auth = await getServerAuth()
    return auth.getAuthUser()
  },

  // Check auth and return boolean result
  async checkAuth(): Promise<boolean> {
    const auth = await getServerAuth()
    return auth.isAuthenticated()
  },
}

// Types for better TypeScript support
export type ServerAuthInstance = ServerAuth

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

// Error types
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export class SessionExpiredError extends AuthError {
  constructor() {
    super('Session has expired', 'SESSION_EXPIRED')
  }
}

export class UnauthorizedError extends AuthError {
  constructor() {
    super('Access denied', 'UNAUTHORIZED')
  }
}

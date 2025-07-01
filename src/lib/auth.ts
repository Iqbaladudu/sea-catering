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
  token: string | null
  isAuthenticated: boolean
}

// Auth storage keys
const AUTH_TOKEN_KEY = 'sea_catering_auth_token'
const AUTH_USER_KEY = 'sea_catering_auth_user'

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

// Set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

// Remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

// Get user data from localStorage
export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null
  const userData = localStorage.getItem(AUTH_USER_KEY)
  if (!userData) return null

  try {
    return JSON.parse(userData) as AuthUser
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

// Set user data in localStorage
export const setAuthUser = (user: AuthUser): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

// Remove user data from localStorage
export const removeAuthUser = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(AUTH_USER_KEY)
}

// Get current auth state
export const getAuthState = (): AuthState => {
  const token = getAuthToken()
  const user = getAuthUser()

  return {
    user,
    token,
    isAuthenticated: Boolean(token && user),
  }
}

// Login user - save token and user data
export const loginUser = (user: AuthUser, token: string): void => {
  setAuthToken(token)
  setAuthUser(user)
}

// Logout user - clear all auth data
export const logoutUser = (): void => {
  removeAuthToken()
  removeAuthUser()
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken()
  const user = getAuthUser()
  return Boolean(token && user)
}

// Get authorization header for API requests
export const getAuthHeader = (): Record<string, string> => {
  const token = getAuthToken()
  if (!token) return {}

  return {
    Authorization: `Bearer ${token}`,
  }
}

// Redirect to login page
export const redirectToLogin = (): void => {
  if (typeof window === 'undefined') return
  window.location.href = '/masuk'
}

// Redirect to home page
export const redirectToHome = (): void => {
  if (typeof window === 'undefined') return
  window.location.href = '/'
}

// Check if token is expired (basic check)
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true

  try {
    // Basic JWT token structure check
    const payload = token.split('.')[1]
    if (!payload) return true

    const decoded = JSON.parse(atob(payload))
    const currentTime = Date.now() / 1000

    return decoded.exp ? decoded.exp < currentTime : false
  } catch (error) {
    console.error('Error checking token expiration:', error)
    return true
  }
}

// Validate current session
export const validateSession = (): boolean => {
  const token = getAuthToken()
  const user = getAuthUser()

  if (!token || !user) {
    logoutUser()
    return false
  }

  if (isTokenExpired(token)) {
    logoutUser()
    return false
  }

  return true
}

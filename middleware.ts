import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/subscription']

// Routes that should redirect to home if user is already authenticated
const authRoutes = ['/masuk', '/daftar']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get authentication tokens from cookies
  const authToken = request.cookies.get('auth-token')?.value
  const authUser = request.cookies.get('auth-user')?.value

  // Check if user is authenticated
  const isAuthenticated = !!(authToken && authUser)

  // Handle protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/masuk', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Handle auth routes (login/register) - redirect if already authenticated
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Check if there's a redirect URL from query params
      const redirectUrl = request.nextUrl.searchParams.get('redirect')
      if (redirectUrl && redirectUrl.startsWith('/')) {
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      }
      // Default redirect to home
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload admin routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}

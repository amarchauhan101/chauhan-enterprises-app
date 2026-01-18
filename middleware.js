import { NextResponse } from "next/server"

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Allow all API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next()
  }
  
  // Allow auth pages
  if (
    pathname.startsWith('/auth') ||
    pathname === '/signin' ||
    pathname === '/signup'
  ) {
    return NextResponse.next()
  }
  
  // Allow static assets
  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next()
  }
  
  // For admin routes, let the page-level auth handle the redirection
  // This is safer and doesn't require edge-incompatible modules
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
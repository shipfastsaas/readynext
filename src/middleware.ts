import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simplification du middleware
export function middleware(request: NextRequest) {
  // Redirection simple pour le dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const adminToken = request.cookies.get('admin-auth')?.value
    
    if (!adminToken) {
      const loginUrl = new URL('/admin-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

// Limiter le middleware uniquement aux routes dashboard
export const config = {
  matcher: ['/dashboard/:path*']
}

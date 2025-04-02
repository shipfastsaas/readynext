import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    console.log('Middleware: Accès au dashboard détecté')
    
    // Get the admin token cookie
    const adminToken = request.cookies.get('admin-auth')?.value
    console.log('Middleware: Cookie admin-auth présent:', !!adminToken)
    
    // If no token exists, redirect to the admin login page
    if (!adminToken) {
      console.log('Middleware: Pas de token, redirection vers la page de connexion')
      const loginUrl = new URL('/admin-login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(loginUrl)
    }
    
    try {
      // Vérifier simplement si le cookie existe et a la bonne valeur
      // Cette approche est compatible avec Edge Runtime
      if (adminToken !== 'authenticated') {
        console.log('Middleware: Token invalide')
        throw new Error('Invalid token')
      }
      
      console.log('Middleware: Accès au dashboard autorisé')
      // Token is valid, continue
    } catch (error) {
      // Token is invalid, redirect to login
      console.log('Middleware: Erreur de vérification du token:', error)
      const loginUrl = new URL('/admin-login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // Continue with the request if authenticated or not accessing dashboard
  return NextResponse.next()
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: ['/dashboard/:path*'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ar', 'he']
const defaultLocale = 'ar'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files, etc)
    '/((?!api|_next/static|_next/image|favicon.ico|images|hero.jpg).*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith('/admin')) return NextResponse.next()

  const auth = req.headers.get('authorization')
  const expected = 'Basic ' + Buffer.from(`admin:${process.env.ADMIN_PASSWORD}`).toString('base64')

  if (auth !== expected) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="SAKSHAM.DEV Admin"' }
    })
  }
  return NextResponse.next()
}

export const config = { matcher: ['/admin/:path*'] }

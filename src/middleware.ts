import { verifyAuth } from '@/utils/auth/checkAuth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/profile', '/orders', '/settings'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get('token')?.value;

  const isAuthorized = token && (await verifyAuth(token));

  const isApiRequest = request.nextUrl.pathname.startsWith('/api');

  if (!isAuthorized) {
    if (isApiRequest) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    } else {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/orders',
    '/orders',
    '/profile/:path*',
  ],
};
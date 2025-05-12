import { verifyAuth } from '@/utils/auth/checkAuth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('TOKEN IN MIDDLEWARE:', token);

  if (!token) {
    console.log('NO TOKEN FOUND');
  }

  console.log('TOKEN IN MIDDLEWARE:', token);
  const isAuthorized = token && (await verifyAuth(token));

  console.log('IS AUTHORIZED:', isAuthorized);

  const isApiRequest = request.nextUrl.pathname.startsWith('/api');

  if (!isAuthorized) {
    if (isApiRequest) {
      console.log('User is not authorized, api request. Redirecting...');
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    } else {
      console.log('User is not authorized. page Redirecting...');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  console.log('User is authorized. Proceeding...');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/orders',
    '/orders',
    '/profile/:path*',
  ],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const loginUrl = new URL('/login', request.url);
  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode('secret_token'); // process.env.JWT_SECRET!
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/cart', '/profile'],
};


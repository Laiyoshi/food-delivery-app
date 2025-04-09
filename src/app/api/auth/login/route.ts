import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emailOrAccountName, password } = body;

    const [user] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, emailOrAccountName),
          eq(users.accountName, emailOrAccountName)
        )
      );

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: 'Неверные данные для входа' }, { status: 401 });
    }

    const secret = new TextEncoder().encode('secret_token'); // process.env.JWT_SECRET!

    const token = await new SignJWT({
      id: user.id,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    const response = NextResponse.json({ message: 'Успешный вход' });
    response.cookies.set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка входа: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
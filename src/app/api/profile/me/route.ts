import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cart, favorites, orders, users } from '@/db/schema';
import { eq, and, ne, or } from 'drizzle-orm';
import { getAuthenticatedUserId } from '@/app/utils/auth/checkAuth';

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const [user] = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        accountName: users.accountName,
        phone: users.phone,
        address: users.address,
        cardNumber: users.cardNumber,
        avatar: users.avatar,
      })
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка сервера: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const data = await req.json();

    const existingUser = await db
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.email, data.email), eq(users.accountName, data.accountName)),
          ne(users.id, userId)
        )
      );

    if (existingUser.length > 0) {
      return NextResponse.json({ error: 'Email или имя аккаунта уже заняты' }, { status: 400 });
    }

    await db.update(users)
      .set({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        accountName: data.accountName,
        phone: data.phone,
        address: data.address,
        cardNumber: data.cardNumber,
      })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: 'Данные успешно обновлены' });
  } catch (error) {
    return NextResponse.json({ error: `Ошибка сервера: ${error}` }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    await db.delete(cart).where(eq(cart.userId, userId));
    await db.delete(orders).where(eq(orders.userId, userId));
    await db.delete(favorites).where(eq(favorites.userId, userId));
    await db.delete(users).where(eq(users.id, userId));

    const response = NextResponse.json({ success: 'Аккаунт удалён' });
    response.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Ошибка при удалении пользователя: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
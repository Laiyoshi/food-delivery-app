import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cart, deliveryAddresses, favorites, orders, paymentMethods, users } from '@/db/schema';
import { eq, and, ne, or, sql } from 'drizzle-orm';
import { getAuthenticatedUserId } from '@/utils/auth/checkAuth';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const userId = await getAuthenticatedUserId();

    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const [address] = await db
    .select({ address: deliveryAddresses.address })
    .from(deliveryAddresses)
    .where(eq(deliveryAddresses.userId, userId));

    const [card] = await db
    .select({ cardNumber: paymentMethods.details })
    .from(paymentMethods)
    .where(eq(paymentMethods.userId, userId));


    return NextResponse.json({
          user: {
            ...user,
            address: address?.address || '',
            cardNumber: card?.cardNumber || '',
          },
       });
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

    if (data.email || data.accountName) {
      const existingUser = await db
        .select()
        .from(users)
        .where(
          and(
            or(
              data.email ? eq(users.email, data.email) : undefined,
              data.accountName ? eq(users.accountName, data.accountName) : undefined
            ),
            ne(users.id, userId)
          )
        );

      if (existingUser.length > 0) {
        return NextResponse.json({ error: 'Email или имя аккаунта уже заняты' }, { status: 400 });
      }
    }

    await db.update(users)
      .set({
        ...(data.firstName && { firstName: data.firstName }),
        ...(data.lastName && { lastName: data.lastName }),
        ...(data.email && { email: data.email }),
        ...(data.accountName && { accountName: data.accountName }),
        ...(data.phone && { phone: data.phone }),
        ...(data.avatar && { avatar: data.avatar }),
      })
      .where(eq(users.id, userId));


      const [existingAddress] = await db
      .select()
      .from(deliveryAddresses)
      .where(eq(deliveryAddresses.userId, userId));

      if (existingAddress) {
        await db.update(deliveryAddresses)
          .set({ address: data.address })
          .where(eq(deliveryAddresses.userId, userId));
      } else {
        await db.insert(deliveryAddresses).values({
          userId,
          address: data.address,
          comment: '',
        });
      }

      const [existingCard] = await db
        .select()
        .from(paymentMethods)
        .where(eq(paymentMethods.userId, userId));

      if (existingCard) {
        await db.update(paymentMethods)
          .set({ details: data.cardNumber })
          .where(eq(paymentMethods.userId, userId));
      } else {
        await db.insert(paymentMethods).values({
          userId,
          type: 'card',
          details: data.cardNumber,
        });
      }

      if (data.currentPassword && data.newPassword) {
        const [user] = await db.select().from(users).where(eq(users.id, userId));
        const validPassword = await bcrypt.compare(
          data.currentPassword,
          user?.passwordHash || ''
        );
      
        if (!validPassword) {
          return NextResponse.json({ error: 'Неверный текущий пароль' }, { status: 400 });
        }
      
        const newPasswordHash = await bcrypt.hash(data.newPassword, 10);
      
        await db.update(users)
          .set({ passwordHash: newPasswordHash })
          .where(eq(users.id, userId));
      }


    return NextResponse.json({ success: 'Профиль обновлён' });
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

    await db.run(sql`PRAGMA foreign_keys = OFF`);
    await db.delete(cart).where(eq(cart.userId, userId));
    await db.delete(orders).where(eq(orders.userId, userId));
    await db.delete(favorites).where(eq(favorites.userId, userId));
    await db.delete(deliveryAddresses).where(eq(deliveryAddresses.userId, userId));
    await db.delete(paymentMethods).where(eq(paymentMethods.userId, userId));    
    await db.delete(users).where(eq(users.id, userId));
    await db.run(sql`PRAGMA foreign_keys = ON`);

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
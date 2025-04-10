// /src/app/api/orders/[id]/repeat/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { cart, menuItems, orders } from '@/db/schema';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Ожидаем params перед использованием
    const { id } = await params;
    const orderId = Number(id);

    // 1. Получаем данные заказа
    const order = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .execute();

    if (!order || order.length === 0) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 });
    }

    // 2. Получаем товары из корзины этого заказа
    const cartItems = await db
      .select({
        id: menuItems.id,
        name: menuItems.name,
        description: menuItems.description,
        price: menuItems.price,
        imageUrl: menuItems.imageUrl,
        quantity: cart.quantity
      })
      .from(cart)
      .leftJoin(menuItems, eq(cart.menuItemId, menuItems.id))
      .where(eq(cart.id, order[0].cartId ?? ''))
      .execute();

    // 3. Возвращаем данные для добавления в текущую корзину
    return NextResponse.json({
      items: cartItems
    });

  } catch (error) {
    console.error('Ошибка при повторении заказа:', error);
    return NextResponse.json(
      { error: 'Не удалось повторить заказ' },
      { status: 500 }
    );
  }
}
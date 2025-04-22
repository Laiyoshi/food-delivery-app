import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { PromiseCart } from '@/app/types/types';
import { db } from '@/db';
import { orderItems, orders, orderStatuses, restaurants } from '@/db/schema';

export async function GET(req: Request) {
  try {
    // Получаем userId из заголовков запроса
    const userId = req.headers.get('user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    // Получаем заказы пользователя
    const userOrders = await db
      .select({
        orderId: orders.id,
        orderDate: orders.orderDate,
        restaurantName: restaurants.name,
        statusName: orderStatuses.name,
      })
      .from(orders)
      .leftJoin(restaurants, eq(orders.restaurantId, restaurants.id))
      .leftJoin(orderStatuses, eq(orders.statusId, orderStatuses.id))
      .where(eq(orders.userId, userId));

    // Получаем данные о товарах в заказах
    const orderItemsData = await db
      .select({
        orderId: orderItems.orderId,
        quantity: orderItems.quantity,
        price: orderItems.priceAtPurchase,
      })
      .from(orderItems);

    // Группируем товары по orderId
    const groupedOrderItemsData = orderItemsData.reduce(
      (acc, item) => {
        if (!acc[item.orderId]) {
          acc[item.orderId] = [];
        }
        acc[item.orderId].push(item);
        return acc;
      },
      {} as Record<number, typeof orderItemsData>
    );

    // Формируем итоговый массив заказов
    const ordersWithAmount = userOrders.map(order => {
      const items = groupedOrderItemsData[order.orderId] || [];
      const totalAmount = items.reduce(
        (sum, item) => sum + (item.quantity ?? 0) * (item.price ?? 0),
        0
      );

      return {
        id: order.orderId,
        orderDate: order.orderDate,
        restaurant: order.restaurantName,
        amount: totalAmount,
        status: order.statusName,
      };
    });

    return NextResponse.json(ordersWithAmount);
  } catch (error) {
    console.error('Ошибка при получении заказов:', error);
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, deliveryAddressId, restaurantId, paymentMethodId, cart, orderAmount } =
      await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    }

    // Создаем новый заказ
    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        deliveryAddressId,
        restaurantId,
        courierId: 1,
        paymentMethodId,
        statusId: 1,
        orderDate: new Date().toISOString(),
        orderAmount,
      })
      .returning();

    // Добавляем товары в заказ
    const items = cart.map((item: PromiseCart) => ({
      id: uuidv4(),
      orderId: newOrder.id,
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      priceAtPurchase: item.price,
    }));

    await db.insert(orderItems).values(items);

    return NextResponse.json({ message: 'Заказ оформлен', orderId: newOrder.id });
  } catch (error) {
    console.error('Ошибка при создании заказа:', error);
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 });
  }
}

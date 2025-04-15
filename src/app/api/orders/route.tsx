import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { PromiseCart } from '@/app/types/types';
import { db } from '@/db';
import { sql } from 'drizzle-orm'
import { cart, menuItems, orderItems, orders, orderStatuses, restaurants } from '@/db/schema';

export async function GET() {
  try {
    // Основной запрос для получения всех заказов с необходимыми данными
    const allOrders = await db
      .select({
        orderId: orders.id,
        orderDate: orders.orderDate,
        restaurantName: restaurants.name,
        statusName: orderStatuses.name,
      })
      .from(orders)
      .leftJoin(restaurants, eq(orders.restaurantId, restaurants.id))
      .leftJoin(orderStatuses, eq(orders.statusId, orderStatuses.id));

    // Запрос для получения данных о товарах в заказах из orderItems
    const orderItemsData = await db
      .select({
        orderId: orderItems.orderId,
        quantity: orderItems.quantity,
        price: orderItems.priceAtPurchase,
      })
      .from(orderItems);

    // Группируем данные о товарах по orderId
    const groupedOrderItemsData = orderItemsData.reduce(
      (acc, item) => {
        if (!acc[item.orderId]) {
          acc[item.orderId] = [];
        }
        acc[item.orderId].push(item);
        return acc;
      },
      {} as Record<number, typeof orderItemsData>,
    );

    // Формируем финальный массив заказов
    const ordersWithAmount = allOrders.map(order => {
      const items = order.orderId ? groupedOrderItemsData[order.orderId] || [] : [];
      const totalAmount = items.reduce<number>(
        (sum, item) => sum + (item.quantity ?? 0) * (item.price ?? 0),
        0,
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
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log('Полученные данные запроса');
    const { userId, deliveryAddressId, restaurantId, paymentMethodId, cart, orderAmount, } =
      await req.json();

    const [newOrder] = await db
      .insert(orders)
      .values({
        userId, // Ensure userId is a string
        deliveryAddressId, // Ensure deliveryAddressId is a string
        restaurantId, 
        courierId: 1, 
        paymentMethodId, 
        statusId: 1, 
        orderDate: new Date().toISOString(), 
        orderAmount, 
      })
      .returning();

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

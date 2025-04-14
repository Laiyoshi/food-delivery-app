import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

import { PromiseCart } from '@/app/types/types';
import { db } from '@/db';
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
        cartId: orders.cartId,
      })
      .from(orders)
      .leftJoin(restaurants, eq(orders.restaurantId, restaurants.id))
      .leftJoin(orderStatuses, eq(orders.statusId, orderStatuses.id));

    // Запрос для получения данных о корзине и товарах
    const cartData = await db
      .select({
        cartId: cart.id,
        quantity: cart.quantity,
        price: menuItems.price,
      })
      .from(cart)
      .leftJoin(menuItems, eq(cart.menuItemId, menuItems.id));

    // Группируем данные о корзине по cartId
    const groupedCartData = cartData.reduce(
      (acc, item) => {
        if (!acc[item.cartId]) {
          acc[item.cartId] = [];
        }
        acc[item.cartId].push(item);
        return acc;
      },
      {} as Record<string, typeof cartData>
    );

    // Формируем финальный массив заказов
    const ordersWithAmount = allOrders.map(order => {
      const cartItems = order.cartId ? groupedCartData[order.cartId] || [] : [];
      const totalAmount = cartItems.reduce<number>(
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
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log('Полученные данные запроса');
    const { userId, deliveryAddressId, restaurantId, paymentMethodId, cart, orderAmount } =
      await req.json();

    const [newOrder] = await db
      .insert(orders)
      .values({
        userId,
        deliveryAddressId,
        restaurantId,
        courierId: 1,
        paymentMethodId,
        statusId: 1,
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

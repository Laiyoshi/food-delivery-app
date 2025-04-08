import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import {
  cart,
  couriers,
  deliveryAddresses,
  menuItems,
  orders,
  orderStatuses,
  restaurants,
} from '@/db/schema';

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // Ожидаем params перед использованием

  try {
    const orderData = await db
      .select({
        orderId: orders.id,
        cartId: orders.cartId,
        orderDate: orders.orderDate,
        status: orderStatuses.name,
        restaurant: restaurants.name,
        deliveryAddress: deliveryAddresses.address,
        paymentMethod: orders.paymentMethodId,
        courierName: couriers.name,
        courierPhone: couriers.phone,
      })
      .from(orders)
      .leftJoin(restaurants, eq(orders.restaurantId, restaurants.id))
      .leftJoin(deliveryAddresses, eq(orders.deliveryAddressId, deliveryAddresses.id))
      .leftJoin(couriers, eq(orders.courierId, couriers.id))
      .leftJoin(orderStatuses, eq(orders.statusId, orderStatuses.id))
      .where(eq(orders.id, Number(id)))
      .execute();

    if (!orderData || orderData.length === 0) {
      return NextResponse.json({ error: 'Заказ не найден' }, { status: 404 });
    }

    const order = orderData[0];

    const itemsData = await db
      .select({
        name: menuItems.name,
        quantity: cart.quantity,
        price: menuItems.price,
      })
      .from(cart)
      .leftJoin(menuItems, eq(cart.menuItemId, menuItems.id))
      .where(eq(cart.id, order.cartId ?? ''))
      .execute();

    const total = itemsData.reduce(
      (sum, item) => sum + (item.quantity ?? 0) * (item.price ?? 0),
      0
    );

    const response = {
      orderId: order.orderId,
      orderDate: order.orderDate,
      status: order.status,
      restaurant: order.restaurant,
      deliveryAddress: order.deliveryAddress,
      paymentMethod: order.paymentMethod,
      courierName: order.courierName,
      courierPhone: order.courierPhone,
      items: itemsData,
      total,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Ошибка при получении данных о заказе:', error);
    return NextResponse.json({ error: 'Не удалось получить данные о заказе' }, { status: 500 });
  }
}

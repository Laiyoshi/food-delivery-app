import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import {
  orders,
  orderItems,
  menuItems,
  restaurants,
  orderStatuses,
  deliveryAddresses,
  couriers,
  paymentMethods
} from '@/db/schema'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Явно получаем id из params
    const { id } = await params;
    const orderId = Number(id);
    
    // 1. Основные данные заказа
    const [order] = await db
      .select({
        id: orders.id,
        orderDate: orders.orderDate,
        status: orderStatuses.name,
        restaurant: restaurants.name,
        restaurantId: restaurants.id,
        deliveryAddress: deliveryAddresses.address,
        paymentMethod: paymentMethods.details,
        courierName: couriers.name,
        courierPhone: couriers.phone,
        orderAmount: orders.orderAmount,
        deliveryTimeMinutes: restaurants.deliveryTimeMinutes
      })
      .from(orders)
      .leftJoin(restaurants, eq(orders.restaurantId, restaurants.id))
      .leftJoin(orderStatuses, eq(orders.statusId, orderStatuses.id))
      .leftJoin(deliveryAddresses, eq(orders.deliveryAddressId, deliveryAddresses.id))
      .leftJoin(couriers, eq(orders.courierId, couriers.id))
      .leftJoin(paymentMethods, eq(orders.paymentMethodId, paymentMethods.id))
      .where(eq(orders.id, orderId))

    if (!order) {
      return NextResponse.json(
        { error: 'Заказ не найден' },
        { status: 404 }
      )
    }

    // 2. Товары заказа
    const items = await db
      .select({
        id: menuItems.id,
        name: menuItems.name,
        quantity: orderItems.quantity,
        price: orderItems.priceAtPurchase,
        imageUrl: menuItems.imageUrl
      })
      .from(orderItems)
      .leftJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
      .where(eq(orderItems.orderId, orderId)) // Используем тот же orderId

    // 3. Формируем ответ
    const response = {
      ...order,
      items,
      total: order.orderAmount || items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Ошибка при получении заказа:', error)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    // Проверка, что ID заказа является числом
    if (!Number.isFinite(orderId)) {
      return NextResponse.json({ error: 'Некорректный ID заказа' }, { status: 400 });
    }

    const [order] = await db
      .select({
        restaurantId: orders.restaurantId, // Добавляем restaurantId
      })
      .from(orders)
      .where(eq(orders.id, orderId));

    // Получаем товары из таблицы orderItems
    const items = await db
      .select({
        id: menuItems.id,
        name: menuItems.name,
        description: menuItems.description,
        price: orderItems.priceAtPurchase,
        imageUrl: menuItems.imageUrl,
        quantity: orderItems.quantity,
      })
      .from(orderItems)
      .leftJoin(menuItems, eq(orderItems.menuItemId, menuItems.id))
      .where(eq(orderItems.orderId, orderId));

    // Проверка, что товары найдены
    if (items.length === 0) {
      return NextResponse.json({ error: 'Товары заказа не найдены' }, { status: 404 });
    }

    // Возвращаем данные для повторения заказа
    return NextResponse.json({ items ,restaurantId: order.restaurantId});
  } catch (error) {
    console.error('Ошибка при повторении заказа:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка сервера' }, { status: 500 });
  }
}
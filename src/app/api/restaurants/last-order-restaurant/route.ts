import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { orders, orderStatuses, restaurants } from '@/db/schema';

export async function GET() {
  try {
    return Response.json(await getLastOrdersRestaurant());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function getLastOrdersRestaurant() {
  const data = await db
    .select({
      id: restaurants.id,
      name: restaurants.name,
      description: restaurants.description,
      rating: restaurants.rating,
      deliveryTime: restaurants.deliveryTime,
      cuisineType: restaurants.cuisineType,
      averagePrice: restaurants.averagePrice,
      imageUrl: restaurants.imageUrl,
    })
    .from(orders)
    .innerJoin(restaurants, eq(orders.restaurantId, restaurants.id))
    .innerJoin(orderStatuses, eq(orders.statusId, orderStatuses.id))
    .where(eq(orderStatuses.id, 3))
    .limit(4)
    .execute();

  return data;
}

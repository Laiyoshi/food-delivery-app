import { and, count, desc, eq, inArray } from 'drizzle-orm';

import { Restaurant, SearchParams } from '@/app/types/types';
import { db } from '@/db';
import { orders, restaurants } from '@/db/schema';
import { getAuthenticatedUserId } from '@/utils/auth/checkAuth';

type LastOrdersRestaurantResult = {
  data: Restaurant[];
  totalOrders: number;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
    return Response.json(getLastOrdersRestaurant(searchParams));
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function getLastOrdersRestaurant(
  searchParams: SearchParams
): Promise<LastOrdersRestaurantResult> {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return { data: [], totalOrders: 0 };
  }

  const page = parseInt(searchParams.pageOrder || '1');
  const limit = parseInt(searchParams.limit || '8');
  const offset = (page - 1) * limit;

  const recentOrders = await db
    .select({
      restaurantId: orders.restaurantId,
      orderDate: orders.orderDate,
    })
    .from(orders)
    .where(and(eq(orders.userId, userId), eq(orders.statusId, 3)))
    .orderBy(desc(orders.orderDate))
    .execute();

  const uniqueRestaurantIds = Array.from(
    new Set(recentOrders.map(order => order.restaurantId).filter((id): id is string => id !== null))
  ).slice(0, 4);

  if (uniqueRestaurantIds.length === 0) return { data: [], totalOrders: 0 };

  const restaurantsData = await db
    .select({
      id: restaurants.id,
      name: restaurants.name,
      description: restaurants.description,
      rating: restaurants.rating,
      deliveryTime: restaurants.deliveryTime,
      cuisineType: restaurants.cuisineType,
      deliveryTimeMinutes: restaurants.deliveryTimeMinutes,
      averagePrice: restaurants.averagePrice,
      imageUrl: restaurants.imageUrl,
    })
    .from(restaurants)
    .where(inArray(restaurants.id, uniqueRestaurantIds))
    .limit(limit)
    .offset(offset)
    .execute();

  const [data, totalResult] = await Promise.all([
    restaurantsData,
    db
      .select({ count: count() })
      .from(restaurants)
      .where(inArray(restaurants.id, uniqueRestaurantIds))
      .execute(),
  ]);

  const totalOrders = Number(totalResult[0]?.count || 0);

  return { data, totalOrders };
}

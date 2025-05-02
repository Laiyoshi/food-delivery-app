import { and, count, eq, gte, SQL } from 'drizzle-orm';

import { SearchParams } from '@/app/types/types';
import { db } from '@/db';
import { restaurants } from '@/db/schema';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
    return Response.json(await getRestaurants(searchParams));
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function getRestaurants(searchParams: SearchParams) {
  const filters: SQL[] = [];

  if (searchParams.rating) filters.push(gte(restaurants.rating, Number(searchParams.rating)));
  if (searchParams.deliveryTime)
    filters.push(gte(restaurants.deliveryTimeMinutes, Number(searchParams.deliveryTime)));
  if (searchParams.cuisineType) filters.push(eq(restaurants.cuisineType, searchParams.cuisineType));

  const page = parseInt(searchParams.pageRestaurant || '1');
  const limit = parseInt(searchParams.limit || '8');
  const offset = (page - 1) * limit;

  const shouldSortByDelivery = !!searchParams.deliveryTime;

  const baseQuery = db
    .select()
    .from(restaurants)
    .where(and(...filters))
    .limit(limit)
    .offset(offset);

  const query = shouldSortByDelivery
    ? baseQuery.orderBy(restaurants.deliveryTimeMinutes)
    : baseQuery;

  const [data, totalResult] = await Promise.all([
    query,
    db
      .select({ count: count() })
      .from(restaurants)
      .where(and(...filters)),
  ]);
  const totalRestaurants = Number(totalResult[0]?.count || 0);

  return {
    data,
    totalRestaurants,
  };
}

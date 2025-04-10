import { and, count, eq, gte, SQL } from 'drizzle-orm';

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

async function getRestaurants(searchParams: { [key: string]: string }) {
  const filters: SQL[] = [];

  if (searchParams.rating) filters.push(gte(restaurants.rating, Number(searchParams.rating)));
  if (searchParams.deliveryTime)
    filters.push(eq(restaurants.deliveryTime, searchParams.deliveryTime));
  if (searchParams.cuisineType) filters.push(eq(restaurants.cuisineType, searchParams.cuisineType));

  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '12');
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db
      .select()
      .from(restaurants)
      .where(and(...filters))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: count() })
      .from(restaurants)
      .where(and(...filters)),
  ]);
  const total = Number(totalResult[0]?.count || 0);

  return {
    data,
    total,
  };
}

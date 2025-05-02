import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/db';
import { favorites, restaurants } from '@/db/schema';
import { getAuthenticatedUserId } from '@/utils/auth/checkAuth';

type FavoriteAllRestaurantResult = {
  restaurantId: string[];
};

export async function GET() {
  try {
    return NextResponse.json(await getFavoriteRestaurants());
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function getFavoriteRestaurants(): Promise<FavoriteAllRestaurantResult> {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return { restaurantId: [] };
  }

  const baseQuery = db
    .select({
      id: restaurants.id,
    })
    .from(favorites)
    .innerJoin(restaurants, eq(favorites.restaurantId, restaurants.id))
    .where(and(eq(favorites.userId, userId)));

  const results = await baseQuery;

  return {
    restaurantId: results.map(row => row.id),
  };
}

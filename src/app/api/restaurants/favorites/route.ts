import { NextResponse } from 'next/server';
import { and, count, eq, gte, SQL } from 'drizzle-orm';

import { Restaurant, SearchParams } from '@/app/types/types';
import { db } from '@/db';
import { favorites, restaurants } from '@/db/schema';
import { getAuthenticatedUserId } from '@/utils/auth/checkAuth';

type FavoriteRestaurantResult = {
  data: Restaurant[];
  totalFavorites: number;
  userId: string;
};

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());
    return NextResponse.json(await getFavoriteRestaurants(searchParams));
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId, restaurantId } = await req.json();

  await db.insert(favorites).values({ userId, restaurantId });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { userId, restaurantId } = await req.json();

  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.restaurantId, restaurantId)));
  return NextResponse.json({ success: true });
}

export async function getFavoriteRestaurants(
  searchParams: SearchParams
): Promise<FavoriteRestaurantResult> {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return { data: [], totalFavorites: 0, userId: '' };
  }

  const filters: SQL[] = [];

  if (searchParams.rating) {
    filters.push(gte(restaurants.rating, Number(searchParams.rating)));
  }

  if (searchParams.deliveryTime) {
    filters.push(gte(restaurants.deliveryTimeMinutes, Number(searchParams.deliveryTime)));
  }

  if (searchParams.cuisineType) {
    filters.push(eq(restaurants.cuisineType, searchParams.cuisineType));
  }

  const page = parseInt(searchParams.pageFavorite || '1');
  const limit = parseInt(searchParams.limit || '8');
  const offset = (page - 1) * limit;

  const shouldSortByDelivery = !!searchParams.deliveryTime;

  const baseQuery = db
    .select({
      id: restaurants.id,
      name: restaurants.name,
      description: restaurants.description,
      rating: restaurants.rating,
      deliveryTime: restaurants.deliveryTime,
      deliveryTimeMinutes: restaurants.deliveryTimeMinutes,
      cuisineType: restaurants.cuisineType,
      averagePrice: restaurants.averagePrice,
      imageUrl: restaurants.imageUrl,
    })
    .from(favorites)
    .innerJoin(restaurants, eq(favorites.restaurantId, restaurants.id))
    .where(and(eq(favorites.userId, userId), ...filters))
    .limit(limit)
    .offset(offset);

  const query = shouldSortByDelivery
    ? baseQuery.orderBy(restaurants.deliveryTimeMinutes)
    : baseQuery;

  const [data, totalResult] = await Promise.all([
    query,
    db
      .select({ count: count() })
      .from(favorites)
      .innerJoin(restaurants, eq(favorites.restaurantId, restaurants.id))
      .where(and(eq(favorites.userId, userId), ...filters)),
  ]);

  const totalFavorites = Number(totalResult[0]?.count || 0);

  return {
    data,
    totalFavorites,
    userId,
  };
}

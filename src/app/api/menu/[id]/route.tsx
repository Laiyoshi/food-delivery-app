import { NextResponse } from 'next/server';
import { and, eq, SQL } from 'drizzle-orm';

import { Dish, ParamsRequest, SearchParams } from '@/app/types/types';
import { db } from '@/db';
import { categories, menuItems, restaurants } from '@/db/schema';

type GroupedResult = {
  [key: string]: { category: string; dishes: Dish[] };
};

export async function GET(req: Request, { params }: ParamsRequest) {
  const { id } = await params;
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const menu = await getRestaurantMenu(id, searchParams);
  const restaurantName = await getRestaurantName(id);

  if (!menu || menu.length === 0) {
    return NextResponse.json({ restaurantName });
  }

  if (!restaurantName || restaurantName.length === 0) {
    return NextResponse.json({ message: 'Ресторан не найден' }, { status: 404 });
  }

  const response = { restaurantName, menu };

  return NextResponse.json(response);
}

async function getRestaurantMenu(restaurantId: string, searchParams: SearchParams) {
  const searchParameters = await searchParams;
  const filters: SQL[] = [eq(menuItems.restaurantId, restaurantId)];
  if (searchParameters.category) {
    filters.push(eq(categories.name, searchParameters.category));
  }

  const result = await db
    .select({
      id: menuItems.id,
      name: menuItems.name,
      description: menuItems.description,
      price: menuItems.price,
      imageUrl: menuItems.imageUrl,
      category: categories.name,
    })
    .from(menuItems)
    .leftJoin(categories, eq(menuItems.categoryId, categories.id))
    .where(and(...filters));

  const groupedResult = result.reduce<GroupedResult>((acc, item) => {
    const { category, ...data } = item;

    if (category) {
      if (!acc[category]) {
        acc[category] = { category: category, dishes: [] };
      }
      acc[category].dishes.push({
        id: data.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl || '/images/food.png',
        restaurantId: restaurantId,
      });
    }

    return acc;
  }, {});

  const structuredMenu = Object.values(groupedResult);

  return structuredMenu;
}

async function getRestaurantName(restaurantId: string) {
  const result = await db
    .select({ restaurantName: restaurants.name })
    .from(restaurants)
    .where(eq(restaurants.id, restaurantId))
    .limit(1);

  return result[0].restaurantName;
}

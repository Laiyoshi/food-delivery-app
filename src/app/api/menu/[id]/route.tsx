import { NextResponse } from 'next/server';
import { and, eq, SQL } from 'drizzle-orm';

import { Dish } from '@/app/types/types';
import { db } from '@/db';
import { categories, menuItems, restaurants } from '@/db/schema';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const url = new URL(req.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  const menu = await getRestaurantMenu(await id, searchParams);
  const restaurantName = await getRestaurantName(await id);

  if (!menu || menu.length === 0) {
    return NextResponse.json({ restaurantName });
  }

  if (!restaurantName || restaurantName.length === 0) {
    return NextResponse.json({ message: 'Ресторан не найден' }, { status: 404 });
  }

  const response = { restaurantName, menu };

  return NextResponse.json(response);
}

async function getRestaurantMenu(restaurantId: string, searchParams: { [key: string]: string }) {
  const filters: SQL[] = [eq(menuItems.restaurantId, restaurantId)];
  if (searchParams.category) {
    filters.push(eq(categories.name, searchParams.category));
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

  const groupedResult = result.reduce<{
    [key: string]: { category: string; dishes: Dish[] };
  }>((acc, item) => {
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

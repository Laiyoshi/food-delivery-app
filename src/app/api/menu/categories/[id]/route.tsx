import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { CategoryDish, ParamsRequest } from '@/app/types/types';
import { db } from '@/db';
import { categories, menuItems } from '@/db/schema';

export async function GET(req: Request, { params }: ParamsRequest) {
  const { id } = await params;
  const categories = await getCategoriesMenu(id);
  if (!categories) {
    return NextResponse.json({ message: 'Меню не найдено' }, { status: 404 });
  }
  return NextResponse.json(categories);
}

async function getCategoriesMenu(restaurantId: string): Promise<CategoryDish[]> {
  const data = await db
    .select({ id: categories.id, name: categories.name })
    .from(menuItems)
    .where(eq(menuItems.restaurantId, restaurantId))
    .leftJoin(categories, eq(menuItems.categoryId, categories.id))
    .groupBy(categories.id, categories.name);

  return data.map(item => ({
    id: item.id ?? '',
    name: item.name ?? '',
  }));
}

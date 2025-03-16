import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { categories, menuItems } from '@/db/schema';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const categories = await getCategoriesMenu(id);
  if (!categories) {
    return NextResponse.json({ message: 'Меню не найдено' }, { status: 404 });
  }
  return NextResponse.json(categories);
}

export async function getCategoriesMenu(restaurantId: string) {
  const data = await db
    .select({ id: categories.id, name: categories.name })
    .from(menuItems)
    .where(eq(menuItems.restaurantId, restaurantId))
    .leftJoin(categories, eq(menuItems.categoryId, categories.id))
    .groupBy(categories.id, categories.name);
  return data;
}

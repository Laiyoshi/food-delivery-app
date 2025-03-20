import { db } from '@/db';
import { restaurants } from '@/db/schema';

export async function GET() {
  try {
    return Response.json(await getCuisineType());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function getCuisineType() {
  const data = await db.selectDistinct({ cuisineType: restaurants.cuisineType }).from(restaurants);
  return data;
}

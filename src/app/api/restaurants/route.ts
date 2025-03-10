import { db } from '@/db';
import { restaurants } from '@/db/schema';

async function allRestaurants() {
  const data = await db.select().from(restaurants)
  return data
}

export async function GET() {
try {
    return Response.json(await allRestaurants())
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
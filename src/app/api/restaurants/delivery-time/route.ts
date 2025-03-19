import { db } from '@/db';
import { restaurants } from '@/db/schema';

async function getDeliveryTime() {
  const data = await db
    .selectDistinct({ deliveryTime: restaurants.deliveryTime })
    .from(restaurants);
  return data;
}

export async function GET() {
  try {
    return Response.json(await getDeliveryTime());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

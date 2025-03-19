import { NextResponse } from 'next/server';

import { db } from '@/db';
import { cart } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    const newOrder = await db.insert(cart).values(orderData);
    return NextResponse.json({ message: 'Заказ размещен', data: newOrder }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Произошла ошибка: ${error}` }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Валидация данных
    const { orderId, restaurantRating, deliveryRating, comment } = body;

    if (
      !orderId ||
      typeof restaurantRating !== 'number' ||
      typeof deliveryRating !== 'number' ||
      typeof comment !== 'string' ||
      !comment.trim()
    ) {
      return NextResponse.json(
        { error: 'Некорректные данные для отзыва' },
        { status: 400 }
      );
    }

    // Сохранение отзыва в базе данных
    await db.insert(reviews).values({
      orderId,
      restaurantRating,
      deliveryRating,
      comment,
    });

    return NextResponse.json({ message: 'Отзыв успешно сохранён' }, { status: 201 });
  } catch (error) {
    console.error('Ошибка при сохранении отзыва:', error);
    return NextResponse.json(
      { error: 'Не удалось сохранить отзыв' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  if (!orderId) {
    return NextResponse.json(
      { error: 'Не указан идентификатор заказа' },
      { status: 400 }
    );
  }

  try {
    // Получение отзыва для указанного заказа
    const review = await db
      .select()
      .from(reviews)
      .where(eq(reviews.orderId, Number(orderId)))
      .execute();

    if (!review || review.length === 0) {
      return NextResponse.json({ message: 'Отзыв не найден' }, { status: 404 });
    }

    return NextResponse.json(review[0], { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении отзыва:', error);
    return NextResponse.json(
      { error: 'Не удалось получить отзыв' },
      { status: 500 }
    );
  }
}
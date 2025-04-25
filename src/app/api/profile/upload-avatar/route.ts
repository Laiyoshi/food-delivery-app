// app/api/profile/upload-avatar/route.ts
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getAuthenticatedUserId } from '@/utils/auth/checkAuth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get('avatar') as File;

  if (!file || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Файл не является изображением' }, { status: 400 });
  }

  try {
    const blob = await put(`avatars/${userId}-${Date.now()}`, file, {
      access: 'public',
    });

    await db.update(users).set({ avatar: blob.url }).where(eq(users.id, userId));

    return NextResponse.json({ success: 'Аватарка обновлена', url: blob.url });
  } catch (error) {
    return NextResponse.json({ error: `Ошибка при загрузке: ${error}` }, { status: 500 });
  }
}
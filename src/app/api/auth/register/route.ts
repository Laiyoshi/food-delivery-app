/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';

async function createUser(firstName: string, lastName: string, email: string, password: string) {
  try {
    // Проверяем, есть ли уже пользователь с таким email
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return { error: "Email уже зарегистрирован" };
    }

    // Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // Создаем пользователя
    await db.insert(users).values({
      firstName,
      lastName,
      accountName: firstName,
      email,
      passwordHash,
      phone: "",
    });

    return { success: "Регистрация успешна!" };
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return { error: "Ошибка сервера" };
  }
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const result = await createUser(firstName, lastName, email, password);

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: result.success }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
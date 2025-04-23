import { NextResponse } from "next/server";
import { db } from '@/db';
import { deliveryAddresses, paymentMethods, users } from '@/db/schema';
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import { SignJWT } from "jose";
import { cookies } from "next/headers";

async function createUser(firstName: string, lastName: string, email: string, password: string, phone: string, address: string, cardNumber: string) {
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return { error: "Email уже зарегистрирован" };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db.insert(users).values({
      firstName,
      lastName,
      accountName: firstName + lastName + Math.floor(Math.random() * 999) + 1,
      email,
      passwordHash,
      phone,
    }).returning();

    let addressId: number = 0;
    if (address) {
      const [addressAdded] = await db.insert(deliveryAddresses).values({
        userId: user.id,
        address,
        comment: '',
      }).returning();
      addressId = addressAdded.id;
    }

    let paymentMethodId: number = 0;
    if (cardNumber) {
      const [paymentMethodAdded] = await db.insert(paymentMethods).values({
        userId: user.id,
        type: 'card',
        details: cardNumber,
      }).returning();
      paymentMethodId = paymentMethodAdded.id;
    }

    const token = await new SignJWT({ id: user.id, email: user.email})
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'secret_token'));

    (await cookies()).set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: 'lax',
      secure: true,
    });

    return { success: "Регистрация успешна!", userId: user.id, addressId: addressId, paymentMethodId: paymentMethodId};
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return { error: "Ошибка сервера" };
  }
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, phone, address, cardNumber } = await req.json();
    const result = await createUser(firstName, lastName, email, password, phone, address, cardNumber);

    if (result.error) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: result.success, userId: result.userId, addressId: result.addressId, paymentMethodId: result.paymentMethodId}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: `Ошибка сервера: ${error}` }, { status: 500 });
  }
}
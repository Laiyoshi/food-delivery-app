import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret_token');

export async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret_token');
    const { payload } = await jwtVerify(token, secret);

    const userId = typeof payload === 'object' && 'id' in payload ? payload.id : null;
    return typeof userId === 'string' ? userId : null;
  } catch {
    return null;
  }
}

export async function isUserAuthorized(): Promise<boolean> {
  const userId = await getAuthenticatedUserId();
  return Boolean(userId);
}

export async function verifyAuth(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.log(`error while verify auth:${err}`)
    return null;
  }
}
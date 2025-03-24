import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function getAuthenticatedUserId(): Promise<string | null> {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) return null;

    const secret = new TextEncoder().encode('secret_token'); // process.env.JWT_SECRET!
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
import Header from '@/app/components/Header';

import './globals.css';
import { getAuthenticatedUserId } from './utils/auth/checkAuth';
import { InitUserStore } from './components/profile/InitUserStore';
import { db } from '@/db';
import { paymentMethods, deliveryAddresses, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = await getAuthenticatedUserId();
  let paymentMethodId = null;
  let deliveryAddressId = null;
  let avatar = null;

  if (userId) {
    const [paymentMethod] = await db
      .select({ id: paymentMethods.id })
      .from(paymentMethods)
      .where(eq(paymentMethods.userId, userId));

    const [address] = await db
      .select({ id: deliveryAddresses.id })
      .from(deliveryAddresses)
      .where(eq(deliveryAddresses.userId, userId));

      const [user] = await db
      .select({ avatar: users.avatar })
      .from(users)
      .where(eq(users.id, userId));

    paymentMethodId = paymentMethod?.id ?? null;
    deliveryAddressId = address?.id ?? null;
    avatar = user?.avatar ?? null;
  }


  return (
    <html lang="ru">
      <body className="text-gray-800">
        <InitUserStore
          userId={userId}
          paymentMethodId={paymentMethodId}
          deliveryAddressId={deliveryAddressId}
          avatar={avatar}
         />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
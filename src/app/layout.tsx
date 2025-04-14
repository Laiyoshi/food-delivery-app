import Header from '@/app/components/Header';

import './globals.css';
import { getAuthenticatedUserId } from './utils/auth/checkAuth';
import { InitUserStore } from './components/profile/InitUserStore';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const userId = await getAuthenticatedUserId();
  return (
    <html lang="ru">
      <body className="text-gray-800">
        <InitUserStore userId={userId} />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

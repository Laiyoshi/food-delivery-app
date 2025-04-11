import Header from '@/app/components/Header';
import MobileBackground from './components/MobileBackground';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="text-gray-800">
        <Header />
        {/* <MobileBackground/> */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

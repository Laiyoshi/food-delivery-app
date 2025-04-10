import Header from "@/app/components/Header";
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className='text-gray-800'>
        <Header/>
        <main>{children}</main>
      </body>
    </html>
  );
}
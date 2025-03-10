import { Inter, Roboto } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Укажите нужные начертания
  variable: '--font-roboto', // Опционально: для использования CSS переменной
});
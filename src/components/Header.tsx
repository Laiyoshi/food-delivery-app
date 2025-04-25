'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { Bars3Icon, HomeIcon, RectangleStackIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';



import { useCartStore } from '@/store/cartStore';



import Avatar from './profile/Avatar';


export default function Header() {
  const { cart } = useCartStore();
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <header className="relative z-50 flex h-[50px] items-center justify-between rounded-b-xl border-b border-gray-300 bg-white px-6 lg:h-18 lg:rounded-none">
        <button onClick={() => setIsOpened(!isOpened)} className="lg:hidden">
          <Bars3Icon className="h-[30px] w-[30px]" />
        </button>

        <Link href="/">
          <Image
            src="/images/Yam.svg"
            alt="Логотип службы доставки еды"
            width={0}
            height={0}
            className="h-[24px] w-[50px] lg:h-[40px] lg:w-[84px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">

          <Link
            href="/orders"
            className="flex items-center duration-300 hover:text-blue-600 active:text-blue-700"
          >
            <RectangleStackIcon className="mr-1 h-[30px] w-[30px]" />
            Ваши заказы
          </Link>

          <Link
            href="/cart"
            className="relative flex items-center duration-300 hover:text-blue-600 active:text-blue-700"
          >
            {cart.length > 0 && (
              <div className="absolute top-1 left-5.5 h-2 w-2 rounded-full bg-red-500"></div>
            )}
            <ShoppingCartIcon className="mr-1 h-[30px] w-[30px]" />
            Корзина
          </Link>

          <Link
            href="/profile"
            className="flex items-center duration-300 hover:text-blue-600 active:text-blue-700"
          >
            <Avatar />
          </Link>
        </nav>

        <Link href="/cart" className="flex lg:hidden">
          <ShoppingCartIcon className="h-[30px] w-[30px]" />
        </Link>
      </header>

      <Transition show={isOpened}>
        <div className="fixed inset-0 z-50 bg-white bg-[url(/images/bg-mobile.png)] bg-cover data-[closed]:-translate-x-full data-[enter]:duration-300 data-[leave]:duration-300 data-[leave]:data-[closed]:-translate-x-full lg:hidden">
          <div className="flex h-10 items-center justify-between px-5">
            <Image
              src="/images/Yam.svg"
              alt="Логотип службы доставки еды"
              width={0}
              height={0}
              className="h-[24px] w-[50px] lg:h-[40px] lg:w-[84px]"
            />

            <button onClick={() => setIsOpened(!isOpened)} className="text-xl text-white">
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
          <nav className="mx-5 flex h-full flex-col items-start justify-start text-gray-800">
            <Link
              href="/"
              className="flex h-12 w-full items-center border-b-1 border-b-gray-300 py-6"
            >
              <HomeIcon className="mr-1 h-6 w-6" />
              Главная
            </Link>


            <Link
              href="/profile"
              className="flex h-12 w-full items-center border-b-1 border-b-gray-300 py-6"
            >
              <UserIcon className="mr-1 h-6 w-6" /> Профиль
            </Link>

            <Link href="/orders" className="flex h-12 w-full items-center py-6">
              <RectangleStackIcon className="mr-1 h-6 w-6" />
              Ваши заказы
            </Link>
          </nav>
        </div>
      </Transition>
    </>
  );
}
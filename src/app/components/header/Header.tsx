'use client'
import { useState } from 'react';
import Image from 'next/image'
import Profile from '../profile/Profile'
import Link from 'next/link'
import { Bars3Icon, ChatBubbleLeftEllipsisIcon, RectangleStackIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [isOpened, setIsOpened] = useState(false);
  const navInfo = [
          { href: "/", icon: ChatBubbleLeftEllipsisIcon, text: "Чат поддержки" },
          { href: "/", icon: TruckIcon, text: "Отслеживание заказа" },
          { href: "/", icon: RectangleStackIcon, text: "Ваши заказы" },
          { href: "/", icon: ShoppingCartIcon, text: "Корзина" },
        ]
  return (
    <header className='h-[50px] lg:h-18 rounded-b-xl lg:rounded-none flex justify-between items-center px-6 border-b border-gray-300'>
      <button className='lg:hidden'><Bars3Icon className="w-[30px] h-[30px]" /></button>
      <Image src='/images/Yam.svg' alt='Логотип службы доставки еды' width={0} height={0} className='w-[50px] h-[24px] lg:w-[84px] lg:h-[40px]'/>
      <nav className='hidden gap-6 items-center lg:flex'>
        {navInfo.map(({ href, icon: Icon, text }) => (
          <Link key={text} href={href} className="flex items-center active:text-blue-700 hover:text-blue-600">
            <Icon className="w-6 h-6 mr-1" />
            {text}
          </Link>
        ))}
        <Link href='/' className='flex'><Profile/></Link>
      </nav>
      <Link href='/' className='flex lg:hidden'><ShoppingCartIcon className="w-[30px] h-[30px]"/></Link>
    </header>
  )
}

export default Header
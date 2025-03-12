import Image from 'next/image';
import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { menuItemProps } from '@/app/types/types';
import { inter } from '@/app/ui/fonts';

import './menu-card.module.css';

const MenuCard: React.FC<menuItemProps> = ({ menuData }) => {
  return (
    <div
      className={`w-full rounded-[8px] bg-white shadow-(--shadow-card) sm:mx-0 sm:w-[280px] ${inter.className}`}
    >
      <div className="relative mx-4 mt-3 mb-1 h-[120px] overflow-hidden rounded-[8px] sm:w-62">
        <Image src={menuData.imageUrl} sizes="85" alt="Фото блюда" fill />
      </div>
      <h2 className="mx-4 mt-3 text-left text-sm text-gray-800">{menuData.name}</h2>
      <p className="mx-4 mt-3 text-left text-xs text-gray-800"> {menuData.description}</p>
      <p className="mx-4 mt-3 text-left text-xl font-bold text-green-500">{menuData.price} ₽</p>
      <Button className="mx-4 my-5 flex w-[248px] items-center justify-center rounded-[8px] bg-blue-500 px-4 py-2 text-gray-100 transition duration-300 data-[active]:bg-blue-700 data-[hover]:bg-blue-600">
        <ShoppingCartIcon className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default MenuCard;

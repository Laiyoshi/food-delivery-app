import Image from 'next/image';
import { Button, Input } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useCartStore } from '@/store/cartStore';
import { MenuItemProps } from '@/app/types/types';
import { inter } from '@/ui/fonts';

export default function MenuCard({ menuData }: MenuItemProps) {
  const { cart, addToCart, updateQuantity, increaseQuantity, decreaseQuantity, calculateAmount } =
    useCartStore();
  const productInCart = cart.find(item => item.id === menuData.id);

  const handleAddToCart = () => {
    addToCart(menuData, menuData.restaurantId);
    calculateAmount();
  };

  const handleIncreaseQuantity = () => {
    increaseQuantity(menuData.id);
    calculateAmount();
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity(menuData.id);
    calculateAmount();
  };

  const handleUpdateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);

    if (quantity >= 1) {
      updateQuantity(menuData.id, quantity);
    }
    calculateAmount();
  };

  return (
    <div
      className={`w-full rounded-[8px] bg-white shadow-(--shadow-card) sm:mx-0 sm:w-[280px] ${inter.className}`}
    >
      <div className="relative mx-4 mt-3 mb-1 h-[120px] overflow-hidden rounded-[8px] object-cover sm:w-62">
        <Image
          src={menuData.imageUrl}
          sizes="85"
          alt="Фото блюда"
          fill
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-[max-content_1fr] gap-x-2 md:block">
        <h2 className="col-2 row-1 mt-3 mr-4 w-fit self-center text-left text-xs break-all text-gray-800 md:mx-4 md:text-sm">
          {menuData.name}
        </h2>

        <p className="col-span-full row-2 mx-4 mt-3 text-left text-xs text-gray-600 md:text-gray-800">
          {menuData.description}
        </p>

        <p className="row-1 mt-3 ml-4 text-left text-xl font-bold text-green-500 md:mx-4">
          {menuData.price} ₽
        </p>
      </div>

      {!productInCart ? (
        <Button
          onClick={handleAddToCart}
          className="mx-4 my-5 flex w-[calc(100%-32px)] items-center justify-center rounded-[8px] bg-blue-500 px-4 py-2 text-gray-100 transition duration-300 data-[active]:bg-blue-700 data-[hover]:bg-blue-600 md:w-[248px]"
        >
          <ShoppingCartIcon className="h-6 w-6" />
        </Button>
      ) : (
        <div className="mx-4 my-5 flex h-10 justify-center gap-1">
          <Button
            onClick={handleDecreaseQuantity}
            className="h-full w-[43px] rounded bg-blue-500 text-base font-bold text-white"
          >
            -
          </Button>

          <Input
            value={productInCart?.quantity ?? 1}
            min={0}
            onChange={handleUpdateQuantity}
            className="h-full w-[80%] rounded border-2 border-gray-300 text-center font-bold text-gray-800 md:w-[157px]"
          />

          <Button
            onClick={handleIncreaseQuantity}
            className="h-full w-[43px] rounded bg-blue-500 text-base font-bold text-white"
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

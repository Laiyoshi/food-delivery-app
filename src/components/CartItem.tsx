import Image from 'next/image';
import { Button, Input } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { MenuItemProps } from '@/app/types/types';
import { useCartStore } from '@/store/cartStore';

export default function CartItem({ menuData }: MenuItemProps) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateAmount,
  } = useCartStore();

  const productInCart = cart.find(item => item.id === menuData.id);

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
      calculateAmount();
    }
  };

  const handleRemoveCart = () => {
    removeFromCart(menuData.id);
    calculateAmount();
  };

  return (
    <div className="mx-4 h-fit items-center rounded-[8px] shadow-(--shadow-card) sm:w-[calc(100-2vw)] md:w-[calc(100vw-70px)] lg:w-[650px] xl:w-[800px]">
      <div className="mx-4 my-3 grid grid-cols-[max-content_1fr_1fr] items-center">
        <div className="relative col-1 row-1 h-20 w-20 rounded-[80px] sm:max-h-[13vh] sm:min-w-[15vw] md:min-w-[14vw] xl:min-w-[8vw] 2xl:min-w-[7vw]">
          <Image
            src={menuData.imageUrl}
            fill
            sizes="85"
            alt="Фото блюда"
            className="rounded-[8px] object-cover"
          />
        </div>

        <div className="col-[2/4] row-1 ml-2 min-h-23 md:ml-5 lg:self-start">
          <h2 className="text-xs font-bold text-gray-800 md:text-base">{menuData.name}</h2>
          <p className="mb-1 max-w-[220px] text-xs text-wrap text-gray-600 sm:max-w-full md:text-sm">
            {menuData.description}
          </p>
          <p className="col-1 row-2 text-xl font-bold text-green-500 md:text-2xl lg:col-2 lg:row-1 lg:self-end">
            {menuData.price * (productInCart?.quantity ?? 1)} ₽
          </p>
        </div>

        <XMarkIcon
          onClick={handleRemoveCart}
          className="col-3 row-1 h-6 w-6 cursor-pointer self-start justify-self-end text-gray-800"
        />

        <div className="col-[2/4] row-2 mt-1 ml-1 flex h-10 gap-1 md:ml-5 md:w-full lg:col-3 lg:row-1 lg:mr-3 lg:ml-0 lg:justify-end lg:self-end">
          <Button
            onClick={handleDecreaseQuantity}
            className="h-full w-[40px] rounded bg-blue-500 text-base font-bold text-white transition duration-300 hover:bg-blue-700"
          >
            -
          </Button>

          <Input
            value={productInCart?.quantity ?? 1}
            onChange={handleUpdateQuantity}
            min={0}
            className="h-full w-[calc(100%-80px)] rounded border-2 border-gray-300 text-center font-bold text-gray-800 md:w-47 lg:max-w-[69px]"
          />

          <Button
            onClick={handleIncreaseQuantity}
            className="h-full w-[40px] rounded bg-blue-500 text-base font-bold text-white transition duration-300 hover:bg-blue-700"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

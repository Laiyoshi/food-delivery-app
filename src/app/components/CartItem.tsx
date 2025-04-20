import Image from 'next/image';
import { Button, Input } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { useStore } from '@/app/store/store';
import { menuItemProps } from '@/app/types/types';

const CartItem: React.FC<menuItemProps> = ({ menuData }) => {
  const { cart, updateQuantity, removeFromCart, increaseQuantity, decreaseQuantity } = useStore();
  const productInCart = cart.find(item => item.id === menuData.id);

  function handleIncreaseQuantity() {
    increaseQuantity(menuData.id);
  }

  function handleDecreaseQuantity() {
    decreaseQuantity(menuData.id);
  }

  function handleUpdateQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const quantity = Number(e.target.value);
    if (quantity >= 1) {
      updateQuantity(menuData.id, quantity);
    }
  }

  function handleRemoveCart() {
    removeFromCart(menuData.id);
  }
  return (
    <div className="sm:w-[calc(100%-20vw) lg:w-[calc(800px-20vw) mx-4 h-fit w-full items-center rounded-[8px] shadow-(--shadow-card) md:w-[calc(100vw-32px)] xl:w-[800px]">
      <div className="mx-4 my-3 grid grid-cols-[max-content_1fr_1fr] items-center">
        <div className="relative col-1 row-1 h-20 w-20">
          <Image
            src="/images/food2-cart.png"
            fill
            sizes="85"
            alt="Фото блюда"
            className="object-contain"
          />
        </div>
        <div className="col-[2/4] row-1 ml-2 md:ml-5 lg:self-start">
          <h2 className="text-xs font-bold text-gray-800 md:text-base">{menuData.name}</h2>
          <p className="text-xs text-gray-600 md:text-sm">{menuData.description}</p>
        </div>
        <p className="col-1 row-2 text-xl font-bold text-green-500 md:text-2xl lg:col-2 lg:row-1 lg:ml-5 lg:self-end">
          {menuData.price * (productInCart?.quantity ?? 1)} ₽
        </p>
        <XMarkIcon
          onClick={handleRemoveCart}
          className="col-3 row-1 h-6 w-6 cursor-pointer self-start justify-self-end text-gray-800"
        />
        <div className="col-[2/4] row-2 mt-1 ml-1 flex h-10 gap-1 md:ml-5 md:w-full lg:col-3 lg:row-1 lg:mr-3 lg:ml-0 lg:justify-end lg:self-end">
          <Button
            onClick={handleDecreaseQuantity}
            className="h-full w-[40px] rounded bg-blue-500 text-base font-bold text-white"
          >
            -
          </Button>
          <Input
            className="h-full w-[calc(100%-80px)] rounded border-2 border-gray-300 text-center font-bold text-gray-800 md:w-43 lg:max-w-[69px]"
            value={productInCart?.quantity ?? 1}
            min={0}
            onChange={handleUpdateQuantity}
          />
          <Button
            onClick={handleIncreaseQuantity}
            className="h-full w-[40px] rounded bg-blue-500 text-base font-bold text-white"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

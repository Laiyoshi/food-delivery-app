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
    <div className="flex h-fit max-w-[880px] items-center rounded-[8px] shadow-(--shadow-card)">
      <div className="mx-4 my-3 flex items-center">
        <div className="relative h-20 w-20">
          <Image src="/images/food2-cart.png" fill sizes="85" alt="Фото блюда" />
        </div>
        <div className="ml-3 w-[586px]">
          <h2 className="text-base font-bold text-gray-800">{menuData.name}</h2>
          <p className="text-sm text-gray-600">{menuData.description}</p>
          <p className="text-2xl font-bold text-green-500">
            {menuData.price * (productInCart?.quantity ?? 1)} ₽
          </p>
        </div>
        <div className="ml-2.5 flex max-w-[160px] flex-col items-center gap-4">
          <XMarkIcon
            onClick={handleRemoveCart}
            className="h-6 w-6 cursor-pointer self-end text-gray-800"
          />
          <div className="flex h-10 gap-1">
            <Button
              onClick={handleDecreaseQuantity}
              className="h-full w-[43px] rounded bg-blue-500 text-base font-bold text-white"
            >
              -
            </Button>
            <Input
              className="h-full max-w-[69px] rounded border-2 border-gray-300 text-center font-bold text-gray-800"
              value={productInCart?.quantity ?? 1}
              min={0}
              onChange={handleUpdateQuantity}
            />
            <Button
              onClick={handleIncreaseQuantity}
              className="h-full w-[43px] rounded bg-blue-500 text-base font-bold text-white"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

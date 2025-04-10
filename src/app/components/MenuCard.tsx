import Image from 'next/image';
import { Button, Input } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useStore } from '@/app/store/store';
import { menuItemProps } from '@/app/types/types';
import { inter } from '@/app/ui/fonts';

const MenuCard: React.FC<menuItemProps> = ({ menuData }) => {
  const { cart, addToCart, updateQuantity, increaseQuantity, decreaseQuantity } = useStore();
  const productInCart = cart.find(item => item.id === menuData.id);

  function handleAddToCart() {
    addToCart(menuData);
  }

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
      {!productInCart ? (
        <Button
          onClick={handleAddToCart}
          className="mx-4 my-5 flex w-[248px] items-center justify-center rounded-[8px] bg-blue-500 px-4 py-2 text-gray-100 transition duration-300 data-[active]:bg-blue-700 data-[hover]:bg-blue-600"
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
            className="h-full w-[157px] rounded border-2 border-gray-300 text-center font-bold text-gray-800"
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
      )}
    </div>
  );
};

export default MenuCard;

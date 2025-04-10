'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useStore } from '../store/store';

const CartButton = () => {
  const { cart, cartAmount, updateAmount } = useStore();
  const router = useRouter();
  useEffect(() => {
    updateAmount();
  }, [cart, updateAmount]);

  return (
    cartAmount > 0 && (
      <Button
        onClick={() => router.push('/cart')}
        className="fixed right-5 bottom-20 flex w-fit cursor-pointer items-center justify-evenly gap-2 rounded-xl bg-blue-600 px-2.5 py-4 transition duration-300 hover:bg-blue-700 md:right-15 md:bottom-10 lg:right-33"
      >
        <ShoppingCartIcon className="h-6 w-6 text-white" />
        <p className="font-semibold text-white">{cartAmount} ₽</p>
      </Button>
    )
  );
};

export default CartButton;

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

import { useCartStore } from '@/store/cartStore';

export default function CartButton() {
  const { cartAmount } = useCartStore();
  const router = useRouter();

  return (
    cartAmount > 0 && (
      <Button
        onClick={() => router.push('/cart')}
        className="fixed right-7 bottom-20 flex w-fit max-w-[120px] flex-col items-center justify-evenly gap-2 rounded-xl bg-blue-600 px-2.5 py-4 transition duration-300 hover:bg-blue-700 md:right-15 md:bottom-10 lg:right-33"
      >
        <h3 className="text-sm font-semibold text-white">Ваша корзина</h3>
        <div className="flex gap-3">
          <ShoppingCartIcon className="h-6 w-6 text-white" />
          <p className="font-semibold text-white">{cartAmount} ₽</p>
        </div>
      </Button>
    )
  );
}

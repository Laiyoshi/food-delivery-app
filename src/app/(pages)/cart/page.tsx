'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

import CartItem from '@/app/components/CartItem';
import { useStore } from '@/app/store/store';
import { inter, roboto } from '@/app/ui/fonts';

const Cart = () => {
  const { cart, cartAmount, clearCart, updateAmount } = useStore();
  const router = useRouter();

  function handlePostOrder() {
    const orderData = {
      menuData: cart.map(item => ({
        menuItemId: item.id,
        menuItemName: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      orderAmount: cartAmount,
    };

    console.log(orderData);
    clearCart();
  }

  useEffect(() => {
    updateAmount();
  }, [cart, updateAmount]);

  return (
    <div
      className={`mx-4 w-[calc(100%-32px)] md:max-w-[1440px] xl:mx-auto xl:max-w-[1180px] ${inter.className}`}
    >
      <h2
        className={`${roboto.className} mt-8 mb-6 hidden text-3xl font-bold text-gray-800 md:mx-4 md:block`}
      >
        Ваша корзина
      </h2>
      <div className="mx-4 my-8 flex items-center md:hidden">
        <Button
          className="flex cursor-pointer items-center justify-start gap-2"
          onClick={() => router.push('/')}
        >
          <ArrowLongLeftIcon className="flex h-6" />
          <h2 className={`${roboto.className} text-2xl font-bold text-gray-800`}>Ваша корзина</h2>
        </Button>
      </div>
      <div className="mr-4 gap-2 md:flex md:justify-between">
        <div className="flex flex-col gap-2">
          {cart.length > 0 ? (
            cart.map((item, index) => <CartItem key={index} menuData={item} />)
          ) : (
            <p className="text-xl md:min-w-[880px]">Ваша корзина пуста</p>
          )}
        </div>
        <div className="fixed bottom-0 left-0 h-[172px] w-full rounded-[8px] border border-gray-300 px-4 pt-3 pb-4 shadow-(--shadow-card) lg:static lg:ml-4 lg:w-[280px]">
          <h2 className="font-bold">Общая сумма заказа</h2>
          <div className="my-1 flex flex-row-reverse items-center justify-between gap-1 sm:flex-col sm:items-start md:my-3">
            <p className="text-sm text-gray-600">{cart.length} блюда</p>
            <p className="text-2xl font-bold text-green-500">{cartAmount} ₽</p>
          </div>
          <Button
            onClick={handlePostOrder}
            className="w-full rounded bg-blue-500 py-2 text-center text-base font-bold text-white"
          >
            Оформление заказа
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

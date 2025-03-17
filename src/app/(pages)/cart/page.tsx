'use client';

import React from 'react';
import { Button } from '@headlessui/react';

import CartItem from '@/app/components/CartItem';
import { useStore } from '@/app/store/store';
import { inter, roboto } from '@/app/ui/fonts';

const Cart = () => {
  const { cart, clearCart } = useStore();
  const cartAmount = cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

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
  return (
    <div className={`max-w-[1440px] lg:mx-[75px] xl:mx-auto xl:max-w-[1180px] ${inter.className}`}>
      <h2 className={`${roboto.className} mt-8 mb-6 text-3xl font-bold text-gray-800`}>
        Ваша корзина
      </h2>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          {cart.length > 0 ? (
            cart.map((item, index) => <CartItem key={index} menuData={item} />)
          ) : (
            <p className="min-w-[880px] text-xl">Ваша корзина пуста</p>
          )}
        </div>
        <div className="h-[172px] w-[280px] rounded-[8px] px-4 pt-3 pb-4 shadow-(--shadow-card)">
          <h2 className="font-bold">Общая сумма заказа</h2>
          <div className="my-3 flex flex-col gap-1">
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

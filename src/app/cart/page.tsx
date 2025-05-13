'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ArrowLongLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import CartItem from '@/components/CartItem';
import { useCartStore } from '@/store/cartStore';
import { useUserStore } from '@/store/userStore';
import { inter, roboto } from '@/ui/fonts';
import { fetchPostOrder } from '@/utils/data';

export default function Cart() {
  const { cart, restaurantId, clearCart } = useCartStore();
  const cartAmount = useCartStore(state => state.cartAmount);
  const router = useRouter();
  const { userId, paymentMethodId, deliveryAddressId } = useUserStore();

  const handlePostOrder = async () => {
    const orderPayload = {
      userId: userId!,
      deliveryAddressId: deliveryAddressId!,
      paymentMethodId: paymentMethodId!,
      restaurantId: restaurantId!,
      cart: cart.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      orderAmount: cartAmount,
    };

    try {
      const result = await fetchPostOrder(orderPayload);

      if (result.status === 401) {
        router.push('/login?callbackUrl=cart');
        return;
      }

      clearCart();

      router.push(`/success?orderId=${result.orderId}`);
    } catch (err) {
      console.error('Ошибка при оформлении:', err);
    }
  };

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
          onClick={() => router.push('/')}
          className="flex cursor-pointer items-center justify-start gap-2 transition duration-300 hover:bg-blue-700"
        >
          <ArrowLongLeftIcon className="flex h-6" />
          <h2 className={`${roboto.className} text-2xl font-bold text-gray-800`}>Ваша корзина</h2>
        </Button>
      </div>
      <div className="lg:flex lg:gap-4">
        {cart.length > 0 ? (
          <div className="scrollbar relative box-content max-h-[60vh] min-w-auto gap-2 overflow-auto md:flex md:max-h-[73vh] md:justify-between lg:max-h-[76vh] lg:pb-5 xl:max-h-[70vh]">
            <div className="flex flex-col gap-4">
              {cart.map((item, index) => (
                <CartItem key={index} menuData={item} />
              ))}
              <div className="h-2 shrink-0" />
            </div>
          </div>
        ) : (
          <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-5 self-center">
            <div className="relative m-0">
              <ShoppingCartIcon className="w-40 stroke-blue-400" />
            </div>
            <p className="text-center text-4xl text-blue-400 md:max-w-[580px]">
              В корзине пока ничего нет.
            </p>
            <Link
              href="/"
              className="text-2xl text-orange-400 underline underline-offset-5 transition duration-300 hover:text-orange-500"
            >
              Сделайте свой заказ!
            </Link>
          </div>
        )}

        {cart.length > 0 ? (
          <div className="fixed bottom-0 left-0 h-[172px] w-full rounded-[8px] border border-gray-300 bg-white px-4 pt-2 pb-4 shadow-(--shadow-card) lg:static lg:max-w-70">
            <h2 className="font-bold">Общая сумма заказа</h2>
            <div className="my-1 flex flex-row-reverse items-center justify-between gap-1 sm:flex-col sm:items-start md:my-3">
              <p className="text-sm text-gray-600">Количество блюд: {cart.length}</p>
              <p className="text-2xl font-bold text-green-500">{cartAmount} ₽</p>
            </div>
            <Button
              onClick={handlePostOrder}
              className="w-full rounded bg-blue-500 py-2 text-center text-base font-bold text-white transition duration-300 hover:bg-blue-700"
            >
              Оформление заказа
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

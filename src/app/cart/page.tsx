'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@headlessui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

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
            className="w-full rounded bg-blue-500 py-2 text-center text-base font-bold text-white transition duration-300 hover:bg-blue-700"
          >
            Оформление заказа
          </Button>
        </div>
      </div>
    </div>
  );
}

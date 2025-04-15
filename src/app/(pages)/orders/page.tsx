'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BackArrow from '@/app/components/BackArrow';
import OrderItem from '@/app/components/OrderItem';
import { OrderItemProps } from '@/app/types/types';
import { useUserStore } from '@/app/store/store';

const OrdersPage = () => {
  const { userId } = useUserStore();
  const [orders, setOrders] = useState<OrderItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push('/login?callbackUrl=orders');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'user-id': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Не удалось загрузить заказы');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, router]);

  if (loading) {
    return (
    <div className="mx-5 max-w-[1440px] lg:mx-8 xl:mx-auto xl:max-w-[1180px]">
      <div className="mt-5 mb-5 flex items-center lg:mt-8 lg:mb-8 gap-2">
        <BackArrow />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Ваши заказы</h2>
      </div>
    </div>
    )  
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className="mx-5 max-w-[1440px] lg:mx-8 xl:mx-auto xl:max-w-[1180px]">
      <div className="mt-5 mb-5 flex items-center lg:mt-8 lg:mb-8 gap-2">
        <BackArrow />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Ваши заказы</h2>
      </div>
      <div>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          orders.map(order => (
            <OrderItem
              key={order.id}
              id={order.id}
              orderDate={order.orderDate}
              restaurant={order.restaurant}
              amount={order.amount}
              status={order.status}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
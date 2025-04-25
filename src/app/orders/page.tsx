'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BackArrow from '@/components/BackArrow';
import MobileBackground from '@/components/MobileBackground';
import OrderItem from '@/components/OrderItem';
import { useUserStore } from '@/store/userStore';

type OrderItemProps = {
  id: number;
  orderDate: string; // ISO-формат даты
  restaurant: string;
  amount: number; // Сумма заказа
  status: 'Создан' | 'В пути' | 'Доставлен'; // Перечисление статусов
}

export default function OrdersPage() {
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
        <div className="mt-5 mb-5 flex items-center gap-2 lg:mt-8 lg:mb-8">
          <BackArrow />
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Ваши заказы</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <MobileBackground />
      <div className="relative mx-5 lg:mx-13 xl:mx-auto xl:max-w-[1180px]">
        <div className="mt-5 mb-5 flex items-center gap-2 lg:mt-8 lg:mb-8">
          <BackArrow />
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Ваши заказы</h2>
        </div>
        <div className="flex flex-col-reverse">
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
    </div>
  );
}

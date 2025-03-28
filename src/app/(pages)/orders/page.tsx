'use client';

import React, { useEffect, useState } from 'react';
import OrderItem from '@/app/components/OrderItem';
import { OrderItemProps } from '@/app/types/types';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
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
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="max-w-[1440px] mx-5 lg:mx-8 xl:max-w-[1180px] xl:mx-auto">
      <div className="flex items-center mt-5 mb-5 lg:mt-8 lg:mb-8">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => window.history.back()}
          className=" rounded-full hover:bg-gray-100 focus:outline-none lg:hidden">
          <ArrowLongLeftIcon className="w-8 h-8 mr-2 text-gray-800" />
        </button>
        {/* Заголовок */}
        <h2 className="text-3xl font-bold text-gray-800">Все заказы</h2>
      </div>
      <div>
        {orders.length === 0 ? (
          <p>У вас пока нет заказов.</p>
        ) : (
          orders.map((order, id) => (
            <OrderItem
              key={id}
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
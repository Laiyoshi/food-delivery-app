import React from 'react';

import BackArrow from '@/app/components/BackArrow';
import OrderItem from '@/app/components/OrderItem';
import { OrderItemProps } from '@/app/types/types';

const fetchOrders = async (): Promise<OrderItemProps[]> => {
  const response = await fetch(`${process.env.BASE_URL}/api/orders`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Не удалось загрузить заказы');
  }
  return response.json();
};

const OrdersPage = async () => {
  let orders: OrderItemProps[] = [];
  try {
    orders = await fetchOrders();
  } catch (error) {
    return <p>Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>;
  }

  return (
    <div className="mx-5 max-w-[1440px] lg:mx-8 xl:mx-auto xl:max-w-[1180px]">
      <div className="mt-5 mb-5 flex items-center lg:mt-8 lg:mb-8 gap-2">
        {/* Кнопка "Назад" */}
        <BackArrow />
        {/* Заголовок */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Все заказы</h2>
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

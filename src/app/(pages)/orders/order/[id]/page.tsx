import React from 'react';

import OrderInfo from '@/app//components/OrderInfo';
import OrderReview from '@/app//components/OrderReview';
import BackArrow from '@/app/components/BackArrow';
import RepeatOrderButton from '@/app/components/RepeatOrderButton';
import { OrderData } from '@/app/types/types';

async function fetchOrder(id: string): Promise<OrderData> {
  const response = await fetch(`${process.env.BASE_URL}/api/orders/${id}`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные о заказе');
  }
  return response.json();
}

const OrderDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // Ожидаем params перед использованием
  const order = await fetchOrder(id);

  return (
    <div className="mx-5 max-w-[1440px] lg:mx-8 xl:mx-auto xl:max-w-[1180px]">
      <div className="mt-5 mb-5 flex items-center lg:mt-8 lg:mb-8 gap-2">
        {/* Кнопка "Назад" */}
        <BackArrow />
        {/* Заголовок */}
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Информация о заказе</h2>
      </div>
      <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-2">
        <div>
          <OrderInfo order={order} />
          <div className="mt-4">
            <RepeatOrderButton orderId={order.orderId} />
          </div>
        </div>
        <OrderReview orderId={order.orderId} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;

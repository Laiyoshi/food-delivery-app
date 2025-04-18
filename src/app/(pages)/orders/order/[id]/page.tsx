import React from 'react';

import OrderInfo from '@/app//components/OrderInfo';
import OrderReview from '@/app//components/OrderReview';
import BackArrow from '@/app/components/BackArrow';
import MobileBackground from '@/app/components/MobileBackground';
import OrderMap from '@/app/components/OrderMap';
import OrderStatusIndicator from '@/app/components/OrderStatusIndicator';
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
    <div>
      <MobileBackground />
      <div className="relative mx-5 lg:mx-13 xl:mx-auto xl:max-w-[1180px]">
        <div className="mt-5 mb-5 flex items-center gap-2 lg:mt-8 lg:mb-8">
          {/* Кнопка "Назад" */}
          <BackArrow />
          {/* Заголовок */}
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Информация о заказе</h2>
        </div>
        <OrderStatusIndicator status={order.status} />
        <div className="mb-5 grid grid-cols-1 items-start gap-2 lg:grid-cols-2">
          <div>
            <OrderInfo order={order} />
            {order.status === 'Доставлен' && (
              <div className="mt-2">
                <RepeatOrderButton orderId={order.id} />
              </div>
            )}
          </div>
          {order.status !== 'Доставлен' && <OrderMap mapImageUrl="/images/map.png" />}
          {order.status === 'Доставлен' && <OrderReview orderId={order.id} />}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

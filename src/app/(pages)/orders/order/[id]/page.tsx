import React from 'react';
import OrderInfo from '@/app//components/OrderInfo';
import OrderReview from '@/app//components/OrderReview';
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
    <div className="max-w-[1440px] mx-5 lg:mx-8 xl:max-w-[1180px] xl:mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <OrderInfo order={order} />
        <OrderReview orderId={order.orderId} />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
import OrderInfo from '@/app//components/OrderInfo';
import OrderReview from '@/app//components/OrderReview';
import BackArrow from '@/app/components/BackArrow';
import CallCourierButton from '@/app/components/CallCourierButton';
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

type Params = {
  id: string;
};

export default async function OrderDetailsPage({ params }: { params: Params }) {
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
        <OrderStatusIndicator
          status={order.status}
          orderDate={order.orderDate}
          deliveryTimeMinutes={order.deliveryTimeMinutes}
        />
        <div className="mb-5 grid grid-cols-1 items-start gap-2 lg:grid-cols-2">
          <div>
            <OrderInfo order={order} />
            {order.status === 'Доставлен' && (
              <div className="mt-2">
                <RepeatOrderButton orderId={order.id} />
              </div>
            )}
          </div>
          {order.status !== 'Доставлен' && (
            <div className="flex flex-col gap-2">
              <OrderMap mapImageUrl="/images/map.png" />
              <CallCourierButton phone={order.courierPhone} />
            </div>
          )}
          {order.status === 'Доставлен' && <OrderReview orderId={order.id} />}
        </div>
      </div>
    </div>
  );
}

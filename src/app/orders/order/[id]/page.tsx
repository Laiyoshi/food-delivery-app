import OrderInfo from '@/components/OrderInfo';
import OrderReview from '@/components/OrderReview';
import BackArrow from '@/components/BackArrow';
import CallCourierButton from '@/components/CallCourierButton';
import MobileBackground from '@/components/MobileBackground';
import OrderStatusIndicator from '@/components/OrderStatusIndicator';
import RepeatOrderButton from '@/components/RepeatOrderButton';
import { OrderData } from '@/app/types/types';

async function fetchOrder(id: string): Promise<OrderData> {
  const response = await fetch(`${process.env.BASE_URL}/api/orders/${id}`);
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные о заказе');
  }
  
  return response.json();
}

async function fetchReview(orderId: string) {
  const response = await fetch(`${process.env.BASE_URL}/api/reviews?orderId=${orderId}`);
  if (!response.ok) {
    return null; // Если отзыва нет, возвращаем null
  }
  return response.json();
}

type Params = {
  id: string;
};

export default async function OrderDetailsPage({ params }: { params: Params }) {
  const { id } = await params;
  const order = await fetchOrder(id);
  const review = await fetchReview(id);

  return (
    <div>
      <MobileBackground />
      <div className="relative mx-5 lg:mx-13 xl:mx-auto xl:max-w-[1180px]">
        <div className="mt-5 mb-5 flex items-center gap-2 lg:mt-8 lg:mb-8">
          <BackArrow />
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Информация о заказе №{order.id}</h2>
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
              <div className="relative h-[300px] w-full overflow-hidden rounded-lg border-1 border-gray-300 shadow-(--shadow-card) lg:h-[300px]">
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A73344d14c028bcb6c4be6899ca3fc8db7eb26041ed58b17b3b122bdfa72c52e8&amp;source=constructor" className='w-full h-full'></iframe>
              </div>
              <CallCourierButton phone={order.courierPhone} />
            </div>
          )}
          {order.status === 'Доставлен' && <OrderReview orderId={order.id} existingReview={review} />}
        </div>
      </div>
    </div>
  );
}

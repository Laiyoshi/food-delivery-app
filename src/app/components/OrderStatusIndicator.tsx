type Props = {
  status: string;
  orderDate: string;
  deliveryTimeMinutes: number;
};

export default function OrderStatusIndicator({ status, orderDate, deliveryTimeMinutes }: Props) {
  const calculateDeliveryTime = () => {
    if (!orderDate || isNaN(deliveryTimeMinutes) || deliveryTimeMinutes <= 0) {
      return 'Ошибка данных';
    }
    const orderDateTime = new Date(orderDate);

    if (isNaN(orderDateTime.getTime())) {
      return 'Неверная дата';
    }
    const estimatedTime = new Date(orderDateTime.getTime() + deliveryTimeMinutes * 60000);
    const hours = estimatedTime.getHours().toString().padStart(2, '0');
    const minutes = estimatedTime.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const estimatedDelivery = calculateDeliveryTime();
  const statusColors: { [key: string]: string } = {
    Создан: 'bg-yellow-500',
    'В пути': 'bg-blue-500',
    Доставлен: 'bg-green-500',
  };

  const colorClass = statusColors[status] || 'bg-gray-300';

  return (
    <div className="mt-4 mb-4">
      <div className="flex flex-col justify-between text-sm text-gray-800 sm:flex-row sm:items-center md:text-base">
        <div className="flex items-center">
          Статус заказа:
          <span
            className={`ml-2 rounded-full px-3 py-1 text-base font-bold text-white md:text-xl ${colorClass}`}
          >
            {status}
          </span>
        </div>
        {status !== 'Доставлен' && (
          <span className="text-sm text-gray-500">
            Ожидаемое время доставки:{' '}
            <span className="text-base font-bold text-gray-800 lg:text-xl">
              {estimatedDelivery}
            </span>
          </span>
        )}
      </div>
      <div className="relative mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
        <div
          className={`h-full rounded ${colorClass}`}
          style={{ width: `${getStatusProgress(status)}%` }}
        />
      </div>
    </div>
  );
}

// Функция для определения прогресса шкалы в зависимости от статуса
const getStatusProgress = (status: string): number => {
  switch (status) {
    case 'Создан':
      return 25;
    case 'В пути':
      return 75;
    case 'Доставлен':
      return 100;
    default:
      return 0;
  }
};

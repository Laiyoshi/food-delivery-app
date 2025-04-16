import React from 'react';

interface OrderStatusIndicatorProps {
  status: string; // Текущий статус заказа
}

const OrderStatusIndicator: React.FC<OrderStatusIndicatorProps> = ({ status }) => {
  // Цвета для каждого статуса
  const statusColors: { [key: string]: string } = {
    Создан: 'bg-yellow-500',
    'В пути': 'bg-blue-500',
    Доставлен: 'bg-green-500',
  };

  // Получаем цвет для текущего статуса
  const colorClass = statusColors[status] || 'bg-gray-300'; // По умолчанию серый

  return (
    <div className="mt-4 mb-4">
      {/* Текстовый статус */}
      <p className="flex items-center text-sm text-gray-800 md:text-base">
        Статус заказа:
        <span
          className={`ml-2 rounded-full px-3 py-1 text-base font-bold text-white md:text-xl ${colorClass}`}
        >
          {status}
        </span>
      </p>

      {/* Шкала прогресса */}
      <div className="relative mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
        {/* Заполненная часть шкалы */}
        <div
          className={`h-full rounded ${colorClass}`}
          style={{ width: `${getStatusProgress(status)}%` }}
        />
      </div>
    </div>
  );
};

// Функция для определения прогресса шкалы в зависимости от статуса
const getStatusProgress = (status: string): number => {
  switch (status) {
    case 'Создан':
      return 25; // 30% заполнения
    case 'В пути':
      return 75; // 70% заполнения
    case 'Доставлен':
      return 100; // 100% заполнения
    default:
      return 0;
  }
};

export default OrderStatusIndicator;

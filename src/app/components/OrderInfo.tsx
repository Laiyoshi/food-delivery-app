'use client';

import { OrderData } from '@/app/types/types';

type Props = {
  order: OrderData;
};

export default function OrderInfo({ order }: Props) {
  return (
    <div className="rounded-lg border-1 border-gray-300 bg-white p-6 shadow-(--shadow-card)">
      <div className="mb-2 flex flex-row justify-between text-sm md:mb-4 md:text-base">
        <div className="flex flex-row gap-4">
          <p className="font-bold text-gray-500">
            {new Date(order.orderDate)
              .toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })
              .replace('г.', '')}
          </p>
          <p className="font-bold text-gray-500">
            {new Date(order.orderDate).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <p className={`${order.status === 'Доставлен' ? 'text-green-500' : 'text-yellow-500'}`}>
          {order.status}
        </p>
      </div>

      <h3 className="mb-2 text-base font-bold text-gray-800 md:mb-4 md:text-xl">
        «{order.restaurant}»
      </h3>

      <ul className="mb-2 text-sm md:mb-4 md:text-base">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between border-b border-gray-300 pt-2 pb-1">
            <span className="w-1/2 text-left">{item.name}</span>
            <span className="w-1/4 text-left">{item.quantity} шт.</span>
            <span className="w-1/4 text-right">{item.price} ₽</span>
          </li>
        ))}
      </ul>
      
      <div className="mb-2 md:mb-4">
        <p className="text-end text-sm text-gray-600 md:text-base">
          Итого:{' '}
          <span className="ml-2 text-base font-bold text-gray-800 md:text-xl">{order.total} ₽</span>
        </p>
      </div>

      {/* Детали доставки */}
      <div className="text-sm md:text-base">
        <h4 className="mb-2 text-sm font-bold text-gray-800 md:mb-4 md:text-base">
          Детали доставки:
        </h4>

        <div className="mb-2 flex flex-col justify-between gap-2 text-gray-600 md:mb-4 md:flex-row md:gap-4">
          <p className="text-gray-800">
            <span className="mr-2 text-xs text-gray-400">Адрес</span>
            {order.deliveryAddress}
          </p>
          <p className="text-gray-800">
            <span className="mr-2 text-xs text-gray-400">Оплата</span>
            {order.paymentMethod}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-gray-800 md:flex-row">
          <span className="text-xs text-gray-400 md:self-center">Курьер</span>
          <div className="flex flex-row justify-between gap-2">
            <p className="">{order.courierName}</p>
            <p>{order.courierPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Импорт useRouter для навигации

type Props = {
  id: number;
  orderDate: string;
  restaurant: string;
  amount: number;
  status: 'Создан' | 'В пути' | 'Доставлен';
};

export function OrderItem({ id, orderDate, restaurant, amount, status }: Props) {
  const router = useRouter(); // Хук для навигации

  const statusColor =
    status === 'Доставлен'
      ? 'text-green-500'
      : status === 'В пути'
        ? 'text-blue-500'
        : 'text-yellow-500';

  return (
    <div className="mb-1 flex flex-col rounded-lg bg-white px-8 py-2 text-sm shadow-(--shadow-card) md:text-base lg:flex-row lg:gap-5">
      <div className="mb-2 flex flex-row items-center justify-between lg:mb-0 lg:w-full">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
          {/* Дата и время */}
          <div className="">
            <span className="mr-8 text-gray-800">
              {new Date(orderDate)
                .toLocaleDateString('ru-RU', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
                .replace('г.', '')}
            </span>
            <span className="text-gray-600">
              {new Date(orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Название ресторана */}
          <div className="text-gray-800">«{restaurant}»</div>
        </div>
        {/* Сумма и статус */}
        <div className="flex flex-col-reverse gap-2 lg:flex-row lg:gap-5">
          <span className="min-w-[100px] text-right font-bold text-gray-800">{amount} ₽</span>
          <span className={`${statusColor} min-w-[90px] text-right lg:text-left`}>{status}</span>
        </div>
      </div>
      {/* Кнопка "Подробнее" */}
      <button
        onClick={() => router.push(`/orders/order/${id}`)} // Переход на страницу с информацией о заказе
        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-100 lg:max-w-[248px] lg:min-w-[248px]"
      >
        Подробнее
      </button>
    </div>
  );
}

'use client';

import React from 'react';
import { OrderItemProps } from '@/app/types/types';

const OrderItem: React.FC<OrderItemProps> = ({ orderDate, restaurant, amount, status }) => {
  const statusColor =
    status === 'Доставлен'
      ? 'text-green-500'
      : status === 'В пути'
      ? 'text-blue-500'
      : 'text-yellow-500';

  return (
    <div className="flex flex-col bg-white shadow-(--shadow-card) mb-1 py-2 px-8 rounded-lg lg:flex-row lg:gap-5 ">
      <div className="flex flex-row justify-between items-center mb-2 lg:mb-0 lg:w-full">
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
          {/* Дата и время */}
          <div className="">
          <span className="text-gray-800 mr-8">
            {new Date(orderDate).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
            .replace('г.', '')}
          </span>
            <span className="text-gray-600">{new Date(orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          {/* Название ресторана */}
          <div className="text-gray-800 ">
            «{restaurant}»
          </div>
        </div>
        {/* Сумма и статус */}
        <div className="flex flex-col-reverse gap-2 lg:flex-row lg:gap-5">
          <span className="text-gray-800 font-bold min-w-[100px] text-right">{amount} ₽</span>
          <span className={`${statusColor} min-w-[90px] text-right lg:text-left`}>{status}</span>
        </div>
      </div>
      {/* Кнопка "Подробнее" */}
      <button className="w-full lg:min-w-[248px] lg:max-w-[248px] px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-800 font-bold hover:bg-gray-100">
        Подробнее
      </button>
    </div>
      
  );
};

export default OrderItem;
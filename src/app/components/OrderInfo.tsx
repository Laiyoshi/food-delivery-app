'use client';

import React from 'react';
import { OrderData } from '@/app/types/types';

interface OrderInfoProps {
  order: OrderData;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
  return (
    <div className="bg-white shadow-(--shadow-card) rounded-lg p-6 border-1 border-gray-300">
      <div className="flex flex-row justify-between mb-4">
        <p className="text-base font-bold text-gray-500">
        {new Date(order.orderDate).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              }).replace('г.', '')}
          {' '}
          {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className={`${order.status === 'Доставлен' ? 'text-green-500' : 'text-yellow-500'}`}>
          {order.status}
        </p>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">«{order.restaurant}»</h3>
      <ul className="mb-4 ">
        {order.items.map((item, index) => (
          <li key={index} className="flex justify-between pb-2 border-b border-gray-200">
            <span className="w-1/2 text-left">{item.name}</span>
            <span className="w-1/4 text-left">{item.quantity} шт.</span>
            <span className="w-1/4 text-right">{item.price} ₽</span>
          </li>
        ))}
      </ul>
      <div className=" mb-4 ">
        <p className='text-end text-gray-600'>Итого: <span className="font-bold text-gray-800">{order.total} ₽</span></p>
      </div>

      {/* Детали доставки */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800 mb-2">Детали доставки:</h4>
        <p className="text-gray-600">
          <span className="font-bold">Адрес:</span> {order.deliveryAddress}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Оплата:</span> {order.paymentMethod}
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Курьер:</span> {order.courierName} {order.courierPhone}
        </p>
      </div>
    </div>
  );
};

export default OrderInfo;
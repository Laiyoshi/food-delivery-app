import React from 'react';
import { OrderItemProps } from '@/app/types/types';

const OrderItem: React.FC<OrderItemProps> = ({ orderDate, restaurant, amount, status }) => {
  const statusColor =
    status === 'Доставлен'
      ? 'text-green-500'
      : status === 'В пути'
      ? 'text-yellow-500'
      : 'text-blue-500';

  return (
    <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex flex-rw space-x-4">
        <span className="text-gray-600">{new Date(orderDate).toLocaleDateString()}</span>
        <span className="text-gray-600">{new Date(orderDate).toLocaleTimeString()}</span>
      </div>
      <div className="flex-1 ml-4">
        <span className="text-gray-800">«{restaurant}»</span>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="text-gray-800 font-bold">{amount} ₽</div>
      </div>
      <div className="flex flex-row space-x-4">
        <div className={`${statusColor} text-left ml-4`}>{status}</div>
      </div>
      <button className="ml-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-800">
        Подробнее
      </button>
    </div>
  );
};

export default OrderItem;
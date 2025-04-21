'use client';

import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { useStore } from '@/app/store/store';
import { CartItem } from '@/app/types/types';


interface RepeatOrderButtonProps {
  orderId: number;
  className?: string;
}

const RepeatOrderButton: React.FC<RepeatOrderButtonProps> = ({ orderId, className = '' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { clearCart, addToCart } = useStore();

  const handleRepeatOrder = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error('Не удалось получить данные заказа');
      }
  
      const data = await response.json();
  
      const { items, restaurantId } = data;
  
      if (!restaurantId) {
        throw new Error('Отсутствует информация о ресторане');
      }
  
      if (items.length === 0) {
        throw new Error('Товары заказа не найдены');
      }
  
      // Используем новый метод repeatOrder
      const { repeatOrder } = useStore.getState();
      repeatOrder(items, restaurantId);
  
      alert('Товары из заказа добавлены в корзину!');
    } catch (err) {
      console.error('Ошибка при повторении заказа:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleRepeatOrder}
        disabled={isLoading}
        className={`w-full lg:w-[168px] border-1 border-gray-300 shadow-(--shadow-card) rounded-lg bg-transparent py-3 text-center text-base font-bold text-gray-800 hover:border-gray-400 focus:outline-none disabled:opacity-50 ${className}`}
      >
        {isLoading ? 'Загрузка...' : 'Повторить заказ'}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default RepeatOrderButton;
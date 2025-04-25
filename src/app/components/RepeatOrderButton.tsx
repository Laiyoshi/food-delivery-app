'use client';

import { useState } from 'react';
import { Button } from '@headlessui/react';

import { useCartStore } from '@/app/store/cartStore';

type Props = {
  orderId: number;
  className?: string;
};

export default function RepeatOrderButton({ orderId, className = '' }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const { repeatOrder } = useCartStore.getState();
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
        className={`w-full rounded-lg border-1 border-gray-300 bg-white py-3 text-center text-base font-bold text-gray-800 shadow-(--shadow-card) hover:bg-gray-100 lg:w-[250px] ${className}`}
      >
        {isLoading ? 'Загрузка...' : 'Повторить заказ'}
      </Button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}

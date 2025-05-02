'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartIcon } from '@heroicons/react/24/solid';

import { Restaurant } from '@/app/types/types';
import { useFavoritesStore } from '@/store/favoritesStore';

type Props = {
  restaurantId: string;
  restaurantData: Restaurant;
  isFavorite: boolean;
};

export default function FavoriteButton({ restaurantId, restaurantData, isFavorite }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { toggleFavorite, userId } = useFavoritesStore();

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    if (!userId) {
      router.push('/login');
      return;
    }

    const res = await fetch('/api/restaurants/favorites', {
      method: isFavorite ? 'DELETE' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, restaurantId }),
    });

    if (res.ok) {
      toggleFavorite(restaurantData);
    }

    setLoading(false);
  };

  return (
    <button onClick={handleToggle}>
      <HeartIcon
        className={`absolute top-3 right-3 h-7 w-7 cursor-pointer fill-gray-300 transition-colors hover:fill-red-600 active:fill-red-700 ${
          isFavorite ? 'fill-red-500 transition-colors duration-300' : 'transition duration-200'
        }`}
      />
    </button>
  );
}

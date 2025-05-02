'use client';

import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';

import { Restaurant } from '@/app/types/types';
import { useFavoritesStore } from '@/store/favoritesStore';

type Props = {
  restaurantId: string;
  restaurantData: Restaurant;
  userId: string;
};

export default function FavoriteButton({ restaurantId, userId, restaurantData }: Props) {
  const [loading, setLoading] = useState(false);

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(restaurantId);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    const res = await fetch('/api/restaurants/favorites', {
      method: favorite ? 'DELETE' : 'POST',
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
          favorite ? 'fill-red-500 transition-colors duration-300' : 'transition duration-200'
        }`}
      />
    </button>
  );
}

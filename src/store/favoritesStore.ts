import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Restaurant } from '@/app/types/types';

type FavoritesState = {
  userId: string;
  favorites: Restaurant[];
  allRestaurantsId: string[];
  pendingRemoveIds: string[];

  initializeFavorites: (favorites: Restaurant[], userId: string) => void;
  setAllRestaurantsId: (id: string[]) => void;
  toggleFavorite: (restaurant: Restaurant) => void;
  isFavorite: (restaurantId: string) => boolean;
  finalizeRemoval: () => void;
  resetFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    immer((set, get) => ({
      userId: '',
      favorites: [],
      pendingRemoveIds: [],
      allRestaurantsId: [],

      initializeFavorites: (favorites, userId) => {
        set(state => {
          state.favorites = favorites;
          state.userId = userId;
        });
      },

      setAllRestaurantsId: id => {
        set(state => {
          state.allRestaurantsId.push(...id);
        });
      },

      toggleFavorite: restaurant => {
        set(state => {
          const exists = state.favorites.some(r => r.id === restaurant.id);
          const isPendingRemoval = state.pendingRemoveIds.includes(restaurant.id);

          if (exists) {
            if (isPendingRemoval) {
              state.pendingRemoveIds = state.pendingRemoveIds.filter(id => id !== restaurant.id);
            } else {
              state.pendingRemoveIds.push(restaurant.id);
            }
          } else {
            state.favorites.push(restaurant);
          }

          const updatedFavoritesIds = state.favorites
            .filter(r => !state.pendingRemoveIds.includes(r.id))
            .map(r => r.id);

          state.allRestaurantsId = updatedFavoritesIds;
        });
      },

      isFavorite: restaurantId => {
        const state = get();
        return (
          state.allRestaurantsId.includes(restaurantId) &&
          !state.pendingRemoveIds.includes(restaurantId)
        );
      },

      finalizeRemoval: () => {
        set(state => {
          state.favorites = state.favorites.filter(r => !state.pendingRemoveIds.includes(r.id));
          state.pendingRemoveIds = [];
        });
      },

      cancelPendingRemovals: () => {
        set(state => {
          state.pendingRemoveIds = [];
        });
      },

      resetFavorites: () => {
        set(state => {
          state.userId = '';
          state.favorites = [];
          state.pendingRemoveIds = [];
          state.allRestaurantsId = [];
        });
      },
    })),
    {
      name: 'favorites-storage',
      partialize: state => ({
        favorites: state.favorites,
        userId: state.userId,
      }),
    }
  )
);

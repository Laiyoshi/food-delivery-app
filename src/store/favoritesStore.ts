import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Restaurant } from '@/app/types/types';

type FavoritesState = {
  userId: string;
  favoritesByPage: Record<number, Restaurant[]>; // Кэш избранных по страницам
  pendingRemoveIds: string[];

  initializeFavorites: (favorites: Restaurant[], userId: string, page: number) => void;
  toggleFavorite: (restaurant: Restaurant) => void;
  isFavorite: (restaurantId: string) => boolean;
  getFavoritesForPage: (page: number) => Restaurant[];

  finalizeRemoval: () => void;
  cancelPendingRemovals: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    immer((set, get) => ({
      userId: '',
      favoritesByPage: {},
      pendingRemoveIds: [],

      initializeFavorites: (favorites, userId, page) => {
        set(state => {
          state.favoritesByPage[page] = favorites;
          state.userId = userId;
        });
      },

      toggleFavorite: restaurant => {
        set(state => {
          const pages = Object.keys(state.favoritesByPage).map(Number);
          let found = false;

          for (const page of pages) {
            const index = state.favoritesByPage[page]?.findIndex(r => r.id === restaurant.id) ?? -1;
            if (index > -1) {
              state.favoritesByPage[page].splice(index, 1);
              found = true;
            }
          }

          if (!found) {
            if (!state.favoritesByPage[1]) state.favoritesByPage[1] = [];
            state.favoritesByPage[1].push(restaurant);
          }
        });
      },

      isFavorite: restaurantId => {
        const allPages = Object.values(get().favoritesByPage);
        return allPages.some(page => page.some(r => r.id === restaurantId));
      },

      getFavoritesForPage: (page: number) => {
        return get().favoritesByPage[page] ?? [];
      },

      finalizeRemoval: () => {
        set(state => {
          for (const page in state.favoritesByPage) {
            state.favoritesByPage[+page] = state.favoritesByPage[+page].filter(
              r => !state.pendingRemoveIds.includes(r.id)
            );
          }
          state.pendingRemoveIds = [];
        });
      },

      cancelPendingRemovals: () => {
        set(state => {
          state.pendingRemoveIds = [];
        });
      },
    })),
    {
      name: 'favorites-storage',
      partialize: state => ({
        favoritesByPage: state.favoritesByPage,
        userId: state.userId,
      }),
    }
  )
);

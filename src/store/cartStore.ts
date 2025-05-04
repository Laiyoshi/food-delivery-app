import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { toast } from 'react-toastify';
import { CartItem, Dish } from '@/app/types/types';

type StoreState = {
  cart: CartItem[];
  cartAmount: number;
  restaurantId: string | null;

  calculateAmount: () => void;
  addToCart: (item: Dish, restaurantId: string) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  repeatOrder: (items: CartItem[], restaurantId: string) => void;
};

export const useCartStore = create<StoreState>()(
  immer(
    persist(
      (set, get) => ({
        cart: [],
        cartAmount: 0,
        restaurantId: null,

        calculateAmount: () => {
          const items = get().cart;
          const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
          set({ cartAmount: total });
        },
        addToCart: (dish, restaurantId) =>
          set(state => {
            if (!state.restaurantId || state.restaurantId === restaurantId) {
              const existing = state.cart.find(item => item.id === dish.id);
              if (existing) {
                existing.quantity++;
              } else {
                state.cart.push({ ...dish, quantity: 1 });
              }
              state.restaurantId = restaurantId;
              state.cartAmount = state.cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );
            } else {
              toast.error('Можно заказывать только из одного ресторана.');
            }
          }),
        removeFromCart: id =>
          set(state => {
            state.cart = state.cart.filter(item => item.id !== id);
          }),
        clearCart: () =>
          set(state => {
            state.cart = [];
            state.cartAmount = 0;
            state.restaurantId = null;
          }),
        increaseQuantity: id =>
          set(state => {
            const existItem = state.cart.find(item => item.id === id);
            if (existItem) {
              existItem.quantity++;
            }
          }),
        decreaseQuantity: id =>
          set(state => {
            const item = state.cart.find(item => item.id === id);
            if (!item) {
              return;
            }

            if (item.quantity > 1) {
              item.quantity--;
            } else {
              state.cart = state.cart.filter(i => i.id !== id);
              state.restaurantId = null;
            }
          }),
        updateQuantity: (id, quantity) =>
          set(state => {
            const idxItem = state.cart.findIndex(item => item.id === id);
            if (idxItem === -1) return;

            if (quantity > 0) {
              state.cart[idxItem].quantity = quantity;
            } else {
              state.cart.splice(idxItem, 1);
            }
          }),
        repeatOrder: (items, restaurantId) =>
          set(state => {
            state.cart = items.map(item => ({
              ...item,
              quantity: item.quantity || 1,
            }));

            state.cartAmount = state.cart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            state.restaurantId = restaurantId;
          }),
      }),
      {
        name: 'cart-storage',
        partialize: state => ({
          cart: state.cart,
          cartAmount: state.cartAmount,
          restaurantId: state.restaurantId,
        }),
      }
    )
  )
);

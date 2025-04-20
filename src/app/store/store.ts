import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { StoreState } from '../types/types';

export const useStore = create<StoreState>()(
  persist(
    set => ({
      cart: [],
      cartAmount: 0,

      updateAmount: () =>
        set(state => ({
          cartAmount: state.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
        })),
      addToCart: dish => set(state => ({ cart: [...state.cart, { ...dish, quantity: 1 }] })),
      removeFromCart: id => set(state => ({ cart: state.cart.filter(item => item.id !== id) })),
      clearCart: () => set(() => ({ cart: [] })),
      increaseQuantity: id =>
        set(state => ({
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: id =>
        set(state => ({
          cart: state.cart
            .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter(item => item.quantity > 0),
        })),
      updateQuantity: (id, quantity) =>
        set(state => ({
          cart:
            quantity > 0
              ? state.cart.map(item => (item.id === id ? { ...item, quantity } : item))
              : state.cart.filter(item => item.id !== id),
        })),
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart }),
    }
  )
);


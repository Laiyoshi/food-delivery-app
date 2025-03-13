import { create } from 'zustand';

import { StoreState } from '../types/types';

export const useStore = create<StoreState>(set => ({
  cart: [],
  addToCart: dish => set(state => ({ cart: [...state.cart, { ...dish, quantity: 1 }] })),
  removeFromCart: id => set(state => ({ cart: state.cart.filter(item => item.id !== id) })),
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
}));

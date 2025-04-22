import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartItem, Dish } from '../types/types';

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
  persist(
    set => ({
      cart: [],
      cartAmount: 0,
      restaurantId: null,

      calculateAmount: () =>
        set(state => ({
          cartAmount: state.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0),
        })),
      addToCart: (dish, restaurantId) =>
        set(state => {
          if (!state.restaurantId || state.restaurantId === restaurantId) {
            return {
              cart: [...state.cart, { ...dish, quantity: 1 }],
              restaurantId,
            };
          } else {
            alert('Вы можете добавлять товары только из одного ресторана.');
            return state;
          }
        }),
      removeFromCart: id => set(state => ({ cart: state.cart.filter(item => item.id !== id) })),
      clearCart: () => set(() => ({ cart: [], restaurantId: null })),
      increaseQuantity: id =>
        set(state => ({
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: id =>
        set(state => {
          const updatedCart = state.cart
            .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter(item => item.quantity > 0);

          return {
            cart: updatedCart,
            restaurantId: updatedCart.length === 0 ? null : state.restaurantId, // Сбрасываем restaurantId, если корзина пуста
          };
        }),
      updateQuantity: (id, quantity) =>
        set(state => ({
          cart:
            quantity > 0
              ? state.cart.map(item => (item.id === id ? { ...item, quantity } : item))
              : state.cart.filter(item => item.id !== id),
        })),
      repeatOrder: (items, restaurantId) =>
        set(() => {
          const newCart = items.map(item => ({
            ...item,
            quantity: item.quantity || 1,
          }));
          const newCartAmount = newCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
          return {
            cart: newCart,
            cartAmount: newCartAmount,
            restaurantId, // Устанавливаем restaurantId для всей корзины
          };
        }),
    }),
    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart, restaurantId: state.restaurantId }), // Сохраняем только cart и restaurantId
    }
  )
);

import { create } from 'zustand';
import { UserState } from "../types/types";


export const useUserStore = create<UserState>((set) => ({
  userId: null,
  paymentMethodId: null,
  deliveryAddressId: null,
  avatar: null,
  setUserId: (id) => set({ userId: id }),
  setPaymentMethodId: (id) => set({ paymentMethodId: id }),
  setDeliveryAddressId: (id) => set({ deliveryAddressId: id }),
  setAvatar: (url) => set({ avatar: url }),
}));
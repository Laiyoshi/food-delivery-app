import { create } from 'zustand';

type UserState = {
  userId: string | null;
  paymentMethodId: number | null;
  deliveryAddressId: number | null;
  avatar: string | null;
  setUserId: (id: string | null) => void;
  setPaymentMethodId: (id: number | null) => void;
  setDeliveryAddressId: (id: number | null) => void;
  setAvatar: (url: string | null) => void;
}

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
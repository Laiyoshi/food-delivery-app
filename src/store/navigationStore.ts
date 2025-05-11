import { create } from 'zustand';

type NavigationStore = {
  previousParams: number;
  setPreviousParams: (params: number) => void;
};

export const useNavigationStore = create<NavigationStore>(set => ({
  previousParams: 1,
  setPreviousParams: params => set({ previousParams: params }),
}));

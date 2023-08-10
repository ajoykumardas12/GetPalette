import { StockImageIndexStoreActions } from "@/types";
import { create } from "zustand";

export const useStockImageIndexStore = create<StockImageIndexStoreActions>(
  (set) => ({
    currentIndex: 0,
    increaseStockImageIndex: () =>
      set((state) => ({
        currentIndex: state.currentIndex + 1,
      })),
  })
);

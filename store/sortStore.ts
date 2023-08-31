import { SortStoreActions } from "@/types";
import { create } from "zustand";

export const useSortStore = create<SortStoreActions>((set) => ({
  sortBy: "createdAt",
  order: "descending",
  setSortBy: (newSortBy) =>
    set({
      sortBy: newSortBy,
    }),
  setOrder: (newOrder) =>
    set({
      order: newOrder,
    }),
}));

import { Color, PaletteStoreActions } from "@/types";
import { create } from "zustand";

export const usePaletteStore = create<PaletteStoreActions>((set) => ({
  palette: null,
  setPalette: (newPalette: Color[]) => {
    set({
      palette: newPalette,
    });
  },
}));

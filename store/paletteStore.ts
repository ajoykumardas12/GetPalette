import { Color, CommunityPalette, PaletteStoreActions } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const usePaletteStore = create<PaletteStoreActions>()(
  devtools((set) => ({
    palette: null,
    paletteName: null,
    colorNames: null,
    communityPalettes: null,
    setPalette: (newPalette: Color[]) => {
      set({
        palette: newPalette,
      });
    },
    setPaletteName: (newPaletteName: string) => {
      set({ paletteName: newPaletteName });
    },
    setColorNames: (newColorNames: string[]) => {
      set({
        colorNames: newColorNames,
      });
    },
    setCommunityPalettes: (data: CommunityPalette[]) => {
      set({ communityPalettes: data });
    },
  }))
);

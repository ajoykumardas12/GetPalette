import { ImageStoreActions, ImageStoreState } from "@/types";
import { create } from "zustand";

export const useImageStore = create<ImageStoreActions>((set) => ({
  image: null,
  setImage: (newImage: string) =>
    set({
      image: newImage,
    }),
}));

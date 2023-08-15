export interface IconClass {
  iconClass: string;
}

export interface ImageStoreState {
  image: string | null;
}

export interface ImageStoreActions extends ImageStoreState {
  setImage: (newImage: string) => void;
}

export interface Color {
  rgb: number[];
}

export interface PaletteStore {
  palette: null | Color[];
  paletteName: null | string;
  colorNames: null | string[];
}

export interface PaletteStoreActions extends PaletteStore {
  setPalette: (newPalette: Color[]) => void;
  setPaletteName: (newPaletteName: string) => void;
  setColorNames: (newColorNames: string[]) => void;
}

export interface StockImage {
  url: string;
}

export interface StockImageIndexStore {
  currentIndex: number;
}
export interface StockImageIndexStoreActions extends StockImageIndexStore {
  increaseStockImageIndex: () => void;
}

export interface CommunityPalette {
  id: string;
  name: string;
  slug: string;
}

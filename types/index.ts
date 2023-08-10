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
}

export interface PaletteStoreActions extends PaletteStore {
  setPalette: (newPalette: Color[]) => void;
}

export interface StockImage {
  url: string;
}

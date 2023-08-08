export interface IconClass {
  iconClass: string;
}

export interface ImageStoreState {
  image: string | null;
}

export interface ImageStoreActions extends ImageStoreState {
  setImage: (newImage: string) => void;
}

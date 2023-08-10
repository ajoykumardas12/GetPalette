import { stockImages } from "@/store/stockImages";

export const getStockImagesURL: (stockImgIndex: number) => string = (
  stockImgIndex: number
) => {
  const length = stockImages.length;
  // requested stockImgIndex can be greater than length, so modulo
  const index = (length % stockImgIndex) - 1;
  return stockImages[index].url;
};

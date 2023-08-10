import { stockImages } from "@/store/stockImages";

export const getStockImagesURL: (stockImgIndex: number) => string = (
  stockImgIndex: number
) => {
  const length = stockImages.length;

  // requested stockImgIndex can be greater than length, so modulo
  // stockImgIndex starts at 0, no need to deduct 1
  const index = stockImgIndex % length;

  return stockImages[index].url;
};

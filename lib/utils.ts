import { Color } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const colorThiefDataToPalette = (data: number[][]) => {
  const newPalette: Color[] = [];
  // if (data.length > 0) {
  data.forEach((rgbArray) => {
    const newColor = {
      rgb: `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`,
    };
    newPalette.push(newColor);
  });
  // }
  return newPalette;
};

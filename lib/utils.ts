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
      rgb: rgbArray,
    };
    newPalette.push(newColor);
  });
  // }
  return newPalette;
};

export const rgbArrayToString = (rgbArray: Color[]) => {
  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
};

const componentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbArrayToHex = (rgbArray: number[]) => {
  return (
    "#" +
    componentToHex(rgbArray[0]) +
    componentToHex(rgbArray[1]) +
    componentToHex(rgbArray[2])
  );
};

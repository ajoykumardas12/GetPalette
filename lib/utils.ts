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

export const rgbArrayToString = (rgbArray: number[]) => {
  return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
};

const colComponentToHex = (c: number) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbArrayToHexArray = (rgbArray: number[]) => {
  const hexArray = rgbArray.map((component) => {
    return colComponentToHex(component);
  });
  return hexArray;
};

export const rgbArrayToHex = (rgbArray: number[]) => {
  return (
    "#" +
    colComponentToHex(rgbArray[0]) +
    colComponentToHex(rgbArray[1]) +
    colComponentToHex(rgbArray[2])
  );
};

export const rgbArrayToHexWOHash: (rgbArray: number[]) => string = (
  rgbArray
) => {
  return (
    colComponentToHex(rgbArray[0]) +
    colComponentToHex(rgbArray[1]) +
    colComponentToHex(rgbArray[2])
  );
};

export const getColNameQueryString: (palette: Color[]) => string = (
  palette
) => {
  let queryString = "https://api.color.pizza/v1/?values=";
  for (let i = 0; i < palette.length; i++) {
    if (i > 0) {
      queryString = queryString + ",";
    }
    queryString = queryString + rgbArrayToHexWOHash(palette[i].rgb);
  }
  queryString = queryString + "&list=wikipedia";
  return queryString;
};

export const kebabize = (str: string) => {
  return str
    .replace(/[^\w\s]/g, "")
    .replace(
      /[A-Z]+(?![a-z])|[A-Z]/g,
      ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
    )
    .replace(/\s/g, "");
};

export const generatePaletteLink: (palette: Color[]) => string = (palette) => {
  const hexStringPalette = palette.map((color) => {
    return rgbArrayToHexArray(color.rgb).join("");
  });

  let link = `localhost:3000/palette/${hexStringPalette.join("-")}`;
  return link;
};

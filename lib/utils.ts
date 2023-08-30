import { Color, CommunityPalette } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const colorThiefDataToPalette = (data: number[][]) => {
  const newPalette: Color[] = [];
  data.forEach((rgbArray) => {
    const newColor = {
      rgb: rgbArray,
    };
    newPalette.push(newColor);
  });
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

  const link = `${
    process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
      ? "localhost:3000"
      : "getpalette.vercel.app"
  }/palette/${hexStringPalette.join("-")}`;
  return link;
};

export const hexToRgb = (hexCode: string) => {
  const bigint = parseInt(hexCode, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
};

export const hexArrayToRgbArray: (hexArray: string[]) => Color[] = (
  hexArray
) => {
  const rgbArray = hexArray.map((hex) => {
    return { rgb: hexToRgb(hex) };
  });
  return rgbArray;
};

export const checkValidPaletteLink = (slug: string) => {
  const hexCodeArray = slug.split("-");
  let flag = true;
  hexCodeArray.map((hexCode) => {
    if (!/^([0-9A-F]{3}){1,2}$/i.test(hexCode)) {
      flag = false;
    }
  });
  return flag;
};

export const isHexBgDark = (hexBg: string) => {
  let r = hexBg.substring(0, 2);
  let g = hexBg.substring(2, 4);
  let b = hexBg.substring(4, 6);

  const bgDelta =
    parseInt(r, 16) * 0.299 + parseInt(g, 16) * 0.587 + parseInt(b, 16) * 0.114;
  return 255 - bgDelta < 105 ? false : true;
};

export const generatePaletteSlug = (palette: Color[]) => {
  const hexArray = palette.map((color) => {
    return rgbArrayToHexWOHash(color.rgb);
  });
  return hexArray.join("-");
};

export const isCommunityPalette = (data: any): data is CommunityPalette => {
  return (
    typeof data.name === "string" &&
    typeof data.slug === "string" &&
    typeof data.like === "number" &&
    typeof data.createdAt === "number"
  );
};

export const getHexArrFromSlug = (slug: string) => {
  const hexArray = slug.split("-");
  return hexArray;
};

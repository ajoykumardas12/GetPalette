import { Color } from "@/types";
import { kebabize, rgbArrayToHex, rgbArrayToString } from "./utils";

export const generatePaleteCSS = (
  palette: Color[],
  paletteName: string,
  colorNames: string[]
) => {
  const hexPalette = palette.map((color) => {
    return rgbArrayToHex(color.rgb);
  });
  const rgbPalette = palette.map((color) => {
    return rgbArrayToString(color.rgb);
  });

  // conver colorNames to kebab case
  const kebabColorNames = colorNames.map((name) => {
    return kebabize(name);
  });

  let paletteCSS = `/* ${paletteName} */\n/* CSS HEX */`;
  paletteCSS =
    paletteCSS +
    joinPaletteData(hexPalette, kebabColorNames) +
    "\n\n" +
    "/* CSS RGB */" +
    joinPaletteData(rgbPalette, kebabColorNames) +
    "\n";

  return paletteCSS;
};

const joinPaletteData = (paletteColor: string[], colorNames: string[]) => {
  let str = "";
  for (let i = 0; i < paletteColor.length; i++) {
    str = str + `\n${colorNames[i]}: ${paletteColor[i]};`;
  }
  return str;
};

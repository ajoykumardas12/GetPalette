import { Color } from "@/types";
import { rgbArrayToHex, rgbArrayToString } from "./utils";

export const generatePaleteCSS = (palette: Color[]) => {
  const hexPalette = palette.map((color) => {
    return rgbArrayToHex(color.rgb);
  });
  const rgbPalette = palette.map((color) => {
    return rgbArrayToString(color.rgb);
  });
  let paletteCSS = "/* CSS HEX */\n";
  paletteCSS =
    paletteCSS +
    hexPalette.join(";\n") +
    ";\n\n" +
    "/* CSS RGB */\n" +
    rgbPalette.join(";\n") +
    ";\n";

  return paletteCSS;
};

import { usePaletteStore } from "@/store/paletteStore";
import { generatePaletteLink, rgbArrayToHex } from "@/lib/utils";
import SVGIcon from "../icons/SVGIcon";

const SVGExport = () => {
  const palette = usePaletteStore((state) => state.palette);

  const hexArray = palette?.map((color) => rgbArrayToHex(color.rgb));
  const length = hexArray?.length;

  let svgContent: string;
  let url: string;
  let paletteLink = "";

  // Generate SVG
  if (palette && hexArray && length) {
    paletteLink = generatePaletteLink(palette);
    const rectsArray = hexArray.map((hex, index) => {
      return `<rect width="${500 / length}" height="220" x="${
        0 + index * (500 / length)
      }" fill="${hex}" />`;
    });
    svgContent = `<svg viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg" xml:space="preserve">\r\n\t${rectsArray.join(
      "\r\n\t"
    )}\r\n\t<text x="10" y="240" font-family="Arial" font-size="7" fill="black">${paletteLink}</text>\r\n</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    url = URL.createObjectURL(blob);
  }

  // Download SVG
  const handleSVGDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_svg.svg";
    a.click();
  };

  return (
    <button onClick={handleSVGDownload}>
      <div
        className="grid place-items-center gap-2 rounded border border-mid/80 p-4 transition-colors hover:bg-mid/20 focus:bg-mid/20"
        title="Download SVG file of palette"
      >
        <SVGIcon iconClass="w-6 h-6 xs:w-8 xs:h-8" />
        SVG
      </div>
    </button>
  );
};

export default SVGExport;

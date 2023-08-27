"use client";
import ExportPaletteDialog from "@/components/ExportPaletteDialog";
import BadgeQuestionIcon from "@/components/icons/BadgeQuestionIcon";
import { useCopy } from "@/hooks/useCopy";
import { useFetchColorNames } from "@/hooks/useFetchColorNames";
import {
  checkValidPaletteLink,
  hexArrayToRgbArray,
  isHexBgDark,
} from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
export default function PaletteHome() {
  const params = useParams();
  const slug = params.slug as string;

  const hexCodeArray = slug.split("-");
  const isValidLink = checkValidPaletteLink(slug);

  const rgbArray = hexArrayToRgbArray(hexCodeArray);
  const setPalette = usePaletteStore((state) => state.setPalette);
  const setColorNames = usePaletteStore((state) => state.setColorNames);

  useLayoutEffect(() => {
    // Reset color names to empty to prevent name change when new names are fetched
    setColorNames([]);
  }, [setColorNames]);

  useEffect(() => {
    setPalette(rgbArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPalette]);

  useFetchColorNames();

  const colorNames = usePaletteStore((state) => state.colorNames);

  if (!isValidLink) {
    return <InvalidPalette />;
  } else {
    return (
      <main className="flex flex-col items-center gap-12 pb-6">
        <div className="h-[26rem] w-full flex">
          {hexCodeArray.map((hexCode, index) => {
            return (
              <Color
                key={hexCode}
                hexCode={hexCode}
                colorName={colorNames ? colorNames[index] : ""}
              />
            );
          })}
        </div>
        <div className="w-40 mt-auto">
          <ExportPaletteDialog />
        </div>
      </main>
    );
  }
}

const InvalidPalette = () => {
  return (
    <div className="p-6 pt-16 grid place-items-center">
      <div className="w-64 h-60 flex border border-brand rounded overflow-hidden group">
        <div className="w-full h-full bg-darkest"></div>
        <div className="w-full h-full bg-dark"></div>
        <div className="w-full h-full bg-brand"></div>
        <div className="w-full h-full flex items-center justify-end">
          <BadgeQuestionIcon iconClass="w-10 h-10 rotate-[30deg] mt-12 group-hover:stroke-red-700 group-hover:scale-[1.4] group-hover:rotate-45 transition-transform" />
        </div>
        <div className="w-full h-full bg-mid"></div>
        <div className="w-full h-full bg-light"></div>
      </div>
      <div className="mt-6">Oops! The palette seems broken.</div>
    </div>
  );
};

const Color = ({
  hexCode,
  colorName,
}: {
  hexCode: string;
  colorName: string;
}) => {
  const [copied, copy, resetCopied] = useCopy();
  return (
    <div
      className="w-full h-full flex flex-col gap-6 items-center justify-end pb-10"
      style={{
        background: `#${hexCode}`,
        color: `${isHexBgDark(hexCode) ? "#fff" : "#000"}`,
      }}
    >
      <button
        className="px-3 py-2 hover:bg-stone-400/10 rounded text-lg font-bold"
        onClick={() => {
          copy(`#${hexCode}`);
          resetCopied();
        }}
        title="copy"
      >
        {copied ? <span className="text-base">Copied!</span> : `#${hexCode}`}
      </button>
      <div className="text-xs min-h-[1rem]">{colorName}</div>
    </div>
  );
};

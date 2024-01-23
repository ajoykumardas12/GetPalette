"use client";
import ExportPaletteDialog from "@/components/palette-exports/ExportPaletteDialog";
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
        <div className="flex w-full flex-col sm:h-[26rem] sm:flex-row">
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
        <div className="mt-auto w-40">
          <ExportPaletteDialog />
        </div>
      </main>
    );
  }
}

const InvalidPalette = () => {
  return (
    <div className="grid place-items-center p-6 pt-16">
      <div className="group flex h-60 w-64 overflow-hidden rounded border border-brand">
        <div className="h-full w-full bg-darkest"></div>
        <div className="h-full w-full bg-dark"></div>
        <div className="h-full w-full bg-brand"></div>
        <div className="flex h-full w-full items-center justify-end">
          <BadgeQuestionIcon iconClass="w-10 h-10 rotate-[30deg] mt-12 group-hover:stroke-red-700 group-hover:scale-[1.4] group-hover:rotate-45 transition-transform" />
        </div>
        <div className="h-full w-full bg-mid"></div>
        <div className="h-full w-full bg-light"></div>
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
      className="flex h-full w-full flex-col items-center justify-end gap-3 pb-6 pt-2 sm:gap-6 sm:pb-10"
      style={{
        background: `#${hexCode}`,
        color: `${isHexBgDark(hexCode) ? "#fff" : "#000"}`,
      }}
    >
      <button
        className="rounded px-3 py-2 text-lg font-bold hover:bg-stone-400/10"
        onClick={() => {
          copy(`#${hexCode}`);
          resetCopied();
        }}
        title="copy"
      >
        {copied ? <span className="text-base">Copied!</span> : `#${hexCode}`}
      </button>
      <div className="min-h-[1rem] text-center text-xs">{colorName}</div>
    </div>
  );
};

"use client";
import ExportPaletteDialog from "@/components/ExportPaletteDialog";
import { useFetchColorNames } from "@/hooks/useFetchColorNames";
import { hexArrayToRgbArray } from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
export default function PaletteHome() {
  const params = useParams();
  const slug = params.slug as string;

  const hexCodeArray = slug.split("-");
  const rgbArray = hexArrayToRgbArray(hexCodeArray);

  const setPalette = usePaletteStore((state) => state.setPalette);

  const getPaletteFromSlug = useCallback(() => {
    setPalette(rgbArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPalette]);

  useEffect(() => {
    getPaletteFromSlug();
  }, [getPaletteFromSlug]);

  useFetchColorNames();

  return (
    <main className="flex flex-col items-center gap-12 pb-6">
      <div className="h-[26rem] w-full flex">
        {hexCodeArray.map((hexCode) => {
          return (
            <div
              key={hexCode}
              className="w-full h-full grid place-items-center text-black"
              style={{ background: `#${hexCode}` }}
            >
              #{hexCode}
            </div>
          );
        })}
      </div>
      <div className="w-40 mt-auto">
        <ExportPaletteDialog />
      </div>
    </main>
  );
}

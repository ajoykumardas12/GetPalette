"use client";
import { Separator } from "./ui/separator";
import CopyIcon from "./icons/CopyIcon";
import { Button } from "./ui/button";
import { usePaletteStore } from "@/store/paletteStore";
import { rgbArrayToHex } from "@/lib/utils";
import { useCopy } from "@/hooks/useCopy";
import { Skeleton } from "./ui/skeleton";
import CheckCircleIcon from "./icons/CheckCircleIcon";

const CopyPalettes = () => {
  const palette = usePaletteStore((state) => state.palette);

  return (
    <div className="w-full flex justify-center gap-6 my-4">
      {palette ? (
        palette.map((colorFromPalette, index) => {
          return <Color key={index} rgb={colorFromPalette.rgb} />;
        })
      ) : (
        <>
          <Skeleton className="w-32 h-32 rounded-lg" />
          <Skeleton className="w-32 h-32 rounded-lg" />
          <Skeleton className="w-32 h-32 rounded-lg" />
        </>
      )}
    </div>
  );
};

const Color = ({ rgb }: { rgb: number[] }) => {
  const hex = rgbArrayToHex(rgb);
  const [copied, copy, resetCopied] = useCopy();

  return (
    <Button
      className="h-32 w-32 flex flex-col items-center cursor-pointer rounded-lg hover:-translate-y-1 focus:-translate-y-1 transition-transform"
      style={{ background: `${hex}` }}
      onClick={() => {
        copy(hex);

        resetCopied();
      }}
    >
      <div className="flex flex-grow items-center">
        {copied ? (
          <CheckCircleIcon iconClass="w-7 h-7 stroke-brand" />
        ) : (
          <CopyIcon iconClass="w-7 h-7 stroke-brand" />
        )}
      </div>
      <Separator className="mt-auto bg-stone-400/50" />
      <div className="p-1 text-brand">{copied ? "copied!" : hex}</div>
    </Button>
  );
};

export default CopyPalettes;

"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { useImageStore } from "@/store/imageStore";
import { useCallback, useEffect, useRef, useState } from "react";
import ImageInput from "./ImageInput";
import { usePaletteStore } from "@/store/paletteStore";
import ColorThief from "colorthief";
import { colorThiefDataToPalette, rgbArrayToHex } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import ExportPaletteDialog from "./ExportPaletteDialog";
import { Skeleton } from "./ui/skeleton";

const ImagePaletteExtractor = () => {
  const image = useImageStore((state) => state.image);
  const palette = usePaletteStore((state) => state.palette);
  const setPalette = usePaletteStore((state) => state.setPalette);
  const [noOfCol, setNoOfCol] = useState(5);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // function to get palette from color thief. Wrapped inside callback to prevent calling setPalette on rerenders
  const getPaletteFromImage = useCallback(() => {
    const colorthief = new ColorThief();
    const paletteData = colorthief.getPalette(imgRef.current, noOfCol);
    const newPalette = colorThiefDataToPalette(paletteData);
    setPalette(newPalette);
  }, [setPalette, noOfCol]);

  // call getPaletteFromImage when image is loaded
  useEffect(() => {
    if (imgRef.current?.complete) {
      getPaletteFromImage();
    } else {
      imgRef.current?.addEventListener("load", () => {
        getPaletteFromImage();
      });
    }
  }, [getPaletteFromImage, image, setPalette]);

  return (
    <div className="flex w-10/12 border border-stone-200 rounded-lg">
      <div className="w-5/12 flex flex-col px-8 py-6 gap-3">
        <ImageInput />
        {/* <Button variant="secondary" className="mb-8">
          Try Stock Image
        </Button> */}
        <div className="mt-auto mb-8">
          <div className="mb-6 flex flex-col gap-3">
            <div className="text-sm">No of colors</div>
            <div>
              <Slider
                min={3}
                max={8}
                step={1}
                value={[noOfCol]}
                // see radix ui slider for reference
                onValueChange={(newValue) => setNoOfCol(newValue[0])}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full flex rounded overflow-hidden">
            {palette ? (
              palette.map((color, index) => {
                const hex = rgbArrayToHex(color.rgb);
                return (
                  <div
                    key={index}
                    className="h-10 flex-grow"
                    style={{ background: `${hex}` }}
                  ></div>
                );
              })
            ) : (
              <Skeleton className="w-full h-10" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="secondary" disabled>
            Test Palette Live
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Export Palette</Button>
            </DialogTrigger>
            <DialogContent>
              <ExportPaletteDialog />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-7/12 p-6 flex items-center justify-center border-l border-l-stone-200">
        <Image
          ref={imgRef}
          src={image ? image : "/images/new-world.png"}
          width={400}
          height={300}
          alt="image"
          priority
          className="w-full aspect-video"
        />
      </div>
    </div>
  );
};

export default ImagePaletteExtractor;

"use client";
import ImageIcon from "@/components/icons/ImageIcon";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const palette = [
  { hex: "#2d3142" },
  { hex: "#4f5d75" },
  { hex: "#bfc0c0" },
  { hex: "#f2e5e1" },
  { hex: "#ef8354" },
];

const ImagePaletteExtractor = () => {
  return (
    <div className="flex w-10/12 border border-stone-200 rounded-lg">
      <div className="w-5/12 flex flex-col px-8 py-6 gap-3">
        <Button variant="outline" className="border-dashed border-brand/50">
          <input type="file" accept="image/png, image/jpeg" id="image" hidden />
          <label htmlFor="image" className="flex gap-2 cursor-pointer">
            <ImageIcon iconClass="w-5 h-5" /> Upload Image
          </label>
        </Button>
        <Button variant="secondary" className="mb-4">
          Try Stock Image
        </Button>
        <div className="mt-auto mb-8">
          <div className="mb-4 flex flex-col gap-3">
            <div className="text-sm">No of colors</div>
            <Slider min={3} max={10} step={1} className="cursor-pointer" />
          </div>
          <div className="w-full flex rounded overflow-hidden">
            {palette.map((color) => {
              return (
                <div
                  key={color.hex}
                  className="h-12 min-w-[2.5rem] flex-grow"
                  style={{ background: `${color.hex}` }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button>Export Palette</Button>
          {/* <Button variant="secondary">Test Palette Live</Button> */}
        </div>
      </div>
      <div className="w-7/12 p-6 flex items-center justify-center border-l border-l-stone-200">
        <Image
          src="/images/new-world.png"
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

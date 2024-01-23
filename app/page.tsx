import AddPalette from "@/components/AddPalette";
import CopyPalettes from "@/components/CopyPalettes";
import ImagePaletteExtractor from "@/components/ImagePaletteExtractor";
import PaintingPaletteIcon from "@/components/icons/PaintingPaletteIcon";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-16 p-6">
      <div className="mt-10 text-center ">
        <h1 className="text-4xl font-bold">Palette Extractor</h1>
        <p className="mt-3">Generate palettes from images</p>
      </div>
      <ImagePaletteExtractor />
      <CopyPalettes />
      <div className="my-8 flex flex-col gap-6 md:my-10">
        <AddPalette />
        <Link href="/browse" className="link text-center">
          <div className="rounded p-1 font-medium text-darkest md:text-lg">
            <PaintingPaletteIcon iconClass="w-5 h-5 mr-2" />
            <span className="">Explore community palettes</span>
          </div>
        </Link>
      </div>
    </main>
  );
}

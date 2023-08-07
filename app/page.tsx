import CopyPalettes from "@/components/CopyPalettes";
import ImagePaletteExtractor from "@/components/ImagePaletteExtractor";
import AddIcon from "@/components/icons/AddIcon";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-10 p-6">
      <div className="mt-10 text-center ">
        <h1 className="text-4xl font-bold">Palette Extractor</h1>
        <p className="mt-3">Extract palettes from photos</p>
      </div>
      <ImagePaletteExtractor />
      <CopyPalettes />
      <Button className="">
        <AddIcon iconClass="w-5 h-5 mr-2" />
        Add palette to community
      </Button>
    </main>
  );
}

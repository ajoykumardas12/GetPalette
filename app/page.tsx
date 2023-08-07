import CopyPalettes from "@/components/CopyPalettes";
import ImagePaletteExtractor from "@/components/ImagePaletteExtractor";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between gap-10 p-6">
      <div className="mt-10 text-center ">
        <h1 className="text-4xl font-bold">Palette Extractor</h1>
        <p className="mt-3">Extract palettes from photos</p>
      </div>
      <ImagePaletteExtractor />
      <CopyPalettes />
    </main>
  );
}

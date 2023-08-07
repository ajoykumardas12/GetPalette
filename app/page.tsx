import ImagePaletteExtractor from "@/components/ImagePaletteExtractor";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-6">
      <div className="my-10 text-center ">
        <h1 className="text-4xl font-bold">Palette Extractor</h1>
        <p className="mt-3">Extract palettes from photos</p>
      </div>
      <ImagePaletteExtractor />
    </main>
  );
}

"use client";
import { usePaletteStore } from "@/store/paletteStore";
import AddIcon from "./icons/AddIcon";
import { Button } from "./ui/button";
import { generatePaletteSlug } from "@/lib/utils";

const AddPalette = () => {
  const palette = usePaletteStore((state) => state.palette);
  const paletteName = usePaletteStore((state) => state.paletteName);

  const handleSubmit = () => {
    if (palette) {
      const paletteSlug = generatePaletteSlug(palette);
      fetch(
        `${
          process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
            ? "http://localhost:3000"
            : "https://getpalette.vercel.app"
        }/api/browse`,
        {
          method: "POST",
          body: JSON.stringify({
            name: paletteName ?? "",
            slug: paletteSlug,
            like: 0,
          }),
        }
      )
        .then((res) => {
          console.log(res.json());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Button
      className=""
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <AddIcon iconClass="w-5 h-5 mr-2" />
      Add palette to community
    </Button>
  );
};

export default AddPalette;

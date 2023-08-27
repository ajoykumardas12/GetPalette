"use client";
import { usePaletteStore } from "@/store/paletteStore";
import AddIcon from "./icons/AddIcon";
import { Button } from "./ui/button";
import { generatePaletteSlug } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { AddPaletteResponse } from "@/types";

const AddPalette = () => {
  const palette = usePaletteStore((state) => state.palette);
  const paletteName = usePaletteStore((state) => state.paletteName);

  const { toast } = useToast();
  const handleResponse = (data: AddPaletteResponse) => {
    if (data.status === 409) {
      toast({
        title: "Already Exists",
        description: "This palette is already added!",
      });
    } else if (data.status === 200) {
      toast({
        title: "Yaay🎉",
        description: "Added to community palettes!",
      });
    } else if (data.status === 500 || data.status === 401) {
      toast({
        title: "Missing!",
        description: "Something's missing. Try again.",
      });
    } else {
      toast({
        title: "Oops!",
        description: "Something went wrong, try again later.",
      });
    }
  };

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
          return res.json();
        })
        .then((data) => handleResponse(data))
        .catch((err) => {
          toast({
            title: "Oops!",
            description: "Something went wrong!",
          });
        });
    }
  };
  return (
    <Button
      className="group"
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <AddIcon iconClass="w-5 h-5 mr-2 group-hover:rotate-90 group-focus:rotate-90 transition-transform duration-300" />
      Add palette to community
    </Button>
  );
};

export default AddPalette;

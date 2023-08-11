import { getColNameQueryString } from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { useEffect } from "react";

export const useFetchColorNames = () => {
  const palette = usePaletteStore((state) => state.palette);
  const setPaletteName = usePaletteStore((state) => state.setPaletteName);
  const setColorNames = usePaletteStore((state) => state.setColorNames);
  useEffect(() => {
    if (palette) {
      // get query string for fetching data from https://api.color.pizza
      const query = getColNameQueryString(palette);
      fetch(query)
        .then((response) => response.json())
        .then((data) => {
          // set palette name
          setPaletteName(data.paletteTitle);

          // set individual color names
          const newColorNames: string[] = [];
          data.colors.forEach((color: { name: string }) => {
            newColorNames.push(color.name);
          });
          setColorNames(newColorNames);
        });
    }
  }, [palette, setColorNames, setPaletteName]);
};

"use client";
import PaletteComponent from "@/components/browse/PaletteComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaletteStore } from "@/store/paletteStore";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const communityPalettes = usePaletteStore((state) => state.communityPalettes);
  const setCommunityPalettes = usePaletteStore(
    (state) => state.setCommunityPalettes
  );
  useLayoutEffect(() => {
    fetch("http://localhost:3000/api/browse", {
      method: "GET",
      body: null,
    })
      .then((response) => response.json())
      .then((body) => {
        setCommunityPalettes(body.data.items);
      });
  }, [setCommunityPalettes]);

  let saved = localStorage.getItem("savedPalettes");
  if (!saved) {
    saved = JSON.stringify("");
  }
  const localSaved = JSON.parse(saved);

  const [savedPalettes, setSavedPalettes] = useState<string[]>(localSaved);

  const setNewSavedPalettes = (newSavedPalettes: string[]) => {
    setSavedPalettes(newSavedPalettes);
  };

  useEffect(() => {
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold ">Community Palettes</h1>
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[840px]:grid-cols-3 gap-12 px-6 my-10">
        {communityPalettes ? (
          communityPalettes.map((communityPalette) => {
            return (
              <PaletteComponent
                key={communityPalette.slug}
                name={communityPalette.name}
                slug={communityPalette.slug}
                like={communityPalette.like}
                savedPalettes={savedPalettes}
                setNewSavedPalettes={setNewSavedPalettes}
              />
            );
          })
        ) : (
          <LoadingSkeleton />
        )}
      </section>
    </main>
  );
}

const LoadingSkeleton = () => {
  const arr = Array.from(Array(10).keys());
  return (
    <>
      {arr.map((num) => {
        return <Skeleton key={num} className="w-full h-64"></Skeleton>;
      })}
    </>
  );
};

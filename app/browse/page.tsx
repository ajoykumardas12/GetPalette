"use client";
import PaletteComponent from "@/components/browse/PaletteComponent";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaletteStore } from "@/store/paletteStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const communityPalettes = usePaletteStore((state) => state.communityPalettes);
  const setCommunityPalettes = usePaletteStore(
    (state) => state.setCommunityPalettes
  );

  // Get community palettes data from api
  useLayoutEffect(() => {
    fetch("http://localhost:3000/api/browse", {
      method: "GET",
      body: null,
    })
      .then((response) => response.json())
      .then((body) => {
        setCommunityPalettes(body.data.items);
      })
      .catch((error) => console.log(error));
  }, [setCommunityPalettes]);

  // localSavedRef stores data from localStorage at first render,
  // if no data in localStorage, empty array
  const localSavedRef = useRef([]);
  useEffect(() => {
    const saved = localStorage.getItem("savedPalettes");
    if (saved) localSavedRef.current = JSON.parse(saved);
  }, []);

  // state storing saved/liked palettes
  const [savedPalettes, setSavedPalettes] = useState<string[]>([]);

  // tracks if it's first render
  const firstRender = useRef(true);

  useEffect(() => {
    // if not first render update localStorage 'savedPalettes',
    // updating at first render will lead to storing empty array
    if (!firstRender.current) {
      localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
    } else {
      // else(first render) update savedPalette state to localSavedRef value
      setSavedPalettes(localSavedRef.current);
      firstRender.current = false;
    }
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
                setSavedPalettes={setSavedPalettes}
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

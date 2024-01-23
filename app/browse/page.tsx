"use client";
import PaletteComponent from "@/components/browse/PaletteComponent";
import SortPalettes from "@/components/browse/SortPalettes";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaletteStore } from "@/store/paletteStore";
import { useSortStore } from "@/store/sortStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const communityPalettes = usePaletteStore((state) => state.communityPalettes);
  const setCommunityPalettes = usePaletteStore(
    (state) => state.setCommunityPalettes
  );

  const sortBy = useSortStore((state) => state.sortBy);
  const order = useSortStore((state) => state.order);

  // Get community palettes data from api
  useLayoutEffect(() => {
    fetch(
      `${
        process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
          ? "http://localhost:3000"
          : "https://getpalette.vercel.app"
      }/api/browse`,
      {
        method: "GET",
        body: null,
      }
    )
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

  const [sortedCommunityPalettes, setSortedCommunityPalettes] =
    useState(communityPalettes);

  // Sort data
  useEffect(() => {
    if (communityPalettes) {
      if (order === "descending") {
        const sortedData = [...communityPalettes].sort(
          (a, b) => b[sortBy] - a[sortBy]
        );
        setSortedCommunityPalettes(sortedData);
      } else if (order === "ascending") {
        const sortedData = [...communityPalettes].sort(
          (a, b) => a[sortBy] - b[sortBy]
        );
        setSortedCommunityPalettes(sortedData);
      }
    }
  }, [communityPalettes, order, sortBy]);

  return (
    <main className="px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold sm:text-2xl ">
          Community Palettes
        </h1>
        <SortPalettes />
      </div>
      <section className="mb-10 mt-8 grid grid-cols-1 gap-10 px-6 xs:mt-10 xs:gap-12 min-[540px]:grid-cols-2 min-[840px]:grid-cols-3">
        {sortedCommunityPalettes ? (
          sortedCommunityPalettes.map((communityPalette) => {
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
        return (
          <Skeleton
            key={num}
            className="h-52 w-full xs:h-60 sm:h-64"
          ></Skeleton>
        );
      })}
    </>
  );
};

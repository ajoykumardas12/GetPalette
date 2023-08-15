"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getHexArrFromSlug } from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { useLayoutEffect } from "react";

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

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold ">Community Palettes</h1>
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[840px]:grid-cols-3 gap-16 px-6 mt-10">
        {communityPalettes ? (
          communityPalettes.map((communityPalette) => {
            return (
              <PaletteComponent
                key={communityPalette.id}
                slug={communityPalette.slug}
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

const PaletteComponent = ({ slug }: { slug: string }) => {
  const hexArray = getHexArrFromSlug(slug);
  return (
    <div className="w-full">
      <div className="w-full h-64 flex flex-col rounded-md overflow-hidden">
        {hexArray.map((hex) => {
          return (
            <div
              key={hex}
              className="flex-grow"
              style={{ background: `#${hex}` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

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

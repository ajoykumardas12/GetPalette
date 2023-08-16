"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getHexArrFromSlug, isHexBgDark } from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { CommunityPalette } from "@/types";
import Link from "next/link";
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
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[840px]:grid-cols-3 gap-12 px-6 my-10">
        {communityPalettes ? (
          communityPalettes.map((communityPalette) => {
            return (
              <PaletteComponent
                key={communityPalette.id}
                {...communityPalette}
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

const PaletteComponent = ({ id, name, slug }: CommunityPalette) => {
  const hexArray = getHexArrFromSlug(slug);
  return (
    <div className="w-full">
      <Link
        href={`/palette/${slug}`}
        className="w-full h-64 flex flex-col rounded-md overflow-hidden"
        title="open palette page"
      >
        {hexArray.map((hex) => {
          return (
            <div
              key={hex}
              className="flex-grow flex items-center px-4 group"
              style={{ background: `#${hex}` }}
            >
              <p
                className="text-sm font-medium w-max opacity-0 group-hover:opacity-100"
                style={{ color: `${isHexBgDark(hex) ? "#fff" : "#000"}` }}
                title="color hex value"
              >
                {`#${hex}`}
              </p>
            </div>
          );
        })}
      </Link>
      <div className="mt-2">
        <h2 className="min-h-[1rem] font-medium">{name}</h2>
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

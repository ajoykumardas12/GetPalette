"use client";
import PaletteComponent from "@/components/browse/PaletteComponent";
import SortIcon from "@/components/icons/SortIcon";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaletteStore } from "@/store/paletteStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const communityPalettes = usePaletteStore((state) => state.communityPalettes);
  const setCommunityPalettes = usePaletteStore(
    (state) => state.setCommunityPalettes
  );

  const [sortBy, setSortBy] = useState<"createdAt" | "like">("createdAt");
  const [order, setOrder] = useState<"ascending" | "descending">("descending");

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
        console.log("sorted", sortBy, order);
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
        <h1 className="text-xl sm:text-2xl font-semibold ">
          Community Palettes
        </h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="sm" variant="outline" className="sm:text-base px-2">
              Sort <SortIcon iconClass="w-3 h-4 sm:w-4 sm:h-5 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 bg-stone-300 max-w-[16rem] sm:max-w-md border border-stone-500">
            <h4 className="font-semibold leading-none px-3 py-2">
              Sort community palettes
            </h4>
            <Separator className="bg-stone-500" />
            <div className="p-4 grid gap-4">
              <div className="flex gap-4">
                <p className="font-semibold">Sort by:</p>
                <RadioGroup
                  className="my-1"
                  value={sortBy}
                  onValueChange={(value) => {
                    if (value === "createdAt") {
                      setSortBy("createdAt");
                    } else if (value == "like") setSortBy("like");
                  }}
                >
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="createdAt" id="date" />
                    <Label htmlFor="date">Date</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="like" id="like" />
                    <Label htmlFor="like">Like</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex gap-4">
                <p className="font-semibold">Order:</p>
                <RadioGroup
                  className="my-1"
                  value={order}
                  onValueChange={(value) => {
                    if (value === "ascending") {
                      setOrder("ascending");
                    } else if (value == "descending") setOrder("descending");
                  }}
                >
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="ascending" id="ascending" />
                    <Label htmlFor="ascending">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="descending" id="descending" />
                    <Label htmlFor="descending">Descending</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <section className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[840px]:grid-cols-3 gap-10 xs:gap-12 px-6 mt-8 xs:mt-10 mb-10">
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
            className="w-full h-52 xs:h-60 sm:h-64"
          ></Skeleton>
        );
      })}
    </>
  );
};

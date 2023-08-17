"use client";
import HeartIcon from "@/components/icons/HeartIcon";
import { Skeleton } from "@/components/ui/skeleton";
import { getHexArrFromSlug, isHexBgDark } from "@/lib/utils";
import { usePaletteStore } from "@/store/paletteStore";
import { CommunityPaletteComponentProps } from "@/types";
import Link from "next/link";
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

const PaletteComponent = ({
  name,
  slug,
  like,
  savedPalettes,
  setNewSavedPalettes,
}: CommunityPaletteComponentProps) => {
  const [liked, setLiked] = useState(savedPalettes.includes(slug));
  const handleLikeChange = () => {
    setLiked((prev) => !prev);
    // liked state still has previous value here
    if (!liked) {
      handleLiked();
    } else {
      handleDisLiked();
    }
  };
  const handleLiked = async () => {
    await fetch(`http://localhost:3000/api/browse/${slug}`, {
      method: "POST",
      body: JSON.stringify({
        name: name ?? "",
        slug: slug,
        like: like ?? 0,
        action: "incrementLike",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setLiked((prev) => !prev);
        console.log(err);
      });
    const newPalettes = [...savedPalettes];
    newPalettes.push(slug);
    console.log(newPalettes);

    setNewSavedPalettes(newPalettes);
  };
  const handleDisLiked = async () => {
    await fetch(`http://localhost:3000/api/browse/${slug}`, {
      method: "POST",
      body: JSON.stringify({
        name: name ?? "",
        slug: slug,
        like: like ?? 0,
        action: "decrementLike",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setLiked((prev) => !prev);
        console.log(err);
      });

    const newP = [...savedPalettes];
    const newPalettes = newP.filter((palette) => palette !== slug);
    console.log(newPalettes);
    setNewSavedPalettes(newPalettes);
  };
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
      <div className="mt-2 px-2 flex items-center justify-between">
        <h2 className="min-h-[1rem] font-medium">{name}</h2>
        <button
          className="text-sm text-stone-800 px-2 py-1 rounded hover:bg-stone-200"
          title="Like"
          onClick={handleLikeChange}
        >
          <HeartIcon
            iconClass={`w-5 h-5 ${
              liked && "fill-stone-400"
            } stroke-stone-400 mr-1`}
          />
          {like ? (liked ? like + 1 : like) : liked ? 1 : 0}
        </button>
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

import HeartIcon from "@/components/icons/HeartIcon";
import { getHexArrFromSlug, isHexBgDark } from "@/lib/utils";
import { CommunityPaletteComponentProps } from "@/types";
import Link from "next/link";
import { useState } from "react";

const PaletteComponent = ({
  name,
  slug,
  like,
  savedPalettes,
  setSavedPalettes,
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
    await fetch(
      `${
        process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
          ? "http://localhost:3000"
          : "https://getpalette.vercel.app"
      }/api/browse/${slug}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name ?? "",
          slug: slug,
          like: like ?? 0,
          action: "incrementLike",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        // console.log("success", data);
      })
      .catch(() => {
        setLiked((prev) => !prev);
        // console.log("error", err);
      });
    const newPalettes = [...savedPalettes];
    newPalettes.push(slug);

    setSavedPalettes(newPalettes);
  };
  const handleDisLiked = async () => {
    await fetch(
      `${
        process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
          ? "http://localhost:3000"
          : "https://getpalette.vercel.app"
      }/api/browse/${slug}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name ?? "",
          slug: slug,
          like: like ?? 0,
          action: "decrementLike",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        // console.log("success", data);
      })
      .catch(() => {
        setLiked((prev) => !prev);
        // console.log("error", err);
      });

    const newP = [...savedPalettes];
    const newPalettes = newP.filter((palette) => palette !== slug);
    setSavedPalettes(newPalettes);
  };
  const hexArray = getHexArrFromSlug(slug);
  return (
    <div className="w-full">
      <Link
        href={`/palette/${slug}`}
        className="flex h-52 w-full flex-col overflow-hidden rounded-md xs:h-60 sm:h-64"
        title="open palette page"
      >
        {hexArray.map((hex) => {
          return (
            <div
              key={hex}
              className="group flex flex-grow basis-6 items-center px-4 transition-all hover:basis-12"
              style={{ background: `#${hex}` }}
            >
              <p
                className="w-max text-sm font-medium opacity-0 group-hover:opacity-100"
                style={{ color: `${isHexBgDark(hex) ? "#fff" : "#000"}` }}
                title="color hex value"
              >
                {`#${hex}`}
              </p>
            </div>
          );
        })}
      </Link>
      <div className="mt-2 flex items-center justify-between px-2">
        <h2 className="min-h-[1rem] font-medium">{name}</h2>
        <button
          className="rounded px-2 py-1 text-sm text-stone-800 hover:bg-stone-200"
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

export default PaletteComponent;

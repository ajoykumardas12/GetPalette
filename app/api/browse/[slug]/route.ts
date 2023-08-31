import { isCommunityPalette } from "@/lib/utils";
import { Deta } from "deta";
import { NextResponse } from "next/server";

const deta = Deta(process.env.DETA_PROJECT_KEY);
const communityPalettesDB = deta.Base("community-palettes");

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
  if (body) {
    const action = body.action;

    if (action === "incrementLike") {
      if (isCommunityPalette(body)) {
        const data = {
          name: body.name,
          slug: body.slug,
          like: body.like,
          createdAt: body.createdAt,
        };

        const updatedData = {
          ...data,
          like: communityPalettesDB.util.increment(1),
        };

        try {
          await communityPalettesDB.update(updatedData, data.slug);
          return NextResponse.json({ status: 200, message: "liked" });
        } catch (error) {
          return NextResponse.json({ status: 400, error: error });
        }
      } else {
        return NextResponse.json({
          status: 500,
          error: "Invalid palette data.",
        });
      }
    } else if (action === "decrementLike") {
      if (isCommunityPalette(body)) {
        const data = {
          name: body.name,
          slug: body.slug,
          like: body.like,
          createdAt: body.createdAt,
        };

        const updatedData = {
          ...data,
          like: communityPalettesDB.util.increment(-1),
        };

        try {
          await communityPalettesDB.update(updatedData, data.slug);
          return NextResponse.json({ status: 200, message: "disliked" });
        } catch (error) {
          return NextResponse.json({ status: 400, error: error });
        }
      } else {
        return NextResponse.json({
          status: 500,
          error: "Invalid palette data.",
        });
      }
    } else {
      return NextResponse.json({ status: 401, error: "Missing update action" });
    }
  } else {
    return NextResponse.json({ status: 401, error: "Missing palette data" });
  }
};

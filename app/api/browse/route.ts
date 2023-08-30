import { NextResponse } from "next/server";
import { Deta } from "deta";
import { isCommunityPalette } from "@/lib/utils";

const deta = Deta(process.env.DETA_PROJECT_KEY);
const communityPalettesDB = deta.Base("community-palettes");

export const GET = async (req: Request, res: Response) => {
  // Returns all communityPalettes
  try {
    const communityPalettes = await communityPalettesDB.fetch();
    return NextResponse.json({
      status: 200,
      data: communityPalettes,
    });
  } catch (error) {
    // Failed to fetch
    return NextResponse.json({ status: 400, error: error });
  }
};

export const POST = async (req: Request, res: Response) => {
  // Validates palette data and adds to db unless already exists
  const body = await req.json();

  // If request has body, proceed
  if (body) {
    // Check if body contains correct palette data
    if (isCommunityPalette(body)) {
      const data = {
        name: body.name,
        slug: body.slug,
        like: (body.like = 0),
        createdAt: body.createdAt,
      };

      try {
        // Check if palette already added
        const alreadyAdded = await communityPalettesDB.get(data.slug);
        if (alreadyAdded) {
          return NextResponse.json({
            status: 409,
            error: "This palette is already added!",
          });
        } else {
          // Palette isn't already added, add
          const palette = await communityPalettesDB.put(data, data.slug);
          return NextResponse.json({ status: 200, palette: palette });
        }
      } catch (error) {
        // Return error
        return NextResponse.json({
          status: 400,
          error: "Something went wrong! Please try again.",
        });
      }
    } else {
      // Body doesn't contain correct palette data
      return NextResponse.json({ status: 500, error: "Invalid palette data." });
    }
  } else {
    // request doesn't have body
    return NextResponse.json({ status: 401, error: "Missing palette data" });
  }
};

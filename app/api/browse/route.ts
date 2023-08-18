import { NextResponse } from "next/server";
import { Deta } from "deta";
import { isCommunityPalette } from "@/lib/utils";

const deta = Deta(process.env.DETA_PROJECT_KEY);
const communityPalettesDB = deta.Base("community-palettes");

export const GET = async (req: Request, res: Response) => {
  try {
    const communityPalettes = await communityPalettesDB.fetch();
    return NextResponse.json({
      status: 200,
      data: communityPalettes,
    });
  } catch (error) {
    return NextResponse.json({ status: 400, error: error });
  }
};

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  if (body) {
    if (isCommunityPalette(body)) {
      const data = {
        name: body.name,
        slug: body.slug,
        like: (body.like = 0),
      };

      try {
        const palette = await communityPalettesDB.insert(data, data.slug);
        return NextResponse.json({ status: 200, palette: palette });
      } catch (error) {
        return NextResponse.json({ status: 400, error: error });
      }
    } else {
      return NextResponse.json({ status: 500, error: "Invalid palette data." });
    }
  } else {
    return NextResponse.json({ status: 401, error: "Missing palette data" });
  }
};

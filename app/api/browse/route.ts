import { NextResponse } from "next/server";
import { Deta } from "deta";

const deta = Deta(process.env.DETA_PROJECT_KEY);
const communityPalettesDB = deta.Base("community-palettes");

export const GET = async (req: Request, res: Response) => {
  return NextResponse.json({ message: "GOT" });
};

export const POST = async (req: Request, res: Response) => {
  try {
    const palette = await communityPalettesDB.put({ palette: "test" });
    return NextResponse.json({ status: 200, palette: palette });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

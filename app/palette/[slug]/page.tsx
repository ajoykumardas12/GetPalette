"use client";
import { useParams } from "next/navigation";
export default function PaletteHome() {
  const params = useParams();

  return <main>palette {params.slug}</main>;
}

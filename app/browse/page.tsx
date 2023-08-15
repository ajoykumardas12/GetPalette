"use client";
import { useLayoutEffect } from "react";

export default function Home() {
  useLayoutEffect(() => {
    const communityPalettes = fetch("http://localhost:3000/api/browse", {
      method: "GET",
      body: null,
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
      });
  });
  return <main className="p-6">Community-palettes</main>;
}

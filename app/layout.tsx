import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetPalette",
  description: "Generate beautiful color palettes from your images",
  applicationName: "GetPalette",
  authors: { url: "https://ajoykumardas.vercel.app/", name: "Ajoy Kumar Das" },
  keywords: ["color palette", "color", "palette", "palette from image"],
  robots: "index, follow",
  icons:
    "https://getpalette.vercel.app/_next/image?url=%2Fimages%2Fcolor-palette.png&w=32&q=75",
  openGraph: {
    type: "website",
    url: "https://getpalette.vercel.app/",
    title: "GetPalette",
    description: "Generate beautiful color palettes from your images",
    siteName: "GetPalette",
    images: [
      {
        url: "https://raw.githubusercontent.com/ajoykumardas12/get-palette/main/public/images/get-palette.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ajoykdas",
    images:
      "https://raw.githubusercontent.com/ajoykumardas12/get-palette/main/public/images/get-palette.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

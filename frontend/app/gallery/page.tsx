import type { Metadata } from "next";
import GalleryGrid from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "Visual Gallery of Moroccan Sights & Landscapes | Rihla Morocco",
  description:
    "Immerse yourself in high-definition photos of Moroccan tourist sites: the dunes of Sahara, historic riads in Fes, blue streets of Chefchaouen, and Atlas gorges.",
  openGraph: {
    title: "Visual Gallery of Moroccan Sights & Landscapes | Rihla Morocco",
    description: "Browse high-definition photos of Sahara, Chefchaouen, Fes, and High Atlas Mountains.",
    url: "https://rihlamorocco.com/gallery",
  }
};

export default function GalleryPage() {
  return <GalleryGrid />;
}

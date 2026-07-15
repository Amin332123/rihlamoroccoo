import type { Metadata } from "next";
import ExcursionsList from "@/components/excursions/excursions-list";

export const metadata: Metadata = {
  title: "Private Moroccan Excursions & Guided Day Tours | Rihla Morocco",
  description:
    "Explore our collection of private Moroccan excursions. Sahara desert safaris, private Atlas Mountain hikes, and historic Medina tours. Pay on confirmation.",
  openGraph: {
    title: "Private Moroccan Excursions & Guided Day Tours | Rihla Morocco",
    description: "Explore Sahara desert safaris, private Atlas hikes, and Medina tours.",
    url: "https://rihlamorocco.com/excursions",
  }
};

export default function ExcursionsPage() {
  return <ExcursionsList />;
}

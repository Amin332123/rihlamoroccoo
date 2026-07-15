import type { Metadata } from "next";
import AboutContent from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "Our Story & Boutique Hospitality Mission | Rihla Morocco",
  description:
    "Learn about our mission to curate premium custom excursions across Morocco. Discover our local guides, responsible travel values, and history since 2021.",
  openGraph: {
    title: "Our Story & Boutique Hospitality Mission | Rihla Morocco",
    description: "Curating luxury excursions with local soul since 2021.",
    url: "https://rihlamorocco.com/about",
  }
};

export default function AboutPage() {
  return <AboutContent />;
}

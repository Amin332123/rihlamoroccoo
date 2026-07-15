import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExcursionDetails from "@/components/excursions/excursion-details";
import { ApiClient } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await ApiClient.get(`/excursions/${id}`);
  
  if (!res.success || !res.data) return {};
  const excursion = res.data;
  
  return {
    title: `${excursion.title} | Private Tours | Rihla Morocco`,
    description: excursion.shortDescription,
    openGraph: {
      title: `${excursion.title} | Rihla Morocco`,
      description: excursion.shortDescription,
      images: [{ url: excursion.featuredImage || excursion.image }],
    }
  };
}

export default async function ExcursionPage({ params }: Props) {
  const { id } = await params;
  const res = await ApiClient.get(`/excursions/${id}`);

  if (!res.success || !res.data) {
    notFound();
  }

  const excursion = res.data;

  // Fetch all excursions to find two related tours
  const allRes = await ApiClient.get("/excursions");
  const allExcursions = allRes.success && allRes.data ? allRes.data : [];
  const relatedExcursions = allExcursions.filter((e: any) => e.id !== excursion.id).slice(0, 2);

  return <ExcursionDetails excursion={excursion} relatedExcursions={relatedExcursions} />;
}

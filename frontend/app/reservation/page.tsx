import type { Metadata } from "next";
import { Suspense } from "react";
import ReservationForm from "@/components/reservation/reservation-form";

export const metadata: Metadata = {
  title: "Reserve Private Tour Seats | Rihla Morocco",
  description:
    "Fill out our quick private seat reservation form. No deposit or card payments required online. Confirm details directly via WhatsApp or Phone.",
  openGraph: {
    title: "Reserve Private Tour Seats | Rihla Morocco",
    description: "Book your luxury private tours across Morocco today.",
    url: "https://rihlamorocco.com/reservation",
  }
};

export default function ReservationPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 text-center text-sm font-light uppercase tracking-widest text-light-txt">
        Loading form...
      </div>
    }>
      <ReservationForm />
    </Suspense>
  );
}

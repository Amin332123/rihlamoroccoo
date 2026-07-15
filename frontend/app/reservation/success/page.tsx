import type { Metadata } from "next";
import { Suspense } from "react";
import ReservationSuccess from "@/components/reservation/reservation-success";

export const metadata: Metadata = {
  title: "Reservation Request Confirmed | Rihla Morocco",
  description:
    "Shukran! Your seat reservation request has been received. Our luxury travel advisor will contact you on WhatsApp or phone shortly.",
  openGraph: {
    title: "Reservation Request Confirmed | Rihla Morocco",
    description: "Your seat reservation request has been received.",
    url: "https://rihlamorocco.com/reservation/success",
  }
};

export default function ReservationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 text-center text-sm font-light uppercase tracking-widest text-light-txt">
        Loading confirmation...
      </div>
    }>
      <ReservationSuccess />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rihla Morocco | Premium Excursion Booking & Private Tours",
  description:
    "Discover the luxury of Morocco with custom private excursions, desert adventures, and curated trips. Experience authentic Moroccan hospitality. Book your seats today.",
  openGraph: {
    title: "Rihla Morocco | Premium Excursion Booking & Private Tours",
    description:
      "Embark on luxury journeys across Morocco. High-end excursions, premium private transport, and local expert guides.",
    url: "https://rihlamorocco.com",
    siteName: "Rihla Morocco",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rihla Morocco | Premium Excursion Booking & Private Tours",
    description: "Embark on luxury journeys across Morocco.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-bg text-dark-txt font-sans">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Our Hospitality Team | Rihla Morocco",
  description:
    "Get in touch with Rihla Morocco travel expert. Request custom pricing, private desert tour quotes, or ask questions on phone, email, or direct WhatsApp.",
  openGraph: {
    title: "Contact Our Hospitality Team | Rihla Morocco",
    description: "Get in touch with our team via WhatsApp, phone, or email.",
    url: "https://rihlamorocco.com/contact",
  }
};

export default function ContactPage() {
  return <ContactForm />;
}

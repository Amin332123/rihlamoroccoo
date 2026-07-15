"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-primary-green text-white/90 pt-20 pb-10 border-t border-sand/15 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-sand/10">
        
        {/* Brand Column */}
        <div className="space-y-6 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded group">
            <img 
              src="/logo.png" 
              alt="Rihla Morocco Logo" 
              className="object-contain" 
              style={{ width: "90px", height: "90px", minWidth: "90px", minHeight: "90px" }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-wider text-sand">
                RIHLA MOROCCO
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-white/60 -mt-1">
                Luxury Travel Experiences
              </span>
            </div>
          </Link>
          <p className="text-sm font-light text-white/70 leading-relaxed max-w-sm">
            Curating premium journeys and luxury private excursions across Morocco. Discover gold sand dunes, blue medinas, and rugged mountains with local hospitality.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-sand tracking-wide">Quick Links</h4>
          <ul className="space-y-2.5 text-sm font-light text-white/70">
            <li>
              <Link href="/" className="hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                Home
              </Link>
            </li>
            <li>
              <Link href="/excursions" className="hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                Excursions
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Top Destinations */}
        <div className="space-y-4">
          <h4 className="font-serif text-lg text-sand tracking-wide">Destinations</h4>
          <ul className="space-y-2.5 text-sm font-light text-white/70">
            <li>
              <span className="block">Merzouga Dunes</span>
            </li>
            <li>
              <span className="block">Marrakesh Medina</span>
            </li>
            <li>
              <span className="block">High Atlas Mountains</span>
            </li>
            <li>
              <span className="block">Chefchaouen Blue Medina</span>
            </li>
            <li>
              <span className="block">Essaouira Atlantic Coast</span>
            </li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-serif text-lg text-sand tracking-wide">Get in Touch</h4>
            <p className="text-sm font-light text-white/70">
              Marrakech, Morocco
            </p>
            <p className="text-sm font-light text-white/70">
              Email:{" "}
              <a href="mailto:info@rihlamorocco.com" className="hover:text-white underline focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                info@rihlamorocco.com
              </a>
            </p>
            <p className="text-sm font-medium text-white">
              WhatsApp:{" "}
              <a href="https://wa.me/212679675893" target="_blank" rel="noopener noreferrer" className="hover:text-sand underline focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">
                +212 679 675 893
              </a>
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://wa.me/212679675893"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand hover:text-primary-green transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-base" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand hover:text-primary-green transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none"
              aria-label="Instagram"
            >
              <FaInstagram className="text-base" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand hover:text-primary-green transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-base" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-sand/20 flex items-center justify-center hover:bg-sand hover:text-primary-green transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none"
              aria-label="Pinterest"
            >
              <FaPinterestP className="text-base" />
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-light text-white/50">
        <p>© {new Date().getFullYear()} Rihla Morocco. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 outline-none rounded">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

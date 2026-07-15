"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Excursions", href: "/excursions" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Check scroll position to transition the navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Is current page home? Home page has a transparent hero video, other pages might start clean
  const isHome = !mounted || pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-cream-bg/90 backdrop-blur-md border-b border-sand/20 py-4 shadow-sm"
            : isHome
            ? "bg-transparent py-6"
            : "bg-cream-bg/40 backdrop-blur-sm py-5 border-b border-sand/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 select-none">
            <img 
              src="/logo.png" 
              alt="Rihla Morocco Logo" 
              className="object-contain" 
              style={{ width: "90px", height: "90px", minWidth: "90px", minHeight: "90px" }}
            />
            <div className="flex flex-col">
              <span
                className={`font-serif text-xl md:text-2xl font-semibold tracking-wider transition-colors duration-300 ${
                  isScrolled || !isHome
                    ? "text-primary-green"
                    : "text-white group-hover:text-sand"
                }`}
              >
                RIHLA MOROCCO
              </span>
              <span
                className={`text-[8px] uppercase tracking-[0.25em] transition-colors duration-300 -mt-1 ${
                  isScrolled || !isHome
                    ? "text-desert-brown"
                    : "text-sand/80 group-hover:text-white"
                }`}
              >
                Luxury Travel Experiences
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-widest uppercase transition-colors duration-300 font-medium py-2 focus-visible:ring-2 focus-visible:ring-primary-green rounded-md outline-none"
                >
                  <span
                    className={`${
                      isScrolled || !isHome
                        ? isActive
                          ? "text-primary-green"
                          : "text-dark-txt/80 hover:text-primary-green"
                        : isActive
                        ? "text-accent-gold"
                        : "text-white/95 hover:text-sand"
                    }`}
                  >
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${
                        isScrolled || !isHome
                          ? "bg-primary-green"
                          : "bg-accent-gold"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/reservation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-[14px] text-xs font-semibold tracking-widest uppercase transition-colors duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none cursor-pointer ${
                  isScrolled || !isHome
                    ? "bg-primary-green hover:bg-desert-brown text-white"
                    : "bg-white hover:bg-sand text-primary-green"
                }`}
              >
                Reserve Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none rounded-md"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <HiOutlineX
                className={`h-6 w-6 ${
                  isScrolled || !isHome ? "text-dark-txt" : "text-white"
                }`}
              />
            ) : (
              <HiOutlineMenuAlt4
                className={`h-6 w-6 ${
                  isScrolled || !isHome ? "text-dark-txt" : "text-white"
                }`}
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream-bg flex flex-col justify-between pt-28 pb-12 px-8 md:hidden"
          >
            {/* Nav Links */}
            <div className="flex flex-col space-y-6 mt-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between"
                  >
                    <span
                      className={`font-serif text-3xl tracking-wide transition-colors ${
                        isActive ? "text-desert-brown" : "text-dark-txt"
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="h-[1px] w-8 bg-sand group-hover:w-16 transition-all duration-300" />
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col space-y-6 mt-auto">
              <Link href="/reservation" className="w-full">
                <button className="w-full py-4 bg-primary-green hover:bg-desert-brown text-white font-semibold tracking-widest uppercase rounded-[14px] transition-colors duration-300 shadow-md">
                  Reserve Now
                </button>
              </Link>
              
              <div className="text-center">
                <p className="text-xs text-light-txt uppercase tracking-widest mb-1">
                  Contact Us
                </p>
                <a
                  href="tel:+212600000000"
                  className="font-serif text-md text-primary-green tracking-wide block"
                >
                  +212 600 000 000
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

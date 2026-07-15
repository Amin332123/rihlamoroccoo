"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/top-bar";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen w-full bg-cream-bg flex items-center justify-center font-sans text-dark-txt">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-bg/40 font-sans flex text-dark-txt">
      
      {/* Desktop Sidebar (Left) */}
      <div className="hidden md:block">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>

      {/* Mobile Drawer Navigation (Slide overlay) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="fixed top-0 bottom-0 left-0 w-[260px] z-50 bg-white border-r border-sand/20 flex flex-col justify-between md:hidden shadow-xl"
            >
              <div>
                <div className="h-20 flex items-center justify-between px-5 border-b border-sand/15">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-cream-bg rounded-xl shrink-0">
                      <img src="/logo.png" alt="Rihla Morocco Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-serif text-sm font-bold tracking-wider text-primary-green uppercase -mb-0.5">
                        RIHLA PORTAL
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-light-txt font-semibold">
                        Management Center
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 bg-cream-bg text-desert-brown hover:text-primary-green rounded-xl outline-none"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Mobile Menu Links */}
                <div className="p-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <Sidebar isCollapsed={false} setIsCollapsed={() => {}} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area (Right) */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          isCollapsed ? "md:pl-[76px]" : "md:pl-[260px]"
        } pl-0`}
      >
        <TopBar onToggleMobileMenu={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}

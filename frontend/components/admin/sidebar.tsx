"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  CalendarCheck,
  Image as ImageIcon,
  MessageSquare,
  Star,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const MENU_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Excursions", href: "/admin/excursions", icon: Compass },
  { label: "Reservations", href: "/admin/reservations", icon: CalendarCheck },
  { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 76 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-sand/20 flex flex-col justify-between shrink-0"
    >
      <div>
        {/* Admin Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-sand/15">
          <Link href="/admin" className="flex items-center gap-2.5 overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-primary-green rounded">
            <div className="p-1.5 bg-cream-bg rounded-xl shrink-0">
              <img src="/logo.png" alt="Rihla Morocco Logo" className="w-6 h-6 object-contain" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-col text-left"
              >
                <span className="font-serif text-sm font-bold tracking-wider text-primary-green uppercase -mb-0.5">
                  RIHLA PORTAL
                </span>
                <span className="text-[9px] uppercase tracking-widest text-light-txt font-semibold">
                  Management Center
                </span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3.5 space-y-1.5 flex-1">
          {MENU_ITEMS.map((item) => {
            // Precise matching logic
            const isReallyActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="outline-none block select-none">
                <div
                  className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 group cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 ${
                    isReallyActive
                      ? "text-primary-green bg-cream-bg font-bold"
                      : "text-dark-txt/70 hover:bg-cream-bg/40 hover:text-primary-green"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isReallyActive ? "text-primary-green" : "text-light-txt"
                  }`} />
                  
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {isReallyActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-primary-green rounded-r-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Collapse Trigger Footer */}
      <div className="p-4 border-t border-sand/15 flex items-center justify-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2.5 bg-cream-bg hover:bg-sand/20 text-desert-brown hover:text-primary-green rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-1 outline-none"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </motion.aside>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Bell, Sun, Moon, LogOut, ExternalLink, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface TopBarProps {
  onToggleMobileMenu?: () => void;
}

export default function TopBar({ onToggleMobileMenu }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [adminUser, setAdminUser] = useState<any>({ name: "Boutique Admin", role: "Super Admin" });

  useEffect(() => {
    // Retrieve logged-in administrator metadata
    const userCookie = Cookies.get("rihla_admin_user");
    if (userCookie) {
      try {
        setAdminUser(JSON.parse(userCookie));
      } catch (err) {
        console.error("Failed to parse admin user profile", err);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("rihla_admin_session");
    Cookies.remove("rihla_admin_user");
    window.location.href = "/admin/login";
  };

  // Breadcrumbs builder
  const segments = pathname.split("/").filter(Boolean);
  const avatarLetter = adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A";

  return (
    <header className="h-20 bg-white border-b border-sand/20 px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Left side: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-dark-txt hover:text-primary-green hover:bg-cream-bg rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
            aria-label="Toggle Navigation Drawer"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs tracking-widest uppercase font-semibold text-light-txt select-none">
          <Link href="/admin" className="hover:text-primary-green transition-colors focus-visible:ring-2 focus-visible:ring-primary-green outline-none rounded px-1.5 py-0.5">
            Admin
          </Link>
          {segments.slice(1).map((segment, index) => {
            const path = `/admin/${segments.slice(2, 2 + index).join("/")}`;
            const isLast = index === segments.length - 2;

            return (
              <div key={segment} className="flex items-center gap-1.5">
                <span className="text-sand/70">/</span>
                {isLast ? (
                  <span className="text-desert-brown font-bold font-serif normal-case text-sm tracking-normal">
                    {segment.replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link href={path} className="hover:text-primary-green transition-colors focus-visible:ring-2 focus-visible:ring-primary-green outline-none rounded px-1.5 py-0.5">
                    {segment}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4">
        
        {/* Search Mock */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-light-txt absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search portal..."
            suppressHydrationWarning
            className="bg-cream-bg/40 border border-sand/25 hover:border-sand/50 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-all w-48 focus:w-64"
          />
        </div>

        {/* Live Site Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-cream-bg text-desert-brown hover:text-primary-green hover:bg-sand/15 rounded-xl transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-green flex items-center justify-center cursor-pointer"
          title="View Live Website"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>

        {/* Light/Dark Toggle Placeholder */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2.5 bg-cream-bg text-desert-brown hover:text-primary-green hover:bg-sand/15 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
          aria-label="Toggle Theme Mode"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Notification Icon */}
        <button
          className="p-2.5 bg-cream-bg text-desert-brown hover:text-primary-green hover:bg-sand/15 rounded-xl relative transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
          aria-label="View Alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-cream-bg" />
        </button>

        <div className="h-6 w-[1px] bg-sand/20 hidden sm:block" />

        {/* User Info & Avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block select-none">
            <p className="text-xs font-bold text-dark-txt uppercase tracking-wider">{adminUser.name}</p>
            <p className="text-[9px] font-semibold text-desert-brown uppercase tracking-widest">{adminUser.role}</p>
          </div>
          
          {/* Avatar frame */}
          <div className="w-9 h-9 rounded-xl bg-primary-green text-white font-serif flex items-center justify-center font-bold text-sm shadow-sm select-none">
            {avatarLetter}
          </div>

          <div className="h-6 w-[1px] bg-sand/20 hidden sm:block" />

          {/* Logout Action Button */}
          <button
            onClick={handleLogout}
            className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-rose-600 outline-none flex items-center justify-center"
            title="Logout Session"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="bg-cream-bg min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="max-w-md mx-auto px-6 text-center space-y-8">
        
        {/* Large stylized number */}
        <h1 className="font-serif text-[120px] font-extrabold text-desert-brown leading-none tracking-tighter select-none">
          404
        </h1>

        <div className="space-y-3">
          <span className="text-primary-green font-semibold tracking-[0.25em] text-xs uppercase block">
            OASIS NOT FOUND
          </span>
          <h2 className="font-serif text-2xl font-medium tracking-wide text-primary-green">
            Lost in the Dunes
          </h2>
          <p className="text-light-txt font-light text-sm leading-relaxed max-w-sm mx-auto">
            The path you are looking for has been covered by shifting desert sands. Let us guide you back to our main caravan routes.
          </p>
        </div>

        <div className="h-[1px] bg-sand/20 max-w-xs mx-auto" />

        {/* Action Link */}
        <div className="flex justify-center">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors shadow-sm"
            >
              Return to Safety
            </motion.button>
          </Link>
        </div>

      </div>
    </div>
  );
}

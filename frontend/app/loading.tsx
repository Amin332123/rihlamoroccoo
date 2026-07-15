"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="bg-cream-bg min-h-screen flex flex-col items-center justify-center pt-24 pb-12">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Minimal Animated Spinner */}
        <div className="relative w-16 h-16">
          {/* Inner circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-16 h-16 rounded-full border-2 border-sand/40 border-t-primary-green absolute"
          />
          {/* Accent dot */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-3.5 h-3.5 rounded-full bg-desert-brown absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Brand Text */}
        <div className="text-center flex flex-col items-center gap-2 select-none">
          <img src="/logo.png" alt="Rihla Morocco Logo" className="h-8 w-auto object-contain" />
          <div>
            <p className="font-serif text-lg tracking-widest text-primary-green font-medium">
              RIHLA MOROCCO
            </p>
            <p className="text-[9px] uppercase tracking-[0.3em] text-desert-brown mt-1">
              Loading Experience...
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

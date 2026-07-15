"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { ApiClient } from "@/lib/api";

export default function ReservationSuccess() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Guest";
  const excursionId = searchParams.get("excursion");
  
  const [excursion, setExcursion] = useState<any | null>(null);

  useEffect(() => {
    async function loadExcursion() {
      if (excursionId) {
        const res = await ApiClient.get(`/excursions/${excursionId}`);
        if (res.success) {
          setExcursion(res.data);
        }
      }
    }
    loadExcursion();
  }, [excursionId]);

  return (
    <div className="pt-40 pb-32 bg-cream-bg min-h-screen flex items-center justify-center">
      <div className="max-w-xl mx-auto px-6 text-center space-y-8">
        
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="inline-flex p-5 rounded-[22px] bg-primary-green/10 border border-primary-green/20"
        >
          <HiOutlineCheckBadge className="w-16 h-16 text-primary-green" />
        </motion.div>

        {/* Heading */}
        <div className="space-y-3">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block">
            RESERVATION RECEIVED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-primary-green font-medium tracking-wide">
            Marhaba, {name}!
          </h1>
          <p className="text-light-txt font-light text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Your seat reservation request has been registered. Our hospitality team is checking availability and will contact you shortly via WhatsApp or phone.
          </p>
        </div>

        {/* Selected Tour Summary Card */}
        {excursion && (
          <div className="p-6 bg-white border border-sand/20 rounded-[20px] shadow-sm max-w-sm mx-auto text-left space-y-2.5">
            <span className="text-[10px] text-desert-brown font-bold uppercase tracking-wider">
              Selected Tour
            </span>
            <h3 className="font-serif text-lg font-bold text-primary-green">
              {excursion.title}
            </h3>
            <div className="flex justify-between text-xs text-light-txt pt-2 border-t border-sand/10">
              <span>Duration: {excursion.duration}</span>
              <span>Price: {excursion.price}</span>
            </div>
          </div>
        )}

        {/* Help text */}
        <p className="text-xs text-light-txt/80 italic font-light max-w-xs mx-auto">
          Need to change details? Message our travel specialist immediately on WhatsApp at +212 679 675 893.
        </p>

        <div className="h-[1px] bg-sand/20 max-w-xs mx-auto" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/excursions" className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none rounded-[14px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors cursor-pointer"
            >
              Browse Excursions
            </motion.button>
          </Link>
          <Link href="/" className="w-full sm:w-auto focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none rounded-[14px]">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white border border-sand/25 hover:bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors cursor-pointer"
            >
              Back to Home
            </motion.button>
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-white border border-sand/20 rounded-[20px] shadow-sm flex items-start justify-between"
    >
      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-widest text-light-txt">
          {title}
        </span>
        <h3 className="font-serif text-3xl font-bold text-primary-green">
          {value}
        </h3>
        
        {change && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span
              className={`text-xs font-semibold ${
                trend === "up"
                  ? "text-emerald-700"
                  : trend === "down"
                  ? "text-red-700"
                  : "text-light-txt"
              }`}
            >
              {change}
            </span>
            <span className="text-[10px] text-light-txt font-medium uppercase tracking-wider">
              vs last month
            </span>
          </div>
        )}
      </div>

      <div className="p-3 bg-cream-bg text-desert-brown rounded-xl shadow-inner">
        <Icon className="w-5 h-5" />
      </div>
    </motion.div>
  );
}

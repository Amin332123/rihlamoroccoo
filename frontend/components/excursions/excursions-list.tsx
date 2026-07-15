"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { ApiClient } from "@/lib/api";

const CATEGORIES = ["All Excursions", "Desert", "Medina", "Mountains", "Coast"];

export default function ExcursionsList() {
  const [excursions, setExcursions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Excursions");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadExcursions() {
      setIsLoading(true);
      const res = await ApiClient.get("/excursions");
      if (res.success && res.data) {
        setExcursions(res.data);
      } else {
        setErrorMsg(res.error || "Failed to load excursions catalog.");
      }
      setIsLoading(false);
    }
    loadExcursions();
  }, []);

  const filteredExcursions = excursions.filter((excursion) => {
    const matchesCategory =
      activeCategory === "All Excursions" ||
      excursion.location.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]) ||
      excursion.id.toLowerCase().includes(activeCategory.toLowerCase().split(" ")[0]);
      
    const matchesSearch =
      excursion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excursion.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-cream-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            MOROCCAN ESCAPES
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-medium tracking-wide">
            Our Private Excursions
          </h1>
          <p className="text-light-txt font-light text-sm mt-4 leading-relaxed">
            Carefully curated private day tours and multi-day packages. Enjoy luxury transport, certified local guides, and custom itineraries.
          </p>
        </div>

        {/* Filter & Search Bar UI */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-sand/20 mb-12">
          {/* Category Chips */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-[14px] text-xs tracking-widest uppercase font-semibold border transition-all duration-300 whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none ${
                  activeCategory === category
                    ? "bg-primary-green border-primary-green text-white"
                    : "bg-white border-sand/20 text-dark-txt/70 hover:border-primary-green/35 hover:text-primary-green"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search excursions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-sand/25 rounded-[14px] text-sm text-dark-txt placeholder:text-light-txt/65 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors shadow-sm"
            />
            <FiSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-light-txt text-base" />
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="h-[450px] w-full rounded-[20px] bg-sand/10 animate-pulse border border-sand/15" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMsg && (
          <div className="text-center p-12 bg-white border border-sand/20 rounded-[20px] space-y-4 max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-700">{errorMsg}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 bg-primary-green text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Catalog Grid */}
        {!isLoading && !errorMsg && (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredExcursions.map((excursion) => (
                <motion.div
                  key={excursion.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col overflow-hidden border border-sand/20"
                >
                  {/* Card Image */}
                  <div className="relative h-[260px] w-full overflow-hidden bg-sand/5">
                    <Image
                      src={excursion.featuredImage || excursion.image || "/images/21a923029795828bde02c6ff404ebc43.jpg"}
                      alt={excursion.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-desert-brown">
                        <span>{excursion.location}</span>
                        <span>{excursion.duration}</span>
                      </div>
                      <h3 className="font-serif text-xl font-medium text-primary-green group-hover:text-desert-brown transition-colors duration-300">
                        {excursion.title}
                      </h3>
                      <p className="text-light-txt font-light text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {excursion.shortDescription}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-sand/15">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-light-txt/80 block">From</span>
                        <span className="font-serif text-lg font-bold text-primary-green">{excursion.price}</span>
                      </div>
                      <Link href={`/excursions/${excursion.slug}`} className="outline-none">
                        <button className="px-5 py-2.5 bg-primary-green hover:bg-desert-brown text-white text-[10px] font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none">
                          View Journey
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !errorMsg && filteredExcursions.length === 0 && (
          <div className="text-center p-20 bg-white border border-sand/20 rounded-[20px] max-w-lg mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-desert-brown block">No Journeys Found</span>
            <p className="text-xs font-light text-light-txt leading-relaxed">
              We couldn't find any excursions matching your filter criteria. Try adjusting your search query or selecting a different category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

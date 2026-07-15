"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineZoomIn } from "react-icons/hi";
import { ApiClient } from "@/lib/api";

const GALLERY_CATEGORIES = ["All", "Desert", "Medina", "Mountains", "Coast", "Architecture"];

export default function GalleryGrid() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      const res = await ApiClient.get("/gallery");
      if (res.success && res.data) {
        setImages(res.data);
      } else {
        setErrorMsg(res.error || "Failed to load gallery photos.");
      }
      setIsLoading(false);
    }
    loadImages();
  }, []);

  const filteredImages = images.filter((img) =>
    activeCategory === "All" ? true : img.category === activeCategory
  );

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-cream-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            MOROCCOS SPLENDOR
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-medium tracking-wide">
            Visual Gallery
          </h1>
          <p className="text-light-txt font-light text-sm mt-4 leading-relaxed">
            Immerse yourself in the vivid palettes and dramatic landscapes of Morocco. A collection of raw emotions, architectural design details, and pristine nature.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-10 scrollbar-none border-b border-sand/20 mb-12">
          {GALLERY_CATEGORIES.map((category) => (
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

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="h-64 w-full rounded-[22px] bg-sand/10 animate-pulse border border-sand/15" />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMsg && (
          <div className="text-center p-12 bg-white border border-sand/20 rounded-[20px] max-w-md mx-auto">
            <p className="text-xs text-red-700 font-semibold">{errorMsg}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !errorMsg && filteredImages.length === 0 && (
          <div className="text-center p-16 bg-white border border-sand/20 rounded-[22px] max-w-sm mx-auto">
            <span className="text-xs uppercase font-bold tracking-widest text-desert-brown block">No Photos Found</span>
            <p className="text-xs text-light-txt font-light leading-relaxed mt-1">We couldn't find any photos in this category.</p>
          </div>
        )}

        {/* Masonry-like Grid Layout */}
        {!isLoading && !errorMsg && (
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id || image.image + index}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative break-inside-avoid overflow-hidden rounded-[22px] shadow-sm hover:shadow-md cursor-zoom-in group border border-sand/20 bg-white focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedImage(image.image);
                  }
                }}
              >
                <div className="relative w-full h-auto min-h-[220px]">
                  <img
                    src={image.image}
                    alt={image.title}
                    onClick={() => setSelectedImage(image.image)}
                    className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-700 ease-out rounded-[22px]"
                  />
                </div>

                {/* Hover overlay details */}
                <div
                  onClick={() => setSelectedImage(image.image)}
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                >
                  <div className="flex justify-between items-end text-white">
                    <div>
                      <span className="text-[10px] text-sand uppercase tracking-wider block mb-1">
                        {image.category}
                      </span>
                      <h3 className="font-serif text-lg font-semibold tracking-wide">
                        {image.title}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                      <HiOutlineZoomIn className="text-white text-base" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/25 rounded-full border border-white/15 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <HiOutlineX className="text-xl" />
              </button>

              {/* Lightbox Image Container */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt="Enlarged gallery view"
                    fill
                    sizes="(max-width: 1200px) 100vw, 80vw"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

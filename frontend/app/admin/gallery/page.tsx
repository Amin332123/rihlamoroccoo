"use client";

import { useState, useEffect } from "react";
import { ImageIcon, Plus, Trash2, CheckCircle2, XCircle, Search, Filter } from "lucide-react";
import { ApiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Desert", "Medina", "Mountains", "Coast", "Architecture"];

export default function GalleryAdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Desert");
  const [newSrc, setNewSrc] = useState("/images/21a923029795828bde02c6ff404ebc43.jpg"); // Mock file

  const loadImages = async () => {
    setIsLoading(true);
    const res = await ApiClient.get("/gallery");
    if (res.success && res.data) {
      setImages(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const filteredImages = images.filter((img) =>
    activeCategory === "All" ? true : img.category === activeCategory
  );

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const res = await ApiClient.patch(`/gallery/${id}`, {
      featured: !currentFeatured
    });
    if (res.success) {
      setImages(
        images.map((img) => (img.id === id ? { ...img, featured: !currentFeatured } : img))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this photo?")) {
      const res = await ApiClient.delete(`/gallery/${id}`);
      if (res.success) {
        setImages(images.filter((img) => img.id !== id));
      }
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      const payload = {
        title: newTitle.trim(),
        category: newCategory,
        image: newSrc,
        featured: false
      };

      const res = await ApiClient.post("/gallery", payload);
      if (res.success && res.data) {
        setImages([res.data, ...images]);
        setNewTitle("");
        setIsUploadOpen(false);
      } else {
        alert(res.error || "Failed to upload image.");
      }
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-primary-green">
            Visual Gallery Manager
          </h1>
          <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
            Publish pictures to public albums and configure home showcase layouts
          </p>
        </div>
        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Category Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-sand/20">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase font-bold border transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none ${activeCategory === cat
                ? "bg-primary-green border-primary-green text-white"
                : "bg-white border-sand/20 text-light-txt hover:border-primary-green/30"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="aspect-square rounded-[22px] bg-sand/10 animate-pulse border border-sand/15" />
          ))}
        </div>
      )}

      {/* Media grid cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Upload Trigger Card */}
          <div
            onClick={() => setIsUploadOpen(true)}
            className="aspect-square rounded-[22px] border-2 border-dashed border-sand/40 hover:border-primary-green/40 bg-white/20 hover:bg-cream-bg/25 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group text-desert-brown"
          >
            <div className="p-3 bg-white border border-sand/15 rounded-xl group-hover:scale-105 transition-transform duration-300">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-light-txt group-hover:text-primary-green transition-colors">
              Upload Image
            </span>
          </div>

          {/* Existing Images */}
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="aspect-square rounded-[22px] border border-sand/20 overflow-hidden relative group bg-white shadow-sm"
            >
              <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out" />

              {/* Top status tags */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm border border-sand/15 text-[8px] uppercase tracking-wider font-bold rounded-lg text-primary-green">
                  {img.category}
                </span>
                {img.featured && (
                  <span className="px-2 py-1 bg-primary-green text-white text-[8px] uppercase tracking-wider font-bold rounded-lg shadow-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Bottom Actions Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="space-y-3">
                  <h4 className="font-serif text-white font-bold text-sm truncate">{img.title}</h4>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleToggleFeatured(img.id, img.featured)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-colors cursor-pointer ${img.featured
                          ? "bg-primary-green border-primary-green text-white"
                          : "bg-white border-white/20 text-dark-txt hover:bg-sand"
                        }`}
                    >
                      {img.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                      aria-label="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* Upload Dialog Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadOpen(false)}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-sand/25 max-w-md w-full rounded-[22px] p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-sand/15">
                <div className="flex items-center gap-2 text-primary-green">
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-serif text-base font-bold">Upload Image</span>
                </div>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 hover:bg-cream-bg rounded-lg"
                >
                  <XCircle className="w-4 h-4 text-light-txt" />
                </button>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Image Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Hiking Toubkal High Valleys"
                    className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                  >
                    {CATEGORIES.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-8 bg-sand/10 border border-dashed border-sand/30 rounded-xl text-center space-y-2">
                  <span className="text-[9px] uppercase tracking-widest text-desert-brown font-bold block">
                    Choose Photo File
                  </span>
                  <p className="text-[8px] text-light-txt">Supports PNG, JPG, or WEBP max 3MB</p>
                </div>

                <div className="flex gap-3 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadOpen(false)}
                    className="px-4 py-2 bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-green text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

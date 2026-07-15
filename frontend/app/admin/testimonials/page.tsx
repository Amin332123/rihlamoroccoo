"use client";

import { useState, useEffect } from "react";
import { Star, Plus, Trash2, CheckCircle2, XCircle, Search, Edit } from "lucide-react";
import { ApiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  const loadTestimonials = async () => {
    setIsLoading(true);
    const res = await ApiClient.get("/testimonials");
    if (res.success && res.data) {
      setTestimonials(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const filtered = testimonials.filter((t) =>
    t.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    const res = await ApiClient.patch(`/testimonials/${id}`, {
      featured: !currentFeatured
    });
    if (res.success) {
      setTestimonials(
        testimonials.map((t) => (t.id === id ? { ...t, featured: !currentFeatured } : t))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const res = await ApiClient.delete(`/testimonials/${id}`);
      if (res.success) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newComment.trim()) {
      const payload = {
        fullName: newName.trim(),
        country: newCountry.trim(),
        rating: newRating,
        comment: newComment.trim(),
        featured: false
      };

      const res = await ApiClient.post("/testimonials", payload);
      if (res.success && res.data) {
        setTestimonials([res.data, ...testimonials]);
        setNewName("");
        setNewCountry("");
        setNewComment("");
        setIsOpen(false);
      } else {
        alert(res.error || "Failed to add testimonial.");
      }
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-primary-green">
            Guest Testimonials
          </h1>
          <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
            Display client reviews on the homepage highlight sections
          </p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-sand/20 rounded-[20px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Filter testimonials by name or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
        <div className="text-[10px] uppercase font-bold tracking-widest text-light-txt">
          Total Reviews: {filtered.length}
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2].map((num) => (
            <div key={num} className="h-16 w-full rounded-xl bg-sand/10 animate-pulse border border-sand/15" />
          ))}
        </div>
      )}

      {/* Testimonials Table */}
      {!isLoading && (
        <div className="bg-white border border-sand/20 rounded-[22px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider border-collapse">
              <thead>
                <tr className="border-b border-sand/15 text-light-txt font-semibold uppercase text-[10px] bg-cream-bg/25">
                  <th className="p-4 pl-6">Guest Info</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Rating</th>
                  <th className="p-4">Review Content</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-right pr-6">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10 font-medium">
                {filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-cream-bg/20 transition-colors">
                    <td className="p-4 pl-6 font-bold text-dark-txt">{t.fullName}</td>
                    <td className="p-4 text-light-txt font-semibold">{t.country}</td>
                    
                    {/* Rating Stars */}
                    <td className="p-4 text-desert-brown">
                      <div className="flex gap-0.5 items-center">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-xs">{t.rating}</span>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="p-4 text-light-txt font-light leading-relaxed max-w-sm truncate">
                      {t.comment}
                    </td>

                    {/* Featured Status Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(t.id, t.featured)}
                        className={`inline-flex p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          t.featured
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-gray-50 border-gray-200 text-gray-400"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Delete Button */}
                    <td className="p-4 text-right pr-6">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Creation Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
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
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-serif text-base font-bold">Add Guest Testimonial</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-cream-bg rounded-lg">
                  <XCircle className="w-4 h-4 text-light-txt" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Guest Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Country</label>
                    <input
                      type="text"
                      required
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      placeholder="e.g. Germany"
                      className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Star Rating (1-5)</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt"
                  >
                    {[5, 4.5, 4, 3.5, 3].map((num) => (
                      <option key={num} value={num}>
                        {num} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Review Comment</label>
                  <textarea
                    rows={4}
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type the guest's detailed review..."
                    className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt resize-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-green text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                  >
                    Add Testimonial
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

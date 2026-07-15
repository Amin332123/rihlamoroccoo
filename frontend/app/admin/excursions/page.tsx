"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Plus, Edit, Trash2, CheckCircle2, XCircle, Eye, AlertTriangle } from "lucide-react";
import { ApiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function ExcursionsAdminPage() {
  const [excursions, setExcursions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const loadExcursions = async () => {
    setIsLoading(true);
    const res = await ApiClient.get("/excursions");
    if (res.success && res.data) {
      setExcursions(res.data);
    } else {
      setErrorMsg(res.error || "Failed to load excursions.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadExcursions();
  }, []);

  const filteredExcursions = excursions.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      const res = await ApiClient.delete(`/excursions/${deleteId}`);
      if (res.success) {
        setExcursions(excursions.filter((e) => e.id !== deleteId));
      } else {
        alert(res.error || "Failed to delete excursion.");
      }
      setDeleteId(null);
    }
  };

  const handleToggleState = async (id: string, field: "featured" | "published", currentValue: boolean) => {
    const res = await ApiClient.patch(`/excursions/${id}`, {
      [field]: !currentValue
    });
    if (res.success) {
      setExcursions(
        excursions.map((e) => (e.id === id ? { ...e, [field]: !currentValue } : e))
      );
    } else {
      alert(res.error || "Failed to update state.");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-primary-green">
            Excursions Catalog
          </h1>
          <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
            Manage public tours, itineraries, pricing and categories
          </p>
        </div>
        <Link href="/admin/excursions/new" className="outline-none">
          <button className="flex items-center gap-2 px-5 py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none">
            <Plus className="w-4 h-4" />
            <span>Create Excursion</span>
          </button>
        </Link>
      </div>

      {/* Filter & Search Bar UI */}
      <div className="bg-white border border-sand/20 rounded-[20px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Filter excursions by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
        <div className="text-[10px] uppercase font-bold tracking-widest text-light-txt">
          Showing {filteredExcursions.length} of {excursions.length} results
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

      {/* Catalog Table */}
      {!isLoading && (
        <div className="bg-white border border-sand/20 rounded-[22px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider border-collapse">
              <thead>
                <tr className="border-b border-sand/15 text-light-txt font-semibold uppercase text-[10px] bg-cream-bg/25">
                  <th className="p-4 pl-6">Tour Title</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-center">Published</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10 font-medium">
                {filteredExcursions.map((excursion) => (
                  <tr key={excursion.id} className="hover:bg-cream-bg/20 transition-colors">
                    
                    {/* Title & Category info */}
                    <td className="p-4 pl-6">
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-dark-txt">{excursion.title}</span>
                        <span className="text-[9px] text-desert-brown uppercase tracking-wider font-semibold mt-0.5">
                          Slug: {excursion.slug}
                        </span>
                      </div>
                    </td>
                    
                    <td className="p-4 text-dark-txt/90">{excursion.location}</td>
                    <td className="p-4 text-light-txt">{excursion.duration}</td>
                    <td className="p-4 font-bold text-primary-green">{excursion.price}</td>
                    
                    {/* Featured Status Indicator */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleState(excursion.id, "featured", excursion.featured)}
                        className="flex items-center justify-center mx-auto focus:outline-none"
                      >
                        {excursion.featured ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <XCircle className="w-5 h-5 text-sand" />
                        )}
                      </button>
                    </td>

                    {/* Published Status Indicator */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleState(excursion.id, "published", excursion.published)}
                        className="flex items-center justify-center mx-auto focus:outline-none"
                      >
                        {excursion.published ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <XCircle className="w-5 h-5 text-sand" />
                        )}
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/excursions/${excursion.slug}`} target="_blank" className="p-2 bg-cream-bg hover:bg-sand/20 text-desert-brown rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-green outline-none" title="Preview Public Page">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/admin/excursions/${excursion.id}/edit`} className="p-2 bg-cream-bg hover:bg-sand/20 text-desert-brown rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-green outline-none" title="Edit details">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(excursion.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 outline-none"
                          title="Delete excursion"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black"
            />
            {/* Dialog Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white border border-sand/25 max-w-sm w-full rounded-[22px] p-6 shadow-2xl space-y-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg font-bold text-primary-green">
                  Delete Excursion?
                </h4>
                <p className="text-xs font-light text-light-txt leading-relaxed">
                  Are you sure you want to delete this excursion package? This will permanently erase the record from public listings.
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-2.5 bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-600 outline-none"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

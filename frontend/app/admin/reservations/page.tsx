"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck,
  Search,
  Eye,
  Mail,
  Phone,
  MessageSquare,
  Hotel,
  MapPin,
  FileText,
  User,
  Users,
  X,
  Trash2
} from "lucide-react";
import { ApiClient } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

export default function ReservationsAdminPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRes, setSelectedRes] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const loadReservations = async () => {
    setIsLoading(true);
    const res = await ApiClient.get("/reservations");
    if (res.success && res.data) {
      setReservations(res.data);
    } else {
      setErrorMsg(res.error || "Failed to load reservations.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const filteredReservations = reservations.filter((r) =>
    r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (r.excursion?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const res = await ApiClient.patch(`/reservations/${id}`, {
      status: newStatus
    });
    if (res.success) {
      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
      if (selectedRes && selectedRes.id === id) {
        setSelectedRes({ ...selectedRes, status: newStatus });
      }
    } else {
      alert(res.error || "Failed to update reservation status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this reservation request?")) {
      const res = await ApiClient.delete(`/reservations/${id}`);
      if (res.success) {
        setReservations(reservations.filter((r) => r.id !== id));
        setSelectedRes(null);
      } else {
        alert(res.error || "Failed to delete reservation.");
      }
    }
  };

  return (
    <div className="space-y-8 relative">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-medium text-primary-green">
          Seat Reservations
        </h1>
        <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
          Approve, cancel or edit private excursion seat assignments
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-sand/20 rounded-[20px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Filter bookings by guest name or tour..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-md px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
        />
        <div className="text-[10px] uppercase font-bold tracking-widest text-light-txt">
          Total Bookings: {filteredReservations.length}
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

      {/* Tables Grid */}
      {!isLoading && (
        <div className="bg-white border border-sand/20 rounded-[22px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs tracking-wider border-collapse">
              <thead>
                <tr className="border-b border-sand/15 text-light-txt font-semibold uppercase text-[10px] bg-cream-bg/25">
                  <th className="p-4 pl-6">Guest</th>
                  <th className="p-4">Selected Tour</th>
                  <th className="p-4">Travel Date</th>
                  <th className="p-4 text-center">Seats</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Detail Draw</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/10 font-medium">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-cream-bg/20 transition-colors">
                    
                    <td className="p-4 pl-6 font-bold text-dark-txt">{res.fullName}</td>
                    <td className="p-4 text-primary-green">{res.excursion?.title || "Unknown"}</td>
                    <td className="p-4 text-light-txt">{new Date(res.reservationDate).toISOString().split("T")[0]}</td>
                    <td className="p-4 text-center text-dark-txt">{res.numberOfGuests}</td>
                    
                    {/* Status update badge dropdown select */}
                    <td className="p-4">
                      <select
                        value={res.status}
                        onChange={(e) => handleUpdateStatus(res.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-[9px] font-bold border cursor-pointer focus:outline-none ${
                          res.status === "CONFIRMED"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : res.status === "PENDING"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : res.status === "CANCELLED"
                            ? "bg-rose-50 border-rose-200 text-rose-700"
                            : "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>

                    {/* Actions Drawer Toggle */}
                    <td className="p-4 text-right pr-6">
                      <div className="flex justify-end items-center gap-1.5">
                        <button
                          onClick={() => setSelectedRes(res)}
                          className="p-2 bg-cream-bg hover:bg-sand/20 text-desert-brown rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(res.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors cursor-pointer"
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

      {/* Sliding details drawer (Right side overlay) */}
      <AnimatePresence>
        {selectedRes && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRes(null)}
              className="fixed inset-0 z-40 bg-black"
            />
            
            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 bottom-0 right-0 w-full sm:w-[480px] z-50 bg-white border-l border-sand/20 shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-sand/15">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-primary-green" />
                    <span className="font-serif text-lg font-bold text-primary-green">
                      Booking Details
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRes(null)}
                    className="p-2 bg-cream-bg text-desert-brown hover:text-primary-green rounded-xl outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Status bar */}
                <div className="p-4 bg-cream-bg/40 border border-sand/15 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Current Status</span>
                  <select
                    value={selectedRes.status}
                    onChange={(e) => handleUpdateStatus(selectedRes.id, e.target.value)}
                    className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold border cursor-pointer focus:outline-none ${
                      selectedRes.status === "CONFIRMED"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : selectedRes.status === "PENDING"
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : selectedRes.status === "CANCELLED"
                        ? "bg-rose-50 border-rose-200 text-rose-700"
                        : "bg-gray-50 border-gray-200 text-gray-700"
                    }`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                {/* Details Section */}
                <div className="space-y-5">
                  
                  <div className="flex gap-4 items-start border-b border-sand/10 pb-3">
                    <User className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Full Name</h4>
                      <p className="text-sm font-bold text-dark-txt">{selectedRes.fullName}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-b border-sand/10 pb-3">
                    <CalendarCheck className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Excursion</h4>
                      <p className="text-sm font-bold text-primary-green">{selectedRes.excursion?.title || "Unknown"}</p>
                      <p className="text-[10px] text-light-txt font-light mt-0.5">
                        Date: {new Date(selectedRes.reservationDate).toISOString().split("T")[0]} | Seats: {selectedRes.numberOfGuests} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-b border-sand/10 pb-3">
                    <Mail className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Contact Details</h4>
                      <p className="text-xs font-semibold text-dark-txt">Email: {selectedRes.email}</p>
                      <p className="text-xs font-semibold text-dark-txt">Phone: {selectedRes.phone}</p>
                      {selectedRes.whatsapp && (
                        <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" /> WhatsApp: {selectedRes.whatsapp}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-b border-sand/10 pb-3">
                    <Hotel className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Lodging Hotel / Riad</h4>
                      <p className="text-xs font-semibold text-dark-txt">{selectedRes.hotel}</p>
                    </div>
                  </div>

                  {selectedRes.pickupLocation && (
                    <div className="flex gap-4 items-start border-b border-sand/10 pb-3">
                      <MapPin className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Pickup Details</h4>
                        <p className="text-xs font-semibold text-dark-txt">{selectedRes.pickupLocation}</p>
                      </div>
                    </div>
                  )}

                  {selectedRes.specialRequests && (
                    <div className="flex gap-4 items-start">
                      <FileText className="w-4 h-4 text-desert-brown shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[9px] uppercase text-light-txt font-semibold tracking-widest">Special Requests / Notes</h4>
                        <p className="text-xs font-light text-light-txt leading-relaxed">{selectedRes.specialRequests}</p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-sand/15 pt-5 mt-5">
                <button
                  onClick={() => setSelectedRes(null)}
                  className="w-full py-3 bg-cream-bg text-dark-txt text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                >
                  Close Details
                </button>
                <a
                  href={`https://wa.me/${(selectedRes.whatsapp || selectedRes.phone || "").replace(/\+/g, "").replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

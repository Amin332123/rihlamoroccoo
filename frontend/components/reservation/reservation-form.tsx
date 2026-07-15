"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiClient } from "@/lib/api";

export default function ReservationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const excursionParam = searchParams.get("excursion");

  const [excursionsList, setExcursionsList] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    excursion: excursionParam || "",
    date: "",
    guests: "2",
    hotel: "",
    pickup: "",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load excursions for dropdown
  useEffect(() => {
    async function loadExcursions() {
      const res = await ApiClient.get("/excursions");
      if (res.success && res.data) {
        setExcursionsList(res.data);
      }
    }
    loadExcursions();
  }, []);

  useEffect(() => {
    if (excursionParam) {
      setFormData((prev) => ({ ...prev, excursion: excursionParam }));
    }
  }, [excursionParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.whatsapp || undefined,
      excursionId: formData.excursion,
      reservationDate: formData.date,
      numberOfGuests: parseInt(formData.guests, 10),
      hotel: formData.hotel,
      pickupLocation: formData.pickup || undefined,
      specialRequests: formData.notes || undefined
    };

    const res = await ApiClient.post("/reservations", payload);

    setIsSubmitting(false);
    if (res.success && res.data) {
      router.push(`/reservation/success?excursion=${res.data.excursionId}&name=${encodeURIComponent(formData.name)}`);
    } else {
      setErrorMsg(res.error || "Failed to finalize seat request. Please review details.");
    }
  };

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-cream-bg">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            SEAT RESERVATION
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-medium tracking-wide">
            Book Your Journey
          </h1>
          <p className="text-light-txt font-light text-sm mt-4 leading-relaxed">
            Fill in the details below to request your private tour seats. No deposit or online payments required. We will call or WhatsApp you to confirm coordinates.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-sand/20 rounded-[20px] p-8 md:p-12 shadow-sm space-y-8">
          
          {/* Section 1: Contact Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary-green pb-2 border-b border-sand/15">
              1. Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your first and last name"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. +44 7911 123456"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="whatsapp" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp number (if different)"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Excursion Details */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary-green pb-2 border-b border-sand/15">
              2. Journey Selection
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="excursion" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Select Excursion
                </label>
                <select
                  id="excursion"
                  name="excursion"
                  required
                  value={formData.excursion}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors appearance-none cursor-pointer text-dark-txt"
                >
                  <option value="" disabled>Choose your excursion</option>
                  {excursionsList.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="guests" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Guests Count
                </label>
                <select
                  id="guests"
                  name="guests"
                  required
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors cursor-pointer text-dark-txt"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, "9"].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Person" : "People"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-1">
                <label htmlFor="date" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Travel Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors cursor-pointer text-dark-txt"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="hotel" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Hotel or Riad / Lodging
                </label>
                <input
                  type="text"
                  id="hotel"
                  name="hotel"
                  required
                  value={formData.hotel}
                  onChange={handleChange}
                  placeholder="Where are you staying in Morocco?"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Lodging details & Pickup */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold text-primary-green pb-2 border-b border-sand/15">
              3. Pickup & Special Notes
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="pickup" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Specific Pickup Coordinates / Location (optional)
                </label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={formData.pickup}
                  onChange={handleChange}
                  placeholder="e.g. Near Cafe de France, Medina exit point"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Special Requests / Dietary Requirements / Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Please specify any luggage requirements, dietary restrictions, or travel pacing needs..."
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-sand/20" />

          {/* Error display */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-[14px] text-sm text-red-700 font-semibold tracking-wide">
              {errorMsg}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Processing Reservation..." : "Confirm Seat Reservation"}
            </button>
            <p className="text-xs font-light text-light-txt/80 italic text-center">
              * By booking, you submit a booking request. Payment will be finalized directly in cash or bank transfer.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}

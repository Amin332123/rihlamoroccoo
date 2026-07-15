"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, AlertCircle, Upload, Loader2, X } from "lucide-react";
import Link from "next/link";
import { ApiClient } from "@/lib/api";

interface ExcursionEditorProps {
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    price: string;
    duration: string;
    location: string;
    description: string;
    meetingPoint: string;
    availableDays: string[];
    featured: boolean;
    published: boolean;
    included: string[];
    excluded: string[];
    itinerary: { title: string; description: string }[];
    featuredImage?: string;
    galleryImages?: string[];
  };
}

export default function ExcursionEditor({ initialData }: ExcursionEditorProps) {
  const router = useRouter();
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [meetingPoint, setMeetingPoint] = useState(initialData?.meetingPoint || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published || false);

  // Parsing Price
  const getInitialPriceValue = () => {
    if (!initialData?.price) return { num: "95", currency: "€", unit: "person" };
    // e.g. "95 € / person" or "€290 / person" or "MAD 150"
    const numMatch = initialData.price.match(/(\d+)/);
    const num = numMatch ? numMatch[0] : "95";
    const isMad = initialData.price.toLowerCase().includes("mad") || initialData.price.toLowerCase().includes("dh");
    const currency = isMad ? "MAD" : "€";
    const unit = initialData.price.toLowerCase().includes("group") ? "group" : "person";
    return { num, currency, unit };
  };

  const initialPriceParsed = getInitialPriceValue();
  const [priceNum, setPriceNum] = useState(priceParsedNumber(initialPriceParsed.num));
  const [priceCurrency, setPriceCurrency] = useState(initialPriceParsed.currency);
  const [priceUnit, setPriceUnit] = useState(initialPriceParsed.unit);

  // Parsing Duration
  const getInitialDurationValue = () => {
    let days = 1;
    let nights = 0;
    if (initialData?.duration) {
      const daysMatch = initialData.duration.match(/(\d+)\s*Day/i);
      if (daysMatch) days = parseInt(daysMatch[1], 10);
      const nightsMatch = initialData.duration.match(/(\d+)\s*Night/i);
      if (nightsMatch) nights = parseInt(nightsMatch[1], 10);
    }
    return { days, nights };
  };

  const initialDurationParsed = getInitialDurationValue();
  const [durationDays, setDurationDays] = useState(initialDurationParsed.days);
  const [durationNights, setDurationNights] = useState(initialDurationParsed.nights);

  // Available Days Option
  const [availableDaysOption, setAvailableDaysOption] = useState(
    initialData?.availableDays?.[0] || "Daily"
  );

  // Helper helper to format price numbers cleanly
  function priceParsedNumber(val: string) {
    return val;
  }

  // Media
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || "/images/21a923029795828bde02c6ff404ebc43.jpg");
  const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.galleryImages || []);
  const [newGalleryImage, setNewGalleryImage] = useState("");
  const [isUploadingFeatured, setIsUploadingFeatured] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingFeatured(true);
    const res = await ApiClient.upload(file);
    setIsUploadingFeatured(false);

    if (res.success && res.data?.url) {
      setFeaturedImage(res.data.url);
    } else {
      alert(res.error || "Failed to upload featured image.");
    }
  };

  const handleGalleryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingGallery(true);
    const res = await ApiClient.upload(file);
    setIsUploadingGallery(false);

    if (res.success && res.data?.url) {
      setGalleryImages([...galleryImages, res.data.url]);
    } else {
      alert(res.error || "Failed to upload gallery image.");
    }
    e.target.value = "";
  };

  // Arrays
  const [included, setIncluded] = useState<string[]>(initialData?.included || ["Hotel pickup and drop-off", "Private AC transport"]);
  const [newIncluded, setNewIncluded] = useState("");

  const [excluded, setExcluded] = useState<string[]>(initialData?.excluded || ["Lunch & drinks", "Gratuities"]);
  const [newExcluded, setNewExcluded] = useState("");

  const [itinerary, setItinerary] = useState<{ title: string; description: string }[]>(
    initialData?.itinerary || [
      { title: "Day 1: Departure & Exploration", description: "Leave early from the medina, trek Atlas valleys." }
    ]
  );
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryDesc, setItineraryDesc] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddIncluded = () => {
    if (newIncluded.trim()) {
      setIncluded([...included, newIncluded.trim()]);
      setNewIncluded("");
    }
  };

  const handleAddExcluded = () => {
    if (newExcluded.trim()) {
      setExcluded([...excluded, newExcluded.trim()]);
      setNewExcluded("");
    }
  };

  const handleAddItinerary = () => {
    if (itineraryTitle.trim() && itineraryDesc.trim()) {
      setItinerary([...itinerary, { title: itineraryTitle.trim(), description: itineraryDesc.trim() }]);
      setItineraryTitle("");
      setItineraryDesc("");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMsg("");
    setErrorMsg("");

    const finalPrice = `${priceNum} ${priceCurrency} / ${priceUnit}`;
    const finalDuration = durationNights > 0 
      ? `${durationDays} Day${durationDays > 1 ? "s" : ""} / ${durationNights} Night${durationNights > 1 ? "s" : ""}`
      : `${durationDays} Day${durationDays > 1 ? "s" : ""}`;
    const finalAvailableDays = [availableDaysOption];

    const payload = {
      title,
      slug,
      price: finalPrice,
      duration: finalDuration,
      location,
      description,
      shortDescription: description.substring(0, 160) + "...",
      meetingPoint,
      featuredImage,
      galleryImages,
      availableDays: finalAvailableDays,
      included,
      excluded,
      itinerary,
      featured,
      published
    };

    let res;
    if (initialData?.id) {
      res = await ApiClient.patch(`/excursions/${initialData.id}`, payload);
    } else {
      res = await ApiClient.post("/excursions", payload);
    }

    setIsSaving(false);
    if (res.success) {
      setStatusMsg("Excursion details successfully saved!");
      setTimeout(() => {
        router.push("/admin/excursions");
      }, 1000);
    } else {
      setErrorMsg(res.error || "Failed to commit record.");
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/excursions" className="p-2.5 bg-white border border-sand/20 rounded-xl text-desert-brown hover:text-primary-green transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary-green">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-3xl font-medium text-primary-green">
              {initialData?.id ? "Edit Excursion" : "Create Excursion"}
            </h1>
            <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
              Configure details, itinerary and highlights
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              General Specs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 3-Day Sahara Dunes Camel Trek"
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Slug URL</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. 3-day-sahara-camel-trek"
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block">Price</label>
                <div className="flex gap-2">
                  <select
                    value={priceCurrency}
                    onChange={(e) => setPriceCurrency(e.target.value)}
                    className="px-3 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold text-dark-txt focus:outline-none cursor-pointer"
                  >
                    <option value="€">€ (EUR)</option>
                    <option value="MAD">MAD (MAD)</option>
                    <option value="$">$ (USD)</option>
                  </select>
                  <input
                    type="number"
                    required
                    min="1"
                    value={priceNum}
                    onChange={(e) => setPriceNum(e.target.value)}
                    placeholder="95"
                    className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold text-dark-txt focus:outline-none"
                  />
                  <select
                    value={priceUnit}
                    onChange={(e) => setPriceUnit(e.target.value)}
                    className="px-3 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold text-dark-txt focus:outline-none cursor-pointer"
                  >
                    <option value="person">Per Person</option>
                    <option value="group">Per Group</option>
                    <option value="booking">Per Booking</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block">Duration</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex gap-2 items-center bg-cream-bg/40 border border-sand/25 rounded-xl px-3 py-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-light-txt shrink-0">Days</span>
                    <input
                      type="number"
                      required
                      min="1"
                      value={durationDays}
                      onChange={(e) => setDurationDays(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-transparent border-none text-xs font-semibold text-dark-txt focus:outline-none py-2"
                    />
                  </div>
                  <div className="flex-1 flex gap-2 items-center bg-cream-bg/40 border border-sand/25 rounded-xl px-3 py-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-light-txt shrink-0">Nights</span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={durationNights}
                      onChange={(e) => setDurationNights(parseInt(e.target.value, 10) || 0)}
                      className="w-full bg-transparent border-none text-xs font-semibold text-dark-txt focus:outline-none py-2"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block">Available Days</label>
                <select
                  value={availableDaysOption}
                  onChange={(e) => setAvailableDaysOption(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold text-dark-txt focus:outline-none cursor-pointer"
                >
                  <option value="Daily">Daily</option>
                  <option value="Mondays to Fridays">Mondays to Fridays</option>
                  <option value="Weekends Only">Weekends Only</option>
                  <option value="Custom Availability">Custom Availability</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Merzouga Desert, Morocco"
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Meeting Point</label>
                <input
                  type="text"
                  required
                  value={meetingPoint}
                  onChange={(e) => setMeetingPoint(e.target.value)}
                  placeholder="e.g. Cafe de France, Jemaa el-Fnaa, Marrakesh"
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Excursion Description</label>
              <textarea
                rows={5}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Excursion Media */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              Excursion Media
            </h3>

            <div className="space-y-4">
              {/* Featured Image */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block font-sans">Featured Cover Image</label>
                
                {isUploadingFeatured ? (
                  <div className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed border-sand/30 rounded-2xl bg-cream-bg/20 p-6 text-center">
                    <Loader2 className="w-6 h-6 text-primary-green animate-spin mb-2" />
                    <span className="text-xs font-semibold text-primary-green">Uploading Cover to Server...</span>
                  </div>
                ) : featuredImage ? (
                  <div className="relative group w-full max-w-sm aspect-video rounded-2xl overflow-hidden border border-sand/20 bg-cream-bg shadow-sm">
                    <img src={featuredImage} alt="Cover Preview" className="w-full h-full object-cover" />
                    {/* Hover overlay with X */}
                    <button
                      type="button"
                      onClick={() => setFeaturedImage("")}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-red-600 text-white rounded-full p-1.5 transition-all shadow-md cursor-pointer focus:outline-none"
                      title="Remove cover"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full max-w-sm aspect-video border-2 border-dashed border-sand/30 hover:border-desert-brown rounded-2xl cursor-pointer bg-cream-bg/20 transition-all p-6 text-center">
                    <Upload className="w-6 h-6 text-desert-brown mb-2" />
                    <span className="text-xs font-semibold text-dark-txt">Upload Cover Image</span>
                    <span className="text-[10px] text-light-txt mt-1 font-sans">Click to browse your files</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="h-[1px] bg-sand/10" />

              {/* Gallery Images */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt block font-sans">Gallery Images</label>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Existing Gallery Images */}
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative group rounded-xl overflow-hidden border border-sand/20 bg-cream-bg aspect-video shadow-sm">
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      {/* Hover X remove button */}
                      <button
                        type="button"
                        onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-all shadow-md opacity-0 group-hover:opacity-100 cursor-pointer focus:outline-none"
                        title="Remove image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  {/* Add Image Upload Card */}
                  <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-sand/30 hover:border-desert-brown cursor-pointer bg-cream-bg/25 hover:bg-cream-bg/40 transition-all aspect-video p-4 text-center">
                    {isUploadingGallery ? (
                      <Loader2 className="w-5 h-5 text-primary-green animate-spin" />
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-desert-brown mb-1.5" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-dark-txt">Upload Image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      disabled={isUploadingGallery}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-primary-green pb-2 border-b border-sand/15">
                What's Included
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {included.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-cream-bg/30 px-3.5 py-2 rounded-xl text-xs text-dark-txt/90">
                    <span className="truncate">{item}</span>
                    <button
                      type="button"
                      onClick={() => setIncluded(included.filter((_, i) => i !== idx))}
                      className="text-red-700 hover:text-red-950 p-1 cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add item..."
                  value={newIncluded}
                  onChange={(e) => setNewIncluded(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddIncluded}
                  className="p-2 bg-primary-green text-white rounded-xl focus:outline-none"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-primary-green pb-2 border-b border-sand/15">
                What's Excluded
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {excluded.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-cream-bg/30 px-3.5 py-2 rounded-xl text-xs text-dark-txt/90">
                    <span className="truncate">{item}</span>
                    <button
                      type="button"
                      onClick={() => setExcluded(excluded.filter((_, i) => i !== idx))}
                      className="text-red-700 hover:text-red-950 p-1 cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add item..."
                  value={newExcluded}
                  onChange={(e) => setNewExcluded(e.target.value)}
                  className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddExcluded}
                  className="p-2 bg-primary-green text-white rounded-xl focus:outline-none"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              Itinerary Program
            </h3>
            <div className="space-y-3">
              {itinerary.map((day, idx) => (
                <div key={idx} className="p-4 bg-cream-bg/30 border border-sand/15 rounded-xl space-y-2 relative">
                  <button
                    type="button"
                    onClick={() => setItinerary(itinerary.filter((_, i) => i !== idx))}
                    className="absolute top-4 right-4 text-red-700 hover:text-red-950 p-1 cursor-pointer focus:outline-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <h4 className="font-serif font-bold text-primary-green text-sm">{day.title}</h4>
                  <p className="text-xs text-light-txt font-light leading-relaxed">{day.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-cream-bg/25 border border-dashed border-sand/40 p-4 rounded-xl space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-light-txt">Day Title</label>
                <input
                  type="text"
                  placeholder="e.g. Day 1: Marrakesh to Merzouga"
                  value={itineraryTitle}
                  onChange={(e) => setItineraryTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-light-txt">Day Description</label>
                <textarea
                  rows={2}
                  value={itineraryDesc}
                  onChange={(e) => setItineraryDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none resize-none"
                />
              </div>
              <button
                type="button"
                onClick={handleAddItinerary}
                className="flex items-center gap-1.5 px-4 py-2 bg-primary-green text-white text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus:outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Day Program</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              Publish Status
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-dark-txt block">Publish Package</span>
                  <span className="text-[10px] text-light-txt">Render live on web store</span>
                </div>
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-sand/30 accent-primary-green cursor-pointer focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-dark-txt block">Featured Highlight</span>
                  <span className="text-[10px] text-light-txt">Showcase on Home page</span>
                </div>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 rounded border-sand/30 accent-primary-green cursor-pointer focus:outline-none"
                />
              </div>
            </div>

            <div className="h-[1px] bg-sand/20" />

            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-primary-green outline-none disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Excursion"}</span>
            </button>

            {statusMsg && (
              <div className="flex gap-2 items-center p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="flex gap-2 items-center p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        </div>

      </form>

    </div>
  );
}

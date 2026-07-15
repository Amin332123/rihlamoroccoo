"use client";

import { useState } from "react";
import { Settings, Save, Sparkles, CheckCircle2 } from "lucide-react";

export default function SettingsAdminPage() {
  const [siteName, setSiteName] = useState("Rihla Morocco");
  const [supportEmail, setSupportEmail] = useState("info@rihlamorocco.com");
  const [supportPhone, setSupportPhone] = useState("+212 679 675 893");
  const [whatsappLink, setWhatsappLink] = useState("https://wa.me/212679675893");
  const [heroVideo, setHeroVideo] = useState("/videos/hero-bg.mp4");
  const [seoTitle, setSeoTitle] = useState("Luxury Morocco Private Tours & Desert Excursions");
  const [seoDesc, setSeoDesc] = useState("Curate boutique private tour seats across Sahara desert dunes, Fes riads, High Atlas gorges, and Chefchaouen blue streets.");

  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setStatusMsg("Configuration settings saved successfully!");
      setTimeout(() => setStatusMsg(""), 2000);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-medium text-primary-green">
          System Settings
        </h1>
        <p className="text-light-txt text-xs tracking-wider uppercase font-semibold mt-1">
          Configure global metadata, contact variables, and homepage media resources
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Main form (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15 flex items-center gap-2">
              <Settings className="w-5 h-5 text-desert-brown" />
              <span>Company Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Website Title Name</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Support Email Address</label>
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">Support Phone Number</label>
                <input
                  type="text"
                  required
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">WhatsApp Direct URL</label>
                <input
                  type="text"
                  required
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
            </div>
          </div>

          {/* SEO & Headers Settings */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-desert-brown" />
              <span>Default SEO Metadata</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">SEO Title Index</label>
                <input
                  type="text"
                  required
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-light-txt">SEO Description Meta</label>
                <textarea
                  rows={4}
                  required
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none focus:ring-2 focus:ring-primary-green resize-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Action column (1/3 width) */}
        <div className="space-y-6">
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              Confirm Settings
            </h3>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md focus-visible:ring-2 focus-visible:ring-primary-green outline-none disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Config"}</span>
            </button>

            {statusMsg && (
              <div className="flex gap-2 items-center p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}
          </div>

          {/* Homepage media resources */}
          <div className="bg-white border border-sand/20 rounded-[20px] p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-primary-green pb-2 border-b border-sand/15">
              Hero Cinematic Video
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-light-txt">Local File Path</label>
              <input
                type="text"
                required
                value={heroVideo}
                onChange={(e) => setHeroVideo(e.target.value)}
                className="w-full px-3 py-2 bg-cream-bg/40 border border-sand/25 rounded-xl text-xs font-semibold uppercase tracking-wider text-dark-txt focus:outline-none"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}

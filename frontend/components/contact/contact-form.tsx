"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, HiOutlineClock } from "react-icons/hi2";
import { ApiClient } from "@/lib/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setErrorMsg("");

    const payload = {
      fullName: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    const res = await ApiClient.post("/contact", payload);

    setIsSubmitting(false);
    if (res.success) {
      setSubmitMessage("Thank you! Your message has been sent successfully. Our team will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setErrorMsg(res.error || "Failed to submit message. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-24 md:pb-32 bg-cream-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary-green font-medium tracking-wide">
            We are Here to Listen
          </h1>
          <p className="text-light-txt font-light text-sm mt-4 leading-relaxed">
            Have questions about a specific excursion or need a bespoke, custom travel itinerary? Drop us a message, or reach out directly via WhatsApp for immediate support.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          
          {/* Info Details Column */}
          <div className="space-y-8 lg:col-span-1">
            <h2 className="font-serif text-2xl text-primary-green font-semibold tracking-wide">
              Contact Details
            </h2>

            <div className="space-y-6">
              
              {/* WhatsApp Call to Action */}
              <div className="p-6 bg-primary-green text-white rounded-[20px] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-sand text-3xl shrink-0" />
                  <span className="font-serif text-lg font-bold tracking-wide">WhatsApp Support</span>
                </div>
                <p className="text-xs text-white/80 font-light leading-relaxed">
                  For the fastest response time regarding availability, custom tours, and last minute reservations.
                </p>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center py-3 bg-white text-primary-green text-xs font-semibold uppercase tracking-widest rounded-[14px] hover:bg-sand transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 outline-none"
                >
                  Message Us on WhatsApp
                </a>
              </div>

              {/* Direct Info list */}
              <div className="space-y-5 pl-2">
                <div className="flex gap-4 items-start">
                  <HiOutlinePhone className="w-5 h-5 text-desert-brown shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase text-light-txt font-medium tracking-widest">Phone Call</h4>
                    <a href="tel:+212600000000" className="text-sm font-semibold text-primary-green hover:underline focus-visible:ring-2 focus-visible:ring-primary-green rounded outline-none">
                      +212 600 000 000
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <HiOutlineEnvelope className="w-5 h-5 text-desert-brown shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase text-light-txt font-medium tracking-widest">Email Address</h4>
                    <a href="mailto:info@rihlamorocco.com" className="text-sm font-semibold text-primary-green hover:underline focus-visible:ring-2 focus-visible:ring-primary-green rounded outline-none">
                      info@rihlamorocco.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <HiOutlineMapPin className="w-5 h-5 text-desert-brown shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase text-light-txt font-medium tracking-widest">Main Office</h4>
                    <p className="text-sm font-semibold text-primary-green">
                      Jemaa el-Fnaa Square, Marrakesh, Morocco
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <HiOutlineClock className="w-5 h-5 text-desert-brown shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] uppercase text-light-txt font-medium tracking-widest">Business Hours</h4>
                    <p className="text-sm font-semibold text-primary-green">
                      Daily: 08:00 AM - 09:00 PM (GMT+1)
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-serif text-2xl text-primary-green font-semibold tracking-wide">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="bg-white border border-sand/20 rounded-[20px] p-8 md:p-12 shadow-sm space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    placeholder="Enter your name"
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
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs uppercase tracking-widest font-semibold text-light-txt">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your inquiry..."
                  className="w-full px-5 py-3.5 bg-cream-bg/40 border border-sand/25 rounded-[14px] text-base focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Submit Message"}
              </button>

              {submitMessage && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-[14px] text-sm text-emerald-700 font-semibold tracking-wide">
                  {submitMessage}
                </div>
              )}

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-[14px] text-sm text-red-700 font-semibold tracking-wide">
                  {errorMsg}
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

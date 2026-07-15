"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineCalendar, HiOutlineMapPin } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";

interface ExcursionDetailsProps {
  excursion: {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    location: string;
    duration: string;
    price: string;
    featuredImage?: string;
    image?: string;
    galleryImages?: string[];
    images?: string[];
    included: string[];
    excluded?: string[];
    notIncluded?: string[];
    itinerary?: any;
    program?: any;
    meetingPoint: string;
    availableDays: string[];
    faqs?: { question: string; answer: string }[];
  };
  relatedExcursions: any[];
}

export default function ExcursionDetails({ excursion, relatedExcursions }: ExcursionDetailsProps) {
  const [activeItineraryDay, setActiveItineraryDay] = useState<number | null>(0);

  // Safe fallback bindings
  const tourImage = excursion.featuredImage || excursion.image || "/images/21a923029795828bde02c6ff404ebc43.jpg";
  const gallery = excursion.galleryImages || excursion.images || [];
  const programList = (excursion.itinerary || excursion.program || []) as { title: string; description: string }[];
  const includedList = excursion.included || [];
  const excludedList = excursion.excluded || excursion.notIncluded || [];
  const faqsList = excursion.faqs || [];

  return (
    <div className="bg-cream-bg pt-32 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Breadcrumb */}
        <div className="text-xs uppercase tracking-widest text-light-txt mb-6">
          <Link href="/" className="hover:text-primary-green focus-visible:ring-2 focus-visible:ring-primary-green rounded outline-none">Home</Link>
          <span className="mx-2.5">/</span>
          <Link href="/excursions" className="hover:text-primary-green focus-visible:ring-2 focus-visible:ring-primary-green rounded outline-none">Excursions</Link>
          <span className="mx-2.5">/</span>
          <span className="text-desert-brown font-medium">{excursion.title}</span>
        </div>

        {/* Title Block */}
        <div className="mb-10">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-2">
            {excursion.location}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-primary-green font-medium tracking-wide">
            {excursion.title}
          </h1>
        </div>

        {/* Media Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="relative h-[300px] md:h-[450px] md:col-span-2 overflow-hidden rounded-[22px] shadow-sm border border-sand/15">
            <Image
              src={gallery[0] || tourImage}
              alt={excursion.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {gallery.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative h-[140px] md:h-[217px] overflow-hidden rounded-[22px] shadow-sm border border-sand/15">
                <Image
                  src={img}
                  alt={`${excursion.title} gallery ${idx + 1}`}
                  fill
                  className="object-cover hover:scale-103 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-24">
          
          {/* Main Info Columns (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-primary-green font-semibold tracking-wide">
                Excursion Overview
              </h2>
              <p className="text-light-txt leading-relaxed font-light text-sm sm:text-base">
                {excursion.description}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-sand/20">
              <div className="flex items-center gap-3">
                <HiOutlineClock className="w-6 h-6 text-desert-brown shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-light-txt font-medium">Duration</p>
                  <p className="text-xs sm:text-sm font-semibold text-primary-green">{excursion.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineCalendar className="w-6 h-6 text-desert-brown shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-light-txt font-medium">Days Available</p>
                  <p className="text-xs sm:text-sm font-semibold text-primary-green">
                    {excursion.availableDays[0] === "Daily" ? "Daily" : "Selected Days"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineMapPin className="w-6 h-6 text-desert-brown shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-light-txt font-medium">Location</p>
                  <p className="text-xs sm:text-sm font-semibold text-primary-green">{excursion.location}</p>
                </div>
              </div>
            </div>

            {/* Program Accordion */}
            {programList.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl text-primary-green font-semibold tracking-wide">
                  Itinerary Program
                </h2>
                <div className="space-y-3">
                  {programList.map((day, idx) => (
                    <div
                      key={idx}
                      className="border border-sand/20 rounded-[20px] bg-white overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveItineraryDay(activeItineraryDay === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left focus-visible:ring-2 focus-visible:ring-primary-green outline-none"
                      >
                        <span className="font-serif text-lg font-bold text-primary-green">
                          {day.title}
                        </span>
                        <FiChevronDown
                          className={`text-desert-brown text-lg transition-transform duration-300 ${
                            activeItineraryDay === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeItineraryDay === idx && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-5 pt-0 text-sm text-light-txt font-light leading-relaxed border-t border-sand/10">
                              {day.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-primary-green">What's Included</h3>
                <ul className="space-y-3">
                  {includedList.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-sm text-light-txt font-light">
                      <HiOutlineCheckCircle className="w-5 h-5 text-primary-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-primary-green">What's Excluded</h3>
                <ul className="space-y-3">
                  {excludedList.map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start text-sm text-light-txt font-light">
                      <HiOutlineXCircle className="w-5 h-5 text-red-700/60 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting Point */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl md:text-3xl text-primary-green font-semibold tracking-wide">
                Meeting & Pickup Point
              </h2>
              <div className="p-6 bg-white border border-sand/20 rounded-[20px] space-y-3">
                <p className="text-sm font-light text-light-txt">
                  {excursion.meetingPoint}
                </p>
                <div className="relative h-[200px] w-full rounded-[14px] bg-sand/15 overflow-hidden flex items-center justify-center border border-dashed border-sand">
                  <span className="text-xs uppercase tracking-widest text-desert-brown font-semibold">
                    Interactive Map Area Placeholder
                  </span>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {faqsList.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl text-primary-green font-semibold tracking-wide">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqsList.map((faq, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-serif text-base font-bold text-primary-green">
                        Q: {faq.question}
                      </h4>
                      <p className="text-sm font-light text-light-txt leading-relaxed pl-5 border-l border-desert-brown/40">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-sand/20 rounded-[20px] p-8 shadow-sm space-y-6">
              <div>
                <span className="text-[10px] text-light-txt uppercase tracking-wider block">Price per Person</span>
                <span className="font-serif text-3xl font-bold text-primary-green">{excursion.price}</span>
              </div>

              <div className="h-[1px] bg-sand/20" />

              <div className="space-y-4 text-xs font-light text-light-txt">
                <div className="flex justify-between">
                  <span>Transport type:</span>
                  <span className="font-semibold text-primary-green">Luxury Private AC Van</span>
                </div>
                <div className="flex justify-between">
                  <span>Languages:</span>
                  <span className="font-semibold text-primary-green">English, French, Spanish</span>
                </div>
                <div className="flex justify-between">
                  <span>Availabilities:</span>
                  <span className="font-semibold text-primary-green">{excursion.availableDays.join(", ")}</span>
                </div>
              </div>

              <Link href={`/reservation?excursion=${excursion.id}`} className="block w-full">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] shadow-sm transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none cursor-pointer"
                >
                  Book This Excursion
                </motion.button>
              </Link>
              
              <p className="text-[11px] text-center text-light-txt/80 italic font-light">
                * No online payment required. Pay on confirm.
              </p>
            </div>
            
            <div className="bg-primary-green text-white rounded-[20px] p-6 text-center space-y-3">
              <span className="text-[10px] uppercase text-sand tracking-[0.2em] font-semibold">Immediate Assistance</span>
              <p className="text-xs font-light text-white/80">Have questions? Contact our travel expert immediately on WhatsApp.</p>
              <a
                href="https://wa.me/212679675893"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[14px] text-xs font-semibold uppercase tracking-widest transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 outline-none"
              >
                WhatsApp Chat
              </a>
            </div>
          </div>

        </div>

        {/* Related Excursions Section */}
        {relatedExcursions.length > 0 && (
          <div className="pt-16 border-t border-sand/20 space-y-12">
            <div className="text-center md:text-left">
              <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-2">
                CONTINUE EXPLORING
              </span>
              <h2 className="font-serif text-2xl md:text-4xl text-primary-green font-medium tracking-wide">
                Related Excursions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedExcursions.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col md:flex-row overflow-hidden border border-sand/20"
                >
                  {/* Card Image */}
                  <div className="relative h-[220px] md:h-auto md:w-2/5 overflow-hidden shrink-0 bg-sand/5">
                    <Image
                      src={item.featuredImage || item.image || "/images/21a923029795828bde02c6ff404ebc43.jpg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-light-txt mb-2">
                        <span>{item.duration}</span>
                        <span className="text-desert-brown font-semibold">★ {item.rating || "5.0"}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-primary-green mb-2 group-hover:text-desert-brown transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-light-txt text-xs leading-relaxed font-light mb-4 line-clamp-2">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-sand/15">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-light-txt uppercase">From</span>
                        <span className="font-serif text-sm font-bold text-primary-green">
                          {item.price}
                        </span>
                      </div>
                      <Link href={`/excursions/${item.slug}`} className="focus-visible:ring-2 focus-visible:ring-desert-brown rounded-md outline-none">
                        <span className="text-xs font-semibold text-desert-brown hover:text-primary-green transition-colors uppercase tracking-widest">
                          View details
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

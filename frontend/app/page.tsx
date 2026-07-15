"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineShieldCheck } from "react-icons/hi";
import { FiUsers, FiAward, FiCompass } from "react-icons/fi";
import { ApiClient } from "@/lib/api";

const WHY_CHOOSE_US = [
  {
    icon: <HiOutlineShieldCheck className="w-8 h-8 text-desert-brown" />,
    title: "Premium Comfort",
    description: "Travel in pristine, private air-conditioned vehicles with professional local drivers who prioritize your safety and comfort."
  },
  {
    icon: <FiCompass className="w-8 h-8 text-desert-brown" />,
    title: "Tailored Experience",
    description: "Our private excursions let you set the pace. Spend more time at places you love without being rushed by a large tour group."
  },
  {
    icon: <FiUsers className="w-8 h-8 text-desert-brown" />,
    title: "Local Expertise",
    description: "Gain deeper insights into Moroccan culture, history, and secret spots with our handpicked, certified local guides."
  },
  {
    icon: <FiAward className="w-8 h-8 text-desert-brown" />,
    title: "Zero Booking Fees",
    description: "Reserve your seat completely online without payments upfront. Confirm details with our team over WhatsApp at your leisure."
  }
];

const DESTINATIONS = [
  { name: "Sahara Dunes", image: "/images/21a923029795828bde02c6ff404ebc43.jpg" },
  { name: "Marrakesh Medina", image: "/images/9473448822cac42212573037f6eb2c13.jpg" },
  { name: "Chefchaouen", image: "/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg" },
  { name: "High Atlas Mountains", image: "/images/ebbd997c629028da042d05fec5307e28.jpg" }
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [featuredExcursions, setFeaturedExcursions] = useState<any[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [excursionsRes, testimonialsRes] = await Promise.all([
        ApiClient.get("/excursions"),
        ApiClient.get("/testimonials")
      ]);

      if (excursionsRes.success && excursionsRes.data) {
        const featured = excursionsRes.data.filter((e: any) => e.featured && e.published);
        setFeaturedExcursions(featured.length > 0 ? featured.slice(0, 3) : excursionsRes.data.slice(0, 3));
      }

      if (testimonialsRes.success && testimonialsRes.data) {
        const featured = testimonialsRes.data.filter((t: any) => t.featured);
        setFeaturedTestimonials(featured.length > 0 ? featured : testimonialsRes.data.slice(0, 2));
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Parallax hook
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 120]);
  const opacityText = useTransform(scrollY, [0, 450], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* 1. Hero Section with Background Video */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover scale-[1.03]"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Soft Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 backdrop-blur-[0.5px]" />

        {/* Hero Content (with Parallax translation) */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sand uppercase tracking-[0.35em] text-xs md:text-sm font-semibold mb-4"
          >
            DISCOVER THE SOUL OF MOROCCO
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-medium tracking-wide leading-tight mb-8"
          >
            A Boutique Journey <br />
            <span className="italic font-light">Of Pure Wonder</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-white/80 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto mb-10"
          >
            Experience authentic Moroccan heritage, golden desert peaks, and secret medinas through premium private excursions.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link href="/excursions" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] shadow-lg transition-colors duration-300 cursor-pointer"
              >
                Explore Excursions
              </motion.button>
            </Link>
            <Link href="/reservation" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors duration-300 cursor-pointer"
              >
                Reserve Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex items-center justify-center gap-6 mt-12 text-[10px] sm:text-xs text-white/70 font-light tracking-widest uppercase"
          >
            <span>✓ Private Comfort</span>
            <span className="w-1 h-1 rounded-full bg-sand/40" />
            <span>✓ Local Guides</span>
            <span className="w-1 h-1 rounded-full bg-sand/40" />
            <span>✓ Pay On Confirm</span>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer hidden md:flex"
        >
          <span className="text-[10px] text-white/50 tracking-[0.25em] uppercase mb-2">Scroll Down</span>
          <div className="w-[1px] h-10 bg-white/25 relative overflow-hidden">
            <motion.div
              animate={{ y: [-40, 40] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-accent-gold"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Curated Experiences Intro */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
              CURATED EXPERIENCES
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary-green font-medium tracking-wide">
              Featured Excursions
            </h2>
          </div>
          <Link
            href="/excursions"
            className="flex items-center text-sm font-semibold text-desert-brown hover:text-primary-green transition-colors mt-4 md:mt-0 uppercase tracking-widest"
          >
            View All Excursions <HiOutlineArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="h-96 w-full bg-sand/10 animate-pulse border border-sand/15 rounded-[20px]" />
            ))}
          </div>
        )}

        {/* Excursions Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExcursions.map((excursion, index) => (
              <motion.div
                key={excursion.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-500 flex flex-col overflow-hidden border border-sand/20"
              >
                {/* Card Image */}
                <div className="relative h-[280px] w-full overflow-hidden bg-sand/5">
                  <Image
                    src={excursion.featuredImage || excursion.image || "/images/21a923029795828bde02c6ff404ebc43.jpg"}
                    alt={excursion.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-cream-bg/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-sand/15">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-primary-green">
                      {excursion.location}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-light-txt mb-2">
                      <span>{excursion.duration}</span>
                      <span className="text-desert-brown font-semibold">★ {excursion.rating || "5.0"}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-primary-green mb-3 group-hover:text-desert-brown transition-colors">
                      {excursion.title}
                    </h3>
                    <p className="text-light-txt text-sm leading-relaxed font-light mb-6">
                      {excursion.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 pt-4 border-t border-sand/15">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-light-txt uppercase tracking-wider">From</span>
                        <span className="font-serif text-base font-bold text-primary-green">
                          {excursion.price}
                        </span>
                      </div>
                      <Link href={`/excursions/${excursion.slug}`}>
                        <span className="text-xs font-semibold text-desert-brown hover:text-primary-green transition-colors uppercase tracking-widest cursor-pointer">
                          View Details
                        </span>
                      </Link>
                    </div>
                    
                    <Link href={`/reservation?excursion=${excursion.id}`} className="w-full">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2 outline-none"
                      >
                        Book Seats
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 3. Immersive Storytelling Section */}
      <section className="bg-cream-bg py-24 md:py-32 px-6 md:px-12 border-y border-sand/20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block">
              OUR MANIFESTO
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary-green font-medium tracking-wide leading-tight">
              Morocco is Not a Destination. <br />
              <span className="italic font-light">It is a Feeling.</span>
            </h2>
            <p className="text-light-txt font-light text-sm md:text-base leading-relaxed">
              We design travel experiences for those seeking the road less traveled. From private luxury vehicle transit over the High Atlas gorges to stargazing in remote dunes, every tour is custom-made. 
            </p>
            <p className="text-light-txt font-light text-sm md:text-base leading-relaxed">
              We focus on slow, conscious travel. No rushed guides. No tourist trap shops. Just absolute quiet, rich stories, premium riads, and pure Moroccan hospitality.
            </p>
            <div className="pt-4">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] shadow-sm transition-colors cursor-pointer"
                >
                  Our Philosophy
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[350px] md:h-[500px] rounded-[30px] overflow-hidden shadow-xl border border-sand/25"
          >
            <Image
              src="/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg"
              alt="Immersive Moroccan Archway"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. Choice spec features */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
            WHY TRAVEL WITH US
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary-green font-medium tracking-wide">
            The Rihla Standard
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx} className="space-y-4">
              <div className="p-4 bg-cream-bg rounded-2xl w-fit border border-sand/15">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-bold text-primary-green">{item.title}</h3>
              <p className="text-light-txt font-light text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Photographic stories */}
      <section className="py-24 md:py-32 bg-cream-bg border-y border-sand/20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
              CAPTURED MOMENTS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary-green font-medium tracking-wide">
              Stories in Light
            </h2>
            <p className="text-light-txt font-light text-sm mt-4 leading-relaxed">
              Take a glimpse at the raw textures, golden horizons, and ancient details captured along our custom excursion trails.
            </p>
          </div>

          {/* Staggered grid preview of 3 gorgeous images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[420px] rounded-[22px] overflow-hidden shadow-sm group border border-sand/10"
            >
              <Image
                src="/images/ba37df9f1bdc0dd2be18ad604b091c83.jpg"
                alt="Chefchaouen Blue Walls"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative h-[420px] md:-translate-y-8 rounded-[22px] overflow-hidden shadow-md group border border-sand/10"
            >
              <Image
                src="/images/4d0f972a84504bcfd079bceb2752c1a9.jpg"
                alt="Sahara Dunes Camp"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative h-[420px] rounded-[22px] overflow-hidden shadow-sm group border border-sand/10"
            >
              <Image
                src="/images/9c96621136d86eff926346566f15c46b.jpg"
                alt="Authentic Islamic Archway"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          </div>

          {/* Link Button */}
          <div className="text-center pt-4">
            <Link href="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-white border border-sand hover:bg-cream-bg text-primary-green text-xs font-semibold uppercase tracking-widest rounded-[14px] transition-colors cursor-pointer"
              >
                View Full Gallery
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="bg-primary-green text-white py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 font-serif text-[300px] pointer-events-none select-none text-sand -mt-20 -mr-20">
          “
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-sand font-semibold tracking-[0.25em] text-xs uppercase block">
            GUEST STORIES
          </span>
          
          <div className="space-y-12">
            {featuredTestimonials.map((t, idx) => (
              <motion.div
                key={t.id || idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-white/90 animate-fade-in">
                  &ldquo;{t.comment || t.quote}&rdquo;
                </p>
                <div>
                  <h4 className="font-semibold text-sm tracking-widest uppercase text-sand">
                    {t.fullName || t.author}
                  </h4>
                  <p className="text-xs text-white/50">{t.country || t.location}</p>
                </div>
              </motion.div>
            ))}

            {!isLoading && featuredTestimonials.length === 0 && (
              <p className="text-sm font-light text-white/80">No testimonial records saved yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* 7. Final Call To Action */}
      <section className="py-24 md:py-32 px-6 md:px-12 text-center max-w-4xl mx-auto">
        <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-4">
          YOUR ADVENTURE AWAITS
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-primary-green font-medium tracking-wide mb-6">
          Ready to Experience the Magic?
        </h2>
        <p className="text-light-txt font-light max-w-2xl mx-auto leading-relaxed text-base mb-10">
          Fill in our reservation form today. No upfront payment required. Our boutique booking team will contact you directly to curate the perfect Moroccan getaway.
        </p>
        <Link href="/reservation">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-primary-green hover:bg-desert-brown text-white text-xs font-semibold uppercase tracking-widest rounded-[14px] shadow-md transition-colors cursor-pointer"
          >
            Reserve Your Journey
          </motion.button>
        </Link>
      </section>

    </div>
  );
}

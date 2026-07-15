"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STATS = [
  { value: "5+", label: "Years of Crafting Journeys" },
  { value: "1,500+", label: "Delighted Guests Welcomed" },
  { value: "15+", label: "Signature Private Routes" },
  { value: "100%", label: "Moroccan Hospitality" }
];

const TIMELINE = [
  {
    year: "2021",
    title: "The Beginning",
    description: "Founded by a group of passionate local guides in Marrakesh with a goal to disrupt the standard tourist excursions and introduce boutique, private luxury experiences."
  },
  {
    year: "2023",
    title: "Expanding Horizons",
    description: "Adding luxury desert camps and expanding custom tours to northern regions including Chefchaouen and coastal towns like Essaouira."
  },
  {
    year: "2026",
    title: "Rihla Morocco Today",
    description: "Establishing a trusted reputation as Morocco's premium travel boutique, focused entirely on tailored comfort and deep cultural connection."
  }
];

export default function AboutContent() {
  return (
    <div className="pt-32 pb-24 bg-cream-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Header Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block">
              OUR MISSION
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary-green font-medium tracking-wide leading-tight">
              Curating Luxury <br />
              <span className="italic font-light">With Local Soul</span>
            </h1>
            <p className="text-light-txt font-light leading-relaxed text-sm sm:text-base">
              At Rihla Morocco, we believe that travel is not just about visiting places; it's about connecting with them. We design premium, highly personal excursions that break away from large, rushed tour buses.
            </p>
            <p className="text-light-txt font-light leading-relaxed text-sm">
              Our name, **Rihla** (رحلة), translates to 'Journey' or 'Travelogue' in Arabic. True to our name, we help you write a beautiful chapter of adventure, nature, calm, and wonder in the kingdom of Morocco.
            </p>
          </div>
          
          <div className="relative h-[350px] sm:h-[450px] w-full rounded-[22px] overflow-hidden shadow-sm border border-sand/15">
            <Image
              src="/images/90796b9d58a872ea60be4e29b31ecf42.jpg"
              alt="Luxury Moroccan details"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-sand/20 text-center">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-1"
            >
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-desert-brown">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-light-txt uppercase tracking-wider font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Our Story & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative h-[450px] w-full rounded-[22px] overflow-hidden order-last lg:order-first shadow-sm border border-sand/15">
            <Image
              src="/images/58185611c0c71e7d2f6e51130d330c78.jpg"
              alt="Medina historic architectural marvels"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8">
            <h2 className="font-serif text-3xl text-primary-green font-medium tracking-wide">
              The Rihla Ethos
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-desert-brown">
                  Authenticity First
                </h3>
                <p className="text-light-txt text-sm font-light leading-relaxed">
                  We skip the tourist-trap commercial stops. We take you straight to authentic Berber cooperatives, hidden local restaurants, and ancient architectures known only to locals.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-desert-brown">
                  Tailored Hospitality
                </h3>
                <p className="text-light-txt text-sm font-light leading-relaxed">
                  Our tour flows with your schedule. Whether you want to rest an hour longer overlooking the gorges, or start earlier to catch a desert sunrise, we adjust.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-desert-brown">
                  Responsible Travel
                </h3>
                <p className="text-light-txt text-sm font-light leading-relaxed">
                  We believe in leaving a positive footprint. We directly support indigenous families and local guides, ensuring travel profits contribute to mountain and desert community development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="space-y-16">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-desert-brown font-semibold tracking-[0.25em] text-xs uppercase block mb-3">
              JOURNEY CHRONICLE
            </span>
            <h2 className="font-serif text-3xl text-primary-green font-medium tracking-wide">
              How We Grew
            </h2>
          </div>

          <div className="relative border-l border-sand/30 pl-8 ml-4 md:ml-12 space-y-12">
            {TIMELINE.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-cream-bg border-2 border-desert-brown flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary-green" />
                </div>
                
                <span className="font-serif text-xl font-bold text-desert-brown block mb-1">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg font-bold text-primary-green mb-2">
                  {item.title}
                </h3>
                <p className="text-light-txt text-sm font-light leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function WhoWeAreSection() {
  const stats = [
    { number: "18+", label: "Years of Craftsmanship" },
    { number: "15,000+", label: "Windows & Doors Installed" },
    { number: "1,200+", label: "Happy Clients Across TN" },
    { number: "99.4%", label: "Precision Quality Rating" },
  ];

  return (
    <section id="who-we-are" className="py-16 sm:py-24 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Badge, Main Title & Large Sunlit Patio Image */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Badge */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[#009886] text-base font-black">✳</span>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-neutral-500">
                ABOUT SMC FABRICATIONS
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-neutral-900 tracking-tight leading-[1.08] mb-8">
              Dedicated to elevating every space we craft.
            </h2>

            {/* Large Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden shadow-md border border-neutral-100 group"
            >
              <Image
                src="/images/about-patio.jpg"
                alt="SMC Architectural UPVC Windows and Doors"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column: Leadership Info, Bio, Button & Door Image */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            
            <div>
              {/* Leadership Header */}
              <div className="flex items-center gap-3.5">
                <div className="relative w-13 h-13 rounded-full overflow-hidden shrink-0 border-2 border-[#009886]/30 shadow-sm">
                  <Image
                    src="/images/founder-portrait.jpg"
                    alt="SMC Leadership"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-black text-neutral-900 leading-tight">
                    Er. P. Shanmugam
                  </h4>
                  <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                    Managing Director - <span className="text-[#009886] font-bold">SMC Fabrications</span>
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-neutral-200/90 my-5" />

              {/* Company Bio Paragraph */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                We engineer high-performance UPVC doors and windows designed to insulate homes and offices with superior thermal insulation, soundproofing, and modern aesthetics. Our Pollachi fabrication facility ensures German-standard precision, durability, and craftsmanship in every custom installation.
              </p>

              {/* Discover More Button */}
              <div className="my-6">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-7 py-3.5 bg-[#009886] hover:bg-[#008272] text-white text-xs font-black uppercase tracking-wider rounded-md shadow-sm shadow-[#009886]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  DISCOVER MORE
                </Link>
              </div>
            </div>

            {/* Door Detail Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] rounded-2xl overflow-hidden shadow-md border border-neutral-100 mt-4 group"
            >
              <Image
                src="/images/about-door.jpg"
                alt="Crafted UPVC & Wood Architectural Doors"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>

          </div>

        </div>

        {/* Bottom Metrics Row with Top Border Line */}
        <div className="mt-16 sm:mt-24 pt-10 sm:pt-14 border-t border-neutral-200/90 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight">
                {stat.number}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-500 mt-1.5">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

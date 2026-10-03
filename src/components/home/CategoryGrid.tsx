"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES_DATA } from "@/data/categories";
import { SectionHeading } from "@/components/common/SectionHeading";

export function CategoryGrid() {
  return (
    <section className="py-24 bg-white border-t border-[#e6f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Product Categories"
            title="Engineered Systems By Category"
            subtitle="Architectural Portals & Façades"
            description="Explore our curated portfolio of bespoke doors, high-efficiency window systems, and precision architectural solutions."
            className="mb-0 max-w-2xl"
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#009886] hover:text-black transition-colors pb-2"
          >
            <span>View Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CATEGORIES_DATA.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative bg-white border-2 border-[#e6f7f5] hover:border-[#009886] rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
            >
              {/* Category Image Header with Studio Showroom Backdrop */}
              <div className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-[#f0f7fd] via-[#f9fcff] to-[#e6f7f5] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 rounded-full blur-md pointer-events-none" />
                
                <Image
                  src={cat.heroImage}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-108 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.16)]"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 rounded-lg border border-[#e6f7f5] text-[10px] uppercase font-mono font-bold text-[#009886] shadow-xs z-10">
                  {cat.count} Systems
                </div>
              </div>

              {/* Category Info Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[11px] uppercase font-mono tracking-widest text-[#009886] font-semibold block mb-1">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-black group-hover:text-[#009886] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-black/75 mt-2.5 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="mt-4 pt-3 border-t border-[#e6f7f5] space-y-1.5">
                    {cat.keyHighlights.slice(0, 2).map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        className="text-[11px] text-black/80 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#009886] shrink-0" />
                        <span className="truncate">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore Button */}
                <div className="mt-6 pt-4 border-t border-[#e6f7f5] flex items-center justify-between">
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#009886] group-hover:text-black transition-colors"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <span className="text-[10px] text-black/60 uppercase font-mono">
                    Camera Ready
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

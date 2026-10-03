"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CheckCircle2 } from "lucide-react";

export function TrustMetrics() {
  const metrics = [
    {
      value: "18+",
      label: "Years of Craftsmanship",
      subtext: "Precision fabrication heritage",
      isDemo: true,
    },
    {
      value: "15,000+",
      label: "Products Manufactured",
      subtext: "Custom doors & window units",
      isDemo: true,
    },
    {
      value: "1,200+",
      label: "Projects Completed",
      subtext: "Villas, penthouses & facades",
      isDemo: true,
    },
    {
      value: "99.4%",
      label: "Precision Tolerance",
      subtext: "Sub-millimeter CNC manufacturing",
      isDemo: true,
    },
  ];

  const pillars = [
    {
      title: "Extrusion & Alloy Integrity",
      desc: "We exclusively utilize 6063-T6 aerospace architectural aluminium, reinforced with polyamide insulating thermal breaks for supreme structural stability and hurricane-grade wind resistance.",
    },
    {
      title: "Seasoned Timber Stabilization",
      desc: "Our solid Burma Teak, European Oak, and American Walnut are kiln-dried to 8–10% moisture content and cross-laminated with anti-warp tension rod cores.",
    },
    {
      title: "European Hardware Partnerships",
      desc: "Engineered in collaboration with DormaKaba, Simonswerk, Hoppe, Roto, and FritsJurgens to guarantee whisper-quiet operation across 200,000+ open-close duty cycles.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#e6f4fd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Manufacturing Ethos"
          title="Engineering Quality Into Every Opening"
          subtitle="Precision • Materiality • Durability"
          description="At SMC Fabrication, every door and window is treated as an architectural sculpture. We bridge artisanal master joinery with high-precision CNC engineering to construct apertures that define spaces, insulate environments, and endure for generations."
        />

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 bg-[#e6f4fd]/60 border-2 border-[#e6f4fd] hover:border-[#0070bc] rounded-sm transition-all group shadow-xs"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0070bc] font-mono tracking-tight group-hover:scale-105 transition-transform duration-300">
                {metric.value}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-black mt-3">
                {metric.label}
              </h3>
              <p className="text-xs text-black/75 mt-1">
                {metric.subtext}
              </p>
              {metric.isDemo && (
                <span className="inline-block mt-3 text-[9px] uppercase tracking-widest text-[#0070bc] font-mono font-semibold">
                  [Sample Metric]
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Engineering Pillars 3-Column Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="p-6 bg-white border border-[#e6f4fd] rounded-sm flex flex-col justify-between shadow-xs hover:border-[#0070bc] transition-colors"
            >
              <div>
                <div className="w-9 h-9 rounded-sm bg-[#e6f4fd] flex items-center justify-center text-[#0070bc] mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-black/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

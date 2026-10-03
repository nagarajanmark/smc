"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  ShieldCheck,
  Cpu,
  Trees,
  Layers,
  CheckCircle,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <Cpu className="w-6 h-6 text-[#0070bc]" />,
      title: "Sub-Millimeter CNC Precision",
      desc: "Every profile, joint, and miter is machined using advanced 5-axis computer-controlled tooling, guaranteeing airtight seal integrity and flawless flush seams.",
    },
    {
      icon: <Trees className="w-6 h-6 text-[#0070bc]" />,
      title: "Ethically Sourced Seasoned Timber",
      desc: "Our Burma Teak, European White Oak, and American Walnut undergo extensive kiln drying to 8-10% moisture content and cross-lamination to eliminate warping in any climate.",
    },
    {
      icon: <Layers className="w-6 h-6 text-[#0070bc]" />,
      title: "Advanced Thermal Engineering",
      desc: "Multi-chambered polyamide thermal breaks prevent thermal bridging, reducing air conditioning and heating energy loads while meeting strict Passive House standards.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0070bc]" />,
      title: "German Hardware Standards",
      desc: "We exclusively integrate certified German and Italian operating hardware engineered for 200,000+ flawless operating cycles and RC2/RC3 burglar protection.",
    },
  ];

  const milestones = [
    {
      year: "Phase 01",
      title: "Master Joinery Workshop",
      desc: "Founded with a mission to bring European precision joinery and bespoke hardwood craftsmanship to luxury architectural residential projects.",
    },
    {
      year: "Phase 02",
      title: "Thermal Aluminium Extrusion Plant",
      desc: "Commissioned dedicated 6063-T6 aluminium CNC fabrication lines with structural thermal-break insertion and automated corner crimping.",
    },
    {
      year: "Phase 03",
      title: "Multi-Chamber UPVC & Acoustic Lines",
      desc: "Expanded into lead-free German polymer extrusion and robotic double/triple insulated argon glass assembly.",
    },
    {
      year: "Present",
      title: "Digital Room Camera Visualizer & Studio",
      desc: "Pioneering live camera room visualizer previews and interactive spatial placement alongside bespoke architectural manufacturing.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f4fd] pb-12 mb-16">
          <SectionHeading
            badge="Our Heritage & Vision"
            title="The Art & Science Of Architectural Openings"
            subtitle="SMC Fabrication • Engineering Precision"
            description="We engineer high-performance doors and architectural window systems that harmonize structural durability, thermal efficiency, and refined contemporary design."
            className="mb-0 max-w-3xl"
          />
        </div>

        {/* Hero Architectural Image */}
        <div className="relative w-full h-[380px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-[#e6f4fd] mb-20 bg-[#e6f4fd]">
          <Image
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=80"
            alt="SMC Fabrication Architectural Joinery Facility"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#e6f4fd] font-bold">
                Manufacturing Excellence
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Where Hand-Crafted Artistry Meets Industrial Engineering
              </h3>
            </div>
            <div className="px-4 py-2 bg-white/95 backdrop-blur-md border border-[#e6f4fd] text-xs text-black rounded-lg font-mono font-bold shadow-sm">
              Certified ISO 9001 & CE Compliance
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="my-20">
          <SectionHeading
            badge="Engineering Core"
            title="Materials Science & Precision Craftsmanship"
            subtitle="Built To Last Decades"
            description="Our fabrication processes are engineered to eliminate typical points of failure—warping, thermal condensation, air leakage, and hardware sag."
            className="mb-12 max-w-2xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-8 bg-white border-2 border-[#e6f4fd] hover:border-[#0070bc] rounded-2xl transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#e6f4fd] border border-[#0070bc]/30 flex items-center justify-center mb-6 shadow-xs">
                    {val.icon}
                  </div>
                  <h4 className="text-lg font-extrabold text-black mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs text-black/75 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="my-20 pt-16 border-t border-[#e6f4fd]">
          <SectionHeading
            badge="Studio Evolution"
            title="Milestones in Precision Joinery"
            subtitle="Continuous Innovation"
            description="How SMC Fabrication grew from a boutique timber joinery atelier into a multi-material architectural facade and entrance studio."
            className="mb-12 max-w-2xl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((ms, mIdx) => (
              <div
                key={mIdx}
                className="p-6 bg-[#e6f4fd]/50 border border-[#e6f4fd] rounded-xl relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#0070bc] font-bold block mb-2">
                    {ms.year}
                  </span>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-2">
                    {ms.title}
                  </h4>
                  <p className="text-xs text-black/75 leading-relaxed">
                    {ms.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factory Showcase & Services */}
        <div className="my-20 bg-[#e6f4fd] border border-[#0070bc]/20 rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0070bc] block mb-2">
                End-To-End Architectural Delivery
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black">
                Comprehensive Technical Support for Architects & Specifiers
              </h3>
              <p className="text-xs text-black/80 mt-4 leading-relaxed">
                We work closely with principal architects, interior design studios, and luxury contractors from concept blueprint to structural sign-off.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-black font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0070bc]" />
                  <span>CAD, BIM, and structural finite element wind load calculations</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0070bc]" />
                  <span>3D digital twin models and mobile camera room previews</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0070bc]" />
                  <span>On-site 3D laser scan surveying for zero-tolerance fit</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#0070bc]" />
                  <span>Certified master factory installers and lifetime maintenance support</span>
                </li>
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/request-quote"
                  className="px-6 py-3.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.18em] rounded-lg transition-all shadow-md"
                >
                  Request Consultation
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 bg-white hover:bg-black hover:text-white text-black text-xs uppercase font-bold tracking-[0.18em] rounded-lg transition-colors border border-black/10 shadow-sm"
                >
                  Visit Studio
                </Link>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden border border-[#0070bc]/20 bg-white">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
                alt="Factory Joinery Station"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

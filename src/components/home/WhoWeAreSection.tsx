"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Factory,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Award,
  Sparkles,
  Phone,
  Leaf,
} from "lucide-react";

export function WhoWeAreSection() {
  const highlights = [
    {
      icon: Factory,
      title: "Pollachi Production Facility",
      desc: "Our high-tech manufacturing plant at Kallipalayam Village, Devambadi Panchayat, Pollachi is equipped with multi-axis profile milling and precision corner welding.",
    },
    {
      icon: Leaf,
      title: "D Wood Go Green & Lead-Free",
      desc: "100% eco-friendly, non-toxic formulations replacing natural forest timber with sustainable, energy-saving UPVC systems.",
    },
    {
      icon: Cpu,
      title: "German Profile Technology",
      desc: "Multi-chambered UPVC profiles engineered for tropical climates, resisting UV degradation, coastal corrosion, and extreme monsoon winds.",
    },
    {
      icon: ShieldCheck,
      title: "Sound & Thermal Insulation",
      desc: "Acoustic sealing and double-pane glass integration reducing external traffic noise up to 40 dB and lowering air conditioning energy costs.",
    },
  ];

  return (
    <section id="who-we-are" className="py-20 sm:py-28 bg-[#f8fbfe] border-t border-[#e6f7f5] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#009886]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e6f7f5] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#009886]/30 shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#009886]" />
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#009886]">
              Who We Are • SMC Fabrications
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
            India&apos;s No. 1 UPVC Doors & Windows Profile Specialists.
          </h2>
          
          <p className="mt-4 text-sm sm:text-base text-black/70 leading-relaxed">
            Headquartered in Pollachi, Tamil Nadu, SMC Fabrications is a premier manufacturer and dealer of advanced UPVC architectural doors and windows. We engineer solutions that combine timeless aesthetics with world-class security and durability.
          </p>
        </div>

        {/* 2-Column Story & Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 4 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-6 bg-white rounded-2xl border border-[#e6f7f5] shadow-xs hover:border-[#009886]/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e6f7f5] text-[#009886] flex items-center justify-center group-hover:bg-[#009886] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-black">
                      {item.title}
                    </h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Feature Showcase Card with Factory Details */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-[#009886] via-[#008273] to-[#0a2f26] rounded-3xl p-7 sm:p-9 text-white shadow-xl border border-white/20 relative overflow-hidden space-y-6">
              
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#e6f7f5] font-bold">
                  Pollachi Production Unit
                </span>
                <h3 className="text-2xl font-extrabold text-white leading-snug">
                  Built to European Standards for Indian Climates
                </h3>
                <p className="text-xs text-white/85 leading-relaxed pt-1">
                  D.No. 122/3, Kallipalayam Village, Devambadi Panchayat, Pollachi – 642 005.
                </p>
              </div>

              {/* Verified Checklist */}
              <div className="space-y-2.5 pt-2 border-t border-white/15">
                {[
                  "100% Weatherproof & Termite-proof",
                  "Lifetime color stability with Anti-UV stabilizers",
                  "Multi-point locking for maximum home security",
                  "On-site measurement & professional installation",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-white/95">
                    <CheckCircle2 className="w-4 h-4 text-[#a7f3d0] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/visualizer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-[#009886] hover:bg-[#e6f7f5] text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Studio Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="tel:+918098257777"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-black/30 hover:bg-black/50 border border-white/20 text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>8098257777</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

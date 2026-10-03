"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";

export function CraftsmanshipSpotlight() {
  const processes = [
    {
      step: "01",
      title: "5-Axis CNC Precision Joinery",
      desc: "Profiles are milled to ±0.2mm tolerance using advanced German CNC machining centers, ensuring absolute airtightness and corner strength.",
    },
    {
      step: "02",
      title: "Polyamide Thermal Barriers",
      desc: "Continuous 34mm fiberglass-reinforced polyamide thermal breaks eliminate heat transfer across interior and exterior profile stiles.",
    },
    {
      step: "03",
      title: "Acoustic Glass Lamination",
      desc: "Double and triple glazed units filled with 95% Argon gas and acoustic PVB interlayers provide laboratory-tested noise isolation up to 44 dB.",
    },
    {
      step: "04",
      title: "Qualicoat Marine Surface Protection",
      desc: "Electrostatic fluorocarbon and anodized finishes certified against UV degradation, industrial smog, and coastal salt corrosion.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-[#e6f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Process Steps */}
          <div className="lg:col-span-6">
            <SectionHeading
              badge="Manufacturing Standard"
              title="Architectural Precision in Every Detail"
              subtitle="Material Science • European Joinery"
              description="From raw aerospace-grade aluminium billets and seasoned teak logs to final laser-calibrated assembly, our manufacturing workflow is governed by strict European DIN and EN standards."
              className="mb-8"
            />

            <div className="space-y-4">
              {processes.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-4 bg-[#e6f7f5]/50 border border-[#e6f7f5] hover:border-[#009886] rounded-sm flex items-start gap-4 transition-colors"
                >
                  <span className="font-mono text-sm text-[#009886] font-bold">
                    {p.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black">
                      {p.title}
                    </h4>
                    <p className="text-xs text-black/75 mt-1 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#e6f7f5]">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#009886] hover:text-black transition-colors"
              >
                <span>Read About Our Factory & Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Matrix */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[480px] sm:h-[580px] w-full rounded-sm overflow-hidden border-2 border-[#e6f7f5] bg-[#e6f7f5] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80"
                alt="SMC Fabrication Workshop Joinery Precision"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-[#009886]/30 rounded-sm shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#009886] font-bold">
                      Quality Assurance
                    </span>
                    <h5 className="text-sm font-bold text-black mt-0.5">
                      100% Quality & Factory Pressure Tested
                    </h5>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-[#009886] shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

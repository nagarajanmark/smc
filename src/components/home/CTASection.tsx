"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-[#e6f7f5] border-t border-[#009886]/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#009886] inline-block mb-3">
          Direct Factory Fabrication & Specification
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
          Request An Architectural Consultation Or Custom Estimate
        </h2>

        <p className="mt-4 text-sm sm:text-base text-black/80 max-w-2xl mx-auto leading-relaxed">
          Submit your CAD elevations, aperture schedules, or product preferences. Our technical engineering team will review wind load profiles, thermal requirements, and provide a comprehensive quotation.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/request-quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <span>Request Quotation Form</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <a
            href="https://wa.me/918531992626?text=Hello%20SMC%20Fabrication%2C%20I%20would%20like%20to%20request%20an%20architectural%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#009886] border-2 border-[#009886] text-[#009886] hover:text-white text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Direct WhatsApp Enquiry</span>
          </a>
        </div>

        {/* Reassurance Items */}
        <div className="mt-12 pt-8 border-t border-[#009886]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-black/80 font-medium">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#009886]" /> 24-48 Hour Quote Turnaround
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#009886]" /> Complimentary On-Site Laser Surveying
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#009886]" /> Certified Master Installation
          </span>
        </div>
      </div>
    </section>
  );
}

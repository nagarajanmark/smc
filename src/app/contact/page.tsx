"use client";

import React from "react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/enquiry/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  PhoneCall,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f4fd] pb-8 mb-12">
          <SectionHeading
            badge="Experience Studio & Factory"
            title="Connect With Our Architectural Team"
            subtitle="Consultations • Material Samples • Plant Visits"
            description="Whether you are an architect finalizing window schedules for a residential villa or a homeowner seeking custom entrance doors, we welcome your inquiry."
            className="mb-0"
          />
        </div>

        {/* 2-Column Grid: Contact Info & Studio Map (Left) vs Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-2 border-[#e6f4fd] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-extrabold text-black border-b border-[#e6f4fd] pb-4">
                Headquarters & Design Studio
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5 text-black/70">
                  <MapPin className="w-5 h-5 text-[#0070bc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      SMC Fabrication Experience Centre
                    </strong>
                    <span className="block mt-1 leading-relaxed text-black/80">
                      Plot 42, Precision Industrial Zone, Phase 4, MMR, Mumbai, Maharashtra 400710
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-black/70">
                  <Phone className="w-5 h-5 text-[#0070bc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Telephone & Inquiry Line
                    </strong>
                    <a
                      href="tel:+919876543210"
                      className="block mt-1 text-black/80 hover:text-[#0070bc] transition-colors font-medium"
                    >
                      +91 (022) 8472-9100 / +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-black/70">
                  <Mail className="w-5 h-5 text-[#0070bc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Architectural Specifications
                    </strong>
                    <a
                      href="mailto:specifications@smcfabrication.com"
                      className="block mt-1 text-black/80 hover:text-[#0070bc] transition-colors font-medium"
                    >
                      specifications@smcfabrication.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-black/70">
                  <Clock className="w-5 h-5 text-[#0070bc] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Operating Hours
                    </strong>
                    <span className="block mt-1 text-black/80">
                      Monday – Saturday: 09:00 AM – 06:30 PM IST
                    </span>
                    <span className="text-[11px] text-black/60 block mt-0.5">
                      Sunday: Experience Studio Open by Prior Appointment
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-[#e6f4fd]">
                <a
                  href="https://wa.me/919876543210?text=Hello%20SMC%20Fabrication%2C%20I%20would%20like%20to%20schedule%20an%20Experience%20Centre%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.18em] rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Chat On WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Studio Location Box */}
            <div className="bg-[#e6f4fd] border border-[#0070bc]/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0070bc]">
                  Studio Location
                </span>
                <span className="text-[11px] text-black/70 font-mono">
                  15 min from MMR Highway
                </span>
              </div>
              <div className="h-44 bg-white rounded-xl border border-[#e6f4fd] flex flex-col items-center justify-center relative group p-4 text-center shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#e6f4fd] border-2 border-[#0070bc] flex items-center justify-center text-[#0070bc] mb-2 animate-bounce">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-xs text-black font-bold">SMC Fabrication Experience Studio</span>
                <span className="text-[10px] text-black/70 mt-0.5">Full 1:1 Scale Systems & Material Gallery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

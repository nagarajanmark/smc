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
  ShieldCheck,
  Building2,
  Factory,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f7f5] pb-8 mb-12">
          <SectionHeading
            badge="UPVC Doors and Windows"
            title="Connect With SMC Fabrications"
            subtitle="Pollachi Manufacturing Plant • Sales & Marketing"
            description="Manufacturers & Dealers in UPVC Doors & Windows. Reach out to our production unit or marketing team for estimates, site measurements, and product inquiries."
            className="mb-0"
          />
        </div>

        {/* 2-Column Grid: Contact Info & Studio Map (Left) vs Contact Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-2 border-[#e6f7f5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-[#e6f7f5] pb-4">
                <span className="text-[10px] uppercase font-mono font-bold text-[#009886] tracking-widest block mb-1">
                  Factory & Office
                </span>
                <h3 className="text-xl font-extrabold text-black">
                  SMC Fabrications Pollachi
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                {/* Address */}
                <div className="flex items-start gap-3.5 text-black/70">
                  <MapPin className="w-5 h-5 text-[#009886] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Manufacturing Plant & Office Address
                    </strong>
                    <span className="block mt-1 leading-relaxed text-black/80 font-medium">
                      D.No. 122/3, Kallipalayam Village, Devambadi Panchayat, Pollachi – 642 005, Tamil Nadu, India.
                    </span>
                  </div>
                </div>

                {/* Production Unit Phone */}
                <div className="flex items-start gap-3.5 text-black/70">
                  <Factory className="w-5 h-5 text-[#009886] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Production Unit
                    </strong>
                    <a
                      href="tel:+918098257777"
                      className="block mt-1 text-black font-mono font-bold hover:text-[#009886] transition-colors text-sm"
                    >
                      +91 80982 57777
                    </a>
                  </div>
                </div>

                {/* Marketing Phone */}
                <div className="flex items-start gap-3.5 text-black/70">
                  <Phone className="w-5 h-5 text-[#009886] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Sales & Marketing
                    </strong>
                    <a
                      href="tel:+918531992626"
                      className="block mt-1 text-black font-mono font-bold hover:text-[#009886] transition-colors text-sm"
                    >
                      +91 85319 92626
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 text-black/70">
                  <Mail className="w-5 h-5 text-[#009886] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Official Email
                    </strong>
                    <a
                      href="mailto:smcfabrications@gmail.com"
                      className="block mt-1 text-black/90 hover:text-[#009886] transition-colors font-semibold"
                    >
                      smcfabrications@gmail.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 text-black/70">
                  <Clock className="w-5 h-5 text-[#009886] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black block text-sm font-bold">
                      Operating Hours
                    </strong>
                    <span className="block mt-1 text-black/80">
                      Monday – Saturday: 09:00 AM – 06:30 PM IST
                    </span>
                    <span className="text-[11px] text-black/60 block mt-0.5">
                      Sunday: Open for Site Inspections & Consultations by Appointment
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-[#e6f7f5]">
                <a
                  href="https://wa.me/918531992626?text=Hello%20SMC%20Fabrications%2C%20I%20would%20like%20to%20inquire%20about%20UPVC%20Doors%20and%20Windows."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#009886] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.18em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Chat With Marketing on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Tagline / Quality Badge Box */}
            <div className="bg-[#e6f7f5] border border-[#009886]/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#009886]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#009886]">
                  D Wood Go Green
                </span>
              </div>
              <h4 className="text-sm font-bold text-black leading-snug">
                No. 1 Windows & Doors UPVC Profiles in India
              </h4>
              <p className="text-xs text-black/75 mt-1 leading-relaxed">
                High Quality and Advanced Technology engineered with precision German & European tooling.
              </p>
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

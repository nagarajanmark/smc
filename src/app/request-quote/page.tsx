"use client";

import React, { Suspense } from "react";
import { QuoteForm } from "@/components/enquiry/QuoteForm";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function RequestQuotePage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f4fd] pb-8 mb-12">
          <SectionHeading
            badge="Direct Factory Estimation"
            title="Request An Architectural Quotation"
            subtitle="Custom Dimensions • Material Finishes • Turnkey Installation"
            description="Submit your aperture dimensions, CAD drawings, or selected systems. Our engineering team calculates exact structural wind loads, thermal U-values, and transparent itemized pricing."
            className="mb-0"
          />
        </div>

        {/* 2-Column Layout: Quote Form (Left) vs Estimation Assurances (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <Suspense
              fallback={
                <div className="p-12 text-center text-xs text-black font-bold bg-[#e6f4fd] border border-[#e6f4fd] rounded-xl">
                  Loading quotation builder...
                </div>
              }
            >
              <QuoteForm />
            </Suspense>
          </div>

          {/* Right Sidebar: Estimation Assurances */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-2 border-[#e6f4fd] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-black border-b border-[#e6f4fd] pb-4">
                What Happens Next?
              </h3>

              <div className="space-y-4 text-xs text-black/70">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-[#0070bc] font-bold shrink-0">
                    01.
                  </span>
                  <div>
                    <strong className="text-black block font-bold">
                      Technical Review (24-48 Hours)
                    </strong>
                    <p className="mt-0.5 leading-relaxed">
                      Our structural team inspects opening spans, wind pressure ratings, and glass specifications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-[#0070bc] font-bold shrink-0">
                    02.
                  </span>
                  <div>
                    <strong className="text-black block font-bold">
                      Itemized Bill of Quantities (BOQ)
                    </strong>
                    <p className="mt-0.5 leading-relaxed">
                      You receive a transparent price schedule including extrusion alloys, finishes, and hardware.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-[#0070bc] font-bold shrink-0">
                    03.
                  </span>
                  <div>
                    <strong className="text-black block font-bold">
                      On-Site Laser Survey
                    </strong>
                    <p className="mt-0.5 leading-relaxed">
                      Upon approval, our master surveyors perform 3D millimeter laser scans of all openings before milling.
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Direct Option */}
              <div className="pt-4 border-t border-[#e6f4fd]">
                <a
                  href="https://wa.me/919876543210?text=Hello%20SMC%20Fabrication%2C%20I%20have%20an%20urgent%20architectural%20quote%20request."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#e6f4fd] hover:bg-[#0070bc] hover:text-white border border-[#0070bc] text-[#0070bc] text-xs uppercase font-bold tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#0070bc] group-hover:text-white" />
                  <span>Urgent Inquiry via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quality Standard Guarantee Box */}
            <div className="p-6 bg-[#e6f4fd] border border-[#0070bc]/30 rounded-2xl text-xs text-black/80 space-y-2">
              <div className="flex items-center gap-2 font-bold text-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#0070bc]" />
                <span>15-Year Structural Warranty</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Every manufactured system is accompanied by our comprehensive factory guarantee covering profile structural integrity, anodized finish adhesion, and hardware operation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

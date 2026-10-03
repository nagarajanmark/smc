import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CATEGORIES_DATA } from "@/data/categories";

export function Footer() {
  return (
    <footer className="bg-white text-black border-t-2 border-[#e6f4fd] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-footer Banner in Light Blue #e6f4fd */}
        <div className="bg-[#e6f4fd] border border-[#0070bc]/20 rounded-sm p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0070bc]">
              Architectural Advisory & Custom Fabrication
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black mt-2 tracking-tight">
              Ready to elevate your architectural opening requirements?
            </h3>
            <p className="text-sm text-black/80 mt-3 leading-relaxed">
              Consult with our facade and joinery engineering specialists. We offer CAD integration, structural wind load calculations, 2D camera room visualization, and certified turnkey installation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#0070bc] hover:bg-black transition-all rounded-sm shadow-md"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-[#0070bc] border-2 border-[#0070bc] hover:bg-[#0070bc] hover:text-white bg-white transition-all rounded-sm"
            >
              <span>View Catalogue</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#e6f4fd]">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0070bc] rounded-sm flex items-center justify-center">
                <span className="font-serif font-bold text-sm text-white">SMC</span>
              </div>
              <span className="text-base font-bold tracking-[0.18em] text-black uppercase">
                SMC Fabrication
              </span>
            </Link>
            <p className="text-sm text-black/75 mt-4 leading-relaxed max-w-sm">
              Precision-crafted doors and high-performance architectural window systems. Designed for contemporary estates, commercial facades, and luxury living.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-xs text-black/80">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0070bc] shrink-0" />
                <span>Fabrication Plant & Design Studio, Industrial Zone 4, Mumbai</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0070bc] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#0070bc] transition-colors font-semibold">
                  +91 (022) 8472-9100 / +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0070bc] shrink-0" />
                <a href="mailto:enquiry@smcfabrication.com" className="hover:text-[#0070bc] transition-colors font-semibold">
                  enquiry@smcfabrication.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#0070bc] shrink-0" />
                <span>Mon – Sat: 09:00 – 18:30 IST</span>
              </div>
            </div>
          </div>

          {/* Door Systems */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0070bc] mb-4">
              Door Systems
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/products?category=main-entrance-doors" className="hover:text-[#0070bc] transition-colors">
                  Main Entrance Pivot Doors
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-doors" className="hover:text-[#0070bc] transition-colors">
                  Ultra-Slim Sliding Systems
                </Link>
              </li>
              <li>
                <Link href="/products?category=wooden-doors" className="hover:text-[#0070bc] transition-colors">
                  Solid Burma Teak Portals
                </Link>
              </li>
              <li>
                <Link href="/products?category=interior-doors" className="hover:text-[#0070bc] transition-colors">
                  Frameless Flush Interior Doors
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-doors" className="hover:text-[#0070bc] transition-colors">
                  Bi-Fold Concertina Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Window Systems */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0070bc] mb-4">
              Window Systems
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/products?category=aluminium-windows" className="hover:text-[#0070bc] transition-colors">
                  Aluminium Tilt & Turn
                </Link>
              </li>
              <li>
                <Link href="/products?category=upvc-windows" className="hover:text-[#0070bc] transition-colors">
                  Multi-Chamber UPVC
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-windows" className="hover:text-[#0070bc] transition-colors">
                  Panoramic Sliding Windows
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom-solutions" className="hover:text-[#0070bc] transition-colors">
                  Curved Glass Facades
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Architectural Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#0070bc] mb-4">
              Studio & Service
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/about" className="hover:text-[#0070bc] transition-colors">
                  About SMC Fabrication
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#0070bc] transition-colors">
                  Project Gallery Portfolio
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="hover:text-[#0070bc] transition-colors">
                  Quotation & Estimation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0070bc] transition-colors">
                  Visit Experience Centre
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/70">
          <div>
            <p className="font-medium text-black">
              © {new Date().getFullYear()} SMC FABRICATION LTD. All rights reserved. Precision architectural manufacturing.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-1 text-[#0070bc] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 9001 & CE Compliance Standard
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

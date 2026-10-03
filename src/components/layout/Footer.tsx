import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-black border-t-2 border-[#e6f7f5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pre-footer Banner in Light Mint #e6f7f5 */}
        <div className="bg-[#e6f7f5] border border-[#009886]/20 rounded-2xl p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#009886]">
              Manufacturers & Dealers in UPVC Doors & Windows
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-black mt-2 tracking-tight">
              No. 1 Windows & Doors UPVC Profiles in India
            </h3>
            <p className="text-sm text-black/80 mt-3 leading-relaxed">
              High Quality and Advanced Technology. Built with precision engineering, energy-efficient thermal-break multi-chamber UPVC profiles, and comprehensive turnkey installation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#009886] hover:bg-black transition-all rounded-xl shadow-md"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-[0.18em] font-bold text-[#009886] border-2 border-[#009886] hover:bg-[#009886] hover:text-white bg-white transition-all rounded-xl"
            >
              <span>View Catalogue</span>
            </Link>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#e6f7f5]">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="SMC - D Wood Go Green"
                width={220}
                height={60}
                className="h-11 sm:h-13 w-auto object-contain"
              />
            </Link>
            <p className="text-xs font-bold uppercase tracking-wider text-[#009886] mt-3">
              UPVC Doors and Windows • D Wood Go Green
            </p>
            <p className="text-xs text-black/75 mt-1 leading-relaxed max-w-sm">
              Manufacturers & Dealers in high-grade UPVC Doors and Windows. Advanced European profile technology engineered for modern architecture, residential villas, and commercial projects.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 text-xs text-black/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#009886] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  D.No. 122/3, Kallipalayam Village, Devambadi Panchayat, Pollachi – 642 005
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#009886] shrink-0" />
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span>
                    <strong>Production Unit:</strong>{" "}
                    <a href="tel:+918098257777" className="hover:text-[#009886] transition-colors font-semibold">
                      8098257777
                    </a>
                  </span>
                  <span>
                    <strong>Marketing:</strong>{" "}
                    <a href="tel:+918531992626" className="hover:text-[#009886] transition-colors font-semibold">
                      8531992626
                    </a>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#009886] shrink-0" />
                <a href="mailto:smcfabrications@gmail.com" className="hover:text-[#009886] transition-colors font-semibold">
                  smcfabrications@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#009886] shrink-0" />
                <span>Mon – Sat: 09:00 AM – 06:30 PM IST</span>
              </div>
            </div>
          </div>

          {/* Door Systems */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-4">
              UPVC Doors
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/products?category=main-entrance-doors" className="hover:text-[#009886] transition-colors">
                  Main Entrance Pivot Doors
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-doors" className="hover:text-[#009886] transition-colors">
                  UPVC Sliding Patio Doors
                </Link>
              </li>
              <li>
                <Link href="/products?category=interior-doors" className="hover:text-[#009886] transition-colors">
                  Flush Interior UPVC Doors
                </Link>
              </li>
              <li>
                <Link href="/products?category=wooden-doors" className="hover:text-[#009886] transition-colors">
                  Wood-Finish UPVC Portals
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-doors" className="hover:text-[#009886] transition-colors">
                  Bi-Fold Concertina Doors
                </Link>
              </li>
            </ul>
          </div>

          {/* Window Systems */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-4">
              UPVC Windows
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/products?category=upvc-windows" className="hover:text-[#009886] transition-colors">
                  Multi-Chamber Casement
                </Link>
              </li>
              <li>
                <Link href="/products?category=sliding-windows" className="hover:text-[#009886] transition-colors">
                  Sliding Track Windows
                </Link>
              </li>
              <li>
                <Link href="/products?category=aluminium-windows" className="hover:text-[#009886] transition-colors">
                  Tilt & Turn Windows
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom-solutions" className="hover:text-[#009886] transition-colors">
                  Arch & Bay Windows
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom-solutions" className="hover:text-[#009886] transition-colors">
                  Custom Architectural Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Architectural Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-4">
              Factory & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-black/80">
              <li>
                <Link href="/about" className="hover:text-[#009886] transition-colors">
                  About SMC Pollachi Plant
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#009886] transition-colors">
                  Installed Projects Gallery
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="hover:text-[#009886] transition-colors">
                  Get Instant Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#009886] transition-colors">
                  Factory & Office Visit
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/70">
          <div>
            <p className="font-medium text-black">
              © {new Date().getFullYear()} SMC FABRICATIONS • UPVC DOORS AND WINDOWS • Pollachi. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-1 text-[#009886] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> No. 1 UPVC Profiles in India • D Wood Go Green
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

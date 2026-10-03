"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Our Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-[#e6f4fd]",
          isScrolled
            ? "py-3 shadow-md"
            : "py-4.5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none rounded"
          >
            <div className="w-9 h-9 bg-[#0070bc] rounded-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <span className="font-serif font-bold text-base text-white tracking-wider">
                SMC
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold tracking-[0.18em] text-black group-hover:text-[#0070bc] transition-colors leading-none uppercase">
                SMC Fabrication
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#0070bc] uppercase font-semibold mt-1">
                Doors & Windows Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold tracking-wider uppercase transition-colors rounded-sm relative",
                    isActive ? "text-[#0070bc]" : "text-black hover:text-[#0070bc]"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#0070bc]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/request-quote"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-bold text-white bg-[#0070bc] hover:bg-black transition-all rounded-sm shadow-md"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/request-quote"
              className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-bold text-white bg-[#0070bc] rounded-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-[#0070bc] focus:outline-none rounded-sm"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[62px] z-40 bg-white flex flex-col overflow-y-auto px-6 py-8 border-t border-[#e6f4fd]"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg font-normal tracking-wider uppercase text-black hover:text-[#0070bc] py-2 border-b border-[#e6f4fd]"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-lg font-normal tracking-wider uppercase text-black hover:text-[#0070bc] py-2 border-b border-[#e6f4fd]"
              >
                Products
              </Link>

              <Link
                href="/projects"
                className="text-lg font-normal tracking-wider uppercase text-black hover:text-[#0070bc] py-2 border-b border-[#e6f4fd]"
              >
                Our Projects
              </Link>
              <Link
                href="/about"
                className="text-lg font-normal tracking-wider uppercase text-black hover:text-[#0070bc] py-2 border-b border-[#e6f4fd]"
              >
                About SMC Fabrication
              </Link>
              <Link
                href="/contact"
                className="text-lg font-normal tracking-wider uppercase text-black hover:text-[#0070bc] py-2 border-b border-[#e6f4fd]"
              >
                Contact & Studio
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e6f4fd] flex flex-col gap-3">
              <Link
                href="/request-quote"
                className="w-full text-center py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#0070bc] hover:bg-black rounded-sm transition-colors"
              >
                Request Architectural Quote
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hello%20SMC%20Fabrication%2C%20I%20would%20like%20to%20inquire%20about%20doors%20and%20windows."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black bg-[#e6f4fd] hover:bg-[#0070bc] hover:text-white rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#0070bc]" /> WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

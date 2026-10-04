"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  PhoneCall,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { user, openAuthModal, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Visualizer", href: "/visualizer" },
    { name: "Our Projects", href: "/projects" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 backdrop-blur-2xl border rounded-2xl sm:rounded-full shadow-lg w-[94%] max-w-6xl px-3 sm:px-5",
          isScrolled
            ? "py-1.5 bg-white/95 border-[#009886]/25 shadow-md"
            : "py-2 bg-white/90 border-white/80 shadow-sm"
        )}
      >
        <div className="w-full flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center focus:outline-none shrink-0">
            <Image
              src="/logo.png"
              alt="SMC - D Wood Go Green"
              width={180}
              height={48}
              priority
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
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
                    "px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-all rounded-lg relative",
                    isActive
                      ? "text-[#009886] bg-[#009886]/8 font-extrabold"
                      : "text-black/80 hover:text-[#009886] hover:bg-black/5"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#009886] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Section: User Account & Request Quote */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* User Account / Profile / Login */}
            {mounted && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-[#e6f7f5] border-[#009886]/30 hover:border-[#009886] text-black transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#009886] text-white flex items-center justify-center text-xs font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-extrabold truncate max-w-[120px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-black/50" />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 text-xs"
                    >
                      <div className="p-3 border-b border-gray-100 mb-1">
                        <div className="font-extrabold text-black truncate">{user.name}</div>
                        <div className="text-black/50 text-[11px] truncate">{user.email}</div>
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-black font-bold hover:bg-[#e6f7f5] hover:text-[#009886] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#009886]" />
                          <span>My Dashboard</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 font-semibold hover:bg-red-50 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="px-3.5 py-2 text-xs font-extrabold text-black/80 hover:text-[#009886] hover:bg-[#e6f7f5] rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#009886]" />
                <span>Sign In</span>
              </button>
            )}

            {/* Request Quote Button */}
            <Link
              href="/request-quote"
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-extrabold text-white bg-[#009886] hover:bg-black transition-all rounded-full shadow-sm"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu & Auth Quick Buttons */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && user ? (
              <Link
                href="/dashboard"
                className="p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 bg-[#e6f7f5] border-[#009886]/30 text-[#009886]"
                title="My Dashboard"
              >
                <User className="w-4 h-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="px-2.5 py-1 text-[11px] font-bold text-[#009886] bg-[#e6f7f5] rounded-lg cursor-pointer"
              >
                Sign In
              </button>
            )}

            <Link
              href="/request-quote"
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-bold text-white bg-[#009886] rounded-lg"
            >
              Quote
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-black hover:text-[#009886] focus:outline-none rounded-lg"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed inset-0 top-[62px] z-40 bg-white flex flex-col overflow-y-auto px-6 py-8 border-t border-[#e6f7f5]"
          >
            {/* User Profile Banner inside mobile drawer */}
            {user ? (
              <div className="mb-6 p-4 rounded-2xl bg-[#e6f7f5] border border-[#009886]/20 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-sm text-black">{user.name}</div>
                  <div className="text-[11px] text-black/60">{user.email}</div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-1.5 bg-[#009886] text-white text-xs font-bold rounded-lg"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <div className="mb-6 p-4 rounded-2xl bg-[#f8fdfc] border border-[#009886]/20 flex items-center justify-between">
                <div className="text-xs font-bold text-black">Sign in to your SMC Account</div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="px-3.5 py-1.5 bg-[#009886] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-base font-normal tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5]"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-base font-normal tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5]"
              >
                Products
              </Link>
              <Link
                href="/visualizer"
                className="text-base font-normal tracking-wider uppercase text-[#009886] font-bold py-2 border-b border-[#e6f7f5] flex items-center justify-between"
              >
                <span>Studio Visualizer</span>
                <span className="text-[10px] px-2 py-0.5 bg-[#e6f7f5] rounded-full uppercase font-mono">
                  Live
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="text-base font-bold tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5] flex items-center justify-between"
              >
                <span>My Dashboard</span>
              </Link>
              <Link
                href="/projects"
                className="text-base font-normal tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5]"
              >
                Our Projects
              </Link>
              <Link
                href="/about"
                className="text-base font-normal tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5]"
              >
                About SMC Fabrication
              </Link>
              <Link
                href="/contact"
                className="text-base font-normal tracking-wider uppercase text-black hover:text-[#009886] py-2 border-b border-[#e6f7f5]"
              >
                Contact & Studio
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-[#e6f7f5] flex flex-col gap-3">
              <Link
                href="/request-quote"
                className="w-full text-center py-3.5 text-xs uppercase tracking-[0.2em] font-bold text-white bg-[#009886] hover:bg-black rounded-sm transition-colors"
              >
                Request Architectural Quote
              </Link>
              <a
                href="https://wa.me/918531992626?text=Hello%20SMC%20Fabrication%2C%20I%20would%20like%20to%20inquire%20about%20doors%20and%20windows."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black bg-[#e6f7f5] hover:bg-[#009886] hover:text-white rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#009886]" /> WhatsApp Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Camera,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { CameraProductPreview } from "@/components/ar/CameraProductPreview";
import { DesktopQRCodeModal } from "@/components/ar/DesktopQRCodeModal";
import { PRODUCTS_DATA } from "@/data/products";
import { isMobileDevice } from "@/lib/utils";

export function HeroSection() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_DATA[0]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isQROpen, setIsQROpen] = useState(false);

  const heroShowcase = [
    {
      product: PRODUCTS_DATA[0], // Monolith Pivot Door
      image: "/images/product-pivot-door.png",
      tag: "Flagship Entrance",
      dimensions: "1800 × 3000 mm",
    },
    {
      product: PRODUCTS_DATA[1], // Horizon Sliding Door
      image: "/images/product-sliding-door.png",
      tag: "Panoramic Glass Wall",
      dimensions: "4000 × 2800 mm",
    },
    {
      product: PRODUCTS_DATA[2], // Aurora Tilt & Turn Window
      image: "/images/product-casement-window.png",
      tag: "Acoustic Window",
      dimensions: "1200 × 1500 mm",
    },
  ];

  const handleOpenVisualizer = (prod = PRODUCTS_DATA[0]) => {
    setSelectedProduct(prod);
    setIsCameraOpen(true);
  };

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-between overflow-hidden bg-white pt-24 pb-16">
      {/* Background Architectural Image Layer & Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/hero.png"
          alt="SMC UPVC Doors and Windows Hero Background"
          fill
          priority
          className="object-cover object-right lg:object-center opacity-85 scale-100"
        />
        {/* Clean Light Frosted Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#f8fbfe]/80" />
      </div>

      {/* Hero Content Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 flex flex-col items-center text-center">
        {/* Architectural Studio Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e6f7f5] border border-[#009886]/30 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#009886]" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886]">
            No. 1 Windows & Doors UPVC Profiles in India • D Wood Go Green
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-black tracking-tight leading-[1.08] max-w-5xl"
        >
          UPVC Doors & Windows. <br />
          <span className="font-serif italic text-[#009886] font-normal">
            High Quality & Advanced Tech.
          </span>
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl md:text-2xl text-black/80 font-normal max-w-2xl leading-relaxed"
        >
          Manufacturers & Dealers in high-grade UPVC doors & window systems. Precision engineered for luxury villas, apartments, and commercial architecture.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/products"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-md hover:-translate-y-0.5"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/visualizer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e6f7f5] hover:bg-[#009886] text-black hover:text-white border border-[#009886]/30 text-xs uppercase tracking-[0.2em] font-bold rounded-xl transition-all shadow-xs"
          >
            <Camera className="w-4 h-4 text-[#009886] group-hover:text-white" />
            <span>Open Studio Visualizer</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero 3-Item Real Product Showcase Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroShowcase.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white border-2 border-[#e6f7f5] hover:border-[#009886] rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-3 z-10">
                <span className="px-3 py-1 bg-[#e6f7f5] text-[#009886] text-[10px] font-mono font-bold uppercase rounded-full border border-[#009886]/20">
                  {item.tag}
                </span>
                <span className="text-[11px] font-mono text-black/60 font-semibold">
                  {item.dimensions}
                </span>
              </div>

              {/* Product PNG Cutout on Showroom Pedestal */}
              <div className="relative w-full h-64 sm:h-72 bg-gradient-to-b from-[#f0f7fd] via-[#f9fcff] to-[#e6f7f5] rounded-xl flex items-center justify-center p-4 overflow-hidden mb-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/95 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/15 rounded-full blur-md pointer-events-none" />

                <Image
                  src={item.image}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
                />
              </div>

              {/* Card Footer Info */}
              <div>
                <h3
                  onClick={() => handleOpenVisualizer(item.product)}
                  className="text-base font-extrabold text-black group-hover:text-[#009886] transition-colors line-clamp-1 cursor-pointer"
                >
                  {item.product.name}
                </h3>
                <p className="text-xs text-black/70 mt-1 line-clamp-2 leading-relaxed">
                  {item.product.shortDescription}
                </p>

                <div className="mt-4 pt-3 border-t border-[#e6f7f5] flex items-center justify-between">
                  <button
                    onClick={() => handleOpenVisualizer(item.product)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009886] hover:text-black transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>View In Room</span>
                  </button>

                  <Link
                    href={`/request-quote?product=${encodeURIComponent(item.product.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-[#009886] transition-colors uppercase tracking-wider"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2D Camera Room Visualizer Modal */}
      <CameraProductPreview
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        product={selectedProduct}
      />

      {/* Desktop QR Modal for Phone Handoff */}
      <DesktopQRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        product={selectedProduct}
        onLaunchCamera={() => setIsCameraOpen(true)}
      />
    </section>
  );
}

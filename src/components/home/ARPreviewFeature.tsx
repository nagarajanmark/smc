"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  ArrowRight,
  Sparkles,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { CameraProductPreview } from "@/components/ar/CameraProductPreview";
import { DesktopQRCodeModal } from "@/components/ar/DesktopQRCodeModal";
import { cn, isMobileDevice } from "@/lib/utils";

export function ARPreviewFeature() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // Curated list of doors and windows for this preview
  const showcaseProducts = [
    PRODUCTS_DATA[0], // Monolith Pivot Door
    PRODUCTS_DATA[1], // Horizon Sliding Door
    PRODUCTS_DATA[2], // Aurora Casement Window
    PRODUCTS_DATA[4], // UPVC Window
  ];

  const currentProduct = showcaseProducts[selectedProductIndex] || showcaseProducts[0];

  const overlayPngUrl =
    currentProduct.pngVariants && currentProduct.pngVariants.length > 0
      ? currentProduct.pngVariants[activeVariantIndex]?.pngUrl ||
        currentProduct.transparentPngUrl ||
        currentProduct.images[0]
      : currentProduct.transparentPngUrl || "/images/product-pivot-door.png";

  const handleLaunchVisualizer = () => {
    if (isMobileDevice()) {
      setIsCameraModalOpen(true);
    } else {
      setIsQRModalOpen(true);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#f8fbfe] border-t border-[#e6f4fd] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Ultra Clean Door & Window PNG Showcase */}
          <div className="lg:col-span-7">
            {/* Simple Door / Window Selector */}
            <div className="flex items-center gap-2 mb-4">
              {showcaseProducts.map((prod, idx) => (
                <button
                  key={prod.id}
                  onClick={() => {
                    setSelectedProductIndex(idx);
                    setActiveVariantIndex(0);
                  }}
                  className={cn(
                    "px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer",
                    selectedProductIndex === idx
                      ? "bg-[#0070bc] text-white shadow-sm"
                      : "bg-white text-black/70 hover:text-black border border-[#e6f4fd] hover:border-[#0070bc]/30"
                  )}
                >
                  {prod.name}
                </button>
              ))}
            </div>

            {/* Clean Showroom Frame */}
            <div
              onClick={handleLaunchVisualizer}
              className="group relative h-[420px] sm:h-[480px] rounded-3xl border border-[#e6f4fd] hover:border-[#0070bc]/40 bg-gradient-to-b from-[#ffffff] via-[#f7fbfe] to-[#e6f4fd]/60 p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden"
            >
              {/* Soft Pedestal Shadow */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3/5 h-4 bg-black/10 rounded-full blur-lg pointer-events-none" />

              {/* Pure Centered Door/Window PNG */}
              <div className="relative z-10 w-full h-[320px] sm:h-[380px] flex items-center justify-center">
                <Image
                  src={overlayPngUrl}
                  alt={currentProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-105 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                  priority
                />
              </div>

              {/* Subtle hover badge */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/80 text-white rounded-lg text-xs font-bold backdrop-blur-md opacity-90 group-hover:bg-[#0070bc] transition-colors">
                <Camera className="w-3.5 h-3.5" />
                <span>Tap to Preview in Room</span>
              </div>
            </div>
          </div>

          {/* Right Column: Neat, Clean, Low Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#0070bc]">
                Camera Room Preview
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight leading-tight">
                Preview in Your Space
              </h2>

              <p className="text-sm sm:text-base text-black/70 leading-relaxed pt-1">
                See how our doors and windows look in your exact room using your phone camera. No app download required.
              </p>
            </div>

            {/* Clear Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleLaunchVisualizer}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Open Camera Preview</span>
              </button>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#e6f4fd] border border-[#0070bc]/30 text-black text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-colors"
              >
                <span>View Products</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0070bc]" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 2D Camera Product Preview Modal (Mobile) */}
      <CameraProductPreview
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        product={currentProduct}
      />

      {/* Desktop QR Modal for Phone Scanning (Desktop) */}
      <DesktopQRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        product={currentProduct}
        onLaunchCamera={() => setIsCameraModalOpen(true)}
      />
    </section>
  );
}

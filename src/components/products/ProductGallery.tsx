"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: string;
  onOpenRoomPreview?: () => void;
}

export function ProductGallery({
  images,
  productName,
  badge,
  onOpenRoomPreview,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const isPng = currentImage.endsWith(".png");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Frame */}
      <div
        className={cn(
          "relative w-full h-[420px] sm:h-[500px] lg:h-[560px] rounded-2xl border-2 border-[#e6f4fd] overflow-hidden group shadow-sm flex items-center justify-center cursor-zoom-in",
          isPng
            ? "bg-gradient-to-b from-[#f0f7fd] via-[#f9fcff] to-[#e6f4fd] p-6 sm:p-10"
            : "bg-white"
        )}
        onClick={() => setIsZoomModalOpen(true)}
      >
        {isPng && (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/95 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/10 rounded-full blur-lg pointer-events-none" />
          </>
        )}

        <Image
          src={currentImage}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={cn(
            "transition-transform duration-500 ease-out group-hover:scale-105",
            isPng
              ? "object-contain p-4 sm:p-8 filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.18)]"
              : "object-cover"
          )}
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          {badge && (
            <span className="px-3 py-1 bg-white/95 text-[#0070bc] border border-[#0070bc]/30 text-xs uppercase tracking-widest font-bold rounded-full shadow-sm">
              {badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomModalOpen(true);
            }}
            className="pointer-events-auto p-2.5 bg-white/90 hover:bg-white text-black hover:text-[#0070bc] border border-[#e6f4fd] rounded-lg transition-colors shadow-sm"
            title="Full size image zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel Prev/Next Buttons (if multi-image) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="pointer-events-auto p-2 bg-white/90 hover:bg-[#0070bc] text-black hover:text-white border border-[#e6f4fd] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto p-2 bg-white/90 hover:bg-[#0070bc] text-black hover:text-white border border-[#e6f4fd] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Quick Room Visualizer Switch Overlay Button */}
        {onOpenRoomPreview && (
          <div className="absolute bottom-4 left-4 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenRoomPreview();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 hover:bg-[#0070bc] text-[#0070bc] hover:text-white border border-[#0070bc] text-xs uppercase tracking-wider font-bold rounded-lg transition-all shadow-md"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>View in My Room (Camera)</span>
            </button>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => {
            const isThumbPng = img.endsWith(".png");
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative h-20 sm:h-24 rounded-xl overflow-hidden border transition-all shadow-xs flex items-center justify-center",
                  isThumbPng ? "bg-gradient-to-b from-[#f0f7fd] to-[#e6f4fd]" : "bg-white",
                  selectedIndex === idx
                    ? "border-[#0070bc] ring-2 ring-[#0070bc]/40 opacity-100"
                    : "border-[#e6f4fd] opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className={cn(isThumbPng ? "object-contain p-1.5" : "object-cover")}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <button
              onClick={() => setIsZoomModalOpen(false)}
              className="absolute top-6 right-6 p-3 text-white hover:text-[#0070bc] bg-white/10 rounded-full z-50"
              aria-label="Close zoomed view"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
              <Image
                src={currentImage}
                alt={`${productName} high resolution zoom`}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

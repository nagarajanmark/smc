"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Smartphone, Eye, QrCode } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/common/Badge";
import { CameraProductPreview } from "@/components/ar/CameraProductPreview";
import { DesktopQRCodeModal } from "@/components/ar/DesktopQRCodeModal";
import { cn, isMobileDevice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isCameraPreviewOpen, setIsCameraPreviewOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeImageIndex] = useState(0);

  const handleOpenVisualizer = () => {
    if (isMobileDevice()) {
      setIsCameraPreviewOpen(true);
    } else {
      setIsQRModalOpen(true);
    }
  };

  const isList = viewMode === "list";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "group relative bg-white border-2 border-[#e6f4fd] hover:border-[#0070bc] transition-all duration-300 rounded-2xl overflow-hidden flex shadow-sm hover:shadow-md",
          isList ? "flex-col md:flex-row" : "flex-col"
        )}
      >
        {/* Product Image Area with Architectural Studio Backdrop */}
        <div
          className={cn(
            "relative overflow-hidden bg-gradient-to-b from-[#f0f7fd] via-[#f9fcff] to-[#e6f4fd] shrink-0 flex items-center justify-center p-4 sm:p-6",
            isList ? "w-full md:w-80 h-64 md:h-auto" : "w-full h-72 sm:h-80"
          )}
        >
          {/* Subtle Radial Glow & Pedestal Reflection */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/90 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-3 bg-black/10 rounded-full blur-md pointer-events-none" />

          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.16)]"
              priority={false}
            />
          </div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            {product.badge ? (
              <Badge variant="primary">{product.badge}</Badge>
            ) : (
              <Badge variant="light">{product.categoryName}</Badge>
            )}

            {product.arAvailable && (
              <button
                onClick={handleOpenVisualizer}
                title="View in Camera Visualizer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 hover:bg-[#0070bc] text-black hover:text-white text-[10px] uppercase tracking-wider font-bold rounded-full border border-[#e6f4fd] transition-colors shadow-sm"
              >
                <Camera className="w-3 h-3 text-[#0070bc] group-hover:text-white" />
                <span>View In My Room</span>
              </button>
            )}
          </div>

          {/* Camera Visualizer Hover Action Bar */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 opacity-95 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleOpenVisualizer}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0070bc] hover:bg-black text-white text-[11px] uppercase tracking-wider font-bold rounded-lg transition-all shadow-md cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-white" />
              <span>View In My Room</span>
            </button>
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="p-2 bg-white/95 hover:bg-[#0070bc] text-black hover:text-white rounded-lg border border-[#e6f4fd] transition-colors shadow-md cursor-pointer"
              title="Mobile QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Information Body */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white">
          <div>
            {/* SKU and Opening Type */}
            <div className="flex items-center justify-between text-xs text-black/60 mb-2 font-mono font-medium">
              <span>{product.sku}</span>
              <span className="text-[#0070bc] font-bold font-sans">{product.openingType}</span>
            </div>

            {/* Title */}
            <h3
              onClick={handleOpenVisualizer}
              className="text-lg font-extrabold text-black hover:text-[#0070bc] transition-colors leading-snug cursor-pointer"
            >
              {product.name}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-black/75 mt-2 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Specifications Highlights */}
            <div className="mt-4 pt-3 border-t border-[#e6f4fd] grid grid-cols-2 gap-2 text-[11px] text-black/70">
              <div>
                <span className="text-black/50 block font-semibold">Material:</span>
                <span className="text-black font-bold truncate block">
                  {product.material}
                </span>
              </div>
              <div>
                <span className="text-black/50 block font-semibold">Standard Dimensions:</span>
                <span className="text-black font-bold truncate block font-mono">
                  {product.dimensions.standardWidthMm} × {product.dimensions.standardHeightMm} mm
                </span>
              </div>
            </div>

            {/* Available Finishes Palette Chips */}
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] text-black/50 uppercase tracking-wider font-bold">
                Finishes:
              </span>
              <div className="flex items-center gap-1.5">
                {product.finishes.slice(0, 4).map((fin) => (
                  <span
                    key={fin.id}
                    title={fin.name}
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: fin.hex }}
                  />
                ))}
                {product.finishes.length > 4 && (
                  <span className="text-[10px] text-black/60 font-bold">
                    +{product.finishes.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#e6f4fd] flex items-center justify-between gap-3">
            <button
              onClick={handleOpenVisualizer}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#0070bc] hover:text-black transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>View in Room</span>
            </button>

            <Link
              href={`/request-quote?product=${encodeURIComponent(product.name)}`}
              className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold text-white bg-[#0070bc] hover:bg-black rounded-lg transition-colors shadow-sm"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 2D Camera Room Visualizer Modal */}
      <CameraProductPreview
        isOpen={isCameraPreviewOpen}
        onClose={() => setIsCameraPreviewOpen(false)}
        product={product}
      />

      {/* Desktop QR Modal for Phone Handoff */}
      <DesktopQRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        product={product}
        onLaunchCamera={() => setIsCameraPreviewOpen(true)}
      />
    </>
  );
}

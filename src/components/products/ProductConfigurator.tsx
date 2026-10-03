"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Camera,
  Send,
  Sliders,
  PhoneCall,
} from "lucide-react";
import {
  Product,
  ColorFinishOption,
  FrameOption,
  GlassOption,
  HardwareOption,
} from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductConfiguratorProps {
  product: Product;
  selectedFinish: ColorFinishOption;
  onFinishChange: (finish: ColorFinishOption) => void;
  selectedWidth: number;
  onWidthChange: (w: number) => void;
  selectedHeight: number;
  onHeightChange: (h: number) => void;
  onLaunchAR: () => void;
}

export function ProductConfigurator({
  product,
  selectedFinish,
  onFinishChange,
  selectedWidth,
  onWidthChange,
  selectedHeight,
  onHeightChange,
  onLaunchAR,
}: ProductConfiguratorProps) {
  const router = useRouter();

  const [selectedFrame, setSelectedFrame] = useState<FrameOption>(
    product.frameOptions[0] || {
      id: "frm-std",
      name: "Architectural Standard Frame",
      depthMm: product.dimensions.depthMm,
      sightlineMm: 50,
      description: "Standard architectural profile",
    }
  );

  const [selectedGlass, setSelectedGlass] = useState<GlassOption | undefined>(
    product.glassOptions.length > 0 ? product.glassOptions[0] : undefined
  );

  const [selectedHardware, setSelectedHardware] = useState<HardwareOption>(
    product.hardwareOptions[0] || {
      id: "hd-std",
      name: "Architectural Concealed Hardware",
      finish: "Matte Black",
      type: "Standard",
    }
  );

  const [quantity, setQuantity] = useState(1);

  const handleRequestQuoteWithConfig = () => {
    const params = new URLSearchParams({
      product: product.slug,
      productName: product.name,
      sku: product.sku,
      finish: selectedFinish.name,
      frame: selectedFrame.name,
      glass: selectedGlass ? selectedGlass.name : "Solid Panel",
      hardware: selectedHardware.name,
      width: selectedWidth.toString(),
      height: selectedHeight.toString(),
      quantity: quantity.toString(),
    });

    router.push(`/request-quote?${params.toString()}`);
  };

  return (
    <div className="bg-white border-2 border-[#e6f7f5] rounded-xl p-6 sm:p-8 space-y-8 shadow-sm">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sliders className="w-4 h-4 text-[#009886]" />
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886]">
            Bespoke Product Configuration
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold text-black">
          Configure {product.name}
        </h3>
        <p className="text-xs text-black/70 mt-1">
          Select architectural finishes, glazing packages, hardware styles, and exact aperture dimensions.
        </p>
      </div>

      {/* 1. Colour & Material Finish Selector */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
          <span>1. Architectural Finish</span>
          <span className="text-[#009886] font-bold text-xs">{selectedFinish.name}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          {product.finishes.map((fin) => {
            const isSelected = selectedFinish.id === fin.id;
            return (
              <button
                key={fin.id}
                type="button"
                onClick={() => onFinishChange(fin)}
                className={cn(
                  "p-3 rounded-lg border text-left flex items-start gap-3 transition-all",
                  isSelected
                    ? "bg-[#e6f7f5] border-[#009886] ring-2 ring-[#009886]/30"
                    : "bg-white border-[#e6f7f5] hover:border-[#009886]"
                )}
              >
                <span
                  className="w-5 h-5 rounded-full border border-black/20 shrink-0 mt-0.5 shadow-sm"
                  style={{ backgroundColor: fin.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-black truncate">
                    {fin.name}
                  </div>
                  <div className="text-[10px] text-black/60 mt-0.5 truncate">
                    {fin.textureLabel}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#009886] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Frame Profile Selection */}
      {product.frameOptions.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
            <span>2. Frame Profile & Depth</span>
            <span className="text-[#009886] font-bold text-xs">{selectedFrame.name}</span>
          </label>
          <div className="space-y-2">
            {product.frameOptions.map((frm) => {
              const isSelected = selectedFrame.id === frm.id;
              return (
                <button
                  key={frm.id}
                  type="button"
                  onClick={() => setSelectedFrame(frm)}
                  className={cn(
                    "w-full p-3 rounded-lg border text-left flex items-center justify-between gap-3 transition-all",
                    isSelected
                      ? "bg-[#e6f7f5] border-[#009886]"
                      : "bg-white border-[#e6f7f5] hover:border-[#009886]"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-black">{frm.name}</div>
                    <div className="text-[11px] text-black/70 mt-0.5">{frm.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[#009886]">{frm.depthMm}mm</span>
                    <span className="text-[10px] text-black/60 block">depth</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Glass / Glazing Selection (if applicable) */}
      {product.glassOptions.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
            <span>3. Glazing Specification</span>
            <span className="text-[#009886] font-bold text-xs">
              {selectedGlass ? selectedGlass.name : "Solid"}
            </span>
          </label>
          <div className="space-y-2">
            {product.glassOptions.map((gl) => {
              const isSelected = selectedGlass?.id === gl.id;
              return (
                <button
                  key={gl.id}
                  type="button"
                  onClick={() => setSelectedGlass(gl)}
                  className={cn(
                    "w-full p-3 rounded-lg border text-left flex items-center justify-between gap-3 transition-all",
                    isSelected
                      ? "bg-[#e6f7f5] border-[#009886]"
                      : "bg-white border-[#e6f7f5] hover:border-[#009886]"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-black">{gl.name}</div>
                    <div className="text-[11px] text-black/70 mt-0.5">{gl.description}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-[#009886]">Uw {gl.uValue}</span>
                    <span className="text-[10px] text-black/60 block">{gl.soundReductionDb} dB</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Hardware & Handle Options */}
      {product.hardwareOptions.length > 0 && (
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
            <span>4. Hardware & Handle System</span>
            <span className="text-[#009886] font-bold text-xs">{selectedHardware.name}</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {product.hardwareOptions.map((hd) => {
              const isSelected = selectedHardware.id === hd.id;
              return (
                <button
                  key={hd.id}
                  type="button"
                  onClick={() => setSelectedHardware(hd)}
                  className={cn(
                    "p-3 rounded-lg border text-left flex items-start justify-between gap-2 transition-all",
                    isSelected
                      ? "bg-[#e6f7f5] border-[#009886]"
                      : "bg-white border-[#e6f7f5] hover:border-[#009886]"
                  )}
                >
                  <div>
                    <div className="text-xs font-bold text-black">{hd.name}</div>
                    <div className="text-[10px] text-black/60 mt-0.5">
                      Finish: {hd.finish} • {hd.type}
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#009886] shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Custom Dimensions (Width x Height) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-black flex items-center justify-between">
          <span>5. Aperture Dimensions (mm)</span>
          <span className="text-[11px] text-black/60">
            Limits: {product.dimensions.minWidthMm}–{product.dimensions.maxWidthMm}W × {product.dimensions.minHeightMm}–{product.dimensions.maxHeightMm}H
          </span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-[11px] text-black/70 font-semibold block mb-1">Width (mm)</span>
            <input
              type="number"
              value={selectedWidth}
              min={product.dimensions.minWidthMm}
              max={product.dimensions.maxWidthMm}
              step={50}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-sm text-black font-mono p-2.5 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <span className="text-[11px] text-black/70 font-semibold block mb-1">Height (mm)</span>
            <input
              type="number"
              value={selectedHeight}
              min={product.dimensions.minHeightMm}
              max={product.dimensions.maxHeightMm}
              step={50}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-sm text-black font-mono p-2.5 rounded-lg focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 6. Quantity */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-black">
          6. Number of Units Required
        </span>
        <div className="flex items-center border border-[#e6f7f5] rounded-lg bg-[#e6f7f5]/50">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1.5 text-black hover:text-[#009886] text-sm font-bold"
          >
            -
          </button>
          <span className="px-4 py-1.5 text-xs font-mono font-bold text-black">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1.5 text-black hover:text-[#009886] text-sm font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Configuration Summary & Action Buttons */}
      <div className="pt-6 border-t border-[#e6f7f5] space-y-4">
        <div className="p-4 bg-[#e6f7f5] border border-[#009886]/30 rounded-lg text-xs space-y-1.5">
          <div className="text-[#009886] font-bold uppercase tracking-wider text-[11px]">
            Selected Specification:
          </div>
          <p className="text-black font-bold">
            {product.name} ({product.sku})
          </p>
          <p className="text-black/80 text-[11px]">
            {selectedFinish.name} • {selectedFrame.name} • {selectedGlass ? selectedGlass.name : "Solid Core"} • {selectedWidth}×{selectedHeight}mm ({quantity} unit{quantity > 1 ? "s" : ""})
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleRequestQuoteWithConfig}
            className="flex-1 py-3.5 px-6 bg-[#009886] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.18em] rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Request Quote for this Configuration</span>
          </button>

          <button
            type="button"
            onClick={onLaunchAR}
            className="py-3.5 px-6 bg-white hover:bg-[#e6f7f5] text-[#009886] text-xs uppercase font-bold tracking-[0.18em] rounded-lg border-2 border-[#009886] transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#009886]" />
            <span>View in My Room (Camera)</span>
          </button>
        </div>

        <div className="text-center">
          <a
            href={`https://wa.me/918531992626?text=${encodeURIComponent(
              `Hello SMC Fabrication, I am interested in ${product.name} (${product.sku}) - ${selectedWidth}x${selectedHeight}mm in ${selectedFinish.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-black/70 hover:text-[#009886] font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#009886]" /> Or discuss directly on WhatsApp with an engineer
          </a>
        </div>
      </div>
    </div>
  );
}

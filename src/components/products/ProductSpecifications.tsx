"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { ShieldCheck, Wind, Droplets, Volume2, Thermometer, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "installation" | "care">("specs");

  const specCards = [
    {
      icon: <Thermometer className="w-5 h-5 text-[#009886]" />,
      label: "Thermal Transmittance",
      value: product.specifications.thermalTransmittance,
      sub: "Passive House High-Efficiency",
    },
    {
      icon: <Volume2 className="w-5 h-5 text-[#009886]" />,
      label: "Acoustic Insulation",
      value: product.specifications.acousticInsulation,
      sub: "Sound Transmission Loss Class",
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#009886]" />,
      label: "Water Tightness",
      value: product.specifications.waterTightness,
      sub: "Severe Driving Rain Tested",
    },
    {
      icon: <Wind className="w-5 h-5 text-[#009886]" />,
      label: "Wind Load Resistance",
      value: product.specifications.windResistance,
      sub: "High-Rise Coastal Rating",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#009886]" />,
      label: "Security Standard",
      value: product.specifications.burglarResistance,
      sub: "Multi-Point Locking Core",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#009886]" />,
      label: "Factory Warranty",
      value: `${product.specifications.standardWarrantyYears} Years`,
      sub: "Comprehensive Manufacturing Guarantee",
    },
  ];

  return (
    <div className="bg-white border-2 border-[#e6f7f5] rounded-xl p-6 sm:p-8 mt-12 shadow-sm">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-[#e6f7f5] pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab("specs")}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors whitespace-nowrap",
            activeTab === "specs"
              ? "bg-[#009886] text-white"
              : "text-black/70 hover:text-black bg-[#e6f7f5]"
          )}
        >
          Technical Specifications
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors whitespace-nowrap",
            activeTab === "features"
              ? "bg-[#009886] text-white"
              : "text-black/70 hover:text-black bg-[#e6f7f5]"
          )}
        >
          Engineering Features
        </button>
        <button
          onClick={() => setActiveTab("installation")}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors whitespace-nowrap",
            activeTab === "installation"
              ? "bg-[#009886] text-white"
              : "text-black/70 hover:text-black bg-[#e6f7f5]"
          )}
        >
          Installation Guide
        </button>
        <button
          onClick={() => setActiveTab("care")}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg transition-colors whitespace-nowrap",
            activeTab === "care"
              ? "bg-[#009886] text-white"
              : "text-black/70 hover:text-black bg-[#e6f7f5]"
          )}
        >
          Care & Longevity
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab === "specs" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specCards.map((spec, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#e6f7f5]/40 border border-[#e6f7f5] rounded-lg flex items-start gap-3.5"
                >
                  <div className="p-2.5 bg-white border border-[#e6f7f5] rounded-lg shrink-0 shadow-sm">
                    {spec.icon}
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-black/60 font-bold block">
                      {spec.label}
                    </span>
                    <strong className="text-base font-bold text-black block mt-0.5">
                      {spec.value}
                    </strong>
                    <span className="text-[10px] text-black/70 mt-0.5 block">
                      {spec.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dimensional Limits Table */}
            <div className="mt-6 pt-6 border-t border-[#e6f7f5]">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-3">
                Dimensional Engineering Envelope
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#e6f7f5] rounded-lg overflow-hidden">
                  <thead className="bg-[#e6f7f5] text-black font-mono font-bold">
                    <tr>
                      <th className="p-3 border-b border-[#e6f7f5]">Parameter</th>
                      <th className="p-3 border-b border-[#e6f7f5]">Standard Unit</th>
                      <th className="p-3 border-b border-[#e6f7f5]">Custom Architectural Limits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6f7f5] text-black font-medium">
                    <tr>
                      <td className="p-3 text-black/70">Opening Width</td>
                      <td className="p-3 font-mono">{product.dimensions.standardWidthMm} mm</td>
                      <td className="p-3 font-mono text-[#009886] font-bold">
                        {product.dimensions.minWidthMm} mm – {product.dimensions.maxWidthMm} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-black/70">Opening Height</td>
                      <td className="p-3 font-mono">{product.dimensions.standardHeightMm} mm</td>
                      <td className="p-3 font-mono text-[#009886] font-bold">
                        {product.dimensions.minHeightMm} mm – {product.dimensions.maxHeightMm} mm
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-black/70">Frame Profile Depth</td>
                      <td className="p-3 font-mono">{product.dimensions.depthMm} mm</td>
                      <td className="p-3 text-black/70">Engineered to structural wind load</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-black/70">Max Allowable Leaf Mass</td>
                      <td className="p-3 font-mono">{product.specifications.maxPanelWeight}</td>
                      <td className="p-3 text-black/70">Heavy-duty bearing carriage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "features" && (
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-2">
              Key Engineering Highlights
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-black">
              {product.features.map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 p-3 bg-[#e6f7f5]/40 border border-[#e6f7f5] rounded-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-[#009886] mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "installation" && (
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-2">
              On-Site Architectural Installation Requirements
            </h4>
            <div className="space-y-2.5 text-xs text-black">
              {product.installationNotes.map((note, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-[#e6f7f5]/40 border border-[#e6f7f5] rounded-lg flex items-start gap-3"
                >
                  <span className="font-mono text-[#009886] font-bold shrink-0">
                    0{i + 1}.
                  </span>
                  <p className="leading-relaxed font-medium">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "care" && (
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] mb-2">
              Maintenance & Lifetime Care
            </h4>
            <div className="space-y-2.5 text-xs text-black">
              {product.maintenanceGuide.map((guide, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-[#e6f7f5]/40 border border-[#e6f7f5] rounded-lg flex items-start gap-3"
                >
                  <Sparkles className="w-4 h-4 text-[#009886] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">{guide}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

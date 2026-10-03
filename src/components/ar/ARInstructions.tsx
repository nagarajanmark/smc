"use client";

import React from "react";
import { Camera, Move, Sliders, Download, AlertCircle } from "lucide-react";

export function ARInstructions() {
  const steps = [
    {
      icon: <Camera className="w-5 h-5 text-[#0070bc]" />,
      title: "1. Open Mobile Camera",
      desc: "Allow camera access to view the live video feed directly in your mobile browser without installing any app.",
    },
    {
      icon: <Move className="w-5 h-5 text-[#0070bc]" />,
      title: "2. Drag & Position Overlay",
      desc: "Drag the transparent door or window overlay with your finger to align it over your wall opening or entrance.",
    },
    {
      icon: <Sliders className="w-5 h-5 text-[#0070bc]" />,
      title: "3. Scale & Adjust Finishes",
      desc: "Use the size slider or pinch-to-zoom to match aperture proportions. Switch architectural finishes in real time.",
    },
    {
      icon: <Download className="w-5 h-5 text-[#0070bc]" />,
      title: "4. Capture & Send For Quote",
      desc: "Save a snapshot with watermark to share with your architect or submit with your fabrication estimate request.",
    },
  ];

  return (
    <div className="space-y-4 text-left font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="p-3 bg-[#e6f4fd]/50 border border-[#e6f4fd] rounded-xl flex items-start gap-3"
          >
            <div className="p-2 bg-white rounded-lg shrink-0 border border-[#e6f4fd] shadow-xs">
              {step.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                {step.title}
              </h4>
              <p className="text-[11px] text-black/75 mt-1 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Engineering Disclaimer */}
      <div className="p-3 bg-[#e6f4fd] border border-[#0070bc]/30 rounded-xl flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#0070bc] shrink-0 mt-0.5" />
        <div className="text-[11px] text-black/80 leading-relaxed font-medium">
          <strong>Visual Reference Note:</strong> The 2D room camera preview is an interactive manual positioning tool designed for aesthetic and proportion reference. It does not automatically track surfaces in 3D. Final structural fabrication requires on-site millimeter laser survey verification by our engineering team.
        </div>
      </div>
    </div>
  );
}

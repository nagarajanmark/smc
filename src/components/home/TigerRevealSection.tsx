"use client";

import React from "react";
import TigerTearReveal from "@/components/ui/tiger-tear-reveal";

export function TigerRevealSection() {
  return (
    <div className="w-full relative bg-[#f8fbfe] border-y border-neutral-200">
      <TigerTearReveal
        word="DOORS AND WINDOWS"
        tagline="NO. 1 WINDOWS & DOORS UPVC PROFILES IN INDIA"
        tagline2="HIGH QUALITY AND ADVANCED TECHNOLOGY"
        ink="#009886"
        paper="#f8fbfe"
        taglineColor="#1a1a1a"
        logoSrc="/logo.png"
        revealSubtitle="NO. 1 WINDOWS & DOORS UPVC PROFILES IN INDIA"
        revealTagline="HIGH QUALITY AND ADVANCED TECHNOLOGY"
        height="100vh"
        scrollDistance="90vh"
        hint={true}
      />
    </div>
  );
}

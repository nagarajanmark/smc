"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function GlyphPortalSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Logo scales smoothly from 1 to 8 across the scroll, fading out precisely as next section arrives
  const logoScale = useTransform(scrollYProgress, [0, 1], [1, 7.5]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.65, 0.95, 1], [1, 1, 0.2, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[130vh] bg-[#f8fbfe]">
      {/* Sticky Stage Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#f8fbfe]">

        {/* Background hero.png Layer - 100% Full Visibility & Crisp Quality */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/hero.png"
            alt="SMC UPVC Architecture Background"
            fill
            priority
            className="object-cover object-right lg:object-center opacity-100 scale-100"
          />
        </div>

        {/* 1. LEFT-ALIGNED HERO (ONLY LOGO SCALES SMOOTHLY) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-start pointer-events-none">
          <div className="flex flex-col items-start justify-center max-w-xl relative">
            
            {/* ONLY THE LOGO ZOOMS IN */}
            <motion.div
              style={{
                scale: logoScale,
                opacity: logoOpacity,
                transformOrigin: "25% 50%",
              }}
              className="relative w-72 sm:w-96 md:w-[460px] h-36 sm:h-48 md:h-56 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src="/logo.png"
                alt="SMC - D Wood Go Green Logo"
                fill
                className="object-contain object-left"
                priority
              />
              {/* Soft Black Floor Ambient Shadow Under Logo */}
              <div className="absolute -bottom-3 left-4 w-4/5 h-6 bg-black/20 rounded-full blur-xl pointer-events-none" />
            </motion.div>

            {/* TAGLINE TEXT STAYS IN PLACE (NO SCALING) */}
            <motion.div
              style={{ opacity: textOpacity }}
              className="mt-3 space-y-1 text-left pl-2 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
            >
              <span className="text-[11px] sm:text-xs font-mono font-extrabold text-[#009886] uppercase tracking-widest block">
                Manufacturers & Dealers
              </span>
              <p className="text-xs sm:text-sm md:text-base font-bold text-black/90 max-w-md leading-relaxed">
                No. 1 Windows & Doors UPVC Profiles in India • High Quality & Advanced Technology
              </p>
            </motion.div>

          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5 shadow-xs">
            Scroll to explore
          </span>
          <div className="w-4 h-7 rounded-full border-2 border-black/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#009886] rounded-full animate-bounce" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

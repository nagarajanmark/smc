"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings, Headphones, Phone, ArrowUpRight } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";

const settings = { word: "SMC", scrollLength: 2.4, interactive: true, annotations: false };
const family = '"Glyph Portal Jakarta", Arial, sans-serif';
let fontLoad: Promise<void> | undefined;

export default function Demo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  const [face, setFace] = useState<string | null>(null);

  useEffect(() => {
    let settled = false;
    const finish = (value: string) => { if (!settled) { settled = true; setFace(value); } };
    
    if (typeof window !== "undefined" && typeof FontFace !== "undefined") {
      try {
        fontLoad ??= new FontFace(
          "Glyph Portal Jakarta",
          'url("https://cdn.21st.dev/assets/mirror/15/153fc85b70298beeb1d61a5f723331649e7f23bb77302a66e61cb3e2fbdb5e79.woff2")',
          { weight: "400 700" }
        ).load().then((font) => {
          if (document.fonts) document.fonts.add(font);
        });
      } catch {
        // Fallback gracefully
      }
    }
    const timeout = window.setTimeout(() => finish("Arial, sans-serif"), 1600);
    if (fontLoad) {
      void fontLoad.then(() => finish(family), () => finish("Arial, sans-serif"));
    } else {
      finish("Arial, sans-serif");
    }
    return () => { settled = true; clearTimeout(timeout); };
  }, []);

  return (
    <div
      data-demo-scroll
      data-slipstream-demo
      tabIndex={0}
      role="region"
      aria-label="SMC UPVC Doors & Windows. Scroll to step inside."
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#050d0a",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.64), rgba(0, 0, 0, 0.64)), radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%), url('/video-bg-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        containerType: "inline-size",
        fontFamily: face ?? "Arial, sans-serif",
      }}
    >
      <style>{`
        [data-slipstream-demo] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 82px) 24px auto;justify-content:center;}
        [data-slipstream-demo] [data-gp-hint]{display:none;}
        [data-slipstream-demo] [data-gp-enter]{min-height:48px;padding:0 26px;gap:20px;background:#009886;border:1px solid #008272;border-radius:9999px;color:#ffffff;font-size:14px;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.5), 0 0 20px rgba(0,152,134,0.4);transition:all .2s;}
        [data-slipstream-demo] [data-gp-enter]:hover{background:#008272;box-shadow:0 10px 28px rgba(0,0,0,0.6), 0 0 25px rgba(0,152,134,0.6);transform:translateY(-1px);}
        [data-slipstream-demo] [data-gp-enter]:focus-visible{outline:2px solid #ffffff;outline-offset:4px;}
        [data-slipstream-demo] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;}
        [data-slipstream-demo] [data-gp-select]{border-color:transparent;border-radius:8px;font-size:12px;color:#ffffff;background:rgba(0,0,0,0.75);}
        [data-sublime-header]{position:absolute;inset:clamp(24px,4.5cqw,48px) clamp(24px,5cqw,64px) auto;display:flex;align-items:center;justify-content:space-between;gap:20px;}
        [data-sublime-logo]{font-size:26px;font-weight:900;letter-spacing:-.04em;color:#ffffff;text-shadow:0 3px 12px rgba(0,0,0,0.9);}
        [data-sublime-category]{font-size:13px;font-weight:700;color:rgba(255,255,255,0.95);text-shadow:0 2px 8px rgba(0,0,0,0.9);}
        [data-sublime-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 32px);margin:0;text-align:center;font-size:13px;font-weight:800;line-height:1.5;letter-spacing:.08em;color:#ffffff;text-shadow:0 3px 14px rgba(0,0,0,0.95);}
        [data-sublime-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 32px) 24px auto;margin:0;text-align:center;font-size:16px;font-weight:600;color:#ffffff;text-shadow:0 3px 14px rgba(0,0,0,0.95);}
        [data-sublime-scroll]{position:absolute;inset:auto 24px 7%;text-align:center;color:rgba(255,255,255,0.95);font-size:12px;letter-spacing:.04em;text-shadow:0 2px 8px rgba(0,0,0,0.9);font-weight:600;}
        [data-slipstream-demo] [data-gp-art]{filter: drop-shadow(0 15px 35px rgba(0,0,0,0.75)) drop-shadow(0 4px 10px rgba(0,0,0,0.5));}
        @media(any-pointer:coarse){[data-sublime-scroll]{bottom:13%;}}
        @container(max-width:550px){[data-sublime-category]{font-size:11px;max-width:18ch;text-align:right;}[data-sublime-eyebrow]{font-size:11px;letter-spacing:.03em;}[data-sublime-support]{font-size:13px;}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 76px);}}
        @container(max-height:479px){[data-sublime-header]{top:18px;}[data-sublime-support]{top:calc(var(--gp-word-bottom,50%) + 16px);}[data-slipstream-demo] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 60px);}[data-sublime-scroll]{display:none;}}
        [data-slipstream-demo] [data-gp-content]{padding: clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5cqw, 4rem); font-family: inherit; background: #ffffff;}
      `}</style>

      {/* SVG Clip Path Definitions for the Architectural 3-Panel Silhouette Pattern */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0">
        <defs>
          <clipPath id="arch-panel-1" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.30 Q 0,0.27 0.05,0.264 L 0.95,0.09 Q 1,0.082 1,0.12 L 1,0.95 Q 1,1 0.95,1 L 0.05,1 Q 0,1 0,0.95 Z" />
          </clipPath>
          <clipPath id="arch-panel-2" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.045 Q 0,0 0.06,0.008 L 0.94,0.17 Q 1,0.18 1,0.22 L 1,0.95 Q 1,1 0.95,1 L 0.05,1 Q 0,1 0,0.95 Z" />
          </clipPath>
          <clipPath id="arch-panel-3" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.23 Q 0,0.20 0.05,0.21 L 0.94,0.365 Q 1,0.378 1,0.42 L 1,0.95 Q 1,1 0.95,1 L 0.05,1 Q 0,1 0,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {face ? (
        <GlyphPortal
          word={s.word}
          fontFamily={face}
          fontWeight={900}
          style={{
            fontFamily: face,
            "--gp-paper": "transparent",
            "--gp-ink": "#ffffff",
            "--gp-field": "#ffffff",
            "--gp-foreground": "#171717",
          }}
          background={
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
                boxShadow: "0 0 50px rgba(255,255,255,0.9)",
              }}
            />
          }
          scrollLength={s.scrollLength}
          interactive={s.interactive}
          annotations={s.annotations}
          enterLabel="Step inside"
          front={
            <>
              <div data-sublime-header>
                <div className="flex items-center gap-2">
                  <span data-sublime-logo>SMC.</span>
                </div>
                <span data-sublime-category className="uppercase tracking-wider font-bold">
                  UPVC DOORS AND WINDOWS
                </span>
              </div>
              <p data-sublime-eyebrow className="uppercase tracking-widest font-extrabold">
                MANUFACTURERS &amp; DEALERS IN UPVC DOORS &amp; WINDOWS
              </p>
              <p data-sublime-support className="mx-auto px-4">
                No. 1 Windows &amp; Doors UPVC Profiles in India • High Quality and Advanced Technology
              </p>
              <span data-sublime-scroll>Scroll for a closer look ↓</span>
            </>
          }
        >
          {/* Why Work With Us - Luxury Architectural Section Content */}
          <div className="w-full max-w-7xl mx-auto py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Content & Benefits */}
              <div className="lg:col-span-6 flex flex-col items-start text-left">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-100/80 rounded-full text-xs font-bold text-neutral-800 shadow-xs border border-neutral-200 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#009886]" />
                  Why Work With Us
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 tracking-tight leading-[1.15] mb-4">
                  Professional window &amp; Door specialists you trust
                </h2>

                {/* Subtitle / Paragraph */}
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl mb-7">
                  We are dedicated to delivering expertly crafted windows and doors that offer security, energy efficiency, and modern design crafted with skilled professionals.
                </p>

                {/* Features Card Box */}
                <div className="w-full bg-neutral-50/70 rounded-2xl p-5 sm:p-6 shadow-xs border border-neutral-200/80 grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-xl bg-[#009886] flex items-center justify-center shrink-0 shadow-xs">
                      <Settings className="w-6 h-6 text-white stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                        Customized Window
                      </h4>
                      <span className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                        Solutions
                      </span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 rounded-xl bg-[#009886] flex items-center justify-center shrink-0 shadow-xs">
                      <Headphones className="w-6 h-6 text-white stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                        Dedicated Customer
                      </h4>
                      <span className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">
                        Support
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA & Phone Info */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
                  <Link
                    href="/request-quote"
                    className="inline-flex items-center gap-2.5 bg-[#009886] hover:bg-[#008272] text-white font-bold px-7 py-3.5 rounded-full shadow-md shadow-[#009886]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Get A Free Quote
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>

                  <div className="flex items-center gap-3.5">
                    <a
                      href="tel:+919443721544"
                      className="w-12 h-12 rounded-full bg-[#009886] flex items-center justify-center text-white shadow-xs hover:bg-[#008272] hover:scale-105 transition-all"
                      aria-label="Call Phone Support"
                    >
                      <Phone className="w-5 h-5 fill-current" />
                    </a>
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-500 font-medium">Phone Number</span>
                      <a
                        href="tel:+919443721544"
                        className="text-base font-bold text-neutral-900 hover:text-[#009886] transition-colors"
                      >
                        +91 94437 21544
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: 3-Segment Architectural Window Pattern Matching Reference */}
              <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-end justify-center">
                <div className="w-full max-w-[560px] h-full grid grid-cols-3 gap-3 sm:gap-4 p-1">
                  
                  {/* Panel 1 (Left): Slopes Up Towards Peak */}
                  <div
                    className="relative h-full overflow-hidden shadow-sm"
                    style={{
                      clipPath: "url(#arch-panel-1)",
                      WebkitClipPath: "url(#arch-panel-1)",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: "url('/our-work-image.jpg')",
                        backgroundSize: "320% 100%",
                        backgroundPosition: "0% center",
                      }}
                    />
                  </div>

                  {/* Panel 2 (Center): Tallest Peak House Roof Arch */}
                  <div
                    className="relative h-full overflow-hidden shadow-sm"
                    style={{
                      clipPath: "url(#arch-panel-2)",
                      WebkitClipPath: "url(#arch-panel-2)",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: "url('/our-work-image.jpg')",
                        backgroundSize: "320% 100%",
                        backgroundPosition: "50% center",
                      }}
                    />
                  </div>

                  {/* Panel 3 (Right): Slopes Downwards to Right */}
                  <div
                    className="relative h-full overflow-hidden shadow-sm"
                    style={{
                      clipPath: "url(#arch-panel-3)",
                      WebkitClipPath: "url(#arch-panel-3)",
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 hover:scale-105"
                      style={{
                        backgroundImage: "url('/our-work-image.jpg')",
                        backgroundSize: "320% 100%",
                        backgroundPosition: "100% center",
                      }}
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>
        </GlyphPortal>
      ) : (
        <div
          role="status"
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            color: "#ffffff",
            fontSize: 14,
          }}
        >
          Loading portal…
        </div>
      )}
    </div>
  );
}

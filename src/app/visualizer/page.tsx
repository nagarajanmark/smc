"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Camera,
  RotateCcw,
  Download,
  Sliders,
  SwitchCamera,
  Check,
  FlipHorizontal,
  Upload,
  ChevronDown,
  Sun,
  Moon,
  Sparkles,
  ZoomIn,
  ZoomOut,
  QrCode,
  FileText,
  Trash2,
  Share2,
} from "lucide-react";
import { Product, ColorFinishOption } from "@/types/product";
import { PRODUCTS_DATA } from "@/data/products";
import { cn } from "@/lib/utils";
import { DesktopQRCodeModal } from "@/components/ar/DesktopQRCodeModal";

function VisualizerContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") || searchParams.get("preview");

  // Determine initial product from query param or default to first product
  const initialProduct =
    PRODUCTS_DATA.find(
      (p) =>
        p.slug === productParam ||
        p.id === productParam ||
        p.sku.toLowerCase() === (productParam || "").toLowerCase()
    ) || PRODUCTS_DATA[0];

  // Active product selection
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState<number>(0);
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);

  // Studio lighting mode
  const [lightingMode, setLightingMode] = useState<"day" | "warm" | "night">("day");
  const [projectCode, setProjectCode] = useState<string>(
    `PROJECT-SMC-${initialProduct.sku.replace("SMC-", "")}`
  );

  // Camera stream state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [useFallbackRoom, setUseFallbackRoom] = useState(true);
  const [customRoomImage, setCustomRoomImage] = useState<string | null>(null);

  // Overlay transformation state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1.0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Dragging & touch gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialPinchDist, setInitialPinchDist] = useState<number | null>(null);
  const [initialPinchScale, setInitialPinchScale] = useState<number>(1.0);

  // UI state
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize product when query param changes
  useEffect(() => {
    if (productParam) {
      const found = PRODUCTS_DATA.find(
        (p) =>
          p.slug === productParam ||
          p.id === productParam ||
          p.sku.toLowerCase() === productParam.toLowerCase()
      );
      if (found) {
        setCurrentProduct(found);
        setSelectedFinishIndex(0);
        setActiveVariantIndex(0);
        setProjectCode(`PROJECT-SMC-${found.sku.replace("SMC-", "")}`);
      }
    }
  }, [productParam]);

  // Color selection handler
  const handleSelectFinish = (fIdx: number) => {
    setSelectedFinishIndex(fIdx);
    const finish = currentProduct.finishes?.[fIdx];
    if (finish && currentProduct.pngVariants && currentProduct.pngVariants.length > 0) {
      const vIdx = currentProduct.pngVariants.findIndex(
        (v) =>
          v.finishId === finish.id ||
          v.name.toLowerCase().includes(finish.name.toLowerCase()) ||
          finish.name.toLowerCase().includes(v.name.toLowerCase())
      );
      if (vIdx >= 0) {
        setActiveVariantIndex(vIdx);
      } else if (fIdx < currentProduct.pngVariants.length) {
        setActiveVariantIndex(fIdx);
      }
    }
  };

  // Determine active PNG overlay URL
  const overlayPngUrl =
    currentProduct.pngVariants && currentProduct.pngVariants.length > 0
      ? currentProduct.pngVariants[activeVariantIndex]?.pngUrl ||
        currentProduct.transparentPngUrl ||
        currentProduct.images[0]
      : currentProduct.transparentPngUrl || "/images/product-pivot-door.png";

  // Check multi-camera availability
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      navigator.mediaDevices &&
      navigator.mediaDevices.enumerateDevices
    ) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const videoInputs = devices.filter((d) => d.kind === "videoinput");
          setHasMultipleCameras(videoInputs.length > 1);
        })
        .catch(() => {});
    }
  }, []);

  // Clean up all active camera tracks
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
          console.warn("Error stopping camera track", e);
        }
      });
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  // Initialize live camera
  const startCamera = useCallback(async () => {
    setIsCameraLoading(true);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraLoading(false);
      setUseFallbackRoom(true);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setUseFallbackRoom(false);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err: unknown) {
      console.warn("Camera start failed, falling back to studio", err);
      setUseFallbackRoom(true);
    } finally {
      setIsCameraLoading(false);
    }
  }, [facingMode, stopCamera]);

  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1.0);
    setRotation(0);
    setOpacity(1.0);
    setIsFlipped(false);
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setInitialPinchDist(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );

      if (initialPinchDist === null) {
        setInitialPinchDist(dist);
        setInitialPinchScale(scale);
      } else {
        const factor = dist / initialPinchDist;
        const newScale = Math.min(Math.max(initialPinchScale * factor, 0.4), 2.5);
        setScale(newScale);
      }
    } else if (e.touches.length === 1 && isDragging) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.4), 2.5));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomRoomImage(event.target.result as string);
          setUseFallbackRoom(true);
          stopCamera();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setCustomRoomImage(event.target.result as string);
            setUseFallbackRoom(true);
            stopCamera();
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCaptureScreenshot = async () => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement("canvas");
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (videoRef.current && stream && !useFallbackRoom) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
      } else if (customRoomImage) {
        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.src = customRoomImage;

        await new Promise((resolve) => {
          bgImg.onload = () => resolve(true);
          bgImg.onerror = () => resolve(false);
        });
        ctx.drawImage(bgImg, 0, 0, width, height);
      } else {
        ctx.fillStyle =
          lightingMode === "night"
            ? "#0f172a"
            : lightingMode === "warm"
            ? "#fef8f0"
            : "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }

      const overlayImg = new window.Image();
      overlayImg.crossOrigin = "anonymous";
      overlayImg.src = overlayPngUrl;

      await new Promise((resolve) => {
        overlayImg.onload = () => resolve(true);
        overlayImg.onerror = () => resolve(false);
      });

      const centerX = width / 2 + position.x;
      const centerY = height / 2 + position.y;
      const baseWidth = Math.min(width * 0.55, 380) * scale;
      const aspect =
        overlayImg.height > 0 ? overlayImg.width / overlayImg.height : 0.5;
      const baseHeight = baseWidth / aspect;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      if (isFlipped) {
        ctx.scale(-1, 1);
      }
      ctx.globalAlpha = opacity;
      ctx.drawImage(
        overlayImg,
        -baseWidth / 2,
        -baseHeight / 2,
        baseWidth,
        baseHeight
      );
      ctx.restore();

      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(20, height - 80, Math.min(width - 40, 480), 64);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px system-ui, sans-serif";
      const activeColorName = currentProduct.finishes?.[selectedFinishIndex]?.name || "";
      ctx.fillText(
        `SMC FABRICATIONS • ${currentProduct.name}${activeColorName ? ` (${activeColorName})` : ""}`,
        32,
        height - 54
      );

      ctx.fillStyle = "#a7f3d0";
      ctx.font = "11px monospace";
      ctx.fillText(
        `${currentProduct.sku} | ${currentProduct.dimensions.standardWidthMm}×${currentProduct.dimensions.standardHeightMm}mm | Ref: ${projectCode || "SMC-STUDIO"}`,
        32,
        height - 34
      );

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `SMC-${currentProduct.slug}-visualizer.png`;
      a.click();

      setScreenshotCaptured(true);
      setTimeout(() => setScreenshotCaptured(false), 2500);
    } catch (err) {
      console.error("Screenshot capture failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbfe] pt-24 pb-16 font-sans select-none">
      <div className="max-w-[1560px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Studio Visualizer Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT: LARGE INTERACTIVE VISUALIZER CANVAS (STICKY) */}
          {/* ======================================================== */}
          <div
            ref={containerRef}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handlePointerUp}
            className={cn(
              "relative lg:col-span-7 xl:col-span-8 w-full h-[520px] sm:h-[600px] lg:h-[calc(100vh-140px)] min-h-[520px] rounded-3xl overflow-hidden border border-[#e6f7f5] shadow-xl transition-colors duration-500 lg:sticky lg:top-24",
              lightingMode === "night"
                ? "bg-[#0b0f19]"
                : lightingMode === "warm"
                ? "bg-[#faf5ee]"
                : "bg-[#f8fbfe]"
            )}
          >
            {/* Subtle Studio Grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#0098860e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-80" />

            {/* Live Camera Stream Video */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              webkit-playsinline="true"
              onLoadedMetadata={() => {
                videoRef.current?.play().catch(() => {});
              }}
              className={cn(
                "absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-300",
                useFallbackRoom ? "opacity-0 invisible" : "opacity-100 visible"
              )}
            />

            {/* Custom Uploaded Backdrop Photo */}
            {useFallbackRoom && customRoomImage && (
              <img
                src={customRoomImage}
                alt="Custom Room Backdrop"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}

            {/* Canvas Top Bar: Render Tag, Dimension Pills, Studio Light Switch */}
            <div className="absolute top-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
                {/* Instant Browser Render Badge */}
                <div className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-[#e6f7f5] shadow-xs flex items-center gap-2 text-xs font-bold text-black">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009886] animate-pulse" />
                  <span>Instant Browser Render</span>
                </div>

                {/* Dimension Tag */}
                <div className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl border border-[#e6f7f5] shadow-xs text-xs font-mono font-bold text-[#009886]">
                  W: {(currentProduct.dimensions.standardWidthMm / 1000).toFixed(1)}m × H:{" "}
                  {(currentProduct.dimensions.standardHeightMm / 1000).toFixed(1)}m
                </div>
              </div>

              {/* Lighting Theme Toggles (Day / Warm / Night) */}
              <div className="flex items-center gap-1 p-1 bg-white/95 backdrop-blur-md rounded-xl border border-[#e6f7f5] shadow-xs pointer-events-auto">
                <button
                  onClick={() => setLightingMode("day")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all cursor-pointer",
                    lightingMode === "day"
                      ? "bg-[#009886] text-white shadow-xs"
                      : "text-black/60 hover:text-black hover:bg-neutral-100"
                  )}
                  title="Studio Daylight"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightingMode("warm")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all cursor-pointer",
                    lightingMode === "warm"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "text-black/60 hover:text-black hover:bg-neutral-100"
                  )}
                  title="Warm Sunset Lighting"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightingMode("night")}
                  className={cn(
                    "p-1.5 rounded-lg transition-all cursor-pointer",
                    lightingMode === "night"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-black/60 hover:text-black hover:bg-neutral-100"
                  )}
                  title="Night Studio Glow"
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating Canvas Quick Controls (Bottom Left of Canvas) */}
            <div className="absolute bottom-3.5 left-3.5 z-30 flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md p-1.5 rounded-xl border border-[#e6f7f5] shadow-md">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className={cn(
                  "p-2 rounded-lg transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5",
                  isFlipped ? "bg-[#009886] text-white" : "hover:bg-black/5 text-black"
                )}
                title="Flip Direction"
              >
                <FlipHorizontal className="w-4 h-4" />
                <span className="text-[11px] hidden sm:inline">Flip</span>
              </button>

              <button
                onClick={handleReset}
                className="p-2 hover:bg-black/5 text-black rounded-lg transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5"
                title="Reset Position & Scale"
              >
                <RotateCcw className="w-4 h-4 text-[#009886]" />
                <span className="text-[11px] hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.4))}
                className="p-2 hover:bg-black/5 text-black rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => setScale((prev) => Math.min(prev + 0.1, 2.5))}
                className="p-2 hover:bg-black/5 text-black rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {hasMultipleCameras && (
                <button
                  onClick={toggleFacingMode}
                  className="p-2 hover:bg-black/5 text-black rounded-lg transition-colors cursor-pointer"
                  title="Switch Camera"
                >
                  <SwitchCamera className="w-4 h-4 text-[#009886]" />
                </button>
              )}
            </div>

            {/* DRAGGABLE, RESIZABLE, ROTATABLE OVERLAY */}
            <div
              ref={overlayRef}
              onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
                }
              }}
              onWheel={handleWheel}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale}) ${
                  isFlipped ? "scaleX(-1)" : ""
                }`,
                opacity: opacity,
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 transition-opacity duration-150"
            >
              <div className="relative w-64 sm:w-80 md:w-96 aspect-[1/2] max-h-[72vh] flex items-center justify-center pointer-events-auto">
                <img
                  src={overlayPngUrl}
                  alt={currentProduct.name}
                  className={cn(
                    "w-full h-full object-contain filter",
                    lightingMode === "night"
                      ? "drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] brightness-90"
                      : "drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                  )}
                  draggable={false}
                />

                {isDragging && (
                  <div className="absolute inset-0 border-2 border-dashed border-[#009886] rounded-2xl pointer-events-none" />
                )}
              </div>
            </div>

            <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none text-[10px] font-mono font-bold text-black/40 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-black/5 hidden md:block">
              DRAG TO MOVE • WHEEL TO SCALE
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: DESKTOP STUDIO CONTROLS (NATURAL PAGE SCROLL) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            
            {/* Header: Product Switcher & Phone Sync */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e6f7f5]">
              <div className="relative flex-1">
                <button
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                  className="w-full bg-white px-3 py-2 rounded-xl border border-[#e6f7f5] shadow-xs flex items-center justify-between text-left hover:border-[#009886]/40 transition-colors cursor-pointer"
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] uppercase font-mono font-bold text-[#009886] block">
                      {currentProduct.categoryName}
                    </span>
                    <h4 className="text-xs font-bold text-black truncate">
                      {currentProduct.name}
                    </h4>
                  </div>
                  <ChevronDown className="w-4 h-4 text-black/50 shrink-0" />
                </button>

                {showProductDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e6f7f5] rounded-xl shadow-2xl overflow-y-auto max-h-72 z-50 p-1.5">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-black/50 tracking-wider">
                      Switch UPVC Model
                    </div>
                    {PRODUCTS_DATA.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setCurrentProduct(p);
                          setSelectedFinishIndex(0);
                          setActiveVariantIndex(0);
                          setShowProductDropdown(false);
                          setProjectCode(`PROJECT-SMC-${p.sku.replace("SMC-", "")}`);
                        }}
                        className={cn(
                          "w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer",
                          p.id === currentProduct.id
                            ? "bg-[#e6f7f5] text-[#009886] font-bold"
                            : "hover:bg-black/5 text-black"
                        )}
                      >
                        <span className="truncate">{p.name}</span>
                        {p.id === currentProduct.id && (
                          <Check className="w-3.5 h-3.5 text-[#009886] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsQRModalOpen(true)}
                className="p-2.5 bg-white hover:bg-neutral-100 text-black rounded-xl border border-[#e6f7f5] shadow-xs transition-colors cursor-pointer"
                title="Scan with Phone Camera"
              >
                <QrCode className="w-4 h-4 text-[#009886]" />
              </button>
            </div>

            {/* 1. INSTANT LAMINATE / ROOM PHOTO UPLOAD CARD */}
            <div className="bg-white rounded-2xl border border-[#e6f7f5] p-4 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#009886]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    Instant Backdrop Upload
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  0ms Lag
                </span>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                  customRoomImage
                    ? "border-[#009886] bg-[#e6f7f5]/40"
                    : "border-neutral-200 hover:border-[#009886] hover:bg-[#f6fbfb]"
                )}
              >
                <div className="p-2.5 bg-[#e6f7f5] text-[#009886] rounded-xl mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <h5 className="text-xs font-bold text-black">
                  {customRoomImage ? "Change Backdrop Photo" : "Upload Any Room / Wall Opening Photo"}
                </h5>
                <p className="text-[11px] text-black/60 mt-0.5">
                  Click or drag & drop a photo of your site opening
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              {customRoomImage && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Custom photo active
                  </span>
                  <button
                    onClick={() => {
                      setCustomRoomImage(null);
                    }}
                    className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" /> Reset to Studio White
                  </button>
                </div>
              )}

              <div className="pt-2 border-t border-[#e6f7f5] flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-bold text-black/50 shrink-0">
                  Ref Code:
                </span>
                <input
                  type="text"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  className="flex-1 px-2.5 py-1 text-xs font-mono font-bold bg-[#f8fbfe] border border-[#e6f7f5] rounded-lg text-black focus:outline-none focus:border-[#009886]"
                  placeholder="PROJECT-SMC-01"
                />
              </div>
            </div>

            {/* 2. TRENDING SWATCHES CARD */}
            <div className="bg-white rounded-2xl border border-[#e6f7f5] p-4 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#009886]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    Trending Swatches
                  </span>
                </div>
                <span className="text-[11px] font-mono text-black/50 font-bold">
                  {currentProduct.finishes.length} Finishes
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {currentProduct.finishes.map((finish, fIdx) => (
                  <button
                    key={finish.id || fIdx}
                    onClick={() => handleSelectFinish(fIdx)}
                    className={cn(
                      "p-2.5 rounded-xl border text-left transition-all flex flex-col gap-2 cursor-pointer shadow-xs",
                      selectedFinishIndex === fIdx
                        ? "border-[#009886] ring-2 ring-[#009886]/20 bg-[#e6f7f5]/40 shadow-sm"
                        : "border-[#e6f7f5] hover:border-[#009886]/40 bg-white"
                    )}
                  >
                    <div
                      className="w-full h-12 rounded-lg border border-black/10 shadow-inner flex items-center justify-center relative"
                      style={{ backgroundColor: finish.hex }}
                    >
                      {selectedFinishIndex === fIdx && (
                        <span className="p-1 bg-white rounded-full shadow-md">
                          <Check className="w-3.5 h-3.5 text-[#009886]" />
                        </span>
                      )}
                    </div>

                    <div>
                      <h6 className="text-[11px] font-bold text-black truncate">
                        {finish.name}
                      </h6>
                      <span className="text-[9px] font-mono text-black/50 block truncate">
                        {finish.textureLabel || "Architectural Finish"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. SIZE, TILT & OPACITY CONTROLS */}
            <div className="bg-white rounded-2xl border border-[#e6f7f5] p-4 shadow-xs flex flex-col gap-3 text-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#009886]" />
                Dimension & Overlay Adjustments
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-14 shrink-0">
                  Size
                </span>
                <input
                  type="range"
                  min="0.4"
                  max="2.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="flex-1 accent-[#009886] h-2 bg-[#e6f7f5] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-black font-bold w-10 text-right">
                  {Math.round(scale * 100)}%
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-14 shrink-0">
                  Tilt
                </span>
                <input
                  type="range"
                  min="-35"
                  max="35"
                  step="1"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value, 10))}
                  className="flex-1 accent-[#009886] h-2 bg-[#e6f7f5] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-black font-bold w-10 text-right">
                  {rotation}°
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-14 shrink-0">
                  Opacity
                </span>
                <input
                  type="range"
                  min="0.3"
                  max="1.0"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="flex-1 accent-[#009886] h-2 bg-[#e6f7f5] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-black font-bold w-10 text-right">
                  {Math.round(opacity * 100)}%
                </span>
              </div>
            </div>

            {/* 4. ACTIONS */}
            <div className="mt-auto pt-2 flex flex-col gap-2">
              <button
                onClick={handleCaptureScreenshot}
                className="w-full py-3.5 bg-[#009886] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-white" />
                <span>
                  {screenshotCaptured ? "Saved to Device!" : "Save High-Res Snapshot"}
                </span>
              </button>

              <Link
                href={`/request-quote?product=${encodeURIComponent(currentProduct.slug)}`}
                className="w-full py-2.5 bg-white hover:bg-[#e6f7f5] text-[#009886] border border-[#009886]/30 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>
        </div>

        <DesktopQRCodeModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          product={currentProduct}
          onLaunchCamera={() => {
            setIsQRModalOpen(false);
            startCamera();
          }}
        />
      </div>
    </div>
  );
}

export default function VisualizerPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fbfe] pt-28 flex items-center justify-center">
          <div className="text-center font-sans">
            <span className="w-3 h-3 rounded-full bg-[#009886] inline-block animate-ping mb-3" />
            <p className="text-xs font-mono font-bold text-[#009886] uppercase tracking-wider">
              Loading Studio Visualizer...
            </p>
          </div>
        </div>
      }
    >
      <VisualizerContent />
    </Suspense>
  );
}

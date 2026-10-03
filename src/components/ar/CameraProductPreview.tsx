"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  RotateCcw,
  Download,
  Sliders,
  SwitchCamera,
  AlertCircle,
  Check,
  FlipHorizontal,
  Upload,
  Image as ImageIcon,
  ChevronDown,
  Info,
  Shield,
  Sparkles,
} from "lucide-react";
import { Product, ColorFinishOption } from "@/types/product";
import { PRODUCTS_DATA } from "@/data/products";
import { cn } from "@/lib/utils";

// Curated architectural room backdrops for fallback / desktop simulation
const SAMPLE_ROOMS = [
  {
    id: "villa-entrance",
    name: "Modern Villa Entrance",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "minimal-interior",
    name: "Minimalist Interior Wall",
    url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "luxury-patio",
    name: "Terrace & Patio Wall",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "living-room",
    name: "Architectural Living Space",
    url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
  },
];

interface CameraProductPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedFinish?: ColorFinishOption;
}

export function CameraProductPreview({
  isOpen,
  onClose,
  product: initialProduct,
  selectedFinish: initialFinish,
}: CameraProductPreviewProps) {
  // Active product selection (allows switching inside visualizer)
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct);
  const [activeVariantIndex, setActiveVariantIndex] = useState<number>(0);

  // Camera stream state
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraPermission, setCameraPermission] = useState<
    "prompt" | "granted" | "denied" | "unsupported"
  >("prompt");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [useFallbackRoom, setUseFallbackRoom] = useState(false);
  const [selectedSampleRoomIndex, setSelectedSampleRoomIndex] = useState(0);
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

  // UI Drawer / Control states
  const [showControls, setShowControls] = useState(true);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update product when prop changes
  useEffect(() => {
    setCurrentProduct(initialProduct);
    setActiveVariantIndex(0);
  }, [initialProduct]);

  // Determine active PNG overlay URL
  const overlayPngUrl =
    currentProduct.pngVariants && currentProduct.pngVariants.length > 0
      ? currentProduct.pngVariants[activeVariantIndex]?.pngUrl ||
        currentProduct.transparentPngUrl ||
        currentProduct.images[0]
      : currentProduct.transparentPngUrl || "/overlays/door-wood.png";

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

  // Handle modal open/close lifecycle
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      // Reset position and transforms on close
      setPosition({ x: 0, y: 0 });
      setScale(1.0);
      setRotation(0);
      setOpacity(1.0);
      setIsFlipped(false);
      setCameraPermission("prompt");
      setCameraError(null);
      setCustomRoomImage(null);
      setShowProductDropdown(false);
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, stopCamera]);

  // Request rear-facing live camera stream only after user clicks button
  const startCamera = useCallback(
    async (desiredFacingMode = facingMode) => {
      try {
        setCameraError(null);
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        if (
          typeof window === "undefined" ||
          !navigator.mediaDevices ||
          !navigator.mediaDevices.getUserMedia
        ) {
          setCameraPermission("unsupported");
          setUseFallbackRoom(true);
          setCameraError(
            "Live camera API is unavailable in this environment. Using architectural room simulator."
          );
          return;
        }

        const constraints: MediaStreamConstraints = {
          audio: false, // Never request audio
          video: {
            facingMode: { ideal: desiredFacingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        };

        const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(mediaStream);
        setCameraPermission("granted");
        setUseFallbackRoom(false);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err: any) {
        console.warn("Camera request error:", err);
        if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          setCameraPermission("denied");
          setCameraError(
            "Camera permission was denied. You can still test the door/window overlay on the room simulation below or upload a room photo."
          );
        } else if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          setCameraPermission("unsupported");
          setCameraError(
            "No camera device detected. Switched to high-resolution architectural room preview."
          );
        } else {
          setCameraPermission("denied");
          setCameraError(
            "Could not open camera. Switched to high-resolution architectural room preview."
          );
        }
        setUseFallbackRoom(true);
      }
    },
    [facingMode, stream]
  );

  // Switch between Rear and Front cameras
  const toggleFacingMode = () => {
    const nextMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Reset overlay transformations
  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1.0);
    setRotation(0);
    setOpacity(1.0);
    setIsFlipped(false);
  };

  // Drag interaction handlers
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

  // Pinch-to-zoom for touch devices
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
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
    }
  };

  // Mouse wheel zoom on overlay
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.05 : 0.05;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.4), 2.5));
  };

  // Custom user room image upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomRoomImage(event.target.result as string);
          setUseFallbackRoom(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Composite snapshot photo download
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

      // 1. Draw camera video frame or backdrop image
      if (videoRef.current && stream && !useFallbackRoom) {
        ctx.drawImage(videoRef.current, 0, 0, width, height);
      } else {
        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.src =
          customRoomImage || SAMPLE_ROOMS[selectedSampleRoomIndex].url;

        await new Promise((resolve) => {
          bgImg.onload = () => resolve(true);
          bgImg.onerror = () => resolve(false);
        });
        ctx.drawImage(bgImg, 0, 0, width, height);
      }

      // 2. Draw product PNG overlay
      const overlayImg = new window.Image();
      overlayImg.crossOrigin = "anonymous";
      overlayImg.src = overlayPngUrl;

      await new Promise((resolve) => {
        overlayImg.onload = () => resolve(true);
        overlayImg.onerror = () => resolve(false);
      });

      const centerX = width / 2 + position.x;
      const centerY = height / 2 + position.y;
      const baseWidth = Math.min(width * 0.55, 360) * scale;
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

      // 3. Draw Watermark & Product Specs Card
      ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
      ctx.fillRect(16, height - 76, Math.min(width - 32, 420), 60);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px system-ui, sans-serif";
      ctx.fillText(`SMC FABRICATION • ${currentProduct.name}`, 28, height - 52);

      ctx.fillStyle = "#e6f4fd";
      ctx.font = "11px monospace";
      ctx.fillText(
        `${currentProduct.sku} | ${currentProduct.dimensions.standardWidthMm}×${currentProduct.dimensions.standardHeightMm}mm | 2D Room Visualizer`,
        28,
        height - 34
      );

      // Trigger automatic PNG download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `SMC-${currentProduct.slug}-room-visualizer.png`;
      a.click();

      setScreenshotCaptured(true);
      setTimeout(() => setScreenshotCaptured(false), 2500);
    } catch (err) {
      console.error("Screenshot capture failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-white flex flex-col select-none overflow-hidden touch-none font-sans">
        {/* Permission Request Prompt Screen */}
        {cameraPermission === "prompt" ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 bg-[#e6f4fd] border-2 border-[#0070bc] rounded-2xl flex items-center justify-center text-[#0070bc] mb-6 shadow-md">
              <Camera className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0070bc]">
              Room Camera Visualizer
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-black mt-2">
              View {currentProduct.name} In Your Room
            </h3>

            <p className="text-xs sm:text-sm text-black/75 mt-3 leading-relaxed">
              Superimpose a high-resolution, transparent 2D architectural overlay
              of this {currentProduct.categoryName.toLowerCase()} directly onto your
              camera feed.
            </p>

            {/* Privacy & Feature Guarantee Points */}
            <div className="my-6 p-4 bg-[#e6f4fd] border border-[#0070bc]/30 rounded-xl text-xs text-black/85 text-left space-y-2.5 w-full font-medium shadow-xs">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#0070bc] shrink-0 mt-0.5" />
                <span>
                  <strong>100% Private & Local:</strong> Camera runs strictly in
                  your browser. No video or audio is ever recorded or uploaded.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sliders className="w-4 h-4 text-[#0070bc] shrink-0 mt-0.5" />
                <span>
                  <strong>Interactive Placement:</strong> Drag, resize, tilt, and
                  flip the door/window to test fitting in your wall opening.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#0070bc] shrink-0 mt-0.5" />
                <span>
                  <strong>2D Reference Overlay:</strong> Manually positioned
                  overlay for architectural visual reference.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => startCamera("environment")}
                className="flex-1 py-4 px-6 bg-[#0070bc] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4 text-white" />
                <span>Allow Camera & Launch</span>
              </button>

              <button
                onClick={() => {
                  setUseFallbackRoom(true);
                  setCameraPermission("granted");
                }}
                className="py-4 px-6 bg-[#e6f4fd] hover:bg-[#0070bc] hover:text-white text-black text-xs uppercase font-bold tracking-[0.18em] rounded-xl border border-[#0070bc]/30 transition-colors"
              >
                <span>Use Sample Room</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="mt-6 text-xs text-black/60 hover:text-black uppercase tracking-wider font-bold py-2 px-4"
            >
              Cancel & Return
            </button>
          </div>
        ) : (
          /* Live Camera / Room Visualizer Viewport */
          <div
            ref={containerRef}
            className="relative flex-1 w-full h-full bg-black overflow-hidden"
            onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
            onMouseUp={handlePointerUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handlePointerUp}
          >
            {/* 1. Live Camera Stream Video */}
            {!useFallbackRoom ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            ) : (
              /* 2. Fallback Architectural Room Backdrop */
              <div className="absolute inset-0 w-full h-full bg-neutral-900">
                {customRoomImage ? (
                  <img
                    src={customRoomImage}
                    alt="Custom Room"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <Image
                    src={SAMPLE_ROOMS[selectedSampleRoomIndex].url}
                    alt={SAMPLE_ROOMS[selectedSampleRoomIndex].name}
                    fill
                    sizes="100vw"
                    className="object-cover pointer-events-none"
                  />
                )}

                {/* Sample Room Switcher Floating Bar */}
                <div className="absolute top-20 left-4 right-4 sm:right-auto bg-black/75 backdrop-blur-md border border-white/20 p-2 rounded-xl text-xs text-white flex items-center gap-2 z-20 shadow-lg overflow-x-auto">
                  <span className="text-[10px] uppercase font-mono font-bold text-[#e6f4fd] px-2 whitespace-nowrap">
                    Backdrop:
                  </span>
                  {SAMPLE_ROOMS.map((room, idx) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedSampleRoomIndex(idx);
                        setCustomRoomImage(null);
                      }}
                      className={cn(
                        "px-2.5 py-1 text-[11px] rounded-lg transition-colors whitespace-nowrap",
                        selectedSampleRoomIndex === idx && !customRoomImage
                          ? "bg-[#0070bc] text-white font-bold"
                          : "bg-white/10 hover:bg-white/20 text-white/80"
                      )}
                    >
                      {room.name}
                    </button>
                  ))}

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "px-2.5 py-1 text-[11px] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5",
                      customRoomImage
                        ? "bg-[#0070bc] text-white font-bold"
                        : "bg-white/10 hover:bg-white/20 text-white/80"
                    )}
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload Room</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </div>
            )}

            {/* Subtle Alignment Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#0070bc33_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-40" />

            {/* 2D Interactive Placement Info Banner */}
            {showInfoBanner && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-xl pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-xl text-white text-[11px] flex items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#e6f4fd] shrink-0" />
                    <span>
                      <strong>2D Interactive Visualizer:</strong> Drag, resize, and
                      align overlay with your opening.
                    </span>
                  </div>
                  <button
                    onClick={() => setShowInfoBanner(false)}
                    className="text-white/60 hover:text-white p-1"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* TOP HEADER CONTROLS */}
            <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-30 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent">
              {/* Left: Close button + Product info chip */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="p-2.5 bg-white/95 hover:bg-white text-black rounded-xl border border-[#e6f4fd] transition-colors shadow-md"
                  aria-label="Close camera visualizer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Product Switcher Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                    className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#e6f4fd] shadow-md flex items-center gap-2 text-left"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-black truncate max-w-[150px] sm:max-w-xs">
                        {currentProduct.name}
                      </h4>
                      <span className="text-[10px] text-[#0070bc] font-mono font-bold block">
                        {currentProduct.sku} • {currentProduct.dimensions.standardWidthMm}×{currentProduct.dimensions.standardHeightMm}mm
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-black/60 shrink-0" />
                  </button>

                  {/* Product Switcher Dropdown */}
                  {showProductDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-72 max-h-80 bg-white border-2 border-[#e6f4fd] rounded-xl shadow-2xl overflow-y-auto z-40 p-1.5">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-black/50 tracking-wider">
                        Switch Product Overlay
                      </div>
                      {PRODUCTS_DATA.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setCurrentProduct(p);
                            setActiveVariantIndex(0);
                            setShowProductDropdown(false);
                          }}
                          className={cn(
                            "w-full text-left p-2.5 rounded-lg text-xs transition-colors flex items-center justify-between",
                            p.id === currentProduct.id
                              ? "bg-[#e6f4fd] text-[#0070bc] font-bold"
                              : "hover:bg-black/5 text-black"
                          )}
                        >
                          <span className="truncate">{p.name}</span>
                          {p.id === currentProduct.id && (
                            <Check className="w-3.5 h-3.5 text-[#0070bc] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Quick Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Switch Camera Button (if device has front/back) */}
                {hasMultipleCameras && !useFallbackRoom && (
                  <button
                    onClick={toggleFacingMode}
                    className="p-2.5 bg-white/95 hover:bg-white text-black rounded-xl border border-[#e6f4fd] transition-colors shadow-md"
                    title="Switch Rear/Front Camera"
                  >
                    <SwitchCamera className="w-4 h-4 text-[#0070bc]" />
                  </button>
                )}

                {/* Switch to Backdrop Simulation / Camera */}
                <button
                  onClick={() => {
                    if (useFallbackRoom) {
                      startCamera();
                    } else {
                      stopCamera();
                      setUseFallbackRoom(true);
                    }
                  }}
                  className="p-2.5 bg-white/95 hover:bg-white text-black rounded-xl border border-[#e6f4fd] transition-colors shadow-md"
                  title={
                    useFallbackRoom ? "Switch to Live Camera" : "Switch to Room Backdrops"
                  }
                >
                  {useFallbackRoom ? (
                    <Camera className="w-4 h-4 text-[#0070bc]" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-[#0070bc]" />
                  )}
                </button>

                {/* Flip Left/Right Handing */}
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={cn(
                    "p-2.5 rounded-xl border transition-colors shadow-md",
                    isFlipped
                      ? "bg-[#0070bc] text-white border-[#0070bc]"
                      : "bg-white/95 hover:bg-white text-black border-[#e6f4fd]"
                  )}
                  title="Flip Opening Direction"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>

                {/* Reset Transform */}
                <button
                  onClick={handleReset}
                  className="p-2.5 bg-white/95 hover:bg-white text-black rounded-xl border border-[#e6f4fd] transition-colors shadow-md"
                  title="Reset Position & Scale"
                >
                  <RotateCcw className="w-4 h-4 text-[#0070bc]" />
                </button>

                {/* Toggle Controls Drawer */}
                <button
                  onClick={() => setShowControls(!showControls)}
                  className={cn(
                    "p-2.5 rounded-xl border transition-colors shadow-md",
                    showControls
                      ? "bg-[#0070bc] text-white border-[#0070bc]"
                      : "bg-white/95 hover:bg-white text-black border-[#e6f4fd]"
                  )}
                  title="Toggle Controls Drawer"
                >
                  <Sliders className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DRAGGABLE, RESIZABLE, AND ROTATABLE 2D TRANSPARENT PNG OVERLAY */}
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 transition-opacity duration-150 group"
            >
              {/* Product Transparent PNG */}
              <div className="relative w-64 sm:w-80 md:w-96 aspect-[1/2] max-h-[72vh] flex items-center justify-center pointer-events-auto">
                <img
                  src={overlayPngUrl}
                  alt={currentProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_18px_30px_rgba(0,0,0,0.65)]"
                  draggable={false}
                />

                {/* Drag bounding box indicator */}
                {isDragging && (
                  <div className="absolute inset-0 border-2 border-dashed border-[#0070bc] rounded-xl pointer-events-none" />
                )}
              </div>
            </div>

            {/* Floating helper chip */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-4 py-1.5 bg-black/75 backdrop-blur-md rounded-full border border-white/20 text-[10px] uppercase font-mono font-bold tracking-wider text-white shadow-lg whitespace-nowrap">
                Drag To Reposition • Pinch / Sliders To Scale
              </div>
            </div>

            {/* BOTTOM ADJUSTMENT DRAWER & ACTIONS */}
            {showControls && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 z-30 p-3 sm:p-4 pb-safe bg-white/95 border-t-2 border-[#e6f4fd] shadow-2xl flex flex-col gap-2.5"
              >
                {/* Sliders Grid: Size, Tilt, Opacity */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-[#e6f4fd] p-2.5 sm:p-3 rounded-xl border border-[#e6f4fd] text-xs">
                  {/* Size Scale Slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono text-black font-bold w-12 shrink-0">
                      Size
                    </span>
                    <input
                      type="range"
                      min="0.4"
                      max="2.5"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="flex-1 accent-[#0070bc] h-2 bg-white rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-black font-bold w-12 text-right">
                      {Math.round(scale * 100)}%
                    </span>
                  </div>

                  {/* Tilt / Rotation Slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono text-black font-bold w-12 shrink-0">
                      Tilt
                    </span>
                    <input
                      type="range"
                      min="-35"
                      max="35"
                      step="1"
                      value={rotation}
                      onChange={(e) =>
                        setRotation(parseInt(e.target.value, 10))
                      }
                      className="flex-1 accent-[#0070bc] h-2 bg-white rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-black font-bold w-12 text-right">
                      {rotation}°
                    </span>
                  </div>

                  {/* Opacity Slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono text-black font-bold w-12 shrink-0">
                      Opacity
                    </span>
                    <input
                      type="range"
                      min="0.3"
                      max="1.0"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => setOpacity(parseFloat(e.target.value))}
                      className="flex-1 accent-[#0070bc] h-2 bg-white rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-black font-bold w-12 text-right">
                      {Math.round(opacity * 100)}%
                    </span>
                  </div>
                </div>

                {/* Finish Variants & Snapshot Action Row */}
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  {/* Finish Variant Selector */}
                  {currentProduct.pngVariants &&
                  currentProduct.pngVariants.length > 1 ? (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full sm:max-w-md">
                      <span className="text-[10px] uppercase font-mono font-bold text-black/60 shrink-0 mr-1">
                        Finish:
                      </span>
                      {currentProduct.pngVariants.map((variant, vIdx) => (
                        <button
                          key={vIdx}
                          onClick={() => setActiveVariantIndex(vIdx)}
                          className={cn(
                            "px-3 py-1.5 text-[11px] uppercase tracking-wider rounded-lg border transition-colors whitespace-nowrap",
                            activeVariantIndex === vIdx
                              ? "bg-[#0070bc] text-white font-bold border-[#0070bc]"
                              : "bg-[#e6f4fd] text-black border-[#e6f4fd] hover:border-[#0070bc]"
                          )}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] text-black/70 font-semibold hidden sm:block">
                      Architectural 2D Room Placement Visualizer
                    </div>
                  )}

                  {/* Capture Snapshot Action Button */}
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={handleCaptureScreenshot}
                      className="px-5 py-2.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase font-bold tracking-wider rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>
                        {screenshotCaptured ? "Saved to Device!" : "Save Snapshot"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Footer Disclaimers */}
                <div className="flex items-center justify-between text-[9px] text-black/60 pt-1 border-t border-[#e6f4fd]">
                  <span>
                    * 2D visual overlay. Final fabrication requires on-site
                    laser survey verification.
                  </span>
                  <span>SMC FABRICATION Architectural Systems</span>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}

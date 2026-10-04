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
  Ruler,
  MoveHorizontal,
  MoveVertical,
  Scaling,
  Maximize2,
} from "lucide-react";
import { Product, ColorFinishOption } from "@/types/product";
import { PRODUCTS_DATA } from "@/data/products";
import { cn } from "@/lib/utils";
import { DesktopQRCodeModal } from "@/components/ar/DesktopQRCodeModal";
import { QuickQuoteModal } from "@/components/enquiry/QuickQuoteModal";

const WIDTH_OPTIONS = ["4.5 ft", "6 ft", "6.5 ft", "7.5 ft", "8.5 ft", "10 ft", "12 ft"];
const HEIGHT_OPTIONS = [
  { label: "7.0 ft (Standard)", value: "7.0 ft" },
  { label: "7.5 ft", value: "7.5 ft" },
  { label: "8.0 ft (Full Lintel)", value: "8.0 ft" },
  { label: "9.5 ft (Ceiling Lofts)", value: "9.5 ft" },
];

function getProductColorFilter(
  finish?: { id?: string; name?: string; hex?: string } | string,
  lightingMode?: "day" | "warm" | "night"
): string {
  const baseLight =
    lightingMode === "night"
      ? "brightness(0.85) contrast(1.1) "
      : lightingMode === "warm"
      ? "sepia(0.12) "
      : "";

  const hex = typeof finish === "string" ? finish : finish?.hex || "";
  const id = typeof finish === "object" ? finish?.id || "" : "";
  const lower = hex.toLowerCase();

  // 1. Golden Oak
  if (id === "fin-golden-oak" || lower === "#b8783b") {
    return `${baseLight}sepia(0.85) saturate(2.2) brightness(0.82) contrast(1.2) hue-rotate(-12deg)`;
  }

  // 2. Rosewood
  if (id === "fin-rosewood" || lower === "#4d231a") {
    return `${baseLight}sepia(0.85) saturate(2.4) brightness(0.4) contrast(1.4) hue-rotate(-25deg)`;
  }

  // 3. Mahogany
  if (id === "fin-mahogany" || lower === "#3f2015") {
    return `${baseLight}sepia(0.9) saturate(2.1) brightness(0.35) contrast(1.45) hue-rotate(-20deg)`;
  }

  // 4. Irish Oak
  if (id === "fin-irish-oak" || lower === "#cda061") {
    return `${baseLight}sepia(0.75) saturate(1.9) brightness(0.92) contrast(1.15) hue-rotate(-8deg)`;
  }

  // 5. Black
  if (id === "fin-black" || lower === "#141414" || lower === "#000000" || lower === "#000" || lower === "#1a1a1a") {
    return `${baseLight}brightness(0.25) contrast(1.6)`;
  }

  // 6. Dark Green
  if (id === "fin-dark-green" || lower === "#1a4233") {
    return `${baseLight}sepia(0.55) hue-rotate(95deg) brightness(0.42) contrast(1.35) saturate(2.2)`;
  }

  // 7. Cream
  if (id === "fin-cream" || lower === "#ece6d8") {
    return `${baseLight}sepia(0.25) saturate(1.15) brightness(1.02) contrast(0.98)`;
  }

  // 8. White Ash
  if (id === "fin-white-ash" || lower === "#ffffff" || lower === "#fff") {
    return `${baseLight}brightness(1.05) contrast(1.02)`;
  }

  // 9. Antracite Grey
  if (id === "fin-anthracite" || lower === "#373e43") {
    return `${baseLight}brightness(0.42) contrast(1.3) grayscale(0.7)`;
  }

  // 10. Chartwell Green
  if (id === "fin-chartwell-green" || lower === "#94ab9b") {
    return `${baseLight}sepia(0.3) hue-rotate(85deg) brightness(0.95) saturate(1.25) contrast(1.05)`;
  }

  // Fallback for custom or emerald green
  if (lower === "#009886" || lower.includes("9886")) {
    return `${baseLight}sepia(0.2) saturate(1.8) brightness(0.88) contrast(1.1)`;
  }

  if (
    lower.startsWith("#8") ||
    lower.startsWith("#5") ||
    lower.startsWith("#6") ||
    lower.startsWith("#4") ||
    lower.startsWith("#7")
  ) {
    return `${baseLight}sepia(0.75) saturate(1.4) brightness(0.65) contrast(1.15)`;
  }

  return baseLight || "none";
}

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

  // Dimensions & Aperture Presets
  const [selectedWidth, setSelectedWidth] = useState<string>("6.5 ft");
  const [selectedHeight, setSelectedHeight] = useState<string>("7.5 ft");
  const [hasTopLoft, setHasTopLoft] = useState<boolean>(false);

  // Overlay transformation state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1.0); // Uniform zoom
  const [scaleX, setScaleX] = useState<number>(1.0); // Width stretch (Horizontal)
  const [scaleY, setScaleY] = useState<number>(1.0); // Height stretch (Vertical)
  const [rotation, setRotation] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(1.0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showHandles, setShowHandles] = useState<boolean>(true);
  const [activeHandle, setActiveHandle] = useState<string | null>(null);

  // Dragging & touch gesture state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialPinchDist, setInitialPinchDist] = useState<number | null>(null);
  const [initialPinchScale, setInitialPinchScale] = useState<number>(1.0);
  const handleStartRef = useRef<{
    clientX: number;
    clientY: number;
    startScaleX: number;
    startScaleY: number;
    startScale: number;
  } | null>(null);
  const initialPinchXRef = useRef<{ dx: number; scaleX: number } | null>(null);
  const initialPinchYRef = useRef<{ dy: number; scaleY: number } | null>(null);

  // UI state
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [screenshotCaptured, setScreenshotCaptured] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [canvasSnapshotUrl, setCanvasSnapshotUrl] = useState<string>("");

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

  // Initialize live camera with reliable desktop and mobile fallback
  const startCamera = useCallback(async () => {
    setIsCameraLoading(true);
    stopCamera();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setIsCameraLoading(false);
      setUseFallbackRoom(true);
      return;
    }

    try {
      let mediaStream: MediaStream;
      try {
        // First try with preferred facing mode
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });
      } catch {
        // Fallback to generic video for desktop webcams without facingMode
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      setStream(mediaStream);
      setUseFallbackRoom(false);
      setCustomRoomImage(null);

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

  // Always sync video element with stream when stream or fallback mode changes
  useEffect(() => {
    if (videoRef.current && stream && !useFallbackRoom) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((err) => {
        console.warn("Video play error on sync:", err);
      });
    }
  }, [stream, useFallbackRoom]);

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
    setScaleX(1.0);
    setScaleY(1.0);
    setRotation(0);
    setOpacity(1.0);
    setIsFlipped(false);
  };

  const startHandleDrag = (handle: string, clientX: number, clientY: number) => {
    setActiveHandle(handle);
    handleStartRef.current = {
      clientX,
      clientY,
      startScaleX: scaleX,
      startScaleY: scaleY,
      startScale: scale,
    };
  };

  // Window pointer listener during handle drag (supports both desktop mouse & mobile touch)
  useEffect(() => {
    if (!activeHandle) return;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!handleStartRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const dx = clientX - handleStartRef.current.clientX;
      const dy = clientY - handleStartRef.current.clientY;
      const SENSITIVITY = 0.007;

      if (activeHandle === "right") {
        const next = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX + dx * SENSITIVITY));
        setScaleX(parseFloat(next.toFixed(2)));
      } else if (activeHandle === "left") {
        const next = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX - dx * SENSITIVITY));
        setScaleX(parseFloat(next.toFixed(2)));
      } else if (activeHandle === "bottom") {
        const next = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY + dy * SENSITIVITY));
        setScaleY(parseFloat(next.toFixed(2)));
      } else if (activeHandle === "top") {
        const next = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY - dy * SENSITIVITY));
        setScaleY(parseFloat(next.toFixed(2)));
      } else if (activeHandle === "bottom-right") {
        const nextX = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX + dx * SENSITIVITY));
        const nextY = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY + dy * SENSITIVITY));
        setScaleX(parseFloat(nextX.toFixed(2)));
        setScaleY(parseFloat(nextY.toFixed(2)));
      } else if (activeHandle === "bottom-left") {
        const nextX = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX - dx * SENSITIVITY));
        const nextY = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY + dy * SENSITIVITY));
        setScaleX(parseFloat(nextX.toFixed(2)));
        setScaleY(parseFloat(nextY.toFixed(2)));
      } else if (activeHandle === "top-right") {
        const nextX = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX + dx * SENSITIVITY));
        const nextY = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY - dy * SENSITIVITY));
        setScaleX(parseFloat(nextX.toFixed(2)));
        setScaleY(parseFloat(nextY.toFixed(2)));
      } else if (activeHandle === "top-left") {
        const nextX = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleX - dx * SENSITIVITY));
        const nextY = Math.max(0.35, Math.min(3.5, handleStartRef.current.startScaleY - dy * SENSITIVITY));
        setScaleX(parseFloat(nextX.toFixed(2)));
        setScaleY(parseFloat(nextY.toFixed(2)));
      }
    };

    const onPointerUp = () => {
      setActiveHandle(null);
      handleStartRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [activeHandle]);

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
    initialPinchXRef.current = null;
    initialPinchYRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dx = Math.abs(touch1.clientX - touch2.clientX);
      const dy = Math.abs(touch1.clientY - touch2.clientY);
      const dist = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );

      if (initialPinchDist === null) {
        setInitialPinchDist(dist);
        setInitialPinchScale(scale);
        initialPinchXRef.current = { dx, scaleX };
        initialPinchYRef.current = { dy, scaleY };
      } else {
        if (initialPinchXRef.current && initialPinchXRef.current.dx > 30) {
          const factorX = dx / initialPinchXRef.current.dx;
          setScaleX(parseFloat(Math.min(Math.max(initialPinchXRef.current.scaleX * factorX, 0.4), 3.5).toFixed(2)));
        }
        if (initialPinchYRef.current && initialPinchYRef.current.dy > 30) {
          const factorY = dy / initialPinchYRef.current.dy;
          setScaleY(parseFloat(Math.min(Math.max(initialPinchYRef.current.scaleY * factorY, 0.4), 3.5).toFixed(2)));
        }
        const factor = dist / initialPinchDist;
        const newScale = Math.min(Math.max(initialPinchScale * factor, 0.4), 2.5);
        setScale(parseFloat(newScale.toFixed(2)));
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

  const generateCanvasDataUrl = async (): Promise<string | null> => {
    const container = containerRef.current;
    if (!container) return null;

    try {
      const canvas = document.createElement("canvas");
      const scaleFactor = 1.5;
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width * scaleFactor;
      canvas.height = height * scaleFactor;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.scale(scaleFactor, scaleFactor);

      // Helper to draw background with true object-cover aspect fitting
      const drawCover = (img: HTMLImageElement | HTMLVideoElement) => {
        const imgW = "videoWidth" in img ? img.videoWidth : img.naturalWidth || img.width;
        const imgH = "videoHeight" in img ? img.videoHeight : img.naturalHeight || img.height;
        if (!imgW || !imgH) {
          ctx.drawImage(img, 0, 0, width, height);
          return;
        }
        const imgAspect = imgW / imgH;
        const containerAspect = width / height;
        let sx = 0;
        let sy = 0;
        let sWidth = imgW;
        let sHeight = imgH;

        if (imgAspect > containerAspect) {
          sWidth = imgH * containerAspect;
          sx = (imgW - sWidth) / 2;
        } else {
          sHeight = imgW / containerAspect;
          sy = (imgH - sHeight) / 2;
        }
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
      };

      // 1. Draw Background
      if (videoRef.current && stream && !useFallbackRoom) {
        drawCover(videoRef.current);
      } else if (customRoomImage) {
        const bgImg = new window.Image();
        bgImg.crossOrigin = "anonymous";
        bgImg.src = customRoomImage;

        await new Promise((resolve) => {
          bgImg.onload = () => resolve(true);
          bgImg.onerror = () => resolve(false);
        });
        drawCover(bgImg);
      } else {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        if (lightingMode === "night") {
          grad.addColorStop(0, "#0b0f19");
          grad.addColorStop(1, "#05070c");
        } else if (lightingMode === "warm") {
          grad.addColorStop(0, "#faf5ee");
          grad.addColorStop(1, "#efe5d5");
        } else {
          grad.addColorStop(0, "#f8fbfe");
          grad.addColorStop(1, "#eef5fa");
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Floor ground shadow
        ctx.fillStyle = lightingMode === "night" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)";
        ctx.fillRect(0, height * 0.74, width, height * 0.26);
      }

      // 2. Load and draw stretched product PNG overlay
      const overlayImg = new window.Image();
      overlayImg.crossOrigin = "anonymous";
      overlayImg.src = overlayPngUrl;

      await new Promise((resolve) => {
        overlayImg.onload = () => resolve(true);
        overlayImg.onerror = () => resolve(false);
      });

      const imgEl = overlayRef.current?.querySelector("img");
      const baseW = imgEl && imgEl.clientWidth > 0 ? imgEl.clientWidth : 240;
      const baseH = imgEl && imgEl.clientHeight > 0 ? imgEl.clientHeight : 500;

      const centerX = width / 2 + position.x;
      const centerY = height / 2 + position.y;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(scale * scaleX * (isFlipped ? -1 : 1), scale * scaleY);
      ctx.globalAlpha = opacity;

      // Drop shadow under frame
      ctx.shadowColor = lightingMode === "night" ? "rgba(0, 0, 0, 0.85)" : "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 15;

      // Color matrix filter for selected finish
      const filterStr = getProductColorFilter(currentProduct.finishes?.[selectedFinishIndex], lightingMode);
      if (filterStr && filterStr !== "none") {
        ctx.filter = filterStr;
      }

      ctx.drawImage(overlayImg, -baseW / 2, -baseH / 2, baseW, baseH);

      // Apply finish color blend overlay
      const activeFinish = currentProduct.finishes?.[selectedFinishIndex];
      if (activeFinish && activeFinish.hex !== "#ffffff") {
        try {
          const maskCanvas = document.createElement("canvas");
          maskCanvas.width = baseW;
          maskCanvas.height = baseH;
          const mCtx = maskCanvas.getContext("2d");
          if (mCtx) {
            mCtx.drawImage(overlayImg, 0, 0, baseW, baseH);
            mCtx.globalCompositeOperation = "source-in";
            mCtx.fillStyle = activeFinish.hex;
            mCtx.fillRect(0, 0, baseW, baseH);

            ctx.filter = "none";
            ctx.shadowColor = "transparent";
            ctx.globalCompositeOperation = "multiply";
            ctx.globalAlpha =
              activeFinish.hex === "#141414" || activeFinish.hex === "#000000"
                ? 0.92
                : 0.68;
            ctx.drawImage(maskCanvas, -baseW / 2, -baseH / 2, baseW, baseH);
          }
        } catch (e) {
          console.warn("Mask canvas blend error", e);
        }
      }

      ctx.restore();
      return canvas.toDataURL("image/png");
    } catch (err) {
      console.error("Canvas export failed", err);
      return null;
    }
  };

  const handleCaptureScreenshot = async () => {
    try {
      const dataUrl = await generateCanvasDataUrl();
      if (dataUrl) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `SMC-${currentProduct.slug}.png`;
        a.click();
        setScreenshotCaptured(true);
        setTimeout(() => setScreenshotCaptured(false), 2500);
      }
    } catch (err) {
      console.error("Screenshot capture failed", err);
    }
  };

  const handleOpenQuoteModal = async () => {
    const liveSnapshot = await generateCanvasDataUrl();
    setCanvasSnapshotUrl(liveSnapshot || overlayPngUrl);
    setIsQuoteModalOpen(true);
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
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                useFallbackRoom ? "opacity-0 pointer-events-none" : "opacity-100"
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

            {/* Canvas Top Bar: Camera Mode, Dimension Pills, Studio Light Switch */}
            <div className="absolute top-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
                {/* Live Camera / Studio Mode Toggle Button */}
                {stream && !useFallbackRoom ? (
                  <button
                    onClick={() => {
                      setUseFallbackRoom(true);
                      stopCamera();
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl border border-emerald-500 shadow-sm flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
                    title="Click to Switch back to Studio Backdrop"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                    <span>Live Camera Active</span>
                    <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">
                      Switch to Studio
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => startCamera()}
                    disabled={isCameraLoading}
                    className="px-3.5 py-1.5 bg-white/95 hover:bg-[#e6f7f5] text-[#009886] backdrop-blur-md rounded-xl border border-[#009886]/40 shadow-xs flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
                    title="Click to turn on Live Desktop Webcam / Phone Camera"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#009886]" />
                    <span>{isCameraLoading ? "Starting Camera..." : "Turn ON Live Camera"}</span>
                  </button>
                )}
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
                onClick={() => {
                  if (stream && !useFallbackRoom) {
                    setUseFallbackRoom(true);
                    stopCamera();
                  } else {
                    startCamera();
                  }
                }}
                className={cn(
                  "p-2 rounded-lg transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1.5",
                  stream && !useFallbackRoom ? "bg-emerald-600 text-white" : "hover:bg-black/5 text-black"
                )}
                title={stream && !useFallbackRoom ? "Stop Camera (Switch to Studio)" : "Start Camera"}
              >
                <Camera className="w-4 h-4" />
                <span className="text-[11px] hidden sm:inline">
                  {stream && !useFallbackRoom ? "Live Cam" : "Camera"}
                </span>
              </button>

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

            {/* DRAGGABLE, RESIZABLE, ROTATABLE & STRETCHABLE OVERLAY */}
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
                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${
                  scale * scaleX * (isFlipped ? -1 : 1)
                }, ${scale * scaleY})`,
                opacity: opacity,
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing z-20 transition-opacity duration-150 select-none"
            >
              <div className="relative w-64 sm:w-80 md:w-96 aspect-[1/2] max-h-[72vh] flex items-center justify-center pointer-events-auto">
                {/* 1. Base Product Image Layer with Dynamic Filter */}
                <img
                  src={overlayPngUrl}
                  alt={currentProduct.name}
                  style={{
                    filter: getProductColorFilter(
                      currentProduct.finishes?.[selectedFinishIndex],
                      lightingMode
                    ),
                  }}
                  className={cn(
                    "w-full h-full object-fill filter transition-all duration-300",
                    lightingMode === "night"
                      ? "drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                      : "drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]"
                  )}
                  draggable={false}
                />

                {/* 2. Color Mask Layer (Applies Swatch Tint to Frame) */}
                {currentProduct.finishes?.[selectedFinishIndex] &&
                  currentProduct.finishes[selectedFinishIndex].hex !== "#ffffff" && (
                    <div
                      style={{
                        backgroundColor: currentProduct.finishes[selectedFinishIndex].hex,
                        maskImage: `url(${overlayPngUrl})`,
                        WebkitMaskImage: `url(${overlayPngUrl})`,
                        maskSize: "100% 100%",
                        WebkitMaskSize: "100% 100%",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        mixBlendMode: "multiply",
                        opacity:
                          currentProduct.finishes[selectedFinishIndex].hex === "#000000"
                            ? 0.92
                            : currentProduct.finishes[selectedFinishIndex].hex === "#009886"
                            ? 0.78
                            : 0.65,
                      }}
                      className="absolute inset-0 pointer-events-none transition-all duration-300"
                    />
                  )}

                {/* 3. Deep Color Burn Layer for Jet Black finish */}
                {currentProduct.finishes?.[selectedFinishIndex] &&
                  (currentProduct.finishes[selectedFinishIndex].hex === "#000000" ||
                    currentProduct.finishes[selectedFinishIndex].hex === "#1a1a1a") && (
                    <div
                      style={{
                        backgroundColor: "#0d0d0d",
                        maskImage: `url(${overlayPngUrl})`,
                        WebkitMaskImage: `url(${overlayPngUrl})`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                        mixBlendMode: "color-burn",
                        opacity: 0.7,
                      }}
                      className="absolute inset-0 pointer-events-none transition-all duration-300"
                    />
                  )}

                {/* Active Color Swatch Floating Label */}
                {currentProduct.finishes?.[selectedFinishIndex] && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-mono font-bold text-black flex items-center gap-1.5 shadow-md border border-[#e6f7f5] pointer-events-none whitespace-nowrap">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                      style={{
                        backgroundColor: currentProduct.finishes[selectedFinishIndex].hex,
                      }}
                    />
                    <span>{currentProduct.finishes[selectedFinishIndex].name}</span>
                  </div>
                )}

                {/* INTERACTIVE STRETCH / RESIZE HANDLES (DIRECT ON CANVAS FOR DESKTOP & MOBILE) */}
                {showHandles && (
                  <>
                    {/* Bounding Box Outline */}
                    <div className="absolute -inset-2 border-2 border-dashed border-[#009886]/60 rounded-2xl pointer-events-none shadow-sm" />

                    {/* TOP HANDLE (↕ Height Stretch Up) */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("top", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("top", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white hover:bg-[#009886] text-[#009886] hover:text-white border-2 border-[#009886] rounded-full shadow-lg flex items-center gap-0.5 cursor-ns-resize z-40 touch-none transition-colors"
                      title="Drag to Stretch Height Up"
                    >
                      <MoveVertical className="w-3 h-3" />
                      <span className="text-[9px] font-mono font-bold leading-none">↕</span>
                    </div>

                    {/* BOTTOM HANDLE (↕ Height Stretch Down) */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("bottom", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("bottom", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white hover:bg-[#009886] text-[#009886] hover:text-white border-2 border-[#009886] rounded-full shadow-lg flex items-center gap-0.5 cursor-ns-resize z-40 touch-none transition-colors"
                      title="Drag to Stretch Height Down"
                    >
                      <MoveVertical className="w-3 h-3" />
                      <span className="text-[9px] font-mono font-bold leading-none">↕</span>
                    </div>

                    {/* LEFT HANDLE (↔ Width Stretch Left) */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("left", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("left", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute top-1/2 -left-3.5 -translate-y-1/2 py-2 px-1 bg-white hover:bg-[#009886] text-[#009886] hover:text-white border-2 border-[#009886] rounded-full shadow-lg flex items-center justify-center cursor-ew-resize z-40 touch-none transition-colors"
                      title="Drag to Stretch Width Left"
                    >
                      <MoveHorizontal className="w-3 h-3" />
                    </div>

                    {/* RIGHT HANDLE (↔ Width Stretch Right) */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("right", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("right", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute top-1/2 -right-3.5 -translate-y-1/2 py-2 px-1 bg-white hover:bg-[#009886] text-[#009886] hover:text-white border-2 border-[#009886] rounded-full shadow-lg flex items-center justify-center cursor-ew-resize z-40 touch-none transition-colors"
                      title="Drag to Stretch Width Right"
                    >
                      <MoveHorizontal className="w-3 h-3" />
                    </div>

                    {/* 4 CORNER HANDLES */}
                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("top-left", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("top-left", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -top-2.5 -left-2.5 w-5 h-5 bg-[#009886] hover:bg-black border-2 border-white rounded-full shadow-lg cursor-nwse-resize z-40 touch-none"
                      title="Drag to Stretch Corner"
                    />

                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("top-right", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("top-right", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#009886] hover:bg-black border-2 border-white rounded-full shadow-lg cursor-nesw-resize z-40 touch-none"
                      title="Drag to Stretch Corner"
                    />

                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("bottom-left", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("bottom-left", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -bottom-2.5 -left-2.5 w-5 h-5 bg-[#009886] hover:bg-black border-2 border-white rounded-full shadow-lg cursor-nesw-resize z-40 touch-none"
                      title="Drag to Stretch Corner"
                    />

                    <div
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startHandleDrag("bottom-right", e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        if (e.touches[0]) startHandleDrag("bottom-right", e.touches[0].clientX, e.touches[0].clientY);
                      }}
                      className="absolute -bottom-2.5 -right-2.5 w-5 h-5 bg-[#009886] hover:bg-black border-2 border-white rounded-full shadow-lg cursor-nwse-resize z-40 touch-none"
                      title="Drag to Stretch Corner"
                    />
                  </>
                )}

                {isDragging && !showHandles && (
                  <div className="absolute inset-0 border-2 border-dashed border-[#009886] rounded-2xl pointer-events-none" />
                )}
              </div>
            </div>

            <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none text-[10px] font-mono font-bold text-black/50 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-black/5 hidden md:block">
              DRAG HANDLES TO STRETCH (↔ / ↕) • DRAG BODY TO MOVE
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

            {/* 1. BACKDROP MODE & PHOTO UPLOAD CARD */}
            <div className="bg-white rounded-2xl border border-[#e6f7f5] p-4 shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#009886]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-black">
                    Backdrop & Camera Mode
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {stream && !useFallbackRoom ? "Live Camera" : customRoomImage ? "Custom Photo" : "Studio Grid"}
                </span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f0f7fd] rounded-xl border border-[#d6e8f7]">
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className={cn(
                    "py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer",
                    stream && !useFallbackRoom
                      ? "bg-[#009886] text-white shadow-xs"
                      : "text-black/70 hover:text-black hover:bg-white/60"
                  )}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Live Cam</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUseFallbackRoom(true);
                    setCustomRoomImage(null);
                    stopCamera();
                  }}
                  className={cn(
                    "py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer",
                    useFallbackRoom && !customRoomImage
                      ? "bg-[#0070ba] text-white shadow-xs"
                      : "text-black/70 hover:text-black hover:bg-white/60"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer",
                    customRoomImage
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-black/70 hover:text-black hover:bg-white/60"
                  )}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
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

            {/* 3. DIMENSIONS & STANDARD SIZES CARD */}
            <div className="bg-[#f0f7fd]/80 rounded-2xl border border-[#d6e8f7] p-4 shadow-xs flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-[#0070ba]" />
                  <h5 className="text-xs font-bold text-[#1a365d]">
                    Opening Dimensions (Updates Render Live)
                  </h5>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#0070ba] bg-white px-2 py-0.5 rounded-md border border-[#d6e8f7]">
                  {selectedWidth} × {selectedHeight}
                </span>
              </div>

              {/* WIDTH (FT) */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-black/60 tracking-wider block mb-1.5">
                  WIDTH (FT) • LIVE STRETCH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {WIDTH_OPTIONS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setSelectedWidth(w);
                        const scaleMap: Record<string, number> = {
                          "4.5 ft": 0.75,
                          "6 ft": 0.92,
                          "6.5 ft": 1.0,
                          "7.5 ft": 1.18,
                          "8.5 ft": 1.38,
                          "10 ft": 1.68,
                          "12 ft": 2.1,
                        };
                        if (scaleMap[w]) setScaleX(scaleMap[w]);
                      }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs",
                        selectedWidth === w
                          ? "bg-[#0070ba] text-white shadow-sm ring-2 ring-[#0070ba]/25"
                          : "bg-white text-black/80 border border-[#d6e8f7] hover:border-[#0070ba] hover:text-[#0070ba]"
                      )}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* HEIGHT (FT) */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-black/60 tracking-wider block mb-1.5">
                  HEIGHT (FT) • LIVE STRETCH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {HEIGHT_OPTIONS.map((h) => (
                    <button
                      key={h.value}
                      type="button"
                      onClick={() => {
                        setSelectedHeight(h.value);
                        const hMap: Record<string, number> = {
                          "7.0 ft": 0.92,
                          "7.5 ft": 1.0,
                          "8.0 ft": 1.12,
                          "9.5 ft": 1.38,
                        };
                        if (hMap[h.value]) setScaleY(hMap[h.value] + (hasTopLoft ? 0.2 : 0));
                      }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs",
                        selectedHeight === h.value
                          ? "bg-[#0070ba] text-white shadow-sm ring-2 ring-[#0070ba]/25"
                          : "bg-white text-black/80 border border-[#d6e8f7] hover:border-[#0070ba] hover:text-[#0070ba]"
                      )}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* OVERHEAD LOFT / TRANSOM */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-black/60 tracking-wider block mb-1.5">
                  OVERHEAD LOFT / TRANSOM:
                </span>
                <label
                  onClick={() => {
                    const next = !hasTopLoft;
                    setHasTopLoft(next);
                    setScaleY((prev) => (next ? prev + 0.2 : Math.max(0.6, prev - 0.2)));
                  }}
                  className="inline-flex items-center gap-3 bg-white px-3.5 py-2 rounded-xl border border-[#d6e8f7] shadow-xs cursor-pointer hover:border-[#0070ba] transition-all"
                >
                  <input
                    type="checkbox"
                    checked={hasTopLoft}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-[#0070ba] accent-[#0070ba] cursor-pointer"
                  />
                  <span className="text-xs font-bold text-black">
                    Add top loft storage / transom opening
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border",
                      hasTopLoft
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-neutral-100 text-black/50 border-neutral-200"
                    )}
                  >
                    {hasTopLoft ? "Included (+20% H)" : "Not included"}
                  </span>
                </label>
              </div>
            </div>

            {/* 4. DYNAMIC STRETCH, SIZE, TILT & OPACITY CONTROLS */}
            <div className="bg-white rounded-2xl border border-[#e6f7f5] p-4 shadow-xs flex flex-col gap-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#009886]" />
                  Dynamic Stretch & Transform
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowHandles(!showHandles)}
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition-colors cursor-pointer",
                      showHandles
                        ? "bg-[#009886] text-white border-[#009886]"
                        : "bg-neutral-100 text-black/60 border-neutral-200 hover:bg-neutral-200"
                    )}
                    title="Toggle Canvas Stretch Handles"
                  >
                    {showHandles ? "Handles ON" : "Handles OFF"}
                  </button>
                  <button
                    onClick={() => {
                      setScaleX(1.0);
                      setScaleY(1.0);
                    }}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#f0fdf4] text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                    title="Reset 1:1 Proportions"
                  >
                    1:1 Reset
                  </button>
                </div>
              </div>

              {/* Stretch Width Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-18 shrink-0 flex items-center gap-1">
                  <MoveHorizontal className="w-3 h-3 text-[#009886]" />
                  Stretch W
                </span>
                <input
                  type="range"
                  min="0.35"
                  max="3.0"
                  step="0.05"
                  value={scaleX}
                  onChange={(e) => setScaleX(parseFloat(e.target.value))}
                  className="flex-1 accent-[#009886] h-2 bg-[#e6f7f5] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-black font-bold w-10 text-right">
                  {Math.round(scaleX * 100)}%
                </span>
              </div>

              {/* Stretch Height Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-18 shrink-0 flex items-center gap-1">
                  <MoveVertical className="w-3 h-3 text-[#009886]" />
                  Stretch H
                </span>
                <input
                  type="range"
                  min="0.35"
                  max="3.0"
                  step="0.05"
                  value={scaleY}
                  onChange={(e) => setScaleY(parseFloat(e.target.value))}
                  className="flex-1 accent-[#009886] h-2 bg-[#e6f7f5] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-black font-bold w-10 text-right">
                  {Math.round(scaleY * 100)}%
                </span>
              </div>

              {/* Overall Size (Zoom) Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-18 shrink-0">
                  Size (Zoom)
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

              {/* Tilt Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-18 shrink-0">
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

              {/* Opacity Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-black/60 font-bold w-18 shrink-0">
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

            {/* 5. ACTIONS */}
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

              <button
                type="button"
                onClick={handleOpenQuoteModal}
                className="w-full py-2.5 bg-white hover:bg-[#e6f7f5] text-[#009886] border border-[#009886]/30 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 text-center cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Request Custom Quote ({selectedWidth} × {selectedHeight})</span>
              </button>
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

        <QuickQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          product={currentProduct}
          selectedFinishName={currentProduct.finishes?.[selectedFinishIndex]?.name}
          previewImageUrl={canvasSnapshotUrl || overlayPngUrl}
          width={selectedWidth}
          height={selectedHeight}
          hasLoft={hasTopLoft}
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

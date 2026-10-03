"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Smartphone,
  ExternalLink,
  Check,
  RefreshCw,
  Laptop,
} from "lucide-react";
import QRCode from "qrcode";
import { Product } from "@/types/product";

interface DesktopQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onLaunchCamera?: () => void;
}

export function DesktopQRCodeModal({
  isOpen,
  onClose,
  product,
  onLaunchCamera,
}: DesktopQRCodeModalProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      const origin = window.location.origin;
      const url = `${origin}/products?preview=${encodeURIComponent(product.id)}`;
      setCurrentUrl(url);

      setIsGenerating(true);
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "M",
      })
        .then((dataUrl) => {
          setQrDataUrl(dataUrl);
          setIsGenerating(false);
        })
        .catch((err) => {
          console.error("Failed to generate QR code", err);
          setIsGenerating(false);
        });
    }
  }, [product.id, isOpen]);

  const handleCopyLink = () => {
    if (navigator.clipboard && currentUrl) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunchOnDesktop = () => {
    onClose();
    if (onLaunchCamera) {
      onLaunchCamera();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Clean Minimal Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-sm bg-white border border-[#e6f7f5] rounded-2xl shadow-2xl z-10 p-6 flex flex-col items-center text-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-black/50 hover:text-black rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Product Title */}
            <h3 className="text-base font-extrabold text-black pr-6 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-black/60 mt-1">
              Scan with your phone to preview in your room
            </p>

            {/* Crisp QR Code */}
            <div className="mt-5 w-56 h-56 flex items-center justify-center bg-white rounded-xl border-2 border-[#009886]/30 p-2 shadow-sm">
              {qrDataUrl && !isGenerating ? (
                <img
                  src={qrDataUrl}
                  alt={`QR Code for ${product.name}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-black/50 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#009886] mb-1.5" />
                  <span>Generating QR...</span>
                </div>
              )}
            </div>

            {/* Simple Instruction */}
            <div className="mt-3 flex items-center gap-1.5 text-xs text-black/70 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-[#009886]" />
              <span>Point phone camera to open</span>
            </div>

            {/* Clean Action Buttons */}
            <div className="mt-5 w-full space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full py-2.5 px-3 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-black text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#009886]" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={handleLaunchOnDesktop}
                className="w-full py-2 px-3 bg-white hover:bg-neutral-100 text-black/80 hover:text-black border border-neutral-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Laptop className="w-3.5 h-3.5 text-[#009886]" />
                <span>Test Camera on Desktop</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

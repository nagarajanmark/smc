"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle2,
  PhoneCall,
  LayoutDashboard,
  Send,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import { Product } from "@/types/product";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface QuickQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedFinishName?: string;
  previewImageUrl?: string;
  width: string;
  height: string;
  hasLoft?: boolean;
}

export function QuickQuoteModal({
  isOpen,
  onClose,
  product,
  selectedFinishName,
  previewImageUrl,
  width,
  height,
  hasLoft,
}: QuickQuoteModalProps) {
  const { user, register, addQuote } = useAuth();

  // Guest inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdRefId, setCreatedRefId] = useState("");

  const displayImage =
    previewImageUrl ||
    product.transparentPngUrl ||
    (product.images && product.images.length > 0 ? product.images[0] : "/logo.png");

  // Auto-sync when user is already logged in
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setCity(user.city || "");
    } else {
      setName("");
      setEmail("");
      setPhone("");
      setCity("");
      setPassword("");
      setShowPassword(false);
    }
    setErrors({});
    setIsSuccess(false);
    setCreatedRefId("");
  }, [user, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!user) {
      if (!name.trim()) errs.name = "Please enter your name.";
      if (!email.trim() || !email.includes("@")) {
        errs.email = "Please enter a valid Gmail / Email address.";
      }
      if (!phone.trim() || phone.length < 8) errs.phone = "Please enter your phone number.";
      if (!city.trim()) errs.city = "Please enter your city / location.";
      if (!password.trim() || password.length < 4) {
        errs.password = "Please create a password (minimum 4 characters).";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // If guest, auto-create a user profile with the password and email
      if (!user) {
        await register({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          password: password.trim(),
        });
      }

      // Add quote to user history with the exact visualizer image
      const dimensions = `${width || "Standard"} × ${height || "Standard"}`;
      const quote = addQuote({
        productName: product.name,
        projectType: "Visualizer Custom Specification",
        dimensions,
        quantity: 1,
        hasLoft: hasLoft || false,
        status: "Under Review",
        city: city.trim() || user?.city || "Pollachi",
        image: displayImage,
        notes: notes.trim()
          ? `${notes.trim()} (Finish: ${selectedFinishName || "Standard"})`
          : `Finish: ${selectedFinishName || "Standard Architectural Finish"}`,
      });

      setCreatedRefId(quote.id);
      setIsSuccess(true);
    } catch (err) {
      console.error("Quote submission error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#009886]/20 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#009886] to-[#006e61] text-white p-5 sm:p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#a3f3eb] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Factory Quotation</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white">
              {isSuccess ? "Quotation Request Sent!" : "Request Custom Quote"}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              {product.name} ({width} × {height})
            </p>
          </div>

          <div className="p-5 sm:p-6">
            {isSuccess ? (
              /* Success State */
              <div className="text-center py-2 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#e6f7f5] text-[#009886] flex items-center justify-center mx-auto border-2 border-[#009886]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                {/* Exact Visualizer Room Snapshot in Success Box */}
                <div className="p-3 bg-[#f0f7fd] border border-[#d6e8f7] rounded-2xl flex items-center gap-3 text-left max-w-md mx-auto shadow-xs">
                  <div className="w-24 h-20 relative bg-white rounded-xl border border-[#d6e8f7] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-[#0070ba] block uppercase">
                      {product.sku}
                    </span>
                    <h4 className="text-xs font-bold text-black truncate">{product.name}</h4>
                    <span className="text-[11px] text-black/60 block mt-0.5 font-mono">
                      {width} × {height} {hasLoft ? "• Loft Included" : ""}
                    </span>
                    {selectedFinishName && (
                      <span className="text-[10px] font-bold text-[#009886]">
                        {selectedFinishName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-black">
                    Thank You, {user?.name || name}
                  </h3>
                  <p className="text-xs text-black/70 mt-1">
                    Your custom visualizer specification has been logged:
                  </p>
                  <div className="my-2.5 p-3 bg-[#e6f7f5] border border-[#009886] rounded-xl font-mono text-sm font-bold text-[#009886]">
                    {createdRefId}
                  </div>
                  <p className="text-[11px] text-black/60">
                    Your account has been created. You can sign in anytime with your phone number and password to track your estimates.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <a
                    href={`https://wa.me/918531992626?text=${encodeURIComponent(
                      `Hello SMC Fabrication, I customized ${product.name} (${width} × ${height}) with quote reference ${createdRefId}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-colors shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp SMC Team</span>
                  </a>

                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs uppercase tracking-wider font-bold rounded-xl transition-colors border border-[#009886]/30"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>View In Dashboard</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Quotation Input Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Visualizer Specs Summary Card with EXACT CANVAS PREVIEW IMAGE */}
                <div className="p-3 bg-[#f0f7fd] border border-[#d6e8f7] rounded-2xl flex items-center gap-3.5 shadow-xs">
                  {/* Canvas Preview Snapshot Image */}
                  <div className="w-28 h-20 relative bg-white rounded-xl border border-[#d6e8f7] p-1 shrink-0 flex items-center justify-center shadow-xs overflow-hidden">
                    <img
                      src={displayImage}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <span className="absolute bottom-1 right-1 text-[8px] font-mono font-bold bg-[#009886] text-white px-1 rounded shadow-xs">
                      Live Preview
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#0070ba] uppercase">
                        {product.sku}
                      </span>
                      {selectedFinishName && (
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#d6e8f7] font-bold text-[#009886] truncate max-w-[130px]">
                          {selectedFinishName}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-extrabold text-black truncate">
                      {product.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-black/70 pt-0.5">
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3 h-3 text-[#0070ba]" />
                        <span>Size: <strong className="text-black">{width} × {height}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#0070ba]" />
                        <span>Loft: <strong className="text-black">{hasLoft ? "Yes" : "No"}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* USER LOGGED IN STATE */}
                {user ? (
                  <div className="p-4 bg-[#e6f7f5] rounded-2xl border border-[#009886]/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-black">
                      <User className="w-4 h-4 text-[#009886]" />
                      <span>Logged In User Details (Auto-Filled)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-black/80">
                      <div>
                        <span className="text-black/50 block text-[10px] font-semibold">Name:</span>
                        <span className="font-bold text-black">{user.name}</span>
                      </div>
                      <div>
                        <span className="text-black/50 block text-[10px] font-semibold">Gmail / Email:</span>
                        <span className="font-bold text-black truncate block">{user.email || "On Profile"}</span>
                      </div>
                      <div>
                        <span className="text-black/50 block text-[10px] font-semibold">Phone / WhatsApp:</span>
                        <span className="font-bold text-black">{user.phone || "On Profile"}</span>
                      </div>
                      <div>
                        <span className="text-black/50 block text-[10px] font-semibold">Location / City:</span>
                        <span className="font-bold text-black">{user.city || "Pollachi / Tamil Nadu"}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* GUEST INPUTS */
                  <div className="space-y-3 pt-1">
                    <div className="text-xs font-bold text-black flex items-center gap-1.5">
                      <User className="w-4 h-4 text-[#009886]" />
                      <span>Enter Your Details for Instant Quote:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-black/70 block mb-1">
                          Your Name <span className="text-[#009886]">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ramesh Kumar"
                            className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-black/70 block mb-1">
                          Gmail / Email Address <span className="text-[#009886]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. name@gmail.com"
                            className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-black/70 block mb-1">
                          Phone / WhatsApp <span className="text-[#009886]">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 85319 92626"
                            className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-black/70 block mb-1">
                          Location / City <span className="text-[#009886]">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="e.g. Pollachi / Coimbatore"
                            className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>
                        {errors.city && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    {/* Set Account Password with Eye Icon */}
                    <div>
                      <label className="text-[11px] font-bold text-black/70 block mb-1">
                        Set Account Password <span className="text-[#009886]">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create password (min 4 characters)"
                          className="w-full pl-9 pr-10 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 p-0.5 text-black/40 hover:text-black focus:outline-none cursor-pointer"
                          title={showPassword ? "Hide password" : "Show password"}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-[10px] text-red-500 font-bold mt-1">{errors.password}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Optional Custom Note */}
                <div>
                  <label className="text-[11px] font-bold text-black/70 block mb-1">
                    Specific Requirement or Site Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Soundproof glass required, installation timeline..."
                    className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>
                      {isSubmitting
                        ? "Submitting Quote..."
                        : user
                        ? "Confirm & Submit Custom Quote"
                        : "Submit Quote & Create Account"}
                    </span>
                  </button>
                </div>

                <div className="pt-2 text-center text-[10px] text-black/50 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#009886]" />
                  <span>Free Laser Measurement & Estimation in Pollachi Region</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

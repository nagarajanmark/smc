"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Ruler,
  User,
  LayoutDashboard,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function QuoteForm() {
  const searchParams = useSearchParams();
  const { user, addQuote } = useAuth();

  // Pre-fill parameters from URL if present
  const initialProductSlug = searchParams.get("product") || "";
  const initialFinish = searchParams.get("finish") || "";
  const initialWidth = searchParams.get("width") || "";
  const initialHeight = searchParams.get("height") || "";
  const initialQuantity = searchParams.get("quantity") || "1";
  const initialLoft = searchParams.get("loft") === "yes";

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    city: user?.city || "",
    projectType: "Luxury Private Villa",
    category: "all",
    selectedProduct: initialProductSlug || "none",
    finish: initialFinish || "Standard Architectural Finish",
    widthMm: initialWidth || "",
    heightMm: initialHeight || "",
    quantity: initialQuantity || "1",
    hasLoft: initialLoft,
    installationRequired: "yes",
    estimatedTimeline: "Within 3 Months",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email,
        phone: prev.phone || user.phone,
        city: prev.city || user.city || "",
      }));
    }
  }, [user]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "Please enter a valid phone number.";
    }
    if (!formData.city.trim()) errs.city = "Please specify city/location.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedProd = PRODUCTS_DATA.find((p) => p.slug === formData.selectedProduct);
      const productName = selectedProd ? selectedProd.name : "Custom Architectural Fabrication Schedule";

      const created = addQuote({
        productName,
        projectType: formData.projectType,
        dimensions: `${formData.widthMm || "Standard"} × ${formData.heightMm || "Standard"}`,
        quantity: formData.quantity,
        hasLoft: formData.hasLoft,
        status: "Under Review",
        city: formData.city,
        notes: formData.message,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setReferenceId(created.id);
    }, 500);
  };

  return (
    <div className="bg-white border-2 border-[#e6f7f5] rounded-2xl p-6 sm:p-10 relative shadow-sm">
      {/* Logged in auto-fill notice */}
      {user && (
        <div className="mb-6 p-3.5 rounded-xl bg-[#e6f7f5] border border-[#009886]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#009886]" />
            <span>Logged in as <strong>{user.name}</strong>. Details auto-filled.</span>
          </div>
          <Link href="/dashboard" className="text-[#009886] font-bold hover:underline">
            View My Dashboard
          </Link>
        </div>
      )}

      {isSubmitted ? (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#e6f7f5] border-2 border-[#009886] flex items-center justify-center mx-auto text-[#009886]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#009886]">
              Quotation Request Received
            </span>
            <h3 className="text-2xl font-extrabold text-black mt-1">
              Thank You, {formData.fullName}
            </h3>
            <p className="text-xs text-black/70 mt-2 leading-relaxed">
              Your inquiry has been logged with Reference ID:
            </p>
            <div className="my-4 p-3 bg-[#e6f7f5] border border-[#009886] rounded-lg font-mono text-sm font-bold text-[#009886]">
              {referenceId}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-md"
            >
              <LayoutDashboard className="w-4 h-4 text-white" />
              <span>View In My Dashboard</span>
            </Link>

            <a
              href={`https://wa.me/918531992626?text=${encodeURIComponent(
                `Hello SMC Fabrication, I submitted quotation inquiry ${referenceId} for ${formData.selectedProduct} in ${formData.city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-[#009886] text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Discuss On WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData((prev) => ({ ...prev, message: "" }));
              }}
              className="px-6 py-3 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-black text-xs uppercase tracking-wider font-bold rounded-lg transition-colors border border-[#e6f7f5]"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#e6f7f5] pb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] block mb-1">
              Project Specification & Estimation
            </span>
            <h3 className="text-2xl font-extrabold text-black">
              Request An Architectural Quotation
            </h3>
            <p className="text-xs text-black/70 mt-1 leading-relaxed">
              Complete the parameters below to receive a detailed cost schedule and lead-time estimation.
            </p>
          </div>

          {/* Section 1: Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#009886] mb-3">
              01. Contact & Location
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Full Name <span className="text-[#009886]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.fullName && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Email Address <span className="text-[#009886]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Mobile / WhatsApp Number <span className="text-[#009886]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 85319 92626"
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.phone && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  City & State <span className="text-[#009886]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Pollachi / Coimbatore"
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.city && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.city}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Selected System & Specs */}
          <div className="pt-4 border-t border-[#e6f7f5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#009886] mb-3">
              02. System Specification & Dimensions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Selected System / Product
                </label>
                <select
                  value={formData.selectedProduct}
                  onChange={(e) =>
                    setFormData({ ...formData, selectedProduct: e.target.value })
                  }
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#009886]"
                >
                  <option value="none">-- General / Entire Schedule Inquiry --</option>
                  {PRODUCTS_DATA.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name} ({p.sku})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#009886]"
                >
                  <option value="Luxury Private Villa">Luxury Private Villa</option>
                  <option value="Apartment / Flat">Apartment / Flat</option>
                  <option value="Home Renovation">Home Renovation</option>
                  <option value="Commercial Building">Commercial Building</option>
                </select>
              </div>
            </div>

            {/* Quick Standard Size Chips */}
            <div className="mt-4 bg-[#f0f7fd]/80 p-4 rounded-xl border border-[#d6e8f7] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#0070ba]" />
                  <span className="text-xs font-bold text-[#1a365d]">
                    Quick Standard Dimensions (Click to Auto-Fill)
                  </span>
                </div>
                {(formData.widthMm || formData.heightMm) && (
                  <span className="text-[10px] font-mono font-bold text-[#0070ba] bg-white px-2 py-0.5 rounded border border-[#d6e8f7]">
                    {formData.widthMm || "—"} × {formData.heightMm || "—"}
                  </span>
                )}
              </div>

              {/* WIDTH (FT) */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-black/60 block mb-1">
                  WIDTH:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["4.5 ft", "6 ft", "6.5 ft", "7.5 ft", "8.5 ft", "10 ft"].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setFormData({ ...formData, widthMm: w })}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs cursor-pointer",
                        formData.widthMm === w
                          ? "bg-[#0070ba] text-white shadow-sm"
                          : "bg-white text-black/80 border border-[#d6e8f7] hover:border-[#0070ba]"
                      )}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* HEIGHT (FT) */}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-black/60 block mb-1">
                  HEIGHT:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["7.0 ft (Standard)", "7.5 ft", "8.0 ft (Lintel)", "9.5 ft (Loft)"].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setFormData({ ...formData, heightMm: h })}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs cursor-pointer",
                        formData.heightMm === h
                          ? "bg-[#0070ba] text-white shadow-sm"
                          : "bg-white text-black/80 border border-[#d6e8f7] hover:border-[#0070ba]"
                      )}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Number of Units
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  min={1}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Turnkey Installation Required?
                </label>
                <select
                  value={formData.installationRequired}
                  onChange={(e) =>
                    setFormData({ ...formData, installationRequired: e.target.value })
                  }
                  className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#009886]"
                >
                  <option value="yes">Yes — Complete Installation</option>
                  <option value="supply-only">Supply Only (Fabrication & Delivery)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="pt-4 border-t border-[#e6f7f5]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#009886] mb-3">
              03. Specific Requirements & Message
            </h4>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any specific glass, color finish, or site survey timeline..."
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-[#e6f7f5] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-black/60 font-medium">
              * SMC team typically responds within 24 hours.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{isSubmitting ? "Submitting..." : "Submit Quotation Request"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
} from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";

export function QuoteForm() {
  const searchParams = useSearchParams();

  // Pre-fill parameters from URL if present
  const initialProductSlug = searchParams.get("product") || "";
  const initialProductName = searchParams.get("productName") || "";
  const initialSku = searchParams.get("sku") || "";
  const initialFinish = searchParams.get("finish") || "";
  const initialWidth = searchParams.get("width") || "";
  const initialHeight = searchParams.get("height") || "";
  const initialQuantity = searchParams.get("quantity") || "1";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    projectType: "Luxury Private Villa",
    category: "all",
    selectedProduct: initialProductSlug || "none",
    finish: initialFinish || "Standard Architectural Finish",
    widthMm: initialWidth || "",
    heightMm: initialHeight || "",
    quantity: initialQuantity || "1",
    installationRequired: "yes",
    estimatedTimeline: "Within 3 Months",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  // Update product if URL param matches
  useEffect(() => {
    if (initialProductSlug) {
      setFormData((prev) => ({
        ...prev,
        selectedProduct: initialProductSlug,
        finish: initialFinish || prev.finish,
        widthMm: initialWidth || prev.widthMm,
        heightMm: initialHeight || prev.heightMm,
        quantity: initialQuantity || prev.quantity,
      }));
    }
  }, [initialProductSlug, initialFinish, initialWidth, initialHeight, initialQuantity]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Please provide a valid email address.";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = "Please enter a valid phone or mobile number.";
    }
    if (!formData.city.trim()) errs.city = "Please specify project city/location.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate frontend submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const generatedRef = `SMC-QT-${Math.floor(100000 + Math.random() * 900000)}`;
      setReferenceId(generatedRef);
    }, 900);
  };

  return (
    <div className="bg-white border-2 border-[#e6f4fd] rounded-2xl p-6 sm:p-10 relative shadow-sm">
      {isSubmitted ? (
        /* Submission Success Message & Demo Notice */
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#e6f4fd] border-2 border-[#0070bc] flex items-center justify-center mx-auto text-[#0070bc]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0070bc]">
              Quotation Request Received
            </span>
            <h3 className="text-2xl font-extrabold text-black mt-1">
              Thank You, {formData.fullName}
            </h3>
            <p className="text-xs text-black/70 mt-2 leading-relaxed">
              Your architectural specification has been logged with reference ID:
            </p>
            <div className="my-4 p-3 bg-[#e6f4fd] border border-[#0070bc] rounded-lg font-mono text-sm font-bold text-[#0070bc]">
              {referenceId}
            </div>
          </div>

          {/* Demo Notice Banner */}
          <div className="p-4 bg-[#e6f4fd] border border-[#0070bc]/30 rounded-lg text-xs text-black/80 max-w-lg mx-auto text-left flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#0070bc] shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Mode Notice:</strong> This is a client-side frontend prototype. No real customer enquiry has been delivered to a backend server. In production, this form will trigger webhook alerts, CRM pipeline entries, and automated PDF bill-of-quantities generation.
            </div>
          </div>

          {/* Direct WhatsApp Consultation Shortcut */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hello SMC Fabrication, I submitted quotation inquiry ${referenceId} for ${formData.selectedProduct} in ${formData.city}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070bc] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Discuss Directly On WhatsApp</span>
            </a>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData((prev) => ({ ...prev, fullName: "", message: "" }));
              }}
              className="px-6 py-3 bg-[#e6f4fd] hover:bg-[#0070bc] hover:text-white text-black text-xs uppercase tracking-wider font-bold rounded-lg transition-colors border border-[#e6f4fd]"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        /* Quotation Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="border-b border-[#e6f4fd] pb-6">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0070bc] block mb-1">
              Project Specification & Estimation
            </span>
            <h3 className="text-2xl font-extrabold text-black">
              Request An Architectural Quotation
            </h3>
            <p className="text-xs text-black/70 mt-1 leading-relaxed">
              Complete the parameters below to receive a detailed cost schedule, thermal calculation, and lead-time estimation.
            </p>
          </div>

          {/* Section 1: Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0070bc] mb-3 flex items-center gap-2">
              <span>01. Contact & Project Location</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Full Name / Firm Name <span className="text-[#0070bc]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ar. Rajesh Mehta / Studio Forma"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.fullName && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Work Email <span className="text-[#0070bc]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@architecture.com"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Mobile / WhatsApp Number <span className="text-[#0070bc]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.phone && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Project City & State <span className="text-[#0070bc]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none transition-colors"
                />
                {errors.city && (
                  <p className="text-[10px] text-black font-bold mt-1">{errors.city}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Selected System & Specs */}
          <div className="pt-4 border-t border-[#e6f4fd]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0070bc] mb-3 flex items-center gap-2">
              <span>02. System Specification & Dimensions</span>
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
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#0070bc]"
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
                  Project Classification
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#0070bc]"
                >
                  <option value="Luxury Private Villa">Luxury Private Villa</option>
                  <option value="High-Rise Penthouse / Apartment">
                    High-Rise Penthouse / Apartment
                  </option>
                  <option value="Commercial & Retail Facade">Commercial & Retail Facade</option>
                  <option value="Heritage Manor Restoration">
                    Heritage Manor Restoration
                  </option>
                  <option value="Architectural Renovation">Architectural Renovation</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Aperture Width (mm)
                </label>
                <input
                  type="text"
                  value={formData.widthMm}
                  onChange={(e) => setFormData({ ...formData, widthMm: e.target.value })}
                  placeholder="e.g. 2400 (or specify range)"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Aperture Height (mm)
                </label>
                <input
                  type="text"
                  value={formData.heightMm}
                  onChange={(e) => setFormData({ ...formData, heightMm: e.target.value })}
                  placeholder="e.g. 3000 (or floor-to-ceiling)"
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-black/70 block mb-1">
                  Estimated Number of Units
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  min={1}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none"
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
                  className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#0070bc]"
                >
                  <option value="yes">Yes — Complete Turnkey On-Site Installation</option>
                  <option value="supply-only">Supply Only (Fabrication & Delivery)</option>
                  <option value="supervision">Supply with Technical Site Supervision</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Notes & Drawings */}
          <div className="pt-4 border-t border-[#e6f4fd]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0070bc] mb-3 flex items-center gap-2">
              <span>03. Architectural Notes & Specific Requirements</span>
            </h4>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide any specific requirements: acoustic ratings, wind load considerations, custom powder coat RAL code, smart-home motorized lock integration, or site survey timeline..."
              className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] text-xs text-black p-3 rounded-lg focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-[#e6f4fd] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-black/60 font-medium">
              * Our architectural team typically responds within 24 hours with an initial estimation.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-white" />
              <span>{isSubmitting ? "Generating Request..." : "Submit Quotation Request"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

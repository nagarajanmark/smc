"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Studio Visit & Consultation",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      errs.email = "Valid email is required.";
    }
    if (!formData.message.trim()) errs.message = "Please enter your message.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="bg-white border-2 border-[#e6f7f5] rounded-2xl p-6 sm:p-10 shadow-sm">
      {isSubmitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#e6f7f5] border-2 border-[#009886] flex items-center justify-center mx-auto text-[#009886]">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-extrabold text-black">Message Received</h3>
          <p className="text-xs text-black/70 max-w-sm mx-auto">
            Thank you for reaching out. An SMC architectural consultant will contact you shortly.
          </p>
          <div className="p-3 bg-[#e6f7f5] border border-[#009886]/30 rounded-lg text-xs text-black/80 max-w-sm mx-auto text-left">
            <strong>Demonstration Notice:</strong> This is a client-side prototype message interaction.
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: "", email: "", phone: "", subject: "Studio Visit", message: "" });
            }}
            className="mt-4 px-6 py-2.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-colors border border-[#e6f7f5]"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-b border-[#e6f7f5] pb-4 mb-4">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#009886] block mb-1">
              Direct Inquiry
            </span>
            <h3 className="text-xl font-extrabold text-black">Send Us A Message</h3>
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/70 block mb-1">
              Your Name <span className="text-[#009886]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Architect Priya Sharma"
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
            />
            {errors.name && <p className="text-[10px] text-black font-bold mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-black/70 block mb-1">
                Email Address <span className="text-[#009886]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
              />
              {errors.email && <p className="text-[10px] text-black font-bold mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-[11px] font-bold text-black/70 block mb-1">
                Contact Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 85319 92626"
                className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/70 block mb-1">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] text-xs text-black font-medium p-3 rounded-lg focus:outline-none focus:border-[#009886]"
            >
              <option value="Studio Visit & Consultation">Experience Studio Visit & Consultation</option>
              <option value="Architectural Partnership">Architect / Specifier Partnership</option>
              <option value="Product Enquiry">Product Technical Clarification</option>
              <option value="Dealer & Trade Inquiry">Trade & Dealership Inquiry</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-black/70 block mb-1">
              Message <span className="text-[#009886]">*</span>
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can our fabrication engineering team assist your project?"
              className="w-full bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] text-xs text-black p-3 rounded-lg focus:outline-none"
            />
            {errors.message && <p className="text-[10px] text-black font-bold mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#009886] hover:bg-black text-white text-xs uppercase font-bold tracking-[0.2em] rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-white" />
            <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          </button>
        </form>
      )}
    </div>
  );
}

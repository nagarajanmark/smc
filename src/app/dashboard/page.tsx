"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  FileText,
  Bookmark,
  LogOut,
  Clock,
  PhoneCall,
  Camera,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const { user, quotes, savedItems, logout, openAuthModal, loginDemo } = useAuth();
  const [activeTab, setActiveTab] = useState<"quotes" | "saved">("quotes");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafcfc] pt-28 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#009886] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fafcfc] pt-28 pb-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-6 bg-white border-2 border-[#e6f7f5] rounded-3xl p-8 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-[#e6f7f5] text-[#009886] flex items-center justify-center mx-auto">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-black">Sign In to Your Account</h1>
            <p className="text-xs text-black/60 mt-1">
              Access your quotation history and saved visualizer room designs.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => openAuthModal("login")}
              className="w-full py-3 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              Sign In / Register
            </button>
            <button
              onClick={loginDemo}
              className="w-full py-3 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ 1-Click Fast Login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafcfc] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* User Top Card */}
        <div className="bg-gradient-to-r from-[#009886] to-[#006e61] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 text-white flex items-center justify-center text-xl font-black shrink-0 border border-white/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#a3f3eb] block">
                SMC User Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{user.name}</h1>
              <p className="text-xs text-white/80">
                {user.email} {user.city ? `• ${user.city}` : ""}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="self-start sm:self-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#e6f7f5] gap-2">
          <button
            onClick={() => setActiveTab("quotes")}
            className={cn(
              "px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border-b-2",
              activeTab === "quotes"
                ? "border-[#009886] text-[#009886] font-extrabold"
                : "border-transparent text-black/60 hover:text-black"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>My Quotations ({quotes.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={cn(
              "px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border-b-2",
              activeTab === "saved"
                ? "border-[#009886] text-[#009886] font-extrabold"
                : "border-transparent text-black/60 hover:text-black"
            )}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Items ({savedItems.length})</span>
          </button>
        </div>

        {/* QUOTES CONTENT */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-black">Your Quotations</h2>
              <Link
                href="/request-quote"
                className="px-3.5 py-1.5 bg-[#009886] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors"
              >
                + New Quote
              </Link>
            </div>

            {quotes.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#e6f7f5] rounded-2xl text-xs text-black/60">
                No quotations submitted yet.
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white border-2 border-[#e6f7f5] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      {quote.image && (
                        <div className="w-20 h-16 sm:w-24 sm:h-20 bg-white rounded-xl border border-[#d6e8f7] p-1 shrink-0 overflow-hidden shadow-xs flex items-center justify-center">
                          <img
                            src={quote.image}
                            alt={quote.productName}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-[#009886]">
                            {quote.id}
                          </span>
                          <span className="text-black/30">•</span>
                          <span className="text-[11px] text-black/60 font-mono">
                            {new Date(quote.createdAt).toLocaleDateString("en-IN")}
                          </span>
                        </div>
                        <h3 className="text-sm font-extrabold text-black">{quote.productName}</h3>
                        <p className="text-xs text-black/70 mt-0.5">
                          {quote.dimensions} • {quote.quantity} Unit(s) {quote.city ? `• ${quote.city}` : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{quote.status}</span>
                      </span>
                      <a
                        href={`https://wa.me/918531992626?text=${encodeURIComponent(
                          `Hello SMC, inquiring about quote ${quote.id}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#e6f7f5] hover:bg-[#009886] text-[#009886] hover:text-white rounded-lg transition-colors"
                        title="WhatsApp SMC"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED ITEMS CONTENT */}
        {activeTab === "saved" && (
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-black">Saved Products & Visuals</h2>
            {savedItems.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#e6f7f5] rounded-2xl text-xs text-black/60">
                No saved products. Click the bookmark icon on any product to save it here.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-[#e6f7f5] rounded-2xl p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-32 bg-[#f0f7fd] rounded-xl flex items-center justify-center mb-3">
                        <Camera className="w-6 h-6 text-[#009886]/40" />
                      </div>
                      <h4 className="text-xs font-bold text-black line-clamp-1">{item.productName}</h4>
                      <p className="text-[11px] text-black/50 font-mono mt-0.5">{item.sku}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#e6f7f5] flex items-center justify-between">
                      <Link
                        href={`/visualizer?product=${encodeURIComponent(item.productId)}`}
                        className="text-xs font-bold text-[#009886] hover:underline"
                      >
                        View in Room
                      </Link>
                      <Link
                        href={`/request-quote?product=${encodeURIComponent(item.productName)}`}
                        className="px-2.5 py-1 bg-[#009886] text-white text-[11px] font-bold rounded-lg"
                      >
                        Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

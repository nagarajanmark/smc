"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    login,
    loginDemo,
    register,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setActiveTab(authModalTab);
    setErrorMsg("");
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!loginEmail.trim() || !loginEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!loginPassword.trim() || loginPassword.length < 4) {
      setErrorMsg("Please enter your password (minimum 4 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(loginEmail);
    } catch {
      setErrorMsg("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMsg("Please enter your phone / WhatsApp number.");
      return;
    }
    if (!city.trim()) {
      setErrorMsg("Please enter your city / location.");
      return;
    }
    if (!password.trim() || password.length < 4) {
      setErrorMsg("Please create a password (minimum 4 characters).");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        city: city.trim(),
        password: password.trim(),
      });
    } catch {
      setErrorMsg("Registration failed. Please try again.");
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
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#009886]/20 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#009886] to-[#006e61] text-white p-6 relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-white">
              {activeTab === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-xs text-white/80 mt-1">
              Sign in to manage your window & door quotations and saved items.
            </p>

            {/* Quick 1-click test button */}
            <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
              <span className="text-[11px] text-white/80 font-medium">Quick Test:</span>
              <button
                type="button"
                onClick={loginDemo}
                className="px-3 py-1 bg-white text-[#009886] hover:bg-emerald-50 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>1-Click Fast Login</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e6f7f5] bg-[#f8fdfc]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMsg("");
              }}
              className={cn(
                "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2",
                activeTab === "login"
                  ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                  : "border-transparent text-black/60 hover:text-black"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMsg("");
              }}
              className={cn(
                "flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2",
                activeTab === "register"
                  ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                  : "border-transparent text-black/60 hover:text-black"
              )}
            >
              Create Account
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* LOGIN FORM */}
            {activeTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-black/80 block mb-1">
                    Email Address <span className="text-[#009886]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="yourname@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-[#009886]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-black/80 block mb-1">
                    Password <span className="text-[#009886]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-[#009886]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-3 p-0.5 text-black/40 hover:text-black focus:outline-none cursor-pointer"
                      title={showLoginPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#009886] hover:bg-black text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* REGISTER FORM */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-black/80 block mb-1">
                    Full Name <span className="text-[#009886]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-black/80 block mb-1">
                    Email Address <span className="text-[#009886]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-black/80 block mb-1">
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
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/80 block mb-1">
                      City / Location <span className="text-[#009886]">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Pollachi"
                        className="w-full pl-9 pr-3 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-black/80 block mb-1">
                    Password <span className="text-[#009886]">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-black/40 absolute left-3 top-3" />
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute right-3 top-2.5 p-0.5 text-black/40 hover:text-black focus:outline-none cursor-pointer"
                      title={showRegisterPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-[#e6f7f5] text-center text-[11px] text-black/50 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#009886]" />
              <span>SMC Fabrications Pollachi • Fast & Secure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

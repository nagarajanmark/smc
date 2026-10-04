"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Package,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  PhoneCall,
  Mail,
  MapPin,
  Trash2,
  Edit3,
  ExternalLink,
  Lock,
  Unlock,
  LogOut,
  Sparkles,
  Layers,
  Ruler,
  Palette,
  Image as ImageIcon,
  Check,
  X,
  Eye,
  EyeOff,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  DollarSign,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { Product, ColorFinishOption, ProductCategory, MaterialType, OpeningMechanism } from "@/types/product";
import { ContactInquiry, AdminQuoteRecord } from "@/types/admin";
import { UserProfile } from "@/types/auth";
import { cn } from "@/lib/utils";

type AdminTab = "overview" | "quotes" | "users" | "inquiries" | "products";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    users,
    deleteUser,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    quotes,
    updateQuoteStatus,
    updateQuotePrice,
    updateQuoteNotes,
    deleteQuote,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleFeatured,
    resetProducts,
  } = useAdmin();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Admin Login PIN State
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState("");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [quoteStatusFilter, setQuoteStatusFilter] = useState("all");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("all");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  // Selected Image for full preview modal
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Product Editing / Creation Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormTab, setProductFormTab] = useState<"basic" | "sizes" | "images" | "colors">("basic");

  // Product Form Data
  const initialProductForm: Product = {
    id: "",
    slug: "",
    name: "",
    sku: "SMC-NEW-01",
    category: "main-entrance-doors",
    categoryName: "Main Entrance Doors",
    tagline: "",
    shortDescription: "",
    detailedDescription: "",
    material: "Thermal-Break Aluminium",
    openingType: "Pivot System",
    images: ["/images/product-pivot-door.png"],
    transparentPngUrl: "/images/product-pivot-door.png",
    dimensions: {
      standardWidthMm: 1800,
      standardHeightMm: 2400,
      minWidthMm: 1000,
      maxWidthMm: 3000,
      minHeightMm: 1800,
      maxHeightMm: 4000,
      depthMm: 85,
      unit: "mm",
    },
    finishes: [
      { id: "fin-golden-oak", name: "Golden Oak", hex: "#b8783b", textureLabel: "Natural Golden Woodgrain" },
      { id: "fin-rosewood", name: "Rosewood", hex: "#4d231a", textureLabel: "Deep Reddish Rosewood" },
      { id: "fin-black", name: "Matte Black", hex: "#141414", textureLabel: "Architectural Matte Black" },
      { id: "fin-white-ash", name: "White Ash", hex: "#ffffff", textureLabel: "Pristine Smooth White" },
    ],
    frameOptions: [],
    glassOptions: [],
    hardwareOptions: [],
    specifications: {
      thermalTransmittance: "Uw = 1.1 W/m²K",
      acousticInsulation: "Rw 40 dB",
      airPermeability: "Class 4",
      waterTightness: "Class E1200",
      windResistance: "Class C5",
      burglarResistance: "RC2 Certified",
      maxPanelWeight: "350 kg",
      standardWarrantyYears: 10,
    },
    features: ["Thermal insulation", "Multi-point locking", "Precision European hardware"],
    installationNotes: ["Laser plumb survey required", "Direct factory installation team"],
    maintenanceGuide: ["Wipe clean with mild soap solution"],
    arAvailable: true,
    featured: true,
  };

  const [productFormData, setProductFormData] = useState<Product>(initialProductForm);

  // New Custom Color State for Product Editor
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex] = useState("#b8783b");
  const [newColorTexture, setNewColorTexture] = useState("");

  // New Image URL input state
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    const ok = adminLogin(pin);
    if (!ok) {
      setPinError("Invalid Admin PIN / Password. (Demo: admin123)");
    }
  };

  // Open Product Editor for New or Existing
  const handleOpenProductModal = (productToEdit?: Product) => {
    if (productToEdit) {
      setEditingProductId(productToEdit.id);
      setProductFormData(JSON.parse(JSON.stringify(productToEdit)));
    } else {
      setEditingProductId(null);
      const newId = `smc-prod-${Date.now().toString().slice(-4)}`;
      setProductFormData({
        ...initialProductForm,
        id: newId,
        slug: `custom-product-${newId}`,
        sku: `SMC-CUST-${Math.floor(100 + Math.random() * 900)}`,
      });
    }
    setProductFormTab("basic");
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, productFormData);
    } else {
      addProduct(productFormData);
    }
    setIsProductModalOpen(false);
  };

  // Color Finishes Handler
  const handleAddColorFinish = () => {
    if (!newColorName.trim()) return;
    const newFinish: ColorFinishOption = {
      id: `fin-${Date.now().toString().slice(-4)}`,
      name: newColorName.trim(),
      hex: newColorHex,
      textureLabel: newColorTexture.trim() || `${newColorName} Architectural Finish`,
    };
    setProductFormData((prev) => ({
      ...prev,
      finishes: [...prev.finishes, newFinish],
    }));
    setNewColorName("");
    setNewColorTexture("");
  };

  const handleRemoveColorFinish = (finishId: string) => {
    setProductFormData((prev) => ({
      ...prev,
      finishes: prev.finishes.filter((f) => f.id !== finishId),
    }));
  };

  // Images Handler
  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setProductFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl.trim()],
    }));
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setProductFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Filtered lists
  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = quoteStatusFilter === "all" || q.status === quoteStatusFilter;
    const qString = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      q.id.toLowerCase().includes(qString) ||
      q.productName.toLowerCase().includes(qString) ||
      (q.clientName && q.clientName.toLowerCase().includes(qString)) ||
      (q.city && q.city.toLowerCase().includes(qString));
    return matchesStatus && matchesSearch;
  });

  const filteredUsers = users.filter((u) => {
    const qString = searchQuery.toLowerCase();
    return (
      !searchQuery ||
      u.name.toLowerCase().includes(qString) ||
      u.email.toLowerCase().includes(qString) ||
      (u.phone && u.phone.includes(qString)) ||
      (u.city && u.city.toLowerCase().includes(qString))
    );
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = inquiryStatusFilter === "all" || inq.status === inquiryStatusFilter;
    const qString = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      inq.name.toLowerCase().includes(qString) ||
      inq.email.toLowerCase().includes(qString) ||
      inq.subject.toLowerCase().includes(qString) ||
      inq.message.toLowerCase().includes(qString);
    return matchesStatus && matchesSearch;
  });

  const filteredProducts = products.filter((prod) => {
    const matchesCategory = productCategoryFilter === "all" || prod.category === productCategoryFilter;
    const qString = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      prod.name.toLowerCase().includes(qString) ||
      prod.sku.toLowerCase().includes(qString) ||
      prod.material.toLowerCase().includes(qString);
    return matchesCategory && matchesSearch;
  });

  // ==========================================
  // 1. HYDRATION GUARD & ADMIN LOGIN WALL
  // ==========================================
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#f8fdfc] flex items-center justify-center p-4 pt-24 pb-16 font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-[#009886] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8fdfc] flex items-center justify-center p-4 pt-24 pb-16 font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#009886]/20 overflow-hidden">
          <div className="bg-gradient-to-r from-[#009886] to-[#006e61] text-white p-8 text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-inner">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#a3f3eb] font-bold block">
              Direct Factory Management
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1">SMC Admin Portal</h1>
            <p className="text-xs text-white/80 mt-1">
              Access customer quotations, user profiles, inquiries & catalog controls.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {pinError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-black/80 block mb-1">
                  Enter Admin Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-black/40 absolute left-3 top-3.5" />
                  <input
                    type={showPin ? "text" : "password"}
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter admin password (e.g. admin123)"
                    className="w-full pl-9 pr-10 py-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-[#009886]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-3 p-0.5 text-black/40 hover:text-black focus:outline-none cursor-pointer"
                    title={showPin ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPin ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#009886] hover:bg-black text-white text-xs sm:text-sm uppercase tracking-wider font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Dashboard</span>
              </button>
            </form>

            <div className="pt-2 border-t border-[#e6f7f5] flex items-center justify-between">
              <span className="text-xs text-black/60 font-medium">Quick Access:</span>
              <button
                type="button"
                onClick={() => adminLogin("admin123")}
                className="px-3 py-1.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-[#009886]/30"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>1-Click Fast Unlock</span>
              </button>
            </div>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-[#009886] hover:underline font-bold">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#f8fdfc] text-black pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP ADMIN HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#e6f7f5] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#e6f7f5] text-[#009886] border border-[#009886]/30 uppercase">
                Pollachi Plant Management
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black">
              SMC Fabrications Admin Panel
            </h1>
            <p className="text-xs text-black/60">
              Manage custom visualizer quotes, registered users, contact requests, and full product catalogue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-[#f8fdfc] hover:bg-[#e6f7f5] text-black text-xs font-bold rounded-xl border border-[#e6f7f5] transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#009886]" />
              <span>View Public Store</span>
            </Link>

            <button
              onClick={adminLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-xs font-bold rounded-xl border border-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout Admin</span>
            </button>
          </div>
        </div>

        {/* STATS OVERVIEW CARDS (3 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div
            onClick={() => setActiveTab("quotes")}
            className="p-5 bg-white border border-[#e6f7f5] hover:border-[#009886] rounded-2xl shadow-xs cursor-pointer transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Custom Quotes</span>
              <div className="w-8 h-8 rounded-xl bg-[#e6f7f5] text-[#009886] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-black">{quotes.length}</div>
          </div>

          <div
            onClick={() => setActiveTab("inquiries")}
            className="p-5 bg-white border border-[#e6f7f5] hover:border-[#009886] rounded-2xl shadow-xs cursor-pointer transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Inquiries</span>
              <div className="w-8 h-8 rounded-xl bg-[#e6f7f5] text-[#009886] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-black">{inquiries.length}</div>
          </div>

          <div
            onClick={() => setActiveTab("products")}
            className="p-5 bg-white border border-[#e6f7f5] hover:border-[#009886] rounded-2xl shadow-xs cursor-pointer transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Total Products</span>
              <div className="w-8 h-8 rounded-xl bg-[#e6f7f5] text-[#009886] flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-black">{products.length}</div>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#e6f7f5] mb-6">
          <button
            onClick={() => {
              setActiveTab("overview");
              setSearchQuery("");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0",
              activeTab === "overview"
                ? "bg-[#009886] text-white shadow-sm"
                : "bg-white text-black/70 hover:bg-[#e6f7f5] hover:text-black border border-[#e6f7f5]"
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("quotes");
              setSearchQuery("");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0 relative",
              activeTab === "quotes"
                ? "bg-[#009886] text-white shadow-sm"
                : "bg-white text-black/70 hover:bg-[#e6f7f5] hover:text-black border border-[#e6f7f5]"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>Quote Details ({quotes.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("users");
              setSearchQuery("");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0",
              activeTab === "users"
                ? "bg-[#009886] text-white shadow-sm"
                : "bg-white text-black/70 hover:bg-[#e6f7f5] hover:text-black border border-[#e6f7f5]"
            )}
          >
            <Users className="w-4 h-4" />
            <span>User Details ({users.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("inquiries");
              setSearchQuery("");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0",
              activeTab === "inquiries"
                ? "bg-[#009886] text-white shadow-sm"
                : "bg-white text-black/70 hover:bg-[#e6f7f5] hover:text-black border border-[#e6f7f5]"
            )}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Details ({inquiries.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("products");
              setSearchQuery("");
            }}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shrink-0",
              activeTab === "products"
                ? "bg-[#009886] text-white shadow-sm"
                : "bg-white text-black/70 hover:bg-[#e6f7f5] hover:text-black border border-[#e6f7f5]"
            )}
          >
            <Package className="w-4 h-4" />
            <span>Product Handling ({products.length})</span>
          </button>
        </div>

        {/* ========================================== */}
        {/* TAB 1: OVERVIEW                            */}
        {/* ========================================== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Actions Bar */}
            <div className="p-4 bg-white rounded-2xl border border-[#e6f7f5] flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <span className="text-xs font-bold text-black/80 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#009886]" />
                <span>Quick Management Shortcuts:</span>
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-3.5 py-1.5 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={() => setActiveTab("quotes")}
                  className="px-3.5 py-1.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-xl transition-all border border-[#009886]/30 cursor-pointer"
                >
                  <span>Review Pending Quotes ({quotes.filter((q) => q.status === "Under Review").length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="px-3.5 py-1.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-xl transition-all border border-[#009886]/30 cursor-pointer"
                >
                  <span>Unread Inquiries ({inquiries.filter((i) => i.status === "New").length})</span>
                </button>
              </div>
            </div>

            {/* Recent Quotes with visualizer canvas snapshot */}
            <div className="bg-white rounded-3xl border border-[#e6f7f5] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-black">
                    Recent Customer Quotations
                  </h3>
                  <p className="text-xs text-black/60">
                    Latest custom sizes, visualizer snapshots, and customer contacts.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("quotes")}
                  className="text-xs font-bold text-[#009886] hover:underline"
                >
                  View All ({quotes.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {quotes.slice(0, 4).map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-[#f8fdfc] hover:bg-[#f0f9f8] border border-[#e6f7f5] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => q.image && setPreviewImage(q.image)}
                        className="w-16 h-14 bg-white rounded-xl border border-[#d6e8f7] p-1 shrink-0 overflow-hidden cursor-pointer hover:opacity-90 relative"
                        title="Click to view full room preview"
                      >
                        <img
                          src={q.image || "/images/product-pivot-door.png"}
                          alt={q.productName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#009886]">
                            {q.id}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-black mt-0.5">{q.productName}</h4>
                        <div className="text-[11px] text-black/60 flex flex-wrap items-center gap-x-2 mt-0.5">
                          <span>Client: <strong className="text-black">{q.clientName || "User"}</strong></span>
                          <span>•</span>
                          <span>Size: <strong>{q.dimensions}</strong></span>
                          <span>•</span>
                          <span>{q.city}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <a
                        href={`https://wa.me/${(q.clientPhone || "918531992626").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${q.clientName || "Sir/Madam"}, regarding your SMC Fabrications quotation ${q.id} for ${q.productName}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] rounded-xl transition-colors"
                        title="Chat with customer on WhatsApp"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: QUOTE DETAILS                       */}
        {/* ========================================== */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {/* Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#e6f7f5] flex items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search quote ID, client, product, city..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                />
              </div>

              <span className="text-xs font-bold text-black/60">
                Total Quotations: {filteredQuotes.length}
              </span>
            </div>

            {/* Quotations List */}
            {filteredQuotes.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-[#e6f7f5] text-black/50 text-xs">
                No quotations found matching your search.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-3xl border border-[#e6f7f5] p-5 sm:p-6 shadow-xs space-y-4 hover:border-[#009886]/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#e6f7f5] pb-4">
                      {/* Left Snapshot & Info */}
                      <div className="flex items-start gap-4">
                        <div
                          onClick={() => q.image && setPreviewImage(q.image)}
                          className="w-24 h-20 bg-[#f0f7fd] rounded-2xl border border-[#d6e8f7] p-1 shrink-0 overflow-hidden cursor-pointer hover:opacity-90 relative shadow-xs"
                          title="Click to view high-res visualizer canvas"
                        >
                          <img
                            src={q.image || "/images/product-pivot-door.png"}
                            alt={q.productName}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <span className="absolute bottom-1 right-1 text-[7px] font-bold bg-[#009886] text-white px-1 rounded">
                            Preview
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-extrabold text-[#009886]">
                              {q.id}
                            </span>
                            <span className="text-[11px] text-black/50">
                              Logged on {new Date(q.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="text-sm sm:text-base font-extrabold text-black">
                            {q.productName}
                          </h3>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/70">
                            <span className="flex items-center gap-1">
                              <Ruler className="w-3.5 h-3.5 text-[#009886]" />
                              <span>Dimensions: <strong className="text-black">{q.dimensions}</strong></span>
                            </span>
                            <span>•</span>
                            <span>Qty: <strong className="text-black">{q.quantity}</strong></span>
                            <span>•</span>
                            <span>Loft: <strong className="text-black">{q.hasLoft ? "Yes" : "No"}</strong></span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#009886]" />
                              <span>{q.city}</span>
                            </span>
                          </div>

                          {q.notes && (
                            <p className="text-[11px] bg-[#f8fdfc] p-2 rounded-xl text-black/80 border border-[#e6f7f5] mt-2">
                              <strong>Client Notes:</strong> {q.notes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Customer Info */}
                      <div className="flex flex-col sm:items-end gap-1 shrink-0">
                        <div className="text-xs sm:text-right text-black/80 space-y-0.5 bg-[#f8fdfc] p-3 rounded-2xl border border-[#e6f7f5]">
                          <div className="font-bold text-black">{q.clientName || "Customer"}</div>
                          <div className="text-[11px] text-black/60 font-mono">{q.clientPhone || "+91 85319 92626"}</div>
                          <div className="text-[11px] text-black/60">{q.clientEmail || "user@smcclient.com"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Direct Actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <a
                        href={`https://wa.me/${(q.clientPhone || "918531992626").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${q.clientName || "Sir/Madam"}, this is SMC Fabrications regarding your quotation ${q.id} for ${q.productName} (${q.dimensions}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Chat With Client On WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          if (confirm(`Delete quote ${q.id}?`)) {
                            deleteQuote(q.id);
                          }
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                        title="Delete quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: USER DETAILS                        */}
        {/* ========================================== */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-[#e6f7f5] flex items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search registered user name, email, phone..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                />
              </div>
              <span className="text-xs font-bold text-black/60">
                Total Users: {filteredUsers.length}
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-[#e6f7f5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fdfc] border-b border-[#e6f7f5] text-black/60 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Email / Gmail</th>
                      <th className="p-4">Phone / WhatsApp</th>
                      <th className="p-4">City / Region</th>
                      <th className="p-4">Registered Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e6f7f5]">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#f8fdfc] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-black">{u.name}</div>
                          <span className="font-mono text-[10px] text-black/40">{u.id}</span>
                        </td>
                        <td className="p-4 font-medium text-black/80">{u.email}</td>
                        <td className="p-4 font-mono font-semibold text-black/80">
                          {u.phone || "—"}
                        </td>
                        <td className="p-4 text-black/80">{u.city || "Pollachi"}</td>
                        <td className="p-4 text-black/60">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {u.phone && (
                              <a
                                href={`https://wa.me/${u.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Hello ${u.name}, greeting from SMC Fabrications Pollachi!`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] rounded-lg transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                              </a>
                            )}
                            <button
                              onClick={() => {
                                if (confirm(`Remove user ${u.name}?`)) {
                                  deleteUser(u.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: CONTACT INQUIRIES                   */}
        {/* ========================================== */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-[#e6f7f5] flex items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-black/40 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search inquiries by name, subject, message..."
                  className="w-full pl-9 pr-3 py-1.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                />
              </div>

              <span className="text-xs font-bold text-black/60">
                Total Inquiries: {inquiries.length}
              </span>
            </div>

            <div className="space-y-3">
              {inquiries.filter((inq) => {
                const qString = searchQuery.toLowerCase();
                return (
                  !searchQuery ||
                  inq.name.toLowerCase().includes(qString) ||
                  inq.email.toLowerCase().includes(qString) ||
                  inq.subject.toLowerCase().includes(qString) ||
                  inq.message.toLowerCase().includes(qString)
                );
              }).map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-3xl border border-[#e6f7f5] p-5 sm:p-6 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e6f7f5] pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#009886]">{inq.id}</span>
                      <span className="text-xs bg-[#e6f7f5] text-[#009886] font-bold px-2 py-0.5 rounded-md">
                        {inq.subject}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-black/50">
                        {new Date(inq.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-black/80 leading-relaxed bg-[#f8fdfc] p-3 rounded-2xl border border-[#e6f7f5]">
                    {inq.message}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/70">
                      <span className="font-bold text-black">{inq.name}</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-[#009886]" />
                        <span>{inq.email}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3.5 h-3.5 text-[#009886]" />
                        <span>{inq.phone}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${inq.name}, thanking you for contacting SMC Fabrications regarding ${inq.subject}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Delete inquiry from ${inq.name}?`)) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: PRODUCT HANDLING                    */}
        {/* ========================================== */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#e6f7f5] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-black/40 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search product name, SKU, material..."
                    className="w-full pl-9 pr-3 py-1.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-semibold focus:outline-none"
                >
                  <option value="all">All Categories ({products.length})</option>
                  <option value="main-entrance-doors">Main Entrance Doors</option>
                  <option value="interior-doors">Interior Doors</option>
                  <option value="sliding-doors">Sliding Doors</option>
                  <option value="upvc-windows">UPVC Windows</option>
                  <option value="aluminium-windows">Aluminium Windows</option>
                  <option value="custom-solutions">Custom Solutions</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetProducts}
                  className="px-3 py-1.5 bg-white hover:bg-[#e6f7f5] text-black/70 text-xs font-bold rounded-xl border border-[#e6f7f5] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Reset to factory catalog defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#009886]" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  onClick={() => handleOpenProductModal()}
                  className="px-4 py-2 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-3xl border border-[#e6f7f5] p-5 shadow-xs space-y-4 hover:border-[#009886]/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Image & Badges */}
                    <div className="relative h-44 bg-[#f8fdfc] rounded-2xl border border-[#e6f7f5] p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={prod.transparentPngUrl || prod.images[0] || "/images/product-pivot-door.png"}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2.5 left-2.5 text-[9px] font-mono font-bold bg-black/80 text-white px-2 py-0.5 rounded-md">
                        {prod.sku}
                      </span>
                      {prod.featured && (
                        <span className="absolute top-2.5 right-2.5 text-[9px] font-bold bg-[#009886] text-white px-2 py-0.5 rounded-md">
                          Featured
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#0070ba] block uppercase">
                        {prod.categoryName || prod.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-black line-clamp-1 mt-0.5">
                        {prod.name}
                      </h3>
                      <p className="text-[11px] text-black/60 line-clamp-2 mt-1">
                        {prod.tagline || prod.shortDescription}
                      </p>
                    </div>

                    {/* SIZES SUMMARY */}
                    <div className="p-2.5 bg-[#f8fdfc] rounded-xl border border-[#e6f7f5] space-y-1 text-[11px] text-black/70">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-black/50">Standard Size:</span>
                        <strong className="text-black">
                          {prod.dimensions.standardWidthMm} × {prod.dimensions.standardHeightMm} mm
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-black/60">
                        <span>Min/Max Width:</span>
                        <span>{prod.dimensions.minWidthMm} - {prod.dimensions.maxWidthMm} mm</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-black/60">
                        <span>Min/Max Height:</span>
                        <span>{prod.dimensions.minHeightMm} - {prod.dimensions.maxHeightMm} mm</span>
                      </div>
                    </div>

                    {/* FINISHES / COLORS SWATCHES */}
                    <div>
                      <span className="text-[10px] font-bold text-black/50 block mb-1.5 uppercase">
                        Finishes ({prod.finishes.length} Colors):
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {prod.finishes.slice(0, 6).map((fin) => (
                          <div
                            key={fin.id}
                            className="w-5 h-5 rounded-full border border-black/20 shadow-xs"
                            style={{ backgroundColor: fin.hex }}
                            title={`${fin.name} (${fin.textureLabel})`}
                          />
                        ))}
                        {prod.finishes.length > 6 && (
                          <span className="text-[10px] font-mono text-black/50">
                            +{prod.finishes.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Product Card Bottom Actions */}
                  <div className="pt-3 border-t border-[#e6f7f5] flex items-center justify-between">
                    <button
                      onClick={() => toggleFeatured(prod.id)}
                      className={cn(
                        "text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors cursor-pointer",
                        prod.featured
                          ? "bg-[#e6f7f5] text-[#009886] border-[#009886]/30"
                          : "bg-[#f8fdfc] text-black/40 border-[#e6f7f5]"
                      )}
                    >
                      {prod.featured ? "★ Featured" : "☆ Set Featured"}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="px-3 py-1.5 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Product</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete product ${prod.name}?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PRODUCT EDITING / CREATION MODAL          */}
        {/* ========================================== */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-[#009886]/20 overflow-hidden my-6">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#009886] to-[#006e61] text-white p-5 sm:p-6 relative">
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#a3f3eb] font-bold block">
                  Product Catalogue Engine
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                  {editingProductId ? `Edit Product: ${productFormData.name}` : "Add New Door / Window Product"}
                </h2>
              </div>

              {/* Modal Subtabs (Basic, Sizes, Images, Colors) */}
              <div className="flex border-b border-[#e6f7f5] bg-[#f8fdfc] overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setProductFormTab("basic")}
                  className={cn(
                    "flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 flex items-center justify-center gap-1.5",
                    productFormTab === "basic"
                      ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                      : "border-transparent text-black/60 hover:text-black"
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>1. Basic Info</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProductFormTab("sizes")}
                  className={cn(
                    "flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 flex items-center justify-center gap-1.5",
                    productFormTab === "sizes"
                      ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                      : "border-transparent text-black/60 hover:text-black"
                  )}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>2. Size Handling</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProductFormTab("images")}
                  className={cn(
                    "flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 flex items-center justify-center gap-1.5",
                    productFormTab === "images"
                      ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                      : "border-transparent text-black/60 hover:text-black"
                  )}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>3. Image Handling</span>
                </button>

                <button
                  type="button"
                  onClick={() => setProductFormTab("colors")}
                  className={cn(
                    "flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 shrink-0 flex items-center justify-center gap-1.5",
                    productFormTab === "colors"
                      ? "border-[#009886] text-[#009886] bg-white font-extrabold"
                      : "border-transparent text-black/60 hover:text-black"
                  )}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>4. Colors & Finishes</span>
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSaveProduct} className="p-6 space-y-4 max-h-[68vh] overflow-y-auto">
                {/* SUBTAB 1: BASIC INFO */}
                {productFormTab === "basic" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Product Name <span className="text-[#009886]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={productFormData.name}
                          onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                          placeholder="e.g. Modern UPVC Sliding Glass Window"
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Product SKU Code <span className="text-[#009886]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={productFormData.sku}
                          onChange={(e) => setProductFormData({ ...productFormData, sku: e.target.value })}
                          placeholder="e.g. SMC-WIN-SLD-01"
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886] font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Category <span className="text-[#009886]">*</span>
                        </label>
                        <select
                          value={productFormData.category}
                          onChange={(e) => {
                            const cat = e.target.value as ProductCategory;
                            const catName = e.target.options[e.target.selectedIndex].text;
                            setProductFormData({
                              ...productFormData,
                              category: cat,
                              categoryName: catName,
                            });
                          }}
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        >
                          <option value="main-entrance-doors">Main Entrance Doors</option>
                          <option value="interior-doors">Interior Doors</option>
                          <option value="sliding-doors">Sliding Doors</option>
                          <option value="upvc-windows">UPVC Windows</option>
                          <option value="aluminium-windows">Aluminium Windows</option>
                          <option value="custom-solutions">Custom Solutions</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Material Type
                        </label>
                        <select
                          value={productFormData.material}
                          onChange={(e) => setProductFormData({ ...productFormData, material: e.target.value as MaterialType })}
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        >
                          <option value="Precision UPVC">Precision UPVC</option>
                          <option value="Thermal-Break Aluminium">Thermal-Break Aluminium</option>
                          <option value="Solid Seasoned Timber">Solid Seasoned Timber</option>
                          <option value="Composite Wood-Aluminium">Composite Wood-Aluminium</option>
                          <option value="Architectural Bronze & Steel">Architectural Bronze & Steel</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Opening Mechanism
                        </label>
                        <select
                          value={productFormData.openingType}
                          onChange={(e) => setProductFormData({ ...productFormData, openingType: e.target.value as OpeningMechanism })}
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        >
                          <option value="Pivot System">Pivot System</option>
                          <option value="Hinged Casement">Hinged Casement</option>
                          <option value="Multi-Slide Telescopic">Multi-Slide Telescopic</option>
                          <option value="Tilt & Turn">Tilt & Turn</option>
                          <option value="Bi-Folding System">Bi-Folding System</option>
                          <option value="Fixed Architectural Picture">Fixed Architectural Picture</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-black/70 block mb-1">
                        Marketing Tagline
                      </label>
                      <input
                        type="text"
                        value={productFormData.tagline}
                        onChange={(e) => setProductFormData({ ...productFormData, tagline: e.target.value })}
                        placeholder="e.g. High-performance architectural sliding system with whisper-quiet rollers"
                        className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-black/70 block mb-1">
                        Short Description
                      </label>
                      <textarea
                        rows={2}
                        value={productFormData.shortDescription}
                        onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                        placeholder="Key architectural highlights and technical features..."
                        className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                      />
                    </div>
                  </div>
                )}

                {/* SUBTAB 2: SIZE HANDLING */}
                {productFormTab === "sizes" && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#f0f7fd] border border-[#d6e8f7] rounded-2xl text-xs text-[#0070ba] flex items-center gap-2">
                      <Ruler className="w-4 h-4 shrink-0" />
                      <span>Configure laser measurement boundary dimensions used in Studio 2D/3D visualizer and custom quotes.</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Standard Width (mm) <span className="text-[#009886]">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          value={productFormData.dimensions.standardWidthMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                standardWidthMm: parseInt(e.target.value) || 1800,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Standard Height (mm) <span className="text-[#009886]">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          value={productFormData.dimensions.standardHeightMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                standardHeightMm: parseInt(e.target.value) || 2400,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Min Width (mm)
                        </label>
                        <input
                          type="number"
                          value={productFormData.dimensions.minWidthMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                minWidthMm: parseInt(e.target.value) || 800,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Max Width (mm)
                        </label>
                        <input
                          type="number"
                          value={productFormData.dimensions.maxWidthMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                maxWidthMm: parseInt(e.target.value) || 3600,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Min Height (mm)
                        </label>
                        <input
                          type="number"
                          value={productFormData.dimensions.minHeightMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                minHeightMm: parseInt(e.target.value) || 1200,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-black/70 block mb-1">
                          Max Height (mm)
                        </label>
                        <input
                          type="number"
                          value={productFormData.dimensions.maxHeightMm}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              dimensions: {
                                ...productFormData.dimensions,
                                maxHeightMm: parseInt(e.target.value) || 4500,
                              },
                            })
                          }
                          className="w-full p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-black/70 block mb-1">
                        Profile Frame Depth (mm)
                      </label>
                      <input
                        type="number"
                        value={productFormData.dimensions.depthMm}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            dimensions: {
                              ...productFormData.dimensions,
                              depthMm: parseInt(e.target.value) || 85,
                            },
                          })
                        }
                        className="w-full sm:w-48 p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                      />
                    </div>
                  </div>
                )}

                {/* SUBTAB 3: IMAGE HANDLING */}
                {productFormTab === "images" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-black/70 block mb-1">
                        Transparent PNG URL (Visualizer Overlay) <span className="text-[#009886]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={productFormData.transparentPngUrl || ""}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              transparentPngUrl: e.target.value,
                            })
                          }
                          placeholder="/images/product-pivot-door.png or https://..."
                          className="flex-1 p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        />
                      </div>
                      <p className="text-[10px] text-black/50 mt-1">
                        This transparent image is automatically rendered on top of room walls in the Studio Visualizer.
                      </p>
                    </div>

                    {/* Gallery Images List */}
                    <div>
                      <label className="text-xs font-bold text-black/70 block mb-2">
                        Product Gallery Images ({productFormData.images.length})
                      </label>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                        {productFormData.images.map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 bg-[#f8fdfc] rounded-2xl border border-[#e6f7f5] p-1 flex items-center justify-center overflow-hidden group shadow-xs"
                          >
                            <img
                              src={imgUrl}
                              alt="Gallery preview"
                              className="max-h-full max-w-full object-contain"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Remove image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add Image URL */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="Paste image URL (e.g. /images/door-pivot.png or https://...)"
                          className="flex-1 p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                        />
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="px-4 py-2 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Add Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUBTAB 4: COLOR & FINISHES HANDLING */}
                {productFormTab === "colors" && (
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e6f7f5] rounded-2xl border border-[#009886]/30 text-xs text-[#009886] flex items-center gap-2">
                      <Palette className="w-4 h-4 shrink-0" />
                      <span>Configure Woodgrain textures, Powder coat colors, and RAL swatches available for this product.</span>
                    </div>

                    {/* Current Finishes List */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-black/70 block">
                        Assigned Color Finishes ({productFormData.finishes.length}):
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {productFormData.finishes.map((fin) => (
                          <div
                            key={fin.id}
                            className="p-2.5 bg-[#f8fdfc] border border-[#e6f7f5] rounded-2xl flex items-center justify-between gap-3 shadow-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-xl border border-black/20 shrink-0 shadow-inner"
                                style={{ backgroundColor: fin.hex }}
                              />
                              <div>
                                <h5 className="text-xs font-bold text-black">{fin.name}</h5>
                                <span className="text-[10px] text-black/50 block font-mono">
                                  {fin.hex} • {fin.textureLabel}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveColorFinish(fin.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete finish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add New Finish Form */}
                    <div className="p-4 bg-[#f8fdfc] rounded-2xl border border-[#e6f7f5] space-y-3">
                      <h4 className="text-xs font-extrabold text-black flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5 text-[#009886]" />
                        <span>Add New Color / Texture Finish</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-black/70 block mb-1">
                            Color Name
                          </label>
                          <input
                            type="text"
                            value={newColorName}
                            onChange={(e) => setNewColorName(e.target.value)}
                            placeholder="e.g. Heritage Walnut"
                            className="w-full p-2 bg-white border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-black/70 block mb-1">
                            Hex Color Code
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={newColorHex}
                              onChange={(e) => setNewColorHex(e.target.value)}
                              className="w-8 h-8 p-0 border-0 rounded-lg cursor-pointer shrink-0"
                            />
                            <input
                              type="text"
                              value={newColorHex}
                              onChange={(e) => setNewColorHex(e.target.value)}
                              placeholder="#b8783b"
                              className="w-full p-2 bg-white border border-[#e6f7f5] rounded-xl text-xs text-black font-mono focus:outline-none focus:border-[#009886]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-black/70 block mb-1">
                            Texture / Finish Label
                          </label>
                          <input
                            type="text"
                            value={newColorTexture}
                            onChange={(e) => setNewColorTexture(e.target.value)}
                            placeholder="e.g. Deep Textured Grain"
                            className="w-full p-2 bg-white border border-[#e6f7f5] rounded-xl text-xs text-black focus:outline-none focus:border-[#009886]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddColorFinish}
                        className="px-4 py-2 bg-[#009886] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Finish to Product</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-[#e6f7f5] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-black/60 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2">
                    {productFormTab !== "colors" && (
                      <button
                        type="button"
                        onClick={() => {
                          if (productFormTab === "basic") setProductFormTab("sizes");
                          else if (productFormTab === "sizes") setProductFormTab("images");
                          else if (productFormTab === "images") setProductFormTab("colors");
                        }}
                        className="px-4 py-2 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white text-[#009886] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Next Step →
                      </button>
                    )}

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingProductId ? "Save Product Changes" : "Create & Publish Product"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* IMAGE PREVIEW LIGHTBOX MODAL               */}
        {/* ========================================== */}
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
          >
            <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-3xl p-3 border-2 border-white/20 shadow-2xl overflow-hidden">
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={previewImage}
                alt="Room canvas preview"
                className="max-w-full max-h-[78vh] object-contain rounded-2xl"
              />
              <div className="text-center pt-2 text-xs font-bold text-black/70">
                Customer Visualizer Room & Door Specification Snapshot
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

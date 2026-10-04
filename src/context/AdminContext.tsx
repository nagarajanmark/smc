"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, ColorFinishOption, ProductDimensions } from "@/types/product";
import { UserProfile, QuoteRecord } from "@/types/auth";
import { ContactInquiry, AdminQuoteRecord } from "@/types/admin";
import { PRODUCTS_DATA, UPVC_SWATCH_FINISHES } from "@/data/products";

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;

  // Users
  users: UserProfile[];
  addUser: (user: UserProfile) => void;
  deleteUser: (id: string) => void;

  // Contact Inquiries
  inquiries: ContactInquiry[];
  addInquiry: (inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">) => ContactInquiry;
  updateInquiryStatus: (id: string, status: ContactInquiry["status"]) => void;
  deleteInquiry: (id: string) => void;

  // Quotes
  quotes: AdminQuoteRecord[];
  updateQuoteStatus: (id: string, status: string) => void;
  updateQuotePrice: (id: string, price: string) => void;
  updateQuoteNotes: (id: string, adminNotes: string) => void;
  deleteQuote: (id: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetProducts: () => void;
}

const INITIAL_USERS: UserProfile[] = [
  {
    id: "usr_01",
    name: "Karthik Subramanian",
    email: "karthik@gmail.com",
    phone: "+91 98421 55678",
    city: "Pollachi, Coimbatore",
    createdAt: "2026-09-15T10:00:00Z",
  },
  {
    id: "usr_02",
    name: "Architect Priya Sharma",
    email: "priya.designs@gmail.com",
    phone: "+91 94432 11098",
    city: "Coimbatore",
    createdAt: "2026-09-20T14:30:00Z",
  },
  {
    id: "usr_03",
    name: "Ramesh Kumar",
    email: "ramesh.kumar@gmail.com",
    phone: "+91 85319 92626",
    city: "Udumalpet, Pollachi",
    createdAt: "2026-10-01T11:20:00Z",
  },
  {
    id: "usr_04",
    name: "Manoj Sundaram",
    email: "manoj.builders@yahoo.com",
    phone: "+91 97890 44321",
    city: "Tiruppur",
    createdAt: "2026-10-03T16:45:00Z",
  },
];

const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: "INQ-2026-881",
    name: "Architect Priya Sharma",
    email: "priya.designs@gmail.com",
    phone: "+91 94432 11098",
    subject: "Architectural Partnership",
    message: "We have an ongoing 12,000 sq.ft private villa project in Pollachi. We need soundproof acoustic UPVC sliding doors and pivot entrance portal specifications with warranty certification.",
    createdAt: "2026-10-02T15:30:00Z",
    status: "New",
  },
  {
    id: "INQ-2026-754",
    name: "Manoj Sundaram (MS Builders)",
    email: "manoj.builders@yahoo.com",
    phone: "+91 97890 44321",
    subject: "Dealer & Trade Inquiry",
    message: "Looking for wholesale supply of D Wood UPVC window profiles and casement assemblies for a gated residential community in Tiruppur.",
    createdAt: "2026-09-28T11:15:00Z",
    status: "In Discussion",
  },
  {
    id: "INQ-2026-619",
    name: "Anand Rajan",
    email: "anand.rajan@gmail.com",
    phone: "+91 98940 33211",
    subject: "Studio Visit & Consultation",
    message: "Would like to book a plant visit to your Pollachi facility this Saturday to inspect Golden Oak UPVC finish quality.",
    createdAt: "2026-09-25T09:40:00Z",
    status: "Resolved",
  },
];

const INITIAL_ADMIN_QUOTES: AdminQuoteRecord[] = [
  {
    id: "SMC-QT-419082",
    userId: "usr_01",
    clientName: "Karthik Subramanian",
    clientEmail: "karthik@gmail.com",
    clientPhone: "+91 98421 55678",
    createdAt: "2026-10-01T09:15:00Z",
    productName: "Luxury Teak Finish UPVC Main Entrance Door",
    projectType: "Luxury Private Villa",
    dimensions: "1980 mm (6.5 ft) × 2440 mm (8 ft)",
    quantity: 1,
    hasLoft: true,
    status: "Site Survey Scheduled",
    city: "Pollachi",
    notes: "Golden Oak Finish with multi-point lock. Laser measurement scheduled.",
    estimatedPrice: "₹ 85,000",
    image: "/images/product-pivot-door.png",
  },
  {
    id: "SMC-QT-631980",
    userId: "usr_01",
    clientName: "Karthik Subramanian",
    clientEmail: "karthik@gmail.com",
    clientPhone: "+91 98421 55678",
    createdAt: "2026-09-24T14:30:00Z",
    productName: "Precision UPVC Soundproof Casement Window",
    projectType: "Residential House",
    dimensions: "1830 mm (6 ft) × 2135 mm (7 ft)",
    quantity: 4,
    hasLoft: false,
    status: "Estimation Ready",
    city: "Pollachi",
    notes: "Soundproof double glazed glass with integrated SS mosquito mesh.",
    estimatedPrice: "₹ 1,42,000",
    image: "/images/upvc-window.png",
  },
  {
    id: "SMC-QT-902145",
    userId: "usr_03",
    clientName: "Ramesh Kumar",
    clientEmail: "ramesh.kumar@gmail.com",
    clientPhone: "+91 85319 92626",
    createdAt: "2026-10-04T04:20:00Z",
    productName: "Monolith Oversized Architectural Pivot Door",
    projectType: "Visualizer Custom Specification",
    dimensions: "6.5 ft × 7.5 ft",
    quantity: 1,
    hasLoft: false,
    status: "Under Review",
    city: "Pollachi",
    notes: "Finish: Golden Oak. Soundproof glass required.",
    estimatedPrice: "₹ 1,15,000",
    image: "/images/product-pivot-door.png",
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("smc_admin_auth") === "true";
    } catch {
      return false;
    }
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    if (typeof window === "undefined") return INITIAL_USERS;
    try {
      const stored = localStorage.getItem("smc_admin_users");
      return stored ? JSON.parse(stored) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    if (typeof window === "undefined") return INITIAL_INQUIRIES;
    try {
      const stored = localStorage.getItem("smc_admin_inquiries");
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [quotes, setQuotes] = useState<AdminQuoteRecord[]>(() => {
    if (typeof window === "undefined") return INITIAL_ADMIN_QUOTES;
    try {
      // Merge with user quotes if available
      const storedAdmin = localStorage.getItem("smc_admin_quotes");
      const storedUserQuotes = localStorage.getItem("smc_user_quotes");
      const userQ: QuoteRecord[] = storedUserQuotes ? JSON.parse(storedUserQuotes) : [];
      
      const adminQ: AdminQuoteRecord[] = storedAdmin ? JSON.parse(storedAdmin) : INITIAL_ADMIN_QUOTES;
      
      // Combine unique by ID
      const map = new Map<string, AdminQuoteRecord>();
      adminQ.forEach((q) => map.set(q.id, q));
      userQ.forEach((q) => {
        if (!map.has(q.id)) {
          map.set(q.id, {
            ...q,
            clientName: "Registered User",
            clientPhone: "+91 85319 92626",
            status: q.status || "Under Review",
          });
        }
      });
      return Array.from(map.values());
    } catch {
      return INITIAL_ADMIN_QUOTES;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return PRODUCTS_DATA;
    try {
      const stored = localStorage.getItem("smc_admin_products");
      return stored ? JSON.parse(stored) : PRODUCTS_DATA;
    } catch {
      return PRODUCTS_DATA;
    }
  });

  // Save changes to LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_admin_users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_admin_inquiries", JSON.stringify(inquiries));
    }
  }, [inquiries]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_admin_quotes", JSON.stringify(quotes));
    }
  }, [quotes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_admin_products", JSON.stringify(products));
    }
  }, [products]);

  const adminLogin = (pin: string): boolean => {
    // Accepts "admin", "admin123", "smc2026", or demo direct unlock
    const valid = ["admin", "admin123", "smc2026", "smc", "1234"].includes(pin.trim().toLowerCase());
    if (valid) {
      setIsAdminAuthenticated(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("smc_admin_auth", "true");
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("smc_admin_auth");
    }
  };

  // User Actions
  const addUser = (newUser: UserProfile) => {
    setUsers((prev) => [newUser, ...prev.filter((u) => u.id !== newUser.id && u.email !== newUser.email)]);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Contact Inquiries Actions
  const addInquiry = (inquiryData: Omit<ContactInquiry, "id" | "createdAt" | "status">): ContactInquiry => {
    const newInquiry: ContactInquiry = {
      ...inquiryData,
      id: `INQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: "New",
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: ContactInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
  };

  // Quote Actions
  const updateQuoteStatus = (id: string, status: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q))
    );
    // Also sync to user quotes if present
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("smc_user_quotes");
        if (stored) {
          const userQ: QuoteRecord[] = JSON.parse(stored);
          const updated = userQ.map((q) => (q.id === id ? { ...q, status } : q));
          localStorage.setItem("smc_user_quotes", JSON.stringify(updated));
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateQuotePrice = (id: string, price: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, estimatedPrice: price, updatedAt: new Date().toISOString() } : q))
    );
  };

  const updateQuoteNotes = (id: string, adminNotes: string) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, adminNotes, updatedAt: new Date().toISOString() } : q))
    );
  };

  const deleteQuote = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  // Product Actions
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, ...updatedFields } : prod))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, featured: !prod.featured } : prod))
    );
  };

  const resetProducts = () => {
    setProducts(PRODUCTS_DATA);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        users,
        addUser,
        deleteUser,
        inquiries,
        addInquiry,
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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

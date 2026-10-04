"use client";

import React, { createContext, useContext, useState } from "react";
import { UserProfile, QuoteRecord, SavedItem } from "@/types/auth";

interface RegisterInput {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  password?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string) => Promise<boolean>;
  loginDemo: () => void;
  register: (data: RegisterInput) => Promise<boolean>;
  logout: () => void;
  // Quotes
  quotes: QuoteRecord[];
  addQuote: (quote: Omit<QuoteRecord, "id" | "userId" | "createdAt">) => QuoteRecord;
  // Wishlist / Saved items
  savedItems: SavedItem[];
  toggleSaveItem: (item: Omit<SavedItem, "id" | "savedAt">) => void;
  isItemSaved: (productId: string) => boolean;
  // Modal state
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
}

const DEMO_USER: UserProfile = {
  id: "usr_demo_01",
  name: "Karthik Subramanian",
  email: "karthik@gmail.com",
  phone: "+91 98421 55678",
  city: "Pollachi, Coimbatore",
  createdAt: "2026-08-15T10:00:00Z",
};

const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: "SMC-QT-419082",
    userId: "usr_demo_01",
    createdAt: "2026-10-01T09:15:00Z",
    productName: "Luxury Teak Finish UPVC Main Entrance Door",
    projectType: "Luxury Private Villa",
    dimensions: "1980 mm (6.5 ft) × 2440 mm (8 ft)",
    quantity: 1,
    hasLoft: true,
    status: "Site Survey Scheduled",
    city: "Pollachi",
    notes: "Free laser measurement visit confirmed for Saturday morning.",
  },
  {
    id: "SMC-QT-631980",
    userId: "usr_demo_01",
    createdAt: "2026-09-24T14:30:00Z",
    productName: "Precision UPVC Soundproof Casement Window",
    projectType: "Residential House",
    dimensions: "1830 mm (6 ft) × 2135 mm (7 ft)",
    quantity: 4,
    hasLoft: false,
    status: "Under Review",
    city: "Pollachi",
    notes: "Multi-point locking hardware with mosquito mesh sash.",
  },
];

const INITIAL_SAVED_ITEMS: SavedItem[] = [
  {
    id: "sav_01",
    productId: "smc-upvc-casement-window",
    productName: "SMC Supreme UPVC Casement Window",
    category: "upvc-windows",
    sku: "SMC-WIN-CSM-01",
    image: "/images/products/upvc-window.png",
    savedAt: "2026-09-30T10:00:00Z",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("smc_auth_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const [quotes, setQuotes] = useState<QuoteRecord[]>(() => {
    if (typeof window === "undefined") return INITIAL_QUOTES;
    try {
      const stored = localStorage.getItem("smc_user_quotes");
      return stored ? JSON.parse(stored) : INITIAL_QUOTES;
    } catch {
      return INITIAL_QUOTES;
    }
  });

  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    if (typeof window === "undefined") return INITIAL_SAVED_ITEMS;
    try {
      const stored = localStorage.getItem("smc_saved_items");
      return stored ? JSON.parse(stored) : INITIAL_SAVED_ITEMS;
    } catch {
      return INITIAL_SAVED_ITEMS;
    }
  });

  // Modal Control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  const saveUserToStorage = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
        localStorage.setItem("smc_auth_user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("smc_auth_user");
      }
    }
  };

  const loginDemo = () => {
    saveUserToStorage(DEMO_USER);
    closeAuthModal();
  };

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const loggedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim() || "Customer",
      email: email,
      phone: "+91 98421 55678",
      city: "Pollachi, Tamil Nadu",
      createdAt: new Date().toISOString(),
    };

    saveUserToStorage(loggedUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const register = async (data: RegisterInput): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      city: data.city || "Pollachi",
      createdAt: new Date().toISOString(),
    };

    saveUserToStorage(newUser);
    setIsLoading(false);
    closeAuthModal();
    return true;
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const addQuote = (quoteData: Omit<QuoteRecord, "id" | "userId" | "createdAt">): QuoteRecord => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const newQuote: QuoteRecord = {
      ...quoteData,
      id: `SMC-QT-${randomCode}`,
      userId: user?.id || "guest",
      createdAt: new Date().toISOString(),
    };

    const updated = [newQuote, ...quotes];
    setQuotes(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_user_quotes", JSON.stringify(updated));
    }
    return newQuote;
  };

  const toggleSaveItem = (itemData: Omit<SavedItem, "id" | "savedAt">) => {
    const exists = savedItems.some((s) => s.productId === itemData.productId);
    let updated: SavedItem[];

    if (exists) {
      updated = savedItems.filter((s) => s.productId !== itemData.productId);
    } else {
      const newItem: SavedItem = {
        ...itemData,
        id: `sav_${Date.now()}`,
        savedAt: new Date().toISOString(),
      };
      updated = [newItem, ...savedItems];
    }

    setSavedItems(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("smc_saved_items", JSON.stringify(updated));
    }
  };

  const isItemSaved = (productId: string): boolean => {
    return savedItems.some((s) => s.productId === productId);
  };

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginDemo,
        register,
        logout,
        quotes,
        addQuote,
        savedItems,
        toggleSaveItem,
        isItemSaved,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

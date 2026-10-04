"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AdminProvider } from "@/context/AdminContext";
import { AuthModal } from "@/components/auth/AuthModal";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminProvider>
        {children}
        <AuthModal />
      </AdminProvider>
    </AuthProvider>
  );
}

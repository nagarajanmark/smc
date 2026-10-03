import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "light" | "black" | "outline";
  className?: string;
}

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  const variants = {
    primary: "bg-[#0070bc] text-white border-[#0070bc]",
    light: "bg-[#e6f4fd] text-[#0070bc] border-[#0070bc]/30",
    black: "bg-black text-white border-black",
    outline: "bg-white text-black border-black/20",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs uppercase tracking-widest font-medium rounded-sm border transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl mb-12 lg:mb-16",
        isCenter ? "mx-auto text-center" : "",
        align === "right" ? "ml-auto text-right" : "",
        className
      )}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn("mb-3.5 flex items-center gap-2", isCenter ? "justify-center" : "")}
        >
          <span className="w-6 h-[2px] bg-[#0070bc]" />
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#0070bc]">
            {badge}
          </span>
          {isCenter && <span className="w-6 h-[2px] bg-[#0070bc]" />}
        </motion.div>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs uppercase tracking-widest font-mono mb-2 text-[#0070bc]"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] text-black"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-black/75"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

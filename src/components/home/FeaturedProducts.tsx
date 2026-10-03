"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/common/SectionHeading";

export function FeaturedProducts() {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "doors" | "windows">("all");

  const featured = PRODUCTS_DATA.filter((p) => p.featured);

  const displayedProducts = featured.filter((p) => {
    if (selectedFilter === "doors") return p.category.includes("door");
    if (selectedFilter === "windows") return p.category.includes("window");
    return true;
  });

  return (
    <section className="py-24 bg-white border-t border-[#e6f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Signature Portfolio"
            title="Featured Architectural Systems"
            subtitle="Precision Engineering • Bespoke Craftsmanship"
            description="Our most sought-after entrance portals, panoramic glass walls, and high-efficiency window solutions."
            className="mb-0 max-w-2xl"
          />

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-[#e6f7f5] p-1 rounded-sm self-start md:self-auto border border-[#009886]/20">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors ${
                selectedFilter === "all"
                  ? "bg-[#009886] text-white"
                  : "text-black hover:text-[#009886]"
              }`}
            >
              All Systems
            </button>
            <button
              onClick={() => setSelectedFilter("doors")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors ${
                selectedFilter === "doors"
                  ? "bg-[#009886] text-white"
                  : "text-black hover:text-[#009886]"
              }`}
            >
              Door Systems
            </button>
            <button
              onClick={() => setSelectedFilter("windows")}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-xs transition-colors ${
                selectedFilter === "windows"
                  ? "bg-[#009886] text-white"
                  : "text-black hover:text-[#009886]"
              }`}
            >
              Window Systems
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode="grid" />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e6f7f5] hover:bg-[#009886] text-xs uppercase tracking-[0.2em] font-bold text-black hover:text-white border border-[#009886]/30 rounded-sm transition-all shadow-xs"
          >
            <span>Explore All 8 Engineered Systems</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

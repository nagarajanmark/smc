"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS_DATA } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters, FilterState } from "@/components/products/ProductFilters";
import { SectionHeading } from "@/components/common/SectionHeading";
import { SearchX, RotateCcw } from "lucide-react";

function ProductCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    category: initialCategory,
    material: "all",
    openingType: "all",
    finishHex: "all",
    sortBy: "featured",
    viewMode: "grid",
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "all",
      material: "all",
      openingType: "all",
      finishHex: "all",
      sortBy: "featured",
      viewMode: "grid",
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // Search
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchSku = product.sku.toLowerCase().includes(query);
        const matchDesc = product.shortDescription.toLowerCase().includes(query);
        const matchMaterial = product.material.toLowerCase().includes(query);
        if (!matchName && !matchSku && !matchDesc && !matchMaterial) return false;
      }

      // Category
      if (filters.category !== "all") {
        if (filters.category === "doors") {
          if (!product.category.includes("door")) return false;
        } else if (filters.category === "windows") {
          if (!product.category.includes("window")) return false;
        } else if (product.category !== filters.category) {
          return false;
        }
      }

      // Material
      if (filters.material !== "all" && product.material !== filters.material) {
        return false;
      }

      // Opening Type
      if (
        filters.openingType !== "all" &&
        product.openingType !== filters.openingType
      ) {
        return false;
      }

      // Finish Hex
      if (filters.finishHex !== "all") {
        const hasFinish = product.finishes.some(
          (f) => f.hex.toLowerCase() === filters.finishHex.toLowerCase()
        );
        if (!hasFinish) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "newest") {
        return (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0);
      }
      if (filters.sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (filters.sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      // "featured" default
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f4fd] pb-8 mb-8">
          <SectionHeading
            badge="Architectural Catalogue"
            title="Engineered Doors & Windows Portfolio"
            subtitle="Precision Systems • 3D & AR Compatible"
            description="Explore our complete range of bespoke entrance doors, ultra-slim sliding systems, and thermal break aluminium & UPVC windows. Every model is available for 3D inspection and mobile camera room preview."
            className="mb-0"
          />
        </div>

        {/* Filter Controls Bar */}
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalCount={filteredProducts.length}
        />

        {/* Products Grid or List View */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              filters.viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                : "flex flex-col gap-6"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={filters.viewMode}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white border-2 border-[#e6f4fd] rounded-xl p-8 max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#e6f4fd] border border-[#0070bc] flex items-center justify-center mx-auto text-[#0070bc]">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-black">No Matching Systems Found</h3>
            <p className="text-xs text-black/70 leading-relaxed">
              We couldn’t find any products matching your specific combination of filters or search query.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0070bc] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductCataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white pt-32 text-center text-black text-xs font-bold">
          Loading Architectural Catalogue...
        </div>
      }
    >
      <ProductCatalogueContent />
    </Suspense>
  );
}

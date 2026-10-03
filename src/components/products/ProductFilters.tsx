"use client";

import React, { useState } from "react";
import { Search, X, SlidersHorizontal, LayoutGrid, List, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  searchQuery: string;
  category: string;
  material: string;
  openingType: string;
  finishHex: string;
  sortBy: "featured" | "newest" | "name-asc" | "name-desc";
  viewMode: "grid" | "list";
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export function ProductFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}: ProductFiltersProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Main Entrance Doors", value: "main-entrance-doors" },
    { label: "Sliding Doors", value: "sliding-doors" },
    { label: "Aluminium Windows", value: "aluminium-windows" },
    { label: "Wooden Doors", value: "wooden-doors" },
    { label: "UPVC Windows", value: "upvc-windows" },
    { label: "Interior Doors", value: "interior-doors" },
    { label: "Custom Solutions", value: "custom-solutions" },
  ];

  const materials = [
    { label: "All Materials", value: "all" },
    { label: "Thermal-Break Aluminium", value: "Thermal-Break Aluminium" },
    { label: "Solid Seasoned Timber", value: "Solid Seasoned Timber" },
    { label: "Precision UPVC", value: "Precision UPVC" },
    { label: "Composite Wood-Aluminium", value: "Composite Wood-Aluminium" },
    { label: "Architectural Bronze & Steel", value: "Architectural Bronze & Steel" },
  ];

  const openingTypes = [
    { label: "All Opening Types", value: "all" },
    { label: "Pivot System", value: "Pivot System" },
    { label: "Multi-Slide Telescopic", value: "Multi-Slide Telescopic" },
    { label: "Tilt & Turn", value: "Tilt & Turn" },
    { label: "Hinged Casement", value: "Hinged Casement" },
    { label: "Bi-Folding System", value: "Bi-Folding System" },
  ];

  const finishes = [
    { name: "All Finishes", hex: "all" },
    { name: "Obsidian Black", hex: "#000000" },
    { name: "Architectural Green", hex: "#009886" },
    { name: "Ice Mint Light", hex: "#e6f7f5" },
    { name: "Pure White", hex: "#ffffff" },
  ];

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.category !== "all" ||
    filters.material !== "all" ||
    filters.openingType !== "all" ||
    filters.finishHex !== "all";

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Search & Top Action Bar */}
      <div className="bg-white border-2 border-[#e6f7f5] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by product name, SKU or keyword..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#e6f7f5]/50 border border-[#e6f7f5] focus:border-[#009886] rounded-lg text-xs text-black placeholder-black/50 focus:outline-none transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & View Mode Controls */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Mobile Filters Trigger */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-[#e6f7f5] border border-[#009886] rounded-lg text-xs font-bold text-black"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#009886]" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-black/70 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-white border border-[#e6f7f5] text-xs text-black rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-[#009886]"
            >
              <option value="featured">Featured Systems</option>
              <option value="newest">Newest Releases</option>
              <option value="name-asc">Name (A – Z)</option>
              <option value="name-desc">Name (Z – A)</option>
            </select>
          </div>

          {/* Grid / List Toggle */}
          <div className="hidden sm:flex items-center bg-[#e6f7f5] border border-[#e6f7f5] rounded-lg p-0.5">
            <button
              onClick={() => onFilterChange({ viewMode: "grid" })}
              title="Grid View"
              className={cn(
                "p-1.5 rounded-md transition-colors",
                filters.viewMode === "grid"
                  ? "bg-[#009886] text-white"
                  : "text-black/60 hover:text-black"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onFilterChange({ viewMode: "list" })}
              title="List View"
              className={cn(
                "p-1.5 rounded-md transition-colors",
                filters.viewMode === "list"
                  ? "bg-[#009886] text-white"
                  : "text-black/60 hover:text-black"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Categories Bar (Desktop & Mobile) */}
      <div className="bg-white border-2 border-[#e6f7f5] rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((c) => {
            const isSelected = filters.category === c.value;
            return (
              <button
                key={c.value}
                onClick={() => onFilterChange({ category: c.value })}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer",
                  isSelected
                    ? "bg-[#009886] text-white shadow-xs"
                    : "bg-[#e6f7f5]/60 hover:bg-[#e6f7f5] text-black/80 hover:text-black"
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Active Filter Pills & Results Count */}
        <div className="mt-4 pt-3 border-t border-[#e6f7f5] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-black/70">
              Showing <strong className="text-black font-bold">{totalCount}</strong> systems
            </span>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-[#009886] font-bold hover:underline ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

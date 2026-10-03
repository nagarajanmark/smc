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
    { name: "Architectural Blue", hex: "#0070bc" },
    { name: "Ice Blue Light", hex: "#e6f4fd" },
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
      <div className="bg-white border-2 border-[#e6f4fd] rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search by product name, SKU or keyword..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#e6f4fd]/50 border border-[#e6f4fd] focus:border-[#0070bc] rounded-lg text-xs text-black placeholder-black/50 focus:outline-none transition-colors"
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
            className="md:hidden flex items-center gap-2 px-3 py-2 bg-[#e6f4fd] border border-[#0070bc] rounded-lg text-xs font-bold text-black"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0070bc]" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-black/70 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-white border border-[#e6f4fd] text-xs text-black rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-[#0070bc]"
            >
              <option value="featured">Featured Systems</option>
              <option value="newest">Newest Releases</option>
              <option value="name-asc">Name (A – Z)</option>
              <option value="name-desc">Name (Z – A)</option>
            </select>
          </div>

          {/* Grid / List Toggle */}
          <div className="hidden sm:flex items-center bg-[#e6f4fd] border border-[#e6f4fd] rounded-lg p-0.5">
            <button
              onClick={() => onFilterChange({ viewMode: "grid" })}
              title="Grid View"
              className={cn(
                "p-1.5 rounded-md transition-colors",
                filters.viewMode === "grid"
                  ? "bg-[#0070bc] text-white"
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
                  ? "bg-[#0070bc] text-white"
                  : "text-black/60 hover:text-black"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter Dropdowns Bar (Desktop & Expanded Mobile) */}
      <div
        className={cn(
          "bg-white border-2 border-[#e6f4fd] rounded-xl p-4 shadow-sm",
          isMobileFiltersOpen ? "block" : "hidden md:block"
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="text-[11px] font-mono text-black/70 font-bold uppercase block mb-1.5">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ category: e.target.value })}
              className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#0070bc]"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Material Filter */}
          <div>
            <label className="text-[11px] font-mono text-black/70 font-bold uppercase block mb-1.5">
              Core Material
            </label>
            <select
              value={filters.material}
              onChange={(e) => onFilterChange({ material: e.target.value })}
              className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#0070bc]"
            >
              {materials.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Opening Mechanism */}
          <div>
            <label className="text-[11px] font-mono text-black/70 font-bold uppercase block mb-1.5">
              Opening Mechanism
            </label>
            <select
              value={filters.openingType}
              onChange={(e) => onFilterChange({ openingType: e.target.value })}
              className="w-full bg-[#e6f4fd]/50 border border-[#e6f4fd] text-xs text-black font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-[#0070bc]"
            >
              {openingTypes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color & Finish Filter Swatches */}
          <div>
            <label className="text-[11px] font-mono text-black/70 font-bold uppercase block mb-1.5">
              Colour & Finish Swatch
            </label>
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {finishes.map((f) => {
                const isSelected = filters.finishHex === f.hex;
                return (
                  <button
                    key={f.hex}
                    onClick={() => onFilterChange({ finishHex: f.hex })}
                    title={f.name}
                    className={cn(
                      "w-6 h-6 rounded-full border transition-all flex items-center justify-center shadow-sm",
                      isSelected
                        ? "border-[#0070bc] ring-2 ring-[#0070bc]/50 scale-110"
                        : "border-black/20 hover:border-[#0070bc]",
                      f.hex === "all" ? "bg-gradient-to-r from-black via-[#0070bc] to-[#e6f4fd]" : ""
                    )}
                    style={f.hex !== "all" ? { backgroundColor: f.hex } : {}}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0070bc]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Filter Pills & Results Count */}
        <div className="mt-4 pt-3 border-t border-[#e6f4fd] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-black/70">
              Showing <strong className="text-black font-bold">{totalCount}</strong> systems
            </span>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-[11px] text-[#0070bc] font-bold hover:underline ml-2"
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

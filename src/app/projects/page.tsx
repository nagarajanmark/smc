"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA } from "@/data/projects";
import { ProjectItem } from "@/types/project";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  MapPin,
  ArrowRight,
  Maximize2,
  X,
} from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  const categories = [
    { label: "All Projects", value: "all" },
    { label: "Luxury Villas", value: "Luxury Villa" },
    { label: "Contemporary Residences", value: "Contemporary Residence" },
    { label: "High-Rise Penthouses", value: "High-Rise Penthouse" },
    { label: "Commercial Facades", value: "Commercial & Retail" },
    { label: "Heritage Restorations", value: "Heritage & Restoration" },
  ];

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory !== "all" && p.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="border-b border-[#e6f7f5] pb-8 mb-8">
          <SectionHeading
            badge="Architectural Portfolio"
            title="Realized Projects & Installations"
            subtitle="Contemporary Villas • Sky Penthouses • Flagships"
            description="Explore our curated gallery of commissioned doors, sliding glass walls, and facade installations. Every project illustrates custom engineering, laser survey precision, and bespoke materiality."
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg border transition-colors whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? "bg-[#009886] text-white border-[#009886]"
                    : "bg-[#e6f7f5] text-black hover:bg-[#009886] hover:text-white border-[#e6f7f5]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white border-2 border-[#e6f7f5] hover:border-[#009886] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Main Project Image */}
              <div
                onClick={() => setSelectedProjectModal(project)}
                className="relative w-full h-80 sm:h-96 overflow-hidden bg-[#e6f7f5] cursor-pointer"
              >
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border border-[#e6f7f5] text-xs uppercase font-mono font-bold tracking-wider text-[#009886] shadow-sm">
                    {project.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectModal(project);
                    }}
                    className="p-2 bg-white/90 hover:bg-white text-black rounded-lg border border-[#e6f7f5] transition-colors shadow-sm"
                    title="View Project Gallery"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="flex items-center gap-1.5 font-mono font-bold">
                    <MapPin className="w-3.5 h-3.5 text-[#e6f7f5]" />
                    {project.location}
                  </span>
                  <span className="font-mono text-white/80">{project.yearCompleted}</span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="text-2xl font-extrabold text-black group-hover:text-[#009886] transition-colors">
                    {project.title}
                  </h3>

                  {project.architect && (
                    <p className="text-xs text-black/70 mt-1 font-mono">
                      Architecture: <span className="text-black font-bold">{project.architect}</span>
                    </p>
                  )}

                  <p className="text-xs text-black/80 mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Installed Systems List */}
                  <div className="mt-6 pt-4 border-t border-[#e6f7f5] space-y-2">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#009886] block">
                      Manufactured Systems:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.installedProducts.map((prod, pIdx) => (
                        <Link
                          key={pIdx}
                          href="/products"
                          className="px-3 py-1 bg-[#e6f7f5] hover:bg-[#009886] hover:text-white border border-[#e6f7f5] text-[11px] text-black font-semibold rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span>{prod.productName}</span>
                          <ArrowRight className="w-3 h-3 text-[#009886] group-hover:text-white" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Testimonial / Architect Quote */}
                  {project.highlightQuote && (
                    <blockquote className="mt-4 p-3.5 bg-[#e6f7f5] border-l-4 border-[#009886] rounded-r-lg text-xs italic text-black/90 leading-relaxed font-medium">
                      &ldquo;{project.highlightQuote}&rdquo;
                    </blockquote>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-[#e6f7f5] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#009886] hover:text-black transition-colors"
                  >
                    <span>View Gallery & Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/request-quote?projectRef=${encodeURIComponent(project.title)}`}
                    className="px-4 py-2 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-sm"
                  >
                    Inquire Similar
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Gallery & Specifications Modal */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl bg-white border-2 border-[#e6f7f5] rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] z-10 p-6 sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-[#e6f7f5]">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#009886]">
                    Project Case Study • {selectedProjectModal.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-black mt-1">
                    {selectedProjectModal.title}
                  </h3>
                  <p className="text-xs text-black/70 mt-0.5">
                    {selectedProjectModal.location} &nbsp;|&nbsp; Completed in {selectedProjectModal.yearCompleted}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProjectModal(null)}
                  className="p-2 text-black/60 hover:text-black hover:bg-[#e6f7f5] rounded-lg"
                  aria-label="Close project modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {selectedProjectModal.galleryImages.map((img, gIdx) => (
                  <div
                    key={gIdx}
                    className="relative h-64 bg-[#e6f7f5] rounded-xl overflow-hidden border border-[#e6f7f5]"
                  >
                    <Image
                      src={img}
                      alt={`${selectedProjectModal.title} view ${gIdx + 1}`}
                      fill
                      sizes="500px"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>

              {/* Specifications Box */}
              <div className="p-4 bg-[#e6f7f5] border border-[#009886]/30 rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-black/60 font-semibold block">Glazing Package:</span>
                  <strong className="text-black block mt-0.5 font-bold">
                    {selectedProjectModal.specifications.glazingSystem}
                  </strong>
                </div>
                <div>
                  <span className="text-black/60 font-semibold block">Finish & Alloy:</span>
                  <strong className="text-black block mt-0.5 font-bold">
                    {selectedProjectModal.specifications.finishType}
                  </strong>
                </div>
                <div>
                  <span className="text-black/60 font-semibold block">Total Apertures Installed:</span>
                  <strong className="text-[#009886] font-mono font-bold block mt-0.5">
                    {selectedProjectModal.specifications.totalUnits} Units
                  </strong>
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="mt-6 pt-4 border-t border-[#e6f7f5] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-black/80 font-medium">
                  Want custom doors or windows engineered for a similar estate?
                </p>
                <Link
                  href={`/request-quote?projectRef=${encodeURIComponent(selectedProjectModal.title)}`}
                  onClick={() => setSelectedProjectModal(null)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#009886] hover:bg-black text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors text-center shadow-sm"
                >
                  Request Architectural Quote
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

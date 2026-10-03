"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { PROJECTS_DATA } from "@/data/projects";
import { SectionHeading } from "@/components/common/SectionHeading";

export function ProjectsTeaser() {
  const teaserProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section className="py-24 bg-white border-t border-[#e6f4fd] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Architecture in Practice"
            title="Realized Architectural Projects"
            subtitle="Villas • Residences • Facades"
            description="A glimpse into contemporary estates and bespoke spaces elevated by SMC Fabrication entrance portals and slimline glass walls."
            className="mb-0 max-w-2xl"
          />

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0070bc] hover:text-black transition-colors pb-2"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {teaserProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-white border border-[#e6f4fd] hover:border-[#0070bc] rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Project Image */}
              <div className="relative w-full h-72 overflow-hidden bg-[#e6f4fd]">
                <Image
                  src={project.mainImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full border border-[#e6f4fd] text-[10px] uppercase font-bold tracking-wider text-[#0070bc] shadow-sm">
                  {project.category}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-black/70 mb-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#0070bc]" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-black group-hover:text-[#0070bc] transition-colors">
                    <Link href={`/projects#${project.slug}`}>{project.title}</Link>
                  </h3>

                  <p className="text-xs text-black/75 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#e6f4fd] text-[11px] text-black/60">
                    <span>Installed: </span>
                    <span className="text-black font-semibold">
                      {project.installedProducts.map((p) => p.productName).join(", ")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e6f4fd] flex items-center justify-between">
                  <Link
                    href={`/projects`}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-black group-hover:text-[#0070bc] transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0070bc]" />
                  </Link>
                  <span className="text-[10px] font-mono text-black/50">
                    {project.yearCompleted}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

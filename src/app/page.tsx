import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ARPreviewFeature } from "@/components/home/ARPreviewFeature";
import { CraftsmanshipSpotlight } from "@/components/home/CraftsmanshipSpotlight";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Trust & Introduction Metrics */}
      <TrustMetrics />

      {/* 3. Product Categories Grid */}
      <CategoryGrid />

      {/* 4. Interactive 3D & Mobile AR Room Visualizer Spotlight */}
      <ARPreviewFeature />

      {/* 5. Featured Architectural Systems */}
      <FeaturedProducts />

      {/* 6. Manufacturing Capabilities & Engineering */}
      <CraftsmanshipSpotlight />

      {/* 7. Realized Architectural Projects */}
      <ProjectsTeaser />

      {/* 8. Call to Action / Quotation Invitation */}
      <CTASection />
    </div>
  );
}

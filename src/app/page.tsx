import { GlyphPortalSection } from "@/components/home/GlyphPortalSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
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
      {/* 1. Official SMC Logo Zoom Hero Section */}
      <GlyphPortalSection />

      {/* 2. Who We Are Section */}
      <WhoWeAreSection />

      {/* 3. Trust & Introduction Metrics */}
      <TrustMetrics />

      {/* 4. Product Categories Grid */}
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

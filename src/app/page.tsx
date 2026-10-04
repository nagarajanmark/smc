import { GlyphPortalSection } from "@/components/home/GlyphPortalSection";
import { WhoWeAreSection } from "@/components/home/WhoWeAreSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ARPreviewFeature } from "@/components/home/ARPreviewFeature";
import { CraftsmanshipSpotlight } from "@/components/home/CraftsmanshipSpotlight";
import { TigerRevealSection } from "@/components/home/TigerRevealSection";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { CTASection } from "@/components/home/CTASection";
import Demo from "@/components/ui/demo";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">

      {/* Interactive Glyph Portal Section - Full Width & Natural Scroll */}
      <section className="w-full relative overflow-visible">
        <Demo />
      </section>

      {/* 2. Who We Are Section */}
      <WhoWeAreSection />

      {/* Dynamic Scroll Reveal Hero */}
      <TigerRevealSection />

      {/* 4. Interactive 3D & Mobile AR Room Visualizer Spotlight */}
      <ARPreviewFeature />

      {/* 6. Featured Architectural Systems */}
      <FeaturedProducts />

      {/* 7. Manufacturing Capabilities & Engineering */}
      <CraftsmanshipSpotlight />

      {/* 9. Realized Architectural Projects */}
      <ProjectsTeaser />

      {/* 10. Call to Action / Quotation Invitation */}
      <CTASection />
    </div>
  );
}


import { SeoHead } from "@/components/seo-head";
import CtaSection from "@/sections/cta";
import DxComparisonSection from "@/sections/dx-comparison";
import EngineDiagramSection from "@/sections/engine-diagram";
import FaqSection from "@/sections/faq";
import GallerySection from "@/sections/gallery";
import HeroSection from "@/sections/hero";
import MetricsSection from "@/sections/metrics";
import PyramidSection from "@/sections/pyramid";
import ShowcaseSection from "@/sections/showcase";
import TrustSignals from "@/sections/trust-signals";

export default function Home() {
  return (
    <>
      <SeoHead />
      <HeroSection />
      <TrustSignals />
      <DxComparisonSection />
      <PyramidSection />
      <ShowcaseSection />
      <EngineDiagramSection />
      <MetricsSection />
      <CtaSection />
      <FaqSection />
      <GallerySection />
    </>
  );
}

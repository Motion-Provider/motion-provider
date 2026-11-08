import { SeoHead } from "@/components/seo-head";
import Cta from "@/sections/cta";
import DxComparison from "@/sections/dx-comparison";
import { EngineDiagramSection } from "@/sections/engine-diagram";
import FaqSection from "@/sections/faq";
import GallerySection from "@/sections/gallery";
import HeroSection from "@/sections/hero";
import Metrics from "@/sections/metrics";
import MyFingerIsGoodNow from "@/sections/my-finger-is-good-now";
import ShowcaseSection from "@/sections/showcase";
import TrustSignals from "@/sections/trust-signals";

export default function Home() {
  return (
    <>
      <SeoHead />
      <HeroSection />
      <TrustSignals />
      <DxComparison />
      <MyFingerIsGoodNow />
      {/** add responsivitiy for layout shit (mobile) */}
      <ShowcaseSection />
      <EngineDiagramSection />
      <Metrics />
      <Cta />
      <FaqSection />
      <GallerySection />
    </>
  );
}

import Cta from "@/sections/cta";
import DxComparison from "@/sections/dx-comparison";
import { EngineDiagramSection } from "@/sections/engine-diagram";
import FaqSection from "@/sections/faq";
import HeroSection from "@/sections/hero";
import Metrics from "@/sections/metrics";
import MyFingerIsGoodNow from "@/sections/my-finger-is-good-now";
import ShowcaseSection from "@/sections/showcase";
import TrustSignals from "@/sections/trust-signals";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <DxComparison />
      <MyFingerIsGoodNow />

      <ShowcaseSection />
      <EngineDiagramSection />
      <Cta />
      <Metrics />
      <FaqSection />
    </>
  );
}

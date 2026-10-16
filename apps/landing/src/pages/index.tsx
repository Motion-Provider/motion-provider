import HeroSection from "@/sections/hero";
import Metrics from "@/sections/metrics";
import ShowcaseSection from "@/sections/showcase";
import TrustSignals from "@/sections/trust-signals";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignals />
      <ShowcaseSection />
      <Metrics />
    </>
  );
}

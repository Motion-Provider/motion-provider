import HeroSection from "@/sections/hero";
import ShowcaseSection from "@/sections/showcase";
import TrustSignals from "@/sections/trust-signals";

export default function Home() {
  return (
    <div className="max-w-screen overflow-x-hidden">
      <HeroSection />
      <TrustSignals />
      <ShowcaseSection />
    </div>
  );
}

import dynamic from "next/dynamic";
import { SeoHead } from "@/components/seo-head";
import HeroSection from "@/sections/hero";
import TrustSignals from "@/sections/trust-signals";

const DxComparison = dynamic(() => import("@/sections/dx-comparison"), {
  ssr: false,
});
const Pyramid = dynamic(() => import("@/sections/my-finger-is-good-now"), {
  ssr: false,
});
const Showcase = dynamic(() => import("@/sections/showcase"), {
  ssr: false,
});
const EngineDiagram = dynamic(() => import("@/sections/engine-diagram"), {
  ssr: false,
});
const Metrics = dynamic(() => import("@/sections/metrics"), {
  ssr: false,
});
const Cta = dynamic(() => import("@/sections/cta"), {
  ssr: false,
});
const FaqSection = dynamic(() => import("@/sections/faq"), {
  ssr: true,
});

const GallerySection = dynamic(() => import("@/sections/gallery"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <SeoHead />
      <HeroSection />
      <TrustSignals />
      <DxComparison />
      <Pyramid />
      <Showcase />
      <EngineDiagram />
      <Metrics />
      <Cta />
      <FaqSection />
      <GallerySection />
    </>
  );
}

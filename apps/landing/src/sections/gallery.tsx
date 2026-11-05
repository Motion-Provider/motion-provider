import { MotionText } from "motion-provider";
import { ContainerWrapper } from "@/components/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import data from "@/constants/gallery.data";
import { getAnimation } from "@/lib/motion";

const titleAnimation = getAnimation("showcasesTitle");
const descriptionAnimation = getAnimation("showcasesDescription");
const actionAnimation = getAnimation("showcasesAction");

export default function GallerySection() {
  return (
    <section
      id="showcases"
      aria-label="Explore the showcases"
      className="relative isolate w-full overflow-hidden py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-transparent via-accent/5 to-accent/15"
      />

      <div className="mx-auto mb-12 flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 text-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <MotionText {...titleAnimation}>Live Showcases</MotionText>
        </div>
      </div>

      <ContainerWrapper<"div">
        as="div"
        width="none"
        radius="3xl"
        scales={false}
        grid={{
          axis: "diagonal",
          size: 96,
          lineWidth: 1,
          opacity: 0.05,
          className: "pointer-events-none",
        }}
        className=""
        innerClassName="relative"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent via-accent/15 to-[#2a1610]  h-1/2 mt-auto"
        />

        <GalleryGrid items={data} />
      </ContainerWrapper>
    </section>
  );
}

import { ContainerWrapper } from "@/components/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import data from "@/constants/gallery.data";

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
        innerClassName="relative overflow-visible"
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

import { Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { MotionContainer, MotionText } from "motion-provider";
import Link from "next/link";
import { ContainerWrapper } from "@/components/container";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import data from "@/constants/gallery.data";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";

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

      <div className="mx-auto mb-12 flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-4">
          <Chip color="accent" variant="soft" size="sm" className="gap-1.5">
            <LayoutGrid aria-hidden="true" className="size-3.5" />
            Live showcases
          </Chip>
          <MotionText {...titleAnimation}>Real pages. Real motion.</MotionText>
          <MotionContainer {...descriptionAnimation}>
            Three full pages built entirely with Motion Provider. Open one,
            scroll, and watch every preset play out.
          </MotionContainer>
        </div>

        <MotionContainer {...actionAnimation}>
          <Link
            href="/showcase/1"
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "no-underline",
            )}
          >
            Browse all showcases
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </MotionContainer>
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
        className="px-4 sm:px-6"
        innerClassName="p-0"
      >
        <GalleryGrid items={data} />
      </ContainerWrapper>
    </section>
  );
}

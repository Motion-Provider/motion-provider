import { MotionContainer, MotionImage, MotionText } from "motion-provider";
import type { ModuleProps } from "./types";

export default function Cas2({ controller }: ModuleProps) {
  return (
    <section className="size-full flex items-center justify-center tracking-tighter md:px-6 gap-4 md:gap-8">
      <div className="flex flex-col items-start justify-end h-full pb-8 -translate-y-8">
        <MotionContainer
          elementType="span"
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            transition: "gentle",
            duration: 0.5,
          }}
          className="font-light md:text-sm text-xs -mb-12"
          controller={controller}
        >
          Motion CAS
        </MotionContainer>
        <MotionText
          elementType="h2"
          animation={{
            mode: ["textShimmer", "transformTextGlow"],
            duration: 0.88,
            transition: "bounceSoft",
          }}
          config={{
            mode: "chars",
            delayLogic: "chaotic",
          }}
          className="mt-0 capitalize md:text-3xl text-lg"
          controller={controller}
        >
          Make stuffs alive
        </MotionText>
        <MotionContainer
          elementType="p"
          animation={{
            mode: "fadeUp",
            transition: "gentle",
          }}
          className="md:max-w-2xs max-w-42 text-pretty -mt-4 md:text-sm text-xs"
          controller={controller}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </MotionContainer>
      </div>
      <div>
        <MotionImage
          animation={{
            mode: ["fadeIn", "rotateFlipY"],
            transition: "gentle",
            duration: 0.92,
          }}
          config={{
            img: "https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/higher-order-components-in-react-banner-da0681d3.webp",
            pieces: 36,
            duration: 0.42,
            delayLogic: "sinusoidal",
          }}
          alt="demo"
          wrapperClassName="md:size-60 size-40 rounded-lg overflow-hidden object-cover"
          controller={controller}
        />
      </div>
    </section>
  );
}

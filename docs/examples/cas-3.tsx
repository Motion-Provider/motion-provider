import { MotionContainer, MotionImage, MotionText } from "motion-provider";
import type { ModuleProps } from "./types";

export default function Cas3({ controller }: ModuleProps) {
  return (
    <section className="size-full flex items-center justify-center px-6 tracking-tighter">
      <div className="flex flex-col items-start justify-end h-full pb-8 -translate-y-8">
        <MotionContainer
          elementType="span"
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            transition: "gentle",
            duration: 0.5,
          }}
          className="font-light text-sm -mb-12"
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
            delay: 0.44,
          }}
          config={{
            mode: "chars",
            delayLogic: "chaotic",
          }}
          className="mt-0 capitalize"
          controller={controller}
        >
          Make stuffs alive
        </MotionText>
        <MotionContainer
          elementType="p"
          animation={{
            mode: "fadeUp",
            transition: "gentle",
            delay: 0.88,
          }}
          className="max-w-2xs -mt-4"
          controller={controller}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </MotionContainer>
      </div>
      <div className="flex gap-2 items-center relative">
        <MotionImage
          animation={{
            mode: ["fadeIn", "rotateFlipY"],
            transition: "gentle",
            duration: 0.92,
            delay: 1.2,
          }}
          config={{
            img: "https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/higher-order-components-in-react-banner-da0681d3.webp",
            pieces: 36,
            duration: 0.42,
            delayLogic: "sinusoidal",
          }}
          alt="demo"
          wrapperClassName="size-60 rounded-lg overflow-hidden object-cover"
          controller={controller}
        />
      </div>
    </section>
  );
}

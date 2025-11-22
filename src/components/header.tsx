import { MotionText } from "@/motion-provider";

export const Header = () => (
  <header className="flex flex-col items-center gap-2 justify-center z-50 md:max-w-max max-w-md">
    <MotionText
      animation={{
        mode: ["filterBlurIn", "textShimmer", "fadeDown"],
        transition: "springy",
        delay: 1,
        duration: 1,
      }}
      config={{
        mode: "chars",
        duration: 0.12,
        delayLogic: "linear",
      }}
      elementType="h1"
      className="lg:text-[7rem] text-6xl tracking-tighter bg-clip-text bg-linear-to-b from-white/50 to-transparent text-transparent"
    >
      Motion Provider.
    </MotionText>
    <MotionText
      animation={{
        mode: ["filterHueRotate", "skewX45", "fadeDown"],
        transition: "springy",
        delay: 2.5,
        duration: 1,
      }}
      elementType={"p"}
      config={{
        mode: "words",
        duration: 0.12,
        delayLogic: "sinusoidal",
      }}
      wrapperClassName="text-muted-foreground lg:max-w-2xl max-w-sm items-center justify-center text-center tracking-tight lg:text-base text-sm"
    >
      Animate your React apps with Motion Provider. Enough to copy-paste fluff.
      Performance-first rendering, intuitive APIs, and seamless developer
      experience.
    </MotionText>
  </header>
);

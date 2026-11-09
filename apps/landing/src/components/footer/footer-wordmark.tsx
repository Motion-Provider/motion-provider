import { MotionImage } from "motion-provider";

export function FooterWordmark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none text-foreground relative md:-my-26"
    >
      <MotionImage
        animation={{
          mode: ["fadeIn", "filterBlurIn", "rotateFlipX"],
          transition: "gentle",
          duration: 1.5,
        }}
        config={{
          img: "/assets/app-wordmark.webp",
          pieces: 144,
          delayLogic: "chaotic",
          duration: 0.33,
        }}
        controller={{
          configView: {
            once: false,
            amount: 0.5,
          },
        }}
        loading="lazy"
        wrapperClassName="size-full"
        alt="Motion Provider Wordmark"
      />
    </div>
  );
}

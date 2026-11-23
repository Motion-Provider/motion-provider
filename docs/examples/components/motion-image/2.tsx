import { MotionImage } from "motion-provider";

const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
    <rect width="320" height="180" fill="#172554" />
    <circle cx="160" cy="90" r="58" fill="#38bdf8" />
    <path d="M0 150L80 95L145 145L220 70L320 150V180H0Z" fill="#0f172a" />
  </svg>
`;

const img = `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default function ClickReveal() {
  return (
    <MotionImage
      alt="Blue abstract landscape with a circular sun"
      wrapperClassName="aspect-video w-72 overflow-hidden rounded-xl z-50"
      animation={{ mode: ["fadeIn", "filterBlurIn"], duration: 0.7 }}
      config={{
        img,
        pieces: 64,
        fn: "click",
        delayLogic: "sinusoidal",
        duration: 0.04,
      }}
      fallback={
        <div className="size-full animate-pulse bg-surface-secondary" />
      }
    />
  );
}

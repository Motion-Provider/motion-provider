import { MotionImage } from "motion-provider";

const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
    <defs>
      <linearGradient id="mountain" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0f766e" />
        <stop offset="1" stop-color="#a3e635" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#mountain)" />
    <circle cx="250" cy="42" r="22" fill="#fef3c7" />
    <path d="M0 180L95 65L150 130L215 82L320 180Z" fill="#134e4a" />
  </svg>
`;

const img = `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default function InViewImage() {
  return (
    <MotionImage
      alt="Layered green mountain landscape at sunrise"
      loading="lazy"
      wrapperClassName="aspect-video w-72 overflow-hidden rounded-xl"
      animation={{
        mode: ["fadeIn", "scaleZoomIn"],
        transition: "gentle",
        duration: 0.8,
      }}
      config={{
        img,
        pieces: 49,
        delayLogic: "linear",
        duration: 0.055,
      }}
      controller={{
        configView: {
          amount: 0.3,
          once: true,
          margin: "0px 0px -10% 0px",
        },
      }}
      fallback={
        <div className="size-full animate-pulse bg-surface-secondary" />
      }
    />
  );
}

import { MotionImage } from "motion-provider";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs><rect width="320" height="180" fill="url(#g)"/><circle cx="240" cy="60" r="28" fill="#fff" fill-opacity=".85"/><path d="M0 180L110 80L180 140L240 100L320 180Z" fill="#0f172a" fill-opacity=".55"/></svg>`;
const img = `data:image/svg+xml,${encodeURIComponent(svg)}`;

export default function ImageTiles() {
  return (
    <div className="flex flex-col items-center gap-3">
      <MotionImage
        alt="Gradient landscape"
        wrapperClassName="aspect-video w-72 overflow-hidden rounded-xl"
        animation={{ mode: ["scaleZoomIn", "fadeIn"], duration: 0.5 }}
        config={{
          img,
          pieces: 36,
          fn: "hover",
          delayLogic: "wave",
          duration: 0.03,
        }}
      />
      <p className="text-xs opacity-70">Move your pointer over the image.</p>
    </div>
  );
}

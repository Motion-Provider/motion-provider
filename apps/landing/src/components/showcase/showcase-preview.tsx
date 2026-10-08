import { MotionImage } from "motion-provider";
import data from "@/constants/showcase.data";
import { useShowcase } from "@/providers/showcase.provider";

export function ShowcasePreview() {
  const { selected } = useShowcase();
  const imgSrc = data.find((item) => item.id === selected)?.imgSrc ?? null;
  return (
    <>
      {imgSrc && (
        <MotionImage
          animation={{
            mode: ["filterBlurIn", "fadeIn"],
            transition: "gentle",
          }}
          config={{
            img: imgSrc,
            pieces: 36,
            duration: 1,
            delayLogic: "jitter",
          }}
          loading="lazy"
          fetchPriority="low"
          key={imgSrc}
          className="scale-50"
          wrapperClassName="size-full object-cover z-10 absolute inset-0"
        />
      )}
      {/* <div className="bg-linear-to-b from-transparent to-background size-full absolute z-10">
        <span className="z-10">{selected}</span>
      </div> */}
    </>
  );
}

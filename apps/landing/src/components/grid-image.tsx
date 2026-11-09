import { MotionImage } from "motion-provider";
import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getAnimation } from "@/lib/motion";
import IntersectionProvider from "@/providers/intersection.provider";

const imageAnimation = getAnimation("squareGrid");

const _GridImage = () => {
  const isMobile = useIsMobile();
  return (
    <IntersectionProvider className="absolute top-0 left-0 size-full grid place-items-center-safe">
      <MotionImage
        {...imageAnimation}
        config={{
          ...imageAnimation.config,
          img: "/assets/backgrounds/grid-background-be9b88fc.webp",
          pieces: isMobile ? 36 : imageAnimation.config.pieces,
        }}
        wrapperClassName="top-0 left-0 z-10 absolute size-full aspect-video overflow-hidden"
      />
    </IntersectionProvider>
  );
};
1;
const GridImage = dynamic(() => Promise.resolve(_GridImage), { ssr: false });

export default GridImage;

import { type ControllerInput, MotionImage } from "motion-provider";
import type { FC } from "react";

interface Props {
  className?: string;
  img: string;
  controller: ControllerInput;
}

const WordmarkImage: FC<Props> = ({ className, img, controller }) => (
  <MotionImage
    animation={{
      mode: ["fadeIn", "filterBlurIn", "rotateFlipX"],
      transition: "gentle",
      duration: 1.5,
    }}
    config={{
      img,
      pieces: 144,
      delayLogic: "chaotic",
      duration: 0.33,
    }}
    controller={controller}
    loading="lazy"
    wrapperClassName={className}
    alt="Motion Provider Wordmark"
  />
);

export { WordmarkImage };

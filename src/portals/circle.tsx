import { PortalCircleProps } from "@/interfaces";
import MotionContainer from "@/motion/motion-container";
import { FC } from "react";

export const Circle: FC<PortalCircleProps> = ({ mode }) => {
  return (
    <MotionContainer
      animation={{
        mode,
        transition: "delayedElastic",
        duration: 2,
      }}
      elementType="div"
      className="fixed bg-gradient-to-br from-[#2b75cffd] via-15% to-transparent lg:size-96 size-60 rounded-full blur-[120px] -top-8 -left-8 z-10"
    />
  );
};

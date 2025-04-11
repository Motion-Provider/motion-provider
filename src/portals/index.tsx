import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { AnimationKeys } from "../motion/types";
import getGradientCircleAnimation from "@/utils/getGradientCircleAnimation";
import { PortalInterface } from "@/interfaces";
import { GradientCircle } from "./gradient-circle";

const P: FC<PortalInterface> = ({ currRoute }) => {
  if (!currRoute) return null;

  const [animation, setAnimation] = useState<AnimationKeys | AnimationKeys[]>(
    getGradientCircleAnimation(currRoute)
  );

  useEffect(() => {
    if (currRoute) {
      setAnimation(getGradientCircleAnimation(currRoute));
    }
  }, [currRoute]);

  return createPortal(<GradientCircle mode={animation} />, document.body);
};

const Portal = dynamic(() => Promise.resolve(P), { ssr: false });
export default Portal;

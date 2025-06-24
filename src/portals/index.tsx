import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { AnimationKeys } from "../motion/types";
import getGradientCircleAnimation from "@/utils/getGradientCircleAnimation";
import { PortalInterface } from "@/interfaces";
import { Circle } from "./circle";
import { useSelector } from "react-redux";
import { Navigations } from "./navigations";
import { RootState } from "@/redux";

const P: FC<PortalInterface> = ({ currRoute }) => {
  const { activated } = useSelector((state: RootState) => state.cookie);

  if (!currRoute) return null;

  const [animation, setAnimation] = useState<AnimationKeys | AnimationKeys[]>(
    getGradientCircleAnimation(currRoute)
  );

  useEffect(() => {
    if (currRoute) {
      setAnimation(getGradientCircleAnimation(currRoute));
    }
  }, [currRoute]);

  return createPortal(
    <>
      <Circle mode={animation} />
      {activated && <Navigations />}
    </>,
    document.body
  );
};

const Portal = dynamic(() => Promise.resolve(P), { ssr: false });
export default Portal;

import { MotionTubeItemProps } from "@/interfaces";
import { FC } from "react";

export const Item: FC<MotionTubeItemProps> = ({ children, currentItem }) => {
  if (!children) return null;
  return (
    <div className="w-full h-full bg-red-500 flex items-center justify-center">
      {children}
      {currentItem}
    </div>
  );
};

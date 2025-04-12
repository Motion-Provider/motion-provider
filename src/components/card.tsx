import { FC } from "react";
import { Card as CardContainer } from "./ui/card";
import { OverviewCardProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import MotionLink from "@/motion/motion-link";

export const Card: FC<OverviewCardProps> = (props) => {
  const { desc, title, link, className, onReverse } = props;

  return (
    <CardContainer
      className={cn(
        "h-32 w-auto text-white cursor-pointer hover:bg-stone-900 border-none transition-all duration-300  bg-stone-900/20  group backdrop-blur-md",
        className
      )}
    >
      <MotionLink href={link} onReverse={onReverse} timer={2000}>
        <div className="lg:w-16 lg:h-16 w-5 h-5 flex items-center justify-center text-stone-300 group-hover:text-white transition-all duration-300 group-hover:scale-110">
          {<props.icon className="size-7" />}
        </div>
        <div className="lg:w-full w-auto h-full items-start justify-center flex flex-col truncate overflow-clip">
          <h2 className="font-bold text-sm font-secondary">{title}</h2>
          <p className="tracking-tighter text-xs text-stone-400 lg:block hidden">
            {desc}
          </p>
        </div>
      </MotionLink>
    </CardContainer>
  );
};

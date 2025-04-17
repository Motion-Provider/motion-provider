import { LearnListProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import MotionText from "@/motion/motion-text";
import MotionChain from "@/motion/motion-chain";
import { MotionAnimationProps } from "@/motion/types";

export const List: FC<LearnListProps> = ({ data, className }) => {
  if (!data || data.length === 0) {
    console.error("No data provided to List component");
    return null;
  }
  const animations = data.map((_, idx) => ({
    mode: [idx % 2 === 0 ? "fadeRight" : "fadeLeft"],
    transition: "smooth",
    duration: 0.5,
  })) as MotionAnimationProps[];

  return (
    <MotionChain
      animations={animations}
      config={{
        duration: 0.25,
        delayLogic: "linear",
      }}
      elementType={"ul"}
      className={cn("list-inside", className)}
    >
      {data.map((item, index) => (
        <li key={index}>
          <Card className="dark py-4 bg-transparent">
            <CardHeader>
              <CardTitle className="font-secondary tracking-tight">
                <MotionText
                  animation={{
                    mode: ["fadeDown"],
                    transition: "delayedCubic",
                    duration: 0.25,
                  }}
                  children={index + 1 + ". " + item.title}
                  config={{
                    duration: 1,
                    mode: "chars",
                    space: 1,
                    delayLogic: "cosine",
                  }}
                  elementType={"span"}
                  wrapperClassName="font-normal text-sm"
                />
              </CardTitle>
              <CardDescription className="tracking-tighter text-xs">
                {item.desc}
              </CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </MotionChain>
  );
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionProviderLibraryItemProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import MotionContainer from "@/motion/motion-container";
import { ArrowRight } from "lucide-react";
import { FC, useState } from "react";

export const ListItem: FC<MotionProviderLibraryItemProps> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { desc, title, level } = props;

  return (
    <li
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-16 w-full items-center justify-center flex flex-row gap-3 border  px-12 rounded-2xl group cursor-pointer my-3 hover:bg-stone-900 relative"
    >
      <MotionContainer
        animation={{
          mode: ["typingEffect", "funChickenDance"],
          transition: "smooth",
          delay: 0,
          duration: 0.25,
        }}
        elementType={"div"}
        controller={{
          trigger: isHovered,
        }}
        className={cn(
          "size-12 rounded-full blur-[150px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
          level === "beginner"
            ? "bg-green-500"
            : level === "intermediate"
            ? "bg-yellow-500"
            : "bg-red-500"
        )}
      />
      <props.icon className="size-6" />
      <div className="w-full h-full flex flex-col justify-center items-start px-2">
        <div className="flex gap-2">
          <h2 className=" font-secondary tracking-tight text-sm">{title}</h2>
          <Badge
            variant="outline"
            className=" group-hover:opacity-100 opacity-0 transition-opacity duration-300"
          >
            <div
              className={cn(
                "size-2 rounded-full animate-pulse",
                level === "beginner"
                  ? "bg-green-500"
                  : level === "intermediate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              )}
            />{" "}
            {level}
          </Badge>
        </div>
        <p className="tracking-tighter text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className="w-1/12 h-full flex flex-col justify-center group-hover:translate-x-2 transition-all duration-300">
        <Button variant={"link"}>
          {" "}
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </li>
  );
};

import { Button } from "@/components/ui/button";
import { MotionProviderLibraryItemProps } from "@/interfaces";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

export const ListItem: FC<MotionProviderLibraryItemProps> = (props) => {
  const { desc, link, title } = props;

  return (
    <li className="h-24 w-full items-center justify-center flex flex-row gap-3 hover:scale-105 bg-stone-950 px-16 rounded-2xl group cursor-pointer">
      <props.icon className="size-8" />

      <div className="w-11/12 h-full flex flex-col justify-center items-start">
        <h2 className="font-semibold font-secondary tracking-tight">{title}</h2>
        <p className="tracking-tighter text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="w-1/12 h-full flex flex-col justify-center ">
        <Button variant={"link"}>
          {" "}
          <ArrowRight className="size-6" />
        </Button>
      </div>
    </li>
  );
};

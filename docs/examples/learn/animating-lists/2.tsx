import { Card, Description, Label } from "@heroui/react";
import { MotionChain } from "motion-provider";
import type { ModuleProps } from "../../types";
import data from "./list.data.json";

export default function AnimatingLists2({ controller }: ModuleProps) {
  return (
    <div className="w-84 h-60 overflow-y-scroll dark my-8 scrollbar">
      <MotionChain animation={{ mode: "fadeUp" }} controller={controller}>
        {data.map((item) => (
          <Card
            key={item.id}
            className="flex-row items-center justify-between bg-transparent hover:bg-accent/10"
          >
            <Label>
              {item.first_name}{" "}
              <span className="text-accent">{item.last_name}</span>
            </Label>
            <Description className="max-w-2xs truncate">
              {item.email}
            </Description>
          </Card>
        ))}
      </MotionChain>
    </div>
  );
}

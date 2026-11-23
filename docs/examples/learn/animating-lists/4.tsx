import { Card, Description, Label } from "@heroui/react";
import { MotionContainer } from "motion-provider";
import { useState } from "react";
import data from "./list.data.json";

export default function AnimatingLists4() {
  const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);

  return (
    <div
      ref={setScrollRoot}
      className="w-84 h-60 overflow-y-scroll dark my-8 scrollbar"
    >
      {data.map((item) => (
        <MotionContainer
          key={item.id}
          animation={{ mode: "fadeUp", duration: 0.36 }}
          controller={{
            scroll: {
              source: scrollRoot,
              axis: "y",
              mode: "view",
              start: 0.1,
              end: 0.6,
            },
          }}
        >
          <Card className="flex-row items-center justify-between bg-transparent hover:bg-accent/10">
            <Label>
              {item.first_name}{" "}
              <span className="text-accent">{item.last_name}</span>
            </Label>

            <Description className="max-w-2xs truncate">
              {item.email}
            </Description>
          </Card>
        </MotionContainer>
      ))}
    </div>
  );
}

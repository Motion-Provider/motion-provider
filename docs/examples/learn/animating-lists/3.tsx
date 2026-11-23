import { Card, Description, Label } from "@heroui/react";
import { MotionContainer } from "motion-provider";
import data from "./list.data.json";

export default function AnimatingLists3() {
  return (
    <div className="w-84 h-60 overflow-y-scroll dark my-8 scrollbar">
      {data.map((item) => (
        <MotionContainer
          animation={{ mode: "fadeUp", duration: 0.36 }}
          controller={{
            configView: {
              once: false,
              amount: 0.12,
            },
          }}
          key={item.id}
        >
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
        </MotionContainer>
      ))}
    </div>
  );
}

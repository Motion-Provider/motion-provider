import { Card, Description, Label } from "@heroui/react";
import data from "./list.data.json" with { type: "json" };

export default function AnimatingLists1() {
  return (
    <div className="w-80 h-60 dark overflow-y-scroll my-8 scrollbar">
      {data.map((item) => (
        <Card
          key={item.id}
          className="flex-row items-center justify-between bg-transparent hover:bg-accent/10"
        >
          <Label>
            {item.first_name}{" "}
            <span className="text-accent">{item.last_name}</span>
          </Label>
          <Description className="max-w-2xs truncate">{item.email}</Description>
        </Card>
      ))}
    </div>
  );
}

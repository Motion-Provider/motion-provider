import { Card, CardDescription, CardTitle } from "@heroui/react";
import { MotionChain } from "motion-provider";
import data from "@/constants/avatars.data";

export default function Page() {
  return (
    <MotionChain
      animation={{
        mode: ["fadeUp", "rotateFlipX"],
      }}
    >
      {data.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </Card>
      ))}
    </MotionChain>
  );
}

import { cn } from "@/lib/utils";
import config from "../../constants/circle.config";

const { cx, cy, rSub, strokeWidth } = config.identity;

function getTrianglePoints(cx: number, cy: number, radius: number) {
  return Array.from({ length: 3 }, (_, i) => {
    const angle = ((i * 120 - 90) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");
}

interface Props {
  id: number;
  radius: number;
}

export function CircleItem({ id, radius }: Props) {
  return (
    <polygon
      points={getTrianglePoints(cx, cy, radius - rSub)}
      className={cn("z-30", id % 2 === 0 ? "text-accent/25" : "text-accent/50")}
      stroke="currentColor"
      fill="none"
      strokeWidth={strokeWidth}
    />
  );
}

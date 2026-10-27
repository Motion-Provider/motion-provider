import { cn } from "@/lib/utils";
import type config from "../../constants/circle.config";

function getTrianglePoints(cx: number, cy: number, radius: number) {
  return Array.from({ length: 3 }, (_, i) => {
    const angle = ((i * 120 - 90) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");
}

type Identity = typeof config.identity;

interface Props extends Identity {
  id: number;
  radius: number;
  oddColor?: string;
  evenColor?: string;
}

export function CircleItem({
  id,
  radius,
  cx,
  cy,
  rSub,
  strokeWidth,
  oddColor = "text-accent/50",
  evenColor = "text-accent/25",
}: Props) {
  return (
    <polygon
      points={getTrianglePoints(cx, cy, radius - rSub)}
      className={cn("z-30", id % 2 === 0 ? evenColor : oddColor)}
      stroke="currentColor"
      fill="none"
      strokeWidth={strokeWidth}
    />
  );
}

import { useId } from "react";
import type { EngineGroup } from "@/types/engine.type";
import { toneStyle } from "@/utils/engineTone";

interface EngineGroupFrameProps {
  group: EngineGroup;
}

const size = 8;
const lineWidth = 1;

export function EngineGroupFrame({ group }: EngineGroupFrameProps) {
  const end = group.titleAt === "bottom-right";
  const patternId = `scales-${useId().replace(/:/g, "")}`;

  const x = group.x + 0.5;
  const y = group.y + 0.5;
  const width = group.w - 1;
  const height = group.h - 1;

  return (
    <g data-group={group.id} style={toneStyle(group.tone)}>
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
          className="text-border/50"
        >
          <path
            d={`M 0 0 V ${size}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={lineWidth}
          />
        </pattern>
      </defs>

      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={16}
        className="fill-transparent"
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={16}
        fill={`url(#${patternId})`}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={16}
        fill="none"
        className="stroke-border/50"
      />
      <text
        x={end ? group.x + group.w - 16 : group.x + 16}
        y={end ? group.y + group.h - 12 : group.y + 22}
        textAnchor={end ? "end" : "start"}
        className="pointer-events-none fill-(--tone) font-secondary text-[12px] font-medium"
      >
        {group.label}
      </text>
    </g>
  );
}

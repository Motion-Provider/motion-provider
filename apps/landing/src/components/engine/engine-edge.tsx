// @ts-nocheck
import { MotionContainer } from "motion-provider";
import { cn } from "@/lib/utils";
import { useEngineLabels } from "@/providers/engine.provider";
import type { EdgeGeometry, Emphasis } from "@/types/engine.type";
import { getEngineLabelDelayByIndex } from "@/utils/engineDiagram";

export const EDGE_PATH: Record<Emphasis, string> = {
  idle: "stroke-[color-mix(in_oklch,var(--foreground)_26%,transparent)]",
  active: "stroke-(--accent)",
  dimmed: "stroke-[color-mix(in_oklch,var(--foreground)_8%,transparent)]",
};

export const EDGE_ARROW: Record<Emphasis, string> = {
  idle: "fill-[color-mix(in_oklch,var(--foreground)_45%,transparent)]",
  active: "fill-(--accent)",
  dimmed: "fill-[color-mix(in_oklch,var(--foreground)_12%,transparent)]",
};

export const EDGE_LABEL_BASE =
  "stroke-(--background) [paint-order:stroke] [stroke-linejoin:round] [stroke-width:6px]";

export const EDGE_LABEL: Record<Emphasis, string> = {
  idle: "fill-[color-mix(in_oklch,var(--foreground)_62%,transparent)]",
  active: "fill-(--foreground)",
  dimmed: "fill-[color-mix(in_oklch,var(--foreground)_18%,transparent)]",
};

interface EngineEdgeProps {
  edge: EdgeGeometry;
  emphasis: Emphasis;
}

export function EngineEdge({ edge, emphasis }: EngineEdgeProps) {
  const { showLabels } = useEngineLabels();
  return (
    <g
      data-edge={edge.id}
      data-from={edge.from}
      data-to={edge.to}
      data-emphasis={emphasis}
      className="pointer-events-none *:transition-all *:duration-300 *:ease-in-out last:transition-none last:duration-0"
    >
      {/* pathLength=1 keeps dash-based draw animations independent of the real length. */}
      <path
        d={edge.d}
        pathLength={1}
        fill="none"
        strokeWidth={emphasis === "active" ? 1.75 : 1.25}
        strokeLinecap="round"
        className={EDGE_PATH[emphasis]}
      />
      <path
        d={edge.arrow}
        className={cn(
          "transition-all duration-500 ease-in-out",
          EDGE_ARROW[emphasis],
        )}
      />
      <MotionContainer
        animation={{
          mode: "fadeUp",
          duration: 0.55,
          transition: "gentle",
          delay: getEngineLabelDelayByIndex(edge.id),
        }}
        controller={{
          trigger: showLabels,
        }}
        elementType="text"
        x={edge.labelPoint.x}
        y={edge.labelPoint.y}
        textAnchor="middle"
        dominantBaseline="central"
        className={cn(
          "stroke-background font-secondary text-[11px]",
          "[paint-order:stroke] [stroke-linejoin:round] stroke-2",
          EDGE_LABEL[emphasis],
        )}
      >
        {edge.label}
      </MotionContainer>
    </g>
  );
}

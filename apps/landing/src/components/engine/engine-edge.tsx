import { MotionContainer } from "motion-provider";
import { cn } from "@/lib/utils";
import { useEngineLabels } from "@/providers/engine.provider";
import type { EdgeGeometry, Emphasis } from "@/types/engine.type";
import { getEngineLabelDelayByIndex } from "@/utils/engineDiagram";

const PATH: Record<Emphasis, string> = {
  idle: "stroke-[color-mix(in_oklch,var(--foreground)_26%,transparent)]",
  active: "stroke-(--accent)",
  dimmed: "stroke-[color-mix(in_oklch,var(--foreground)_8%,transparent)]",
};

const ARROW: Record<Emphasis, string> = {
  idle: "fill-border-secondary",
  active: "fill-(--accent)",
  dimmed: "fill-[color-mix(in_oklch,var(--foreground)_12%,transparent)]",
};

const LABEL: Record<Emphasis, string> = {
  idle: "fill-[color-mix(in_oklch,var(--foreground)_48%,transparent)]",
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
        className={PATH[emphasis]}
      />
      <path
        d={edge.arrow}
        className={cn(
          "transition-all duration-500 ease-in-out",
          ARROW[emphasis],
        )}
      />
      <MotionContainer
        animation={{
          mode: "fadeIn",
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
          LABEL[emphasis],
        )}
      >
        {edge.label}
      </MotionContainer>
    </g>
  );
}

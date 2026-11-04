import { NODE_HEIGHT } from "@/constants/engine.data";
import { cn } from "@/lib/utils";
import type {
  EngineNode as EngineNodeData,
  EngineNodeId,
  EngineTone,
  NodeEmphasis,
} from "@/types/engine.type";
import { toneStyle } from "@/utils/engineTone";

const RECT: Record<NodeEmphasis, string> = {
  idle: "fill-[color-mix(in_oklch,var(--tone)_8%,var(--surface))] stroke-[color-mix(in_oklch,var(--tone)_55%,transparent)]",
  linked:
    "fill-[color-mix(in_oklch,var(--tone)_14%,var(--surface))] stroke-[color-mix(in_oklch,var(--tone)_85%,transparent)]",
  active:
    "fill-[color-mix(in_oklch,var(--tone)_20%,var(--surface))] stroke-(--tone) [filter:drop-shadow(0_0_10px_color-mix(in_oklch,var(--tone)_45%,transparent))]",
  dimmed:
    "fill-[color-mix(in_oklch,var(--tone)_4%,var(--surface))] stroke-[color-mix(in_oklch,var(--tone)_16%,transparent)]",
};

interface EngineNodeProps {
  node: EngineNodeData;
  tone: EngineTone;
  emphasis: NodeEmphasis;
  onActivate: (id: EngineNodeId | null) => void;
  onSelect: (id: EngineNodeId) => void;
}

export function EngineNode({
  node,
  tone,
  emphasis,
  onActivate,
  onSelect,
}: EngineNodeProps) {
  const dimmed = emphasis === "dimmed";

  return (
    // biome-ignore lint/a11y/useSemanticElements: dynamic content
    <g
      data-node={node.id}
      data-group={node.group}
      data-emphasis={emphasis}
      style={toneStyle(tone)}
      role="button"
      tabIndex={0}
      aria-label={`${node.label}${node.file ? `, ${node.file}` : ""}. Open details`}
      className="group cursor-pointer outline-none"
      onPointerEnter={() => onActivate(node.id)}
      onPointerLeave={() => onActivate(null)}
      onFocus={() => onActivate(node.id)}
      onBlur={() => onActivate(null)}
      onClick={() => onSelect(node.id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(node.id);
        }
      }}
    >
      <rect
        x={node.cx - node.w / 2}
        y={node.y}
        width={node.w}
        height={NODE_HEIGHT}
        rx={8}
        strokeWidth={1.25}
        className={cn(
          "group-focus-visible:stroke-focus group-focus-visible:stroke-[2.5px]",
          RECT[emphasis],
        )}
      />
      <text
        x={node.cx}
        y={node.y + 19}
        textAnchor="middle"
        className={cn(
          "pointer-events-none font-primary tracking-tight text-[13px] font-medium",
          dimmed ? "fill-muted" : "fill-foreground",
        )}
      >
        {node.label}
      </text>
      {node.file && (
        <text
          x={node.cx}
          y={node.y + 34}
          textAnchor="middle"
          className="pointer-events-none fill-muted font-secondary text-[8.5px]"
        >
          {node.file}
        </text>
      )}
    </g>
  );
}

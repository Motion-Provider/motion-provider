import {
  ENGINE_CANVAS,
  ENGINE_GROUPS,
  ENGINE_NODES,
} from "@/constants/engine.data";
import type { Emphasis, EngineNodeId, NodeEmphasis } from "@/types/engine.type";
import { EDGE_GEOMETRY, GROUP_BY_ID, NEIGHBORS } from "@/utils/engineDiagram";
import { EngineEdge } from "./engine-edge";
import { EngineGroupFrame } from "./engine-group-frame";
import { EngineNode } from "./engine-node";

const engineGroup = GROUP_BY_ID.engine;

interface EngineCanvasProps {
  activeId: EngineNodeId | null;
  onActivate: (id: EngineNodeId | null) => void;
  onSelect: (id: EngineNodeId) => void;
}

export function EngineCanvas({
  activeId,
  onActivate,
  onSelect,
}: EngineCanvasProps) {
  const neighbors = activeId ? NEIGHBORS[activeId] : null;

  const edgeEmphasis = (from: EngineNodeId, to: EngineNodeId): Emphasis =>
    !activeId
      ? "idle"
      : from === activeId || to === activeId
        ? "active"
        : "dimmed";

  const nodeEmphasis = (id: EngineNodeId): NodeEmphasis =>
    !activeId
      ? "idle"
      : id === activeId
        ? "active"
        : neighbors?.has(id)
          ? "linked"
          : "dimmed";

  const viewBox = `0 0 ${ENGINE_CANVAS.width} ${ENGINE_CANVAS.height}`;

  return (
    // biome-ignore lint/a11y/useSemanticElements: dynamic content
    <svg
      viewBox={viewBox}
      role="group"
      aria-label="Motion Provider engine: modules and how they connect"
      className="hidden h-auto w-full select-none lg:block"
    >
      <defs>
        <radialGradient id="engine-glow">
          <stop
            offset="0"
            stopOpacity={0.16}
            className="[stop-color:var(--accent)]"
          />
          <stop
            offset="1"
            stopOpacity={0}
            className="[stop-color:var(--accent)]"
          />
        </radialGradient>
      </defs>

      <ellipse
        data-layer="glow"
        cx={engineGroup.x + engineGroup.w / 2}
        cy={engineGroup.y + engineGroup.h / 2}
        rx={engineGroup.w * 0.62}
        ry={engineGroup.h * 0.8}
        fill="url(#engine-glow)"
        className="pointer-events-none"
      />

      <g data-layer="groups">
        {ENGINE_GROUPS.map((group) => (
          <EngineGroupFrame key={group.id} group={group} />
        ))}
      </g>

      <g data-layer="edges">
        {EDGE_GEOMETRY.map((edge) => (
          <EngineEdge
            key={edge.id}
            edge={edge}
            emphasis={edgeEmphasis(edge.from, edge.to)}
          />
        ))}
      </g>

      <g data-layer="nodes">
        {ENGINE_NODES.map((node) => (
          <EngineNode
            key={node.id}
            node={node}
            tone={GROUP_BY_ID[node.group].tone}
            emphasis={nodeEmphasis(node.id)}
            onActivate={onActivate}
            onSelect={onSelect}
          />
        ))}
      </g>
    </svg>
  );
}

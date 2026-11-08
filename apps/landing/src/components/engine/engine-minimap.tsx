import { MotionChain } from "motion-provider";
import type { KeyboardEvent } from "react";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type {
  EngineEdge,
  EngineNodeId,
  MiniMapEdge,
  MiniMapLayout,
  MiniMapNode,
  Point,
} from "@/types/engine.type";
import {
  arrowPath,
  GROUP_BY_ID,
  NODE_BY_ID,
  NODE_IDS,
  NODE_LINKS,
  recordFrom,
} from "@/utils/engineDiagram";
import { toneStyle } from "@/utils/engineTone";
import {
  EDGE_ARROW,
  EDGE_LABEL,
  EDGE_LABEL_BASE,
  EDGE_PATH,
} from "./engine-edge";
import { NODE_RECT } from "./engine-node";

const L = {
  width: 700,
  pad: 0,
  nodeH: 50,
  rowGap: 80,
  gap: 12,
  maxNodeW: 200,
  selectedW: 200,
  portSpread: 50,
} as const;

const byCanvasX = (a: EngineNodeId, b: EngineNodeId) =>
  NODE_BY_ID[a].cx - NODE_BY_ID[b].cx;

function splitLabel(label: string): string[] {
  if (label.length <= 14) return [label];

  let best = [label];
  let bestMax = label.length;

  const words = label.split(" ");

  for (let i = 1; i < words.length; i++) {
    const lines = [words.slice(0, i).join(" "), words.slice(i).join(" ")];
    const longest = Math.max(...lines.map((line) => line.length));

    if (longest < bestMax) {
      best = lines;
      bestMax = longest;
    }
  }

  return best;
}

function layoutRow(
  ids: EngineNodeId[],
  role: MiniMapNode["role"],
  y: number,
): MiniMapNode[] {
  const w = Math.min(
    L.maxNodeW,
    (L.width - 2 * L.pad - (ids.length - 1) * L.gap) / ids.length,
  );

  const x0 = (L.width - (ids.length * w + (ids.length - 1) * L.gap)) / 2;

  return ids.map((id, i) => ({
    id,
    role,
    x: x0 + i * (w + L.gap),
    y,
    w,
    h: L.nodeH,
    lines: splitLabel(NODE_BY_ID[id].label),
  }));
}

function cubicAt(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const u = 1 - t;

  const mix = (a: number, b: number, c: number, d: number) =>
    u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;

  return { x: mix(p0.x, p1.x, p2.x, p3.x), y: mix(p0.y, p1.y, p2.y, p3.y) };
}

function connect(
  edge: EngineEdge,
  from: MiniMapNode,
  to: MiniMapNode,
  fromDx: number,
  toDx: number,
  index: number,
): MiniMapEdge {
  const start: Point = { x: from.x + from.w / 2 + fromDx, y: from.y + from.h },
    end: Point = { x: to.x + to.w / 2 + toDx, y: to.y },
    midY = (start.y + end.y) / 2,
    c1: Point = { x: start.x, y: midY },
    c2: Point = { x: end.x, y: midY };

  return {
    id: edge.id,
    label: edge.label,
    d: `M${start.x} ${start.y} C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${end.x} ${end.y}`,
    arrow: arrowPath(end),
    labelPoint: cubicAt(start, c1, c2, end, index % 2 === 0 ? 0.34 : 0.66),
  };
}

function buildMiniMap(id: EngineNodeId): MiniMapLayout | null {
  const { incoming, outgoing } = NODE_LINKS[id];
  if (incoming.length === 0 && outgoing.length === 0) return null;

  const inIds = [...new Set(incoming.map((e) => e.from))].sort(byCanvasX);
  const outIds = [...new Set(outgoing.map((e) => e.to))].sort(byCanvasX);

  const inY = L.pad;
  const selectedY = inIds.length ? inY + L.nodeH + L.rowGap : L.pad;
  const outY = selectedY + L.nodeH + L.rowGap;
  const height = (outIds.length ? outY + L.nodeH : selectedY + L.nodeH) + L.pad;

  const selected: MiniMapNode = {
    id,
    role: "selected",
    x: (L.width - L.selectedW) / 2,
    y: selectedY,
    w: L.selectedW,
    h: L.nodeH,
    lines: splitLabel(NODE_BY_ID[id].label),
  };
  const neighbors = [
    ...layoutRow(inIds, "incoming", inY),
    ...layoutRow(outIds, "outgoing", outY),
  ];
  const neighborById = new Map(neighbors.map((node) => [node.id, node]));

  const port = (i: number, count: number) =>
    (i - (count - 1) / 2) *
    Math.min(L.portSpread, (L.selectedW - 32) / Math.max(count - 1, 1));

  const inEdges = [...incoming].sort((a, b) => byCanvasX(a.from, b.from));
  const outEdges = [...outgoing].sort((a, b) => byCanvasX(a.to, b.to));

  const edges = [
    ...inEdges.flatMap((edge, i) => {
      const from = neighborById.get(edge.from);
      return from
        ? [connect(edge, from, selected, 0, port(i, inEdges.length), i)]
        : [];
    }),
    ...outEdges.flatMap((edge, i) => {
      const to = neighborById.get(edge.to);
      return to
        ? [connect(edge, selected, to, port(i, outEdges.length), 0, i)]
        : [];
    }),
  ];

  return { width: L.width, height, nodes: [selected, ...neighbors], edges };
}

const MINI_MAPS: Record<EngineNodeId, MiniMapLayout | null> = recordFrom(
  NODE_IDS,
  buildMiniMap,
);

interface MiniNodeProps {
  node: MiniMapNode;
  onNavigate: (id: EngineNodeId) => void;
}

const [edgesAnimation, nodesAnimation] = [
  getAnimation("engineMinimapEdges"),
  getAnimation("engineMinimapNodes"),
];

function MiniNode({ node, onNavigate }: MiniNodeProps) {
  const data = NODE_BY_ID[node.id];
  const isSelected = node.role === "selected";
  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;

  return (
    <g
      data-mini-node={node.id}
      data-role={node.role}
      style={toneStyle(GROUP_BY_ID[data.group].tone)}
      {...(isSelected
        ? { "aria-current": true }
        : {
            role: "button",
            tabIndex: 0,
            "aria-label": `Show ${data.label}`,
            onClick: () => onNavigate(node.id),
            onKeyDown: (event: KeyboardEvent) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onNavigate(node.id);
              }
            },
          })}
      className={`group outline-none ${isSelected ? "" : "cursor-pointer"}`}
    >
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={8}
        strokeWidth={1.25}
        className={`${NODE_RECT[isSelected ? "active" : "idle"]} group-focus-visible:stroke-focus hover:stroke-[2.5px] group-focus-visible:stroke-[2.5px]`}
      />
      {node.lines.map((line, i) => (
        <text
          key={line}
          x={cx}
          y={cy + (i - (node.lines.length - 1) / 2) * 13}
          textAnchor="middle"
          dominantBaseline="central"
          className="pointer-events-none fill-foreground font-primary text-lg tracking-tight "
        >
          {line}
        </text>
      ))}
    </g>
  );
}

interface EngineMiniMapProps {
  nodeId: EngineNodeId;
  onNavigate: (id: EngineNodeId) => void;
}

export function EngineMiniMap({ nodeId, onNavigate }: EngineMiniMapProps) {
  const layout = MINI_MAPS[nodeId];
  if (!layout) return null;

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      aria-label={`Connections of ${NODE_BY_ID[nodeId].label}`}
      className="size-full aspect-video select-none rounded-xl"
    >
      <g data-layer="edges" className="pointer-events-none">
        <MotionChain key={nodeId} {...edgesAnimation}>
          {layout.edges.map((edge) => (
            <g key={edge.id} data-edge={edge.id}>
              <path
                d={edge.d}
                pathLength={1}
                fill="none"
                strokeWidth={1.5}
                strokeLinecap="round"
                className={EDGE_PATH.active}
              />
              <path d={edge.arrow} className={EDGE_ARROW.active} />
              <text
                x={edge.labelPoint.x}
                y={edge.labelPoint.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={cn(EDGE_LABEL_BASE, EDGE_LABEL.active, "text-sm")}
              >
                {edge.label}
              </text>
            </g>
          ))}
        </MotionChain>
      </g>
      <g data-layer="nodes">
        <MotionChain key={nodeId} {...nodesAnimation}>
          {layout.nodes.map((node) => (
            <MiniNode key={node.id} node={node} onNavigate={onNavigate} />
          ))}
        </MotionChain>
      </g>
    </svg>
  );
}

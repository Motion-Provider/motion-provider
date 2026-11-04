import {
  ENGINE_EDGES,
  ENGINE_GROUPS,
  ENGINE_NODES,
  NODE_HEIGHT,
} from "@/constants/engine.data";
import type {
  EdgeGeometry,
  EngineEdge,
  EngineGroup,
  EngineGroupId,
  EngineNode,
  EngineNodeId,
  Point,
} from "@/types/engine.type";

const CORNER_RADIUS = 8;
const ARROW_LENGTH = 7;
const ARROW_HALF_WIDTH = 4;

function indexBy<K extends string, T>(
  items: readonly T[],
  key: (item: T) => K,
): Record<K, T> {
  const out = {} as Record<K, T>;
  for (const item of items) out[key(item)] = item;
  return out;
}

function recordFrom<K extends string, V>(
  keys: readonly K[],
  value: (key: K) => V,
): Record<K, V> {
  const out = {} as Record<K, V>;
  for (const key of keys) out[key] = value(key);
  return out;
}

const NODE_IDS = ENGINE_NODES.map((node) => node.id);
const GROUP_IDS = ENGINE_GROUPS.map((group) => group.id);

export const NODE_BY_ID = indexBy(ENGINE_NODES, (node) => node.id);
export const GROUP_BY_ID: Record<EngineGroupId, EngineGroup> = indexBy(
  ENGINE_GROUPS,
  (group) => group.id,
);

export const NODES_BY_GROUP: Record<EngineGroupId, EngineNode[]> = recordFrom(
  GROUP_IDS,
  (id) => ENGINE_NODES.filter((node) => node.group === id),
);

const distance = (a: Point, b: Point) =>
  Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

function towards(from: Point, to: Point, by: number): Point {
  const length = distance(from, to);
  if (length === 0) return from;
  return {
    x: from.x + ((to.x - from.x) / length) * by,
    y: from.y + ((to.y - from.y) / length) * by,
  };
}

function simplify(points: readonly Point[]): Point[] {
  const unique = points.filter((p, i) => {
    const prev = points[i - 1];
    return !prev || prev.x !== p.x || prev.y !== p.y;
  });
  return unique.filter((p, i) => {
    const a = unique[i - 1];
    const b = unique[i + 1];
    if (!a || !b) return true;
    return !((a.x === p.x && p.x === b.x) || (a.y === p.y && p.y === b.y));
  });
}

function routePoints(
  start: Point,
  end: Point,
  turns: readonly number[],
): Point[] {
  const points: Point[] = [start];
  let cursor = start;
  turns.forEach((value, i) => {
    cursor =
      i % 2 === 0 ? { x: cursor.x, y: value } : { x: value, y: cursor.y };
    points.push(cursor);
  });
  points.push({ x: end.x, y: cursor.y }, end);
  return simplify(points);
}

function roundedPath(points: readonly Point[]): string {
  const first = points[0];
  const last = points[points.length - 1];
  if (!first || !last) return "";
  let d = `M${first.x} ${first.y}`;
  points.slice(1, -1).forEach((p, i) => {
    const a = points[i];
    const b = points[i + 2];
    if (!a || !b) return;
    const r = Math.min(CORNER_RADIUS, distance(a, p) / 2, distance(p, b) / 2);
    const before = towards(p, a, r);
    const after = towards(p, b, r);
    d += ` L${before.x} ${before.y} Q${p.x} ${p.y} ${after.x} ${after.y}`;
  });
  return `${d} L${last.x} ${last.y}`;
}

function labelPoint(points: readonly Point[], edge: EngineEdge): Point {
  const segments = points.slice(1).flatMap((end, i) => {
    const start = points[i];
    return start ? [{ start, end, length: distance(start, end) }] : [];
  });
  const longest = segments.reduce(
    (best, seg, i) => (seg.length > (segments[best]?.length ?? 0) ? i : best),
    0,
  );
  const seg =
    segments[Math.min(edge.labelSegment ?? longest, segments.length - 1)];
  if (!seg) return { x: 0, y: 0 };
  const t = edge.labelAt ?? 0.5;
  return {
    x: seg.start.x + (seg.end.x - seg.start.x) * t,
    y: seg.start.y + (seg.end.y - seg.start.y) * t,
  };
}

function buildEdge(edge: EngineEdge): EdgeGeometry {
  const from: EngineNode = NODE_BY_ID[edge.from];
  const to: EngineNode = NODE_BY_ID[edge.to];
  const start: Point = {
    x: from.cx + (edge.fromDx ?? 0),
    y: from.y + NODE_HEIGHT,
  };
  const end: Point = { x: to.cx + (edge.toDx ?? 0), y: to.y };
  const points = routePoints(start, end, edge.turns ?? [(start.y + end.y) / 2]);
  return {
    id: edge.id,
    from: edge.from,
    to: edge.to,
    label: edge.label,
    d: roundedPath(points),
    arrow: `M${end.x - ARROW_HALF_WIDTH} ${end.y - ARROW_LENGTH} L${end.x} ${end.y} L${end.x + ARROW_HALF_WIDTH} ${end.y - ARROW_LENGTH} Z`,
    labelPoint: labelPoint(points, edge),
  };
}

export const EDGE_GEOMETRY: readonly EdgeGeometry[] =
  ENGINE_EDGES.map(buildEdge);

export interface NodeLinks {
  incoming: EngineEdge[];
  outgoing: EngineEdge[];
}

export const NODE_LINKS: Record<EngineNodeId, NodeLinks> = recordFrom(
  NODE_IDS,
  (id) => ({
    incoming: ENGINE_EDGES.filter((edge) => edge.to === id),
    outgoing: ENGINE_EDGES.filter((edge) => edge.from === id),
  }),
);

export const NEIGHBORS: Record<
  EngineNodeId,
  ReadonlySet<EngineNodeId>
> = recordFrom(NODE_IDS, (id) => {
  const { incoming, outgoing } = NODE_LINKS[id];
  return new Set([
    ...incoming.map((e) => e.from),
    ...outgoing.map((e) => e.to),
  ]);
});

export const getEngineLabelDelayByIndex = (id: EdgeGeometry["id"]) =>
  ENGINE_EDGES.findIndex((e) => e.id === id) * 0.2;

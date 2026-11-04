export type EngineGroupId =
  | "react-api"
  | "definitions"
  | "drivers"
  | "engine"
  | "platform";

export type EngineTone = "overlay" | "success" | "danger" | "accent" | "muted";

export type EngineNodeId =
  | "motion-chain"
  | "motion"
  | "motion-image"
  | "motion-text"
  | "motion-link"
  | "image-grid"
  | "motion-hooks"
  | "resolver"
  | "preset-registry"
  | "presets"
  | "binding"
  | "controller"
  | "visibility"
  | "scroll"
  | "engine"
  | "timing"
  | "keyframes"
  | "styles"
  | "errors"
  | "waapi";

export interface EngineGroup {
  id: EngineGroupId;
  label: string;
  tone: EngineTone;
  /** Corner for the frame title, chosen so routed edges never cross it. */
  titleAt: "top-left" | "bottom-right";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface EngineNode {
  id: EngineNodeId;
  group: EngineGroupId;
  label: string;
  file?: string;
  summary: string;
  /** Horizontal center in canvas units. */
  cx: number;
  /** Top edge in canvas units. Height is `NODE_HEIGHT`. */
  y: number;
  w: number;
}

export interface EngineEdge {
  id: string;
  from: EngineNodeId;
  to: EngineNodeId;
  label: string;
  /** Offset from the source's bottom-center. */
  fromDx?: number;
  /** Offset from the target's top-center. */
  toDx?: number;
  /**
   * Orthogonal route. Alternates Y, X, Y, … and must have an odd length:
   * go down to turns[0], across to turns[1], down to turns[2], …,
   * then across to the target and down into it. Default: halfway between the nodes.
   */
  turns?: readonly number[];
  /** Index of the route segment that carries the label. Default: the longest. */
  labelSegment?: number;
  /** Position of the label along that segment, 0–1. Default: 0.5. */
  labelAt?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface EdgeGeometry {
  id: string;
  from: EngineNodeId;
  to: EngineNodeId;
  label: string;
  /** Stroke path. Rendered with `pathLength="1"` so dash animations are unit-free. */
  d: string;
  /** Arrow head at the target. */
  arrow: string;
  labelPoint: Point;
}

export type Emphasis = "idle" | "active" | "dimmed";
export type NodeEmphasis = Emphasis | "linked";

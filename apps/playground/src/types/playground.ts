import type { AnimationKeys } from "motion-provider";

export type Attribute = string | number | boolean;
export type ElementNode = {
  id: string;
  tag: string;
  attributes: Record<string, Attribute>;
  style: Record<string, string>;
  children: MarkupNode[];
};
export type MarkupNode = string | ElementNode;
export type ComponentKind =
  | "MotionContainer"
  | "MotionText"
  | "MotionImage"
  | "MotionChain";
export type Layer = {
  id: string;
  tag: string;
  name: string;
  kind: ComponentKind;
  depth: number;
  itemCount: number;
};
export type Markup = {
  nodes: MarkupNode[];
  layers: Layer[];
  styles: string[];
  classes: string[];
  omitted: number;
};

export type Easing =
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "snappy"
  | "smooth";
export type Stagger = "linear" | "wave" | "shuffle" | "bounce";
export type MotionSettings = {
  preset: AnimationKeys;
  duration: number;
  delay: number;
  easing: Easing;
  split: "words" | "chars";
  stagger: number;
  order: Stagger;
  pieces: number;
  interaction: "auto" | "hover" | "click";
};
export type Assignments = Record<string, MotionSettings>;
export type Project = {
  name: string;
  html: string;
  template?: string;
  assignments: Assignments;
};
export type Draft = Project & { id: string; updated: number };
export type View = "preview" | "code";
export type Scope = "individual" | "batch";
export type Device = "desktop" | "mobile";

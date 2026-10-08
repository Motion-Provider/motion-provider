import type { AnimationController } from "motion-provider";

export type ShowcaseSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ShowcaseItemType = "component" | "hook" | "lib";
export type ShowcaseComponent = React.ComponentType<{
  controller?: AnimationController;
}>;

export interface ShowcaseItem {
  id: string;
  imgSrc?: string;
  slot: ShowcaseSlot;
  type: ShowcaseItemType;
  title: string;
  tagline: string;
  desc: string;
  snippet: string;
  Component: ShowcaseComponent;
}

export type ShowcaseSelected = ShowcaseItem["id"] | null;

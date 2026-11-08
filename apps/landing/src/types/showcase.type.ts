import type { AnimationController } from "motion-provider";

type ShowcaseSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ShowcaseItemType = "component" | "hook" | "lib";
export type ShowcaseSelected = ShowcaseItem["id"];

export interface ShowcaseItem {
  id: string;
  imgSrc?: string;
  slot: ShowcaseSlot;
  type: ShowcaseItemType;
  title: string;
  tagline: string;
  desc: string;
  snippet: string;
}

export interface ShowcaseComponentProps {
  controller?: AnimationController;
  className?: string;
}

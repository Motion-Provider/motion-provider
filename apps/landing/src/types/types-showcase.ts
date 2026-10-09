import type { AnimationController } from "motion-provider";

export type ShowcaseSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ShowcaseItemType = "component" | "hook" | "lib";
export type ShowcaseSelected = ShowcaseItem["id"] | null;

export type ShowcaseComponent = React.ComponentType<ShowcaseComponentProps>;

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

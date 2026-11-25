import type { AnimationController } from "motion-provider";

type ShowcaseSlot = 0 | 1 | 2 | 3 | 4 | 5;
export type ShowcaseSelected = ShowcaseItem["id"];

export interface ShowcaseItem {
  id: string;
  imgSrc?: string;
  slot: ShowcaseSlot;
  type: "component";
  title: string;
  tagline: string;
  desc: string;
  snippet: string;
}

export interface ShowcaseComponentProps {
  controller?: AnimationController;
  className?: string;
}

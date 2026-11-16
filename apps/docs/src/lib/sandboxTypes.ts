import type { AnimationController } from "motion-provider";
import type { ComponentType } from "react";

export type Slug = string;

export interface WrapperProps {
  title?: string;
  slug: Slug;
}

export interface ModuleProps {
  controller?: AnimationController;
  className?: string;
}

export interface ComponentModule {
  default: ComponentType<ModuleProps>;
}

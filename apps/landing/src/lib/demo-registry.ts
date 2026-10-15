// src/lib/demo-registry.ts
import { type ComponentType, type LazyExoticComponent, lazy } from "react";
import type showcase from "@/constants/showcase.data";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

type DemoProps = ShowcaseComponentProps;
type DemoModule = { default: ComponentType<DemoProps> };
type DemoComponent = LazyExoticComponent<ComponentType<DemoProps>>;

export type DemoId = (typeof showcase)[number]["id"];

const loaders: Record<DemoId, () => Promise<DemoModule>> = {
  "motion-chain.demo": () =>
    import("@/components/showcase/demo/motion-chain.demo"),
  "motion-container.demo": () =>
    import("@/components/showcase/demo/motion-container.demo"),
  "motion-hooks.demo": () =>
    import("@/components/showcase/demo/motion-hooks.demo"),
  "motion-image.demo": () =>
    import("@/components/showcase/demo/motion-image.demo"),
  "motion-link.demo": () =>
    import("@/components/showcase/demo/motion-link.demo"),
  "motion-motion.demo": () =>
    import("@/components/showcase/demo/motion-motion.demo"),
  "motion-registry.demo": () =>
    import("@/components/showcase/demo/motion-registry.demo"),
  "motion-text.demo": () =>
    import("@/components/showcase/demo/motion-text.demo"),
};

const ids: ReadonlySet<string> = new Set(Object.keys(loaders));
const cache = new Map<DemoId, DemoComponent>();

export function isDemoId(id: string): id is DemoId {
  return ids.has(id);
}

export function getDemo(id: DemoId): DemoComponent {
  const cached = cache.get(id);
  if (cached) return cached;

  const component = lazy(async () => {
    try {
      return await loaders[id]();
    } catch (error: unknown) {
      cache.delete(id);
      throw error;
    }
  });

  cache.set(id, component);
  return component;
}

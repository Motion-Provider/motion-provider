import { type ComponentType, type LazyExoticComponent, lazy } from "react";
import showcase from "@/constants/showcase.data";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

type DemoProps = ShowcaseComponentProps;
type DemoModule = { default: ComponentType<DemoProps> };
type DemoComponent = LazyExoticComponent<ComponentType<DemoProps>>;

export type DemoId = (typeof showcase)[number]["id"];

const ids: ReadonlySet<string> = new Set(showcase.map((item) => item.id));
const cache = new Map<DemoId, DemoComponent>();

export function isDemoId(id: string): id is DemoId {
  return ids.has(id);
}

export function getDemo(id: DemoId): DemoComponent {
  const cached = cache.get(id);
  if (cached) return cached;

  const component = lazy(async () => {
    try {
      return (await import(
        `@/components/showcase/demo/${id}.tsx`
      )) as DemoModule;
    } catch (error: unknown) {
      cache.delete(id);
      throw error;
    }
  });

  cache.set(id, component);
  return component;
}

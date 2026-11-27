import { type ComponentType, type LazyExoticComponent, lazy } from "react";
import type { ComponentModule, ModuleProps, Slug } from "./sandboxTypes";

type RegistryComponent = LazyExoticComponent<ComponentType<ModuleProps>>;

type Loader = () => Promise<ComponentModule>;

const modules = import.meta.glob<ComponentModule>(
  "../../../../docs/examples/**/*.tsx",
);

const loaders = new Map<Slug, Loader>(
  Object.entries(modules).map(([path, load]): [Slug, Loader] => [
    path.replace(/^.*\/docs\/examples\//, "").replace(/\.tsx$/, ""),
    load,
  ]),
);

const cache = new Map<Slug, RegistryComponent>();

export function getComponent(slug: Slug): RegistryComponent {
  const cached = cache.get(slug);

  if (cached) return cached;

  const component: RegistryComponent = lazy(async () => {
    try {
      const load = loaders.get(slug);

      if (!load) throw new Error(`Unknown sandbox slug: "${slug}"`);

      return await load();
    } catch (error: unknown) {
      if (cache.get(slug) === component) cache.delete(slug);

      throw error;
    }
  });

  cache.set(slug, component);

  return component;
}

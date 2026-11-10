import { type CollectionEntry, getCollection } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;

export interface NavItem {
  readonly id: string;
  readonly href: string;
  readonly title: string;
}

export interface NavGroup {
  readonly key: string;
  readonly label: string;
  readonly items: readonly NavItem[];
}

export interface DocsIndex {
  readonly nav: readonly NavGroup[];
  readonly flat: readonly NavItem[];
}

const ROOT_ID = "index";

export function docHref(id: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return id === ROOT_ID ? `${base}/` : `${base}/${id}/`;
}

function groupKey(id: string): string {
  const i = id.indexOf("/");
  return i === -1 ? "" : id.slice(0, i);
}

function humanize(key: string): string {
  const text = key.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function getDocs(): Promise<DocEntry[]> {
  return getCollection(
    "docs",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
}

export function buildIndex(entries: readonly DocEntry[]): DocsIndex {
  const sorted = [...entries].sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );

  const groups = new Map<string, NavItem[]>();
  for (const entry of sorted) {
    const key = groupKey(entry.id);
    const item: NavItem = {
      id: entry.id,
      href: docHref(entry.id),
      title: entry.data.title,
    };
    const list = groups.get(key);
    if (list) {
      list.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  const nav: NavGroup[] = [...groups].map(([key, items]) => ({
    key,
    label: humanize(key),
    items,
  }));

  return { nav, flat: nav.flatMap((group) => group.items) };
}

export function getNeighbors(
  flat: readonly NavItem[],
  id: string,
): { prev: NavItem | undefined; next: NavItem | undefined } {
  const i = flat.findIndex((item) => item.id === id);
  return {
    prev: i > 0 ? flat[i - 1] : undefined,
    next: i >= 0 ? flat[i + 1] : undefined,
  };
}

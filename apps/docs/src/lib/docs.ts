import { type CollectionEntry, getCollection } from "astro:content";

export type DocEntry = CollectionEntry<"docs">;
export type NavSection = "docs" | "api" | "learn";

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
  return id === ROOT_ID ? base : `${base}/${id}`;
}

export function getSection(id: string): NavSection {
  if (id === "api" || id.startsWith("api/")) return "api";
  if (id === "learn" || id.startsWith("learn/")) return "learn";
  return "docs";
}

function groupKey(id: string, section: NavSection): string {
  const relativeId =
    section === "docs"
      ? id
      : id === section
        ? ""
        : id.slice(section.length + 1);

  if (!relativeId) return section === "docs" ? "" : section;

  const separator = relativeId.indexOf("/");
  if (separator === -1) return section === "docs" ? "" : section;

  return relativeId.slice(0, separator);
}

function humanize(key: string): string {
  if (key === "api") return "API";

  const text = key.replace(/-/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function getDocs(): Promise<DocEntry[]> {
  return getCollection(
    "docs",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
}

export function buildIndex(
  entries: readonly DocEntry[],
  section: NavSection,
): DocsIndex {
  const sorted = entries
    .filter((entry) => getSection(entry.id) === section)
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));

  const groups = new Map<string, NavItem[]>();

  for (const entry of sorted) {
    const key = groupKey(entry.id, section);
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
  const index = flat.findIndex((item) => item.id === id);

  return {
    prev: index > 0 ? flat[index - 1] : undefined,
    next: index >= 0 ? flat[index + 1] : undefined,
  };
}

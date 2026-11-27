export interface SearchPage {
  title: string;
  href: string;
  headings: readonly { slug: string; text: string }[];
}

export interface SearchEntry {
  href: string;
  title: string;
  pageTitle?: string;
  titleMatch: string;
  pageMatch: string;
}

const RESULT_LIMIT = 12;

function normalize(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function indexSearchPages(pages: readonly SearchPage[]): SearchEntry[] {
  return pages.flatMap(({ href, title, headings }) => {
    const titleMatch = normalize(title);

    return [
      { href, title, titleMatch, pageMatch: "" },

      ...headings.map(({ slug, text }) => ({
        href: `${href}#${encodeURIComponent(slug)}`,
        title: text,
        pageTitle: title,
        titleMatch: normalize(text),
        pageMatch: titleMatch,
      })),
    ];
  });
}

export function searchDocs(
  index: readonly SearchEntry[],
  query: string,
): SearchEntry[] {
  const phrase = normalize(query);

  if (!phrase) return [];

  const terms = phrase.split(" ");

  const exact: SearchEntry[] = [];

  const prefix: SearchEntry[] = [];

  const partial: SearchEntry[] = [];

  for (const entry of index) {
    const { titleMatch, pageMatch } = entry;

    if (titleMatch === phrase) {
      exact.push(entry);

      if (exact.length === RESULT_LIMIT) return exact;
    } else if (titleMatch.startsWith(phrase)) {
      if (prefix.length < RESULT_LIMIT) prefix.push(entry);
    } else if (
      partial.length < RESULT_LIMIT &&
      terms.every(
        (term) => titleMatch.includes(term) || pageMatch.includes(term),
      ) &&
      terms.some((term) => titleMatch.includes(term))
    ) {
      partial.push(entry);
    }
  }

  return [...exact, ...prefix, ...partial].slice(0, RESULT_LIMIT);
}

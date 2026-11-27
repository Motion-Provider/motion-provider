import { render } from "astro:content";
import type { APIRoute } from "astro";
import exploreData from "../data/explore.data";
import { home } from "../data/home.data";
import { docHref, getDocs } from "../lib/docs";
import type { SearchPage } from "../lib/docs-search";

export const GET: APIRoute = async () => {
  const docs = await getDocs();

  const pages = await Promise.all(
    docs.map(async (entry): Promise<SearchPage> => {
      const { headings } = await render(entry);

      return {
        title: entry.data.title,
        href: docHref(entry.id) || "/",
        headings: headings.map(({ slug, text }) => ({ slug, text })),
      };
    }),
  );

  return Response.json([
    {
      title: home.title,
      href: docHref("index") || "/",

      headings: [
        ...exploreData.map(({ headingId, title }) => ({
          slug: headingId,
          text: title,
        })),
        ...Object.values(home.headings),
      ],
    },

    ...pages,
  ] satisfies SearchPage[]);
};

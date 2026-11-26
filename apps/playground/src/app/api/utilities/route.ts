import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";
import { compile } from "tailwindcss";

const cached = new Map<string, string>();
const resolveModule = createRequire(join(process.cwd(), "package.json"));
let theme: Promise<string> | undefined;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 80_000)
    return new Response("Too many utility classes.", { status: 413 });

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      !Array.isArray(parsed) ||
      parsed.length > 2400 ||
      !parsed.every(
        (entry) => typeof entry === "string" && entry.length <= 2048,
      )
    ) {
      return new Response("Invalid utility classes.", { status: 400 });
    }
    const utilities: string[] = [...new Set<string>(parsed)].sort();
    const key = JSON.stringify(utilities);
    const previous = cached.get(key);
    if (previous !== undefined)
      return new Response(previous, {
        headers: { "Content-Type": "text/css; charset=utf-8" },
      });

    theme ??= readFile(resolveModule.resolve("tailwindcss/theme.css"), "utf8");
    const source = await theme;
    const compiler = await compile(`${source}\n@tailwind utilities;`);
    const css = compiler.build(utilities);
    if (cached.size >= 32) cached.delete(cached.keys().next().value ?? "");
    cached.set(key, css);
    return new Response(css, {
      headers: { "Content-Type": "text/css; charset=utf-8" },
    });
  } catch {
    return new Response("Could not build Tailwind styles.", { status: 422 });
  }
}

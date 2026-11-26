import type { Markup } from "../types/playground";

export async function importMarkup(html: string): Promise<Markup> {
  if (!("Worker" in window)) return (await import("./markup")).readMarkup(html);

  const worker = new Worker(
    new URL("../workers/markup.worker.ts", import.meta.url),
  );
  try {
    return await new Promise<Markup>((resolve, reject) => {
      worker.onmessage = ({
        data,
      }: MessageEvent<{ markup?: Markup; error?: string }>) => {
        if (data.markup) resolve(data.markup);
        else reject(new Error(data.error ?? "Could not read this HTML."));
      };
      worker.onerror = () =>
        reject(new Error("Could not start the HTML parser."));
      worker.postMessage(html);
    });
  } finally {
    worker.terminate();
  }
}

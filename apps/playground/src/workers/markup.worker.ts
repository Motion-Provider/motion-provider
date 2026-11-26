import { readMarkup } from "../lib/markup";

self.onmessage = (event: MessageEvent<string>) => {
  try {
    self.postMessage({ markup: readMarkup(event.data) });
  } catch (error) {
    self.postMessage({
      error:
        error instanceof Error ? error.message : "Could not read this HTML.",
    });
  }
};

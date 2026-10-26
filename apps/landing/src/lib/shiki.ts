import {
  createBundledHighlighter,
  type HighlighterGeneric,
} from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";

type Lang = "tsx";
type Theme = "syntax-theme";

export type Highlighter = HighlighterGeneric<Lang, Theme>;

const createHighlighter = createBundledHighlighter<Lang, Theme>({
  langs: { tsx: () => import("@shikijs/langs/tsx") },
  themes: { "syntax-theme": () => import("@/constants/highlight.theme") },
  engine: () => createJavaScriptRegexEngine(),
});

let instance: Promise<Highlighter | null> | undefined;

export function getHighlighter(): Promise<Highlighter | null> {
  instance ??= createHighlighter({
    langs: ["tsx"],
    themes: ["syntax-theme"],
  }).catch((error: unknown) => {
    console.error("[shiki] failed to create highlighter", error);
    return null;
  });

  return instance;
}

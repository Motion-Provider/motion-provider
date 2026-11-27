import {
  createBundledHighlighter,
  type HighlighterGeneric,
  type ThemedToken,
} from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";

type Lang = "tsx";
type Theme = "syntax-theme";

type Highlighter = HighlighterGeneric<Lang, Theme>;
type Tokenize = (code: string) => readonly (readonly ThemedToken[])[];

const TOKEN_CACHE_LIMIT = 32;

const createHighlighter = createBundledHighlighter<Lang, Theme>({
  langs: { tsx: () => import("@shikijs/langs/tsx") },
  themes: { "syntax-theme": () => import("../constants/highlight.theme") },
  engine: () => createJavaScriptRegexEngine(),
});

function createTokenReader(highlighter: Highlighter): Tokenize {
  const cache = new Map<string, ReturnType<Tokenize>>();

  return (code) => {
    const cached = cache.get(code);
    if (cached) return cached;

    const { tokens } = highlighter.codeToTokens(code, {
      lang: "tsx",
      theme: "syntax-theme",
    });

    if (cache.size >= TOKEN_CACHE_LIMIT) {
      const oldest = cache.keys().next();
      if (!oldest.done) cache.delete(oldest.value);
    }

    cache.set(code, tokens);
    return tokens;
  };
}

let instance: Promise<Tokenize | null> | undefined;

export function getCodeTokenizer(): Promise<Tokenize | null> {
  instance ??= createHighlighter({
    langs: ["tsx"],
    themes: ["syntax-theme"],
  })
    .then(createTokenReader)
    .catch((error: unknown) => {
      console.error("[shiki] failed to create highlighter", error);
      return null;
    });

  return instance;
}

"use client";

import type { ThemedToken } from "@shikijs/core";
import { useEffect, useState } from "react";
import { getCodeTokenizer } from "../lib/shiki";

export function CodePane({ source }: { source: string }) {
  const [highlighted, setHighlighted] = useState<{
    source: string;
    lines: readonly (readonly ThemedToken[])[];
  }>();
  useEffect(() => {
    let active = true;
    if (source.length > 100_000) return;
    void getCodeTokenizer()
      .then((tokenize) => {
        if (active && tokenize)
          setHighlighted({ source, lines: tokenize(source) });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [source]);

  const lines =
    highlighted?.source === source
      ? highlighted.lines
      : source.split("\n").map((content) => [{ content }]);
  return (
    <pre
      tabIndex={0}
      aria-label="Source code"
      className="max-h-[540px] min-h-48 overflow-auto rounded-lg border border-[var(--stroke)] bg-[var(--inset)] px-4 py-3 font-mono text-[13px] leading-6 text-[var(--syntax-plain)]"
    >
      <code>
        {lines.map((tokens, line) => (
          <span key={line} className="block min-h-6">
            <span
              aria-hidden
              className="mr-4 inline-block w-5 text-right text-muted select-none"
            >
              {line + 1}
            </span>
            {tokens.map((token, index) => (
              <span
                key={index}
                style={{ color: "color" in token ? token.color : undefined }}
              >
                {token.content}
              </span>
            ))}
          </span>
        ))}
      </code>
    </pre>
  );
}

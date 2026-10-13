import { ScrollShadow } from "@heroui/react";
import { Highlight } from "prism-react-renderer";
import { useEffect, useEffectEvent, useId, useState } from "react";
import defaultTheme from "@/constants/highlighter.schema";
import data from "@/constants/showcase.data";
import { useShowcase } from "@/providers/showcase.provider";

const theme = {
  ...defaultTheme,
  plain: { ...defaultTheme.plain, backgroundColor: "rgba(0,0,0,0)" },
};

export function ShowcaseSnippet() {
  const { selected } = useShowcase();
  const [expanded, setExpanded] = useState<boolean>(false);

  const contentId = useId();
  const snippet = data.find((i) => i.id === selected)?.snippet ?? null;

  const resetExpandedEvent = useEffectEvent(
    () => expanded && setExpanded(false),
  );

  useEffect(() => {
    if (selected === "motion-container.demo") return;

    resetExpandedEvent();
  }, [selected]);

  if (!snippet) return null;

  return (
    <div
      className={`absolute bottom-0 left-0 z-99 w-full border-t border-border bg-surface/20 backdrop-blur-lg selection:bg-accent selection:text-black transition-[height] duration-300 ease-in-out motion-reduce:transition-none ${
        expanded ? "h-56" : "h-28"
      }`}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={expanded ? "Collapse snippet" : "Expand snippet"}
        className="absolute right-3 top-2 z-10 grid size-7 place-items-center rounded-full border border-border bg-surface/60 text-muted backdrop-blur-md transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`size-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      <ScrollShadow id={contentId} className="grid size-full place-items-start">
        <Highlight theme={theme} code={snippet} language="tsx">
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={style}
              className="size-auto -mt-1 overflow-hidden rounded-3xl p-4 font-secondary text-left text-xs whitespace-pre"
            >
              {tokens.map((line, lineIndex) => {
                const { style: lineStyle } = getLineProps({ line });

                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static data
                    key={lineIndex}
                    style={lineStyle}
                    className="flex w-full whitespace-pre"
                  >
                    <span
                      className="mr-4 inline-block w-5 shrink-0 select-none text-right text-muted"
                      aria-hidden="true"
                    >
                      {lineIndex + 1}
                    </span>

                    <span className="min-w-0">
                      {line.map((token, tokenIndex) => {
                        const { style: tokenStyle, children } = getTokenProps({
                          token,
                        });

                        return (
                          // biome-ignore lint/suspicious/noArrayIndexKey: static data
                          <span key={tokenIndex} style={tokenStyle}>
                            {children}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </ScrollShadow>
    </div>
  );
}

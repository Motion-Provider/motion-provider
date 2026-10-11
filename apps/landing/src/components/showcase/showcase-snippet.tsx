import { ScrollShadow } from "@heroui/react";
import { Highlight } from "prism-react-renderer";
import defaultTheme from "@/constants/highlighter.schema";
import data from "@/constants/showcase.data";
import { useShowcase } from "@/providers/showcase.provider";

const theme = {
  ...defaultTheme,
  plain: { ...defaultTheme.plain, backgroundColor: "rgba(0,0,0,0)" },
};

export function ShowcaseSnippet() {
  const { selected } = useShowcase();
  const snippet = data.find((i) => i.id === selected)?.snippet ?? null;

  if (!snippet) return null;

  return (
    <ScrollShadow className="absolute bottom-0 left-0 grid h-28 w-full place-items-start bg-surface/20 border-t border-border z-99 backdrop-blur-lg selection:bg-accent selection:text-black overflow">
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
  );
}

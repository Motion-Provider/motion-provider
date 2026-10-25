import type { ComponentType, SVGProps } from "react";
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { SyntaxHighlighter } from "@/components/syntax-highlighter";
import { getHighlighter } from "@/lib/shiki";

const highlighterPromise = getHighlighter();

const FILE_NAME = "App.tsx";

const CODE_CLASS_NAME =
  "h-auto w-max min-w-full p-4 font-secondary text-left text-xs whitespace-pre text-(--syntax-plain)";

function PlainCode({ code }: { code: string }) {
  return <pre className={CODE_CLASS_NAME}>{code}</pre>;
}

function HighlightedCode({ code }: { code: string }) {
  const highlighter = use(highlighterPromise);
  if (!highlighter) return null;

  const { tokens } = highlighter.codeToTokens(code, {
    lang: "tsx",
    theme: "circle-theme",
  });

  return (
    <SyntaxHighlighter
      tokens={tokens}
      className={CODE_CLASS_NAME}
      wrapperClassName="flex w-full flex-col items-stretch text-left"
      lineClassName="flex w-full whitespace-pre"
      withLineIndex
      animationProps={undefined}
    />
  );
}

type DxCodePaneProps = {
  code: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function DxCodePane({ code, label, icon: Icon }: DxCodePaneProps) {
  const lineCount = code.split("\n").length;

  return (
    <div className="flex size-full min-h-0 min-w-0 flex-col">
      <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3 text-xs text-muted">
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span className="truncate font-medium text-foreground">{label}</span>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <span>{FILE_NAME}</span>
          <span aria-hidden="true">·</span>
          <span>{lineCount} lines</span>
        </span>
      </header>
      <div
        role="region"
        aria-label={`${label} code`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard focusable
        tabIndex={0}
        className="min-h-0 flex-1 overflow-auto outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus"
      >
        <ErrorBoundary fallback={<PlainCode code={code} />} resetKeys={[code]}>
          <Suspense fallback={<PlainCode code={code} />}>
            <HighlightedCode code={code} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

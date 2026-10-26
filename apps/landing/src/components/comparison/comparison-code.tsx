import type { Attributes, ComponentType, SVGProps } from "react";
import { memo, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import {
  type AnimationMode,
  type SyntaxAnimationProps,
  SyntaxHighlighter,
} from "@/components/syntax-highlighter";

const CODE_CLASS_NAME =
  "h-auto w-max min-w-full p-4 font-secondary text-left text-xs whitespace-pre text-(--syntax-plain)";

function PlainCode({ code }: { code: string }) {
  return <pre className={CODE_CLASS_NAME}>{code}</pre>;
}

export type DxCodePaneAnimation =
  | { animationMode?: undefined; animationProps?: undefined }
  | { animationMode: "chain"; animationProps: SyntaxAnimationProps<"chain"> }
  | { animationMode: "text"; animationProps: SyntaxAnimationProps<"text"> };

type DxCodePaneProps = {
  code: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  animationKey?: Attributes["key"];
} & DxCodePaneAnimation;

export const DxCodePane = memo(function DxCodePane({
  code,
  label,
  icon: Icon,
  animationMode,
  animationProps,
  animationKey,
}: DxCodePaneProps) {
  return (
    <div className="flex size-full min-h-0 min-w-0 flex-col">
      <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3 text-xs text-muted">
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span className="truncate font-medium text-foreground">{label}</span>
      </header>
      {/** biome-ignore lint/a11y/useSemanticElements: dynamic content */}
      <div
        role="region"
        aria-label={`${label} code`}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region must be keyboard focusable
        tabIndex={0}
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-scroll outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus "
      >
        <ErrorBoundary fallback={<PlainCode code={code} />} resetKeys={[code]}>
          <Suspense fallback={<PlainCode code={code} />}>
            <SyntaxHighlighter<AnimationMode>
              code={code}
              className={CODE_CLASS_NAME}
              wrapperClassName="flex w-full flex-col items-stretch text-left"
              lineClassName="flex w-full whitespace-pre"
              withLineIndex
              animationMode={animationMode}
              animationProps={animationProps}
              animationKey={animationKey}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
});

import type { ThemedToken } from "@shikijs/core";
import {
  type MotionAnimationProps,
  MotionChain,
  type MotionChainConfigProps,
  type MotionControllerProps,
  MotionText,
  type MotionTextConfigProps,
} from "motion-provider";
import { type Attributes, type CSSProperties, type FC, use } from "react";
import { getHighlighter } from "@/lib/shiki";

type FontOptions = {
  italic: number;
  bold: number;
  underline: number;
};

export type AnimationMode = "chain" | "text" | undefined;

export type SyntaxAnimationProps<T = AnimationMode> = {
  animation?: MotionAnimationProps;
  config?: T extends "chain" ? MotionChainConfigProps : MotionTextConfigProps;
  controller?: MotionControllerProps;
};

interface Props<T = AnimationMode> {
  animationMode?: T;
  animationKey?: Attributes["key"];
  fontOptions?: FontOptions;
  animationProps: T extends "chain" | "text"
    ? SyntaxAnimationProps<T>
    : undefined;
  /** @description for outermost`<pre>` element */
  className?: string;
  /** @description for the wrapper of `line` which carries tokens */
  lineClassName?: string;
  /** @description for chain if `animationMode` is defined otherwise for <div> */
  wrapperClassName?: string;
  withLineIndex?: boolean;
  code: string;
}

const INITIAL_FONT_OPTIONS = {
  italic: 1,
  bold: 2,
  underline: 4,
} as const satisfies FontOptions;

function getTokenStyle(
  { color, fontStyle }: Pick<ThemedToken, "color" | "fontStyle">,
  fontOptions: FontOptions = INITIAL_FONT_OPTIONS,
): CSSProperties {
  const style: CSSProperties = {};

  if (color) style.color = color;

  if (fontStyle !== undefined && fontStyle > 0) {
    if ((fontStyle & fontOptions.italic) !== 0) style.fontStyle = "italic";
    if ((fontStyle & fontOptions.bold) !== 0) style.fontWeight = 700;
    if ((fontStyle & fontOptions.underline) !== 0)
      style.textDecoration = "underline";
  }

  return style;
}

const highlighterPromise = getHighlighter();

export function SyntaxHighlighter<T extends Props["animationMode"]>({
  lineClassName,
  fontOptions = INITIAL_FONT_OPTIONS,
  withLineIndex,
  code,
  ...props
}: Props<T>) {
  const highlighter = use(highlighterPromise);
  if (!highlighter) return null;

  const { tokens } = highlighter.codeToTokens(code, {
    lang: "tsx",
    theme: "syntax-theme",
  });

  const lineIndexWidth = `${String(tokens.length).length}ch`;

  return (
    <Wrapper {...props}>
      {tokens.map((line, lineIndex) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static data
          key={lineIndex}
          className={lineClassName}
        >
          {withLineIndex && (
            <span
              className="mr-4 inline-block shrink-0 select-none text-right text-muted"
              style={{ width: lineIndexWidth }}
              aria-hidden="true"
            >
              {lineIndex + 1}
            </span>
          )}
          {line.map((token) => (
            <Line
              key={token.offset}
              token={token}
              animationProps={{
                ...props.animationProps,
              }}
              isAnimated={props.animationMode === "text"}
            />
          ))}
        </div>
      ))}
    </Wrapper>
  );
}

const Line: FC<
  {
    token: ThemedToken;
    isAnimated?: boolean;
  } & Pick<Props<"text">, "animationProps">
> = ({ token, isAnimated, animationProps }) => (
  <span key={token.offset} style={getTokenStyle(token)}>
    {isAnimated ? (
      <MotionText
        animation={{
          mode: animationProps.animation?.mode ?? "fadeIn",
          ...animationProps.animation,
        }}
      >
        {token.content}
      </MotionText>
    ) : (
      token.content
    )}
  </span>
);

function Wrapper({
  animationKey,
  animationProps,
  animationMode,
  className,
  wrapperClassName,
  children,
}: Omit<Props, "fontOptions" | "lineClassName" | "tokens" | "code"> & {
  children: React.ReactNode;
}) {
  const isAnimated =
    typeof animationMode !== "undefined" && animationMode === "chain";

  if (!isAnimated)
    return (
      <pre className={className}>
        <div className={wrapperClassName}>{children}</div>
      </pre>
    );

  return (
    <pre className={className}>
      <MotionChain
        key={animationKey}
        className={wrapperClassName}
        {...animationProps}
      >
        {children}
      </MotionChain>
    </pre>
  );
}

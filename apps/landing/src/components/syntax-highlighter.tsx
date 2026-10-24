import type { ThemedToken } from "@shikijs/core";
import {
  type MotionAnimationProps,
  MotionChain,
  type MotionChainConfigProps,
  type MotionTextConfigProps,
} from "motion-provider";
import type { Attributes, CSSProperties } from "react";

type AnimationMode = "chain" | "text" | undefined;
type FontOptions = {
  italic: number;
  bold: number;
  underline: number;
};
type SyntaxAnimationProps<T = AnimationMode> = {
  animation: MotionAnimationProps;
  config: T extends "chain" ? MotionChainConfigProps : MotionTextConfigProps;
};

interface Props<T = AnimationMode> {
  animationMode?: T;
  tokens: ThemedToken[][];
  animationKey: Attributes["key"];
  fontOptions?: FontOptions;
  animationProps: T extends "chain" | "text"
    ? SyntaxAnimationProps<T>
    : undefined;
  className?: string;
  lineClassName?: string;
  wrapperClassName?: string;
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

export function SyntaxHighlighter<T extends Props["animationMode"]>({
  tokens,
  lineClassName,
  fontOptions = INITIAL_FONT_OPTIONS,
  ...props
}: Props<T>) {
  return (
    <Wrapper {...props}>
      {tokens.map((line, lineIndex) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static data
          key={lineIndex}
          className={lineClassName}
        >
          {line.map((token) => (
            <span key={token.offset} style={getTokenStyle(token)}>
              {token.content}
            </span>
          ))}
        </div>
      ))}
    </Wrapper>
  );
}

function Wrapper({
  animationKey,
  animationProps,
  animationMode,
  className,
  wrapperClassName,
  children,
}: Omit<Props, "fontOptions" | "lineClassName" | "tokens"> & {
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
        animation={animationProps?.animation}
        config={animationProps?.config}
        elementType="div"
        className={wrapperClassName}
      >
        {children}
      </MotionChain>
    </pre>
  );
}

// const Line: FC<
//   {
//     token: ThemedToken;
//     idx: number;
//     isAnimated?: boolean;
//   } & Pick<Props<"text">, "animationProps">
// > = ({ idx, token, isAnimated, animationProps }) => {};

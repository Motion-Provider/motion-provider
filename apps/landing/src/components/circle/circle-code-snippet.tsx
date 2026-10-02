import { MotionChain, type MotionChainProps } from "motion-provider";
import {
  Highlight,
  type LineInputProps,
  type LineOutputProps,
  type Token,
  type TokenInputProps,
  type TokenOutputProps,
} from "prism-react-renderer";
import theme from "@/constants/highlighter.schema";
import { cn } from "@/lib/utils";

const demoCode = `import { Motion } from 'motion-provider'
import { Triangle } from '@/components/triangle'

function App() {
  return (
    <Motion>
      <Circle />
    </Motion>
  )
}`;

interface SnippetProps {
  tokens: Token[][];
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
}

export function CircleCodeSnippet({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "max-w-md backdrop-blur-3xl w-fit pointer-events-none border border-glass-border",
        className,
      )}
    >
      <Highlight theme={theme} code={demoCode} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className="font-secondary p-4 -mt-1 whitespace-pre text-left rounded-3xl text-xs"
          >
            <Snippet
              getLineProps={getLineProps}
              getTokenProps={getTokenProps}
              tokens={tokens}
            />
          </pre>
        )}
      </Highlight>
    </div>
  );
}

const animation: MotionChainProps["animation"] = {
  mode: ["fadeIn", "filterBlurIn"],
  transition: "gentle",
  duration: 1,
  delay: 1,
} as const;

function Snippet({ getLineProps, getTokenProps, tokens }: SnippetProps) {
  return (
    <MotionChain
      animation={animation}
      elementType="div"
      config={{
        delayLogic: "linear",
        duration: 0.15,
      }}
      className="flex w-full flex-col items-stretch text-left"
    >
      {tokens.map((line, lineIndex) => {
        const { style: lineStyle } = getLineProps({ line });

        return (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static data
            key={lineIndex}
            style={lineStyle}
            className="block w-full text-left whitespace-pre"
          >
            {line.map((token, tokenIndex) => {
              const { style: tokenStyle, children } = getTokenProps({ token });

              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: static data
                <span key={tokenIndex} style={tokenStyle}>
                  {children}
                </span>
              );
            })}
          </div>
        );
      })}
    </MotionChain>
  );
}

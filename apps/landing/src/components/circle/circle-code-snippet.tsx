import {
  type AnimationKeys,
  MotionChain,
  type TransitionKeys,
} from "motion-provider";
import dynamic from "next/dynamic";
import {
  Highlight,
  type LineInputProps,
  type LineOutputProps,
  type Token,
  type TokenInputProps,
  type TokenOutputProps,
} from "prism-react-renderer";
import theme from "@/constants/highlighter.schema";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";
import { ContainerWrapper } from "../container";

const Loader = dynamic(
  () =>
    import("./circle-snippet-loader").then(
      ({ CircleSnippetLoader }) => CircleSnippetLoader,
    ),
  { ssr: false },
);

const importCode = `import { MotionContainer } from 'motion-provider'
import { Triangle } from '@/components/triangle'

`,
  prefixCode = `export function App() {
  return (
    <MotionContainer 
      animation={{`,
  closeCode = `\t  }}
      elementType="div"
    >
      <Triangle />
    </MotionContainer>
  )
}`;

function generateMotionCode(
  animationKeys: AnimationKeys[],
  transition: TransitionKeys,
) {
  const props = `
        mode: ['${animationKeys.join("', '")}'],      
        transition: '${transition}',
`;
  return `${importCode}${prefixCode}${props}${closeCode}`.trim();
}

interface SnippetProps {
  tokens: Token[][];
  getLineProps: (input: LineInputProps) => LineOutputProps;
  getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  animationKey: string;
}

export function CircleCodeSnippet({ className }: { className?: string }) {
  const { animations, transition } = useCircle();

  const keys = animations.join(",");

  const code = useDebouncedValue(
    1000,
    generateMotionCode(animations, transition),
  );
  const animationKey = useDebouncedValue(1000, keys);

  return (
    <ContainerWrapper<"div">
      aria-hidden="true"
      as="div"
      width="md"
      radius="3xl"
      surface="glass"
      scales={{
        sides: ["left", "right", "bottom", "top"],
        size: 13,
        offset: 2,
        thickness: 12,
        opacity: 0.9,
        orientation: "diagonal",
      }}
      innerClassName="flex size-full rounded-3xl relative"
      className={cn(
        "w-md backdrop-blur-3xl pointer-events-none",
        "flex items-center-safe justify-center-safe rounded-3xl",
        className,
      )}
    >
      <Loader keys={keys} />
      <Highlight theme={theme} code={code} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            style={style}
            className="font-secondary p-4 -mt-1 whitespace-pre text-left rounded-3xl text-xs size-full"
          >
            <Snippet
              getLineProps={getLineProps}
              getTokenProps={getTokenProps}
              tokens={tokens}
              animationKey={animationKey}
            />
          </pre>
        )}
      </Highlight>
    </ContainerWrapper>
  );
}

function Snippet({
  getLineProps,
  getTokenProps,
  tokens,
  animationKey,
}: SnippetProps) {
  return (
    <MotionChain
      key={animationKey}
      animation={{
        mode: ["fadeDown", "filterBlurIn"],
        transition: "gentle",
        duration: 1,
        delay: 0.25,
      }}
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

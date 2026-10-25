import { Skeleton } from "@heroui/react";
import type { AnimationKeys, TransitionKeys } from "motion-provider";
import dynamic from "next/dynamic";
import { Suspense, use } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { getHighlighter } from "@/lib/shiki";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";
import { ContainerWrapper } from "../container";
import { SyntaxHighlighter } from "../syntax-highlighter";

const Loader = dynamic(
  () =>
    import("./circle-snippet-loader").then(
      ({ CircleSnippetLoader }) => CircleSnippetLoader,
    ),
  { ssr: false },
);

const highlighterPromise = getHighlighter();

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

interface HighlightedCodeProps {
  code: string;
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
    <Suspense
      name="circle-code-suspense"
      fallback={
        <Skeleton
          aria-hidden="true"
          className={cn(
            "w-md backdrop-blur-3xl pointer-events-none",
            "flex items-center-safe justify-center-safe rounded-3xl",
            className,
          )}
        />
      }
    >
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
        <HighlightedCode code={code} animationKey={animationKey} />
      </ContainerWrapper>
    </Suspense>
  );
}

function HighlightedCode({ code, animationKey }: HighlightedCodeProps) {
  const highlighter = use(highlighterPromise);

  if (!highlighter) return null;

  const { tokens } = highlighter.codeToTokens(code, {
    lang: "tsx",
    theme: "circle-theme",
  });

  return (
    <SyntaxHighlighter<"chain">
      tokens={tokens}
      animationMode="chain"
      animationKey={animationKey}
      className="font-secondary p-4 -mt-1 whitespace-pre text-left rounded-3xl text-xs size-full text-(--syntax-plain) bg-(--syntax-bg)"
      wrapperClassName="flex w-full flex-col items-stretch text-left"
      lineClassName="block w-full min-h-lh text-left whitespace-pre"
      animationProps={{
        animation: {
          mode: ["fadeDown", "filterBlurIn"],
          transition: "gentle",
          duration: 1,
          delay: 0.25,
        },
        config: {
          delayLogic: "linear",
          duration: 0.15,
        },
      }}
    />
  );
}

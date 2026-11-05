import { Button, InfoIcon, Spinner } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { MotionContainer, useController } from "motion-provider";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import showcaseData from "@/constants/showcase.data";
import { getDemo, isDemoId } from "@/lib/demo-registry";
import { getAnimation } from "@/lib/motion";
import { useShowcase } from "@/providers/showcase.provider";
import { CountDigit } from "../count-digit";
import { GithubIcon } from "../icons/github-icon";
import { ShowcaseInfo } from "./showcase-info";

const animation = getAnimation("showcaseComponentReRender");

export function ShowcaseComponent() {
  const { selected } = useShowcase();
  const controller = useController();

  function handleReset() {
    controller.reset();
    controller.play();
  }

  if (!isDemoId(selected)) return null;

  const Demo = getDemo(selected);

  const githubURL = `https://github.com/Motion-Provider/motion-provider/blob/main/apps/landing/src/components/showcase/demo/${selected}.tsx`;

  const { desc, title, tagline, slot } =
    showcaseData.find((item) => item.id === selected) || showcaseData[0];
  return (
    <>
      <ErrorBoundary
        resetKeys={[selected]}
        fallbackRender={({ resetErrorBoundary }) => (
          <div role="alert" className="flex flex-col items-center gap-3">
            <p className="text-sm">Failed to load demo.</p>
            <Button variant="primary" size="md" onClick={resetErrorBoundary}>
              Retry
            </Button>
          </div>
        )}
      >
        <Suspense
          key={selected}
          name="showcase-component-suspense"
          fallback={<Spinner size="lg" />}
        >
          <Demo controller={controller} className="mb-20" />
        </Suspense>
      </ErrorBoundary>
      <div className="w-full z-50 flex gap-2 absolute top-0 p-2 flex-row justify-end">
        <div className="flex gap-2">
          <Link href={githubURL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" isIconOnly>
              <GithubIcon />
            </Button>
          </Link>
          <ShowcaseInfo
            render={() => (
              <Button variant="outline" isIconOnly>
                <InfoIcon />
              </Button>
            )}
            header={title}
            className="text-xl tracking-tighter font-mono font-semibold text-accent relative"
          >
            <div className="flex flex-col gap-4 z-50">
              <span className="italic text-white">"{tagline}"</span>
              <span>{desc}</span>
            </div>
            <div className="absolute -top-12 right-0 -z-20 bg-clip-text bg-linear-to-b from-foreground/20 to-transparent from-50%">
              <CountDigit
                digit={slot + 1}
                className="text-5xl font-mono text-transparent"
              />
            </div>
          </ShowcaseInfo>
        </div>
        <Button variant="primary" size="md" onClick={handleReset}>
          Re-render
          <MotionContainer {...animation} controller={controller}>
            <RotateCcw className="size-4" />
          </MotionContainer>
        </Button>
      </div>
    </>
  );
}

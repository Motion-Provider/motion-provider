import { Button, Spinner } from "@heroui/react";
import { InfoIcon, RotateCcw } from "lucide-react";
import { MotionContainer, useController } from "motion-provider";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getDemo, isDemoId } from "@/lib/demo-registry";
import { getAnimation } from "@/lib/motion";
import { useShowcase } from "@/providers/showcase.provider";
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
          <Demo controller={controller} className="mb-8" />
        </Suspense>
      </ErrorBoundary>
      <div className="w-full z-50 flex gap-2 absolute top-0 p-2 flex-row justify-between">
        <div className="flex gap-2">
          <Link href={githubURL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" isIconOnly>
              <GithubIcon />
            </Button>
          </Link>
          <ShowcaseInfo rendered={<ShowcaseInfo />}>
            <Button variant="outline" isIconOnly>
              <InfoIcon />
            </Button>
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

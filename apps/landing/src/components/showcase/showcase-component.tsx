import { Button, Spinner } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { MotionContainer, useController } from "motion-provider";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getDemo, isDemoId } from "@/lib/demo-registry";
import { useShowcase } from "@/providers/showcase.provider";
import { GithubIcon } from "../github-icon";

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
        <Suspense key={selected} fallback={<Spinner size="lg" />}>
          <Demo controller={controller} className="mb-8" />
        </Suspense>
      </ErrorBoundary>
      <div className="flex gap-2 absolute top-6 right-6 rounded-full z-50">
        <Button variant="primary" size="md" onClick={handleReset}>
          Re-render
          <MotionContainer
            animation={{
              mode: "spin",
              transition: "bounceSoft",
              duration: 1,
            }}
            controller={controller}
          >
            <RotateCcw className="size-4" />
          </MotionContainer>
        </Button>
        <Link href={githubURL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" isIconOnly>
            <GithubIcon />
          </Button>
        </Link>
      </div>
    </>
  );
}

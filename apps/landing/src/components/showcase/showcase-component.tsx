import { Button, Spinner } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { MotionContainer, useController } from "motion-provider";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getDemo, isDemoId } from "@/lib/demo-registry";
import { useShowcase } from "@/providers/showcase.provider";

export function ShowcaseComponent() {
  const { selected } = useShowcase();
  const controller = useController();

  function handleReset() {
    controller.reset();
    controller.play();
  }

  if (!selected || !isDemoId(selected)) return null;

  const Demo = getDemo(selected);

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
          <Demo className="" controller={controller} />
        </Suspense>
      </ErrorBoundary>
      <Button
        className="absolute top-4 right-4 rounded-full"
        variant="primary"
        size="md"
        onClick={handleReset}
      >
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
    </>
  );
}

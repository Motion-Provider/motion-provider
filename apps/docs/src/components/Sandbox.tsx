import {
  type AnimationController,
  MotionContainer,
  useController,
} from "motion-provider";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getComponent } from "@/lib/getComponent";
import type { Slug, WrapperProps } from "@/lib/sandboxTypes";

const buttonClass =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none cursor-pointer active:scale-95";

interface DemoProps {
  slug: Slug;
  controller: AnimationController;
}

function Demo({ slug, controller }: DemoProps) {
  const Component = getComponent(slug);

  useEffect(() => {
    controller.play();
  }, [controller]);

  return (
    <div className="grid h-80 w-full min-w-0 grid-cols-1 place-items-center-safe gap-3 overflow-auto -mt-4">
      <Component controller={controller} />
    </div>
  );
}

export default function Sandbox({
  slug,
  withButton,
}: Omit<WrapperProps, "title">) {
  const controller = useController();

  function handleReset() {
    controller.reset();
    controller.play();
  }

  return (
    <>
      <ErrorBoundary
        key={slug}
        fallbackRender={({ resetErrorBoundary, error }) => {
          const isErrorMsg = error instanceof Error;
          const errorMsg = isErrorMsg ?? null;

          return (
            <div
              role="alert"
              className="flex h-80 flex-col items-center justify-center gap-3 overflow-auto rounded-lg border border-danger/40 bg-danger/10 p-6"
            >
              <p className="text-sm text-foreground">Failed to load demo.</p>
              {errorMsg && (
                <span className="break-all">{JSON.stringify(errorMsg)}</span>
              )}
              <button
                type="button"
                onClick={resetErrorBoundary}
                className={buttonClass}
              >
                Retry
              </button>
            </div>
          );
        }}
      >
        <Suspense
          fallback={
            <div className="flex h-80 items-center justify-center">
              <svg
                role="status"
                aria-label="Loading demo"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-10 animate-spin text-accent motion-reduce:animate-none"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          }
        >
          <Demo slug={slug} controller={controller} />
        </Suspense>
      </ErrorBoundary>
      {withButton && (
        <button
          type="button"
          onClick={handleReset}
          className={`absolute top-3 right-3 z-50 ${buttonClass}`}
        >
          Re-render
          <MotionContainer
            animation={{
              mode: "spin",
              direction: "reverse",
              transition: "easeIn",
              duration: 1,
            }}
            controller={controller}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="block size-4"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </MotionContainer>
        </button>
      )}
    </>
  );
}

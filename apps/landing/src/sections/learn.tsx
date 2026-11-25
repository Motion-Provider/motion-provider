import { Button, Spinner } from "@heroui/react";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import {
  type AnimationController,
  MotionText,
  useController,
} from "motion-provider";
import Link from "next/link";
import { type ComponentType, lazy, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ContainerWrapper } from "@/components/container";
import { type LearnDemoProps, learnDemos } from "@/constants/learn-demos.data";
import { cn } from "@/lib/utils";
import IntersectionProvider from "@/providers/intersection.provider";
import learnCards, {
  type LearnCardItem,
} from "../../../docs/src/data/learnCards.data";

const docsUrl = "https://docs.motionprovider.dev";
const examplesUrl =
  "https://github.com/Motion-Provider/motion-provider/blob/main/docs/examples";
const loadAhead = { rootMargin: "240px 0px" };
const loading = <Spinner aria-label="Loading example" size="sm" />;

function LearnPreview({
  Demo,
  controller,
  autoplay,
}: {
  Demo: ComponentType<LearnDemoProps>;
  controller: AnimationController;
  autoplay: boolean;
}) {
  useEffect(() => {
    if (autoplay) controller.play();
  }, [autoplay, controller]);

  return <Demo controller={controller} />;
}

function LearnCard({ card }: { card: LearnCardItem }) {
  const { title, hint, columns, stage, load } = learnDemos[card.slug];
  const controller = useController();
  const [Demo, setDemo] = useState(() => lazy(load));
  const featured = card.slug === "cas-4";
  const draft = "draft" in card && card.draft;

  return (
    <li className={cn("min-w-0", columns)}>
      <article
        className={cn(
          "flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface/65",
          featured && "lg:grid lg:grid-cols-[minmax(14rem,1fr)_3fr]",
        )}
      >
        <header
          className={cn(
            "flex min-w-0 items-start justify-between gap-1 border-b border-border/80 px-4 py-3 sm:gap-2",
            featured &&
              "lg:flex-col lg:justify-center lg:gap-3 lg:border-r lg:border-b-0 lg:p-6",
          )}
        >
          <div className="min-w-0 self-center lg:self-auto">
            <h3 className="font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-1 text-xs leading-snug text-muted">{hint}</p>
          </div>
          <div className="flex shrink-0 items-center">
            {card.withButton && (
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Replay SVG path drawing"
                className="size-10 rounded-full text-muted hover:text-accent motion-reduce:transition-none"
                onPress={() => {
                  controller.reset();
                  controller.play();
                }}
              >
                <RotateCcw aria-hidden="true" className="size-4" />
              </Button>
            )}
            <a
              href={
                draft
                  ? `${examplesUrl}/${card.slug}.tsx`
                  : `${docsUrl}/${card.docId}`
              }
              aria-label={`${draft ? "View source for" : "Read the guide for"} ${title}`}
              title={draft ? "View source" : "Read the guide"}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-surface-secondary hover:text-accent focus-visible:outline-2 focus-visible:outline-focus motion-reduce:transition-none"
            >
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </header>
        <IntersectionProvider
          className={cn(
            "grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)] place-items-center",
            featured ? "min-h-64" : "min-h-80",
            stage,
          )}
          fallback={loading}
          options={loadAhead}
        >
          <ErrorBoundary
            onReset={() => setDemo(() => lazy(load))}
            fallbackRender={({ resetErrorBoundary }) => (
              <div
                role="alert"
                className="flex flex-col items-center gap-3 px-4 text-center text-sm text-muted"
              >
                <p>Example failed to load.</p>
                <Button
                  size="sm"
                  variant="secondary"
                  onPress={() => resetErrorBoundary()}
                >
                  Try again
                </Button>
              </div>
            )}
          >
            <Suspense fallback={loading}>
              <LearnPreview
                Demo={Demo}
                controller={controller}
                autoplay={card.withButton}
              />
            </Suspense>
          </ErrorBoundary>
        </IntersectionProvider>
      </article>
    </li>
  );
}

export default function LearnSection() {
  return (
    <section
      id="learn"
      aria-labelledby="learn-title"
      className="relative isolate scroll-mt-24 px-3 py-16 sm:px-6 "
    >
      <ContainerWrapper
        width="7xl"
        radius="3xl"
        frame={{ sides: ["top", "right", "bottom", "left"] }}
        grid={{ axis: "both", size: 32, opacity: 0.6 }}
        scales={{ sides: ["bottom"], size: 10, thickness: 18, opacity: 0.5 }}
        innerClassName="bg-background/70 p-2 sm:p-4 lg:p-5"
      >
        <header className="relative flex flex-wrap items-end justify-between gap-5 px-3 pt-6 pb-7 sm:px-5 sm:pt-8 sm:pb-9">
          <div className="min-w-0">
            <MotionText
              animation={{
                mode: ["fadeUp", "filterBlurIn", "rotateFlipY"],
              }}
              config={{
                mode: "chars",
                delayLogic: "chaotic",
              }}
              id="learn-title"
              elementType="h2"
              wrapperClassName="text-4xl leading-tight tracking-tighter text-pretty sm:text-5xl lg:text-6xl last:text-accent"
            >
              Motion in practice.
            </MotionText>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-pretty text-muted sm:text-base">
              Try live examples, then follow the guides to build them yourself.
            </p>
          </div>
          <Link href={`${docsUrl}/learn`} target="_blank" className="relative">
            <Button>
              Browse tutorials
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          </Link>
        </header>
        <ul className="relative grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-2 lg:grid-cols-12">
          {learnCards.map((card) => (
            <LearnCard key={card.slug} card={card} />
          ))}
        </ul>
      </ContainerWrapper>
    </section>
  );
}

import { ScrollShadow, Skeleton } from "@heroui/react";
import { ChevronUpIcon } from "lucide-react";
import { Suspense, useEffect, useEffectEvent, useId, useState } from "react";
import data from "@/constants/showcase.data";
import { cn } from "@/lib/utils";
import { useShowcase } from "@/providers/showcase.provider";
import { SyntaxHighlighter } from "../syntax-highlighter";

export function ShowcaseSnippet() {
  const { selected } = useShowcase();
  const [expanded, setExpanded] = useState<boolean>(false);

  const contentId = useId();
  const code = data.find((i) => i.id === selected)?.snippet ?? null;

  const resetExpandedEvent = useEffectEvent(
    () => expanded && setExpanded(false),
  );

  useEffect(() => {
    if (selected === "motion-container.demo") return;

    resetExpandedEvent();
  }, [selected]);

  if (!code) return null;

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 z-99 w-full bg-glass-surface rounded-3xl",
        "selection:bg-accent selection:text-black transition-[height]",
        "duration-300 ease-in-out motion-reduce:transition-none backdrop-blur-2xl",
        expanded ? "h-56" : "h-28",
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls={contentId}
        aria-label={expanded ? "Collapse snippet" : "Expand snippet"}
        className={cn(
          "absolute right-3 top-2 z-10 grid size-7 place-items-center",
          "rounded-full border border-border bg-surface/60 text-muted",
          "backdrop-blur-md transition-colors hover:text-foreground",
          "focus-visible:outline-2 focus-visible:outline-offset-2 ",
          "focus-visible:outline-accent cursor-pointer",
        )}
      >
        <ChevronUpIcon
          className={cn(
            "size-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none",
            expanded ? "rotate-180" : "rotate-0",
          )}
        />
      </button>

      <ScrollShadow
        id={contentId}
        className="grid size-full place-items-start "
      >
        <Suspense
          name="showcase-snippet-suspense"
          fallback={
            <Skeleton className="h-28 w-full bg-glass-surface rounded-3xl" />
          }
        >
          <SyntaxHighlighter
            code={code}
            className="h-auto w-full -mt-1 overflow-hidden rounded-3xl p-4 font-secondary text-left text-xs whitespace-pre text-(--syntax-plain) "
            wrapperClassName="flex w-full flex-col items-stretch text-left"
            lineClassName="flex w-full whitespace-pre"
            withLineIndex
            animationProps={undefined}
          />
        </Suspense>
      </ScrollShadow>
    </div>
  );
}

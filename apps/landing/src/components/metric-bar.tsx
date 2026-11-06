import { Chip } from "@heroui/react";
import { Motion, MotionContainer } from "motion-provider";
import { LIBRARY_NAMES, METRIC_SUFFIX } from "@/constants/metrics.config";
import { getAnimation } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { MetricItem, MetricSizeKey } from "@/types/metrics.type";
import { formatKb } from "@/utils/formatKb";
import { getFillStyle } from "@/utils/metrics";
import { Scales } from "./container";

const nameAnimation = getAnimation("metricBarName");
const labelAnimation = getAnimation("metricBarLabel");

export function MetricBar({
  item,
  index,
  max,
  metric = "gzipBytes",
  isHighlighted = false,
}: {
  readonly item: MetricItem;
  readonly index: number;
  readonly max: number;
  readonly metric?: MetricSizeKey;
  readonly isHighlighted?: boolean;
}) {
  const { label, library, component: Component } = item;

  const [bytes, name] = [item[metric], LIBRARY_NAMES[library]];

  const fillStyle = getFillStyle(bytes, max);
  const fill = fillStyle["--fill"];

  return (
    <li data-index={index} data-library={library}>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <MotionContainer
          animation={{
            mode: ["fadeIn", "slideUp"],
            delay: index * 0.66,
            transition: "elasticHard",
            duration: 1.5,
          }}
          className="flex flex-col sm:flex-row sm:items-center sm:gap-2"
        >
          <h3 className="text-xl font-medium tracking-tight">{name}</h3>
          <Chip variant="soft" color="accent">
            {label}
          </Chip>
        </MotionContainer>
      </div>
      {/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: dynamic aria */}
      <div
        aria-label={`${name} ${label}`}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={bytes}
        aria-valuetext={`${formatKb(bytes)} ${METRIC_SUFFIX[metric]}`}
        className="h-14 w-full overflow-hidden rounded-3xl md:h-16 relative -mt-1"
      >
        <Scales className="size-full absolute" lineWidth={0.88} />
        <Motion
          data-size-fill
          definition={{
            initial: { transform: "scaleX(0)" },
            animate: { transform: `scaleX(${fill})` },
          }}
          timing={{
            duration: 1,
            delay: index * 0.5,
            ease: "ease-in-out",
          }}
          controller={{
            scroll: {
              axis: "y",
              mode: "view",
              start: 0,
              end: 0.25,
            },
          }}
          className={cn(
            isHighlighted ? "bg-accent" : "bg-surface",
            "size-full origin-left",
          )}
        />
        <div
          data-size-label
          style={fillStyle}
          className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-[calc(var(--fill)*100%)] min-w-fit items-center justify-center gap-3"
        >
          {typeof Component === "function" && <Component className="size-8" />}
          <span
            className={cn(
              "tabular-nums tracking-tighter font-secondary font-semibold text-xl",
              isHighlighted && "text-surface-secondary",
            )}
            data-size-value
          >
            {formatKb(bytes)}
          </span>
        </div>
      </div>
    </li>
  );
}

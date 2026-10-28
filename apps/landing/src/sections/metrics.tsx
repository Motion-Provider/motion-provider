import { Chip } from "@heroui/react";
import { MotionChain } from "motion-provider";
import { MetricBar } from "@/components/metric-bar";
import metrics from "@/constants/metrics.data";
import { getAnimation } from "@/lib/motion";
import type {
  MetricItem,
  MetricLibrary,
  MetricSizeKey,
} from "@/types/metrics.type";
import { formatKb } from "@/utils/formatKb";
import { getMaxValue, heavierBy } from "@/utils/metrics";

type MetricId = (typeof metrics)[number]["id"];

const METRIC: MetricSizeKey = "gzipBytes";
const HIGHLIGHT: MetricLibrary = "motion-provider";

const pick = (id: MetricId): MetricItem => {
  const item = metrics.find((m) => m.id === id);
  if (!item) {
    throw new Error(`Missing metric: ${id}`);
  }
  return item;
};

const MOTION_PROVIDER = pick("mp-container");
const GSAP = pick("gsap-use-gsap");
const MOTION_FULL = pick("motion-component");

const ITEMS: readonly MetricItem[] = [...metrics].sort(
  (a, b) => a[METRIC] - b[METRIC],
);

const MAX = getMaxValue(ITEMS, METRIC);

const animation = getAnimation("metricBarItems");

export default function Metrics() {
  return (
    <section
      aria-labelledby="metrics-heading"
      className="relative min-h-screen w-full max-w-7xl justify-self-center overflow-visible pt-36 pb-28"
    >
      <div className="flex flex-col gap-16">
        <div className="flex h-auto min-h-min flex-col gap-3">
          <h2 id="metrics-heading" className="text-5xl tracking-tighter">
            Pay Only For What You Animate.
          </h2>
          <p className="max-w-2xl text-muted leading-snug">
            <Chip
              variant="primary"
              className="bg-accent-soft text-accent font-secondary"
            >
              {"<MotionContainer />"}
            </Chip>{" "}
            ships at{" "}
            <b className="text-white">{formatKb(MOTION_PROVIDER[METRIC])}</b>{" "}
            gzipped, preset registry included. About{" "}
            <b className="text-white">
              {heavierBy(MOTION_PROVIDER, MOTION_FULL, METRIC)}
            </b>{" "}
            smaller than Motion&apos;s component and{" "}
            <b className="text-white">
              {heavierBy(MOTION_PROVIDER, GSAP, METRIC)}
            </b>{" "}
            smaller than GSAP core + useGSAP.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <MotionChain {...animation} data-size-bars>
            {ITEMS.map((item, index) => (
              <MetricBar
                key={item.id}
                item={item}
                index={index}
                max={MAX}
                metric={METRIC}
                isHighlighted={item.library === HIGHLIGHT}
              />
            ))}
          </MotionChain>
          <p className="text-xs text-muted">
            *React excluded, container-level comparison, minified and gzipped
            with esbuild. Feature coverage differs between libraries.
            Comparisons has been made based on bare minimum reasonable
            combination of animation APIs.
          </p>
        </div>
      </div>
    </section>
  );
}

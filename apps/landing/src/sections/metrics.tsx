import { Chip } from "@heroui/react";
import { MotionChain, MotionText } from "motion-provider";
import dynamic from "next/dynamic";
import metrics from "@/constants/metrics.data";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getAnimation } from "@/lib/motion";
import IntersectionProvider from "@/providers/intersection.provider";
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

const MOTION_PROVIDER = pick("mp-container"),
  GSAP = pick("gsap-use-gsap"),
  MOTION_FULL = pick("motion-component");

const ITEMS: readonly MetricItem[] = [...metrics].sort(
  (a, b) => a[METRIC] - b[METRIC],
);

const MAX = getMaxValue(ITEMS, METRIC);

const [metricAnimation, titleAnimation] = [
  getAnimation("metricBarItems"),
  getAnimation("metricTitle"),
];

export default function MetricsSection() {
  const isMobile = useIsMobile();

  return (
    <section
      aria-labelledby="metrics-heading"
      className="relative min-h-screen w-full max-w-7xl justify-self-center overflow-visible py-28 md:px-0 px-4"
    >
      <div className="flex flex-col gap-16">
        <div className="flex h-auto min-h-min flex-col gap-3">
          <MotionText
            animation={titleAnimation.animation}
            config={{
              ...titleAnimation.config,
              mode: isMobile ? "words" : "chars",
            }}
            wrapperClassName="md:text-6xl text-5xl tracking-tighter"
            id="metrics-heading"
            elementType="h2"
          >
            Pay Only For What You Animate.
          </MotionText>
          <p className="md:max-w-2xl text-pretty text-muted leading-snug">
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
        <Metrics />
      </div>
    </section>
  );
}

const MetricBar = dynamic(
  () => import("@/components/metric-bar").then((mod) => mod.MetricBar),
  {
    ssr: false,
  },
);

function Metrics() {
  return (
    <IntersectionProvider
      className="flex flex-col gap-6 h-60 md:h-80"
      options={{
        threshold: 0,
        scrollMargin: "60px",
      }}
    >
      <MotionChain {...metricAnimation} data-size-bars>
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
        *React excluded, container-level comparison, minified and gzipped with
        esbuild. Feature coverage differs between libraries. Comparisons has
        been made based on bare minimum reasonable combination of animation
        APIs.
      </p>
    </IntersectionProvider>
  );
}

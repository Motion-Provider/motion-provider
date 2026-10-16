import SvgAnimatejsLogo from "@/components/animatejs-logo";
import SvgGsapLogo from "@/components/gsap-logo";
import MotionLogo from "@/components/motion-logo";
import type { MetricItem } from "@/types/metrics.type";

export default [
  {
    id: "mp-container",
    library: "motion-provider",
    label: "MotionContainer + full preset registry",
    minifiedBytes: 23427,
    gzipBytes: 8310,
  },
  {
    id: "animejs-animate-stagger",
    library: "animejs",
    label: "animate + stagger",
    minifiedBytes: 36057,
    gzipBytes: 14506,
    component: SvgAnimatejsLogo,
  },
  {
    id: "gsap-use-gsap",
    library: "gsap",
    label: "gsap + useGSAP",
    minifiedBytes: 71769,
    gzipBytes: 28218,
    component: SvgGsapLogo,
  },
  {
    id: "motion-component",
    library: "motion",
    label: "motion component + stagger",
    minifiedBytes: 135117,
    gzipBytes: 45723,
    component: MotionLogo,
  },
] as const satisfies readonly MetricItem[];

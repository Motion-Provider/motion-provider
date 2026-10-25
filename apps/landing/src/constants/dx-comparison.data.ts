import { ArrowRightLeft, Eye, Link2, Scroll } from "lucide-react";
import SvgAnimatejsLogo from "@/components/icons/animatejs-logo";
import SvgGsapLogo from "@/components/icons/gsap-logo";
import MotionLogo from "@/components/icons/motion-logo";
import type {
  DxComparedItem,
  DxComparisonID,
  DxComparisonItem,
} from "@/types/dx-comparison.types";

/* -------------------------------------------------------------------------- */
/*                                  IN VIEW                                   */
/* -------------------------------------------------------------------------- */

const inViewMotionProvider = `import { MotionContainer } from "motion-provider";

export default function App() {
	return <MotionContainer animation={{ mode: ["filterBlurIn", "fadeIn"] }} />
}`;

const inViewMotion = `import { motion } from "motion/react";

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
    />
  );
}`;

const inViewGsap = `import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref} />;
}`;

const inViewAnime = `import { useEffect, useRef } from "react";
import { animate, createScope, onScroll } from "animejs";

export default function App() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const scope = createScope({ root }).add(() => {
      animate(el, {
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
        autoplay: onScroll({ target: el, repeat: false }),
      });
    });

    return () => scope.revert();
  }, []);

  return <div ref={root} />;
}`;

/* -------------------------------------------------------------------------- */
/*                                SCROLL BASED                                */
/* -------------------------------------------------------------------------- */

const scrollBasedMotionProvider = `import { MotionContainer } from "motion-provider";

export default function App() {
  return (
    <MotionContainer
      animation={{
        mode: ["filterBlurIn", "fadeIn"],
      }}
      controller={{
        scroll: {
          axis: "y",
          mode: "document",
        },
      }}
    />
  );
}`;

const scrollBasedMotion = `import { motion, useScroll, useTransform } from "motion/react";

export default function App() {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(10px)", "blur(0px)"]
  );

  return <motion.div style={{ opacity, filter }} />;
}`;

const scrollBasedGsap = `import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref} />;
}`;

const scrollBasedAnime = `import { useEffect, useRef } from "react";
import { animate, createScope, onScroll } from "animejs";

export default function App() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const scope = createScope({ root }).add(() => {
      animate(el, {
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
        ease: "linear",
        autoplay: onScroll({
          target: document.body,
          enter: "top top",
          leave: "bottom bottom",
          sync: true,
        }),
      });
    });

    return () => scope.revert();
  }, []);

  return <div ref={root} />;
}`;

/* -------------------------------------------------------------------------- */
/*                                ENTER / EXIT                                */
/* -------------------------------------------------------------------------- */

const enterExitMotionProvider = `import { MotionContainer } from "motion-provider";

export default function App() {
  return (
    <MotionContainer
      animation={{
        mode: "fadeIn",
      }}
      controller={{
        trigger: true, // true | false
      }}
    />
  );
}`;

const enterExitMotion = `import { AnimatePresence, motion } from "motion/react";

export default function App() {
  const trigger: boolean = true; // true | false

  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key="box"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
}`;

const enterExitGsap = `import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function App() {
  const ref = useRef<HTMLDivElement>(null);
  const trigger: boolean = true; // true | false

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: trigger ? 0 : 1 },
        { opacity: trigger ? 1 : 0, duration: 0.6, ease: "power2.out" }
      );
    },
    { dependencies: [trigger], scope: ref }
  );

  return <div ref={ref} />;
}`;

const enterExitAnime = `import { useEffect, useRef } from "react";
import { animate, createScope } from "animejs";

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const trigger: boolean = true; // true | false

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const scope = createScope({ root }).add(() => {
      animate(el, {
        opacity: trigger ? [0, 1] : [1, 0],
        duration: 600,
        ease: "outQuad",
      });
    });

    return () => scope.revert();
  }, [trigger]);

  return <div ref={root} />;
}`;

/* -------------------------------------------------------------------------- */
/*                                  CHAINED                                   */
/* -------------------------------------------------------------------------- */

const chainedMotionProvider = `import { MotionChain } from "motion-provider";

import { Card, CardDescription, CardTitle } from "@/ui/card";
import data from "@/constants/data";

export default function App() {
  return (
    <MotionChain
      animation={{
        mode: ["fadeUp", "rotateFlipX"],
      }}
    >
      {data.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </Card>
      ))}
    </MotionChain>
  );
}`;

const chainedMotion = `import { motion, type Variants } from "motion/react";

import { Card, CardDescription, CardTitle } from "@/ui/card";
import data from "@/constants/data";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -180 },
  visible: { opacity: 1, y: 0, rotateX: 0 },
};

export default function App() {
  return (
    <motion.div
      variants={list}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {data.map((entry) => (
        <motion.div key={entry.id} variants={item}>
          <Card>
            <CardTitle>{entry.title}</CardTitle>
            <CardDescription>{entry.desc}</CardDescription>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}`;

const chainedGsap = `import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Card, CardDescription, CardTitle } from "@/ui/card";
import data from "@/constants/data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = container.current;
      if (!el) return;

      gsap.from(el.children, {
        opacity: 0,
        y: 30,
        rotateX: -180,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      {data.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </Card>
      ))}
    </div>
  );
}`;

const chainedAnime = `import { useEffect, useRef } from "react";
import { animate, createScope, onScroll, stagger } from "animejs";

import { Card, CardDescription, CardTitle } from "@/ui/card";
import data from "@/constants/data";

export default function App() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const scope = createScope({ root }).add(() => {
      animate(el.children, {
        opacity: [0, 1],
        y: [30, 0],
        rotateX: [-180, 0],
        delay: stagger(100),
        autoplay: onScroll({ target: el, repeat: false }),
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={root}>
      {data.map((item) => (
        <Card key={item.id}>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.desc}</CardDescription>
        </Card>
      ))}
    </div>
  );
}`;

/* -------------------------------------------------------------------------- */
/*                                  DATASET                                   */
/* -------------------------------------------------------------------------- */

export const dxComparison: DxComparisonItem[] = [
  {
    id: "in-view",
    icon: Eye,
    label: "In View",
    motionProviderCode: inViewMotionProvider,
    comparedTo: [
      { id: "motion", icon: MotionLogo, label: "Motion", code: inViewMotion },
      { id: "gsap", icon: SvgGsapLogo, label: "GSAP", code: inViewGsap },
      {
        id: "animejs",
        icon: SvgAnimatejsLogo,
        label: "Anime.js",
        code: inViewAnime,
      },
    ],
  },
  {
    id: "scroll-based",
    icon: Scroll,
    label: "Scroll Based",
    motionProviderCode: scrollBasedMotionProvider,
    comparedTo: [
      {
        id: "motion",
        icon: MotionLogo,
        label: "Motion",
        code: scrollBasedMotion,
      },
      { id: "gsap", icon: SvgGsapLogo, label: "GSAP", code: scrollBasedGsap },
      {
        id: "animejs",
        icon: SvgAnimatejsLogo,
        label: "Anime.js",
        code: scrollBasedAnime,
      },
    ],
  },
  {
    id: "enter-exit",
    icon: ArrowRightLeft,
    label: "Enter / Exit",
    motionProviderCode: enterExitMotionProvider,
    comparedTo: [
      {
        id: "motion",
        icon: MotionLogo,
        label: "Motion",
        code: enterExitMotion,
      },
      { id: "gsap", icon: SvgGsapLogo, label: "GSAP", code: enterExitGsap },
      {
        id: "animejs",
        icon: SvgAnimatejsLogo,
        label: "Anime.js",
        code: enterExitAnime,
      },
    ],
  },
  {
    id: "chained",
    icon: Link2,
    label: "Chained",
    motionProviderCode: chainedMotionProvider,
    comparedTo: [
      { id: "motion", icon: MotionLogo, label: "Motion", code: chainedMotion },
      { id: "gsap", icon: SvgGsapLogo, label: "GSAP", code: chainedGsap },
      {
        id: "animejs",
        icon: SvgAnimatejsLogo,
        label: "Anime.js",
        code: chainedAnime,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 MAPPED IDS                                 */
/* -------------------------------------------------------------------------- */

export const dxComparisonIds: DxComparisonID[] = dxComparison.map(
  (item) => item.id,
);

export const dxComparedLibraryIds: DxComparedItem["id"][] = Array.from(
  new Set(
    dxComparison.flatMap((item) =>
      item.comparedTo.map((library) => library.id),
    ),
  ),
);

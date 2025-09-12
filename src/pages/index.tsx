import Head from "next/head";
import { cn } from "@/motion/lib/utils";
import { Inter } from "next/font/google";
import {
  FC,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import MotionContainer from "@/motion/motion-container";
import animations, { AnimationKeys } from "@/motion/constants/animations";
import transitions, { TransitionKeys } from "@/motion/constants/transitions";
import MotionChain from "@/motion/motion-chain";
import MotionText from "@/motion/motion-text";
import MotionImage from "@/motion/motion-image";
import Image from "next/image";

/* font */

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
});

/* data */

const cards = [
  {
    title: "Motion Container",
    description:
      "Root animation wrapper that centralizes timing, global variants and orchestration. Provides context for children, sensible performance defaults, and SSR-friendly mounting so animations are consistent across devices.",
    img: "https://motionprovider.dev/assets/motion-container.webp",
    ico: "/icons/container.svg",
  },
  {
    title: "Motion Chain",
    description:
      "Declarative sequencer for orchestrating ordered or staggered animations (chains, timelines, and queues). Great for complex entry/exit flows, repeatable sequences, and combining sync + async steps.",
    img: "https://motionprovider.dev/assets/motion-chain.webp",
    ico: "/icons/link.svg",
  },
  {
    title: "Motion Text",
    description:
      "Text-specific motion helpers (per-character or per-word staggering, reveal, and emphasis). Built with accessibility in mind (prefers-reduced-motion support) and optimized to avoid heavy reflows.",
    img: "https://motionprovider.dev/assets/motion-text.webp",
    ico: "/icons/type-outline.svg",
  },
  {
    title: "Motion Image",
    description:
      "Image-focused animations: lazy reveal, parallax, smooth crop/scale transitions and layout-shift aware effects. Designed to work with responsive images and defer heaviness until visible.",
    img: "https://motionprovider.dev/assets/motion-image.webp",
    ico: "/icons/image.svg",
  },
];

/* components */

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <>
      <Meta />
      <PageLayout>
        <Header />
        {!isMobile && (
          <>
            <CardWrapper />
            <TextMatrix />
          </>
        )}
      </PageLayout>
    </>
  );
}

/** Layout--- */

const PageLayout: FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <main
    className={cn(
      "h-screen w-full overflow-y-scroll flex items-center justify-center-safe flex-col gap-4 relative",
      inter.className,
      className
    )}
  >
    <MotionContainer
      animation={{
        mode: "fadeIn",
        delay: 0.5,
        transition: "gentle",
        duration: 2,
      }}
      elementType="div"
      className="absolute inset-0 -z-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
      }}
    />
    <div />
    <Banner />
    {children}
    <Footer />
  </main>
);

/* Components */

const Banner = () => (
  <aside className="top-0 fixed w-full h-10 bg-gradient-to-b from-transparent to-muted-foreground/10 border-b border-muted-foreground/10 shadow-2xs rounded-b-2xl grid place-items-center lg:text-sm text-xs tracking-tight font-mono z-50">
    <p>
      An open source component orchestration —{" "}
      <b>
        Now in <i>BETA</i>
      </b>{" "}
      🚀
    </p>
  </aside>
);

const Header = () => {
  return (
    <header className="flex flex-col items-center gap-2 justify-center z-50 md:max-w-max max-w-md">
      <MotionText
        animation={{
          mode: ["filterBlurIn", "textShimmer", "fadeDown"],
          transition: "springy",
          delay: 1,
          duration: 1,
        }}
        config={{
          mode: "chars",
          duration: 0.12,
          delayLogic: "linear",
        }}
        elementType="h1"
        className="lg:text-[7rem] text-6xl tracking-tighter bg-clip-text bg-gradient-to-b from-white/50 to-transparent text-transparent"
      >
        Motion Provider.
      </MotionText>
      <MotionText
        animation={{
          mode: ["filterHueRotate", "skewX45", "fadeDown"],
          transition: "springy",
          delay: 2.5,
          duration: 1,
        }}
        elementType={"p"}
        config={{
          mode: "words",
          duration: 0.12,
          delayLogic: "sinusoidal",
        }}
        wrapperClassName="text-muted-foreground lg:max-w-2xl max-w-sm items-center justify-center text-center tracking-tight lg:text-base text-sm"
      >
        Animate your React apps with Motion Provider. No vendor-lock-like
        copy-paste fluff. Performance-first rendering, intuitive APIs, and
        seamless developer experience.
      </MotionText>
    </header>
  );
};

const CardWrapper = () => {
  const [trigger, setTrigger] = useState<number | null>(null);

  return (
    <div className="w-auto lg:min-w-5xl min-w-xl mx-auto lg:h-72 h-auto  rounded-2xl flex lg:flex-wrap flex-col items-center justify-center mt-8 overflow-hidden z-50">
      <MotionChain
        animations={cards.map((_, i) => ({
          mode: i % 2 === 0 ? "fadeUp" : "fadeDown",
          transition: "gentle",
          duration: 1,
          delay: 3.5,
        }))}
        elementType="div"
        config={{
          delayLogic: "linear",
          duration: 0.3,
        }}
        className={cn(
          "bg-gradient-to-b from-muted-foreground/10 to-muted-foreground/5 size-1/2 backdrop-blur-sm relative"
        )}
      >
        {(cards as typeof cards).map((card, i) => (
          <Link
            key={i}
            target="_blank"
            href={`https://motionprovider.dev/${card.title
              .toLowerCase()
              .split(" ")
              .join("-")}`}
          >
            <div
              className={cn(
                "absolute size-full flex flex-col items-start justify-center px-8 transition-all duration-200 ease-in-out cursor-pointer overflow-hidden",
                i === 0 && "border-r border-muted-foreground/20",
                i === 1 && "border-t border-r border-muted-foreground/20",
                i === 2 && "border-b border-muted-foreground/20"
              )}
              onMouseEnter={() => setTrigger(i)}
              onMouseLeave={() => setTrigger(null)}
            >
              <div className="absolute inset-0 bg-black/80 z-0 backdrop-blur-xs" />
              <MotionImage
                animation={{
                  mode: ["fadeIn", "rotateClockwise"],
                  transition: "smooth",
                  duration: 3,
                }}
                config={{
                  duration: 2,
                  pieces: 64,
                  delayLogic: "pendulum",
                  img: card.img,
                }}
                wrapperClassName="h-[500px] w-full -z-10 absolute inset-0"
                controller={{
                  trigger: trigger === i,
                }}
              />
              <div className="flex flex-row gap-2">
                <Image
                  alt={card.ico.split("/").join(" ")}
                  src={card.ico}
                  className="invert"
                  height={20}
                  width={20}
                />
                <h3 className="tracking-tighter text-xl z-50">{card.title}</h3>
              </div>
              {trigger === i ? (
                <MotionText
                  elementType="p"
                  wrapperClassName="text-muted-foreground group text-xs z-50 tracking-tight"
                  animation={{
                    mode: ["fadeUp", "textShimmer", "rotateFlipX"],
                    transition: "gentle",
                    duration: 1,
                  }}
                  config={{
                    duration: 0.03,
                    mode: "chars",
                    delayLogic: "linear",
                  }}
                >
                  {card.description}
                </MotionText>
              ) : (
                <MotionContainer
                  animation={{
                    mode: "fadeIn",
                    transition: "smooth",
                    duration: 1,
                  }}
                  elementType="div"
                  className="flex w-full h-auto flex-col gap-2 z-50 mt-2"
                >
                  {Array.from({ length: 3 }).map((_, i) => {
                    const w = i === 0 ? "w-1/3" : i === 1 ? "w-2/3" : "w-full";
                    return (
                      <div
                        key={i}
                        className={cn(
                          "h-2 rounded-sm bg-muted-foreground/10 w-auto",
                          w
                        )}
                      />
                    );
                  })}
                </MotionContainer>
              )}
            </div>
          </Link>
        ))}
      </MotionChain>
    </div>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-8 text-muted-foreground text-xs text-center w-full md:w-auto z-50">
      ©{year} Motion Provider —{" "}
      <Link
        href="https://burakdev.com"
        target="_blank"
        className="hover:underline underline-offset-2 hover:text-foreground transition-all duration-200 ease-in-out"
      >
        crafted by Burak Bilen
      </Link>
    </footer>
  );
};

const Meta = () => (
  <Head>
    <title>Motion Provider</title>
    <meta httpEquiv="Content-Language" content="en" />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Motion Provider is a performance-first motion engine for React. Build delightful animations with clean APIs, optimized rendering, and developer-first tools."
    />
    <meta
      property="og:title"
      content="Motion Provider — Performance-First Motion Engine"
    />
    <meta
      property="og:description"
      content="Build delightful React animations with Motion Provider. Performance-first rendering, intuitive APIs, and seamless developer experience."
    />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://motionprovider.dev/assets/screenshots/motion-provider-desktop-screenshot.png"
    />
    <meta property="og:url" content="https://motionprovider.dev" />
    <meta property="og:site_name" content="motionprovider.dev" />
    <meta name="msapplication-TileColor" content="#0b1220" />
    <meta name="referrer" content="no-referrer-when-downgrade" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
  </Head>
);

type Coordinate = [number, number];
type MatrixItem = { key: string; xy: Coordinate };
type MatrixProps = MatrixItem[];

const TextMatrix = memo(function TextMatrix() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initialKeys = useMemo(() => generateInitialKeys(), []);
  const [keys, setKeys] = useState<string[]>(initialKeys);

  useEffect(() => {
    setKeys((prev) => shuffleInPlace(prev.slice()));
  }, []);

  const { width, height } = useSize(containerRef);
  const [matrix, setMatrix] = useState<MatrixProps>(() => {
    return initialKeys.map((k) => ({ key: k, xy: [0, 0] as Coordinate }));
  });

  useLayoutEffect(() => {
    if (width === 0 || height === 0) return;

    const n = keys.length;
    const out: MatrixProps = new Array(n) as MatrixProps;

    for (let i = 0; i < n; i++) {
      const x = Math.floor(Math.random() * (width - 1));
      const y = Math.floor(Math.random() * (height - 1));
      out[i] = { key: keys[i], xy: [x, y] };
    }

    setMatrix(out);
  }, [keys, width, height]);

  return (
    <div
      ref={containerRef}
      className="h-screen w-full -z-10 inset-0 fixed overflow-hidden"
    >
      <MotionChain
        animations={matrix.map(({ key }) => {
          const isAnimation = Object.keys(animations).includes(key);

          return {
            mode: [
              "fadeUp",
              isAnimation ? (key as AnimationKeys) : "filterBlurIn",
            ],
            transition: !isAnimation ? (key as TransitionKeys) : "bounceSoft",
            duration: 2.5,
            delay: 2.5,
          };
        })}
        config={{
          duration: 2.5,
          delayLogic: "chaotic",
        }}
        className="relative"
        elementType="div"
      >
        {matrix.map(({ key, xy }) => {
          const [x, y] = xy;
          const transform = `translate3d(${x}px, ${y}px, 0)`;

          return (
            <span
              key={key}
              className="font-bold tracking-tight text-muted-foreground/20 rounded-2xl"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform,
                whiteSpace: "nowrap",
                willChange: "transform",
              }}
            >
              {key}
            </span>
          );
        })}
      </MotionChain>
    </div>
  );
});

/* utils */

function generateInitialKeys(): string[] {
  const animationList = Object.keys(animations);
  const transitionKeys = Object.keys(transitions);
  const merged = Array.from(new Set([...animationList, ...transitionKeys]));
  return merged.sort();
}

function shuffleInPlace<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// hooks

function useSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const rafRef = useRef<number | null>(null);
  const last = useRef({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateNow = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(0, Math.floor(rect.width));
      const h = Math.max(0, Math.floor(rect.height));
      if (w !== last.current.w || h !== last.current.h) {
        last.current = { w, h };
        setSize({ width: w, height: h });
      }
    };

    const ro = new ResizeObserver(() => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        updateNow();
      });
    });

    ro.observe(el);
    updateNow();

    return () => {
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return size;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const q = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    q.addEventListener("change", (e) => {
      setIsMobile(e.matches);
    });

    return () => q.removeEventListener("change", handler);
  }, []);

  return isMobile;
}

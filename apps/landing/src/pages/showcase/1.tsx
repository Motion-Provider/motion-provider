import { Chip } from "@heroui/react";
import {
  ArrowRight,
  Camera,
  Compass,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  createMotionConfig,
  createMotionRegistry,
  MotionContainer,
  MotionImage,
  MotionText,
} from "motion-provider";
import type { GetStaticProps } from "next";
import Head from "next/head";

const galleryMotion = createMotionConfig({
  heroEyebrow: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeDown", "filterBlurIn"],
        transition: "gentle",
        duration: 0.7,
      },
    },
  },
  heroTitle: {
    type: "MotionText",
    props: {
      elementType: "h1",
      wrapperClassName:
        "max-w-4xl text-6xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "slowCubic",
        duration: 1.1,
      },
      config: {
        mode: "words",
        delayLogic: "sinusoidal",
        duration: 0.16,
      },
    },
  },
  heroDescription: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.85,
        delay: 0.25,
      },
    },
  },
  heroImage: {
    type: "MotionImage",
    props: {
      animation: {
        mode: ["clipDown", "filterBlurIn"],
        transition: "gentle",
        duration: 1.1,
      },
      config: {
        pieces: 81,
        duration: 0.08,
        delayLogic: "sinusoidal",
      },
      controller: {
        configView: {
          amount: 0.15,
          once: true,
        },
      },
    },
  },
  galleryHeading: {
    type: "MotionText",
    props: {
      elementType: "h2",
      wrapperClassName:
        "text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      config: {
        mode: "words",
        duration: 0.16,
      },
    },
  },
  galleryGrid: {
    type: "MotionChain",
    props: {
      elementType: "article",
      className: "w-full",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      config: {
        duration: 0.12,
        delayLogic: "sinusoidal",
      },
      controller: {
        configView: {
          amount: 0.12,
          once: true,
        },
      },
    },
  },
  galleryImage: {
    type: "MotionImage",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn", "skewX45"],
        transition: "gentle",
        duration: 0.85,
      },
      config: {
        pieces: 64,
        duration: 0.075,
        delayLogic: "sinusoidal",
        fn: "hover",
      },
    },
  },
  editorialImage: {
    type: "MotionImage",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
        duration: 1,
      },
      config: {
        pieces: 81,
        duration: 0.08,
        delayLogic: "chaotic",
      },
    },
  },
  editorialText: {
    type: "MotionText",
    props: {
      elementType: "h2",
      wrapperClassName:
        "text-5xl font-bold leading-[0.98] tracking-tighter sm:text-6xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "slowCubic",
        duration: 1,
      },
      config: {
        mode: "words",
        duration: 0.17,
      },
    },
  },
  cta: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.9,
      },
    },
  },
});

const { getMotionAnimation } = createMotionRegistry(galleryMotion);

const heroImageAnimation = getMotionAnimation("heroImage");
const editorialImageAnimation = getMotionAnimation("editorialImage");

const heroImage =
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85";

export default function GalleryShowcasePage() {
  return (
    <>
      <Head>
        <title>Showcases | Image Gallery</title>
      </Head>

      <main className="overflow-hidden bg-background text-foreground">
        {/* Hero */}
        <section className="relative px-6 pb-24 pt-16 sm:px-10 lg:px-20 lg:pb-32 lg:pt-40">
          <div className="mx-auto grid max-w-[100rem] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col items-start">
              <MotionContainer {...getMotionAnimation("heroEyebrow")}>
                <Chip
                  color="accent"
                  variant="soft"
                  size="sm"
                  className="mb-8 rounded-full border border-glass-border bg-glass-surface px-3"
                >
                  <Camera className="mr-1 size-3.5" />
                  THE VISUAL COLLECTION
                </Chip>
              </MotionContainer>

              <MotionText {...getMotionAnimation("heroTitle")}>
                Find beauty in the ordinary.
              </MotionText>

              <MotionContainer {...getMotionAnimation("heroDescription")}>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  A collection of moments, places and perspectives. Explore
                  imagery from photographers who see the world a little
                  differently.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a
                    href="#collection"
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:-translate-y-1"
                  >
                    Explore collection
                    <ArrowRight className="size-4" />
                  </a>

                  <span className="text-sm text-muted">
                    12,400+ curated photographs
                  </span>
                </div>

                <div className="mt-12 flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((avatar) => (
                      <div
                        key={avatar}
                        className="grid size-9 place-items-center rounded-full border-2 border-background bg-surface-secondary text-xs font-semibold"
                      >
                        {avatar}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs leading-relaxed text-muted">
                    Created by a community of
                    <br />
                    independent photographers.
                  </p>
                </div>
              </MotionContainer>
            </div>

            <div className="relative">
              <MotionImage
                {...heroImageAnimation}
                config={{
                  ...heroImageAnimation.config,
                  img: heroImage,
                }}
                controller={{}}
                alt="Mountain lake reflecting the surrounding landscape"
                loading="eager"
                fetchPriority="high"
                wrapperClassName="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-surface-secondary"
                fallback={
                  <div className="size-full animate-pulse bg-surface-tertiary" />
                }
              />

              <div className="glass absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl p-4">
                <div>
                  <p className="text-sm font-semibold">The quiet wilderness</p>
                  <p className="mt-1 text-xs text-muted">
                    Discover the undiscovered.
                  </p>
                </div>
                <Compass className="size-5 text-accent" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-y border-border px-6 py-9 sm:px-10 lg:px-20">
          <div className="mx-auto flex max-w-[100rem] flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Explore by perspective
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                "All photos",
                "Nature",
                "Architecture",
                "Travel",
                "Minimal",
                "Portraits",
              ].map((category, index) => (
                <a
                  key={category}
                  href="#collection"
                  className={[
                    "rounded-full border px-5 py-2.5 text-sm transition",
                    index === 0
                      ? "border-accent bg-accent text-[var(--accent-foreground)]"
                      : "border-border bg-surface text-muted hover:border-accent hover:text-foreground",
                  ].join(" ")}
                >
                  {category}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
            >
              <SlidersHorizontal className="size-4" />
              Filters
            </button>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <MotionText
                  elementType="h2"
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    duration: 0.75,
                    transition: "gentle",
                  }}
                  config={{ mode: "words" }}
                  wrapperClassName="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                >
                  A visual archive
                </MotionText>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-base">
                  A curated collection of moments, spaces, textures, and
                  perspectives.
                </p>
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/45">
                Selected photography · 01—48
              </span>
            </div>

            <div className="grid auto-rows-[clamp(6.5rem,11vw,9rem)] grid-flow-dense grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
              {[
                {
                  src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85",
                  alt: "Golden sunlight across a landscape",
                  span: "col-span-2 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=85",
                  alt: "Ocean waves reaching the shore",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85",
                  alt: "Starry night sky",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
                  alt: "Modern architectural geometry",
                  span: "col-span-1 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=85",
                  alt: "Mountain landscape under a clear sky",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
                  alt: "Mountain lake surrounded by forest",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=700&q=85",
                  alt: "Sunrise over a quiet landscape",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85",
                  alt: "Sunlight filtering through a forest",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=85",
                  alt: "Minimalist architectural facade",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85",
                  alt: "Open natural landscape",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85",
                  alt: "Dense green woodland",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=900&q=85",
                  alt: "Rolling green hills",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=85",
                  alt: "Valley framed by granite cliffs",
                  span: "col-span-2 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=85",
                  alt: "Sunlit mountain ridge",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=85",
                  alt: "Calm lake beneath mountains",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
                  alt: "Turquoise beach shoreline",
                  span: "col-span-1 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=700&q=85",
                  alt: "Misty natural scenery",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=85",
                  alt: "Path through an autumn forest",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=700&q=85",
                  alt: "Waterfall in a green gorge",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=700&q=85",
                  alt: "Wildflower field in bloom",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&w=900&q=85",
                  alt: "Sunset over the sea",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?auto=format&fit=crop&w=700&q=85",
                  alt: "Light through tall trees",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=700&q=85",
                  alt: "Mountain range at dusk",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&w=900&q=85",
                  alt: "Layered hills in soft light",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=85",
                  alt: "Lone tree in open land",
                  span: "col-span-2 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=700&q=85",
                  alt: "Fog drifting through a forest",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=700&q=85",
                  alt: "Mountain lake at sunrise",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=900&q=85",
                  alt: "Deer in a quiet meadow",
                  span: "col-span-1 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=700&q=85",
                  alt: "Peaks rising above the horizon",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&w=900&q=85",
                  alt: "Snow-covered mountain slope",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1464207687429-7505649dae38?auto=format&fit=crop&w=700&q=85",
                  alt: "Night sky over the mountains",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=700&q=85",
                  alt: "Desert dunes and rock",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=900&q=85",
                  alt: "Misty mountain valley",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=700&q=85",
                  alt: "Snowy peak at first light",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=700&q=85",
                  alt: "Still lake and distant hills",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=900&q=85",
                  alt: "Rolling ocean surface",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=85",
                  alt: "Wave breaking on open water",
                  span: "col-span-2 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=700&q=85",
                  alt: "Palm trees on a sandy beach",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=700&q=85",
                  alt: "Close view of blooming flowers",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=900&q=85",
                  alt: "Stars above a dark horizon",
                  span: "col-span-1 row-span-2",
                },
                {
                  src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=85",
                  alt: "Milky Way over a mountain",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=85",
                  alt: "Mountains under soft clouds",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=700&q=85",
                  alt: "Warm sunset sky",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=700&q=85",
                  alt: "Traveller's view over a lake",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=900&q=85",
                  alt: "Coastal cliffs and sea",
                  span: "col-span-2 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=700&q=85",
                  alt: "Green fields stretching outward",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=700&q=85",
                  alt: "Green lake in a forest",
                  span: "col-span-1 row-span-1",
                },
                {
                  src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=85",
                  alt: "Aerial view of lush land",
                  span: "col-span-2 row-span-1",
                },
              ].map((image, index) => (
                <MotionContainer
                  key={image.src}
                  elementType="figure"
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    duration: 0.8,
                    transition: "gentle",
                    delay: (index % 6) * 0.035,
                  }}
                  controller={{
                    configView: {
                      once: false,
                      amount: 0.2,
                    },
                  }}
                  className={`group relative isolate min-h-0 overflow-hidden rounded-xl bg-zinc-200 ${image.span}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <figcaption className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="absolute bottom-3 left-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90">
                      Frame {String(index + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial feature */}
        <section className=" border-border px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto grid max-w-[100rem] items-center gap-16 lg:grid-cols-2">
            <MotionImage
              key={"v"}
              {...editorialImageAnimation}
              config={{
                ...editorialImageAnimation.config,
                img: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1600&q=85",
              }}
              alt="Golden sunlight over a quiet natural landscape"
              loading="lazy"
              wrapperClassName="size-full overflow-hidden rounded-[2rem] bg-surface-tertiary"
              fallback={
                <div className="size-full animate-pulse bg-surface-tertiary" />
              }
            />

            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                BEHIND EVERY FRAME
              </p>

              <MotionText {...getMotionAnimation("editorialText")}>
                Photography is more than a moment.
              </MotionText>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
                It is a way of noticing things that might otherwise pass us by.
                Our collection celebrates the people, places and small details
                that make ordinary life extraordinary.
              </p>

              <a
                href="#creators"
                className="mt-9 inline-flex items-center gap-3 text-sm font-semibold transition hover:text-accent"
              >
                Meet the creators
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Creator call to action */}
        <section
          id="creators"
          className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36"
        >
          <MotionContainer {...getMotionAnimation("cta")}>
            <div className="glass relative mx-auto flex max-w-[100rem] flex-col items-center overflow-hidden rounded-[2rem] px-7 py-24 text-center sm:px-16">
              <div className="absolute -right-24 -top-24 size-80 rounded-full bg-accent/10 blur-3xl" />

              <Sparkles className="mb-8 size-8 text-accent" />

              <h2 className="max-w-3xl text-4xl font-bold tracking-tighter sm:text-6xl">
                Your perspective belongs here.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Share your work with a community that values creativity,
                curiosity and visual storytelling.
              </p>

              <a
                href="#collection"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:-translate-y-1"
              >
                Discover more
                <ArrowRight className="size-4" />
              </a>
            </div>
          </MotionContainer>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});

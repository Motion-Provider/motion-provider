import { ArrowUpRight, ChevronDown, Zap } from "lucide-react";
import {
  createMotionConfig,
  createMotionRegistry,
  MotionChain,
  MotionContainer,
  MotionImage,
  MotionText,
} from "motion-provider";
import type { GetStaticProps } from "next";

const agencyMotion = createMotionConfig({
  heroBadge: {
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
        "max-w-5xl text-6xl font-bold leading-[0.92] tracking-tighter sm:text-7xl lg:text-8xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn", "textShimmer"],
        transition: "slowCubic",
        duration: 1.4,
      },
      config: {
        mode: "words",
        delayLogic: "sinusoidal",
        duration: 0.18,
      },
    },
  },
  heroDescription: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.9,
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
    },
  },
  stats: {
    type: "MotionChain",
    props: {
      elementType: "div",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.9,
      },
      config: {
        duration: 0.15,
        delayLogic: "sinusoidal",
      },
      controller: {
        configView: {
          amount: 0.3,
          once: true,
        },
      },
    },
  },
  sectionTitle: {
    type: "MotionText",
    props: {
      elementType: "h2",
      wrapperClassName:
        "max-w-3xl text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.85,
      },
      config: {
        mode: "words",
        duration: 0.16,
      },
    },
  },
  projectGrid: {
    type: "MotionChain",
    props: {
      elementType: "article",
      className: "h-full",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.9,
      },
      config: {
        duration: 0.15,
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
  projectImage: {
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
  serviceGrid: {
    type: "MotionChain",
    props: {
      elementType: "article",
      className: "h-full",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.85,
      },
      config: {
        duration: 0.15,
        delayLogic: "sinusoidal",
      },
      controller: {
        configView: {
          amount: 0.2,
          once: true,
        },
      },
    },
  },
  testimonial: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "slowCubic",
        duration: 1,
      },
    },
  },
  faq: {
    type: "MotionChain",
    props: {
      elementType: "div",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      config: {
        duration: 0.15,
      },
      controller: {
        configView: {
          amount: 0.15,
          once: true,
        },
      },
    },
  },
  cta: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 1,
      },
    },
  },
});

const { getMotionAnimation } = createMotionRegistry(agencyMotion);

const heroImageAnimation = getMotionAnimation("heroImage");
const projectImageAnimation = getMotionAnimation("projectImage");

const projects = [
  {
    id: "architecture",
    number: "01",
    title: "A quieter kind of luxury.",
    client: "FORM & FUNCTION",
    discipline: "Brand identity / Digital",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    aspect: "aspect-[5/4]",
  },
  {
    id: "creative",
    number: "02",
    title: "Making space for ideas.",
    client: "STUDIO OBJECT",
    discipline: "Art direction / Campaign",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    aspect: "aspect-[5/4]",
  },
  {
    id: "technology",
    number: "03",
    title: "The human side of technology.",
    client: "NORTH DIGITAL",
    discipline: "Strategy / Web experience",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    aspect: "aspect-[5/4]",
  },
];

const faqItems = [
  {
    question: "What does a typical project look like?",
    answer:
      "We start with discovery and strategy, move into design and creative development, then work through production, delivery and optimization.",
  },
  {
    question: "Do you work with early-stage companies?",
    answer:
      "Absolutely. We work with emerging teams as well as established brands looking for a fresh creative direction.",
  },
  {
    question: "Can you work with an existing brand?",
    answer:
      "Yes. We can extend an existing identity, improve a digital experience or help reposition the brand without starting from zero.",
  },
  {
    question: "How do we get started?",
    answer:
      "Tell us about your idea, the problem you are trying to solve and where you would like to go. We will take it from there.",
  },
];

export default function AgencyShowcasePage() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate flex h-screen items-center justify-center overflow-hidden bg-zinc-950 px-5 py-24 text-white sm:px-8 lg:px-12">
        <MotionImage
          alt=""
          animation={{
            mode: ["fadeIn", "filterBlurIn"],
            duration: 1.4,
            transition: "gentle",
          }}
          config={{
            img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2200&q=90",
            pieces: 81,
            duration: 0.6,
            delayLogic: "chaotic",
          }}
          controller={{
            configView: {
              once: true,
              amount: 0.2,
            },
          }}
          wrapperClassName="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
          fallback={<div className="absolute inset-0 z-10 bg-zinc-950" />}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/75 via-zinc-950/80 to-zinc-950" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <MotionContainer
            animation={{
              mode: ["fadeDown", "filterBlurIn"],
              duration: 0.8,
              transition: "gentle",
            }}
            controller={{ configView: { once: true, amount: 0.25 } }}
          >
            <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm">
              Independent creative studio
            </span>
          </MotionContainer>

          <MotionText
            elementType="h1"
            animation={{
              mode: ["fadeUp", "filterBlurIn"],
              duration: 1,
              transition: "gentle",
            }}
            config={{
              mode: "words",
              duration: 0.45,
              delayLogic: "sinusoidal",
            }}
            wrapperClassName="mt-8 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl"
          >
            We make brands impossible to ignore.
          </MotionText>

          <MotionContainer
            animation={{
              mode: ["fadeUp", "filterBlurIn"],
              duration: 0.85,
              delay: 0.2,
              transition: "gentle",
            }}
            className="mt-7 flex max-w-xl flex-col items-center"
          >
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              Strategy, identity, and digital experiences for ambitious brands
              ready to move forward.
            </p>

            <a
              href="#selected-work"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-transform hover:translate-y-[-2px]"
            >
              Discover our work
              <span aria-hidden="true">↗</span>
            </a>
          </MotionContainer>
        </div>
      </section>
      {/* Stats */}
      <section className="relative z-10 bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <MotionText
              elementType="h2"
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                duration: 0.8,
                transition: "gentle",
              }}
              config={{ mode: "words" }}
              wrapperClassName="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Results that speak.
            </MotionText>
          </div>

          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-6">
            {[
              { value: "48+", label: "Projects delivered" },
              { value: "32", label: "Brands partnered" },
              { value: "12", label: "Years of experience" },
              { value: "96%", label: "Client satisfaction" },
            ].map((stat, index) => (
              <MotionContainer
                key={stat.label}
                elementType="article"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                  delay: index * 0.08,
                }}
                controller={{ configView: { once: true, amount: 0.3 } }}
                className="flex flex-col items-center text-center"
              >
                <MotionText
                  elementType="span"
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    duration: 0.8,
                    transition: "gentle",
                  }}
                  config={{ mode: "chars", duration: 0.3 }}
                  wrapperClassName="text-5xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl lg:text-7xl"
                >
                  {stat.value}
                </MotionText>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-foreground/50 sm:text-sm">
                  {stat.label}
                </p>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>
      {/* Selected work */}
      <section
        id="selected-work"
        className="relative z-10 bg-background px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <MotionText
                elementType="h2"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                }}
                config={{ mode: "words" }}
                wrapperClassName="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Selected work
              </MotionText>
              <p className="mt-2 text-sm text-foreground/55">
                A selection of collaborations and creative experiments.
              </p>
            </div>

            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
              2023 — 2026
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Northstar",
                category: "Brand identity",
                description:
                  "A new visual language for a technology company navigating what comes next.",
                image: "photo-1486406146926-c627a92ad1ab",
              },
              {
                name: "Still Form",
                category: "Digital experience",
                description:
                  "An editorial storefront built around timeless objects and considered design.",
                image: "photo-1494438639946-1ebd1d20bf85",
              },
              {
                name: "Open Fields",
                category: "Art direction",
                description:
                  "A fresh campaign identity inspired by the relationship between people and nature.",
                image: "photo-1470252649378-9c29740c9fa8",
              },
              {
                name: "Atelier One",
                category: "Brand strategy",
                description:
                  "Positioning and identity for an independent architecture practice.",
                image: "photo-1600210492486-724fe5c67fb0",
              },
              {
                name: "Common Ground",
                category: "Web design",
                description:
                  "A digital home for a community built around shared ideas and new perspectives.",
                image: "photo-1511818966892-d7d671e672a2",
              },
              {
                name: "Mono Studio",
                category: "Visual identity",
                description:
                  "A minimal identity system designed to make a small studio feel unmistakable.",
                image: "photo-1497366754035-f200968a6e72",
              },
              {
                name: "New Ritual",
                category: "Campaign",
                description:
                  "A visual campaign introducing a more thoughtful approach to daily routines.",
                image: "photo-1490481651871-ab68de25d43d",
              },
              {
                name: "The Line",
                category: "Digital product",
                description:
                  "A focused interface that makes complex workflows feel simple and intuitive.",
                image: "photo-1497366811353-6870744d04b2",
              },
            ].map((project, index) => (
              <MotionContainer
                key={project.name}
                elementType="article"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                  delay: (index % 3) * 0.08,
                }}
                controller={{
                  configView: {
                    once: true,
                    amount: 0.2,
                  },
                }}
                className="group relative isolate min-h-[23rem] overflow-hidden rounded-2xl bg-zinc-900 sm:min-h-[26rem]"
              >
                <img
                  src={`https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=85`}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                    {project.category}
                  </span>

                  <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.name}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
                    {project.description}
                  </p>
                </div>

                <span className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/20 text-sm text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
                  ↗
                </span>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>
      {/* Services */}
      <section
        id="services"
        className="relative z-10 bg-background px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <MotionText
                elementType="h2"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                }}
                config={{ mode: "words" }}
                wrapperClassName="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                What we do
              </MotionText>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-foreground/55">
                From the first idea to the final interaction, we bring every
                part of your brand into focus.
              </p>
            </div>

            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
              Our expertise · 01—03
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Brand strategy",
                description:
                  "We define your positioning, clarify your purpose, and build a strategic foundation that gives your brand direction.",
                tags: ["Research", "Positioning", "Strategy"],
              },
              {
                number: "02",
                title: "Visual identity",
                description:
                  "We create distinctive visual systems that translate your brand's personality into a consistent visual language.",
                tags: ["Art direction", "Identity", "Guidelines"],
              },
              {
                number: "03",
                title: "Digital experiences",
                description:
                  "We design thoughtful digital products and websites that connect useful functionality with memorable interactions.",
                tags: ["Web design", "Development", "Interaction"],
              },
            ].map((service, index) => (
              <MotionContainer
                key={service.number}
                elementType="article"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                  delay: index * 0.1,
                }}
                controller={{
                  configView: {
                    once: true,
                    amount: 0.2,
                  },
                }}
                className="group flex min-h-64 flex-row gap-5 rounded-2xl border border-foreground/10 bg-foreground/[0.025] p-6 transition-colors duration-300 hover:bg-foreground/[0.045] sm:p-7"
              >
                <span className="shrink-0 pt-1 text-xs font-medium tracking-widest text-foreground/40">
                  {service.number}
                </span>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/55">
                    {service.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="shrink-0 self-start text-lg text-foreground/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground">
                  ↗
                </span>
              </MotionContainer>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonial */}
      <section className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
        <MotionContainer {...getMotionAnimation("testimonial")}>
          <div className="mx-auto max-w-[100rem] rounded-[2rem] px-7 py-20 sm:px-16 lg:px-24">
            <div className="grid gap-12 lg:grid-cols-[0.35fr_1.65fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  THE PARTNERSHIP
                </span>
              </div>

              <div>
                <p className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
                  "They didn't just understand what we wanted to build. They
                  helped us see what it could become."
                </p>

                <div className="mt-10 flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-accent/15 font-semibold text-accent">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Jordan Davis</p>
                    <p className="mt-1 text-xs text-muted">
                      Founder, North Digital
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionContainer>
      </section>
      {/* FAQ */}
      <section className="border-t border-border bg-[var(--surface-secondary)] px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
        <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              COMMON QUESTIONS
            </p>

            <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl">
              Let's clear things up.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              A few things people usually ask before starting a new creative
              partnership.
            </p>
          </div>

          <MotionChain {...getMotionAnimation("faq")}>
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group border-b border-border py-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-semibold marker:hidden">
                  {item.question}
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>

                <p className="max-w-2xl pt-5 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </MotionChain>
        </div>
      </section>
      {/* CTA */}
      <section id="contact" className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
        <MotionContainer {...getMotionAnimation("cta")}>
          <div className="relative mx-auto flex max-w-[100rem] flex-col items-center overflow-hidden rounded-[2rem] bg-foreground px-7 py-24 text-center text-background sm:px-16">
            <div className="absolute -left-24 -top-40 size-96 rounded-full bg-accent/15 blur-[100px]" />
            <div className="absolute -bottom-40 -right-24 size-96 rounded-full bg-accent/10 blur-[100px]" />

            <div className="relative">
              <Zap className="mx-auto size-9 text-accent" />

              <h2 className="mt-9 max-w-3xl text-4xl font-bold tracking-tighter sm:text-6xl">
                Have something worth making?
              </h2>

              <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-background/60 sm:text-base">
                Let's turn your next ambitious idea into something people
                remember.
              </p>

              <a
                href="mailto:hello@example.com"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-[var(--accent-foreground)] transition hover:-translate-y-1"
              >
                Tell us about it
                <ArrowUpRight className="size-4" />
              </a>

              <p className="mt-6 text-xs text-background/40">
                No pressure. Just a conversation.
              </p>
            </div>
          </div>
        </MotionContainer>
      </section>
    </main>
  );
}

export const getStaticProps: GetStaticProps = () => ({
  props: {},
});

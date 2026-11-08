import {
  ArrowRight,
  ChevronDown,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  createMotionConfig,
  createMotionRegistry,
  MotionChain,
  MotionContainer,
  MotionText,
} from "motion-provider";
import type { GetStaticProps } from "next";
import Head from "next/head";

const shopMotion = createMotionConfig({
  heroEyebrow: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeDown", "filterBlurIn"],
        transition: "gentle",
        duration: 0.65,
      },
    },
  },
  heroTitle: {
    type: "MotionText",
    props: {
      elementType: "h1",
      wrapperClassName:
        "max-w-3xl text-6xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl",
      animation: {
        mode: ["fadeUp", "filterBlurIn", "transformTextGradient"],
        transition: "slowCubic",
        duration: 1.15,
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
        duration: 0.8,
        delay: 0.2,
      },
    },
  },
  collectionTitle: {
    type: "MotionText",
    props: {
      elementType: "h2",
      wrapperClassName:
        "text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl",
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
  productGrid: {
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
  featureGrid: {
    type: "MotionChain",
    props: {
      elementType: "article",
      className: "h-full",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      config: {
        duration: 0.18,
        delayLogic: "sinusoidal",
      },
      controller: {
        configView: {
          amount: 0.25,
          once: true,
        },
      },
    },
  },
  faqGrid: {
    type: "MotionChain",
    props: {
      elementType: "div",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      },
      config: {
        duration: 0.14,
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
        duration: 0.9,
      },
    },
  },
});

const { getMotionAnimation } = createMotionRegistry(shopMotion);

const questions = [
  {
    question: "How long does shipping usually take?",
    answer:
      "Orders are typically dispatched within 1–2 business days. Standard delivery takes approximately 3–5 business days.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Unworn and unused products can be returned within 30 days of delivery in their original packaging.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. International delivery is available to selected countries, with shipping options displayed during checkout.",
  },
  {
    question: "Are the products covered by warranty?",
    answer:
      "Every eligible product includes a manufacturer's warranty. Product-specific coverage is listed on its details page.",
  },
];

export default function ShopShowcasePage() {
  return (
    <>
      <Head>
        <title>Showcases | E-Commerce</title>
      </Head>

      <main className="overflow-hidden bg-background text-foreground">
        {/* Hero */}
        <section className="px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <MotionContainer
              animation={{
                mode: ["fadeIn", "filterBlurIn"],
                duration: 0.9,
                transition: "gentle",
              }}
              controller={{ configView: { once: true, amount: 0.25 } }}
              className="relative order-2 mx-auto w-full max-w-lg lg:order-1"
            >
              <div className="absolute -left-6 top-12 size-28 rounded-full bg-orange-200/50 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] bg-[#eeeae3] p-5 sm:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    The essentials collection
                  </span>
                  <span className="text-xs text-zinc-500">01 / 04</span>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=90"
                    alt="Minimal neutral fashion collection"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                      Featured edit
                    </p>
                    <p className="mt-1 text-lg font-medium text-zinc-900">
                      Form & Function
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500">
                    Explore collection ↗
                  </span>
                </div>
              </div>
            </MotionContainer>

            <div className="order-1 lg:order-2 lg:pl-4">
              <MotionContainer
                animation={{
                  mode: ["fadeDown", "filterBlurIn"],
                  duration: 0.7,
                  transition: "gentle",
                }}
                controller={{ configView: { once: true, amount: 0.25 } }}
              >
                <span className="inline-flex rounded-full border border-foreground/15 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
                  Thoughtfully selected
                </span>
              </MotionContainer>

              <MotionText
                elementType="h1"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.9,
                  transition: "gentle",
                }}
                config={{ mode: "words", duration: 0.35 }}
                wrapperClassName="mt-7 max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl"
              >
                Less, but better.
              </MotionText>

              <MotionContainer
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.8,
                  delay: 0.15,
                  transition: "gentle",
                }}
                className="mt-7 max-w-md"
              >
                <p className="text-base leading-relaxed text-foreground/60 sm:text-lg">
                  Discover everyday objects designed to last. A considered
                  collection where simplicity, material, and craftsmanship come
                  together.
                </p>

                <a
                  href="#collection"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-background transition-transform hover:translate-y-[-2px]"
                >
                  Explore the collection
                  <span aria-hidden="true">↗</span>
                </a>
              </MotionContainer>
            </div>
          </div>
        </section>

        {/* Announcement strip */}
        <section className="border-y border-border bg-[var(--surface-secondary)] px-6 py-6 sm:px-10 lg:px-20">
          <div className="mx-auto flex max-w-[100rem] flex-wrap items-center justify-center gap-x-12 gap-y-5 text-xs font-semibold uppercase tracking-[0.13em] text-muted sm:justify-between">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-accent" />
              Complimentary shipping over $100
            </span>
            <span className="inline-flex items-center gap-2">
              <Package className="size-4 text-accent" />
              Carefully packed
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" />
              Secure checkout
            </span>
          </div>
        </section>

        {/* Product collection */}
        <section
          id="collection"
          className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
                  The collection
                </MotionText>
                <p className="mt-2 text-sm text-foreground/55">
                  Carefully chosen pieces for everyday living.
                </p>
              </div>

              <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/45">
                12 considered pieces
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-5">
              {[
                {
                  name: "Everyday Tote",
                  category: "Accessories",
                  price: "$48",
                  image: "photo-1548036328-c9fa89d128fa",
                },
                {
                  name: "Forma Chair",
                  category: "Furniture",
                  price: "$320",
                  image: "photo-1503602642458-232111445657",
                },
                {
                  name: "Ceramic Vessel",
                  category: "Objects",
                  price: "$64",
                  image: "photo-1578749556568-bc2c40e68b61",
                },
                {
                  name: "Studio Lamp",
                  category: "Lighting",
                  price: "$185",
                  image: "photo-1507473885765-e6ed057f782c",
                },
                {
                  name: "Daily Journal",
                  category: "Stationery",
                  price: "$28",
                  image: "photo-1544947950-fa07a98d237f",
                },
                {
                  name: "Soft Form",
                  category: "Apparel",
                  price: "$92",
                  image: "photo-1483985988355-763728e1935b",
                },
                {
                  name: "Object No. 02",
                  category: "Objects",
                  price: "$56",
                  image: "photo-1490312278390-ab64016e0aa9",
                },
                {
                  name: "Weekend Bag",
                  category: "Accessories",
                  price: "$115",
                  image: "photo-1553062407-98eeb64c6a62",
                },
                {
                  name: "Linen Set",
                  category: "Home",
                  price: "$84",
                  image: "photo-1616486338812-3dadae4b4ace",
                },
                {
                  name: "Arc Table",
                  category: "Furniture",
                  price: "$240",
                  image: "photo-1499933374294-4584851497cc",
                },
                {
                  name: "Daily Bottle",
                  category: "Objects",
                  price: "$38",
                  image: "photo-1602143407151-7111542de6e8",
                },
                {
                  name: "Canvas Shoes",
                  category: "Apparel",
                  price: "$76",
                  image: "photo-1525966222134-fcfa99b8ae77",
                },
              ].map((product, index) => (
                <MotionContainer
                  key={product.name}
                  elementType="article"
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    duration: 0.7,
                    transition: "gentle",
                    delay: (index % 5) * 0.06,
                  }}
                  controller={{
                    configView: {
                      once: true,
                      amount: 0.2,
                    },
                  }}
                  className="group min-w-0"
                >
                  <div className="mx-auto aspect-square w-full max-w-[12rem] overflow-hidden rounded-xl bg-[#eeeae3] sm:max-w-none">
                    <img
                      src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=85`}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-3 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-medium text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-foreground/50">
                        {product.category}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-foreground">
                      {product.price}
                    </span>
                  </div>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* Brand philosophy */}
        <section className="bg-black px-5 py-20 text-zinc-100 sm:px-8 lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <MotionContainer
                animation={{
                  mode: ["fadeDown", "filterBlurIn"],
                  duration: 0.8,
                  transition: "gentle",
                }}
                controller={{ configView: { once: true, amount: 0.25 } }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Our philosophy
                </span>
              </MotionContainer>

              <MotionText
                elementType="h2"
                animation={{
                  mode: ["fadeUp", "filterBlurIn"],
                  duration: 0.9,
                  transition: "gentle",
                }}
                config={{ mode: "words", duration: 0.35 }}
                wrapperClassName="mt-6 max-w-xl text-4xl font-medium leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl"
              >
                Good design should feel inevitable.
              </MotionText>
            </div>

            <MotionContainer
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                duration: 0.85,
                transition: "gentle",
              }}
              controller={{ configView: { once: true, amount: 0.25 } }}
              className="border-l border-white/15 pl-6 sm:pl-10"
            >
              <p className="max-w-lg text-lg leading-relaxed text-zinc-300 sm:text-xl">
                We believe in buying less and choosing well. Every piece in our
                collection is selected for its purpose, material, and ability to
                become part of your everyday life.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/15 pt-6">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    01
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                    Intentional design
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    ∞
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
                    Built to endure
                  </p>
                </div>
              </div>
            </MotionContainer>
          </div>
        </section>

        {/* Store benefits */}
        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <MotionText
              elementType="h2"
              animation={{
                mode: ["fadeUp", "filterBlurIn"],
                duration: 0.75,
                transition: "gentle",
              }}
              config={{ mode: "words" }}
              wrapperClassName="mb-8 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              The details matter.
            </MotionText>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Thoughtful materials",
                  description:
                    "Selected for their quality, character, and everyday durability.",
                },
                {
                  number: "02",
                  title: "Considered shipping",
                  description:
                    "Carefully packed and delivered with attention to every detail.",
                },
                {
                  number: "03",
                  title: "Personal service",
                  description:
                    "Real support from people who care about what you take home.",
                },
              ].map((benefit, index) => (
                <MotionContainer
                  key={benefit.number}
                  elementType="article"
                  animation={{
                    mode: ["fadeUp", "filterBlurIn"],
                    duration: 0.75,
                    transition: "gentle",
                    delay: index * 0.1,
                  }}
                  controller={{ configView: { once: true, amount: 0.25 } }}
                  className="flex min-h-44 flex-col justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.025] p-6 sm:p-7"
                >
                  <span className="text-xs font-medium tracking-widest text-foreground/40">
                    {benefit.number}
                  </span>
                  <div className="mt-8">
                    <h3 className="text-base font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/55">
                      {benefit.description}
                    </p>
                  </div>
                </MotionContainer>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border  px-6 py-28 sm:px-10 lg:px-20 lg:py-36">
          <div className="mx-auto grid max-w-[100rem] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                NEED A HAND?
              </p>
              <h2 className="text-5xl font-bold tracking-tighter sm:text-6xl">
                Good questions. Clear answers.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                A few useful details about ordering, delivery and looking after
                your products.
              </p>
            </div>

            <MotionChain {...getMotionAnimation("faqGrid")}>
              {questions.map((item) => (
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

        {/* Final CTA */}
        <section
          id="checkout"
          className="px-6 py-28 sm:px-10 lg:px-20 lg:py-36"
        >
          <MotionContainer {...getMotionAnimation("cta")}>
            <div className="glass mx-auto flex max-w-[100rem] flex-col items-center rounded-[2rem] px-7 py-24 text-center sm:px-16">
              <ShoppingBag className="size-9 text-accent" />

              <h2 className="mt-8 max-w-2xl text-4xl font-bold tracking-tighter sm:text-6xl">
                Make room for better things.
              </h2>

              <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Explore the collection and find the pieces that belong in your
                everyday life.
              </p>

              <a
                href="#shop"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:-translate-y-1"
              >
                Find your next favorite
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

// dear reviewer, this file has indeed designed for illustration purposes.
// It does not reflect a real use case. Check the docs for examples.

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  type AnimationController,
  MotionChain,
  MotionText,
  useController,
} from "motion-provider";
import { type ReactNode, useState } from "react";
import { Annotation } from "@/components/annotation";
import { cn } from "@/lib/utils";
import type { ShowcaseComponentProps } from "@/types/types-showcase";

export default function MotionLinkDemo({ className }: ShowcaseComponentProps) {
  const controller = useController();
  const [activePage, setActivePage] = useState<"a" | "b">("a");

  const navigatePage = (page: "a" | "b") => {
    setActivePage(page);
  };

  return (
    <div
      className={cn(
        "aspect-video flex flex-col items-center justify-start border rounded-3xl w-7/12 p-2 relative",
        className,
      )}
    >
      <div className="h-auto w-full justify-evenly items-start flex gap-2 ">
        <div className="flex items-center justify-between gap-px">
          <span className="size-3 rounded-full bg-accent" />
          <span className="size-3 rounded-full bg-accent/50" />
          <span className="size-3 rounded-full bg-accent/20" />
        </div>
        <div className="rounded-full w-full items-center justify-center flex bg-surface">
          <span className="text-[11px] text-muted font-secondary tracking-tight">
            https://www.hub.app/feed
          </span>
        </div>
        <div className="gap-1 flex items-center-safe justify-center-safe">
          <button
            onClick={() => navigatePage("a")}
            type="button"
            className="shrink-0 hover:opacity-70 cursor-pointer rounded-full hover:bg-accent hover:text-accent-foreground text-muted active:scale-95"
          >
            <ChevronLeftIcon className="size-4.5" />
          </button>
          <button
            type="button"
            onClick={() => navigatePage("b")}
            className="shrink-0 hover:opacity-70 cursor-pointer rounded-full hover:bg-accent hover:text-accent-foreground text-muted active:scale-95"
          >
            <ChevronRightIcon className="size-4.5" />
          </button>
        </div>
      </div>
      {activePage === "a" ? <PageA /> : <PageB />}
    </div>
  );
}

/* ---------- Mock data & shared mock primitives ---------- */

interface NavItem {
  label: string;
  icon?: string;
}

interface Stat {
  text: string;
  className?: string;
}

interface MockComment {
  initials: string;
  name: string;
  text: string;
  avatarClassName: string;
}

const NAV_A: readonly NavItem[] = [
  { label: "Feed" },
  { label: "Explore" },
  { label: "Following" },
  { label: "Messages" },
];

const SHAPES_A: readonly string[] = [
  "absolute -right-3 -top-5 size-20 rounded-full border-12 border-white/20",
  "absolute right-10 top-5 size-10 rotate-12 rounded-xl bg-pink-400/40",
];

const SHAPES_B: readonly string[] = [
  "absolute -right-4 -top-8 size-28 rounded-full border-18 border-white/20",
  "absolute right-12 top-5 size-14 rotate-12 rounded-2xl bg-pink-400/40",
  "absolute bottom-3 right-4 size-8 rounded-full bg-amber-300/40 blur-sm",
];

const STATS_A: readonly Stat[] = [
  { text: "♡ 248 likes" },
  { text: "32 comments" },
];

const STATS_B: readonly Stat[] = [
  { text: "♥ 248", className: "text-pink-500" },
  { text: "◯ 32 comments" },
  { text: "↗ Share", className: "ml-auto" },
];

const COMMENTS: readonly MockComment[] = [
  {
    initials: "SK",
    name: "Sarah Kim",
    text: "Love this color palette! 🎨",
    avatarClassName: "bg-sky-400/20",
  },
  {
    initials: "MR",
    name: "Mike Reed",
    text: "Such a cool concept.",
    avatarClassName: "bg-pink-400/20",
  },
];
function Avatar({
  initials,
  className,
}: {
  initials: string;
  className: string;
}) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full", className)}
    >
      {initials}
    </span>
  );
}

function MockNav({
  items,
  activeIndex,
  activeClassName,
  footer,
  controller,
}: {
  items: readonly NavItem[];
  activeIndex: number;
  activeClassName: string;
  footer: string;
  controller: AnimationController;
}) {
  return (
    <aside className="flex flex-col gap-1 border-r pr-2">
      <MotionChain
        animation={{
          mode: "fadeDown",
          duration: 1,
          transition: "gentle",
        }}
      >
        {items.map(({ label, icon }, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-1 px-1.5 py-2 text-[9px]",
              i === activeIndex ? activeClassName : "text-muted",
            )}
          >
            {icon && <span>{icon}</span>}
            {label}
          </div>
        ))}
      </MotionChain>

      <div className="mt-auto border-t pt-2 text-[9px] text-muted">
        {footer}
      </div>
    </aside>
  );
}

function PostHeader({ meta }: { meta: string }) {
  return (
    <div className="flex items-center gap-2 p-2">
      <Avatar
        initials="AM"
        className="size-6 bg-orange-400/20 text-[8px] font-semibold"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] font-semibold">Burak Bilen</p>
        <p className="text-[8px] text-muted">{meta}</p>
      </div>
      <span className="text-xs text-muted">···</span>
    </div>
  );
}

function PostMedia({
  shapes,
  className,
  children,
}: {
  shapes: readonly string[];
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex items-end overflow-hidden bg-linear-to-br from-violet-500/30 via-fuchsia-400/20 to-amber-300/30",
        className,
      )}
    >
      <MotionChain
        animation={{
          mode: "fadeIn",
          duration: 1,
          transition: "gentle",
          delay: 0.5,
        }}
      >
        {shapes.map((shape) => (
          <div key={shape} className={shape} />
        ))}
      </MotionChain>
      {children}
    </div>
  );
}

/* ---------- Mock pages ---------- */

function PageA() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-background text-foreground relative">
      {/* Feed layout */}
      <div className="grid min-h-0 flex-1 grid-cols-[64px_minmax(0,1fr)_96px] gap-2 py-2 relative">
        <MockNav
          items={NAV_A}
          activeIndex={0}
          activeClassName="rounded-md bg-accent font-medium text-black"
          footer="Settings"
        />

        {/* Main feed */}
        <main className="min-w-0 overflow-hidden">
          <article className="overflow-hidden rounded-lg border">
            <PostHeader meta="Engineering · 12 min ago" />

            <div className="px-2 pb-2 text-[9px] leading-relaxed">
              A little inspiration for your next creative project with{" "}
              <b>Motion Provider</b> ✨
            </div>

            <PostMedia shapes={SHAPES_A} className="h-20 p-2">
              <div className="relative rounded-md bg-background/70 px-2 py-1 backdrop-blur-sm">
                <MotionText
                  elementType="p"
                  animation={{
                    mode: ["filterBlurIn", "textShimmer"],
                    delay: 1,
                  }}
                  wrapperClassName="text-[8px] uppercase tracking-widest text-muted"
                >
                  Visual journal
                </MotionText>
                <MotionText
                  elementType="p"
                  animation={{
                    mode: ["clipUp"],
                    duration: 0.8,
                    delay: 1.5,
                  }}
                  config={{
                    mode: "chars",
                    duration: 0.8,
                  }}
                  className="text-sm font-semibold tracking-tight"
                >
                  Create boldly.
                </MotionText>
              </div>
            </PostMedia>

            <div className="flex items-center justify-between border-t px-2 py-1.5 text-[9px] text-muted">
              {STATS_A.map(({ text }) => (
                <span key={text}>{text}</span>
              ))}
            </div>
          </article>
        </main>
        <Annotation
          title="Navigate me"
          className="z-50 absolute right-4 top-4 text-xs -rotate-12 scale-90"
          textClassName="text-xl font-bold tracking-normal"
        />
      </div>
    </div>
  );
}

function PageB() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-background text-foreground">
      {/* Individual post layout */}
      <div className="min-h-0 flex-1 gap-2 p-2">
        {/* Post and comments */}
        <main className="flex min-w-0 flex-col gap-2 overflow-hidden">
          <div className="flex items-center gap-1 text-[9px] text-muted">
            <span>←</span>
            <span>Back to feed</span>
          </div>

          <article className="min-w-0 overflow-hidden rounded-lg border">
            <PostHeader meta="@alexmorgan · 12 min ago" />

            <div className="px-2 pb-2">
              <p className="text-[10px] font-medium leading-relaxed">
                A little inspiration for your next creative project ✨
              </p>
              <p className="mt-1 text-[9px] leading-relaxed text-muted">
                Exploring colors, shapes, and the little details that make a
                design feel alive. What are you creating today?
              </p>
            </div>

            <PostMedia shapes={SHAPES_B} className="h-28 p-3">
              <div className="relative">
                <p className="text-[8px] uppercase tracking-[0.2em] text-muted">
                  Visual journal — 001
                </p>
                <p className="mt-1 text-lg font-bold tracking-tight">
                  Create
                  <br />
                  boldly.
                </p>
              </div>
            </PostMedia>

            <div className="flex items-center gap-3 border-b px-2 py-2 text-[9px] text-muted">
              {STATS_B.map(({ text, className }) => (
                <span key={text} className={className}>
                  {text}
                </span>
              ))}
            </div>

            <div className="p-2">
              <p className="mb-2 text-[9px] font-semibold">Comments · 32</p>

              <div className="flex flex-col gap-2">
                {COMMENTS.map(({ initials, name, text, avatarClassName }) => (
                  <div key={name} className="flex gap-1.5">
                    <Avatar
                      initials={initials}
                      className={cn(
                        "size-5 text-[7px] font-semibold",
                        avatarClassName,
                      )}
                    />
                    <div className="min-w-0 flex-1 rounded-md bg-surface p-1.5">
                      <p className="text-[8px] font-semibold">{name}</p>
                      <p className="mt-0.5 text-[9px] leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="flex shrink-0 items-center gap-2 rounded-lg border p-2">
            <Avatar
              initials="JD"
              className="size-5 bg-violet-500/20 text-[8px]"
            />
            <span className="text-[9px] text-muted">Write a comment...</span>
            <span className="ml-auto text-[9px] text-violet-500">Post</span>
          </div>
        </main>
      </div>
    </div>
  );
}

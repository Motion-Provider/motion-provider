"use client";

import { MotionContainer, useController } from "motion-provider";
import { useState } from "react";

const products = [
  "Walnut desk",
  "Brass lamp",
  "Linen chair",
  "Oak shelf",
  "Wool rug",
  "Ceramic planter",
  "Reading bench",
  "Glass pendant",
];

function ProductPreview({ onRestart }: { onRestart: () => void }) {
  const controls = useController();
  const [source, setSource] = useState<HTMLElement | null>(null);
  const [paused, setPaused] = useState(false);

  return (
    <section className="w-full max-w-sm space-y-3 px-3 text-sm text-foreground">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg bg-accent px-3 py-2 font-medium text-background disabled:opacity-50"
          disabled={paused}
          onClick={() => {
            controls.pause();
            setPaused(true);
          }}
        >
          {paused ? "Preview paused" : "Pause preview"}
        </button>
        <button
          type="button"
          className="rounded-lg border border-border bg-surface px-3 py-2"
          onClick={onRestart}
        >
          Restart preview
        </button>
      </div>
      <section
        ref={setSource}
        aria-label="Scrollable product list"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The overflow region needs focus for keyboard scrolling.
        tabIndex={0}
        className="h-44 overflow-y-auto overscroll-contain rounded-xl border border-border bg-surface"
      >
        <ul className="divide-y divide-border">
          {products.map((product) => (
            <li
              key={product}
              className="flex min-h-12 items-center justify-between gap-3 px-3 py-2"
            >
              {product}
              {source && (
                <MotionContainer
                  aria-hidden="true"
                  className="h-2 w-12 shrink-0 rounded-full bg-accent"
                  animation={{ mode: "fadeIn", easing: "linear" }}
                  controller={{ controls, scroll: { source, mode: "view" } }}
                />
              )}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default function ScrollTakeover() {
  const [run, setRun] = useState(0);
  return <ProductPreview key={run} onRestart={() => setRun(run + 1)} />;
}

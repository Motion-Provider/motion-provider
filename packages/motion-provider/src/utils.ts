import { finite, invariant } from "./engine/errors.js";
import type { DelayLogic } from "./types.js";

interface DelayInput {
  delayLogic?: DelayLogic;
  index: number;
  baseDuration?: number;
  customLogic?: (index: number) => number;
  total?: number;
  seed?: number;
  maxDelay?: number;
}

function random(seed: number): number {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/** Deterministic stagger in seconds. Negative wave values clamp to zero; growth is bounded. */
export function calculateDelay({
  delayLogic = "linear",
  index,
  baseDuration = 0.1,
  customLogic,
  total = 100,
  seed = 12345,
  maxDelay = 60,
}: DelayInput): number {
  const i = Math.floor(finite(index, "index", 0)),
    d = finite(baseDuration, "stagger duration", 0);

  finite(maxDelay, "maxDelay", 0);
  finite(seed, "seed");
  finite(total, "total", 1);

  if (d === 0 && delayLogic !== "custom") return 0;

  let value: number;

  switch (delayLogic) {
    case "linear":
      value = i * d;
      break;
    case "exponential":
      value = 2 ** Math.min(i, 1023) * d;
      break;
    case "sinusoidal":
      value = Math.sin(i) * d;
      break;
    case "cosine":
      value = Math.cos(i) * d;
      break;
    case "square":
      value = (i % 2) * d;
      break;
    case "triangle": {
      const p = i % 4;
      value = (p < 2 ? p : 4 - p) * d;
      break;
    }
    case "sawtooth":
      value = (i % 4) * d;
      break;
    case "fibonacci": {
      let a = 0,
        b = 1;
      for (let n = 0; n < Math.min(i, 1476); n++) {
        [a, b] = [b, a + b];
        if (a * d >= maxDelay) break;
      }
      value = a * d;
      break;
    }
    case "pendulum":
      value = Math.exp(-0.1 * i) * Math.sin(2 * i) * d;
      break;
    case "perlin":
      value = (random(i + 1) * 2 - 1) * d;
      break;
    case "chaotic": {
      let x = 0.5;
      for (let n = 0; n <= Math.min(i, 10000); n++) x = 3.99 * x * (1 - x);
      value = x * d * 10;
      break;
    }
    case "bounce":
      value = 0.8 ** (i % 5) * d;
      break;
    case "spiral":
      value = (Math.cos(i * 0.5) + Math.sin(i * 0.5)) * Math.sqrt(i) * d;
      break;
    case "quantum":
      value = Math.abs(Math.sin(i) * Math.cos(i * 0.5)) * d * 2;
      break;
    case "jitter":
      value = d * (1 + (random(i + seed) - 0.5) * 0.3);
      break;
    case "shuffle":
      value = Math.floor(random(i + seed) * total) * d;
      break;
    case "wave":
      value = (Math.sin(0.5 * i) * 0.5 + 0.5) * d;
      break;
    case "pingpong": {
      const p = i % 6;
      value = (p < 3 ? p : 6 - p) * d;
      break;
    }
    case "harmonic":
      value =
        (((Math.sin(i * 0.18) +
          Math.sin(i * 0.45) * 0.45 +
          Math.sin(i * 0.9) * 0.2) /
          3) *
          0.5 +
          0.5) *
        d;
      break;
    case "randomWalk":
      value = (0.25 + random(i + 7) * 0.75) * d;
      break;
    case "custom":
      invariant(
        customLogic,
        "MISSING_DELAY_LOGIC",
        "customLogic is required for custom delays.",
      );
      value = finite(customLogic(i), "custom delay");
      break;
    default:
      invariant(
        false,
        "UNKNOWN_DELAY",
        `Unknown delay algorithm "${delayLogic}".`,
      );
  }
  return Math.max(0, Math.min(maxDelay, value));
}
/** Compute once per group. Shuffle uses a seeded permutation, without duplicate ranks. */
export function calculateDelays(
  count: number,
  config: Omit<DelayInput, "index" | "total"> = {},
): number[] {
  finite(count, "count", 0);
  invariant(
    Number.isInteger(count),
    "INVALID_COUNT",
    "count must be an integer.",
  );

  if (config.delayLogic !== "shuffle")
    return Array.from(
      {
        length: count,
      },
      (_, index) =>
        calculateDelay({
          ...config,
          index,
          total: Math.max(1, count),
        }),
    );

  const ranks = Array.from(
    {
      length: count,
    },
    (_, i) => i,
  );

  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(random(i + (config.seed ?? 12345)) * (i + 1));
    [ranks[i], ranks[j]] = [ranks[j]!, ranks[i]!];
  }

  return ranks.map((index) =>
    calculateDelay({
      ...config,
      delayLogic: "linear",
      index,
      total: Math.max(1, count),
    }),
  );
}

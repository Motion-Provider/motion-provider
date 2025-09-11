import { CalculateDelayProps } from "../types";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacci(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function logisticMap(index: number, r = 3.99, seed = 0.5) {
  let x = seed;
  for (let i = 0; i <= index; i++) {
    x = r * x * (1 - x);
  }
  return x;
}

function pseudoNoise(index: number) {
  const rnd = mulberry32(index + 1)();
  return rnd * 2 - 1; // [-1,1]
}

function seededRank(index: number, total = 100) {
  const rnd = mulberry32(index + 11)();
  return Math.floor(rnd * Math.max(1, total));
}

/**
 * Calculates the delay based on the provided delay logic.
 */
export const calculateDelay = ({
  baseDuration,
  index,
  delayLogic,
  customLogic,
}: CalculateDelayProps): number => {
  const i = Math.max(0, Math.floor(index || 0));
  const bd = Number(baseDuration) || 1;

  switch (delayLogic) {
    case "linear":
      return i * bd;

    case "exponential":
      return Math.pow(2, i) * bd;

    case "sinusoidal":
      return Math.sin(i) * bd;

    case "cosine":
      return Math.cos(i) * bd;

    case "square":
      return (i % 2) * bd;

    case "triangle": {
      const period = 4;
      const position = i % period;
      return (position < period / 2 ? position : period - position) * bd;
    }

    case "sawtooth": {
      const period = 4;
      return (i % period) * bd;
    }

    case "fibonacci":
      return fibonacci(i) * bd;

    case "pendulum": {
      const damping = 0.1;
      const frequency = 2;

      return Math.exp(-damping * i) * Math.sin(frequency * i) * bd;
    }

    case "perlin":
      return pseudoNoise(i) * bd;

    case "chaotic": {
      const r = 3.99;
      const seed = 0.5;
      const val = logisticMap(i, r, seed);

      return val * bd * 10;
    }

    case "bounce": {
      const gravity = 0.8;

      return Math.pow(gravity, i % 5) * bd;
    }

    case "spiral": {
      const angle = i * 0.5;
      const spiralOffset = Math.sqrt(i) * bd;

      return (Math.cos(angle) + Math.sin(angle)) * spiralOffset;
    }

    case "quantum": {
      const probability = Math.abs(Math.sin(i) * Math.cos(i * 0.5));

      return probability * bd * 2;
    }

    case "custom":
      return typeof customLogic === "function" ? customLogic(i) : i * bd;

    case "jitter": {
      const amount = 0.15;
      const seed = 12345;
      const rnd = mulberry32(i + seed)();

      return bd * (1 + (rnd - 0.5) * 2 * amount);
    }

    case "shuffle": {
      const total = 100;
      const rank = seededRank(i, total);

      return rank * bd;
    }

    case "wave": {
      const freq = 0.5;
      const amp = 1;
      const v = (Math.sin(freq * i) * 0.5 + 0.5) * amp;

      return v * bd;
    }

    case "pingpong": {
      const period = 6;
      const pos = i % period;
      const val = pos < period / 2 ? pos : period - pos;

      return val * bd;
    }

    case "harmonic": {
      const waves = [
        { f: 0.18, a: 1 },
        { f: 0.45, a: 0.45 },
        { f: 0.9, a: 0.2 },
      ];
      let v = 0;
      for (const w of waves) v += Math.sin(i * w.f) * w.a;

      v = (v / waves.length) * 0.5 + 0.5;
      return v * bd;
    }

    case "randomWalk": {
      const rnd = mulberry32(i + 7)();

      return (0.25 + rnd * 0.75) * bd;
    }

    default:
      return i * bd;
  }
};

export default calculateDelay;

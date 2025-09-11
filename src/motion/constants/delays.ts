const delays = [
  "linear",
  "exponential",
  "sinusoidal",
  "custom",
  "square",
  "triangle",
  "sawtooth",
  "cosine",
  "fibonacci",
  "pendulum",
  "perlin",
  "chaotic",
  "bounce",
  "spiral",
  "quantum",
  "jitter",
  "shuffle",
  "wave",
  "pingpong",
  "harmonic",
  "randomWalk",
] as const;

export default delays;

type Values<T extends readonly string[]> = T[number];
export type DelayLogic = Values<typeof delays>;

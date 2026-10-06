export type SignalItem = {
  id: number;
  title: string;
  desc: string;
};

export default [
  {
    id: 1,
    title: "Human-first motion",
    desc: "We want you to enjoy animating the web, not automate it.",
  },
  {
    id: 2,
    title: "No Dependencies",
    desc: "Built solely on top of WAAPI.",
  },
  {
    id: 3,
    title: "Straightforward API",
    desc: "Supercharged with 68+ Animations 30 Transitions and 20+ motion curves.",
  },
  {
    id: 4,
    title: "Playground for ease",
    desc: "Dedicated ground to animate 15x faster. Undecided devs will love it!",
  },
  {
    id: 5,
    title: "Free and Open Source",
    desc: "Always welcomed to contribute the community.",
  },
] as const satisfies readonly SignalItem[];

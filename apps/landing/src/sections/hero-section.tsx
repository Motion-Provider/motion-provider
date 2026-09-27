import { Button, Chip } from "@heroui/react";
import { CopyIcon, PlayIcon } from "lucide-react";
import { Circle } from "@/components/circle";

export default function HeroSection() {
  return (
    <main className="flex items-center-safe justify-center-safe flex-col h-screen relative overflow-y-clip">
      <Circle />
      <Chip
        variant="soft"
        color="accent"
        size="sm"
        className="glass border-glass-border mb-6"
      >
        🚀 v1.0 — Preset-driven WAAPI animations
      </Chip>
      <h1 className="max-w-5xl text-balance text-6xl font-bold leading-[0.95] tracking-tighter text-foreground sm:text-7xl lg:text-8xl inline-flex items-center selection:bg-transparent">
        M
        <PlayIcon className="size-20 stroke-4 -mx-1.25 cursor-pointer" />
        tion Provider
      </h1>
      <p className="mt-4 max-w-155 text-center text-balance tracking-tight text-md text-muted">
        Preset-driven animation engine for the web powered by the Web Animations
        API.
      </p>
      <div className="mt-4">
        <Button
          variant="primary"
          className="rounded-full px-6 font-secondary gap-3"
        >
          npm i motion-provider <CopyIcon className="size-4" />
        </Button>
      </div>
    </main>
  );
}

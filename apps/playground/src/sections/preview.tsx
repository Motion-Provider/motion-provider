"use client";

import { Button, Card, Slider } from "@heroui/react";
import {
  CodeXml,
  Columns2,
  Copy,
  Eye,
  Monitor,
  Pause,
  Play,
  RotateCcw,
  ScanLine,
  Smartphone,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IconButton, Segmented } from "../components/controls";
import { MotionTree } from "../components/motion-tree";
import { Sandbox } from "../components/sandbox";
import type { usePlayback } from "../hooks/use-playback";
import type { Device, Markup, Project, View } from "../types/playground";

const CodePane = dynamic(
  () => import("../components/code-pane").then(({ CodePane }) => CodePane),
  {
    loading: () => (
      <p role="status" className="p-6 text-sm text-muted">
        Loading the code viewer…
      </p>
    ),
  },
);

const views = [
  { id: "preview", label: "Preview", icon: Eye },
  { id: "code", label: "Code", icon: CodeXml },
] as const;
const devices = [
  { id: "desktop", label: "Desktop viewport", icon: Monitor, iconOnly: true },
  { id: "mobile", label: "Mobile viewport", icon: Smartphone, iconOnly: true },
] as const;

export function Preview({
  project,
  markup,
  view,
  device,
  css,
  code,
  selected,
  active,
  before,
  total,
  playback,
  onSelect,
  onView,
  onDevice,
  onBefore,
  onCopy,
  onError,
}: {
  project: Project;
  markup: Markup;
  view: View;
  device: Device;
  css: string;
  code: string;
  selected?: string;
  active: ReadonlySet<string>;
  before: boolean;
  total: number;
  playback: ReturnType<typeof usePlayback>;
  onSelect: (id: string) => void;
  onView: (view: View) => void;
  onDevice: (device: Device) => void;
  onBefore: (value: boolean) => void;
  onCopy: (value: string) => void;
  onError: (message: string) => void;
}) {
  const [codeView, setCodeView] = useState<"generated" | "original">(
    "generated",
  );
  const live = view === "preview";
  const playing = playback.display.state === "playing";

  return (
    <Card
      aria-label="Live sandbox"
      className="flex min-w-0 flex-col gap-0 overflow-hidden rounded-[12px] border border-[var(--stroke)] bg-[var(--panel)] p-0 shadow-none lg:col-start-2 lg:row-start-1"
    >
      <div className="relative flex min-h-14 flex-wrap items-center justify-between gap-2 border-b border-[var(--stroke)] px-3 py-2 sm:px-4">
        <h2 className="mr-auto flex items-center gap-2.5 text-sm font-semibold">
          <ScanLine size={17} strokeWidth={1.7} className="text-muted" />
          <span>Sandbox</span>
        </h2>
        <Segmented
          label="Sandbox view"
          items={views}
          value={view}
          onChange={onView}
        />
        <div className="flex items-center gap-1 sm:ml-auto">
          {live ? (
            <Segmented
              label="Viewport"
              items={devices}
              value={device}
              onChange={onDevice}
            />
          ) : (
            <IconButton
              label="Copy visible code"
              icon={Copy}
              onPress={() =>
                onCopy(codeView === "generated" ? code : project.html)
              }
            />
          )}
        </div>
      </div>
      {live ? (
        <>
          <Sandbox
            markup={markup}
            device={device}
            css={css}
            onSelect={onSelect}
          >
            <MotionTree
              markup={markup}
              assignments={before ? {} : project.assignments}
              active={active}
              selected={selected}
              controller={playback.controller}
              passive={playback.passive}
              onError={onError}
            />
          </Sandbox>
          <div className="flex min-h-[66px] flex-wrap items-center gap-2.5 border-t border-[var(--stroke)] px-3 py-2 sm:gap-3 sm:px-4">
            <IconButton
              label={playing ? "Pause animation" : "Play animation"}
              icon={playing ? Pause : Play}
              variant="primary"
              isDisabled={!total || before}
              onPress={() => (playing ? playback.pause() : playback.play())}
              className="size-9 rounded-md bg-accent text-accent-foreground hover:text-accent-foreground"
            />
            <IconButton
              label="Replay from start"
              icon={RotateCcw}
              isDisabled={!total || before}
              onPress={() => playback.play(true)}
            />
            <Slider
              aria-label="Playback position"
              isDisabled={!total || before}
              value={Math.min(total, playback.display.current)}
              maxValue={total || 1}
              step={0.01}
              onChange={(time) => {
                if (typeof time === "number") playback.seek(time);
              }}
              className="mp-slider mp-timeline min-w-12 flex-1"
            >
              <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
              </Slider.Track>
            </Slider>
            <div className="shrink-0 font-mono text-[12px] whitespace-nowrap text-muted">
              <span className="text-foreground">
                {Math.min(total, playback.display.current).toFixed(2)}
              </span>{" "}
              / {total.toFixed(2)}s
            </div>
            <Button
              size="sm"
              isIconOnly
              variant="outline"
              aria-label={
                before ? "Show animated version" : "Compare with original"
              }
              aria-pressed={before}
              isDisabled={!markup.layers.length}
              onPress={() => onBefore(!before)}
              className={`min-h-8 rounded-md border-[var(--stroke)] ${before ? "bg-[var(--tint)] text-accent" : "text-muted"}`}
            >
              <Columns2 size={16} />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex min-h-[430px] flex-1 flex-col gap-3 bg-[var(--canvas)] p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Segmented
              label="Code version"
              value={codeView}
              onChange={setCodeView}
              items={[
                { id: "generated", label: "Motion TSX" },
                { id: "original", label: "Original HTML" },
              ]}
            />
            <span className="text-[12px] text-muted">
              {codeView === "generated" ? "React · TypeScript" : "HTML"}
            </span>
          </div>
          <CodePane source={codeView === "generated" ? code : project.html} />
        </div>
      )}
    </Card>
  );
}

import { type Key, Label, ListBox, Select } from "@heroui/react";
import {
  type DelayLogic,
  MotionChain,
  type TransitionKeys,
} from "motion-provider";
import { useState } from "react";
import type { ModuleProps } from "../../types";
import { shapeDefinitions } from "./data";

const delayItems = [
  "linear",
  "exponential",
  "sinusoidal",
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
] as const satisfies DelayLogic[];

const transitionItems = [
  "bounceHard",
  "bounceSoft",
  "cubicBounce",
  "cubicElastic",
  "cubicFastEnd",
  "cubicFastStart",
  "cubicSmooth",
  "default",
  "easeIn",
  "easeInOut",
  "easeOut",
  "elasticHard",
  "elasticSoft",
  "fadeRotate",
  "fadeScale",
  "fadeSlide",
  "float",
  "gentle",
  "linear",
  "linger",
  "overshoot",
  "pop",
  "rush",
  "settle",
  "slowCubic",
  "smooth",
  "smoothFast",
  "snappy",
  "springy",
  "sudden",
] as const;

const strokePalette = [
  "var(--color-success)",
  "var(--color-danger)",
  "var(--color-accent)",
] as const;

const shapes = shapeDefinitions.map((shape) => ({
  id: shape.id,
  elementType: shape.elementType,
  props: {
    ...shape.props,
    stroke: strokePalette[Math.floor(Math.random() * strokePalette.length)]!,
  },
}));

export default function Component({ controller }: ModuleProps) {
  const [selectedDelay, setSelectedDelay] = useState<Key | null>("sinusoidal");
  const [selectedTransition, setSelectedTransition] = useState<Key | null>(
    "gentle",
  );

  return (
    <div className="flex w-full min-w-0 flex-col items-center gap-2 p-3">
      <div className="order-last grid w-full grid-cols-[repeat(2,minmax(0,8rem))] items-end justify-start gap-1">
        <Select
          className="w-full min-w-0"
          placeholder="Select delay"
          value={selectedDelay}
          onChange={(v) => setSelectedDelay(v)}
        >
          <Label className="font-secondary text-xs">delayLogic</Label>
          <Select.Trigger>
            <Select.Value className="text-xs" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="max-h-60 overflow-y-scroll text-xs">
              {delayItems.map((delay) => (
                <ListBox.Item key={delay} id={delay} textValue={delay}>
                  {delay}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
        <Select
          className="w-full min-w-0 text-xs"
          placeholder="Select delay"
          value={selectedTransition}
          onChange={(v) => setSelectedTransition(v)}
        >
          <Label className="font-secondary text-xs">transition</Label>
          <Select.Trigger>
            <Select.Value className="text-xs" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="max-h-60 overflow-y-scroll text-xs">
              {transitionItems.map((delay) => (
                <ListBox.Item key={delay} id={delay} textValue={delay}>
                  {delay}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      <svg
        width={600}
        height={600}
        viewBox="0 0 600 600"
        className="aspect-square h-auto w-56 max-w-full"
        role="img"
        aria-labelledby="path-drawing-title"
      >
        <title id="path-drawing-title">Practicing with SVG</title>
        <MotionChain
          key={`${selectedDelay}-${selectedTransition}`}
          animations={shapes.map((_, i) => ({
            mode: "drawPath",
            delay: i * 0.25,
            duration: 0.88,
            transition: selectedTransition as TransitionKeys,
          }))}
          config={{
            duration: 0.24,
            delayLogic: selectedDelay as DelayLogic,
          }}
          elementType="g"
          controller={controller}
        >
          {shapes.map(({ id, elementType: Component, props }) => (
            <Component
              key={id}
              {...props}
              style={{
                strokeWidth: 10,
                strokeLinecap: "round",
                strokeDasharray: "1 1",
                fill: "none",
              }}
            />
          ))}
        </MotionChain>
      </svg>
    </div>
  );
}

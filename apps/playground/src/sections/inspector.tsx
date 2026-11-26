"use client";

import { Button, Card, Chip } from "@heroui/react";
import {
  Boxes,
  Dices,
  Gauge,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  SquareDashed,
  Trash2,
} from "lucide-react";
import {
  IconButton,
  OptionSelect,
  Range,
  SectionTitle,
  Segmented,
} from "../components/controls";
import { EASINGS, ORDERS, PRESETS } from "../constants/motion.config";
import type { Easing, Layer, MotionSettings } from "../types/playground";

const easingItems = Object.entries(EASINGS).map(([id, { label }]) => ({
  id: id as Easing,
  label,
}));
const pieceItems = [4, 9, 16, 25, 36, 49, 64].map((count) => ({
  id: String(count),
  label: `${Math.sqrt(count)} × ${Math.sqrt(count)}`,
}));

export function Inspector({
  layer,
  settings,
  assigned,
  onChange,
  onRemove,
  onReset,
  onRandomize,
}: {
  layer?: Layer;
  settings?: MotionSettings;
  assigned: boolean;
  onChange: (patch: Partial<MotionSettings>) => void;
  onReset: () => void;
  onRemove: () => void;
  onRandomize: () => void;
}) {
  return (
    <Card
      aria-label="Motion settings"
      className="flex min-w-0 flex-col gap-0 overflow-hidden rounded-[12px] border border-[var(--stroke)] bg-[var(--panel)] p-0 shadow-none"
    >
      <SectionTitle
        icon={SlidersHorizontal}
        action={
          <IconButton
            icon={RotateCcw}
            label="Reset layer settings"
            onPress={onReset}
            isDisabled={!layer}
          />
        }
      >
        Motion settings
      </SectionTitle>
      {layer && settings ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--stroke)] px-4 py-3.5">
            <code className="font-mono text-[13px] text-[var(--secondary-text)]">
              &lt;{layer.tag}&gt;
            </code>
            <Chip
              size="sm"
              variant="soft"
              color="accent"
              className="rounded-md bg-[var(--tint)] px-2 font-mono text-[12px] text-accent"
            >
              {layer.kind}
            </Chip>
          </div>
          <div className="grid min-h-0 content-start gap-3 overflow-y-auto px-4 py-3">
            <OptionSelect
              label="Animation preset"
              icon={Sparkles}
              value={settings.preset}
              items={PRESETS}
              onChange={(preset) => onChange({ preset })}
            />
            <div className="grid gap-2.5 border-t border-[var(--stroke)] pt-3">
              <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
                <Gauge size={14} /> Timing
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <Range
                  label="Duration"
                  min={0.1}
                  max={3}
                  step={0.05}
                  value={settings.duration}
                  onChange={(duration) => onChange({ duration })}
                />
                <Range
                  label="Delay"
                  max={2}
                  step={0.05}
                  value={settings.delay}
                  onChange={(delay) => onChange({ delay })}
                />
              </div>
              <OptionSelect
                label="Easing"
                value={settings.easing}
                items={easingItems}
                onChange={(easing) => onChange({ easing })}
              />
            </div>
            {layer.kind !== "MotionContainer" && (
              <div className="grid gap-2.5 border-t border-[var(--stroke)] pt-3">
                <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
                  <Boxes size={14} />{" "}
                  {layer.kind === "MotionText"
                    ? "Text settings"
                    : layer.kind === "MotionImage"
                      ? "Image settings"
                      : "Sequence settings"}
                </h3>
                {layer.kind === "MotionText" && (
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-[var(--secondary-text)]">
                      Split by
                    </span>
                    <Segmented
                      label="Split text by"
                      value={settings.split}
                      items={[
                        { id: "words", label: "Words" },
                        { id: "chars", label: "Characters" },
                      ]}
                      onChange={(split) => onChange({ split })}
                    />
                  </div>
                )}
                {layer.kind === "MotionImage" && (
                  <div className="grid grid-cols-2 gap-2">
                    <OptionSelect
                      label="Tiles"
                      value={String(settings.pieces)}
                      items={pieceItems}
                      onChange={(count) => onChange({ pieces: Number(count) })}
                    />
                    <OptionSelect
                      label="Trigger"
                      value={settings.interaction}
                      items={[
                        { id: "auto", label: "Playback" },
                        { id: "hover", label: "Hover" },
                        { id: "click", label: "Click" },
                      ]}
                      onChange={(interaction) => onChange({ interaction })}
                    />
                  </div>
                )}
                <Range
                  label="Stagger"
                  max={0.4}
                  value={settings.stagger}
                  onChange={(stagger) => onChange({ stagger })}
                />
                {layer.kind !== "MotionText" && (
                  <OptionSelect
                    label="Order"
                    value={settings.order}
                    items={ORDERS}
                    onChange={(order) => onChange({ order })}
                  />
                )}
              </div>
            )}
          </div>
          <div className="mt-auto grid gap-2 border-t border-[var(--stroke)] p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="min-h-9 flex-1 rounded-md border-[var(--stroke)] text-sm"
                onPress={onRandomize}
              >
                <Dices size={16} className="text-accent" /> Randomize
              </Button>
              {assigned && (
                <IconButton
                  icon={Trash2}
                  label="Remove animation"
                  variant="outline"
                  className="min-h-9 rounded-md border-[var(--stroke)]"
                  onPress={onRemove}
                />
              )}
            </div>
            {!assigned && (
              <Button
                size="sm"
                className="rounded-md"
                onPress={() => onChange({})}
              >
                Apply animation
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12 text-center text-sm text-muted">
          <SquareDashed size={22} />
          <p>Select a layer to edit its motion.</p>
        </div>
      )}
    </Card>
  );
}

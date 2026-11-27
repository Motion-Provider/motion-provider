"use client";

import {
  Button,
  Card,
  Chip,
  CloseButton,
  Label,
  ListBox,
  Select,
} from "@heroui/react";
import {
  Boxes,
  BoxIcon,
  Dices,
  Gauge,
  RotateCcw,
  SlidersHorizontal,
  SquareDashed,
  Trash2,
} from "lucide-react";
import { type AnimationKeys, MotionContainer } from "motion-provider";
import { transitions } from "motion-provider/catalog";
import { useState } from "react";
import {
  IconButton,
  OptionSelect,
  Range,
  SectionTitle,
  Segmented,
} from "../components/controls";
import {
  EASINGS,
  MAX_MODES,
  ORDERS,
  PRESETS,
  TRANSITIONS,
} from "../constants/motion.config";
import type { Easing, Layer, MotionSettings, Scope } from "../types/playground";

const scopes = [
  { id: "individual", label: "Individual" },
  { id: "batch", label: "Batch" },
] as const;

const easingItems = Object.entries(EASINGS).map(([id, { label }]) => ({
  id: id as Easing,
  label,
}));
const pieceItems = [4, 9, 16, 25, 36, 49, 64].map((count) => ({
  id: String(count),
  label: `${Math.sqrt(count)} × ${Math.sqrt(count)}`,
}));

export function Inspector({
  scope,
  onScopeChange,
  layer,
  settings,
  assigned,
  onChange,
  onRemove,
  onReset,
  onRandomize,
}: {
  scope: Scope;
  onScopeChange: (scope: Scope) => void;
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
      className="flex min-w-0 flex-col gap-0 overflow-hidden rounded-3xl border mp-glass p-0"
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

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-(--stroke) px-4 py-2">
        <span className="text-sm text-muted">Replay</span>
        <Segmented
          label="Replay scope"
          items={scopes}
          value={scope}
          onChange={onScopeChange}
        />
      </div>

      {layer && settings ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-(--stroke) px-4 py-3.5">
            <code className="font-mono text-[13px] text-(--secondary-text)">
              &lt;{layer.tag}&gt;
            </code>
            <Chip
              size="sm"
              variant="soft"
              color="accent"
              className="rounded-full bg-(--tint) px-2 font-mono text-[12px] text-accent"
            >
              {layer.kind}
            </Chip>
          </div>

          <div className="grid min-h-0 content-start gap-3 overflow-y-auto px-4 py-3">
            <Select
              selectionMode="multiple"
              value={settings.modes}
              onChange={(keys) => {
                const modes = [
                  ...settings.modes.filter((mode) => keys.includes(mode)),
                  ...PRESETS.filter(
                    ({ id }) =>
                      keys.includes(id) && !settings.modes.includes(id),
                  ).map(({ id }) => id),
                ];
                if (modes.length && modes.length <= MAX_MODES)
                  onChange({ modes });
              }}
              className="grid w-full gap-2"
            >
              <Label>
                Animation modes ({settings.modes.length}/{MAX_MODES})
              </Label>
              <Select.Trigger className="min-w-0">
                <Select.Value className="min-w-0 flex-1 truncate">
                  {() => "Choose modes"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover className="mp-glass mp-glass-raised max-h-64">
                <ListBox>
                  {PRESETS.map(({ id, label }) => (
                    <ListBoxItem
                      key={id}
                      mode={id}
                      label={label}
                      isDisabled={
                        settings.modes.includes(id)
                          ? settings.modes.length === 1
                          : settings.modes.length >= MAX_MODES
                      }
                    />
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <fieldset
              className="flex min-w-0 flex-wrap gap-1.5 border-0 p-0"
              aria-label="Selected animation modes"
            >
              {settings.modes.map((mode) => (
                <Chip
                  key={mode}
                  size="sm"
                  variant="soft"
                  color="accent"
                  className="gap-0.5 rounded-full pl-2.5 pr-0.5"
                >
                  {PRESETS.find(({ id }) => id === mode)?.label ?? mode}
                  <CloseButton
                    aria-label={`Remove ${PRESETS.find(({ id }) => id === mode)?.label ?? mode} mode`}
                    className="size-6 border-none bg-transparent"
                    isDisabled={settings.modes.length === 1}
                    onPress={() =>
                      onChange({
                        modes: settings.modes.filter(
                          (selectedMode) => selectedMode !== mode,
                        ),
                      })
                    }
                  />
                </Chip>
              ))}
            </fieldset>

            <div className="grid gap-2.5 border-t border-(--stroke) pt-3">
              <h3 className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
                <Gauge size={14} /> Timing
              </h3>
              <OptionSelect
                label="Transition"
                value={settings.transition}
                items={TRANSITIONS}
                onChange={(transition) =>
                  onChange(
                    transition === "custom"
                      ? { transition }
                      : {
                          transition,
                          duration: transitions[transition].duration,
                        },
                  )
                }
              />
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
              {settings.transition === "custom" && (
                <OptionSelect
                  label="Easing"
                  value={settings.easing}
                  items={easingItems}
                  onChange={(easing) => onChange({ easing })}
                />
              )}
            </div>

            {layer.kind !== "MotionContainer" && (
              <div className="grid gap-2.5 border-t border-(--stroke) pt-3">
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
                    <span className="text-sm text-(--secondary-text)">
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
                <OptionSelect
                  label="Delay logic"
                  value={settings.order}
                  items={ORDERS}
                  onChange={(order) => onChange({ order })}
                />
              </div>
            )}
          </div>

          <div className="mt-auto grid gap-2 border-t border-(--stroke) p-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="min-h-9 flex-1 rounded-md border-(--stroke) text-sm"
                onPress={onRandomize}
              >
                <Dices size={16} className="text-accent" /> Randomize
              </Button>
              {assigned && (
                <IconButton
                  icon={Trash2}
                  label="Remove animation"
                  variant="outline"
                  className="min-h-9 rounded-md border-(--stroke)"
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

const disabledMotions = ["clip", "transform", "translate3d"];

function ListBoxItem({
  mode,
  label,
  isDisabled,
}: {
  mode: AnimationKeys;
  label: string;
  isDisabled: boolean;
}) {
  const [trigger, setTrigger] = useState(true);

  const showFallback = disabledMotions.includes(mode.toLowerCase());

  return (
    <ListBox.Item
      id={mode}
      textValue={label}
      isDisabled={isDisabled}
      onPressStart={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
      className="flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true">
          {showFallback ? (
            <BoxIcon className="size-3.5" />
          ) : (
            <MotionContainer
              animation={{ mode, transition: "gentle", duration: 0.8 }}
              controller={{ trigger }}
              className="size-3.5 rounded-full bg-accent"
            />
          )}
        </span>
        <span>{label}</span>
      </div>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  );
}

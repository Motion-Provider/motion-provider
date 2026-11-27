"use client";

import {
  Button,
  Card,
  Chip,
  CloseButton,
  cn,
  Disclosure,
  Header,
  Label,
  ListBox,
  NumberField,
  Select,
} from "@heroui/react";
import {
  Axis3d,
  Blend,
  Boxes,
  Crop,
  Dices,
  Filter,
  Gauge,
  Layers,
  Move,
  RotateCcw,
  RotateCw,
  Scaling,
  Scan,
  SlidersHorizontal,
  Sparkles,
  SquareDashed,
  Trash2,
  ZoomIn,
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
  FILLS,
  MAX_LAYER_DELAY,
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

const modeSections = [
  { prefix: "clip", label: "Clip", icon: Crop },
  { prefix: "fade", label: "Fade", icon: Blend },
  { prefix: "filter", label: "Filter", icon: Filter },
  { prefix: "mask", label: "Mask", icon: Layers },
  { prefix: "rotat", label: "Rotate", icon: RotateCw },
  { prefix: "scale", label: "Scale", icon: ZoomIn },
  { prefix: "skew", label: "Skew", icon: Scaling },
  { prefix: "slide", label: "Slide", icon: Move },
  { prefix: "transform", label: "Transform", icon: Scan },
  { prefix: "translate3d", label: "Translate 3D", icon: Axis3d },
];

const groupedModes = [
  ...modeSections.map(({ prefix, label, icon }) => ({
    label,
    icon,
    modes: PRESETS.filter(({ id }) => id.startsWith(prefix)),
  })),
  {
    label: "Other effects",
    icon: Sparkles,
    modes: PRESETS.filter(
      ({ id }) => !modeSections.some(({ prefix }) => id.startsWith(prefix)),
    ),
  },
].filter(({ modes }) => modes.length > 0);

const easingItems = Object.entries(EASINGS).map(([id, { label }]) => ({
  id: id as Easing,
  label,
}));
const easingProperties = [
  { id: "transition", label: "Transition default" },
  { id: "easing", label: "Easing (easing)" },
  { id: "ease", label: "Ease (ease)" },
] as const;
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
  onRandomizeAll,
  canRandomizeAll,
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
  onRandomizeAll: () => void;
  canRandomizeAll: boolean;
}) {
  return (
    <Card
      aria-label="Motion settings"
      className="mp-panel lg:col-start-3 lg:row-[1/span_2]"
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

      <div
        className={cn(
          "flex shrink-0 flex-wrap items-center justify-between gap-2",
          "border-b border-stroke px-4 py-3",
        )}
      >
        <span className="text-sm text-muted">Replay</span>
        <Segmented
          label="Replay scope"
          items={scopes}
          value={scope}
          onChange={onScopeChange}
        />
        {scope === "batch" && (
          <Button
            size="sm"
            variant="outline"
            className="h-9 w-full rounded-md"
            isDisabled={!canRandomizeAll}
            onPress={onRandomizeAll}
          >
            <Layers size={16} className="text-accent-text" /> Randomize all
          </Button>
        )}
      </div>

      {layer && settings ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stroke px-4 py-3.5">
            <code className="font-mono text-[13px] text-secondary-text">
              &lt;{layer.tag}&gt;
            </code>
            <Chip
              size="sm"
              variant="soft"
              color="accent"
              className="rounded-full bg-tint px-2 font-mono text-[12px] text-accent-text"
            >
              {layer.kind}
            </Chip>
          </div>

          <div className="scrollbar grid min-h-0 content-start gap-4 overflow-y-auto p-4">
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
              <Label className="text-sm font-medium text-secondary-text">
                Animation modes ({settings.modes.length}/{MAX_MODES})
              </Label>
              <Select.Trigger>
                <Select.Value className="min-w-0 flex-1 truncate">
                  {() => "Choose modes"}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {groupedModes.map(({ label, icon: Icon, modes }) => (
                    <ListBox.Section key={label}>
                      <Header className="flex items-center gap-2 font-semibold">
                        <Icon size={14} strokeWidth={1.75} aria-hidden />
                        {label}
                      </Header>
                      {modes.map(({ id, label }) => (
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
                    </ListBox.Section>
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

            <div className="grid gap-3 border-t border-stroke pt-4">
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
                      ? { transition, easingProperty: "easing" }
                      : {
                          transition,
                          easingProperty: "transition",
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
                  max={MAX_LAYER_DELAY}
                  step={0.05}
                  value={settings.delay}
                  onChange={(delay) => onChange({ delay })}
                />
              </div>
            </div>

            <Disclosure className="border-t border-stroke pt-3">
              <Disclosure.Heading>
                <Disclosure.Trigger className="flex min-h-9 w-full items-center gap-2 rounded-md px-1 text-left text-sm font-medium">
                  Advanced settings
                  <Disclosure.Indicator />
                </Disclosure.Trigger>
              </Disclosure.Heading>
              <Disclosure.Content>
                <Disclosure.Body className="grid gap-4 px-0 pt-3 pb-1">
                  <OptionSelect
                    label="Easing property"
                    value={settings.easingProperty}
                    items={easingProperties}
                    onChange={(easingProperty) => onChange({ easingProperty })}
                  />
                  {settings.easingProperty !== "transition" && (
                    <OptionSelect
                      label="Easing"
                      value={settings.easing}
                      items={easingItems}
                      onChange={(easing) => onChange({ easing })}
                    />
                  )}
                  <NumberSetting
                    label="End delay (s)"
                    value={settings.endDelay}
                    min={-60}
                    max={60}
                    onChange={(endDelay) => onChange({ endDelay })}
                  />
                  <OptionSelect
                    label="Fill"
                    value={settings.fill}
                    items={FILLS}
                    onChange={(fill) => onChange({ fill })}
                  />
                  {layer.kind !== "MotionContainer" && (
                    <div className="grid gap-3 border-t border-stroke pt-4">
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
                          <span className="text-sm text-secondary-text">
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
                            onChange={(count) =>
                              onChange({ pieces: Number(count) })
                            }
                          />
                          <OptionSelect
                            label="Trigger"
                            value={settings.interaction}
                            items={[
                              { id: "auto", label: "Playback" },
                              { id: "hover", label: "Hover" },
                              { id: "click", label: "Click" },
                            ]}
                            onChange={(interaction) =>
                              onChange({ interaction })
                            }
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
                      <NumberSetting
                        label="Max stagger delay (s)"
                        value={settings.maxDelay}
                        min={0}
                        max={60}
                        onChange={(maxDelay) => onChange({ maxDelay })}
                      />
                      <NumberSetting
                        label="Stagger seed"
                        value={settings.seed}
                        min={-2147483648}
                        max={2147483647}
                        integer
                        onChange={(seed) => onChange({ seed })}
                      />
                    </div>
                  )}
                </Disclosure.Body>
              </Disclosure.Content>
            </Disclosure>
          </div>
        </>
      ) : (
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12",
            "text-center text-sm text-muted",
          )}
        >
          <SquareDashed size={22} />
          <p>Select a layer to edit its motion.</p>
        </div>
      )}
      {(scope === "individual" || settings) && (
        <div className="mt-auto grid shrink-0 gap-2 border-t border-stroke p-4">
          {scope === "individual" && (
            <Button
              size="sm"
              className="h-9 rounded-md"
              isDisabled={!settings}
              onPress={() => onChange({})}
            >
              Apply animation
            </Button>
          )}
          {layer && settings && (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-9 flex-1 rounded-md text-sm"
                onPress={onRandomize}
              >
                <Dices size={16} className="text-accent-text" /> Randomize layer
              </Button>
              {assigned && (
                <IconButton
                  icon={Trash2}
                  label="Remove animation"
                  variant="outline"
                  className="h-9 rounded-md"
                  onPress={onRemove}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function NumberSetting({
  label,
  value,
  min,
  max,
  integer = false,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  integer?: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <NumberField
      value={value}
      minValue={min}
      maxValue={max}
      step={integer ? 1 : 0.01}
      formatOptions={{
        maximumFractionDigits: integer ? 0 : 2,
        useGrouping: false,
      }}
      onChange={(next) => {
        if (typeof next === "number" && Number.isFinite(next)) onChange(next);
      }}
      className="grid gap-2"
    >
      <Label className="text-sm font-medium text-secondary-text">{label}</Label>
      <NumberField.Group>
        <NumberField.Input className="w-full min-w-0" />
      </NumberField.Group>
    </NumberField>
  );
}

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

  const handleMouseEnter = () => setTrigger(true);
  const handleMouseLeave = () => setTrigger(false);

  return (
    <ListBox.Item
      id={mode}
      key={mode}
      textValue={label}
      isDisabled={isDisabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-between gap-2 overflow-hidden"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true">
          <MotionContainer
            animation={{
              mode: trigger ? mode : "default",
              transition: "gentle",
              duration: 1,
            }}
            controller={{ trigger }}
            className="size-3.5 text-accent-text"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="block size-full"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 2.5 23 21.5H1Z M12 8.5 17.8 18.5H6.2Z" />
            </svg>
          </MotionContainer>
        </span>
        <span>{label}</span>
      </div>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  );
}

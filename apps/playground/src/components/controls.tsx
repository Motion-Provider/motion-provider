"use client";

import {
  Button,
  Label,
  ListBox,
  Select,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function IconButton({
  label,
  icon: Icon,
  className = "",
  variant = "ghost",
  ...props
}: {
  label: string;
  icon: LucideIcon;
} & Omit<ComponentProps<typeof Button>, "children" | "aria-label">) {
  return (
    <Tooltip delay={350}>
      <Button
        isIconOnly
        size="sm"
        variant={variant}
        aria-label={label}
        className={`${variant === "primary" ? "" : "text-muted hover:text-foreground"} ${className}`}
        {...props}
      >
        <Icon size={16} strokeWidth={1.65} />
      </Button>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  );
}

export function Segmented<Value extends string>({
  label,
  value,
  items,
  onChange,
}: {
  label: string;
  value: Value;
  items: readonly {
    id: Value;
    label: string;
    icon?: LucideIcon;
    iconOnly?: boolean;
  }[];
  onChange: (value: Value) => void;
}) {
  return (
    <ToggleButtonGroup
      aria-label={label}
      size="sm"
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={(keys) => {
        const key = keys.values().next().value;
        const item = items.find(({ id }) => id === key);
        if (item) onChange(item.id);
      }}
      className="mp-segments inline-flex max-w-full shrink-0 items-center gap-0.5 rounded-lg border border-[var(--stroke)] bg-[var(--inset)] p-[3px]"
    >
      {items.map(({ id, label: itemLabel, icon: Icon, iconOnly }) => (
        <ToggleButton
          key={id}
          id={id}
          aria-label={itemLabel}
          isIconOnly={iconOnly}
          className="min-h-7 rounded-md border-0 px-2.5 text-[13px] font-medium text-muted"
        >
          {Icon && <Icon size={15} strokeWidth={1.7} />}
          {!iconOnly && itemLabel}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function SectionTitle({
  icon: Icon,
  children,
  action,
}: {
  icon: LucideIcon;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-2 border-b border-[var(--stroke)] px-4">
      <h2 className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
        <Icon size={17} strokeWidth={1.7} className="shrink-0 text-muted" />
        {children}
      </h2>
      {action}
    </div>
  );
}

export function OptionSelect<Value extends string>({
  label,
  value,
  items,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: Value;
  items: readonly { id: Value; label: string }[];
  onChange: (value: Value) => void;
  icon?: LucideIcon;
}) {
  return (
    <Select
      value={value}
      onChange={(key) => {
        const item = items.find(({ id }) => id === key);
        if (item) onChange(item.id);
      }}
      className="grid w-full gap-2"
    >
      <Label className="text-sm font-medium text-[var(--secondary-text)]">
        {label}
      </Label>
      <Select.Trigger className="min-h-9 gap-2 rounded-md border border-[var(--stroke)] bg-[var(--inset)] px-2.5 text-sm shadow-none">
        {Icon && (
          <Icon size={15} aria-hidden className="shrink-0 text-accent" />
        )}
        <Select.Value className="min-w-0 flex-1 truncate" />
        <Select.Indicator className="size-3.5 shrink-0 text-muted" />
      </Select.Trigger>
      <Select.Popover className="max-h-64 rounded-lg border border-[var(--stroke)]">
        <ListBox>
          {items.map((item) => (
            <ListBox.Item key={item.id} id={item.id} textValue={item.label}>
              {item.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

export function Range({
  label,
  value,
  max,
  min = 0,
  step = 0.01,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <Slider
      value={value}
      minValue={min}
      maxValue={max}
      step={step}
      onChange={(next) => {
        if (typeof next === "number") onChange(next);
      }}
      className="mp-slider gap-x-1 gap-y-2"
    >
      <Label className="text-[13px] text-[var(--secondary-text)]">
        {label}
      </Label>
      <Slider.Output className="w-max rounded border border-[var(--stroke)] bg-[var(--inset)] px-1 py-0.5 font-mono text-[12px] whitespace-nowrap text-foreground">
        {() => `${value.toFixed(2)} s`}
      </Slider.Output>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}

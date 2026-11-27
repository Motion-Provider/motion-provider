"use client";

import {
  Button,
  cn,
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
        className={cn(
          variant !== "primary" && "text-muted hover:text-foreground",
          className,
        )}
        {...props}
      >
        <Icon size={16} strokeWidth={1.65} aria-hidden />
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
      className={cn(
        "mp-segments inline-flex max-w-full shrink-0 items-center gap-0.5",
        "rounded-full border border-stroke bg-inset",
        "p-0.75",
      )}
    >
      {items.map(({ id, label: itemLabel, icon: Icon, iconOnly }) => (
        <ToggleButton
          key={id}
          id={id}
          aria-label={itemLabel}
          variant="ghost"
          isIconOnly={iconOnly}
          className="min-h-7 rounded-full border-0 px-2.5 text-[13px] font-medium"
        >
          {Icon && <Icon size={15} strokeWidth={1.7} aria-hidden />}
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
    <div className="flex min-h-14 items-center justify-between gap-2 border-b border-stroke px-4">
      <h2 className="flex min-w-0 items-center gap-2.5 text-sm font-semibold">
        <Icon
          size={17}
          strokeWidth={1.7}
          className="shrink-0 text-muted"
          aria-hidden
        />
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
      <Label className="text-sm font-medium text-secondary-text">{label}</Label>

      <Select.Trigger>
        {Icon && (
          <Icon size={15} aria-hidden className="shrink-0 text-accent-text" />
        )}
        <Select.Value className="min-w-0 flex-1 truncate" />
        <Select.Indicator />
      </Select.Trigger>

      <Select.Popover>
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
      <Label className="text-[13px] text-secondary-text">{label}</Label>
      <Slider.Output
        className={cn(
          "w-max rounded border border-stroke bg-inset",
          "px-1 py-0.5 font-mono text-[12px] whitespace-nowrap text-foreground",
        )}
      >
        {() => `${value.toFixed(2)} s`}
      </Slider.Output>

      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}

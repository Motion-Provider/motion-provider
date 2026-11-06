import { Button } from "@heroui/react";
import {
  ArrowUpRightIcon,
  CheckCheckIcon,
  type LucideIcon,
} from "lucide-react";
import type { FC } from "react";
import { cn } from "@/lib/utils";
import type { DxComparisonID } from "@/types/dx-comparison.types";

type DxComparisonButtonProps = {
  id: DxComparisonID;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onSelect: (id: DxComparisonID) => void;
  className?: string;
};

export function DxComparisonButton({
  id,
  icon: Icon,
  label,
  isActive,
  onSelect,
  className,
}: DxComparisonButtonProps) {
  return (
    <Button
      variant="secondary"
      aria-pressed={isActive}
      onPress={() => onSelect(id)}
      className={cn(
        "group relative isolate flex h-11 w-full min-w-0 justify-between gap-2 overflow-hidden",
        "border border-border bg-surface/50 px-3 text-xs text-surface-secondary-foreground backdrop-blur-xl",
        "aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-foreground",
        "sm:h-12 sm:gap-3 sm:px-4 sm:text-sm",
        "desktop:h-18",
        className,
      )}
    >
      <div className="absolute -z-10 right-0 top-0 size-24 bg-linear-to-r from-accent to-accent opacity-0 blur-2xl transition-opacity duration-300 ease-smooth group-hover:opacity-100" />

      <div className="flex min-w-0 items-center gap-2">
        <Icon aria-hidden="true" className="size-4 shrink-0 sm:size-5" />
        <span className="truncate tracking-tighter">{label}</span>
      </div>

      <ButtonIcon isActive={isActive} />
    </Button>
  );
}

const ButtonIcon: FC<{ isActive: boolean }> = ({ isActive }) => (
  <span className="shrink-0 transition-colors duration-300 ease-smooth *:size-4 sm:*:size-5">
    {!isActive ? <ArrowUpRightIcon /> : <CheckCheckIcon />}
  </span>
);

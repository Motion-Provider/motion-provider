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
        "laptop:h-12 desktop:h-18 w-full justify-between group",
        "gap-3 border border-border bg-surface/50 backdrop-blur-xl overflow-hidden",
        "px-6 text-surface-secondary-foreground aria-pressed:border-transparent",
        "aria-pressed:bg-accent aria-pressed:text-accent-foreground relative isolate",
        className,
      )}
    >
      <div className="absolute right-0 top-0 size-24 bg-linear-to-r from-accent to-accent blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-smooth" />
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        <span className="tracking-tighter">{label}</span>
      </div>
      <ButtonIcon isActive={isActive} />
    </Button>
  );
}

const ButtonIcon: FC<{ isActive: boolean }> = ({ isActive }) => (
  <span className="transition-colors duration-300 ease-smooth *:size-5">
    {!isActive ? <ArrowUpRightIcon /> : <CheckCheckIcon />}
  </span>
);

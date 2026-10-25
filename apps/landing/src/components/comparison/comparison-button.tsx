import { Button } from "@heroui/react";
import type { LucideIcon } from "lucide-react";

type DxComparisonButtonProps = {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function DxComparisonButton({
  icon: Icon,
  label,
  isActive,
  onPress,
}: DxComparisonButtonProps) {
  return (
    <Button
      variant="secondary"
      aria-pressed={isActive}
      onPress={onPress}
      className="laptop:h-12 desktop:h-18 w-full justify-start gap-3 rounded-3xl border border-border bg-surface-secondary px-6 text-surface-secondary-foreground aria-pressed:border-transparent aria-pressed:bg-accent aria-pressed:text-accent-foreground"
    >
      <Icon aria-hidden="true" className="size-5 shrink-0" />
      {label}
    </Button>
  );
}

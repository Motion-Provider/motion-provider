import { Button } from "@heroui/react";
import {
  ArrowUpRightIcon,
  CheckCheckIcon,
  type LucideIcon,
} from "lucide-react";
import { MotionContainer } from "motion-provider";
import { type FC, useEffect, useState } from "react";
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
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleTrigger = (ev: boolean) => {
    if (isActive) return;
    setTrigger(ev);
  };

  useEffect(() => {
    if (!isActive) return;

    setTrigger(false);
  }, [isActive]);

  return (
    <Button
      variant="secondary"
      aria-pressed={isActive}
      onPress={() => onSelect(id)}
      onMouseEnter={() => handleTrigger(true)}
      onMouseLeave={() => handleTrigger(false)}
      className={cn(
        "laptop:h-12 desktop:h-18 w-full justify-between group",
        "gap-3 border border-border bg-surface/50 backdrop-blur-xl overflow-hidden",
        "px-6 text-surface-secondary-foreground aria-pressed:border-transparent",
        "aria-pressed:bg-accent aria-pressed:text-accent-foreground relative isolate",
        className,
      )}
    >
      <Background trigger={trigger} />
      <div className="flex items-center gap-2">
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        <span className="tracking-tighter">{label}</span>
      </div>
      <ButtonIcon isActive={isActive} trigger={trigger} />
    </Button>
  );
}

const Background: FC<{ trigger: boolean }> = ({ trigger }) => (
  <MotionContainer
    animation={{
      mode: ["fadeUp"],
      transition: "elasticSoft",
      duration: 0.66,
    }}
    controller={{
      trigger,
    }}
    className="absolute right-0 top-0 size-24 bg-linear-to-r from-accent to-accent blur-2xl -z-10"
  />
);

const ButtonIcon: FC<{ isActive: boolean; trigger?: boolean }> = ({
  isActive,
  trigger,
}) => (
  <span
    className={cn(
      "transition-colors duration-300 ease-smooth *:size-5",
      trigger ? "text-surface" : "text-white",
    )}
  >
    {!isActive ? <ArrowUpRightIcon /> : <CheckCheckIcon />}
  </span>
);

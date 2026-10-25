import { Button } from "@heroui/react";
import { ArrowUpRightIcon, type LucideIcon } from "lucide-react";
import { MotionContainer } from "motion-provider";
import { useState } from "react";
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

  const handleTrigger = (ev: boolean) =>
    isActive ? setTrigger(false) : setTrigger(ev);

  return (
    <Button
      variant="secondary"
      aria-pressed={isActive}
      onPress={() => onSelect(id)}
      onMouseEnter={() => handleTrigger(true)}
      onMouseLeave={() => handleTrigger(false)}
      className={cn(
        "laptop:h-12 desktop:h-18 w-full justify-between group",
        "gap-3 rounded-3xl border border-border bg-surface overflow-hidden",
        "px-6 text-surface-secondary-foreground aria-pressed:border-transparent",
        "aria-pressed:bg-accent aria-pressed:text-accent-foreground relative isolate",
        className,
      )}
    >
      <MotionContainer
        animation={{
          mode: ["typingEffect"],
          transition: "elasticSoft",
          duration: 0.66,
        }}
        controller={{
          trigger,
        }}
        className="absolute size-full bg-linear-to-r from-accent to-accent/50 blur-2xl -z-10"
      />
      <div className="flex items-center gap-2 group-hover:text-accent-foreground z-50 transition-colors duration-300 ease-smooth">
        <Icon aria-hidden="true" className="size-5 shrink-0" />
        <span className="tracking-tighter">{label}</span>
      </div>
      <ArrowUpRightIcon className="desktop:size-5 laptop:size-5 group-hover:rotate-45 transition-all duration-300 ease-smooth" />
    </Button>
  );
}

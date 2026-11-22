import { Button, type ButtonProps, cn } from "@heroui/react";
import { MotionContainer, useController } from "motion-provider";
import type { ModuleProps } from "../../types";

interface Props extends ButtonProps, ModuleProps {
  label?: string;
}

function Icon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("lucide lucide-arrow-up-right preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <path key="path-1" d="M7 7h10v10" />
      <path key="path-2" d="M7 17 17 7" />
    </svg>
  );
}

function Flame({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("lucide lucide-flame preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
    </svg>
  );
}

export default function CtaButton5({
  label = "Get Started",
  variant = "danger",
  size = "lg",
}: Props) {
  const controller = useController();

  return (
    <Button
      variant={variant}
      size={size}
      className="relative overflow-hidden text-sm"
      onMouseEnter={() => controller.play()}
      onMouseLeave={() => controller.onReverse()}
    >
      <MotionContainer
        animation={{
          mode: ["slideUp", "filterBlurIn", "fadeIn"],
          duration: 0.44,
          direction: "reverse",
          transition: "gentle",
        }}
        controller={controller}
        className="flex gap-2 items-center"
      >
        <span>{label}</span>
        <Icon className="size-5 shrink-0" />
      </MotionContainer>
      <MotionContainer
        animation={{
          mode: ["slideDown", "filterBlurIn", "fadeIn"],
          duration: 0.44,
          transition: "gentle",
        }}
        className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 flex gap-2 items-center"
        controller={controller}
      >
        <span>Take Action</span>
        <Flame className="size-5 shrink-0" />
      </MotionContainer>
    </Button>
  );
}

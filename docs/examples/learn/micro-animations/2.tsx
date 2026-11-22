import { Button, type ButtonProps, cn } from "@heroui/react";
import {
  type AnimationController,
  MotionChain,
  MotionText,
} from "motion-provider";
import type { ModuleProps } from "../../types";

interface Props extends ButtonProps, ModuleProps {
  label?: string;
}

function Icon({
  className,
  controller,
}: {
  className?: string;
  controller?: AnimationController;
}) {
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
      <MotionChain
        animation={{
          mode: "fadeIn",
          transition: "gentle",
          duration: 0.8,
        }}
        elementType="g"
        config={{
          duration: 0.24,
        }}
        controller={controller}
      >
        <path key="path-1" d="M7 7h10v10" />
        <path key="path-2" d="M7 17 17 7" />
      </MotionChain>
    </svg>
  );
}

export default function CtaButton2({
  label = "Get Started",
  variant = "danger-soft",
  size = "md",
  controller,
  ...props
}: Props) {
  return (
    <Button variant={variant} size={size} {...props}>
      <MotionText
        animation={{
          mode: ["slideUp", "filterBlurIn", "fadeIn"],
          duration: 0.44,
          transition: "bounceSoft",
        }}
        config={{
          mode: "chars",
          delayLogic: "sinusoidal",
          duration: 0.09,
        }}
        controller={controller}
      >
        {label}
      </MotionText>
      <Icon controller={controller} />
    </Button>
  );
}

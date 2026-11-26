import { Button, type ButtonProps, cn } from "@heroui/react";
import {
  type AnimationController,
  MotionChain,
  MotionContainer,
  MotionText,
  useController,
} from "motion-provider";
import { useRef } from "react";
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-arrow-up-right preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <MotionChain
        controller={controller}
        elementType="g"
        animation={{
          mode: ["fadeIn", "slideDown"],
          duration: 0.44,
          direction: "reverse",
          transition: "bounceSoft",
          delay: 0.25,
        }}
        config={{
          duration: 0.24,
        }}
      >
        <path key="path-1" d="M7 7h10v10" />
        <path key="path-2" d="M7 17 17 7" />
      </MotionChain>
    </svg>
  );
}

function Flame({
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
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-flame preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <MotionContainer
        elementType="path"
        animation={{
          mode: ["fadeIn", "slideUp"],
          duration: 0.44,
          transition: "bounceSoft",
          delay: 0.75,
        }}
        controller={controller}
        d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
      />
    </svg>
  );
}

export default function CtaButton3({
  label = "Get Started",
  variant = "danger-soft",
  size = "lg",
}: Props) {
  const controller = useController();
  const previewing = useRef(false);

  function setPreview(next: boolean) {
    previewing.current = next;
    if (next) controller.play();
    else controller.onReverse();
  }

  return (
    <Button
      variant="danger"
      size={size}
      aria-label={label}
      className="relative overflow-hidden text-sm"
      onHoverChange={setPreview}
      onPress={({ pointerType }) => {
        if (pointerType !== "mouse") setPreview(!previewing.current);
      }}
    >
      <div className="relative">
        <MotionContainer
          animation={{
            mode: ["slideDown", "filterBlurIn", "fadeIn"],
            duration: 0.44,
            transition: "bounceSoft",
          }}
          controller={controller}
          className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
        >
          Take Action
        </MotionContainer>
        <MotionText
          animation={{
            mode: ["slideUp", "filterBlurIn", "fadeIn"],
            duration: 0.44,
            direction: "reverse",
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
      </div>
      <div className="relative">
        <Icon controller={controller} className="size-5 shrink-0" />
        <Flame
          className="absolute top-0 size-5 shrink-0"
          controller={controller}
        />
      </div>
    </Button>
  );
}

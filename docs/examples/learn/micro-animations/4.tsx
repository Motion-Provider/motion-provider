import { Button, type ButtonProps, cn } from "@heroui/react";
import {
  createMotionConfig,
  createMotionRegistry,
  MotionChain,
  type MotionChainProps,
  MotionContainer,
  type MotionContainerProps,
  MotionText,
  useController,
} from "motion-provider";
import type { ModuleProps } from "../../types";

interface Props extends ButtonProps, ModuleProps {
  label?: string;
}

const data = createMotionConfig({
  icon: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeIn", "slideDown"],
        duration: 0.44,
        direction: "reverse",
        transition: "bounceSoft",
        delay: 0.25,
      },
      config: {
        duration: 0.24,
      },
      elementType: "g",
    },
  },
  flame: {
    type: "MotionContainer",
    props: {
      elementType: "path",
      animation: {
        mode: ["fadeIn", "slideUp"],
        duration: 0.44,
        transition: "bounceSoft",
        delay: 0.75,
      },
    },
  },
  textTo: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["slideDown", "filterBlurIn", "fadeIn"],
        duration: 0.44,
        transition: "bounceSoft",
      },
    },
  },
  textFrom: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["slideUp", "filterBlurIn", "fadeIn"],
        duration: 0.44,
        direction: "reverse",
        transition: "bounceSoft",
      },
      config: {
        mode: "chars",
        delayLogic: "sinusoidal",
        duration: 0.09,
      },
    },
  },
});

function Icon({
  className,
  animation,
}: {
  className?: string;
  animation: Omit<MotionChainProps, "children">;
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
      <MotionChain {...animation}>
        <path key="path-1" d="M7 7h10v10" />
        <path key="path-2" d="M7 17 17 7" />
      </MotionChain>
    </svg>
  );
}

function Flame({
  className,
  animation,
}: {
  className?: string;
  animation: Omit<MotionContainerProps, "children">;
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
      className={cn("lucide lucide-flame preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <MotionContainer
        {...animation}
        d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
      />
    </svg>
  );
}

const { getAnimation } = createMotionRegistry(data);

export default function CtaButton4({
  label = "Get Started",
  variant = "danger-soft",
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
      <div className="relative">
        <MotionContainer
          {...getAnimation("textTo")}
          controller={controller}
          className="absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
        >
          Take Action
        </MotionContainer>
        <MotionText {...getAnimation("textFrom")} controller={controller}>
          {label}
        </MotionText>
      </div>
      <div className="relative">
        <Icon
          animation={{
            ...getAnimation("icon"),
            controller,
          }}
          className="size-5 shrink-0"
        />
        <Flame
          className="absolute top-0 size-5 shrink-0"
          animation={{
            ...getAnimation("flame"),
            controller,
          }}
        />
      </div>
    </Button>
  );
}

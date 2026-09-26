import type * as React from "react";
import { cn } from "@/lib/utils";
import { GridLines, type GridLinesProps } from "./grid-lines";
import { Scales, type ScalesOrientation } from "./scales";

type ContainerSide = "top" | "right" | "bottom" | "left";

type ContainerWidth =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "screen";

type ContainerRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

const widthClasses: Record<ContainerWidth, string> = {
  none: "max-w-none",
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",

  // Deliberately larger than Tailwind's default max-w-7xl.
  // This is very close to the ~1536px visual frame in the screenshot.
  screen: "max-w-[1536px]",
};

const radiusClasses: Record<ContainerRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

const sideBorderClasses: Record<ContainerSide, string> = {
  top: "border-t",
  right: "border-r",
  bottom: "border-b",
  left: "border-l",
};

const railPositionClasses: Record<ContainerSide, string> = {
  left: "top-0 bottom-0",
  right: "top-0 bottom-0",
  top: "left-0 right-0",
  bottom: "left-0 right-0",
};

const railMask: Record<ContainerSide, string> = {
  left: "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
  right:
    "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
  top: "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
  bottom:
    "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
};

export interface ContainerScalesOptions {
  sides?: ContainerSide[];
  size?: number;
  thickness?: number;
  offset?: number;
  lineWidth?: number;
  orientation?: ScalesOrientation;
  color?: string;
  opacity?: number;
  className?: string;
}

export interface ContainerFrameOptions {
  sides?: ContainerSide[];
  className?: string;
}

export interface ContainerWrapperProps<T extends React.ElementType = "div"> {
  as?: T;

  children?: React.ReactNode;

  /**
   * Horizontal max-width of the visual frame.
   */
  width?: ContainerWidth;

  /**
   * Controls the outer frame borders.
   */
  frame?: false | ContainerFrameOptions;

  /**
   * Controls repeating grid lines inside the frame.
   */
  grid?: false | GridLinesProps;

  /**
   * Controls the striped/scales rails around the frame.
   */
  scales?: false | ContainerScalesOptions;

  radius?: ContainerRadius;

  /**
   * Adds a subtle inner surface.
   */
  surface?: "none" | "subtle" | "glass";

  /**
   * Applies overflow clipping to the actual content frame.
   */
  clip?: boolean;

  /**
   * Additional classes applied to the outer container.
   */
  className?: string;

  /**
   * Additional classes applied to the content layer.
   */
  innerClassName?: string;
}

type Props<T extends React.ElementType> = ContainerWrapperProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ContainerWrapperProps<T> | "children"
  >;

const surfaceClasses = {
  none: "",
  subtle: "bg-background/60",
  glass: "bg-background/55 backdrop-blur-xl backdrop-saturate-150",
};

export function ContainerWrapper<T extends React.ElementType = "div">({
  as,
  children,
  width = "screen",
  frame = {
    sides: ["top", "right", "bottom", "left"],
  },
  grid = false,
  scales = {
    sides: ["left", "right"],
  },
  radius = "none",
  surface = "none",
  clip = true,
  className,
  innerClassName,
  ...props
}: Props<T>) {
  const Component = (as ?? "div") as React.ElementType;

  const frameSides =
    frame === false ? [] : (frame.sides ?? ["top", "right", "bottom", "left"]);

  const scaleSides =
    scales === false ? [] : (scales.sides ?? ["left", "right"]);

  return (
    <Component
      {...props}
      data-slot="container-wrapper"
      className={cn(
        "relative isolate mx-auto w-full",
        widthClasses[width],
        radiusClasses[radius],
        surfaceClasses[surface],
        clip && "overflow-visible",
        className,
      )}
    >
      {/* Decorative rails */}
      {scales !== false &&
        scaleSides.map((side) => {
          const thickness = scales.thickness ?? 32;
          const offset = scales.offset ?? 0;

          const isVertical = side === "left" || side === "right";

          const positionStyle: React.CSSProperties = isVertical
            ? {
                width: `${thickness}px`,
                top: `-${offset}px`,
                bottom: `-${offset}px`,
                ...(side === "left"
                  ? {
                      left: `-${thickness + offset}px`,
                    }
                  : {
                      right: `-${thickness + offset}px`,
                    }),
              }
            : {
                height: `${thickness}px`,
                left: `-${offset}px`,
                right: `-${offset}px`,
                ...(side === "top"
                  ? {
                      top: `-${thickness + offset}px`,
                    }
                  : {
                      bottom: `-${thickness + offset}px`,
                    }),
              };

          return (
            <div
              key={side}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute overflow-hidden",
                railPositionClasses[side],
                railMask[side],
                "text-foreground",
                scales.className,
              )}
              style={positionStyle}
            >
              <Scales
                size={scales.size ?? 8}
                lineWidth={scales.lineWidth ?? 1}
                orientation={scales.orientation ?? "diagonal"}
                color={scales.color}
                opacity={scales.opacity ?? 1}
              />
            </div>
          );
        })}
      <div
        className={cn(
          "relative z-10 min-w-0",
          radiusClasses[radius],
          surfaceClasses[surface],
          clip && "overflow-hidden",
          frameSides.map((side) => sideBorderClasses[side]),
          "border-border/45",
          innerClassName,
        )}
      >
        {grid !== false && <GridLines {...grid} />}
        <div className="relative z-10">{children}</div>
      </div>
    </Component>
  );
}

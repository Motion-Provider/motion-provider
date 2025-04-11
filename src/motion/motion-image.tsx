import {
  MOTION_IMAGE_ANIMATION_DEFAULT,
  MOTION_IMAGE_CONFIG_DEFAULT,
} from "./lib/defaults.lib";
import { cn } from "../lib/utils";
import logError from "./utils/getErrorLogs";
import { MotionImageProps } from "./types";
import { calculateDelay } from "./utils/calculateDelay";
import MotionContainer from "./motion-container";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

const MotionImage: FC<MotionImageProps> = ({
  animation = { ...MOTION_IMAGE_ANIMATION_DEFAULT },
  config = { ...MOTION_IMAGE_CONFIG_DEFAULT },
  controller,
  className,
  fallback = <div className="size-full absolute animate-pulse bg-stone-800" />,
  wrapperClassName,
}) => {
  const {
    img: imageUrl,
    pieces,
    fn: motionFn,
    duration,
    customLogic,
    delayLogic = "sinusoidal",
    delayByElement,
  } = config;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [triggers, setTriggers] = useState<Record<number, boolean>>({});
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  if (!imageUrl) {
    logError({
      error: "No image url provided, returning null.",
      mod: "error",
      src: "MotionImage",
    });

    return null;
  }
  if (pieces <= 0 || Math.sqrt(pieces) % 1 !== 0) {
    logError({
      error:
        "Non-squared number of pieces or less/equal than/to 0 provided, returning null.",
      mod: "error",
      src: "MotionImage",
    });
    return null;
  }
  if (typeof animation.mode === "undefined" || animation.mode.length === 0) {
    logError({
      error: "No animation mode provided, returning default animation.",
      mod: "warn",
      src: "MotionImage",
    });
  }

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsImageLoaded(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  const columns = useMemo(() => Math.ceil(Math.sqrt(pieces)), [pieces]);
  const rows = useMemo(() => Math.ceil(pieces / columns), [pieces, columns]);

  const handleGridInteraction = useCallback(
    (e: React.MouseEvent) => {
      if (!motionFn || !gridRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = gridRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor((x / rect.width) * columns);
        const row = Math.floor((y / rect.height) * rows);
        const index = row * columns + col;

        if (index >= 0 && index < pieces) {
          const currCol = index % columns;
          const currRow = Math.floor(index / columns);
          const affectedIndexes: number[] = [];

          for (let r = currRow - 1; r <= currRow + 1; r++) {
            for (let c = currCol - 1; c <= currCol + 1; c++) {
              if (r >= 0 && r < rows && c >= 0 && c < columns) {
                const i = r * columns + c;
                if (i < pieces) affectedIndexes.push(i);
              }
            }
          }

          setTriggers((prev) => ({
            ...prev,
            ...Object.fromEntries(affectedIndexes.map((idx) => [idx, true])),
          }));
        }
      });
    },
    [columns, rows, pieces, motionFn]
  );

  const gridPieces = useMemo(
    () =>
      Array.from({ length: pieces }).map((_, index) => {
        const col = index % columns;
        const row = Math.floor(index / columns);
        return (
          <div
            key={index}
            className="h-full w-full bg-cover bg-no-repeat border-none"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: `${columns * 100}% ${rows * 100}%`,
              backgroundPosition: `calc(${col} * 100% / ${
                columns - 1
              }) calc(${row} * 100% / ${rows - 1})`,
            }}
          />
        );
      }),
    [pieces, columns, rows, imageUrl]
  );

  const childrenWithControllers = useMemo(
    () =>
      gridPieces.map((piece, index) => {
        const pieceDelay =
          delayByElement ??
          calculateDelay({
            delayLogic: delayLogic,
            index,
            baseDuration: duration,
            customLogic: customLogic,
          });

        return (
          <MotionContainer
            key={index}
            animation={{
              ...animation,
              delay: pieceDelay,
              duration,
            }}
            controller={{
              ...controller,
              trigger: motionFn
                ? !!triggers[index]
                : controller?.trigger ?? true,
            }}
            elementType="div"
            className={cn(className)}
          >
            {piece}
          </MotionContainer>
        );
      }),
    [gridPieces, animation, config, controller, duration, motionFn, triggers]
  );

  return (
    <div
      className={cn(
        "relative w-full",
        motionFn && "cursor-pointer",
        wrapperClassName
      )}
    >
      <div
        ref={gridRef}
        className="grid h-full w-full gap-0"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        onClick={motionFn === "click" ? handleGridInteraction : undefined}
        onMouseMove={motionFn === "hover" ? handleGridInteraction : undefined}
      >
        {!isImageLoaded ? <>{fallback}</> : childrenWithControllers}
      </div>
    </div>
  );
};

export default MotionImage;

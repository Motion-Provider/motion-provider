import { cn } from "./lib/utils";
import { MotionImageProps } from "./types";
import defaults from "./constants/defaults";
import logError from "./utils/getErrorLogs";
import MotionContainer from "./motion-container";
import { calculateDelay } from "./utils/calculateDelay";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * @description
 * MotionImage slices an image into a grid of `pieces` and wraps each
 * slice with a `MotionContainer`, enabling per-piece animation and
 * interactive motion (hover / click).
 *
 * Key behaviours:
 * - Preloads `config.img` and returns `null` with an error logged if missing.
 * - Validates `pieces` must be a perfect square (e.g. 16, 25, 36...). Logs an error and returns `null` if invalid.
 * - Computes `columns` / `rows` from `pieces` and maps each grid cell to a MotionContainer.
 * - Supports interaction modes via `config.fn`:
 *   - `"hover"`: mouse movement triggers a 3x3 neighborhood around the pointer.
 *   - `"click"`: clicking triggers the neighborhood for the clicked cell.
 * - Per-piece delay is calculated via your `calculateDelay` util using `config.delayLogic`, `config.customLogic`, and base `duration`.
 * - If `animation.delay` is provided it will be merged with calculated per-piece delay.
 *
 * @example
 *  <MotionImage
 *    animation={{
 *      mode: ["translate3dZigZag"],
 *      transition: "smooth",
 *      duration: 1,
 *    }}
 *    config={{
 *      duration: 0.88,
 *      // example image from unsplash
 *      img: PATH_TO_IMAGE,
 *      delayLogic: "sinusoidal",
 *      pieces: 64,
 *    }}
 *    wrapperClassName="size-[500px] rounded-lg overflow-hidden"
 *    fallback={<div className="size-96 animate-pulse bg-stone-800 rounded-lg" />}
 *  />
 *
 * @param {MotionImageProps} props The component props.
 * @param {MotionAnimationProps} props.animation - Base animation applied to each grid piece (supports `mode`, `transition`, optional `delay`, optional `duration`).
 * @param {MotionImageConfigProps} [props.config] - Image-specific config (required fields: `img`, `pieces`; optional: `fn`, `duration`, `customLogic`, `delayLogic`).
 * @param {MotionControllerProps} [props.controller] - Centralized controller (see `MotionControllerProps` for `trigger`, `reverse`, `isAnimationStopped`, `configView`).
 * @param {string} [props.className] - Classname forwarded to each MotionContainer (applied to each piece).
 * @param {React.ReactNode} [props.fallback] - Node shown while the image preload is in progress (defaults from defaults.MotionImage.fallback).
 * @param {string} [props.wrapperClassName] - Classname applied to the outer wrapper that holds the grid.
 * @param {...React.HTMLAttributes<HTMLElement>} [props] - Additional HTML attributes forwarded to each MotionContainer element.
 *
 * @returns {React.ReactElement | null} A wrapper element containing the motion-sliced image grid, or `null` on invalid input (missing `img`, invalid `pieces`, etc.).
 */
const MotionImage: FC<MotionImageProps> = ({
  animation,
  config = defaults.MotionImage.config,
  controller,
  className,
  fallback = defaults.MotionImage.fallback,
  wrapperClassName,
  ...props
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [triggers, setTriggers] = useState<Record<number, boolean>>({});
  const gridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number>(0);

  const {
    img: imageUrl,
    pieces,
    fn: motionFn,
    duration,
    customLogic,
    delayLogic = "sinusoidal",
  } = config;

  useEffect(() => {
    if (!imageUrl) {
      logError({
        msg: "No image url provided, returning null.",
        mod: "error",
        src: "MotionImage",
      });

      return;
    }
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsImageLoaded(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);

  const columns = useMemo(() => Math.sqrt(pieces), [pieces]);
  const rows = useMemo(() => pieces / columns, [pieces, columns]);

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

  const childrenWithControllers = useMemo(() => {
    const checkRegisteredDelay =
      typeof animation.delay !== "undefined" &&
      animation.delay &&
      typeof animation.delay === "number";

    return gridPieces.map((piece, index) => {
      const pieceDelay = calculateDelay({
        delayLogic: delayLogic,
        index,
        baseDuration: duration,
        customLogic: customLogic,
      });

      const delayTotal = checkRegisteredDelay
        ? Number(animation.delay! + pieceDelay)
        : pieceDelay;

      return (
        <MotionContainer
          key={index}
          animation={{
            ...animation,
            delay: delayTotal,
            duration,
          }}
          controller={{
            ...controller,
            trigger: motionFn ? !!triggers[index] : controller?.trigger ?? true,
          }}
          elementType="div"
          className={cn(className)}
          {...props}
        >
          {piece}
        </MotionContainer>
      );
    });
  }, [
    gridPieces,
    animation,
    controller,
    duration,
    motionFn,
    triggers,
    className,
    delayLogic,
    customLogic,
    props,
  ]);

  if (!imageUrl) {
    logError({
      msg: "No image url provided, returning null.",
      mod: "error",
      src: "MotionImage",
    });
    return null;
  }

  if (pieces <= 0 || Math.sqrt(pieces) % 1 !== 0) {
    logError({
      msg: "Non-squared number of pieces or less/equal than/to 0 provided, returning null.",
      mod: "error",
      src: "MotionImage",
    });
    return null;
  }

  if (!animation.mode || animation.mode.length === 0) {
    logError({
      msg: "No animation mode provided, returning default animation.",
      mod: "warn",
      src: "MotionImage",
    });
  }

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

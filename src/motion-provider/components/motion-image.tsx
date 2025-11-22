"use client";

import {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import defaults from "../constants/defaults";
import type { MotionImageProps } from "../types";
import { calculateDelay, cn } from "../utils";
import { MotionContainer } from "./motion-container";

export const MotionImage: FC<MotionImageProps> = ({
  animation,
  config = defaults.MotionImage.config,
  controller,
  className,
  fallback = defaults.MotionImage.fallback,
  wrapperClassName,
  imageLoading = "eager",
}) => {
  const rafRef = useRef<number>(0);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [triggers, setTriggers] = useState<Record<number, boolean>>({});

  const {
    img: imageUrl,
    pieces,
    fn: motionFn,
    duration,
    customLogic,
    delayLogic = "sinusoidal",
  } = config;

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.src = imageUrl;
    img.loading = imageLoading ?? "eager";
    img.onload = () => setIsImageLoaded(true);
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, imageLoading]);

  const columns = useMemo(() => Math.sqrt(pieces), [pieces]);
  const rows = useMemo(() => pieces / columns, [pieces, columns]);

  const handleGridInteraction = useCallback(
    (e: React.MouseEvent) => {
      if (!motionFn || !gridRef.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        if (!gridRef.current) return;

        const rect = gridRef.current.getBoundingClientRect(),
          [x, y] = [e.clientX - rect.left, e.clientY - rect.top],
          [col, row] = [
            Math.floor((x / rect.width) * columns),
            Math.floor((y / rect.height) * rows),
          ],
          index = row * columns + col;

        if (index >= 0 && index < pieces) {
          const affectedIndexes: number[] = [];
          for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < rows && c >= 0 && c < columns) {
                affectedIndexes.push(r * columns + c);
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

  const childrenWithControllers = useMemo(() => {
    if (!isImageLoaded) return null;

    return Array.from({ length: pieces }).map((_, index) => {
      const [col, row] = [index % columns, Math.floor(index / columns)],
        uniqueKey = `cell-${col}-${row}`,
        pieceDelay = calculateDelay({
          delayLogic,
          index,
          baseDuration: duration,
          customLogic,
        }),
        delayTotal = (animation.delay || 0) + pieceDelay;

      return (
        <MotionContainer
          key={uniqueKey}
          animation={{
            ...animation,
            delay: delayTotal,
            duration,
          }}
          controller={{
            ...controller,
            trigger: motionFn ? !!triggers[index] : controller?.trigger,
          }}
          elementType="div"
          className={cn(className)}
        >
          <div
            className="h-full w-full bg-cover bg-no-repeat border-none"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: `${columns * 100}% ${rows * 100}%`,
              backgroundPosition: `calc(${col} * 100% / ${
                columns - 1
              }) calc(${row} * 100% / ${rows - 1})`,
            }}
          />
        </MotionContainer>
      );
    });
  }, [
    isImageLoaded,
    pieces,
    columns,
    rows,
    animation,
    controller,
    duration,
    motionFn,
    triggers,
    className,
    delayLogic,
    customLogic,
    imageUrl,
  ]);

  if (!imageUrl) {
    throw new Error(
      "Oops, no image url provided — 'MotionImage' requires an image in order to process it. Check your codebase."
    );
  }
  if (pieces <= 0 || Math.sqrt(pieces) % 1 !== 0) {
    throw new Error(
      "Oops, non-squared number of pieces or less/equal than/to 0 provided. Check out your codebase."
    );
  }

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Interaction Layer */}
      <div
        role="img"
        id="motion-image-interaction-layer"
        ref={gridRef}
        className="grid size-full gap-0"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        onClick={motionFn === "click" ? handleGridInteraction : undefined}
        onMouseMove={motionFn === "hover" ? handleGridInteraction : undefined}
      >
        {!isImageLoaded ? fallback : childrenWithControllers}
      </div>
    </div>
  );
};

import clsx from "clsx";
import { GripVertical } from "lucide-react";
import {
  type CSSProperties,
  createContext,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  use,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

type ResizableContextValue = {
  defaultSize: number;
  minSize: number;
  maxSize: number;
  step: number;
  startPanelId: string;
  groupRef: RefObject<HTMLDivElement | null>;
  handleRef: RefObject<HTMLDivElement | null>;
  getSize: () => number;
  setSize: (size: number) => void;
  setIsDragging: (isDragging: boolean) => void;
};

const ResizableContext = createContext<ResizableContextValue | null>(null);

function useResizable(): ResizableContextValue {
  const context = use(ResizableContext);

  if (!context) {
    throw new Error(
      "Resizable components must be rendered inside <ResizablePanelGroup>",
    );
  }

  return context;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function paint(
  group: HTMLDivElement | null,
  handle: HTMLDivElement | null,
  size: number,
) {
  group?.style.setProperty("--resizable-size", `${size}%`);
  handle?.setAttribute("aria-valuenow", String(Math.round(size)));
}

const START_PANEL_STYLE: CSSProperties = { flex: "0 0 var(--resizable-size)" };

type ResizablePanelGroupProps = {
  children: ReactNode;
  className?: string;
  /** Initial size of the start panel (percent). */
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  /** Keyboard step (percent). */
  step?: number;
  /**
   * Optional external holder of the current size (percent). Lets the size
   * survive a remount of the group without ever triggering a re-render.
   */
  sizeRef?: RefObject<number>;
};

export function ResizablePanelGroup({
  children,
  className,
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  step = 5,
  sizeRef: externalSizeRef,
}: ResizablePanelGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const internalSizeRef = useRef(defaultSize);
  const sizeRef = externalSizeRef ?? internalSizeRef;
  const startPanelId = useId();

  useLayoutEffect(() => {
    paint(
      groupRef.current,
      handleRef.current,
      clamp(sizeRef.current, minSize, maxSize),
    );
  }, [sizeRef, minSize, maxSize]);

  const context = useMemo<ResizableContextValue>(
    () => ({
      defaultSize,
      minSize,
      maxSize,
      step,
      startPanelId,
      groupRef,
      handleRef,
      getSize: () => sizeRef.current,
      setSize: (next) => {
        const size = clamp(next, minSize, maxSize);

        sizeRef.current = size;
        paint(groupRef.current, handleRef.current, size);
      },
      setIsDragging: (isDragging) => {
        groupRef.current?.toggleAttribute("data-dragging", isDragging);
      },
    }),
    [defaultSize, minSize, maxSize, step, startPanelId, sizeRef],
  );

  const style = { "--resizable-size": `${defaultSize}%` } as CSSProperties;

  return (
    <ResizableContext value={context}>
      <div
        ref={groupRef}
        style={style}
        className={clsx(
          "flex min-h-0 min-w-0 w-full data-dragging:cursor-col-resize data-dragging:select-none",
          className,
        )}
      >
        {children}
      </div>
    </ResizableContext>
  );
}

type ResizablePanelProps = {
  children: ReactNode;
  /** `start` is  by the handle, `end` fills the remaining space. */
  side: "start" | "end";
  className?: string;
};

export function ResizablePanel({
  children,
  side,
  className,
}: ResizablePanelProps) {
  const { startPanelId } = useResizable();
  const isStart = side === "start";

  return (
    <div
      id={isStart ? startPanelId : undefined}
      style={isStart ? START_PANEL_STYLE : undefined}
      className={clsx(
        "min-h-0 min-w-0 overflow-hidden",
        !isStart && "flex-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ResizableHandleProps = {
  /** Renders a visible grip on top of the divider line. */
  withHandle?: boolean;
  className?: string;
};

export function ResizableHandle({
  withHandle,
  className,
}: ResizableHandleProps) {
  const {
    defaultSize,
    minSize,
    maxSize,
    step,
    startPanelId,
    groupRef,
    handleRef,
    getSize,
    setSize,
    setIsDragging,
  } = useResizable();

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const group = groupRef.current;
    if (!group) return;

    const { left, width } = group.getBoundingClientRect();
    if (width === 0) return;

    setSize(((event.clientX - left) / width) * 100);
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "ArrowLeft":
        setSize(getSize() - step);
        break;
      case "ArrowRight":
        setSize(getSize() + step);
        break;
      case "Home":
        setSize(minSize);
        break;
      case "End":
        setSize(maxSize);
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  return (
    // biome-ignore lint/a11y/useSemanticElements: dynamic content
    <div
      ref={handleRef}
      role="separator"
      aria-orientation="vertical"
      aria-controls={startPanelId}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
      aria-valuenow={Math.round(defaultSize)}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onLostPointerCapture={() => setIsDragging(false)}
      onKeyDown={handleKeyDown}
      className={clsx(
        "relative flex w-px shrink-0 touch-none cursor-col-resize items-center justify-center bg-border outline-none transition-colors",
        "after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2",
        "hover:bg-accent focus-visible:bg-accent",
        className,
      )}
    >
      {withHandle && (
        <div className="z-10 flex h-6 w-3 items-center justify-center rounded-xs border border-border bg-surface-secondary">
          <GripVertical aria-hidden="true" className="size-2.5 text-muted" />
        </div>
      )}
    </div>
  );
}

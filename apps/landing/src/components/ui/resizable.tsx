import clsx from "clsx";
import { GripVertical } from "lucide-react";
import {
  createContext,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
  use,
  useId,
  useRef,
  useState,
} from "react";

type ResizableContextValue = {
  /** Size of the start panel, in percent of the group's width. */
  size: number;
  minSize: number;
  maxSize: number;
  step: number;
  startPanelId: string;
  groupRef: RefObject<HTMLDivElement | null>;
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

type ResizablePanelGroupProps = {
  children: ReactNode;
  className?: string;
  /** Controlled size of the start panel (percent). */
  size?: number;
  /** Initial size of the start panel (percent) when uncontrolled. */
  defaultSize?: number;
  onSizeChange?: (size: number) => void;
  minSize?: number;
  maxSize?: number;
  /** Keyboard step (percent). */
  step?: number;
};

export function ResizablePanelGroup({
  children,
  className,
  size: controlledSize,
  defaultSize = 50,
  onSizeChange,
  minSize = 10,
  maxSize = 90,
  step = 5,
}: ResizablePanelGroupProps) {
  const [uncontrolledSize, setUncontrolledSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const groupRef = useRef<HTMLDivElement>(null);
  const startPanelId = useId();

  const size = clamp(controlledSize ?? uncontrolledSize, minSize, maxSize);

  function setSize(next: number) {
    const clamped = clamp(next, minSize, maxSize);

    if (controlledSize === undefined) setUncontrolledSize(clamped);
    onSizeChange?.(clamped);
  }

  return (
    <ResizableContext
      value={{
        size,
        minSize,
        maxSize,
        step,
        startPanelId,
        groupRef,
        setSize,
        setIsDragging,
      }}
    >
      <div
        ref={groupRef}
        data-dragging={isDragging || undefined}
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
  /** `start` is sized by the handle, `end` fills the remaining space. */
  side: "start" | "end";
  className?: string;
};

export function ResizablePanel({
  children,
  side,
  className,
}: ResizablePanelProps) {
  const { size, startPanelId } = useResizable();
  const isStart = side === "start";

  return (
    <div
      id={isStart ? startPanelId : undefined}
      style={isStart ? { flex: `0 0 ${size}%` } : undefined}
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
    size,
    minSize,
    maxSize,
    step,
    startPanelId,
    groupRef,
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
        setSize(size - step);
        break;
      case "ArrowRight":
        setSize(size + step);
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
    <div
      // biome-ignore lint/a11y/useSemanticElements: focusable window splitter (WAI-ARIA), <hr> is not focusable/valued
      role="separator"
      aria-orientation="vertical"
      aria-controls={startPanelId}
      aria-valuemin={minSize}
      aria-valuemax={maxSize}
      aria-valuenow={Math.round(size)}
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

import { finite, invariant } from "./errors.js";
import type { AnimationHandle, ScrollOptions } from "./types.js";

/** @description Clamp and map an input range; exported for deterministic tests and custom drivers. */
export function mapProgress(value: number, start = 0, end = 1): number {
	finite(start, "scroll.start");
	finite(end, "scroll.end");
	invariant(
		end > start,
		"INVALID_SCROLL_RANGE",
		"scroll.end must exceed scroll.start.",
	);
	return Math.max(0, Math.min(1, (value - start) / (end - start)));
}

/**
 * @description Portable scroll driver: passive events, one scheduled frame, WAAPI seeking.
 * View geometry is read from target.
 * Uses physical x/y axes. Normal horizontal scrolling is LTR.
 */
export function bindScroll(
	element: HTMLElement | SVGElement,
	handle: Pick<AnimationHandle, "seek">,
	options: ScrollOptions = {},
): () => void {
	const win = element.ownerDocument.defaultView;
	if (!win) return () => {};

	mapProgress(0, options.start, options.end);

	const source =
		options.source ??
		element.ownerDocument.scrollingElement ??
		element.ownerDocument.documentElement;
	const target = options.target ?? element;
	const vertical = options.axis !== "x";
	const viewport =
		source === element.ownerDocument.scrollingElement ||
		source === element.ownerDocument.documentElement;
	const eventTarget = viewport ? win : source;

	let frame = 0,
		active = true;

	const update = () => {
		frame = 0;

		if (!active) return;

		const extent = viewport
			? vertical
				? win.innerHeight
				: win.innerWidth
			: vertical
				? source.clientHeight
				: source.clientWidth;

		let progress: number;
		if (options.mode === "document") {
			const range =
				(vertical ? source.scrollHeight : source.scrollWidth) - extent;
			progress =
				range > 0
					? (vertical ? source.scrollTop : source.scrollLeft) / range
					: 0;
		} else {
			const rect = target.getBoundingClientRect(),
				root = source.getBoundingClientRect();

			const origin = viewport
				? 0
				: vertical
					? root.top + source.clientTop
					: root.left + source.clientLeft;
			const position = (vertical ? rect.top : rect.left) - origin;
			const size = vertical ? rect.height : rect.width;

			progress = (extent - position) / Math.max(1, extent + size);
		}

		handle.seek(mapProgress(progress, options.start, options.end));
	};

	const schedule = () => {
		if (!frame && active) frame = win.requestAnimationFrame(update);
	};

	let observer: ResizeObserver | undefined;

	const dispose = () => {
		active = false;

		if (frame) win.cancelAnimationFrame(frame);

		eventTarget.removeEventListener("scroll", schedule);
		win.removeEventListener("resize", schedule);

		observer?.disconnect();
	};

	try {
		eventTarget.addEventListener("scroll", schedule, {
			passive: true,
		});

		win.addEventListener("resize", schedule, {
			passive: true,
		});

		observer = win.ResizeObserver
			? new win.ResizeObserver(schedule)
			: undefined;

		observer?.observe(source);
		observer?.observe(target);

		update();
	} catch (error) {
		dispose();
		throw error;
	}

	return dispose;
}

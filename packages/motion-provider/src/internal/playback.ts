import { isController } from "../engine/controller.js";
import { observeInView } from "../engine/in-view.js";
import { bindScroll } from "../engine/scroll.js";
import type { AnimationHandle, ControllerInput } from "../types.js";

/** Apply one driver's policy to a set of handles. Used by tiled images and gallery slides. */
export function bindPlayback(
	target: HTMLElement,
	handles: readonly AnimationHandle[],
	input?: ControllerInput,
	manual = false,
): () => void {
	const props = isController(input) ? undefined : input;
	const controls = isController(input) ? input : props?.controls;
	const cleanups: (() => void)[] = [];

	const owns = () => controls?.getSnapshot() !== undefined;

	const drive = (visible: boolean) => {
		if (owns()) return;
		for (const h of handles) {
			if (props?.isAnimationStopped) h.finish();
			else if (visible) void (props?.reverse ? h.reverse() : h.play());
			else if (h.playState !== "paused")
				void (props?.reverse ? h.play() : h.reverse());
		}
	};

	const dispose = () => {
		for (const cleanup of cleanups) cleanup();
	};

	try {
		for (const handle of handles)
			cleanups.push(controls?.register(handle) ?? (() => {}));

		if (!owns()) {
			if (props?.isAnimationStopped) drive(true);
			else if (props?.scroll)
				cleanups.push(
					bindScroll(
						target,
						{
							seek: (progress) => {
								if (owns()) return;
								for (const handle of handles) handle.seek(progress);
							},
						},
						props.scroll,
					),
				);
			else if (!manual) {
				if (props?.trigger !== undefined) drive(props.trigger);
				else cleanups.push(observeInView(target, drive, props?.configView));
			}
		}
	} catch (error) {
		dispose();
		throw error;
	}

	return dispose;
}

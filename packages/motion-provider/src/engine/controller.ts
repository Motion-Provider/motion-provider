import { finite } from "./errors.js";
import type {
	AnimationController,
	AnimationHandle,
	AnimationResult,
	ControlAction,
} from "./types.js";

/** Create an isolated controller. It owns registrations, not DOM lifetimes; components unregister. */
export function createController(): AnimationController {
	const handles = new Set<AnimationHandle>();
	const listeners = new Set<() => void>();

	let action: ControlAction | undefined;

	const notify = (next: ControlAction) => {
		action = next;
		for (const listener of listeners) listener();
	};

	const command = (next: ControlAction) => {
		notify(next);
		return [...handles].map((handle) => handle[next]());
	};

	const controller: AnimationController = {
		register(handle) {
			handles.add(handle);

			try {
				if (action) void handle[action]();
			} catch (error) {
				handles.delete(handle);
				throw error;
			}

			return () => {
				handles.delete(handle);
			};
		},
		subscribe(listener) {
			listeners.add(listener);
			return () => {
				listeners.delete(listener);
			};
		},
		getSnapshot: () => action,
		play: () => Promise.all(command("play") as Promise<AnimationResult>[]),
		reverse: () => {
			notify("reverse");
			const group = [...handles];
			// Completed short effects hold at the group time before their backwards interval.
			const elapsed = Math.max(0, ...group.map((h) => h.currentTime ?? 0));
			const from =
				elapsed ||
				Math.max(
					0,
					...group.map((h) =>
						Number.isFinite(h.totalDuration)
							? h.totalDuration
							: (h.duration ?? 0),
					),
				);
			return Promise.all(group.map((h) => h.reverse(from)));
		},
		pause: () => {
			command("pause");
		},
		finish: () => {
			command("finish");
		},
		reset: () => {
			command("reset");
		},
		cancel: () => {
			command("cancel");
		},
		seek(progress) {
			finite(progress, "progress");
			notify("pause");
			for (const handle of handles) handle.seek(progress);
		},
		setPlaybackRate(rate) {
			finite(rate, "playbackRate");
			for (const handle of handles) handle.setPlaybackRate(rate);
		},
		get size() {
			return handles.size;
		},
		onReverse: () =>
			action === "reverse" ? controller.play() : controller.reverse(),
		onStop: () => controller.finish(),
		get control() {
			return controller;
		},
	};
	return controller;
}

export function isController(value: unknown): value is AnimationController {
	return (
		!!value && typeof (value as AnimationController).register === "function"
	);
}

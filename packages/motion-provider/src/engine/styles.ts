import type { MotionValue } from "./types.js";

export const cssName = (name: string): string =>
	name.startsWith("--")
		? name
		: name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

/** Own only the properties this animation writes, including their original priority. */
export function styleOwner(element: HTMLElement | SVGElement) {
	const saved = new Map<string, [string, string]>();

	return {
		set(values: Record<string, MotionValue>) {
			for (const [key, value] of Object.entries(values)) {
				const name = cssName(key);

				if (!saved.has(name))
					saved.set(name, [
						element.style.getPropertyValue(name),
						element.style.getPropertyPriority(name),
					]);

				element.style.setProperty(name, String(value));
			}
		},
		restore() {
			for (const [name, [value, priority]] of saved) {
				if (value) element.style.setProperty(name, value, priority);
				else element.style.removeProperty(name);
			}

			saved.clear();
		},
	};
}

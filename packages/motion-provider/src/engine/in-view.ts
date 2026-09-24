import { finite, invariant } from "./errors.js";
import type { ViewOptions } from "./types.js";

interface Pool {
	observer: IntersectionObserver;
	targets: Map<Element, Set<(entry: IntersectionObserverEntry) => void>>;
}

const documents = new WeakMap<
	Document,
	Map<Element | null, Map<string, Pool>>
>();

/** Share observers for matching options. Teardown releases targets, observers, and root references. */
export function observeInView(
	element: Element,
	callback: (visible: boolean) => void,
	options: ViewOptions = {},
): () => void {
	const amount =
		options.amount === "all"
			? 1
			: options.amount === "some"
				? 0
				: (options.amount ?? 0.5);

	finite(amount, "configView.amount", 0);
	invariant(amount <= 1, "INVALID_VIEW", "configView.amount must be <= 1.");

	const Observer = element.ownerDocument.defaultView?.IntersectionObserver;
	if (!Observer) {
		callback(true);
		return () => {};
	}

	const root = options.root ?? null,
		margin = options.margin ?? "0px",
		key = `${margin}|${amount}`;

	let roots = documents.get(element.ownerDocument);

	if (!roots) {
		roots = new Map();
		documents.set(element.ownerDocument, roots);
	}

	let entries = roots.get(root);
	if (!entries) {
		entries = new Map();
		roots.set(root, entries);
	}

	let pool = entries.get(key);
	if (!pool) {
		const targets: Pool["targets"] = new Map();
		const observer = new Observer(
			(items) => {
				for (const item of items)
					for (const listener of [...(targets.get(item.target) ?? [])])
						listener(item);
			},
			{
				root,
				rootMargin: margin,
				threshold: amount,
			},
		);

		pool = {
			observer,
			targets,
		};

		entries.set(key, pool);
	}

	const targetPool = pool;

	let listeners = pool.targets.get(element);

	if (!listeners) {
		listeners = new Set();
		pool.targets.set(element, listeners);
		pool.observer.observe(element);
	}

	let active = true;

	const remove = () => {
		if (!active) return;

		active = false;
		listeners.delete(listener);

		if (!listeners.size) {
			targetPool.targets.delete(element);
			targetPool.observer.unobserve(element);
		}

		if (!targetPool.targets.size) {
			targetPool.observer.disconnect();
			entries.delete(key);
			if (!entries.size) roots.delete(root);
		}
	};

	const listener = (entry: IntersectionObserverEntry) => {
		const visible = entry.isIntersecting && entry.intersectionRatio >= amount;
		callback(visible);
		if (visible && (options.once ?? true)) remove();
	};

	listeners.add(listener);

	return remove;
}

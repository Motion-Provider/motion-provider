import assert from "node:assert/strict";
import test from "node:test";
import {
	animateElement,
	bindScroll,
	createController,
	observeInView,
} from "../dist/engine/index.js";
import { fadeIn, fadeUp } from "../dist/presets/index.js";

class NativeAnimation {
	playState = "running";
	currentTime = 0;
	playbackRate = 1;
	onfinish = null;
	constructor(frames, options) {
		this.frames = frames;
		this.options = options;
		this.fresh();
	}
	fresh() {
		this.finished = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
	pause() {
		if (this.playState === "idle") this.fresh();
		this.playState = "paused";
	}
	play() {
		if (this.playState === "idle" || this.playState === "finished")
			this.fresh();
		this.playState = "running";
	}
	cancel() {
		this.playState = "idle";
		this.currentTime = null;
		this.reject(new DOMException("Cancelled", "AbortError"));
	}
	finish() {
		this.playState = "finished";
		this.currentTime =
			this.playbackRate < 0 ? 0 : this.options.duration + this.options.delay;
		this.resolve(this);
		queueMicrotask(() => this.onfinish?.());
	}
	updatePlaybackRate(rate) {
		this.playbackRate = rate;
	}
}
function target() {
	const effects = [],
		style = new Map([["color", ["red", "important"]]]);
	return {
		effects,
		style: {
			getPropertyValue: (k) => style.get(k)?.[0] ?? "",
			getPropertyPriority: (k) => style.get(k)?.[1] ?? "",
			setProperty: (k, v, p = "") => style.set(k, [v, p]),
			removeProperty: (k) => style.delete(k),
		},
		ownerDocument: {
			defaultView: {},
		},
		animate(frames, options) {
			const effect = new NativeAnimation(frames, options);
			effects.push(effect);
			return effect;
		},
	};
}
test("native cancellation resolves callers and does not produce an unhandled rejection", async () => {
	const e = target(),
		h = animateElement(e, fadeIn),
		pending = h.finished;
	h.cancel();
	assert.deepEqual(await pending, {
		status: "cancelled",
	});
	await new Promise((r) => setTimeout(r, 0));
	assert.equal(e.effects[0].playState, "idle");
	assert.equal(h.playState, "idle");
	h.dispose();
});
test("mid-flight reversal preserves progress and settles the superseded direction", async () => {
	const e = target(),
		h = animateElement(e, fadeIn, {
			duration: 2,
		});
	const forward = h.finished;
	e.effects[0].currentTime = 600;
	const backwards = h.reverse();
	assert.equal(e.effects[0].currentTime, 600);
	assert.equal(e.effects[0].playbackRate, -1);
	assert.equal((await forward).status, "cancelled");
	e.effects[0].finish();
	assert.equal((await backwards).status, "finished");
	h.dispose();
});
test("a fresh reverse starts at the complete effect duration, including delay", async () => {
	const e = target(),
		h = animateElement(e, fadeIn, {
			duration: 0.5,
			delay: 0.2,
			autoplay: false,
		});
	const result = h.reverse();
	assert.equal(e.effects[0].currentTime, 700);
	e.effects[0].finish();
	assert.equal((await result).status, "finished");
	h.dispose();
});
test("zero-duration animations retain their native delay", async () => {
	const e = target(),
		h = animateElement(e, fadeIn, {
			duration: 0,
			delay: 1,
		});
	assert.equal(e.effects[0].playState, "running");
	assert.equal(e.effects[0].options.delay, 1000);
	assert.equal(h.playState, "running");
	h.dispose();
});
test("multiple property effects finish as a group", async () => {
	const e = target(),
		h = animateElement(e, fadeUp);
	assert.equal(e.effects.length, 2);
	let done = false;
	h.finished.then(() => {
		done = true;
	});
	e.effects[0].finish();
	await Promise.resolve();
	assert.equal(done, false);
	e.effects[1].finish();
	assert.equal((await h.finished).status, "finished");
	h.dispose();
});
test("a failed second effect cancels the first and reports the browser cause", async () => {
	const e = target(),
		original = e.animate.bind(e),
		errors = [];
	e.animate = (frames, options) => {
		if (e.effects.length) throw new TypeError("Unsupported property");
		return original(frames, options);
	};
	const h = animateElement(e, fadeUp, {
		onError: (e) => errors.push(e),
	});
	assert.equal(e.effects[0].playState, "idle");
	assert.equal(errors[0].code, "WAAPI_FAILED");
	assert.match(errors[0].cause.message, /Unsupported/);
	assert.equal((await h.finished).status, "finished");
	h.dispose();
});
test("Strict Mode setup / cleanup / setup leaves one live animation and no unmount callback", async () => {
	const e = target(),
		events = [];
	const first = animateElement(e, fadeIn, {
		onFinish: (e) => events.push(e),
	});
	first.dispose();
	const second = animateElement(e, fadeIn);
	assert.equal(e.effects.filter((e) => e.playState === "running").length, 1);
	assert.deepEqual(events, []);
	second.dispose();
	assert.equal(e.effects.filter((e) => e.playState !== "idle").length, 0);
});
test("controller awaits real reverse completion for every registered handle", async () => {
	const controller = createController(),
		a = target(),
		b = target(),
		ha = animateElement(a, fadeIn),
		hb = animateElement(b, fadeIn);
	controller.register(ha);
	const remove = controller.register(hb);
	const finished = controller.reverse();
	a.effects[0].finish();
	hb.dispose();
	remove();
	assert.deepEqual(await finished, [
		{
			status: "finished",
		},
		{
			status: "cancelled",
		},
	]);
	ha.dispose();
});
test("normalized seek includes iterations; disposed handles do not change the DOM", () => {
	const e = target(),
		h = animateElement(e, fadeIn, {
			duration: 2,
			iterations: 2,
			delay: 1,
		});
	h.seek(0.5);
	assert.equal(e.effects[0].currentTime, 2500);
	assert.equal(h.playState, "paused");
	h.dispose();
	h.seek(1);
	assert.equal(e.effects[0].currentTime, null);
});
test("finishing an infinite effect does not rewrite its repeat timing", async () => {
	const e = target(),
		h = animateElement(e, fadeIn, {
			iterations: Infinity,
		});
	h.finish();
	assert.equal((await h.finished).status, "finished");
	assert.equal(e.effects[0].options.iterations, Infinity);
	void h.play();
	assert.equal(e.effects[0].playState, "running");
	h.dispose();
});
test("observers are pooled, honor once and release targets", () => {
	const observers = [];
	class Observer {
		targets = new Set();
		constructor(cb, options) {
			this.cb = cb;
			this.options = options;
			observers.push(this);
		}
		observe(e) {
			this.targets.add(e);
		}
		unobserve(e) {
			this.targets.delete(e);
		}
		disconnect() {
			this.disconnected = true;
		}
		emit(e, ratio) {
			this.cb([
				{
					target: e,
					isIntersecting: ratio > 0,
					intersectionRatio: ratio,
				},
			]);
		}
	}
	const doc = {
			defaultView: {
				IntersectionObserver: Observer,
			},
		},
		a = {
			ownerDocument: doc,
		},
		b = {
			ownerDocument: doc,
		},
		av = [],
		bv = [];
	const da = observeInView(a, (v) => av.push(v)),
		db = observeInView(b, (v) => bv.push(v));
	assert.equal(observers.length, 1);
	observers[0].emit(a, 0.2);
	observers[0].emit(a, 0.6);
	assert.deepEqual(av, [false, true]);
	assert.equal(observers[0].targets.has(a), false);
	db();
	da();
	assert.equal(observers[0].targets.size, 0);
	assert.equal(observers[0].disconnected, true);
});
test("scroll events coalesce and pending frames are removed on teardown", () => {
	const callbacks = new Map(),
		frames = new Map();
	let id = 0,
		removed = 0;
	const source = {
		clientHeight: 200,
		scrollHeight: 1000,
		scrollTop: 400,
		getBoundingClientRect: () => ({
			top: 0,
		}),
		clientTop: 0,
	};
	const win = {
		innerHeight: 200,
		addEventListener: (k, f) => callbacks.set(k, f),
		removeEventListener: (k) => {
			callbacks.delete(k);
			removed++;
		},
		requestAnimationFrame: (f) => {
			frames.set(++id, f);
			return id;
		},
		cancelAnimationFrame: (i) => frames.delete(i),
	};
	const doc = {
			defaultView: win,
			scrollingElement: source,
			documentElement: source,
		},
		element = {
			ownerDocument: doc,
		};
	const values = [];
	const dispose = bindScroll(
		element,
		{
			seek: (p) => values.push(p),
		},
		{
			mode: "document",
		},
	);
	assert.equal(values[0], 0.5);
	callbacks.get("scroll")();
	callbacks.get("scroll")();
	assert.equal(frames.size, 1);
	dispose();
	assert.equal(frames.size, 0);
	assert.equal(removed, 2);
});
test("group reversal restores the reverse order of staggered entry", async () => {
	const controller = createController(),
		a = target(),
		b = target();
	const ha = animateElement(a, fadeIn, {
			duration: 0.5,
			delay: 0,
		}),
		hb = animateElement(b, fadeIn, {
			duration: 0.5,
			delay: 0.4,
		});
	controller.register(ha);
	controller.register(hb);
	a.effects[0].finish();
	b.effects[0].finish();
	await Promise.resolve();
	const reversed = controller.reverse();
	assert.equal(a.effects[0].currentTime, 900);
	assert.equal(b.effects[0].currentTime, 900);
	assert.equal(a.effects[0].playbackRate, -1);
	assert.equal(b.effects[0].playbackRate, -1);
	a.effects[0].finish();
	b.effects[0].finish();
	await reversed;
	ha.dispose();
	hb.dispose();
});
test("pause and resume keep the current completion promise alive", async () => {
	const e = target(),
		h = animateElement(e, fadeIn);
	const pending = h.finished;
	h.pause();
	const resumed = h.play();
	assert.equal(resumed, pending);
	e.effects[0].finish();
	assert.equal((await pending).status, "finished");
	h.dispose();
});
test("scroll initialization failure removes installed listeners", () => {
	const callbacks = new Set(),
		source = {
			scrollHeight: 400,
			scrollTop: 0,
		};
	const win = {
		innerHeight: 100,
		addEventListener: (name) => callbacks.add(name),
		removeEventListener: (name) => callbacks.delete(name),
	};
	const element = {
		ownerDocument: {
			defaultView: win,
			scrollingElement: source,
		},
	};
	assert.throws(
		() =>
			bindScroll(
				element,
				{
					seek: () => {
						throw new Error("Unseekable");
					},
				},
				{
					mode: "document",
				},
			),
		/Unseekable/,
	);
	assert.equal(callbacks.size, 0);
});
test("controller seeking takes ownership from automatic drivers", () => {
	const c = createController();
	c.seek(0.5);
	assert.equal(c.getSnapshot(), "pause");
});

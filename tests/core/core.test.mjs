import assert from "node:assert/strict";
import test from "node:test";
import { createMotionConfig, createMotionRegistry } from "../../dist/config.js";
import animations from "../../dist/constants/animations.js";
import delays from "../../dist/constants/delays.js";
import transitions from "../../dist/constants/transitions.js";
import {
	animateElement,
	compileAnimation,
	compileTracks,
	createController,
	mapProgress,
	mixAnimations,
	resolveEasing,
	resolveTiming,
} from "../../dist/engine/index.js";
import { splitText } from "../../dist/internal/text.js";
import { calculateDelay, calculateDelays } from "../../dist/utils.js";

test("all 70 source presets and 30 transitions compile", () => {
	assert.equal(Object.keys(animations).length, 70);
	for (const definition of Object.values(animations))
		assert.doesNotThrow(() => compileTracks(compileAnimation(definition)));
	for (const timing of Object.values(transitions))
		assert.doesNotThrow(() => resolveTiming(timing));
});
test("timing preserves zero and converts seconds exactly", () => {
	const t = resolveTiming({
		duration: 0,
		delay: 0,
		endDelay: 0.125,
		iterations: 0,
	});
	assert.equal(t.duration, 0);
	assert.equal(t.delay, 0);
	assert.equal(t.endDelay, 125);
	assert.equal(t.iterations, 0);
	assert.equal(
		resolveTiming({
			duration: 0.123,
		}).duration,
		123,
	);
});
test("negative delays are valid but durations and nonfinite inputs are not", () => {
	assert.equal(
		resolveTiming({
			delay: -0.5,
		}).delay,
		-500,
	);
	for (const value of [-1, NaN, Infinity])
		assert.throws(
			() =>
				resolveTiming({
					duration: value,
				}),
			{
				code: "INVALID_NUMBER",
			},
		);
	assert.throws(
		() =>
			resolveTiming({
				iterations: -1,
			}),
		{
			code: "INVALID_ITERATIONS",
		},
	);
	assert.throws(
		() =>
			resolveTiming({
				direction: "bad",
			}),
		{
			code: "INVALID_DIRECTION",
		},
	);
});
test("legacy curves map to native CSS and invalid Bézier coordinates fail", () => {
	assert.equal(resolveEasing("easeInOut"), "ease-in-out");
	assert.equal(resolveEasing([0.2, -1, 0.3, 2]), "cubic-bezier(0.2,-1,0.3,2)");
	assert.throws(() => resolveEasing([2, 0, 0.3, 1]), {
		code: "INVALID_EASING",
	});
});
test("mixed modes retain independent tracks and last property wins", () => {
	const mixed = mixAnimations([animations.fadeUp, animations.filterBlurIn]);
	const c = compileAnimation(mixed);
	assert.deepEqual(c.frames.opacity, ["0", "1"]);
	assert.deepEqual(c.frames.filter, ["blur(10px)", "blur(0px)"]);
	assert.equal(c.initial.transform, "translateY(30px)");
	assert.deepEqual(
		mixAnimations([animations.fadeIn, animations.fadeOut]).animate,
		{
			opacity: 0,
		},
	);
});
test("transform aliases preserve unequal keyframe spacing", () => {
	const c = compileAnimation({
		initial: {
			x: 0,
			rotate: 0,
		},
		animate: {
			x: [0, 10, 20],
			rotate: [0, 60, 120, 180],
		},
	});
	const tracks = compileTracks(c),
		t = tracks.at(-1);
	assert.deepEqual(
		t.map((f) => f.offset),
		[0, 1 / 3, 0.5, 2 / 3, 1],
	);
	assert.equal(t[2].transform, "translateX(10px) rotate(90deg)");
});
test("explicit transforms take precedence and static setup properties persist", () => {
	const c = compileAnimation(
		mixAnimations([animations.fadeUp, animations.transformRevealUp]),
	);
	assert.equal(c.final.transform, "scaleY(1) translateY(0%)");
	assert.equal(c.final.transformOrigin, "bottom center");
	assert.deepEqual(compileAnimation(animations.typingEffect).frames.width, [
		"0px",
		"85%",
	]);
});
test("every stagger algorithm is deterministic, finite and bounded", () => {
	for (const delayLogic of delays)
		for (const index of [0, 1, 50, 5000]) {
			const input = {
				delayLogic,
				index,
				baseDuration: 0.08,
				customLogic: (i) => i * 0.03,
			};
			const value = calculateDelay(input);
			assert.equal(value, calculateDelay(input));
			assert.ok(value >= 0 && value <= 60);
		}
	assert.equal(
		calculateDelay({
			index: 3,
			baseDuration: 0,
		}),
		0,
	);
	assert.throws(
		() =>
			calculateDelay({
				index: 1,
				delayLogic: "custom",
				customLogic: () => NaN,
			}),
		{
			code: "INVALID_NUMBER",
		},
	);
	assert.equal(
		new Set(
			calculateDelays(25, {
				delayLogic: "shuffle",
				baseDuration: 0.01,
			}),
		).size,
		25,
	);
});
test("text preserves whitespace, handles a single word, and retains graphemes", () => {
	assert.deepEqual(splitText("one  two\n", "words"), [
		"one",
		"  ",
		"two",
		"\n",
	]);
	assert.deepEqual(splitText("one", "words"), ["one"]);
	assert.deepEqual(splitText("👨‍👩‍👦e\u0301"), ["👨‍👩‍👦", "e\u0301"]);
});
test("request-isolated config getters reject inherited and missing keys", () => {
	const a = createMotionRegistry(
		createMotionConfig({
			hero: {
				type: "MotionContainer",
				props: {
					animation: {
						mode: "fadeIn",
					},
				},
			},
		}),
	);
	const b = createMotionRegistry(
		createMotionConfig({
			hero: {
				type: "MotionContainer",
				props: {
					animation: {
						mode: "fadeOut",
					},
				},
			},
		}),
	);
	assert.equal(a.getMotionAnimation("hero").animation.mode, "fadeIn");
	assert.equal(b.getMotionAnimation("hero").animation.mode, "fadeOut");
	assert.throws(() => a.getMotionAnimation("missing"), {
		code: "UNKNOWN_CONFIG_KEY",
	});
	assert.throws(() => a.getMotionAnimation("toString"), {
		code: "UNKNOWN_CONFIG_KEY",
	});
});
test("scroll progress maps bounds and rejects empty ranges", () => {
	assert.equal(mapProgress(0.5, 0.25, 0.75), 0.5);
	assert.equal(mapProgress(-1), 0);
	assert.equal(mapProgress(2), 1);
	assert.throws(() => mapProgress(0, 0.5, 0.5), {
		code: "INVALID_SCROLL_RANGE",
	});
});
test("controller commands do not cross scopes; registrations are removed", async () => {
	let plays = 0,
		reverses = 0;
	const h = {
		play: async () => {
			plays++;
			return {
				status: "finished",
			};
		},
		reverse: async () => {
			reverses++;
			return {
				status: "finished",
			};
		},
	};
	const a = createController(),
		b = createController(),
		remove = a.register(h);
	await a.play();
	await b.reverse();
	assert.equal(plays, 1);
	assert.equal(reverses, 0);
	remove();
	assert.equal(a.size, 0);
	await a.play();
	assert.equal(plays, 1);
	a.register(h);
	assert.equal(plays, 2);
});
function fakeElement() {
	const values = new Map([["opacity", [".4", "important"]]]);
	return {
		style: {
			getPropertyValue: (k) => values.get(k)?.[0] ?? "",
			getPropertyPriority: (k) => values.get(k)?.[1] ?? "",
			setProperty: (k, v, p = "") => values.set(k, [v, p]),
			removeProperty: (k) => values.delete(k),
		},
		ownerDocument: {
			defaultView: {},
		},
		values,
	};
}
test("missing WAAPI reveals the destination and restores owned styles on disposal", async () => {
	const e = fakeElement(),
		errors = [];
	const h = animateElement(e, animations.fadeIn, {
		onError: (e) => errors.push(e.code),
	});
	assert.deepEqual(await h.finished, {
		status: "finished",
	});
	assert.equal(e.values.get("opacity")[0], "1");
	assert.deepEqual(errors, ["WAAPI_UNAVAILABLE"]);
	h.dispose();
	assert.deepEqual(e.values.get("opacity"), [".4", "important"]);
	assert.equal((await h.play()).status, "cancelled");
	h.dispose();
});
test("reduced motion is an immediate endpoint with no capability error", async () => {
	const e = fakeElement();
	const h = animateElement(e, animations.fadeIn, {
		reducedMotion: "always",
		onError: () => assert.fail(),
	});
	assert.equal((await h.finished).status, "finished");
	assert.equal(e.values.get("opacity")[0], "1");
	await h.reverse();
	assert.equal(e.values.get("opacity")[0], "0");
	h.dispose();
});
test("static setup CSS appears at both ends instead of implicitly interpolating from the DOM", () => {
	const compiled = compileAnimation(animations.maskGradient);
	assert.equal(compiled.frames.maskImage.length, 2);
	assert.equal(compiled.frames.maskImage[0], compiled.frames.maskImage[1]);
	assert.deepEqual(
		compileAnimation({
			initial: {},
			animate: {
				opacity: [0.7],
			},
		}).frames.opacity,
		["0.7", "0.7"],
	);
});

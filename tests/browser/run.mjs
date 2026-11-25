import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { chromium, firefox, webkit } from "playwright";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { MotionContainer } from "../../packages/motion-provider/dist/index.js";

process.chdir(fileURLToPath(new URL("../..", import.meta.url)));

const bundle = await build({
	absWorkingDir: process.cwd(),
	entryPoints: ["tests/browser/fixture.tsx"],
	bundle: true,
	write: false,
	format: "iife",
	target: "es2022",
	logLevel: "silent",
});

const server = createServer((req, res) => {
	if (req.url === "/fixture.js") {
		res.setHeader("Content-Type", "text/javascript");
		res.end(bundle.outputFiles[0].contents);
	} else {
		res.setHeader("Content-Type", "text/html");
		res.end(
			'<!doctype html><meta charset="utf-8"><div id="root"></div><script src="/fixture.js"></script>',
		);
	}
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

const url = `http://127.0.0.1:${server.address().port}`;
const engine = {
	chromium,
	firefox,
	webkit,
}[process.env.BROWSER ?? "chromium"];

let browser, context, page;
const results = [];
const failures = [];

async function fresh(name) {
	await context?.close();
	context = await browser.newContext();
	page = await context.newPage();
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	await page.goto(url);
	if (name) {
		await page.evaluate((name) => window.fixture.render(name), name);
		await page.waitForTimeout(50);
	}
	return errors;
}
async function check(name, fn) {
	try {
		await fn();
		results.push(name);
		console.log(`PASS ${name}`);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		failures.push({ name, message });
		console.log(`FAIL ${name}\n${message}\n`);
	}
}
try {
	browser = await engine.launch({
		headless: true,
		...(process.env.BROWSER_EXECUTABLE
			? {
					executablePath: process.env.BROWSER_EXECUTABLE,
				}
			: {}),
	});
	await check(
		"70 presets and all transitions accepted by real WAAPI",
		async () => {
			const errors = await fresh();
			const findings = await page.evaluate(async () => {
				const f = window.fixture,
					errors = [];
				const el = document.createElement("div");
				document.body.append(el);
				for (const [name, definition] of Object.entries(f.animations)) {
					const h = f.animateElement(el, definition, {
						duration: 0.001,
						onError: (e) => errors.push(`${name}: ${e.message}`),
					});
					await h.finished;
					h.dispose();
				}
				for (const [name, timing] of Object.entries(f.transitions)) {
					const h = f.animateElement(el, f.animations.fadeIn, {
						...timing,
						duration: 0.001,
						onError: (e) => errors.push(`${name}: ${e.message}`),
					});
					await h.finished;
					h.dispose();
				}
				el.remove();
				return errors;
			});
			assert.deepEqual(findings, []);
			assert.deepEqual(errors, []);
		},
	);
	await check(
		"StrictMode cleanup and identical props preserve actual native effects",
		async () => {
			const errors = await fresh("lifecycle");
			await page.evaluate(() => {
				window.before = document.querySelector("#box").getAnimations();
			});
			await page.evaluate(() => window.fixture.render("lifecycle", 1));
			await page.waitForTimeout(70);
			assert.equal(
				await page.evaluate(() => {
					const after = document.querySelector("#box").getAnimations();
					return (
						after.length === window.before.length &&
						after.every((a, i) => a === window.before[i])
					);
				}),
				true,
			);
			const commits = await page.evaluate(() => window.fixture.metrics.commits);
			await page.waitForTimeout(120);
			assert.equal(
				await page.evaluate(() => window.fixture.metrics.commits),
				commits,
			);
			await page.evaluate(() => window.fixture.unmount());
			assert.equal(
				await page.evaluate(() => document.getAnimations().length),
				0,
			);
			assert.deepEqual(errors, []);
		},
	);
	await check("declarative playback follows replacement effects and nodes", async () => {
		const errors = await fresh("replacement");
		for (const revision of [1, 2, 3, 4]) {
			const previous = await page.locator("#box").evaluate((element) => {
				window.previousTarget = element;
				window.previousEffects = element.getAnimations();
				return element.tagName;
			});
			await page.evaluate((value) => window.fixture.render("replacement", value), revision);
			await page.waitForFunction(
				(value) => document.querySelector("#box")?.dataset.revision === String(value),
				revision,
			);
			const state = await page.locator("#box").evaluate((element) => ({
				tag: element.tagName,
				previousTargetEffects: window.previousTarget.getAnimations().length,
				currentEffects: element.getAnimations().map((effect) => ({
					replaced: !window.previousEffects.includes(effect),
					state: effect.playState,
				})),
				opacity: getComputedStyle(element).opacity,
			}));
			if (revision === 1) {
				assert.equal(state.opacity, "1");
				assert.deepEqual(state.currentEffects, []);
			} else {
				assert.deepEqual(state.currentEffects, [{ replaced: true, state: "running" }]);
			}
			if (revision === 3) {
				assert.equal(previous, "DIV");
				assert.equal(state.tag, "SECTION");
				assert.equal(state.previousTargetEffects, 0);
			}
		}
		assert.deepEqual(errors, []);
	});
	await check("seek survives a live reduced-motion change and a timing rebuild", async () => {
		const errors = await fresh();
		await page.emulateMedia({ reducedMotion: "reduce" });
		await page.evaluate(() => {
			window.fixture.controller.seek(0.35);
			window.fixture.render("controlled-replacement");
		});
		await page.waitForFunction(() => window.fixture.controller.size === 1);
		assert.equal(await page.locator("#box").evaluate((el) => el.getAnimations().length), 0);

		await page.emulateMedia({ reducedMotion: "no-preference" });
		await page.waitForFunction(() => {
			const effect = document.querySelector("#box").getAnimations()[0];
			return effect?.playState === "paused" && effect.currentTime === 350;
		});
		await page.evaluate(() => window.fixture.render("controlled-replacement", 4));
		await page.waitForFunction(() => {
			const effect = document.querySelector("#box").getAnimations()[0];
			return effect?.playState === "paused" && effect.currentTime === 700;
		});
		assert.deepEqual(errors, []);
	});
	await check("direct image controllers wait and register replacement tiles", async () => {
		const errors = await fresh("controlled-image");
		await page.waitForFunction(() => window.fixture.controller.size === 4);
		assert.deepEqual(
			await page.locator("[data-motion-tile]").evaluateAll((tiles) =>
				tiles.flatMap((tile) => tile.getAnimations().map((effect) => effect.playState)),
			),
			Array(4).fill("paused"),
		);
		await page.evaluate(() => {
			void window.fixture.controller.play();
			window.fixture.render("controlled-image", 1);
		});
		await page.waitForFunction(() => window.fixture.controller.size === 9);
		assert.deepEqual(
			await page.locator("[data-motion-tile]").evaluateAll((tiles) =>
				tiles.flatMap((tile) => tile.getAnimations().map((effect) => effect.playState)),
			),
			Array(9).fill("running"),
		);
		await page.evaluate(() => window.fixture.unmount());
		assert.equal(await page.evaluate(() => window.fixture.controller.size), 0);
		assert.deepEqual(errors, []);
	});
	await check(
		"native reverse preserves the visible mid-flight value",
		async () => {
			await fresh("lifecycle");
			await page.waitForTimeout(150);
			const values = await page.evaluate(() => {
				const el = document.querySelector("#box");
				const before = Number(getComputedStyle(el).opacity);
				void window.fixture.controller.reverse();
				return [before, Number(getComputedStyle(el).opacity)];
			});
			assert.ok(Math.abs(values[0] - values[1]) < 0.08);
			await page.waitForTimeout(300);
			assert.ok(
				(await page.evaluate(() =>
					Number(getComputedStyle(document.querySelector("#box")).opacity),
				)) < 0.05,
			);
		},
	);
	await check("trigger changes reverse from current progress", async () => {
		await fresh("trigger");
		await page.waitForTimeout(70);
		await page.evaluate(() => window.fixture.render("trigger", 1));
		await page.waitForTimeout(250);
		assert.ok(
			(await page.evaluate(() =>
				Number(getComputedStyle(document.querySelector("#box")).opacity),
			)) < 0.01,
		);
		await page.evaluate(() => window.fixture.render("trigger", 2));
		await page.waitForFunction(
			() => document.querySelector("#box").getAnimations()[0]?.playbackRate === -1,
		);
		await page.evaluate(() => window.fixture.render("trigger", 3));
		await page.waitForFunction(
			() => document.querySelector("#box").getAnimations()[0]?.playbackRate === 1,
		);
	});
	await check("in-view entry waits for visibility", async () => {
		await fresh("inview");
		assert.equal(
			await page.evaluate(
				() => getComputedStyle(document.querySelector("#box")).opacity,
			),
			"0",
		);
		await page.locator("#box").scrollIntoViewIfNeeded();
		await page.waitForTimeout(150);
		assert.equal(
			await page.evaluate(
				() => getComputedStyle(document.querySelector("#box")).opacity,
			),
			"1",
		);
	});
	await check("shared chain preparation preserves stagger and native effects", async () => {
		const errors = await fresh("shared-chain");
		const delays = await page.locator("#shared-chain").evaluate((group) => {
			window.chainEffects = group.getAnimations({ subtree: true });
			return window.chainEffects.map((effect) => effect.effect.getTiming().delay);
		});
		assert.deepEqual(delays, [125, 250]);
		for (const revision of [1, 2, 3]) {
			await page.evaluate((value) => window.fixture.render("shared-chain", value), revision);
			await page.waitForFunction(
				(value) => document.querySelector("#shared-chain")?.dataset.revision === String(value),
				revision,
			);
			assert.equal(
				await page.locator("#shared-chain").evaluate((group) => {
					const effects = group.getAnimations({ subtree: true });
					return effects.length === window.chainEffects.length &&
						effects.every((effect, i) => effect === window.chainEffects[i]);
				}),
				true,
			);
		}
		assert.deepEqual(errors, []);
	});
	await check("Unicode text and per-item explicit delays", async () => {
		await fresh("text");
		assert.equal(
			await page.locator("#text > span").first().textContent(),
			"\u{1F468}\u200D\u{1F469}\u200D\u{1F466}\u00E9  a",
		);
		await fresh("chain");
		const times = await page.evaluate(() =>
			[...document.querySelector("#root").children].map(
				(el) => el.getAnimations()[0].effect.getTiming().delay,
			),
		);
		assert.deepEqual(times, [0, 300]);
	});
	await check(
		"image grid matches source and pointer movement causes no React commit",
		async () => {
			const errors = await fresh("image");
			await page.waitForSelector("[data-motion-tile]");
			const commits = await page.evaluate(() => window.fixture.metrics.commits);
			await page.locator('[data-motion-tile="0"]').hover();
			await page.waitForTimeout(250);
			assert.equal(
				await page.evaluate(() => window.fixture.metrics.commits),
				commits,
			);
			assert.equal(await page.locator("[data-motion-tile]").count(), 4);
			assert.equal(
				await page
					.locator('[data-motion-tile="3"]')
					.evaluate((el) => getComputedStyle(el).backgroundPosition),
				"100% 100%",
			);
			await page.evaluate(() => window.fixture.render("image", 1));
			await page.waitForTimeout(150);
			assert.match(
				await page
					.locator('[data-motion-tile="0"]')
					.evaluate((el) => el.style.backgroundImage),
				/blue/,
			);
			assert.deepEqual(errors, []);
		},
	);
	await check(
		"link waits for exits, preserves modified clicks, and cancels on unmount",
		async () => {
			await fresh("link");
			await page.waitForTimeout(180);
			await page.locator("#link").click();
			assert.deepEqual(
				await page.evaluate(() => window.fixture.metrics.navigations),
				[],
			);
			await page.waitForFunction(
				() => window.fixture.metrics.navigations.length === 1,
			);
			assert.deepEqual(
				await page.evaluate(() => window.fixture.metrics.navigations),
				["/destination"],
			);
			await fresh("link");
			await page.locator("#link").dispatchEvent("click", {
				button: 0,
				ctrlKey: true,
			});
			await page.waitForTimeout(200);
			assert.deepEqual(
				await page.evaluate(() => window.fixture.metrics.navigations),
				[],
			);
			await fresh("link-unmount");
			await page.locator("#link").click();
			await page.evaluate(() => window.fixture.unmount());
			await page.waitForTimeout(220);
			assert.deepEqual(
				await page.evaluate(() => window.fixture.metrics.navigations),
				[],
			);
		},
	);
	await check(
		"hydration preserves server content without mismatch diagnostics",
		async () => {
			const errors = await fresh();
			const html = renderToString(
				createElement(
					MotionContainer,
					{
						animation: {
							mode: "fadeIn",
							duration: 1,
						},
					},
					"Hydrated",
				),
			);
			await page.evaluate((html) => window.fixture.hydrate(html), html);
			await page.waitForTimeout(100);
			assert.deepEqual(errors, []);
		},
	);
	await check(
		"reduced motion shows destination immediately and stops the gallery",
		async () => {
			await fresh();
			await page.emulateMedia({
				reducedMotion: "reduce",
			});
			await page.evaluate(() => window.fixture.render("lifecycle"));
			await page.waitForTimeout(100);
			assert.equal(
				await page.evaluate(
					() => getComputedStyle(document.querySelector("#box")).opacity,
				),
				"1",
			);
			await page.evaluate(() => window.fixture.render("movie"));
			await page.waitForTimeout(500);
			assert.equal(
				await page.evaluate(() =>
					window.fixture.metrics.indices.some((i) => i !== 0),
				),
				false,
			);
		},
	);
	await check(
		"scroll seeking follows document progress and disposes cleanly",
		async () => {
			await fresh();
			const value = await page.evaluate(() => {
				const el = document.createElement("div");
				document.body.append(el);
				document.body.style.height = "3000px";
				const h = window.fixture.animateElement(
					el,
					window.fixture.animations.fadeIn,
					{
						autoplay: false,
						easing: "linear",
					},
				);
				const dispose = window.fixture.bindScroll(el, h, {
					mode: "document",
				});
				window.scrollTo(0, 1000);
				return new Promise((resolve) =>
					requestAnimationFrame(() =>
						requestAnimationFrame(() => {
							const value = Number(getComputedStyle(el).opacity);
							dispose();
							h.dispose();
							resolve(value);
						}),
					),
				);
			});
			assert.ok(value > 0 && value < 1);
		},
	);
	mkdirSync("tests/out", {
		recursive: true,
	});
	writeFileSync(
		"tests/out/browser-results.json",
		JSON.stringify(
			{
				browser: await browser.version(),
				passed: results.length,
				failed: failures.length,
				tests: results,
				failures,
			},
			null,
			2,
		) + "\n",
	);
	console.log(
		`\n${results.length} passed, ${failures.length} failed${
			failures.length ? `\n${failures.map((f) => `  - ${f.name}`).join("\n")}` : ""
		}`,
	);
	if (failures.length) process.exitCode = 1;
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	await context?.close();
	await browser?.close();
	await new Promise((resolve) => server.close(resolve));
}

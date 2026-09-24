import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { chromium, firefox, webkit } from "playwright";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { MotionContainer } from "../../dist/index.js";

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
	await fn();
	results.push(name);
	console.log(`PASS ${name}`);
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
	await check("Unicode text and per-item explicit delays", async () => {
		await fresh("text");
		assert.equal(
			await page.locator("#text > span").first().textContent(),
			"👨‍👩‍👦é  a",
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
		"gallery completes fractional entry, hold, and exit cycles",
		async () => {
			const errors = await fresh("movie");
			await page.waitForFunction(
				() => window.fixture.metrics.indices.includes(1),
				{
					timeout: 3000,
				},
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
	mkdirSync("docs", {
		recursive: true,
	});
	writeFileSync(
		"docs/browser-results.json",
		JSON.stringify(
			{
				browser: await browser.version(),
				passed: results.length,
				tests: results,
			},
			null,
			2,
		) + "\n",
	);
} catch (error) {
	console.error(error);
	process.exitCode = 1;
} finally {
	await context?.close();
	await browser?.close();
	await new Promise((resolve) => server.close(resolve));
}

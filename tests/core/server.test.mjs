import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import {
	MotionChain,
	MotionContainer,
	MotionImage,
	MotionLink,
	MotionMovie,
	MotionText,
} from "../../dist/index.js";

test("all public components render without window/document and keep content visible", () => {
	assert.equal(typeof window, "undefined");
	const html = renderToString(
		createElement(
			"main",
			null,
			createElement(
				MotionContainer,
				{
					animation: {
						mode: "fadeIn",
					},
					id: "box",
				},
				"Hello",
			),
			createElement(
				MotionText,
				{
					animation: {
						mode: "fadeUp",
					},
					elementType: "h1",
				},
				"👋 Hello",
			),
			createElement(
				MotionChain,
				{
					animation: {
						mode: "fadeIn",
					},
				},
				"One",
				"Two",
			),
			createElement(MotionImage, {
				animation: {
					mode: "fadeIn",
				},
				config: {
					img: "/photo.svg",
					pieces: 4,
				},
				alt: "Photo",
			}),
			createElement(MotionMovie, {
				animations: {
					enter: "fadeIn",
					exit: "fadeOut",
				},
				config: {
					images: ["/one.svg", "/two.svg"],
					pieces: 4,
					animationDuration: 0.25,
				},
			}),
			createElement(
				MotionLink,
				{
					href: "/next",
				},
				"Next",
			),
		),
	);
	assert.match(html, /Hello/);
	assert.match(html, /alt="Photo"/);
	assert.doesNotMatch(html, /style="opacity:0"/);
});
test("ESM exports preserve client boundaries and runtime has no dependencies", () => {
	const pkg = JSON.parse(
		readFileSync(new URL("../package.json", import.meta.url)),
	);
	assert.deepEqual(pkg.dependencies, {});
	assert.equal(pkg.sideEffects, false);
	for (const name of [
		"motion",
		"motion-container",
		"motion-text",
		"motion-chain",
		"motion-image",
		"motion-movie",
		"motion-link",
	]) {
		assert.match(
			readFileSync(
				new URL(`../dist/components/${name}.js`, import.meta.url),
				"utf8",
			),
			/^['"]use client['"];/,
		);
	}
	assert.doesNotMatch(
		readFileSync(new URL("../dist/config.js", import.meta.url), "utf8"),
		/from ['"]react|use client/,
	);
});

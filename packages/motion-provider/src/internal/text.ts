import { invariant } from "../engine/errors.js";
/** Split graphemes (emoji/combining sequences stay whole), preserving all whitespace. */
export function splitText(
	text: string,
	mode: "chars" | "words" = "chars",
): string[] {
	invariant(
		typeof text === "string",
		"INVALID_TEXT",
		"MotionText children must be a string.",
	);
	invariant(
		mode === "chars" || mode === "words",
		"INVALID_TEXT_MODE",
		"Text mode must be chars or words.",
	);

	if (mode === "words") return text.match(/\s+|\S+/gu) ?? [];
	if (typeof Intl.Segmenter === "function")
		return Array.from(
			new Intl.Segmenter("en", {
				granularity: "grapheme",
			}).segment(text),
			(item) => item.segment,
		);

	return Array.from(text);
}

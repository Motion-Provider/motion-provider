/**
 * @description Motion Provider Error Boundary
 */
export class MotionError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		options?: ErrorOptions,
	) {
		super(`[Motion Provider: ${code}] Oops, ${message}`, options);
		this.name = "MotionError";
	}
}

export function invariant(
	condition: unknown,
	code: string,
	message: string,
): asserts condition {
	if (!condition) throw new MotionError(code, message);
}
export function finite(value: number, label: string, min = -Infinity): number {
	invariant(
		Number.isFinite(value) && value >= min,
		"INVALID_NUMBER",
		`${label} must be finite and >= ${min}; received ${value}.`,
	);
	return value;
}

/** Runtime capability errors */
export function report(error: unknown, handler?: (error: Error) => void): void {
	const resolved = error instanceof Error ? error : new Error(String(error));
	if (handler) handler(resolved);
	else console.error(resolved);
}

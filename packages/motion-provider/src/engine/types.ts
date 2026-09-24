/** CSS values are interpolated by the browser. Arrays describe evenly spaced keyframes. */
export type MotionValue = string | number;
export type MotionState = Readonly<
	Record<string, MotionValue | readonly MotionValue[]>
>;
export type Easing = string | readonly [number, number, number, number];
export type ErrorHandler = (error: Error) => void;
export type ControlAction =
	| "play"
	| "reverse"
	| "pause"
	| "finish"
	| "reset"
	| "cancel";

export interface AnimationModule {
	readonly initial: MotionState;
	readonly animate: MotionState;
}

/** Public timing uses seconds; only the engine converts to WAAPI milliseconds. */
export interface Timing {
	duration?: number;
	delay?: number;
	endDelay?: number;
	easing?: Easing;
	/** Compatibility spelling for easing. */
	ease?: Easing;
	iterations?: number;
	direction?: PlaybackDirection;
	fill?: FillMode;
}

export interface AnimationResult {
	status: "finished" | "cancelled";
}

/** An owned animation. Dispose cancels it and restores the underlying DOM styles. */
export interface AnimationHandle {
	readonly finished: Promise<AnimationResult>;
	readonly playState: AnimationPlayState;
	readonly duration: number;
	/** Current local timeline time in seconds. */
	readonly currentTime: number;
	/** Full effect time including delay/repeats/endDelay, in seconds. */
	readonly totalDuration: number;
	play(): Promise<AnimationResult>;
	reverse(fromTime?: number): Promise<AnimationResult>;
	pause(): void;
	finish(): void;
	cancel(): void;
	reset(): void;
	seek(progress: number): void;
	setPlaybackRate(rate: number): void;
	dispose(): void;
}

export interface AnimateOptions extends Timing {
	autoplay?: boolean;
	reducedMotion?: "user" | "always" | "never";
	onError?: ErrorHandler;
	onFinish?: (result: AnimationResult) => void;
}

export interface ViewOptions {
	amount?: number | "some" | "all";
	once?: boolean;
	margin?: string;
	root?: Element | null;
}

/** View progress: leading edge entering → trailing edge leaving. Document progress: scroll range. */
export interface ScrollOptions {
	source?: Element | null;
	target?: Element | null;
	axis?: "x" | "y";
	mode?: "view" | "document";
	start?: number;
	end?: number;
}

/** Store used directly by components; commands do not require a React render. */
export interface AnimationController {
	register(handle: AnimationHandle): () => void;
	subscribe(listener: () => void): () => void;
	getSnapshot(): ControlAction | undefined;
	play(): Promise<AnimationResult[]>;
	reverse(): Promise<AnimationResult[]>;
	pause(): void;
	finish(): void;
	reset(): void;
	cancel(): void;
	seek(progress: number): void;
	setPlaybackRate(rate: number): void;
	readonly size: number;
	readonly onReverse: () => Promise<AnimationResult[]>;
	readonly onStop: () => void;
	readonly control: AnimationController;
}

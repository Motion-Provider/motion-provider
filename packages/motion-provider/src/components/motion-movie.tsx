"use client";

import {
	forwardRef,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { isController } from "../engine/controller.js";
import { finite, invariant } from "../engine/errors.js";
import { useLatest } from "../hooks/use-latest.js";
import { useReducedMotion } from "../hooks/use-reduced-motion.js";
import type { MotionMovieProps } from "../types.js";
import { MotionImage } from "./motion-image.js";

const noopSubscribe = () => () => {},
	emptySnapshot = () => undefined;
/**
 * Gallery lifecycle: load → enter all tiles → hold → exit all tiles → next image.
 * Hold time is config.animationDuration in seconds. No rounded interval ticks. Pausing
 * suspends the cycle (resuming restarts the hold); reduced motion shows a static first slide.
 * A single image enters once. Failed images are skipped; failure of all images stops cycling.
 */
export const MotionMovie = forwardRef<HTMLDivElement, MotionMovieProps>(
	function MotionMovie(
		{
			animations,
			config,
			controller,
			prefetch = false,
			onIndexChange,
			onLoad,
			onError,
			reducedMotion,
			...props
		}: MotionMovieProps,
		forwardedRef,
	) {
		invariant(
			config?.images?.length &&
				config.images.every((src) => typeof src === "string" && src.length),
			"MOVIE_IMAGES",
			"config.images must contain nonempty URLs.",
		);
		finite(config.animationDuration, "animationDuration", 0.001);
		invariant(
			animations?.enter && animations?.exit,
			"MOVIE_MODES",
			"Provide enter and exit modes.",
		);
		invariant(
			animations.iterations !== Infinity,
			"MOVIE_ITERATIONS",
			"Gallery transitions require finite iterations.",
		);
		const signature = JSON.stringify(config.images);
		const [frame, setFrame] = useState({
			index: 0,
			phase: "enter" as "enter" | "hold" | "exit",
			signature,
		});
		const current =
			frame.signature === signature
				? frame
				: {
						index: 0,
						phase: "enter" as const,
						signature,
					};
		const failed = useRef(new Set<string>()),
			callbacks = useLatest({
				onIndexChange,
				onError,
				onLoad,
			});
		const index = Math.min(current.index, config.images.length - 1),
			phase = current.phase;
		const controls = isController(controller)
			? controller
			: controller?.controls;
		const action = useSyncExternalStore(
			controls?.subscribe ?? noopSubscribe,
			controls?.getSnapshot ?? emptySnapshot,
			emptySnapshot,
		);
		const preference = useReducedMotion();
		const reduce =
			reducedMotion === "always" || (reducedMotion !== "never" && preference);
		const paused =
			(!!action && action !== "play") ||
			(!isController(controller) &&
				(controller?.isAnimationStopped || controller?.trigger === false));
		useEffect(() => {
			callbacks.current.onIndexChange?.(index);
		}, [index, signature, callbacks]);
		useEffect(() => {
			failed.current.clear();
		}, [signature]);
		useEffect(() => {
			if (!prefetch) return;
			const urls = JSON.parse(signature) as string[];
			const loaders = urls.map((src) => {
				const img = new Image();
				img.decoding = "async";
				img.src = src;
				return img;
			});
			return () => {
				for (const img of loaders) {
					img.onload = null;
					img.onerror = null;
				}
			};
		}, [signature, prefetch]);
		useEffect(() => {
			if (phase !== "hold" || paused || reduce || config.images.length < 2)
				return;
			const timer = setTimeout(
				() =>
					setFrame({
						index,
						phase: "exit",
						signature,
					}),
				config.animationDuration * 1000,
			);
			return () => clearTimeout(timer);
		}, [
			phase,
			index,
			signature,
			paused,
			reduce,
			config.animationDuration,
			config.images.length,
		]);
		const next = (skipFailed = false) => {
			if ((!skipFailed && reduce) || config.images.length < 2) return;
			for (let offset = 1; offset <= config.images.length; offset++) {
				const candidate = (index + offset) % config.images.length;
				if (!failed.current.has(config.images[candidate]!)) {
					setFrame({
						index: candidate,
						phase: "enter",
						signature,
					});
					return;
				}
			}
		};
		const { enter, exit, ...timing } = animations;
		return (
			<MotionImage
				{...props}
				ref={forwardedRef}
				key={`${signature}:${index}`}
				animation={{
					...timing,
					mode: phase === "exit" ? exit : enter,
				}}
				config={{
					...config,
					img: config.images[index]!,
				}}
				controller={
					controller ?? {
						trigger: true,
					}
				}
				reducedMotion={reducedMotion}
				onLoad={(event) => callbacks.current.onLoad?.(event)}
				onError={(event) => {
					failed.current.add(config.images[index]!);
					callbacks.current.onError?.(event);
					next(true);
				}}
				onMotionComplete={(result) => {
					if (result.status !== "finished" || paused || reduce) return;
					if (phase === "enter")
						setFrame({
							index,
							phase: "hold",
							signature,
						});
					else if (phase === "exit") next();
				}}
			/>
		);
	},
);

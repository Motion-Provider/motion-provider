"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { invariant } from "../engine/errors.js";
import { useImageGrid } from "../hooks/use-image-grid.js";
import type { MotionImageProps } from "../types.js";
/**
 * Display a responsive semantic image and an N×N grid of background slices. The real img
 * honors loading/srcSet/sizes and reserves layout; tiles use its selected currentSrc.
 * Hover/click reveals a 3×3 neighborhood without React renders. Enter/Space reveals all.
 * Supply dimensions/aspectRatio for stable layout, especially for lazy-loaded images.
 */
export const MotionImage = forwardRef<HTMLDivElement, MotionImageProps>(
	function MotionImage(
		{
			animation,
			config,
			controller,
			reducedMotion,
			onMotionError,
			onMotionComplete,
			wrapperClassName,
			className,
			fallback,
			alt = "",
			loading = "eager",
			decoding = "async",
			fetchPriority,
			crossOrigin,
			referrerPolicy,
			sizes,
			srcSet,
			draggable,
			onLoad,
			onError,
			style,
			...dom
		},
		forwardedRef,
	) {
		invariant(
			typeof config?.img === "string" && config.img.length > 0,
			"IMAGE_SOURCE",
			"config.img must be a nonempty URL.",
		);
		invariant(
			Number.isInteger(Math.sqrt(config.pieces)) &&
				config.pieces > 0 &&
				config.pieces <= 1600,
			"IMAGE_PIECES",
			"pieces must be a positive perfect square <= 1600.",
		);
		invariant(
			!config.fn || config.fn === "hover" || config.fn === "click",
			"IMAGE_INTERACTION",
			"config.fn must be hover or click.",
		);
		const imageRef = useRef<HTMLImageElement | null>(null),
			gridRef = useRef<HTMLDivElement | null>(null);
		const [loaded, setLoaded] = useState<{
			request: string;
			source: string;
		} | null>(null);
		const request = JSON.stringify([
			config.img,
			srcSet,
			sizes,
			crossOrigin,
			referrerPolicy,
		]);
		const ready = loaded?.request === request;
		useEffect(() => {
			const img = imageRef.current;
			if (img?.complete && img.naturalWidth > 0)
				setLoaded({
					request,
					source: img.currentSrc || img.src,
				});
		}, [request]);
		const source = ready ? loaded.source : config.img;
		const reveal = useImageGrid(gridRef, ready, {
			animation,
			config: {
				...config,
				img: source,
			},
			controller,
			reducedMotion,
			onMotionError,
			onMotionComplete,
		});
		const columns = Math.sqrt(config.pieces);
		return (
			<div
				{...dom}
				ref={forwardedRef}
				className={wrapperClassName}
				style={{
					position: "relative",
					...style,
				}}
			>
				<img
					key={request}
					ref={imageRef}
					src={config.img}
					alt={alt}
					loading={loading}
					decoding={decoding}
					fetchPriority={fetchPriority}
					crossOrigin={crossOrigin}
					referrerPolicy={referrerPolicy}
					sizes={sizes}
					srcSet={srcSet}
					draggable={draggable}
					style={{
						display: "block",
						width: "100%",
						height: "100%",
						objectFit: "fill",
						opacity: ready ? 0 : 1,
					}}
					onLoad={(event) => {
						const img = event.currentTarget;
						setLoaded({
							request,
							source: img.currentSrc || img.src,
						});
						onLoad?.(event);
					}}
					onError={(event) => {
						setLoaded(null);
						onError?.(event);
					}}
				/>
				{!ready && fallback}
				<div
					ref={gridRef}
					aria-hidden="true"
					data-motion-grid=""
					style={{
						position: "absolute",
						inset: 0,
						display: "grid",
						gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`,
						gridTemplateRows: `repeat(${columns},minmax(0,1fr))`,
						gap: 0,
						pointerEvents: config.fn ? "auto" : "none",
					}}
					onPointerMove={
						config.fn === "hover"
							? (event) => {
									const tile = (event.target as Element).closest<HTMLElement>(
										"[data-motion-tile]",
									);
									if (tile) reveal(Number(tile.dataset.motionTile));
								}
							: undefined
					}
					onClick={
						config.fn === "click"
							? (event) => {
									const tile = (event.target as Element).closest<HTMLElement>(
										"[data-motion-tile]",
									);
									if (tile) reveal(Number(tile.dataset.motionTile));
								}
							: undefined
					}
				>
					{ready &&
						Array.from(
							{
								length: config.pieces,
							},
							(_, i) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: static index, safe calm chill bro
									key={i}
									data-motion-tile={i}
									className={className}
									style={{
										minWidth: 0,
										minHeight: 0,
										backgroundImage: `url(${JSON.stringify(source)})`,
										backgroundSize: `${columns * 100}% ${columns * 100}%`,
										backgroundRepeat: "no-repeat",
										backgroundPosition: `${columns > 1 ? ((i % columns) * 100) / (columns - 1) : 0}% ${columns > 1 ? (Math.floor(i / columns) * 100) / (columns - 1) : 0}%`,
									}}
								/>
							),
						)}
				</div>
				{config.fn && (
					<button
						type="button"
						aria-label={`Reveal ${alt || "image"}`}
						onClick={() => {
							for (let i = 0; i < config.pieces; i++) reveal(i);
						}}
						style={{
							position: "absolute",
							bottom: 8,
							right: 8,
						}}
					>
						Reveal image
					</button>
				)}
			</div>
		);
	},
);

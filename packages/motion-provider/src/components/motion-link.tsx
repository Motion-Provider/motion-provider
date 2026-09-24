"use client";

import { forwardRef, useEffect, useRef } from "react";
import { finite, MotionError, report } from "../engine/errors.js";
import { wait } from "../internal/wait.js";
import type { MotionLinkProps } from "../types.js";
/**
 * Reverse registered animations, await their real completion, then navigate. Modified clicks,
 * downloads, alternate targets, and external URLs preserve normal anchor behavior. Pending
 * navigation is aborted on unmount; repeated clicks share one exit. Supply navigate for a router.
 */
export const MotionLink = forwardRef<HTMLAnchorElement, MotionLinkProps>(
	function MotionLink(
		{
			href,
			controller,
			onReverse,
			timer = 0,
			timeout = 10000,
			navigate,
			onMotionError,
			onClick,
			children,
			...props
		},
		ref,
	) {
		finite(timer, "timer", 0);
		finite(timeout, "timeout", 0);
		const pending = useRef<AbortController | null>(null);
		useEffect(
			() => () => {
				pending.current?.abort();
				pending.current = null;
			},
			[],
		);
		return (
			<a
				{...props}
				ref={ref}
				href={href}
				onClick={async (event) => {
					onClick?.(event);
					const anchor = event.currentTarget;
					if (
						event.defaultPrevented ||
						event.button !== 0 ||
						event.metaKey ||
						event.ctrlKey ||
						event.shiftKey ||
						event.altKey ||
						anchor.hasAttribute("download") ||
						(props.target && props.target !== "_self")
					)
						return;
					const url = new URL(anchor.href, window.location.href);
					if (
						url.origin !== window.location.origin ||
						!["http:", "https:"].includes(url.protocol)
					)
						return;
					if (!controller && !onReverse) return;
					event.preventDefault();
					if (pending.current) return;
					const abort = new AbortController();
					pending.current = abort;
					let expired = false;
					try {
						const exit = Promise.all([
							controller?.reverse(),
							onReverse?.(),
							wait(timer, abort.signal),
						]);
						await Promise.race([
							exit,
							wait(timeout, abort.signal).then(() => {
								expired = !abort.signal.aborted;
							}),
						]);
						if (abort.signal.aborted) return;
						if (expired)
							report(
								new MotionError(
									"EXIT_TIMEOUT",
									"Exit exceeded timeout; navigating to the requested destination.",
								),
								onMotionError,
							);
						if (navigate) await navigate(href);
						else window.location.assign(href);
					} catch (error) {
						if (!abort.signal.aborted) report(error, onMotionError);
					} finally {
						abort.abort();
						if (pending.current === abort) pending.current = null;
					}
				}}
			>
				{children}
			</a>
		);
	},
);

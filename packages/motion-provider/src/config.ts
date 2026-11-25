import { invariant } from "./engine/errors.js";

export type MotionConfig = Record<string, MotionPhase>;

import type {
  MotionChainProps,
  MotionContainerProps,
  MotionImageProps,
  MotionLinkProps,
  MotionTextProps,
} from "./types.js";

export type MotionComponentPropsMap = {
  MotionContainer: MotionContainerProps;
  MotionChain: Omit<MotionChainProps, "children">;
  MotionText: Omit<MotionTextProps, "children">;
  MotionImage: Omit<MotionImageProps, "config"> & {
    config: Omit<MotionImageProps["config"], "img"> & {
      img?: string;
    };
  };
  MotionLink: MotionLinkProps;
};

export type MotionPhase = {
  [K in keyof MotionComponentPropsMap]: {
    type: K;
    props: Omit<MotionComponentPropsMap[K], "children">;
  };
}[keyof MotionComponentPropsMap];

/** Preserve exact keys and props. This module is safe in React Server Components and Node. */
export function createMotionConfig<const T extends MotionConfig>(config: T): T {
  return config;
}
/**
 * Bind a typed getter to your app's config. Export this result as getAnimation from
 * one local communication file. No global registration, filesystem discovery, or request leaks.
 */
export function createMotionRegistry<const T extends MotionConfig>(config: T) {
  return {
    config,
    getAnimation<K extends keyof T>(key: K): T[K]["props"] {
      const phase = Object.hasOwn(config, key) ? config[key] : undefined;
      invariant(
        phase,
        "UNKNOWN_CONFIG_KEY",
        `Motion config has no key "${String(key)}".`,
      );
      return phase.props;
    },
  };
}
/** A convenient function-only form of createMotionRegistry. */
export function createMotionGetter<const T extends MotionConfig>(config: T) {
  return createMotionRegistry(config).getAnimation;
}
/** Explicit two-argument access when a bound local getter is unnecessary. */
export function getAnimation<const T extends MotionConfig, K extends keyof T>(
  config: T,
  key: K,
): T[K]["props"] {
  return createMotionRegistry(config).getAnimation(key);
}

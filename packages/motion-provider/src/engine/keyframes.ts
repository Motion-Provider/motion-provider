import { invariant } from "./errors.js";
import type { AnimationModule, MotionState, MotionValue } from "./types.js";

const transforms: Record<string, [string, string, number]> = {
  x: ["translateX", "px", 0],
  y: ["translateY", "px", 0],
  z: ["translateZ", "px", 0],
  scale: ["scale", "", 1],
  scaleX: ["scaleX", "", 1],
  scaleY: ["scaleY", "", 1],
  scaleZ: ["scaleZ", "", 1],
  rotate: ["rotate", "deg", 0],
  rotateX: ["rotateX", "deg", 0],
  rotateY: ["rotateY", "deg", 0],
  rotateZ: ["rotateZ", "deg", 0],
  skewX: ["skewX", "deg", 0],
  skewY: ["skewY", "deg", 0],
  perspective: ["perspective", "px", 0],
};

const lengths =
  /^(width|height|minWidth|minHeight|maxWidth|maxHeight|top|right|bottom|left|margin.*|padding.*|border.*Width|border.*Radius|fontSize|letterSpacing|wordSpacing|textIndent|outlineWidth|gap|rowGap|columnGap)$/;

const cssValue = (key: string, value: MotionValue): MotionValue =>
  typeof value === "number" && lengths.test(key) ? `${value}px` : value;

function values(value: MotionState[string]): readonly MotionValue[] {
  const out = Array.isArray(value) ? value : [value];
  invariant(
    out.length &&
      out.every(
        (v) =>
          typeof v === "string" ||
          (typeof v === "number" && Number.isFinite(v)),
      ),
    "INVALID_KEYFRAMES",
    "Keyframes must contain finite numbers or CSS strings.",
  );
  return out as readonly MotionValue[];
}

/** Last mode wins for duplicate properties, matching the attached source's mixing semantics. */
export function mixAnimations(
  modules: AnimationModule | readonly AnimationModule[],
): AnimationModule {
  const list = Array.isArray(modules) ? modules : [modules];

  invariant(list.length > 0, "EMPTY_MODES", "Provide at least one animation.");

  const initial: Record<string, MotionState[string]> = {},
    animate: Record<string, MotionState[string]> = {};

  for (const module of list) {
    invariant(
      module?.initial && module?.animate,
      "INVALID_ANIMATION",
      "An animation needs initial and animate objects.",
    );

    Object.assign(initial, module.initial);
    Object.assign(animate, module.animate);
  }

  return {
    initial,
    animate,
  };
}

function interpolate(
  track: readonly MotionValue[],
  progress: number,
  unit: string,
): string {
  const i = progress * (track.length - 1),
    left = Math.floor(i),
    right = Math.ceil(i);

  const a = track[left],
    b = track[right];

  if (typeof a === "undefined" || typeof b === "undefined") {
    invariant(false, "UNDEFINED_KEYFRAME", "Undefined keyframe.");
  }

  const normalize = (v: MotionValue) =>
    typeof v === "number" ? `${v}${unit}` : v;

  if (left === right || a === b) return normalize(a);

  const re = /^(-?(?:\d+\.?\d*|\.\d+))([a-z%]*)$/i;

  const aa = re.exec(normalize(a)),
    bb = re.exec(normalize(b));

  invariant(
    aa && bb && (aa[2] === bb[2] || Number(aa[1]) === 0 || Number(bb[1]) === 0),
    "TRANSFORM_UNITS",
    "Mixed transform tracks need compatible numeric units. Use explicit transform keyframes for complex CSS expressions.",
  );
  const u = Number(aa[1]) === 0 ? bb[2] : aa[2];
  return `${Number(aa[1]) + (Number(bb[1]) - Number(aa[1])) * (i - left)}${u}`;
}

export interface CompiledAnimation {
  frames: PropertyIndexedKeyframes;
  initial: Record<string, MotionValue>;
  final: Record<string, MotionValue>;
  transformOffsets?: number[];
}

/** Compile independent property tracks; transform aliases are composed in a fixed order. */
export function compileAnimation(module: AnimationModule): CompiledAnimation {
  invariant(
    module?.initial && module?.animate,
    "INVALID_ANIMATION",
    "Provide initial and animate objects.",
  );

  const tracks: Record<string, readonly MotionValue[]> = {};

  for (const key of new Set([
    ...Object.keys(module.initial),
    ...Object.keys(module.animate),
  ])) {
    const from = module.initial[key],
      to = module.animate[key];

    if (typeof from === "undefined" && typeof to === "undefined") {
      invariant(
        false,
        "UNDEFINED_KEYFRAME",
        "Animation state cannot be 'undefined'",
      );
    }

    // Array targets explicitly describe the whole track, as in the original presets.
    tracks[key] =
      to === undefined
        ? [values(from as MotionValue)[0]!, values(from!)[0]!]
        : Array.isArray(to)
          ? values(to).length === 1
            ? [values(to)[0]!, values(to)[0]!]
            : values(to)!
          : [
              from === undefined ? (to as MotionValue) : values(from)[0]!,
              to as MotionValue,
            ];
  }

  let transformOffsets: number[] | undefined;
  const aliasKeys = Object.keys(transforms).filter((key) => key in tracks);

  if (aliasKeys.length && !tracks.transform) {
    const offsets = new Set([0, 1]);

    for (const key of aliasKeys)
      tracks[key]!.forEach((_, i, a) => {
        offsets.add(a.length > 1 ? i / (a.length - 1) : 0);
      });

    const positions = [...offsets].sort((a, b) => a - b);
    const transformValues = positions.map((p) =>
      aliasKeys
        .map((key) => {
          const [fn, unit] = transforms[key]!;
          return `${fn}(${interpolate(tracks[key]!, p, unit)})`;
        })
        .join(" "),
    );

    tracks.transform = transformValues;
    transformOffsets = positions;
  }

  const frames: PropertyIndexedKeyframes = {},
    initial: Record<string, MotionValue> = {},
    final: Record<string, MotionValue> = {};

  for (const [key, track] of Object.entries(tracks)) {
    if (key in transforms) continue;
    const normalized = track.map((v) => cssValue(key, v));
    frames[key] = normalized.map(String);
    initial[key] = normalized[0]!;
    final[key] = normalized.at(-1)!;
  }

  return {
    frames,
    initial,
    final,
    transformOffsets,
  };
}

/** Preserve independently spaced property tracks when transform aliases have unequal lengths. */
export function compileTracks(
  compiled: CompiledAnimation,
): (PropertyIndexedKeyframes | Keyframe[])[] {
  const offsets = compiled.transformOffsets;

  if (!offsets) return [compiled.frames];

  const { transform, ...rest } = compiled.frames;
  const result: (PropertyIndexedKeyframes | Keyframe[])[] = [];

  if (Object.keys(rest).length) result.push(rest);

  result.push(
    offsets.map((offset, i) => ({
      offset,
      transform: (transform as string[])[i],
    })),
  );

  return result;
}

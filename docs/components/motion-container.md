---
title: "MotionContainer"
description: "Animate a single HTML or SVG element with named presets, composed modules, and controlled playback."
order: 320
draft: true
---

**Use `MotionContainer` when one element needs a preset-driven entrance, exit, or state transition.** It resolves named animation presets, combines them into one definition, and delegates playback to Motion Provider's WAAPI engine.

The component renders a native HTML or SVG element and forwards its regular DOM props. It owns its client boundary, so it can also be rendered from a React Server Component.

## Basic usage

Import the component from the package root and provide an `animation` object. The `mode` field is required.

```tsx
import { MotionContainer } from "motion-provider";

export function Intro() {
  return (
    <MotionContainer
      elementType="section"
      className="rounded-xl p-6"
      animation={{
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.8,
      }}
    >
      <h2>Interfaces that move.</h2>
      <p>One element, composed from two presets.</p>
    </MotionContainer>
  );
}
```

By default, the component renders a `div`. Set `elementType` when the semantic element should be something else, such as `section`, `article`, `button`, `svg`, or `path`.

## Define the animation

The `mode` field accepts a built-in preset name, an `AnimationModule`, or an array containing either. A module describes the element's starting and destination styles:

```tsx
import {
  MotionContainer,
  type AnimationModule,
} from "motion-provider";

const tint = {
  initial: { filter: "hue-rotate(90deg)" },
  animate: { filter: "hue-rotate(0deg)" },
} as const satisfies AnimationModule;

export function AnimatedCard() {
  return (
    <MotionContainer
      className="rounded-xl p-6"
      animation={{
        mode: ["fadeUp", "scaleZoomIn", tint],
        transition: "gentle",
      }}
    >
      Custom and built-in motion, together.
    </MotionContainer>
  );
}
```

When you provide an array, Motion Provider merges the modules in order. Later modules take precedence when they define the same CSS property; properties that do not overlap are retained. This lets you combine independent effects without creating a new preset for every combination.

### Timing

Use `transition` to select a named timing preset or pass a `Timing` object directly. The default transition is `default`. Any timing fields provided alongside `transition` override the corresponding preset values.

| Field | Purpose |
| --- | --- |
| `transition` | Named transition or inline timing object |
| `duration` | Animation duration |
| `delay`, `endDelay` | Time before and after the active animation |
| `easing` / `ease` | Easing curve; accepts a string or cubic-bezier tuple |
| `iterations` | Number of repetitions |
| `direction` | Playback direction |
| `fill` | How styles apply outside the active interval |

All timing values use **seconds**. For example, `duration: 0.8` means 800 milliseconds.

<Callout type="note" title="Transitions are timing presets, not animation modules">
  `transition` controls duration and easing. It does not change the CSS properties being animated. Use `mode` to choose or compose those properties.
</Callout>

## Control when it plays

Without a `controller` prop, `MotionContainer` observes the element with `IntersectionObserver`. Playback starts when at least **50% of the element is visible**, and the animation runs once.

Pass a declarative controller object to change that behavior:

```tsx
<MotionContainer
  animation={{ mode: "fadeUp", duration: 0.6 }}
  controller={{
    configView: {
      amount: 0.25,
      once: false,
      margin: "0px 0px -10% 0px",
    },
  }}
>
  Replays as the element enters the viewport.
</MotionContainer>
```

| Controller field | Behavior |
| --- | --- |
| `configView` | Configures the visibility threshold, repeat behavior, root margin, and optional observer root |
| `trigger` | Plays or reverses from a boolean value instead of observing visibility |
| `reverse` | Reverses the direction used by the in-view driver |
| `scroll` | Scrubs animation progress from scroll position |
| `isAnimationStopped` | Finishes the animation immediately |
| `controls` | Attaches an imperative controller to a declarative driver |

For event-driven playback, create a controller with `useController()` inside a Client Component:

```tsx
"use client";

import { MotionContainer, useController } from "motion-provider";

export function ControlledPanel() {
  const controller = useController();

  return (
    <div>
      <MotionContainer
        animation={{ mode: "fadeUp" }}
        controller={controller}
      >
        Controlled content
      </MotionContainer>

      <button type="button" onClick={() => void controller.play()}>
        Play
      </button>
      <button type="button" onClick={() => controller.reset()}>
        Reset
      </button>
    </div>
  );
}
```

<Callout type="warning" title="Imperative controllers disable the in-view trigger">
  Passing the controller returned by `useController()` makes playback command-driven. The element waits for a controller method such as `play()`; it does not also enter automatically when visible. Use a declarative controller with `controls` when you need both an in-view driver and imperative commands.
</Callout>

## Component props

`MotionContainerProps` extends the standard HTML attributes and the supported SVG attributes, so `className`, `style`, accessibility attributes, event handlers, and other native props can be passed directly.

| Prop | Description |
| --- | --- |
| `animation` | Required preset, module, or array of modules with optional timing |
| `elementType` | Native HTML or SVG tag to render; defaults to `div` |
| `controller` | Declarative playback options or an `AnimationController` instance |
| `reducedMotion` | `"user"` (default), `"always"`, or `"never"` |
| `onMotionComplete` | Receives an `AnimationResult` with `status: "finished" \| "cancelled"` |
| `onMotionError` | Receives an animation runtime error |
| `ref` | Forwarded to the rendered HTML or SVG element |

Animation-owned CSS properties take precedence over matching properties in `style` while the animation is mounted.

<Callout type="warning" title="Use intrinsic elements">
  `elementType` accepts native HTML and SVG tag names, not React components. To animate a custom component, render it inside a native wrapper and pass the animation to that wrapper.
</Callout>

## Rendering and accessibility

`MotionContainer` renders its initial styles into the HTML. The browser creates and plays the WAAPI animation after hydration, so you can import it directly into a Server Component without adding `"use client"` to the page.

Keep props passed across a Server-to-Client boundary serializable. Declarative animation and controller objects can be passed from the server; callbacks and controllers created by `useController()` belong inside a Client Component.

<Callout type="warning" title="Avoid hidden initial states on critical content">
  Presets such as `fadeUp` start with `opacity: 0`. That initial style is present in server-rendered HTML and remains until the client hydrates and plays the animation. Do not apply hidden-start presets to LCP-critical content that must remain visible when JavaScript is delayed or unavailable.
</Callout>

The default `reducedMotion="user"` policy respects the operating system's reduced-motion preference. When reduced motion is active, playback is skipped and the destination state is applied. Use `"always"` to skip motion for every visitor, or `"never"` to opt out of the preference deliberately.

## API highlights

| API | Import | Use |
| --- | --- | --- |
| `MotionContainer` | `motion-provider` | Render one element with named presets or composed modules |
| `MotionContainerProps` | `motion-provider` | Type the component's complete prop contract |
| `MotionAnimationProps`, `AnimationModule`, `Timing` | `motion-provider` | Type animation definitions and timing |
| `AnimationKeys`, `TransitionKeys` | `motion-provider` | Type supported preset and transition names |
| `useController()` | `motion-provider` | Create an imperative controller in a Client Component |
| `useReducedMotion()` | `motion-provider` | Read the current system reduced-motion preference |

<Callout type="tip" title="When to use Motion instead">
  `MotionContainer` resolves names through the full preset registry, which is convenient when you want to compose presets by string. When bundle size matters and you only need a few imported modules, use `Motion` with selected exports from `motion-provider/presets`. Both components share the same animation engine.
</Callout>

An unknown preset or transition name is reported as a render-time `MotionError` (`UNKNOWN_MODE` or `UNKNOWN_TRANSITION`). Keep preset names type-safe with `AnimationKeys` and transition names with `TransitionKeys`.

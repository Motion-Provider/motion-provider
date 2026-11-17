---
title: "Presets & Modules"
description: "Understand animation modules, named presets, and typed motion configuration."
order: 110
draft: true
---

Motion Provider separates an animation's **definition** from the **way it is selected and played**. An animation module describes the visual change between two states. A preset is a named, reusable module provided by the package. Components such as `MotionContainer` resolve presets and apply timing; the lower-level `Motion` component accepts a module directly.

## Animation modules

An `AnimationModule` is a plain object with two state maps:

- `initial` describes the starting values.
- `animate` describes the destination values.

Each map is keyed by CSS properties. Motion Provider also supports transform aliases such as `x`, `y`, `scale`, and `rotate`.

```tsx
import type { AnimationModule } from "motion-provider";

const reveal = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
} satisfies AnimationModule;
```

Values can be CSS strings or numbers. An `animate` value can also be an array when a property needs multiple keyframes rather than a single destination.

## Using named presets

The package includes named presets for common effects such as `fadeUp`, `fadeIn`, `filterBlurIn`, `slideLeft`, and `spin`. Pass a preset name through the `mode` property of the `animation` prop:

```tsx
import { MotionContainer } from "motion-provider";

<MotionContainer
  animation={{
    mode: ["fadeUp", "filterBlurIn"],
    transition: "gentle",
    delay: 0.15,
    duration: 0.8,
  }}
>
  Content
</MotionContainer>
```

The `mode` value accepts a single preset name, an `AnimationModule` object, or an array of names and modules. This same animation shape is used by `MotionContainer`, `MotionText`, and `MotionImage`. `MotionChain` can use one shared `animation` or an `animations` array to define a different animation for each child.

A named `transition` selects a timing preset. You can also pass a timing object directly. Properties such as `duration`, `delay`, `endDelay`, `easing`, `iterations`, and `direction` can be set on the animation to customize playback.

<Callout type="note" title="Timing uses seconds">
  Public timing values are measured in seconds, not milliseconds. Named transitions such as `bounceSoft` and `elasticSoft` use easing curves; they do not simulate physics-based springs.
</Callout>

## Combining presets

Presets can be composed by passing more than one entry to `mode`. Each module contributes its `initial` and `animate` properties to the resulting definition. This makes it practical to combine effects that animate different properties:

```tsx
<MotionContainer
  animation={{
    mode: ["fadeUp", "filterBlurIn"],
    transition: "gentle",
  }}
/>
```

The order is significant when two modules define the same CSS property. Later entries overwrite earlier entries for that property in both state maps; properties that do not conflict remain part of the combined animation.

<Callout type="warning" title="Watch for property conflicts">
  Combining two presets does not create separate timelines or independently timed effects. They resolve into one animation definition with one timing configuration. When presets both set `opacity`, `transform`, or another shared property, the later preset takes precedence. Choose the order deliberately.
</Callout>

## Using a module directly with Motion

Use `Motion` when you already have an animation definition and do not need string-based preset resolution. Its API is intentionally direct: provide a module through `definition` and optional playback settings through `timing`.

```tsx
import { Motion } from "motion-provider";
import { spin } from "motion-provider/presets";

<Motion definition={spin} timing={{ duration: 2, easing: "ease-out" }} />

<Motion
  definition={reveal}
  timing={{ duration: 0.6, easing: "ease-out" }}
/>
```

The `motion-provider/presets` export exposes individual named modules, so you can import only the presets you use. This direct-definition approach is also suitable for app-specific modules that you define yourself.

## Reusing animation props with a typed config

Presets describe visual changes. For application-wide reuse, Motion Provider also exposes a separate configuration API that stores component types alongside their props:

```tsx
import {
  createMotionConfig,
  createMotionRegistry,
} from "motion-provider";

const motionConfig = createMotionConfig({
  heroTitle: {
    type: "MotionContainer",
    props: {
      elementType: "h1",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
      },
    },
  },
});

const { getMotionAnimation } = createMotionRegistry(motionConfig);

// In a component:
<MotionContainer {...getMotionAnimation("heroTitle")}>
  Make your interface move.
</MotionContainer>;
```

`createMotionConfig` preserves the configuration's literal keys and prop types. `createMotionRegistry` binds a typed `getMotionAnimation(key)` getter to that configuration; the getter returns the stored `props` for the selected entry. Keep the component used at the call site consistent with the entry's `type`. The configuration is local data, not a global registration system, and is safe to define in React Server Component and Node contexts.

## API highlights

| API | Purpose |
| --- | --- |
| `AnimationModule` | Type for the `initial` and `animate` state maps. |
| `MotionAnimationProps` | Type for the preset-based `animation` prop, including `mode` and `transition`. |
| `Motion` | Directly animates an element with `definition` and `timing`. |
| `MotionContainer` | Resolves named presets or inline modules from its `animation` prop. |
| `createMotionConfig` / `createMotionRegistry` | Define and retrieve reusable, type-safe component props. |
| `createMotionGetter` / `getMotionAnimation` | Alternative function-only or explicit config-and-key accessors. |

Use preset names when you want the convenience of the shared registry, direct module imports when you want explicit per-preset definitions, and a typed config when you want to reuse complete component props across your application.

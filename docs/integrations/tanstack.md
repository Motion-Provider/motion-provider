---
title: "TanStack"
description: "Animate TanStack Router navigation and Query-driven interface states with Motion Provider."
order: 240
draft: true
---

Motion Provider works alongside the TanStack ecosystem without requiring a global animation provider. Use **TanStack Router** to coordinate route navigation and **TanStack Query** to drive animated loading, error, and success states. With **TanStack Start**, the same components can render on the server and begin WAAPI playback after hydration.

[Install Motion Provider](/getting-started/installation) and the TanStack packages used by your application:

```sh
npm install motion-provider @tanstack/react-router @tanstack/react-query
```

Install only the TanStack packages your project does not already include. TanStack Start projects typically already have Router configured.

## Animate route content

Use Motion Provider components directly inside a TanStack route component. The file-based route API remains unchanged:

```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";
import { MotionContainer, MotionText } from "motion-provider";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <MotionText
        elementType="h1"
        animation={{ mode: "fadeUp", duration: 0.6 }}
        config={{ mode: "words" }}
      >
        About our product
      </MotionText>

      <MotionContainer
        elementType="section"
        animation={{ mode: ["fadeUp", "filterBlurIn"] }}
      >
        Route content animates when it enters the viewport.
      </MotionContainer>
    </main>
  );
}
```

`MotionContainer` uses an in-view entry policy by default: playback begins when the element reaches 50% visibility and runs once. This works independently of TanStack Router's route matching and loading lifecycle.

## Coordinate exit animations with navigation

Use TanStack Router's `useNavigate()` as the navigation adapter for `MotionLink`. Share one controller between the content that should reverse and the link that initiates navigation:

```tsx
import { useNavigate } from "@tanstack/react-router";
import {
  MotionContainer,
  MotionLink,
  useController,
} from "motion-provider";

export function AnimatedNavigation() {
  const navigate = useNavigate();
  const controller = useController();

  return (
    <>
      <MotionContainer
        controller={controller}
        animation={{ mode: "fadeUp" }}
      >
        Current route content
      </MotionContainer>

      <MotionLink
        href="/about"
        controller={controller}
        navigate={() => navigate({ to: "/about" })}
      >
        About
      </MotionLink>
    </>
  );
}
```

When the link is activated, `MotionLink` reverses the animations registered with the controller, waits for their completion, and then calls `navigate`. The callback maps the link's destination to TanStack Router's typed navigation API.

<Callout type="note" title="Use TanStack Link for ordinary navigation">
  Prefer TanStack Router's `<Link to="..." />` for standard links. It provides route-aware typing, active state, and built-in preloading. Use Motion Provider's `MotionLink` when an exit animation must finish before navigation; its `href` and `navigate` props form an adapter to your router.
</Callout>

## Animate Query-driven states

Motion Provider can animate the UI produced by TanStack Query without changing how queries are declared. Render distinct states for the initial pending, error, and success results:

```tsx
import { useQuery } from "@tanstack/react-query";
import { MotionChain, MotionContainer } from "motion-provider";

type Project = {
  id: string;
  name: string;
};

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");

  if (!response.ok) {
    throw new Error("Unable to load projects");
  }

  return response.json();
}

export function ProjectList() {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (query.isPending) {
    return (
      <MotionContainer animation={{ mode: "fadeIn" }}>
        Loading projects...
      </MotionContainer>
    );
  }

  if (query.isError) {
    return (
      <MotionContainer animation={{ mode: "fadeIn" }}>
        {query.error.message}
      </MotionContainer>
    );
  }

  return (
    <MotionChain animation={{ mode: "fadeUp", duration: 0.4 }}>
      {query.data.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </MotionChain>
  );
}
```

`MotionChain` creates one animated wrapper per child and applies a staggered delay. Use it when a successful query returns a list or a group of elements that should enter in sequence.

<Callout type="tip" title="Separate initial loading from background fetching">
  Use `isPending` when no query data is available yet. TanStack Query's `isFetching` also becomes true during background refetches, so replacing existing content with a loading state on every fetch can cause unnecessary visual flicker. Keep existing data visible and show a smaller refresh indicator when appropriate.
</Callout>

## TanStack Start and server rendering

TanStack Start can server-render route components and hydrate them in the browser. Motion Provider is safe to render on the server: its components output the initial visual state as HTML, then attach WAAPI playback after hydration. No application-wide Motion Provider wrapper, browser-global render guard, or client-only rendering mode is required.

Keep animation definitions and plain configuration objects in shared modules. Create runtime controllers with `useController()` inside the React component that coordinates the animated elements; do not create controller instances at module scope or share them between requests.

<Callout type="warning" title="Watch hidden initial states">
  Presets such as `fadeUp` begin with `opacity: 0`. If JavaScript is delayed or fails, that content can remain hidden. Avoid hidden initial states for essential above-the-fold content and your LCP element. See [Server-Side Rendering](/concepts/server-side-rendering/) for the rendered HTML behavior.
</Callout>

## API highlights

| API | TanStack use case |
| --- | --- |
| `MotionContainer` | Animate route sections and conditional content using named presets or inline modules. |
| `MotionText` | Animate route headings by words or characters while retaining accessible text. |
| `MotionChain` | Stagger lists and grouped results, including data returned by a query. |
| `MotionLink` | Run a coordinated exit animation before invoking TanStack Router navigation. |
| `useController()` | Share play, reverse, pause, finish, and reset controls across animated elements. |
| `createMotionConfig()` / `createMotionRegistry()` | Keep reusable, typed animation props in a shared configuration module. |
| `useReducedMotion()` | Read the user's system preference in React; components also respect it by default. |

Use the default `reducedMotion="user"` policy for ordinary interface motion. See [Reduced Motion Policy](/concepts/reduced-motion-policy/) for overrides and [Server-Side Rendering](/concepts/server-side-rendering/) for hydration details.

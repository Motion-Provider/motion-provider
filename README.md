<h1 align="center"> <img width="50" height="50" alt="Motion logo" src="./public/logo.webp" /><br />Motion Provider (Beta)</h1>
<h3 align="center">
  An open-source React animation library<br />for rapid development.
</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/motion" rel="noopener noreferrer nofollow" ><img src="https://img.shields.io/npm/dm/motion-provider?color=A36439&label=npm" alt="npm downloads per month"></a>
  <a href="https://www.npmjs.com/package/motion" rel="noopener noreferrer nofollow" ><img src="https://img.shields.io/npm/v/motion-provider?color=C42D4E&label=version" alt="npm version"></a>
  <img alt="NPM License" src="https://img.shields.io/npm/l/motion-provider?color=D1C311">
</p>

_Introducing Motion Provider_ with first-class pre-defined APIs and full type-safety that allows you to animate the DOM; not hours, not minutes, **in seconds**! When my client asks me if I used too much AI to create those beautiful animations in the project I delivered earlier than expected, _I say no more_ 🎉🥳

Thanks to the [Motion Playground](https://motionprovider.dev) engine, which allows you to configure and **play with animations visually** and use them with a single click in your next application.

```bash
npm i motion-provider
```

## Table Of Contents

1. [The Background](#the-background)
2. [Why Use Motion Provider?](#why-use-motion-provider)
3. [Installation & Prerequisites](#installation--prerequisites)
4. [Animate in seconds(literally) with the Playground but how?](#animate-in-seconds--literally--with-the-playgrounds-but-how)
5. [Examples](#examples)
6. [Documentation & APIs](#documentation--apis)
7. [Contribution](#contribution)
8. [License](#license)
9. [Sponsor](#sponsor)

### The Background

As you might know, too many copy-and-paste-ready UI libraries have come out recently and the itchy feeling got worse when I saw how disruptive the ecosystem had become as it was completely overwhelmed by repetitive UI/UX... Then, I slightly realized that they actually do almost the same thing: `fadeIn`, `fadeUp`.. What about `"mode: "fadeIn"` then what about mixing them up: `mode: ["fadeIn", "filterBlurIn"]`? Does that look exciting enough?

### Why Use Motion Provider?

🔹**Because the front-end has to be unique.**

- 69+ pre-defined diversity of animations(fade, slide, rotate, zoom & scale, filter..) to play with — all in constant, O(n) complexity. Pretty enough to animate the web.
- 30+ pre-defined transitions(linear, ease, circ, custom and more) — carefully selected and curated transition configs for your next desired app.
- 22+ pre-defined delaying algorithms(linear, sinusoidal, chaotic, quantum.. + custom configs) for seamless and beautiful effects.

🔹**Because creating a harmony within a cohesive whole attracts users and keeps them engaged for longer in your app.**

- Introducing **CAS(Centralized animation system)** allowing you to wire up all your animated components and create progressive enter/exit effects — you users will ❤️ it!
- Integrate **CAS** to your next app only with two hooks which are `useAnimation()` and `useAnimationControl()` — _in total, gzipped size is < 1kb(893b)._
- Observe play/puase effect of the animation before you implement it to your app with [the playground](https://motionprovider.dev).

🔹**Because a scalable app requires type-safety.**

- Ensure you're not left out with E2E **type-safety with TypeScript**.
- Throws an application error in case of doing something wrong.

✅ The big picture

- 46,200 animation combination possibilities!
- I genuinely see a higher customer retention with seamless UX in the big picture. Say goodbye to boring, stale landing pages!
- Junior/mid/senior, no matter how experienced you are — `CTRL+SPACE` is the key of magic. Need a magician to use them 🧙‍♂️

✅ Future plans

- Installable via npx/npm community-driven animation packs.
- Automate page enter/exit and switch effects with `MotionLink` _without compromising CLS/INP_.
- A customizable `motion.config.ts` file to maximize flexibility for your next app.

### Installation

Install via:

```bash
npm i motion-provider
```

or

You can start discovering the fundamentals by forking `nextjs-starter` package

```bash
# clone
git clone https://github.com/Motion-Provider/nextjs-starter.git
# or with SSH
git clone git@github.com:Motion-Provider/nextjs-starter.git
# or with CLI
gh repo clone Motion-Provider/nextjs-starter

cd nextjs-starter

# install
npm install
```

#### Prerequisites

- Node 18+
- React 18+
- A JavaScript runtime environment that can run React applications(e.g Next.js, Astro, Tanstack)
- Typescript 5.0+ (optional but recommended)

### Animate In Seconds With The Playground But How?

I break down the steps one by one so that you can enforce animations lightning-fast:

#### Step 1️⃣ — **Setup**

Ensure that your React node is ready to be animated or at least plan the outcome in mind by considering:

- Does it involve an image, text, container, group of elements?
- If it's a group of elements, how far apart are they?
- Are they HTML elements or React Nodes?

After finding the answers to the questions, you can move on to step two.

#### Step 2️⃣ — **Imagination**

Regarding to the type of element you want animate/create-and-animate:

- if it is an image [visit this link](https://motionprovider.dev/motion-image)
- If it is a text [visit this link](https://motionprovider.dev/motion-text)
- If it is a simple container [visit this link](https://motionprovider.dev/motion-container)
- If it is a group of elements [visit this link](https://motionprovider.dev/motion-container)
- If it is a group of images [visit this link](https://motionprovider.dev/motion-movie)

#### Step 3️⃣ — **Configuration**

Adjust as you like. Play with the buttons, slides. Preview the animation looking before applying it. Stuck? Out of ideas? Roll the dice, increase the 'complexity' value in settings to combine more animations at once — considering the app FPS ofc.

And once you're done, copy the dynamically generated code snippet of your desired animation for your next app.

#### Step 4️⃣ — **Implementation**

If you haven't installed the package yet, first install via `npm i motion-provider`. Then go back to your component. Paste the copied snippet, adjust by wiring up the staff, DONE ✅

#### Step 5️⃣ — **Repeat**

If the current animation doesn't meet your expectations(very rare), you have the option to restart this cycle from step 3.

### Basic Usage

I'll cover the usage of Motion Provider more comprehensively and write some articles addressing real world scenarios [in my blog app](https://burakdev.com/blogs). You can subscribe to the email of my sessions called `justc0de_sessions` to get instant updates with the articles.

But for now I curated piece of examples to give it a try:

As a standalone component, `<MotionContainer />` can be used as a react element itself:

```tsx
import { MotionContainer as Mc } from "motion-provider";

// Animates on mount
const App = () => (
  <Mc
    elementType="div"
    animation={{
      mode: "fadeIn",
      transition: "smooth",
      duration: 1,
    }}
    className="YOUR_CSS_GOES_HERE"
    style={{ OR_HERE }}
  />
);
```

As a wrapper component, `<MotionContainer />` can be used as a HOC:

```tsx
import { MotionContainer as Mc } from "motion-provider";
import Child from "./child";

// Animates on mount
const App = () => (
  <Mc
    elementType="div"
    animation={{
      mode: "fadeIn",
      transition: "springy",
      duration: 1,
      delay: 0,
    }}
  >
    <Child />
  </Mc>
);
```

Mixing the pre-defined animations:

```tsx
import { MotionContainer as Mc } from "motion-provider";

// animates on mount
const App = () => (
  <Mc
    elementType="div"
    animation={{
      mode: ["slideRight", "filterBlurIn"],
      transition: "gentle",
      duration: 1,
    }}
    className="YOUR_CSS_GOES_HERE"
  />
);
```

Defer the animation:

```tsx
import { MotionContainer as Mc } from "motion-provider";

// animates on mount after 1 second delay
const App = () => (
  <Mc
    elementType="div"
    animation={{
      mode: ["translate3dIn", "transformClipDiamond"],
      transition: "settle",
      duration: 1,
      delay: 1,
    }}
    className="YOUR_CSS_GOES_HERE"
  />
);
```

Basic DOM manipulation:

```tsx
import { MotionContainer } from "motion-provider";
import { useState } from "react";

// The animation is fades out by clicking and fades in on the second click.
const App = () => {
  const [reverse, setReverse] = useState<boolean>(false);
  const handleClick = () => setReverse((prev) => !prev);

  return (
    <>
      <MotionContainer
        elementType="div"
        animation={{
          mode: "fadeIn",
          transition: "smooth",
          duration: 1,
          delay: 1,
        }}
        controller={{
          reverse,
        }}
        className="YOUR_CSS_GOES_HERE"
      />
      <button type="button" onClick={handleClick}>
        {reverse ? "Reverse" : "Animate"}
      </button>
    </>
  );
};
```

or

```tsx
import { MotionContainer } from "motion-provider";
import { useState } from "react";

// The animation is fades out by clicking and fades in on the second click.
const App = () => {
  const [reverse, setReverse] = useState<boolean>(false);
  const handleClick = () => setReverse((prev) => !prev);

  return (
    <>
      <MotionContainer
        elementType="div"
        animation={{
          mode: ["fadeIn", "filterBlurIn"],
          transition: "gentle",
          duration: 1,
          delay: 1,
        }}
        controller={{
          trigger: !reverse,
        }}
        className="YOUR_CSS_GOES_HERE"
      >
        Motion Provider is cool!
      </MotionContainer>
      <button type="button" onClick={handleClick}>
        {reverse ? "Reverse" : "Animate"}
      </button>
    </>
  );
};
```

So far, I've only mentioned 5% of Motion Provider's capabilities. The rest will be thoroughly covered in the official documentation. Stay tuned!

### Documentation & APIs

Currently, I am busy with the documentation but you have quick snippets at the corner for each motion provider [in the playground](https://motionprovider.dev). Sorry for the delay.

### Contributions

We welcome contributions! Email me at [hello@burakdev.com](mailto:hello@burakdev.com).

### Sponsorship

Your support not only motivates me to keep building and improving this project, it helps me dedicate more time and energy to be more creative🌟.

Thank you for being a part of this creative adventure—let’s build something amazing together!

[![Buy Me A Coffee](/public/bmc-logo.png)](https://buymeacoffee.com/bilenburakf)

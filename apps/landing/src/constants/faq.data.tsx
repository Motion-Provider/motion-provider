import { Code } from "@heroui/react";

export default [
  {
    id: 1,
    q: "Is Motion Provider free to use?",
    a: (
      <>
        Yes, absolutely! Motion Provider is{" "}
        <b className="text-foreground">MIT licensed, free and open source.</b>{" "}
        Forever.
      </>
    ),
  },
  {
    id: 2,
    q: "How does reduced motion work?",
    a: (
      <>
        Animated components accept{" "}
        <Code>reducedMotion='user' | 'always' | 'never'</Code> , defaulting to{" "}
        <Code>user</Code>.{" "}
        <i className="text-foreground">
          When reduced motion applies, effects snap to their final state.
        </i>{" "}
        The <Code>useReducedMotion</Code> hook exposes the preference for your
        own client UI.
      </>
    ),
  },
  {
    id: 3,
    q: "How are errors and completion reported?",
    a: (
      <>
        Motion provider has{" "}
        <b className="text-foreground">a dedicated error boundary</b> which
        enables you to immediately detect underlying issues. Common mistakes are
        typically caused by missing props or invalid values.
        <br />
        <br />
        Use <Code>onMotionError</Code> for reported component errors and
        onMotionComplete for completions, which distinguish finished from
        cancelled.
      </>
    ),
  },
  {
    id: 4,
    q: "What are the limitations?",
    a: (
      <>
        By design, Motion Provider{" "}
        <b className="text-foreground">doesn't support</b> any of the following:{" "}
        <b className="text-foreground">
          spring physics, layout or presence animations as well as drag and
          gesture support.
        </b>{" "}
        <br />
        <br />
        We have done everything to not overcomplicate the Motion Provider to be
        extremely small and tiny by focusing on the most common animation use
        cases for the web.
      </>
    ),
  },
  {
    id: 5,
    q: "Does it type-safe?",
    a: (
      <>
        <b className="text-foreground">Yes, it does end-to-end.</b> All the APIs
        including the utils, hooks are all typed.
      </>
    ),
  },
  {
    id: 6,
    q: "What's the Motion Playground for?",
    a: (
      <>
        A free to use playground to visually implement animations for your HTML
        or SVG elements providing you to generate section-to-section sequenced
        animations and more.
        <br />
        <br />
        <b className="text-foreground">
          Faster and more precise than any LLMs when it comes to crafting
          animations
        </b>{" "}
        .Easily copy-paste into your project in seconds, empowered by Motion
        Provider.
      </>
    ),
  },
] as const;

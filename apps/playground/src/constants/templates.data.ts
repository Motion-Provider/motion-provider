import type { Markup, Project } from "../types/playground";
import { settingsFor } from "./motion.config";

const exampleStyles = `<style>
  .mp-example, .mp-example *, .mp-example *::before, .mp-example *::after { box-sizing: border-box; }
  .mp-example { background: #131110; color: #faf3ef; font-family: system-ui, sans-serif; padding: clamp(24px, 7vw, 72px); min-height: 100vh; display: grid; align-content: center; gap: 20px; }
  .mp-example :is(h1,h2,h3,p,ul,ol) { margin: 0; }
  .mp-example :is(h1,h2) { font-size: clamp(30px, 7vw, 62px); font-weight: 700; line-height: 1.04; letter-spacing: -.065em; }
  .mp-example p { color: #bfb1aa; line-height: 1.6; max-width: 46ch; }
  .mp-example label { color: #d8cac3; }
  .mp-example a, .mp-example button { cursor: pointer; }
  .mp-example a { color: #ff935f; }
  .mp-example button, .mp-button { display: inline-grid; place-items: center; border-radius: 7px; border: 1px solid #ff955f; background: #ff955f; color: #20120c !important; padding: 10px 15px; font: 600 13px system-ui; text-decoration: none; white-space: nowrap; }
  .mp-example .mp-outline { background: #231d1a; color: #f4eae4 !important; border-color: #453730; }
  .mp-kicker { color: #ff9a6a; text-transform: uppercase; font: 650 10px system-ui; letter-spacing: .17em; }
  .mp-stack { display: grid; gap: 10px; padding: 0; list-style: none; }
  .mp-tile { display: block; background: #211c19; border: 1px solid #3a302b; border-radius: 10px; padding: 16px; }
  .mp-tile p { margin-top: 5px; }
  .mp-grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fit,minmax(min(100%, 130px),1fr)); }
  .mp-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .mp-input { color: #f8eee8; background: #1b1715; border: 1px solid #514037; border-radius: 7px; padding: 10px 13px; min-width: 0; }
  .mp-hero { justify-items: center; align-content: center; gap: clamp(8px, 2.65dvh, 14px); padding: 12px 16px; text-align: center; }
  .mp-hero .mp-art { width: min(100%, 312px); max-inline-size: 76dvh; aspect-ratio: 1.68; object-fit: cover; object-position: 50% 50%; display: block; mix-blend-mode: screen; mask-image: radial-gradient(ellipse at center, #000 42%, transparent 74%); }
  .mp-hero h1 { width: fit-content; color: #fff5ef; font-size: clamp(37px, 8vw, 67px); padding: 0 .075em .07em; }
  .mp-hero p { font-size: 13px; }
  .mp-hero .mp-row { justify-content: center; margin-top: 4px; }
  .mp-price { color: #ff9b70; font-size: 27px; font-weight: 700; letter-spacing: -.04em; }
  .mp-media { width: 100%; max-width: 380px; aspect-ratio: 1.7; object-fit: cover; border-radius: 8px; }
  .mp-nav { justify-content: space-between; border-bottom: 1px solid #40342e; padding-bottom: 14px; }
</style>`;

export const TEMPLATES = [
  {
    id: "hero",
    name: "Hero section",
    description: "A headline, artwork, and two calls to action.",
    icon: "hero",
    html: `<section class="mp-example mp-hero" data-motion-name="Hero section">
  <img class="mp-art" src="/motion-orbit.webp" alt="Orange wireframe vortex" data-motion-name="Wireframe artwork" width="312" height="186">
  <div class="mp-kicker" data-motion-name="Eyebrow">Motion study</div>
  <h1 data-motion-name="Make it move.">Make it move.</h1>
  <p data-motion-name="Description">A little movement changes everything.</p>
  <div class="mp-row" data-motion-name="Action buttons">
    <button type="button">Explore motion</button>
    <button type="button" class="mp-outline">View details</button>
  </div>
</section>`,
    layers: ["Make it move.", "Wireframe artwork", "Action buttons"],
  },
  {
    id: "cta",
    name: "Call to action",
    description: "Bring attention to a single action.",
    icon: "cta",
    html: `<section class="mp-example">
  <span class="mp-kicker">Make time for the good stuff</span>
  <h2>Build something people remember.</h2>
  <p>Start with an idea and give it room to move.</p>
  <div><button type="button">Get started</button></div>
</section>`,
    layers: ["Build something people remember."],
  },
  {
    id: "features",
    name: "Feature grid",
    description: "Stagger a responsive collection of cards.",
    icon: "features",
    html: `<section class="mp-example">
  <h2>Tools for the details.</h2>
  <div class="mp-grid" data-motion-name="Feature cards">
    <article class="mp-tile"><h3>Preview</h3><p>Watch changes in context.</p></article>
    <article class="mp-tile"><h3>Refine</h3><p>Tune timing and rhythm.</p></article>
    <article class="mp-tile"><h3>Ship</h3><p>Take the code with you.</p></article>
  </div>
</section>`,
    layers: ["Feature cards"],
  },
  {
    id: "pricing",
    name: "Pricing cards",
    description: "Reveal three tiers in sequence.",
    icon: "pricing",
    html: `<section class="mp-example">
  <h2>Room to grow.</h2>
  <div class="mp-grid" data-motion-name="Pricing tiers">
    <article class="mp-tile"><h3>Starter</h3><p class="mp-price">$0</p><p>Explore the basics.</p></article>
    <article class="mp-tile"><h3>Studio</h3><p class="mp-price">$18</p><p>Build a shared library.</p></article>
    <article class="mp-tile"><h3>Team</h3><p class="mp-price">$42</p><p>Collaborate across projects.</p></article>
  </div>
</section>`,
    layers: ["Pricing tiers"],
  },
  {
    id: "testimonial",
    name: "Testimonial",
    description: "Give a short quote a word-by-word entrance.",
    icon: "testimonial",
    html: `<figure class="mp-example">
  <div class="mp-kicker">Field notes</div>
  <blockquote style="margin:0"><h2>It finally feels like the interface is listening.</h2></blockquote>
  <figcaption>Marin Chen · Design engineer</figcaption>
</figure>`,
    layers: ["It finally feels like the interface is listening."],
  },
  {
    id: "gallery",
    name: "Image gallery",
    description: "Experiment with tiled image motion.",
    icon: "gallery",
    html: `<section class="mp-example">
  <h2>Studies in light.</h2>
  <div class="mp-grid" data-motion-name="Gallery">
    <figure style="margin:0"><img class="mp-media" src="/motion-orbit.webp" alt="Wireframe vortex"><figcaption>Vortex</figcaption></figure>
    <figure style="margin:0"><img class="mp-media" src="/motion-orbit.webp" alt="Violet wireframe" style="filter:hue-rotate(280deg)"><figcaption>Refraction</figcaption></figure>
  </div>
</section>`,
    layers: ["Wireframe vortex", "Violet wireframe"],
  },
  {
    id: "faq",
    name: "FAQ list",
    description: "Stagger an accessible disclosure list.",
    icon: "faq",
    html: `<section class="mp-example">
  <h2>Questions, answered.</h2>
  <ul class="mp-stack" data-motion-name="Questions">
    <li class="mp-tile"><details open><summary>Where do I start?</summary><p>Import a component or choose a preset.</p></details></li>
    <li class="mp-tile"><details><summary>Can I tune the timing?</summary><p>Duration, delay, easing, and stagger are editable.</p></details></li>
    <li class="mp-tile"><details><summary>How do I export?</summary><p>Open Export code in the header.</p></details></li>
  </ul>
</section>`,
    layers: ["Questions"],
  },
  {
    id: "newsletter",
    name: "Newsletter form",
    description: "Animate the heading of a compact form.",
    icon: "newsletter",
    html: `<section class="mp-example">
  <span class="mp-kicker">Occasional dispatches</span>
  <h2>Notes on making.</h2>
  <p>Short essays on building for the web.</p>
  <form class="mp-row"><label for="email">Email</label><input class="mp-input" id="email" type="email" placeholder="you@example.com"><button type="submit">Subscribe</button></form>
</section>`,
    layers: ["Notes on making."],
  },
  {
    id: "navigation",
    name: "Navigation bar",
    description: "Apply a short stagger across navigation links.",
    icon: "navigation",
    html: `<header class="mp-example">
  <nav class="mp-row mp-nav" aria-label="Sample navigation">
    <strong>Offset Studio</strong>
    <div class="mp-row" data-motion-name="Navigation links"><a href="#work">Work</a><a href="#studio">Studio</a><a href="#contact">Contact</a></div>
  </nav>
  <h2 id="work">A studio in motion.</h2>
  <p>Independent design and engineering for the web.</p>
</header>`,
    layers: ["Navigation links"],
  },
  {
    id: "activity",
    name: "Activity feed",
    description: "Reveal an ordered list with a consistent rhythm.",
    icon: "activity",
    html: `<section class="mp-example">
  <h2>Recent activity</h2>
  <ol class="mp-stack" data-motion-name="Activity items">
    <li class="mp-tile"><strong>Project shared</strong><p>Today, 09:42</p></li>
    <li class="mp-tile"><strong>Animation updated</strong><p>Yesterday, 16:17</p></li>
    <li class="mp-tile"><strong>Jordan joined the workspace</strong><p>Monday, 11:05</p></li>
  </ol>
</section>`,
    layers: ["Activity items"],
  },
] as const;

export type Template = (typeof TEMPLATES)[number];
export const STARTER = TEMPLATES[0];

export function templateHtml(template: Template) {
  return `${exampleStyles}\n${template.html}`;
}

export function templateProject(template: Template, markup: Markup): Project {
  return {
    name: template.name,
    html: templateHtml(template),
    template: template.id,
    assignments: Object.fromEntries(
      markup.layers
        .filter((layer) =>
          (template.layers as readonly string[]).includes(layer.name),
        )
        .map((layer) => [layer.id, settingsFor(layer.kind)]),
    ),
  };
}

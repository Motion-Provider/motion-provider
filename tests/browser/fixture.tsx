import { Profiler, StrictMode } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import animations from "../../src/constants/animations.js";
import transitions from "../../src/constants/transitions.js";
import { animateElement } from "../../src/engine/animate.js";
import { createController } from "../../src/engine/controller.js";
import { bindScroll } from "../../src/engine/scroll.js";
import {
  MotionChain,
  MotionContainer,
  MotionImage,
  MotionLink,
  MotionMovie,
  MotionText,
  useAnimation,
  useController,
} from "../../src/index.js";

const host = document.getElementById("root") as HTMLElement;
let root: Root | undefined;
const metrics = {
  commits: 0,
  completions: 0,
  indices: [] as number[],
  navigations: [] as string[],
  errors: [] as string[],
};
const controller = createController();
const svg = (color: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="${color}"/></svg>`)}`;
const images = [svg("red"), svg("blue")];
function Suite({ name, revision = 0 }: { name: string; revision?: number }) {
  const hookController = useController();
  useAnimation(hookController);
  const common = {
    onMotionError: (error: Error) => metrics.errors.push(error.message),
  };
  switch (name) {
    case "lifecycle":
      return (
        <Profiler id="box" onRender={() => metrics.commits++}>
          <MotionContainer
            {...common}
            id="box"
            data-revision={revision}
            controller={{
              controls: controller,
              trigger: true,
            }}
            animation={{
              mode: ["fadeUp", "filterBlurIn"],
              duration: 1,
            }}
            onMotionComplete={() => metrics.completions++}
          >
            Hello
          </MotionContainer>
        </Profiler>
      );
    case "trigger":
      return (
        <MotionContainer
          {...common}
          id="box"
          animation={{
            mode: "fadeIn",
            duration: 0.2,
          }}
          controller={{
            trigger: revision % 2 === 0,
          }}
        >
          Trigger
        </MotionContainer>
      );
    case "inview":
      return (
        <>
          <div
            style={{
              height: 1500,
            }}
          />
          <MotionContainer
            {...common}
            id="box"
            animation={{
              mode: "fadeIn",
              duration: 0.05,
            }}
            style={{
              height: 100,
            }}
          >
            In view
          </MotionContainer>
        </>
      );
    case "text":
      return (
        <MotionText
          animation={{
            mode: "fadeIn",
            duration: 0.1,
          }}
          controller={{
            trigger: true,
          }}
          config={{
            duration: 0,
          }}
          elementType="h1"
          id="text"
        >
          👨‍👩‍👦é a
        </MotionText>
      );
    case "chain":
      return (
        <MotionChain
          animations={[
            {
              mode: "fadeIn",
              delay: 0,
            },
            {
              mode: "fadeIn",
              delay: 0.2,
            },
          ]}
          config={{
            duration: 0.1,
          }}
        >
          {[<b key="a">A</b>, <b key="b">B</b>]}
        </MotionChain>
      );
    case "image":
      return (
        <Profiler id="image" onRender={() => metrics.commits++}>
          <MotionImage
            {...common}
            animation={{
              mode: "fadeIn",
              duration: 0.12,
            }}
            config={{
              img: images[revision % 2]!,
              pieces: 4,
              duration: 0.01,
              fn: "hover",
            }}
            style={{
              width: 200,
              height: 100,
            }}
            alt="Tiles"
          />
        </Profiler>
      );
    case "movie":
      return (
        <MotionMovie
          {...common}
          animations={{
            enter: "fadeIn",
            exit: "fadeOut",
            duration: 0.03,
          }}
          config={{
            images,
            pieces: 4,
            duration: 0.01,
            animationDuration: 0.05,
          }}
          onIndexChange={(i) => metrics.indices.push(i)}
          style={{
            width: 200,
            height: 100,
          }}
        />
      );
    case "link":
      return (
        <>
          <MotionContainer
            animation={{
              mode: "fadeIn",
              duration: 0.15,
            }}
            controller={{
              controls: controller,
              trigger: true,
            }}
          >
            Leaving
          </MotionContainer>
          <MotionLink
            id="link"
            href="/destination"
            controller={controller}
            navigate={(href) => {
              metrics.navigations.push(href);
            }}
          >
            Next
          </MotionLink>
        </>
      );
    case "link-unmount":
      return (
        <MotionLink
          id="link"
          href="/destination"
          onReverse={() => new Promise((r) => setTimeout(r, 150))}
          navigate={(href) => {
            metrics.navigations.push(href);
          }}
        >
          Next
        </MotionLink>
      );
    default:
      return null;
  }
}
Object.assign(window, {
  fixture: {
    metrics,
    controller,
    animations,
    transitions,
    animateElement,
    bindScroll,
    render(name: string, revision = 0) {
      root ??= createRoot(host);
      root.render(
        <StrictMode>
          <Suite name={name} revision={revision} />
        </StrictMode>,
      );
    },
    unmount() {
      root?.unmount();
      root = undefined;
    },
    hydrate(html: string) {
      root?.unmount();
      host.innerHTML = html;
      root = hydrateRoot(
        host,
        <MotionContainer
          animation={{
            mode: "fadeIn",
            duration: 1,
          }}
        >
          Hydrated
        </MotionContainer>,
      );
    },
  },
});

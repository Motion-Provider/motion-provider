import { createMotionConfig, createMotionRegistry } from "motion-provider";
import {
  MotionChain,
  MotionContainer,
  MotionImage,
  MotionText,
} from "../../src/index.js";

const config = createMotionConfig({
  title: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["textShimmer", "transformTextGlow", "filterBlurIn"],
        transition: "slowCubic",
        duration: 1.5,
        delay: 0.3,
      },
      config: {
        delayLogic: "chaotic",
        duration: 0.08,
        mode: "chars",
      },
      elementType: "div",
    },
  },
  description: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeOut", "filterBlurOut"],
        transition: "gentle",
      },
      elementType: "p",
    },
  },
  image: {
    type: "MotionImage",
    props: {
      animation: {
        mode: "fadeIn",
      },
      config: {
        pieces: 49,
      },
    },
  },
  chain: {
    type: "MotionChain",
    props: {
      animation: {
        mode: "fadeIn",
      },
      config: {
        duration: 0.1,
      },
    },
  },
});
const { getMotionAnimation } = createMotionRegistry(config);
<MotionText {...getMotionAnimation("title")}>Title</MotionText>;
<MotionContainer {...getMotionAnimation("description")}>
  Description
</MotionContainer>;
<MotionImage
  {...getMotionAnimation("image")}
  config={{
    ...getMotionAnimation("image").config,
    img: "/photo.png",
  }}
/>;
<MotionChain {...getMotionAnimation("chain")}>One</MotionChain>;
// @ts-expect-error Config names are an exact key union.
getMotionAnimation("notRegistered");
createMotionConfig({
  bad: {
    type: "MotionContainer",
    props: {
      animation: {
        // @ts-expect-error A preset typo must fail at the call site.
        mode: "typo",
      },
    },
  },
});
// @ts-expect-error The exact returned component props are retained.
const invalid: "words" = getMotionAnimation("title").config.mode;

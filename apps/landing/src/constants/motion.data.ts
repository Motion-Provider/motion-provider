import { createMotionConfig } from "motion-provider";

export default createMotionConfig({
  trustSignals: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeDown", "filterBlurIn"],
        transition: "bounceSoft",
        duration: 1.5,
      },
      controller: {
        configView: {
          amount: 0.5,
        },
      },
    },
  },
  showcasePreviewDescription: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["fadeDown", "filterBlurIn"],
        duration: 0.8,
        transition: "gentle",
      },
    },
  },
});

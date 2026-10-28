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
  metricBarName: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["flash", "filterBlurIn", "fadeIn"],
        transition: "slowCubic",
        duration: 0.75,
      },
      config: {
        mode: "chars",
        duration: 0.48,
        delayLogic: "sinusoidal",
      },
    },
  },
  metricBarLabel: {
    type: "MotionText",
    props: {
      animation: {
        mode: "fadeUp",
        transition: "gentle",
      },
      config: {
        mode: "words",
      },
    },
  },
  showcaseComponentReRender: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: "spin",
        transition: "bounceSoft",
        duration: 1,
      },
    },
  },
  metricBarItems: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        duration: 0.88,
        transition: "gentle",
      },
      controller: {
        configView: {
          once: true,
          amount: 0.5,
        },
      },
      config: {
        duration: 0.44,
      },
      elementType: "ol",
      className: "flex w-full flex-col gap-4",
    },
  },
  myFingerIsGoodNowText1: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["filterBlurIn", "fadeDown"],
        transition: "gentle",
      },
      config: {
        mode: "words",
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.15,
          end: 0.5,
        },
      },
    },
  },
  myFingerIsGoodNowText2: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["filterBlurIn", "fadeUp"],
        transition: "gentle",
      },
      config: {
        mode: "words",
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.3,
          end: 0.55,
        },
      },
    },
  },
  myFingerIsGoodNowChain: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeUp", "transformMaskLeft", "maskGradientPerforate"],
        transition: "gentle",
        duration: 0.5,
      },
      config: {
        delayLogic: "sinusoidal",
        duration: 0.5,
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.35,
          end: 0.5,
        },
      },
      elementType: "g",
    },
  },
  myFingerIsGoodNowChip: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["filterBlurIn", "fadeUp"],
        transition: "gentle",
        duration: 1,
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.3,
          end: 0.55,
        },
      },
    },
  },
  dxComparisonSwitcher: {
    type: "MotionChain",
    props: {
      elementType: "li",
      animation: {
        mode: "fadeUp",
        delay: 0.5,
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0,
          end: 0.15,
        },
      },
    },
  },
  squareGrid: {
    type: "MotionImage",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn", "skewX45"],
        duration: 0.75,
        transition: "gentle",
      },
      config: {
        pieces: 121,
        duration: 0.1,
        fn: "hover",
        delayLogic: "sinusoidal",
      },
    },
  },
  dxComparisonText: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["filterBlurIn", "fadeUp"],
        transition: "gentle",
        duration: 0.66,
      },
      config: {
        mode: "words",
        duration: 0.1,
      },
      controller: {
        configView: {
          amount: 1,
          once: true,
        },
      },
      wrapperClassName: "text-5xl tracking-tighter",
      elementType: "h1",
    },
  },
  circleCodeSnippet: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeDown", "filterBlurIn"],
        transition: "gentle",
        duration: 1,
        delay: 0.25,
      },
      config: {
        delayLogic: "linear",
        duration: 0.15,
      },
    },
  },
  comparisonPanel: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["filterBlurIn", "transformRevealRight"],
        transition: "gentle",
        duration: 0.44,
      },
      config: {
        mode: "chars",
        duration: 0.8,
      },
    },
  },
});

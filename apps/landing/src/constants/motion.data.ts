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
  metricTitle: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["filterBlurIn", "textShimmer"],
        delay: 0.33,
        transition: "bounceSoft",
        duration: 1.8,
      },
      config: {
        mode: "chars",
        duration: 0.52,
        delayLogic: "sinusoidal",
      },
    },
  },
  metricBarLabel: {
    type: "MotionContainer",
    props: {
      animation: {
        mode: ["filterBlurOut", "fadeOut"],
        transition: "gentle",
        direction: "alternate-reverse",
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
  myFingerIsGoodNowPyramid: {
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
        duration: 1.5,
        transition: "gentle",
      },
      config: {
        pieces: 121,
        duration: 0.5,
        delayLogic: "perlin",
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.25,
          end: 0.75,
        },
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
  showcaseTitle: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.66,
      },
      config: {
        mode: "chars",
        delayLogic: "chaotic",
        duration: 0.2,
      },
      elementType: "h1",
      wrapperClassName: "text-7xl text-foreground tracking-tighter",
    },
  },
  faqTitle: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn"],
        transition: "gentle",
        duration: 1.2,
      },
      config: {
        delayLogic: "shuffle",
        duration: 0.44,
      },
      controller: {
        configView: {
          amount: 0.25,
          once: true,
        },
      },
      elementType: "span",
    },
  },
  faqAccordion: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
      },
      controller: {
        configView: {
          amount: 0.5,
          once: true,
        },
      },
    },
  },
  engineHeroPyramid: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeIn", "transformClipDiamond", "neonGlow"],
        transition: "smoothFast",
        duration: 2.5,
      },
      config: {
        delayLogic: "sinusoidal",
        duration: 1.2,
      },
      controller: {
        scroll: {
          axis: "y",
          mode: "view",
          start: 0.15,
          end: 0.65,
        },
      },
      elementType: "g",
    },
  },
  engineGlow: {
    type: "MotionContainer",
    props: {
      elementType: "g",
      animation: {
        mode: "fadeIn",
        delay: 0.2,
        transition: "gentle",
        duration: 0.88,
      },
    },
  },
  engineNodeModalChip: {
    type: "MotionText",
    props: {
      animation: {
        mode: "textShimmer",
        transition: "fadeSlide",
        duration: 1,
      },
      config: {
        duration: 1,
        delayLogic: "pendulum",
        mode: "chars",
      },
    },
  },
  engineNodeModalHeader: {
    type: "MotionText",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.88,
      },
      config: {
        duration: 0.22,
        mode: "words",
      },
      elementType: "span",
    },
  },
  engineMinimapEdges: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeIn", "filterBlurIn"],
        delay: 0.5,
        transition: "gentle",
      },
      config: {
        duration: 0.22,
      },
      elementType: "g",
    },
  },
  engineMinimapNodes: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["filterBlurIn", "fadeUp"],
        duration: 0.5,
        transition: "gentle",
      },
      config: {
        duration: 0.22,
      },
      elementType: "g",
    },
  },
  showcasesCards: {
    type: "MotionChain",
    props: {
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.9,
      },
      config: {
        delayLogic: "sinusoidal",
        duration: 0.16,
      },
      controller: {
        configView: {
          amount: 0.15,
          once: true,
        },
      },
      elementType: "li",
      className: "h-full",
    },
  },
  testChain: {
    type: "MotionChain",
    props: {
      animation: {
        mode: "fadeIn",
      },
      elementType: "g",
    },
  },
});

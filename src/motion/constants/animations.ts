import { AnimationLibraryProps } from "../types";

const animations = {
  default: {
    initial: {},
    animate: {},
  },
  opacity: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  spin: {
    initial: { rotate: 0 },
    animate: { rotate: -360 },
  },

  // slides

  slideDown: {
    initial: { y: "-100%" },
    animate: { y: 0 },
  },
  slideLeft: {
    initial: { x: "100%" },
    animate: { x: 0 },
  },
  slideRight: {
    initial: { x: "-100%" },
    animate: { x: 0 },
  },
  slideUp: {
    animate: { y: 0 },
    initial: { y: "100%" },
  },

  // staggered

  staggeredIn: {
    initial: { x: "-50%" },
    animate: {
      x: 0,
    },
  },
  staggeredOut: {
    initial: { x: "-50%" },
    animate: {
      x: 0,
    },
  },

  // Fade

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
  },
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  fadeDown: {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
    },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -30 },
    animate: {
      opacity: 1,
      x: 0,
    },
  },
  fadeRight: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
    },
  },

  // Zoom & Scale

  scaleZoomIn: {
    initial: { scale: 0.8 },
    animate: { scale: 1 },
  },
  scaleZoomOut: {
    initial: { scale: 1.2 },
    animate: { scale: 1 },
  },
  scaleGrowShrink: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
    },
  },

  // Rotate

  rotateIn: {
    initial: { rotate: -90 },
    animate: { rotate: 0 },
  },
  rotateOut: {
    initial: { rotate: 0 },
    animate: { rotate: 90 },
  },
  rotateFlipX: {
    initial: { rotateX: -180 },
    animate: { rotateX: 0 },
  },
  rotateFlipY: {
    initial: { rotateY: -180 },
    animate: { rotateY: 0 },
  },
  rotateSwing: {
    initial: { rotate: 0 },
    animate: {
      rotate: [15, -10, 5, -5, 0],
    },
  },
  rotateClockwise: {
    initial: { rotate: -45 },
    animate: {
      rotate: 0,
    },
  },
  rotateRoll: {
    initial: { rotateZ: -120 },
    animate: {
      rotateZ: 0,
    },
  },
  rotating360: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
    },
  },

  // Bounce

  bounceY: {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 10, -10, 5, 0],
    },
  },
  bounceX: {
    initial: { x: 0 },
    animate: {
      x: [-10, 10, -10, 10, -5, 5, 0],
    },
  },
  rotateBounce: {
    initial: { rotate: -90, y: 0 },
    animate: {
      rotate: [0, 15, -10, 5, 0],
      y: [0, -20, 10, -10, 0],
    },
  },
  elasticBounce: {
    initial: { y: 0 },
    animate: {
      y: [0, -30, 20, -15, 5, 0],
    },
  },
  bounceInOut: {
    initial: { y: 0 },
    animate: {
      y: [0, -40, 20, -10, 0],
    },
  },

  // Skew

  skewX45: {
    initial: { skewX: 30 },
    animate: {
      skewX: 0,
    },
  },
  skewX90: {
    initial: { skewX: 90 },
    animate: {
      skewX: 0,
    },
  },
  skewX180: {
    initial: { skewX: 180 },
    animate: {
      skewX: 0,
    },
  },
  skewY45: {
    initial: { skewY: 30 },
    animate: {
      skewY: 0,
    },
  },
  skewY90: {
    initial: { skewY: 90 },
    animate: {
      skewY: 0,
    },
  },
  skewY180: {
    initial: { skewY: 180 },
    animate: {
      skewY: 0,
    },
  },

  // Custom

  textShimmer: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 0, 1],
    },
  },
  swingHorizontal: {
    initial: { x: 0 },
    animate: {
      x: [0, -10, 10, -5, 5, 0],
    },
  },
  flash: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0, 1],
    },
  },
  hoverEffect: {
    initial: { scale: 1 },
    animate: {
      scale: 1.1,
    },
  },
  wave: {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 15, -15, 15, -15, 0],
    },
  },
  heartbeat: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
    },
  },
  heartbeatRubber: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.25, 0.75, 1.15, 0.95, 1],
    },
  },
  wobble: {
    initial: { x: 0, rotate: 0 },
    animate: {
      x: [0, -20, 15, -10, 5, 0],
      rotate: [0, -5, 3, -3, 0],
    },
  },
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
    },
  },
  funChickenDance: {
    initial: { rotate: 0, x: 0 },
    animate: {
      rotate: [0, 10, -10, 10, -10, 0],
      x: [0, 5, -5, 5, -5, 0],
    },
  },
  funJellyFish: {
    initial: { scale: 1, y: 0 },
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
      y: [0, -10, 10, -5, 5, 0],
    },
  },
  funRocketBoost: {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: [50, 0, -10, 0],
      opacity: 1,
    },
  },
  funDizzyLizard: {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 360, 720, 1080, 1440],
      scale: [1, 1.2, 0.8, 1],
    },
  },
  funBlobMorph: {
    initial: { scale: 1, borderRadius: "0%" },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      borderRadius: ["0%", "50%", "25%", "50%", "0%"],
    },
  },
  funMoonWalk: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -10, 20, -30, 40, 0],
      opacity: [1, 0.8, 0.6, 0.4, 0.2, 1],
    },
  },
  funPeekABoo: {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.5, 0.5, 1],
      opacity: [0, 1, 0, 1],
    },
  },
  funSnailTrail: {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: ["-100%", "-50%", "-25%", "-10%", "0%"],
      opacity: [0, 0.3, 0.5, 0.8, 1],
    },
  },
  funPopcornPop: {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [0, -20, 10, -5, 2, 0],
      scale: [1, 1.1, 1.2, 0.9, 1.05, 1],
    },
  },
  funYoYoSpin: {
    initial: { rotate: 0, y: 0 },
    animate: {
      rotate: [0, 360, -360, 360],
      y: [0, -10, 20, -10, 0],
    },
  },
  funWarpDrive: {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: [0.5, 1.5, 0.7, 1],
      opacity: [0, 0.5, 1, 1],
    },
  },
  funSpringFling: {
    initial: { y: 0 },
    animate: {
      y: [0, -50, 25, -12, 6, 0],
    },
  },
  funTwinkleToes: {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1, 1.2, 0.8, 1],
      opacity: [0, 0.5, 0.8, 1],
    },
  },
  funGhostFloat: {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: [20, 10, 5, 0, -5, -10, 0],
      opacity: [0, 0.3, 0.6, 0.9, 1],
    },
  },

  // filters

  filterBlurIn: {
    initial: { filter: "blur(10px)" },
    animate: {
      filter: "blur(0px)",
    },
  },
  filterBlurOut: {
    initial: { filter: "blur(0px)" },
    animate: {
      filter: "blur(10px)",
    },
  },
  filterBrightnessFade: {
    initial: { filter: "brightness(0.5)" },
    animate: { filter: "brightness(1)" },
  },
  filterContrastShift: {
    initial: { filter: "contrast(50%)" },
    animate: { filter: "contrast(100%)" },
  },
  filterGrayscaleFade: {
    initial: { filter: "grayscale(100%)" },
    animate: { filter: "grayscale(0%)" },
  },
  filterHueRotate: {
    initial: { filter: "hue-rotate(0deg)" },
    animate: { filter: "hue-rotate(360deg)" },
  },
  filterInvertColors: {
    initial: { filter: "invert(0%)" },
    animate: { filter: "invert(100%)" },
  },
  filterSaturateIncrease: {
    initial: { filter: "saturate(50%)" },
    animate: { filter: "saturate(200%)" },
  },
  filterSepiaTone: {
    initial: { filter: "sepia(0%)" },
    animate: { filter: "sepia(100%)" },
  },

  // 3D Translate

  translate3dIn: {
    initial: { transform: "translate3d(-100px, -100px, -100px)" },
    animate: { transform: "translate3d(0px, 0px, 0px)" },
  },

  translate3dOut: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: { transform: "translate3d(100px, 100px, 100px)" },
  },

  translate3dRotate: {
    initial: { transform: "translate3d(-50px, -50px, -50px) rotate(0deg)" },
    animate: { transform: "translate3d(0px, 0px, 0px) rotate(360deg)" },
  },

  translate3dZoom: {
    initial: { transform: "translate3d(-50px, 0px, -100px) scale(0.5)" },
    animate: { transform: "translate3d(0px, 0px, 0px) scale(1)" },
  },

  translate3dBounce: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(0px, -30px, 0px)",
        "translate3d(0px, 15px, 0px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },

  translate3dWave: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(10px, 0px, 10px)",
        "translate3d(-10px, 0px, -10px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },

  translate3dZigZag: {
    initial: { transform: "translate3d(0px, 0px, 0px)" },
    animate: {
      transform: [
        "translate3d(0px, 0px, 0px)",
        "translate3d(20px, -10px, 10px)",
        "translate3d(-20px, 10px, -10px)",
        "translate3d(0px, 0px, 0px)",
      ],
    },
  },

  // Mixed animations

  drift: {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, -5, 0, 5, 0],
    },
  },

  glitch: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, 5, -5, 5, -5, 0],
      opacity: [1, 0.9, 0.9, 0.8, 0.9, 1],
    },
  },

  slideBounce: {
    initial: { x: "100%" },
    animate: { x: ["100%", "50%", "40%", "50%", "0%"] },
  },

  flipCard: {
    initial: { rotateY: 0 },
    animate: { rotateY: [0, 90, 180, 270, 360] },
  },

  jitter: {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 2, -2, 2, -2, 0],
      y: [0, -2, 2, -2, 2, 0],
    },
  },

  flip3D: {
    initial: { rotateY: -180, opacity: 0, perspective: 1000 },
    animate: {
      rotateY: 0,
      opacity: 1,
      perspective: 1000,
    },
  },

  neonGlow: {
    initial: { textShadow: "0 0 0px #fff" },
    animate: {
      textShadow: [
        "0 0 0px #fff",
        "0 0 10px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
        "0 0 0px #fff",
      ],
    },
  },

  typingEffect: {
    initial: { width: 0, opacity: 0 },
    animate: {
      width: "100%",
      opacity: 1,
    },
  },

  pathMotion: {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 40, -30, 20, -10, 0],
      y: [0, 20, -15, 10, -5, 0],
    },
  },

  jellyTwist: {
    initial: { skewX: 0, skewY: 0, scale: 1 },
    animate: {
      skewX: [0, 15, -10, 5, 0],
      skewY: [0, -8, 4, -2, 0],
      scale: [1, 1.08, 0.95, 1.03, 1],
    },
  },

  depthPush: {
    initial: { transform: "translateZ(-200px) scale(0.6)" },
    animate: {
      transform: "translateZ(0px) scale(1)",
    },
  },

  colorShift: {
    initial: { backgroundColor: "#ff0000" },
    animate: {
      backgroundColor: ["#ff0000", "#00ff88", "#0066ff", "#ff0000"],
    },
  },

  orbitRotation: {
    initial: { x: 0, y: 0, rotate: 0 },
    animate: {
      x: [0, 40, 0, -40, 0],
      y: [0, 40, 80, 40, 0],
      rotate: [0, 180, 360, 540, 720],
    },
  },
} as const satisfies AnimationLibraryProps;

export default animations;
export type AnimationKeys = keyof typeof animations;

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
  slideUp: {
    initial: { y: "100%" },
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

  // Skew

  skewX30: {
    initial: { skewX: 30 },
    animate: {
      skewX: 0,
    },
  },
  skewX45: {
    initial: { skewX: 45 },
    animate: {
      skewX: 0,
    },
  },
  skewY30: {
    initial: { skewY: 30 },
    animate: {
      skewY: 0,
    },
  },
  skewY45: {
    initial: { skewY: 45 },
    animate: {
      skewY: 0,
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

  // transforms

  transformRevealLeft: {
    initial: {
      transform: "scaleX(0.0) translateX(8%)",
      transformOrigin: "left center",
    },
    animate: {
      transform: "scaleX(1) translateX(0%)",
      transformOrigin: "left center",
    },
  },
  transformRevealRight: {
    initial: {
      transform: "scaleX(0.0) translateX(-8%)",
      transformOrigin: "right center",
    },
    animate: {
      transform: "scaleX(1) translateX(0%)",
      transformOrigin: "right center",
    },
  },
  transformRevealDown: {
    initial: {
      transform: "scaleY(0) translateY(8%)",
      transformOrigin: "top center",
    },
    animate: {
      transform: "scaleY(1) translateY(0%)",
      transformOrigin: "top center",
    },
  },
  transformClipTriangle: {
    initial: {
      clipPath: "polygon(50% 0, 50% 0, 50% 0)",
      transform: "scale(0.94) rotate(-4deg)",
    },
    animate: {
      clipPath: [
        "polygon(50% 0, 50% 0, 50% 0)",
        "polygon(50% 0, 85% 100%, 15% 100%)",
      ],
      transform: ["scale(0.94) rotate(-4deg)", "scale(1) rotate(0deg)"],
    },
  },
  transformClipSquare: {
    initial: {
      clipPath: "inset(50% 50% 50% 50%)",
      transform: "scale(0.96)",
    },
    animate: {
      clipPath: [
        "inset(50% 50% 50% 50%)",
        "inset(12% 12% 12% 12%)",
        "inset(0% 0% 0% 0%)",
      ],
      transform: ["scale(0.96)", "scale(1.01)", "scale(1)"],
    },
  },
  transformClipStar: {
    initial: {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      transform: "scale(0.92) rotate(-8deg)",
    },
    animate: {
      clipPath: [
        "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        "polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 72%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      ],
      transform: ["scale(0.92) rotate(-8deg)", "scale(1) rotate(0deg)"],
    },
  },
  transformClipDiamond: {
    initial: {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      transform: "scale(0.96)",
    },
    animate: {
      clipPath: [
        "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        "polygon(50% 0, 100% 50%, 50% 100%, 0% 50%)",
      ],
      transform: ["scale(0.96)", "scale(1)"],
    },
  },
  transformClipPentagon: {
    initial: {
      clipPath: "polygon(50% 0, 50% 0, 50% 0, 50% 0, 50% 0)",
      transform: "scale(0.92) rotate(-6deg)",
    },
    animate: {
      clipPath: [
        "polygon(50% 0, 50% 0, 50% 0, 50% 0, 50% 0)",
        "polygon(50% 0, 85% 35%, 70% 85%, 30% 85%, 15% 35%)",
      ],
      transform: ["scale(0.92) rotate(-6deg)", "scale(1) rotate(0deg)"],
    },
  },
  transformClipVShaped: {
    initial: {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%)",
      transform: "scale(0.96) rotate(-6deg)",
    },
    animate: {
      clipPath: [
        "polygon(50% 50%, 50% 50%, 50% 50%)",
        "polygon(10% 0%, 50% 50%, 90% 0%, 90% 100%, 50% 50%, 10% 100%)",
      ],
      transform: ["scale(0.96) rotate(-6deg)", "scale(1) rotate(0deg)"],
    },
  },
  transformTextGlow: {
    initial: {
      transform: "translateX(6%)",
      textShadow: "0 0 0px rgba(255,255,255,0)",
      filter: "hue-rotate(0deg) blur(2px)",
    },
    animate: {
      transform: ["translateX(6%)", "translateX(0%)"],
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 0 12px rgba(255,220,180,0.9), 0 0 30px rgba(255,160,200,0.6)",
        "0 0 4px rgba(255,255,255,0.4)",
      ],
      filter: ["hue-rotate(-8deg) blur(3px)", "hue-rotate(6deg) blur(0px)"],
    },
  },
  transformTextGradient: {
    initial: {
      backgroundImage:
        "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 65%)",
      backgroundSize: "200% 100%",
      backgroundPosition: "100% 50%",
      transform: "translateX(4%)",
    },
    animate: {
      backgroundPosition: ["100% 50%", "0% 50%"],
      transform: ["translateX(4%)", "translateX(0%)"],
    },
  },
  transformMaskLeft: {
    initial: {
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transform: "skewX(10deg) translateX(5%)",
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      transform: "skewX(0deg) translateX(0%)",
    },
  },
  transformMaskRight: {
    initial: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      transform: "skewX(-10deg) translateX(-5%)",
    },
    animate: {
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      transform: "skewX(0deg) translateX(0%)",
    },
  },
  transformMaskDown: {
    initial: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      transform: "skewY(10deg) translateY(5%)",
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transform: "skewY(0deg) translateY(0%)",
    },
  },
  transformMaskGradient: {
    initial: {
      maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 30%)",
      maskPosition: "100% 50%",
      maskSize: "200% 100%",
      transform: "translateX(4%)",
    },
    animate: {
      maskPosition: "0% 50%",
      transform: "translateX(0%)",
    },
  },

  // clips

  clipPop: {
    initial: {
      clipPath: "circle(0% at 50% 50%)",
    },
    animate: {
      clipPath: "circle(150% at 50% 50%)",
    },
  },
  clipDown: {
    initial: {
      clipPath: "inset(0 0 100% 0)",
    },
    animate: {
      clipPath: "inset(0 0 0% 0)",
    },
  },
  clipUp: {
    initial: {
      clipPath: "inset(100% 0 0 0)",
    },
    animate: {
      clipPath: "inset(0 0 0 0)",
    },
  },
  clipCircle: {
    initial: {
      clipPath: "circle(0% at 10% 50%)",
    },
    animate: {
      clipPath: "circle(120% at 50% 50%)",
    },
  },

  // masks

  maskGradient: {
    initial: {
      maskImage:
        "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 30%)",
      maskSize: "200% 100%",
      maskPosition: "100% 50%",
      transform: "translateX(3%)",
    },
    animate: {
      maskPosition: "0% 50%",
      transform: "translateX(0%)",
    },
  },
  maskGradientPerforate: {
    initial: {
      maskImage:
        "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 41%)",
      maskSize: "8% 8%",
      maskPosition: "120% 50%",
      transform: "translateX(4%)",
    },
    animate: {
      maskPosition: "0% 50%",
      maskSize: ["8% 8%", "6% 6%"],
      transform: "translateX(0%)",
    },
  },

  // custom

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
  colorShift: {
    initial: { backgroundColor: "#ff0000" },
    animate: {
      backgroundColor: ["#ff0000", "#00ff88", "#0066ff", "#ff0000"],
    },
  },
  textShimmer: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0, 0, 1],
    },
  },
  flash: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0, 1],
    },
  },
  hover: {
    initial: { scale: 1 },
    animate: {
      scale: 1.1,
    },
  },
  heartbeat: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
    },
  },
  snailTrail: {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: ["-100%", "-50%", "-25%", "-10%", "0%"],
      opacity: [0, 0.3, 0.5, 0.8, 1],
    },
  },
  microWobble: {
    initial: { rotate: 0, scale: 0.995 },
    animate: { rotate: 2, scale: 1.005 },
  },
} as const satisfies AnimationLibraryProps;

export default animations;
export type AnimationKeys = keyof typeof animations;

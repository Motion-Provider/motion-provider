import type { AnimationModule } from "../engine/types.js";

export const clipCircle = {
  animate: {
    clipPath: "circle(120% at 50% 50%)",
  },
  initial: {
    clipPath: "circle(0% at 10% 50%)",
  },
} as const satisfies AnimationModule;

export const clipDown = {
  animate: {
    clipPath: "inset(0 0 0% 0)",
  },
  initial: {
    clipPath: "inset(0 0 100% 0)",
  },
} as const satisfies AnimationModule;

export const clipPop = {
  animate: {
    clipPath: "circle(150% at 50% 50%)",
  },
  initial: {
    clipPath: "circle(0% at 50% 50%)",
  },
} as const satisfies AnimationModule;

export const clipUp = {
  animate: {
    clipPath: "inset(0 0 0 0)",
  },
  initial: {
    clipPath: "inset(100% 0 0 0)",
  },
} as const satisfies AnimationModule;

export const colorShift = {
  animate: {
    backgroundColor: ["#ff0000", "#00ff88", "#0066ff", "#ff0000"],
  },
  initial: {
    backgroundColor: "#ff0000",
  },
} as const satisfies AnimationModule;

export const defaultAnimation = {
  animate: {},
  initial: {},
} as const satisfies AnimationModule;

export const fadeDown = {
  animate: {
    opacity: 1,
    y: 0,
  },
  initial: {
    opacity: 0,
    y: -30,
  },
} as const satisfies AnimationModule;

export const fadeIn = {
  animate: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
} as const satisfies AnimationModule;

export const fadeLeft = {
  animate: {
    opacity: 1,
    x: 0,
  },
  initial: {
    opacity: 0,
    x: -30,
  },
} as const satisfies AnimationModule;

export const fadeOut = {
  animate: {
    opacity: 0,
  },
  initial: {
    opacity: 1,
  },
} as const satisfies AnimationModule;

export const fadeRight = {
  animate: {
    opacity: 1,
    x: 0,
  },
  initial: {
    opacity: 0,
    x: 30,
  },
} as const satisfies AnimationModule;

export const fadeUp = {
  animate: {
    opacity: 1,
    y: 0,
  },
  initial: {
    opacity: 0,
    y: 30,
  },
} as const satisfies AnimationModule;

export const filterBlurIn = {
  animate: {
    filter: "blur(0px)",
  },
  initial: {
    filter: "blur(10px)",
  },
} as const satisfies AnimationModule;

export const filterBlurOut = {
  animate: {
    filter: "blur(10px)",
  },
  initial: {
    filter: "blur(0px)",
  },
} as const satisfies AnimationModule;

export const filterBrightnessFade = {
  animate: {
    filter: "brightness(1)",
  },
  initial: {
    filter: "brightness(0.5)",
  },
} as const satisfies AnimationModule;

export const filterContrastShift = {
  animate: {
    filter: "contrast(100%)",
  },
  initial: {
    filter: "contrast(50%)",
  },
} as const satisfies AnimationModule;

export const filterGrayscaleFade = {
  animate: {
    filter: "grayscale(0%)",
  },
  initial: {
    filter: "grayscale(100%)",
  },
} as const satisfies AnimationModule;

export const filterHueRotate = {
  animate: {
    filter: "hue-rotate(360deg)",
  },
  initial: {
    filter: "hue-rotate(0deg)",
  },
} as const satisfies AnimationModule;

export const filterInvertColors = {
  animate: {
    filter: "invert(100%)",
  },
  initial: {
    filter: "invert(0%)",
  },
} as const satisfies AnimationModule;

export const filterSaturateIncrease = {
  animate: {
    filter: "saturate(200%)",
  },
  initial: {
    filter: "saturate(50%)",
  },
} as const satisfies AnimationModule;

export const filterSepiaTone = {
  animate: {
    filter: "sepia(100%)",
  },
  initial: {
    filter: "sepia(0%)",
  },
} as const satisfies AnimationModule;

export const flash = {
  animate: {
    opacity: [1, 0, 1],
  },
  initial: {
    opacity: 1,
  },
} as const satisfies AnimationModule;

export const heartbeat = {
  animate: {
    scale: [1, 1.2, 1],
  },
  initial: {
    scale: 1,
  },
} as const satisfies AnimationModule;

export const hover = {
  animate: {
    scale: 1.1,
  },
  initial: {
    scale: 1,
  },
} as const satisfies AnimationModule;

export const maskGradient = {
  animate: {
    maskPosition: "0% 50%",
    transform: "translateX(0%)",
  },
  initial: {
    maskImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 30%)",
    maskPosition: "100% 50%",
    maskSize: "200% 100%",
    transform: "translateX(3%)",
  },
} as const satisfies AnimationModule;

export const maskGradientPerforate = {
  animate: {
    maskPosition: "0% 50%",
    maskSize: ["8% 8%", "6% 6%"],
    transform: "translateX(0%)",
  },
  initial: {
    maskImage: "radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 41%)",
    maskPosition: "120% 50%",
    maskSize: "8% 8%",
    transform: "translateX(4%)",
  },
} as const satisfies AnimationModule;

export const microWobble = {
  animate: {
    rotate: 2,
    scale: 1.005,
  },
  initial: {
    rotate: 0,
    scale: 0.995,
  },
} as const satisfies AnimationModule;

export const neonGlow = {
  animate: {
    textShadow: [
      "0 0 0px #fff",
      "0 0 10px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
      "0 0 0px #fff",
    ],
  },
  initial: {
    textShadow: "0 0 0px #fff",
  },
} as const satisfies AnimationModule;

export const opacity = {
  animate: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
} as const satisfies AnimationModule;

export const rotateClockwise = {
  animate: {
    rotate: 0,
  },
  initial: {
    rotate: -45,
  },
} as const satisfies AnimationModule;

export const rotateFlipX = {
  animate: {
    rotateX: 0,
  },
  initial: {
    rotateX: -180,
  },
} as const satisfies AnimationModule;

export const rotateFlipY = {
  animate: {
    rotateY: 0,
  },
  initial: {
    rotateY: -180,
  },
} as const satisfies AnimationModule;

export const rotateIn = {
  animate: {
    rotate: 0,
  },
  initial: {
    rotate: -90,
  },
} as const satisfies AnimationModule;

export const rotateOut = {
  animate: {
    rotate: 90,
  },
  initial: {
    rotate: 0,
  },
} as const satisfies AnimationModule;

export const rotateRoll = {
  animate: {
    rotateZ: 0,
  },
  initial: {
    rotateZ: -120,
  },
} as const satisfies AnimationModule;

export const rotating360 = {
  animate: {
    rotate: 360,
  },
  initial: {
    rotate: 0,
  },
} as const satisfies AnimationModule;

export const scaleZoomIn = {
  animate: {
    scale: 1,
  },
  initial: {
    scale: 0.8,
  },
} as const satisfies AnimationModule;

export const scaleZoomOut = {
  animate: {
    scale: 1,
  },
  initial: {
    scale: 1.2,
  },
} as const satisfies AnimationModule;

export const skewX30 = {
  animate: {
    skewX: 0,
  },
  initial: {
    skewX: 30,
  },
} as const satisfies AnimationModule;

export const skewX45 = {
  animate: {
    skewX: 0,
  },
  initial: {
    skewX: 45,
  },
} as const satisfies AnimationModule;

export const skewY30 = {
  animate: {
    skewY: 0,
  },
  initial: {
    skewY: 30,
  },
} as const satisfies AnimationModule;

export const skewY45 = {
  animate: {
    skewY: 0,
  },
  initial: {
    skewY: 45,
  },
} as const satisfies AnimationModule;

export const slideDown = {
  animate: {
    y: 0,
  },
  initial: {
    y: "-100%",
  },
} as const satisfies AnimationModule;

export const slideLeft = {
  animate: {
    x: 0,
  },
  initial: {
    x: "100%",
  },
} as const satisfies AnimationModule;

export const slideRight = {
  animate: {
    x: 0,
  },
  initial: {
    x: "-100%",
  },
} as const satisfies AnimationModule;

export const slideUp = {
  animate: {
    y: 0,
  },
  initial: {
    y: "100%",
  },
} as const satisfies AnimationModule;

export const snailTrail = {
  animate: {
    opacity: [0, 0.3, 0.5, 0.8, 1],
    x: ["-100%", "-50%", "-25%", "-10%", "0%"],
  },
  initial: {
    opacity: 0,
    x: "-100%",
  },
} as const satisfies AnimationModule;

export const spin = {
  animate: {
    rotate: -360,
  },
  initial: {
    rotate: 0,
  },
} as const satisfies AnimationModule;

export const textShimmer = {
  animate: {
    opacity: [0, 1, 0, 0, 1],
  },
  initial: {
    opacity: 0,
  },
} as const satisfies AnimationModule;

export const transformClipDiamond = {
  animate: {
    clipPath: [
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      "polygon(50% 0, 100% 50%, 50% 100%, 0% 50%)",
    ],
    transform: ["scale(0.96)", "scale(1)"],
  },
  initial: {
    clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    transform: "scale(0.96)",
  },
} as const satisfies AnimationModule;

export const transformClipPentagon = {
  animate: {
    clipPath: [
      "polygon(50% 0, 50% 0, 50% 0, 50% 0, 50% 0)",
      "polygon(50% 0, 85% 35%, 70% 85%, 30% 85%, 15% 35%)",
    ],
    transform: ["scale(0.92) rotate(-6deg)", "scale(1) rotate(0deg)"],
  },
  initial: {
    clipPath: "polygon(50% 0, 50% 0, 50% 0, 50% 0, 50% 0)",
    transform: "scale(0.92) rotate(-6deg)",
  },
} as const satisfies AnimationModule;

export const transformClipSquare = {
  animate: {
    clipPath: [
      "inset(50% 50% 50% 50%)",
      "inset(12% 12% 12% 12%)",
      "inset(0% 0% 0% 0%)",
    ],
    transform: ["scale(0.96)", "scale(1.01)", "scale(1)"],
  },
  initial: {
    clipPath: "inset(50% 50% 50% 50%)",
    transform: "scale(0.96)",
  },
} as const satisfies AnimationModule;

export const transformClipStar = {
  animate: {
    clipPath: [
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      "polygon(50% 0, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 72%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
    ],
    transform: ["scale(0.92) rotate(-8deg)", "scale(1) rotate(0deg)"],
  },
  initial: {
    clipPath:
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    transform: "scale(0.92) rotate(-8deg)",
  },
} as const satisfies AnimationModule;

export const transformClipTriangle = {
  animate: {
    clipPath: [
      "polygon(50% 0, 50% 0, 50% 0)",
      "polygon(50% 0, 85% 100%, 15% 100%)",
    ],
    transform: ["scale(0.94) rotate(-4deg)", "scale(1) rotate(0deg)"],
  },
  initial: {
    clipPath: "polygon(50% 0, 50% 0, 50% 0)",
    transform: "scale(0.94) rotate(-4deg)",
  },
} as const satisfies AnimationModule;

export const transformClipVShaped = {
  animate: {
    clipPath: [
      "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      "polygon(10% 0%, 50% 50%, 90% 0%, 90% 100%, 50% 50%, 10% 100%)",
    ],
    transform: ["scale(0.96) rotate(-6deg)", "scale(1) rotate(0deg)"],
  },
  initial: {
    clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
    transform: "scale(0.96) rotate(-6deg)",
  },
} as const satisfies AnimationModule;

export const transformMaskDown = {
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transform: "skewY(0deg) translateY(0%)",
  },
  initial: {
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    transform: "skewY(10deg) translateY(5%)",
  },
} as const satisfies AnimationModule;

export const transformMaskGradient = {
  animate: {
    maskPosition: "0% 50%",
    transform: "translateX(0%)",
  },
  initial: {
    maskImage: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,1) 30%)",
    maskPosition: "100% 50%",
    maskSize: "200% 100%",
    transform: "translateX(4%)",
  },
} as const satisfies AnimationModule;

export const transformMaskLeft = {
  animate: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    transform: "skewX(0deg) translateX(0%)",
  },
  initial: {
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transform: "skewX(10deg) translateX(5%)",
  },
} as const satisfies AnimationModule;

export const transformMaskRight = {
  animate: {
    clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
    transform: "skewX(0deg) translateX(0%)",
  },
  initial: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    transform: "skewX(-10deg) translateX(-5%)",
  },
} as const satisfies AnimationModule;

export const transformRevealUp = {
  animate: {
    transform: "scaleY(1) translateY(0%)",
    transformOrigin: "bottom center",
  },
  initial: {
    transform: "scaleY(0) translateY(-8%)",
    transformOrigin: "bottom center",
  },
} as const satisfies AnimationModule;

export const transformRevealDown = {
  animate: {
    transform: "scaleY(1) translateY(0%)",
    transformOrigin: "top center",
  },
  initial: {
    transform: "scaleY(0) translateY(8%)",
    transformOrigin: "top center",
  },
} as const satisfies AnimationModule;

export const transformRevealLeft = {
  animate: {
    transform: "scaleX(1) translateX(0%)",
    transformOrigin: "left center",
  },
  initial: {
    transform: "scaleX(0.0) translateX(8%)",
    transformOrigin: "left center",
  },
} as const satisfies AnimationModule;

export const transformRevealRight = {
  animate: {
    transform: "scaleX(1) translateX(0%)",
    transformOrigin: "right center",
  },
  initial: {
    transform: "scaleX(0.0) translateX(-8%)",
    transformOrigin: "right center",
  },
} as const satisfies AnimationModule;

export const transformTextGlow = {
  animate: {
    filter: ["hue-rotate(-8deg) blur(3px)", "hue-rotate(6deg) blur(0px)"],
    textShadow: [
      "0 0 0px rgba(255,255,255,0)",
      "0 0 12px rgba(255,220,180,0.9), 0 0 30px rgba(255,160,200,0.6)",
      "0 0 4px rgba(255,255,255,0.4)",
    ],
  },
  initial: {
    filter: "hue-rotate(0deg) blur(2px)",
    textShadow: "0 0 0px rgba(255,255,255,0)",
  },
} as const satisfies AnimationModule;

export const transformTextGradient = {
  animate: {
    backgroundPosition: ["100% 50%", "0% 50%"],
    transform: ["translateX(4%)", "translateX(0%)"],
  },
  initial: {
    backgroundImage:
      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 65%)",
    backgroundPosition: "100% 50%",
    backgroundSize: "200% 100%",
    transform: "translateX(4%)",
  },
} as const satisfies AnimationModule;

export const translate3dIn = {
  animate: {
    transform: "translate3d(0px, 0px, 0px)",
  },
  initial: {
    transform: "translate3d(-100px, -100px, -100px)",
  },
} as const satisfies AnimationModule;

export const translate3dOut = {
  animate: {
    transform: "translate3d(100px, 100px, 100px)",
  },
  initial: {
    transform: "translate3d(0px, 0px, 0px)",
  },
} as const satisfies AnimationModule;

export const translate3dRotate = {
  animate: {
    transform: "translate3d(0px, 0px, 0px) rotate(360deg)",
  },
  initial: {
    transform: "translate3d(-50px, -50px, -50px) rotate(0deg)",
  },
} as const satisfies AnimationModule;

export const translate3dZoom = {
  animate: {
    transform: "translate3d(0px, 0px, 0px) scale(1)",
  },
  initial: {
    transform: "translate3d(-50px, 0px, -100px) scale(0.5)",
  },
} as const satisfies AnimationModule;

export const typingEffect = {
  animate: {
    width: "85%",
  },
  initial: {
    width: 0,
  },
} as const satisfies AnimationModule;

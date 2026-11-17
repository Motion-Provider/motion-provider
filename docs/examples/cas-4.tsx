import {
  type AnimationController,
  createMotionConfig,
  createMotionRegistry,
  MotionContainer,
  MotionImage,
  MotionText,
  useController,
} from "motion-provider";

const data = createMotionConfig({
  badge: {
    type: "MotionContainer",
    props: {
      elementType: "span",
      animation: {
        mode: ["fadeUp", "filterBlurIn"],
        transition: "gentle",
        duration: 0.5,
      },
      className: "font-light md:text-sm text-xs -mb-12",
    },
  },
  title: {
    type: "MotionText",
    props: {
      elementType: "h2",
      animation: {
        mode: ["textShimmer", "transformTextGlow"],
        duration: 0.88,
        transition: "bounceSoft",
        delay: 0.44,
      },
      config: {
        mode: "chars",
        delayLogic: "chaotic",
      },
      className: "mt-0 capitalize md:text-3xl text-lg",
    },
  },
  desc: {
    type: "MotionContainer",
    props: {
      elementType: "p",
      animation: {
        mode: "fadeUp",
        transition: "gentle",
        delay: 0.88,
      },
      className: "md:max-w-2xs max-w-42 text-pretty -mt-4 md:text-sm text-xs",
    },
  },
  image: {
    type: "MotionImage",
    props: {
      animation: {
        mode: ["fadeIn", "rotateFlipY"],
        transition: "gentle",
        duration: 0.92,
        delay: 1.2,
      },
      config: {
        img: "https://ytpmpkgcjlcdidphswzv.supabase.co/storage/v1/object/public/banner/higher-order-components-in-react-banner-da0681d3.webp",
        pieces: 36,
        duration: 0.42,
        delayLogic: "sinusoidal",
      },
      alt: "demo",
      wrapperClassName:
        "md:size-60 size-40 rounded-lg overflow-hidden object-cover",
    },
  },
});

const { getMotionAnimation } = createMotionRegistry(data);

type Action = keyof Pick<AnimationController, "pause" | "onReverse" | "play">;

const actions = [
  "play",
  "pause",
  "onReverse",
] as const satisfies readonly Action[];

export default function Cas4() {
  const controller = useController({
    reverseAnimation: false,
    stopAnimation: true,
  });

  const animate = (action: Action) => (): void => {
    controller[action]();
  };

  return (
    <section className="size-full flex items-center justify-center tracking-tighter md:px-6 gap-4 md:gap-8">
      <div className="flex absolute top-12 left-3 gap-3 *:hover:text-accent z-50 bg-surface-secondary *:cursor-pointer px-3 text-xs text-surface-secondary-foreground backdrop-blur-xl rounded-md py-2">
        {actions.map((action) => (
          <button key={action} type="button" onClick={animate(action)}>
            {action}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-start justify-end h-full pb-8 -translate-y-8">
        <MotionContainer
          {...getMotionAnimation("badge")}
          controller={controller}
        >
          Motion CAS
        </MotionContainer>
        <MotionText {...getMotionAnimation("title")} controller={controller}>
          Make stuffs alive
        </MotionText>
        <MotionContainer
          {...getMotionAnimation("desc")}
          controller={controller}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </MotionContainer>
      </div>
      <div className="flex gap-2 items-center relative">
        <MotionImage {...getMotionAnimation("image")} controller={controller} />
      </div>
    </section>
  );
}

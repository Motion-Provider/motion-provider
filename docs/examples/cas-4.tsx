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
      className: "text-xs font-light @md:text-sm",
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
      className: "text-lg capitalize @md:text-3xl font-bold",
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
      className: "max-w-2xs text-pretty text-xs @md:text-sm",
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
        "size-24 overflow-hidden rounded-lg @md:size-44 @xl:size-56",
    },
  },
});

const { getAnimation } = createMotionRegistry(data);

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
    <section className="@container grid min-h-full w-full items-center px-4 py-3 tracking-tighter">
      <div className="mx-auto grid w-full max-w-2xl gap-3">
        <div className="flex flex-wrap gap-3 justify-self-center rounded-md bg-surface-secondary px-3 py-2 text-xs text-surface-secondary-foreground *:cursor-pointer *:hover:text-accent @md:justify-self-end">
          {actions.map((action) => (
            <button key={action} type="button" onClick={animate(action)}>
              {action}
            </button>
          ))}
        </div>
        <div className="grid items-center justify-items-center gap-3 @md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div className="grid min-w-0 justify-items-center gap-0.5 text-center @md:justify-items-start  @md:justify-self-start @md:text-left">
            <MotionContainer {...getAnimation("badge")} controller={controller}>
              Motion CAS
            </MotionContainer>
            <MotionText {...getAnimation("title")} controller={controller}>
              Make stuffs alive
            </MotionText>
            <MotionContainer {...getAnimation("desc")} controller={controller}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </MotionContainer>
          </div>
          <div className="flex gap-2 items-center relative">
            <MotionImage {...getAnimation("image")} controller={controller} />
          </div>
        </div>
      </div>
    </section>
  );
}

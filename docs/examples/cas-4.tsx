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
      alt: "Mist drifting over a forested ridge",
      wrapperClassName:
        "size-24 overflow-hidden rounded-lg @md:size-44 @xl:size-56",
    },
  },
});

const { getAnimation } = createMotionRegistry(data);

type Action = keyof Pick<AnimationController, "pause" | "onReverse" | "play">;

const actions = [
  { label: "Play", action: "play" },
  { label: "Pause", action: "pause" },
  { label: "Reverse", action: "onReverse" },
] as const satisfies readonly { label: string; action: Action }[];

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
        <div className="flex flex-wrap justify-self-center rounded-lg bg-surface-secondary p-1 text-xs text-surface-secondary-foreground @md:justify-self-end">
          {actions.map(({ label, action }) => (
            <button
              key={action}
              type="button"
              className="min-h-9 cursor-pointer rounded-md px-3 hover:text-accent focus-visible:outline-2 focus-visible:outline-focus"
              onClick={animate(action)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid items-center justify-items-center gap-3 @md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
          <div className="grid min-w-0 justify-items-center gap-0.5 text-center @md:justify-items-start  @md:justify-self-start @md:text-left">
            <MotionContainer {...getAnimation("badge")} controller={controller}>
              Motion CAS
            </MotionContainer>
            <MotionText {...getAnimation("title")} controller={controller}>
              Above the treeline
            </MotionText>
            <MotionContainer {...getAnimation("desc")} controller={controller}>
              A quiet morning in the mountains.
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

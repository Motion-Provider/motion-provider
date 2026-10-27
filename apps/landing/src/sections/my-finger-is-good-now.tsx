import { MotionChain, MotionText } from "motion-provider";
import { CircleItem } from "@/components/circle/circle-item";
import config from "@/constants/circle.config";

const { beginRadius, endRadius, holeRadius } = config;

const count = 8;

const items = Array.from({ length: count }, (_, i) => {
  const t = i / (count - 1);

  return {
    radius: holeRadius + (beginRadius + t * (endRadius - beginRadius)),
    id: i + 1,
  };
});

const configIdentity = { ...config.identity, strokeWidth: 0.9 };
export default function MyFingerIsGoodNow() {
  return (
    <section className="min-h-60 w-full justify-center items-center flex bg-white text-black my-160 py-24">
      <div className="w-7xl flex justify-between items-center">
        <div className="">
          <MotionText
            animation={{
              mode: ["filterBlurIn", "fadeDown"],
              transition: "gentle",
            }}
            config={{
              mode: "words",
            }}
            controller={{
              scroll: {
                axis: "y",
                mode: "view",
                start: 0.15,
                end: 0.5,
              },
            }}
            wrapperClassName="text-6xl text-start tracking-tighter font-bold max-w-3xs"
          >
            Simple yet powerful,
          </MotionText>
          <br />
          <MotionText
            animation={{
              mode: ["filterBlurIn", "fadeUp"],
              transition: "gentle",
            }}
            config={{
              mode: "words",
            }}
            controller={{
              scroll: {
                axis: "y",
                mode: "view",
                start: 0.3,
                end: 0.6,
              },
            }}
            wrapperClassName="text-6xl text-start tracking-tighter font-bold max-w-3xs"
          >
            Animation Provider.
          </MotionText>
        </div>
        <div className="size-auto pr-12">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="z-30 pointer-events-none size-96"
          >
            <MotionChain
              animations={items.map((_, i) => ({
                mode: [
                  i === 0 ? "fadeDown" : "fadeUp",
                  "maskGradientPerforate",
                ],
                transition: "gentle",
                duration: 0.5,
                endDelay: i * 0.1,
              }))}
              config={{
                delayLogic: "sinusoidal",
                duration: 0.5,
              }}
              controller={{
                scroll: {
                  axis: "y",
                  mode: "view",
                  start: 0.35,
                  end: 0.5,
                },
              }}
              elementType="g"
            >
              {items.map(({ ...props }) => (
                <g key={props.id}>
                  <CircleItem
                    evenColor="text-accent-foreground"
                    oddColor="text-accent"
                    {...configIdentity}
                    {...props}
                  />
                </g>
              ))}
            </MotionChain>
          </svg>
        </div>
      </div>
    </section>
  );
}

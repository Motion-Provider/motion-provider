import { PyramidChain } from "@/components/pyramid-chain";

export default function App() {
  const size = 268;
  const x = 276;
  const y = 350;
  const center = size / 2;

  const translateX = x + center - 20;
  const translateY = y + center - 25;

  return (
    <div className="h-screen w-full grid place-items-center-safe">
      <svg
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="size-full z-30 pointer-events-none"
      >
        <title>Engine Hero</title>
        <g transform={`translate(${translateX} ${translateY})`}>
          <PyramidChain
            cx={20}
            cy={40}
            rSub={2}
            animationName="testChain"
            oddColor="text-accent"
            evenColor="text-accent/50"
            beginRadius={10}
            endRadius={40}
            holeRadius={20}
            count={5}
            strokeWidth={0.8}
          />
        </g>
      </svg>
    </div>
  );
}

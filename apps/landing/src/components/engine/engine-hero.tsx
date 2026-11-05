import { PyramidChain } from "../pyramid-chain";

export function EngineHero() {
  const size = 268;
  const x = 276;
  const y = 350;
  const center = size / 2;

  const translateX = x + center - 20;
  const translateY = y + center - 25;

  return (
    <g data-layer="decoration" aria-hidden pointerEvents="none" key="a">
      <g transform={`translate(${translateX} ${translateY})`}>
        <PyramidChain
          cx={20}
          cy={40}
          rSub={2}
          animationName="engineHeroPyramid"
          oddColor="text-danger"
          evenColor="text-accent"
          beginRadius={10}
          endRadius={120}
          holeRadius={50}
          count={8}
          strokeWidth={0.8}
        />
      </g>
    </g>
  );
}

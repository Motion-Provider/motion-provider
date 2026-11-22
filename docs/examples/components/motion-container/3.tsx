import { MotionContainer } from "motion-provider";

export default function () {
  return (
    <>
      <span className="pb-12 mt-2">scroll down</span>
      <section className="my-60">
        <MotionContainer
          animation={{ mode: "fadeUp", duration: 0.6 }}
          controller={{
            configView: {
              amount: 0.25,
              once: false,
              margin: "0px 0px -10% 0px",
            },
          }}
        >
          Replays as the element enters the viewport.
        </MotionContainer>
      </section>
      <span className="pt-16">scroll up</span>
    </>
  );
}

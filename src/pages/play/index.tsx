import MotionContainer from "@/motion/motion-container";
import dynamic from "next/dynamic";

const MotionDynamicContainer = dynamic(
  () => Promise.resolve().then(() => import("@/motion/motion-container")),
  {
    ssr: false,
  }
);

export default function Play() {
  return (
    <section className="h-screen w-full flex items-center justify-center flex-col gap-8">
      <MotionContainer
        elementType={"div"}
        className="text-2xl font-bold"
        animation={{
          mode: ["fadeIn"],
          transition: "smooth",
          delay: 0,
          duration: 1,
        }}
      >
        Hi there server
      </MotionContainer>
      <MotionDynamicContainer
        elementType={"div"}
        className="text-2xl font-bold"
        animation={{
          mode: ["fadeIn"],
          transition: "smooth",
          delay: 0,
          duration: 1,
        }}
      >
        Hi there client
      </MotionDynamicContainer>
    </section>
  );
}

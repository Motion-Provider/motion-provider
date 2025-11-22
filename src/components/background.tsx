import { MotionContainer } from "@/motion-provider";

export const Background = () => (
  <MotionContainer
    animation={{
      mode: "fadeIn",
      delay: 0.5,
      transition: "gentle",
      duration: 2,
    }}
    elementType="div"
    className="absolute inset-0 -z-20"
    style={{
      background:
        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6, 182, 212, 0.25), transparent 70%), #000000",
    }}
  />
);

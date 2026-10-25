import { MotionContainer } from "motion-provider";

export default function App() {
  return (
    <MotionContainer
      animation={{
        mode: ["filterBlurIn", "fadeIn"],
      }}
    />
  );
}

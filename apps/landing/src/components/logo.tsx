import { MotionContainer, useController } from "motion-provider";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  const controller = useController();

  const handleEnter = () => {
    controller.play();
  };

  const handleLeave = () => {
    controller.cancel();
    controller.reverse();
  };
  return (
    <MotionContainer
      animation={{
        mode: ["rotateFlipY", "filterHueRotate"],
        transition: "bounceSoft",
        duration: 0.88,
        direction: "reverse",
      }}
      controller={controller}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Image
        height={48}
        width={48}
        alt="Motion Provider Logo"
        src="/logo.png"
        className={className}
      />
    </MotionContainer>
  );
}

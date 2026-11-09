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
        loading="eager"
        priority
        decoding="async"
        alt="Motion Provider Logo"
        src="/logo-6f9f20fb.webp"
        className={className}
      />
    </MotionContainer>
  );
}
